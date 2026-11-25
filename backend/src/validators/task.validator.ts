import { HttpError } from "../errors/http-errors.ts";

export type TaskInput = {
	title: string;
	done: boolean;
};

export function parseTaskInput(body: any) {
	if (typeof body !== "object" || body === null || Array.isArray(body)) {
		throw new HttpError(400, "Body must be a JSON object");
	}
	const taskTitle = body.title;
	if (typeof taskTitle !== "string")
		throw new HttpError(400, "Title must be a string");
	const cleanTitle = taskTitle.trim();
	if (cleanTitle === "") {
		throw new HttpError(400, "Title must be not empty");
	}
	if (typeof body.done !== "undefined" && typeof body.done !== "boolean")
		throw new HttpError(400, "done must be a boolean");

	return {
		title: cleanTitle,
		done: body.done ?? false,
	};

}
