import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { handleRequest } from "./router.ts";
import { sendJson } from "./views/response.view.ts";
import { HttpError } from "./errors/http-errors.ts";

const PORT = process.env.PORT ?? 3000;

const server = createServer(
	async (req: IncomingMessage, res: ServerResponse) => {
		res.on("finish", () => {
			console.log(
				`Method: ${req.method}. Request URL: ${req.url}. Status Code: ${res.statusCode}`,
			);
		});

		try {
			await handleRequest(req, res);
		} catch (err) {
			console.error("caught: ", err);
			if (err instanceof HttpError) {
				sendJson(res, err.status, { error: err.message });
			} else {
				sendJson(res, 500, { error: "Internal server error!" });
			}
		}
	},
);

server.listen(PORT, () => {
	
});
