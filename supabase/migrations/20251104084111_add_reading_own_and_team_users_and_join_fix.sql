drop policy "Enable read access for all users" on "public"."users";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_team_id_for_current_user()
 RETURNS uuid
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select team_id
  from users
  where id = auth.uid()
  limit 1;
$function$
;

CREATE OR REPLACE FUNCTION public.join_team(p_code text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$declare
  v_team_id uuid;
  v_leader_id uuid;
  current_user_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  select id, leader_id into v_team_id, v_leader_id from teams where code = p_code;

  if v_team_id is null then
    raise exception 'Invalid team code';
  end if;

  if v_leader_id = current_user_id then
    raise exception 'Leader cannot join other team';
  end if;

  update users
  set team_id = v_team_id
  where id = current_user_id;
end;$function$
;


  create policy "Enable read access for user's and team members' profiles"
  on "public"."users"
  as permissive
  for select
  to authenticated
using (((id = ( SELECT auth.uid() AS uid)) OR ((team_id IS NOT NULL) AND (team_id = public.get_team_id_for_current_user()))));



