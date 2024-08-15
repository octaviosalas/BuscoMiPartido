import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDatabase from "./database/db"
import TokenRoutes from "./routes/Token"
import UserRoutes from "./routes/User"
import AdminRoutes from "./routes/Admin"
import ComplexRoutes from "./routes/Complex"
import ReviewsRoutes from "./routes/Review"
import ShiftsRoutes from "./routes/Shifts"
import TeamRoutes from "./routes/Team"
import { obtenerFechaActual, obtenerHorario17, obtenerHorario18 } from "./utils/hourDate"

const port = process.env.PORT || 4000

dotenv.config()
const app = express()  
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use("/token", TokenRoutes);
app.use("/user", UserRoutes);
app.use("/admin", AdminRoutes);
app.use("/complex", ComplexRoutes);
app.use("/reviews", ReviewsRoutes);
app.use("/shifts", ShiftsRoutes);
app.use("/team", TeamRoutes);



app.listen(port, () => { 
     console.log(`REST API BuscoPartido - TypeScript funcionando en el puerto ${port}`)
     connectDatabase()
     obtenerFechaActual()
     obtenerHorario17()
     obtenerHorario18()
})



export default app