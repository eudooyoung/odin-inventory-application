import type Response = require("express");
import type e = require("express");

export type ControllerMiddleware = (req: e.Request, res: e.Response) => void;
