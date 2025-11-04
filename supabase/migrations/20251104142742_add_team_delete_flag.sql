drop policy "Enable updates only by leader and with next leader being only a" on "public"."teams";

drop policy "Enable users to update their profiles" on "public"."users";

alter table "public"."teams" add column "is_deleted" boolean not null default false;


  create policy "Enable updates only by leader with new leader as team member"
  on "public"."teams"
  as permissive
  for update
  to authenticated
using (((( SELECT auth.uid() AS uid) = leader_id) AND (is_deleted IS FALSE)))
with check (((leader_id IS NOT NULL) AND (leader_id IN ( SELECT users.id
   FROM public.users
  WHERE ((users.team_id = teams.id) AND (users.is_deleted IS FALSE))))));



  create policy "Enable users to update their profiles"
  on "public"."users"
  as permissive
  for update
  to authenticated
using (((( SELECT auth.uid() AS uid) = id) AND (is_deleted IS FALSE)))
with check ((( SELECT auth.uid() AS uid) = id));



