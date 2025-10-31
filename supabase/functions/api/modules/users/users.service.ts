import z from "@zod/zod";
import { getSuperClient } from '../../_shared/config/supabase.ts';
import {
  AppError,
  BadRequestError,
} from '../../_shared/types/middleware/error-handling.types.ts';
import { ERRORS } from './constants/errors.constants.ts';
import { SignUpBody } from "./types/body.types.ts";
import { signUpSchema } from './validation/schemas.ts';
import { handleAuthError } from "./utils/handlers.ts";

class UsersService {
    signUp = async (body: SignUpBody) => {
        const parsed = signUpSchema.safeParse(body);

        if (!parsed.success) {
            throw new BadRequestError(
                ERRORS.VALIDATION.SIGN_UP,
                z.treeifyError(parsed.error).properties
            );
        }

        const client = getSuperClient();

        const { error, data } = await client.auth.signUp(parsed.data);

        if (error) {
            handleAuthError(error);
        }

        const { user, session } = data;

        if (!user || !session) throw new AppError('Unexpected error');

        return { user, session };
    };
}

const usersService = new UsersService();

export default usersService;
