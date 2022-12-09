import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mung from "express-mung";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  mung.json((body: any, req: Request, res: Response) => {
    console.log("Middleware 2 😊");
    console.log(body);
    body.message = "Hello World! 😎😍";
    return body;
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware 1 😊");
  next();
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Route 😊");
  res.json({ message: "Hello World! 😎" });
  next();
});

app.listen(port, () => {
  console.log(`⚡ Server running on port ${port}`);
});
