export type Task = {
	id: number;
	title: string;
	done: boolean;
};

const tasks = new Map<number, Task>();
let nextId = 1;

export const getTasks = (): Task[] => {
	return Array.from(tasks.values());
};
export const getTask = (id: number): Task | undefined => {
	return tasks.get(id);
};
export const addTask = (title: string): Task => {
	const task: Task = { id: nextId, title, done: false };
	tasks.set(nextId, task);
	nextId++;
	return task;
};
export const updateTask = (task: Task, newTitle: string, newDone: boolean): Task => {
	task.title = newTitle;
	task.done = newDone;
	return task;
};
export const deleteTask = (id: number): boolean => {
	return tasks.delete(id);
};