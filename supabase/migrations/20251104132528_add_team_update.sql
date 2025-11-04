drop policy "Enable read access for all users" on "public"."teams";

alter table "public"."teams" alter column "leader_id" set not null;


  create policy "Enable read access for all authenticated users"
  on "public"."teams"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable updates only by leader and with next leader being only a"
  on "public"."teams"
  as permissive
  for update
  to authenticated
using ((( SELECT auth.uid() AS uid) = leader_id))
with check (((leader_id IS NOT NULL) AND (leader_id IN ( SELECT users.id
   FROM public.users
  WHERE ((users.team_id = teams.id) AND (users.is_deleted IS FALSE))))));



