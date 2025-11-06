drop policy "Enable update for team members only if draft" on "public"."products";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_product_update_with_status_check()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF (
    (NEW.status <> OLD.status OR NEW.status != 'draft')
    AND (
      (OLD.title <> NEW.title) OR
      (OLD.description <> NEW.description) OR
      (OLD.image <> NEW.image) OR
      (OLD.created_at <> NEW.created_at) OR
      (OLD.user_id <> NEW.user_id)
    )
  ) THEN
    RAISE EXCEPTION 'Product can only either change status or its data with status "draft"';
  END IF;

  RETURN NEW;
END;
$function$
;


  create policy "Enable update for team members"
  on "public"."products"
  as permissive
  for update
  to authenticated
using ((team_id = public.get_team_id_for_current_user()));


CREATE TRIGGER handle_product_update_with_status_check BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_product_update_with_status_check();


