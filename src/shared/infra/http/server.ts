import { Logger } from "@shared/logger/index";
import { app } from "./app";

app.listen(8080, () => Logger.info("Server is running!"));
