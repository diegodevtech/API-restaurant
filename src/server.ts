import express from "express"
import { routes } from "./routes";
import { errorHandlingMiddleware } from "./middlewares/error-handling";

const PORT = 3333;
const app = express();

app.use(express.json());
app.use(routes);


app.use(errorHandlingMiddleware);
app.listen(PORT, () => console.log("Running on PORT: ", PORT))