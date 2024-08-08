import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
//import connectDatabase from "./database/db"
//import UserRoutes from "./routes/User"
//import TasksRoutes from "./routes/Task"

const port = process.env.PORT || 4000

dotenv.config()
const app = express()  
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

//app.use("/users", UserRoutes);
//app.use("/tasks", TasksRoutes);


app.listen(port, () => { 
     console.log(`REST API BuscoPartido - TypeScript funcionando en el puerto ${port}`)
  //   connectDatabase()
})



export default app