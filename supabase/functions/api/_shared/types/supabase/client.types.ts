import { SupabaseClient as BaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types.ts";

export type TypedSupabaseClient = BaseClient<Database>;
