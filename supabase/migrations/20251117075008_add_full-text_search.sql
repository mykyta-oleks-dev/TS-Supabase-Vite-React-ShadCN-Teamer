alter table "public"."products" add column "fts" tsvector generated always as (to_tsvector('english'::regconfig, (((COALESCE(title, ''::character varying))::text || ' '::text) || COALESCE(description, ''::text)))) stored;

CREATE INDEX products_fts_idx ON public.products USING gin (fts);


  create policy "Allow all to original creator's team 1ifhysk_0"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'products'::text) AND (get_team_id_for_user((owner_id)::uuid) = get_team_id_for_current_user())));



  create policy "Allow all to original creator's team 1ifhysk_1"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'products'::text) AND (get_team_id_for_user((owner_id)::uuid) = get_team_id_for_current_user())));



  create policy "Allow all to original creator's team 1ifhysk_2"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'products'::text) AND (get_team_id_for_user((owner_id)::uuid) = get_team_id_for_current_user())));



  create policy "Allow all to original creator's team 1ifhysk_3"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'products'::text) AND (get_team_id_for_user((owner_id)::uuid) = get_team_id_for_current_user())));



