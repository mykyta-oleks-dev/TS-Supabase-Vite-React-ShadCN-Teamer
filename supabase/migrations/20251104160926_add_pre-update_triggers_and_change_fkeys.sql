create extension if not exists "moddatetime" with schema "public";

alter table "public"."teams" drop constraint "teams_leader_id_fkey";

alter table "public"."users" drop constraint "users_id_fkey";

alter table "public"."teams" add constraint "teams_leader_id_fkey" FOREIGN KEY (leader_id) REFERENCES public.users(id) not valid;

alter table "public"."teams" validate constraint "teams_leader_id_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";

CREATE TRIGGER handle_team_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.moddatetime('updated_at');

CREATE TRIGGER handle_user_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.moddatetime('updated_at');


