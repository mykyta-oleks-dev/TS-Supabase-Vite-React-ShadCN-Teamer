create extension if not exists "pg_cron" with schema "pg_catalog";

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
