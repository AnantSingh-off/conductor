import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { updateProjectSchema } from '@/lib/validation/projects';

interface RouteContext {
  params: { projectId: string };
}

/** GET /api/projects/:projectId — Get a single project */
export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', params.projectId)
      .eq('owner_id', user.id)
      .single();

    if (error || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ data: project });
  } catch (err) {
    console.error('[GET /api/projects/:id] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/** PATCH /api/projects/:projectId — Update project metadata */
export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validation = updateProjectSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.issues.map((i) => i.message).join(', '),
        },
        { status: 400 }
      );
    }

    // Verify ownership first
    const { data: existing } = await supabase
      .from('projects')
      .select('id')
      .eq('id', params.projectId)
      .eq('owner_id', user.id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const { data: project, error } = await supabase
      .from('projects')
      .update({
        ...validation.data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.projectId)
      .select()
      .single();

    if (error) {
      console.error('[PATCH /api/projects/:id] Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: project });
  } catch (err) {
    console.error('[PATCH /api/projects/:id] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
