drop policy "Enable insert for users if authentication ID matches row's ID" on "public"."users";

alter table "public"."users" add column "about" text;


  create policy "Enable read access for all users"
  on "public"."users"
  as permissive
  for select
  to public
using (true);



  create policy "Enable users to create their profiles"
  on "public"."users"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = id));



