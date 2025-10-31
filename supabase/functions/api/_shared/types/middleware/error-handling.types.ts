import { ContentfulStatusCode } from "@hono/hono/utils/http-status";
import { HTTP, HTTP_LABEL } from "../../constants/http.constants.ts";

export type Payload = Record<string, string | number>;

// Custom error class for better error handling
export class AppError extends Error {
	constructor(
		message: string,
		public status: ContentfulStatusCode = HTTP.INTERNAL,
		public payload?: Payload,
		public isOperational: boolean = true
	) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

// Predefined error creators
export class BadRequestError extends AppError {
	constructor(
		message: string = HTTP_LABEL[HTTP.BAD_REQUEST],
		payload?: Payload
	) {
		super(message, HTTP.BAD_REQUEST, payload);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string = HTTP_LABEL[HTTP.UNAUTHORIZED]) {
		super(message, HTTP.UNAUTHORIZED);
	}
}

export class ForbiddenError extends AppError {
	constructor(message: string = HTTP_LABEL[HTTP.FORBIDDEN]) {
		super(message, HTTP.FORBIDDEN);
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = HTTP_LABEL[HTTP.NOT_FOUND]) {
		super(message, HTTP.NOT_FOUND);
	}
}

export class ConflictError extends AppError {
	constructor(message: string = HTTP_LABEL[HTTP.CONFLICT]) {
		super(message, HTTP.CONFLICT);
	}
}

// Error response interface
export interface ErrorResponse {
	status: 'error' | 'fail';
	message: string;
	stack?: string;
	errors?: unknown;
	payload?: Payload;
}
