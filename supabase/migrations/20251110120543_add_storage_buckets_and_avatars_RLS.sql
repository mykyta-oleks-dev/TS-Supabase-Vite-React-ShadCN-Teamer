set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_team_id_for_user(user_uuid uuid)
 RETURNS uuid
 LANGUAGE sql
 SECURITY DEFINER
AS $function$
  select team_id
  from public.users
  where id = user_uuid
  limit 1;
$function$
;


  create policy "Allow all for owner 1oj01fe_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'avatars'::text) AND (owner_id = (auth.uid())::text)));



  create policy "Allow all for owner 1oj01fe_1"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'avatars'::text) AND (owner_id = (auth.uid())::text)));



  create policy "Allow all for owner 1oj01fe_2"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'avatars'::text) AND (owner_id = (auth.uid())::text)));



  create policy "Allow all for owner 1oj01fe_3"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'avatars'::text) AND (owner_id = (auth.uid())::text)));



  create policy "Allow read by user's team 1oj01fe_0"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'avatars'::text) AND (public.get_team_id_for_user((owner_id)::uuid) = public.get_team_id_for_current_user())));



