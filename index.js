import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Servidor em pé na porta ${port}`));