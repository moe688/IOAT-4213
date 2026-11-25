import { IncomingMessage, ServerResponse } from "node:http";
import { sendJson, sendNoContent } from "../views/response.view.ts";
import { getTasks, getTask, addTask, updateTask, deleteTask } from "../models/task.model.ts";
import { HttpError } from "../errors/http-errors.ts";
import { readJsonBody } from "../utils/request.ts";
import { parseTaskInput } from "../validators/task.validator.ts";

export async function handleTaskCollection(
	req: IncomingMessage,
	res: ServerResponse,
) {
	if (req.method === "GET") {
		sendJson(res, 200, getTasks());
	} else if (req.method === "POST") {
		const body = await readJsonBody(req);
		const input = parseTaskInput(body);
		const newTask = addTask(input.title);
		sendJson(res, 201, newTask);
	} else {
		throw new HttpError(
			405,
			"Method not allowed. Only GET or POST for a specific task",
		);
	}
}

export async function handleSingleTask(
	req: IncomingMessage,
	res: ServerResponse,
	id: number,
) {
	const task = getTask(id);
	if (!task) {
		throw new HttpError(404, "no task with such id found");
	}
	if (req.method === "GET") {
		sendJson(res, 200, task);
	} else if (req.method === "PUT") {
		const body = await readJsonBody(req);
		const input = parseTaskInput(body);
		const currentTask = getTask(id);
			if (!currentTask) {
			throw new HttpError(404, "Task was deleted while updating");
			}
		updateTask(currentTask, input.title, input.done);
		sendNoContent(res);
	} else if (req.method === "DELETE") {
		deleteTask(id);
		sendNoContent(res);
	} else {
		throw new HttpError(405, "Method not allowed. Only GET, PUT or DELETE");
	}
}
