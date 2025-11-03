drop policy "Enable insert for users if not part of team already" on "public"."teams";

drop policy "Enable users to create their profiles" on "public"."users";

CREATE UNIQUE INDEX teams_code_key ON public.teams USING btree (code);

alter table "public"."teams" add constraint "teams_code_key" UNIQUE using index "teams_code_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_team_with_leader(team_name text, team_code text)
 RETURNS public.teams
 LANGUAGE plpgsql
AS $function$
declare
  new_team teams;
  current_user_id uuid;
begin
  -- Get the current authenticated user
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  -- Create the team
  insert into teams (name, code, leader_id)
  values (team_name, team_code, current_user_id)
  returning * into new_team;

  -- Update the user’s team_id
  update users
  set team_id = new_team.id
  where id = current_user_id;

  return new_team;
end;
$function$
;


  create policy "Enable creating team only if user is not part of one"
  on "public"."teams"
  as restrictive
  for insert
  to authenticated
with check ((NOT (EXISTS ( SELECT u.id,
    u.team_id
   FROM public.users u
  WHERE (( SELECT (auth.uid() = u.id)) AND (u.team_id IS NOT NULL))))));



  create policy "Enable insert for users based on leader_id"
  on "public"."teams"
  as permissive
  for insert
  to authenticated
with check ((( SELECT auth.uid() AS uid) = leader_id));



  create policy "Enable read access for all users"
  on "public"."teams"
  as permissive
  for select
  to public
using (true);



  create policy "Enable users to update their profiles"
  on "public"."users"
  as permissive
  for update
  to authenticated
using ((( SELECT auth.uid() AS uid) = id))
with check ((( SELECT auth.uid() AS uid) = id));



  create policy "Enable users to create their profiles"
  on "public"."users"
  as permissive
  for insert
  to authenticated
with check ((( SELECT auth.uid() AS uid) = id));



