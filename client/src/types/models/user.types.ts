import type { APIObject, ClientObject } from "./common.types";

interface UserPrimitives {
	id: string;
	fullName: string;
	avatar: string;
	about?: string | null;
	isDeleted: boolean;
	teamId?: string | null;
}

export interface UserAPI extends UserPrimitives, APIObject {}

export interface User extends UserPrimitives, ClientObject {}

export const mapUserFromAPI = (user: UserAPI): User => ({
	...user,
	createdAt: new Date(user.createdAt),
	updatedAt: new Date(user.updatedAt),
});

export const mapUserToAPI = (user: User): UserAPI => ({
	...user,
	createdAt: user.createdAt.toISOString(),
	updatedAt: user.updatedAt.toISOString(),
});
