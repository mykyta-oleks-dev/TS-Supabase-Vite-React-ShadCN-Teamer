export type GetManyQuery<T> = {
	page?: number;
	limit?: number;
	orderBy?: keyof T;
	orderByType?: 'asc' | 'desc';
}
