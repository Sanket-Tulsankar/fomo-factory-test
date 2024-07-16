import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getData } from "./services/database_service";
import getdataFromDB from './services/getdata_database';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(getdataFromDB);
app.use(cors());

const connection=mongoose.connect(process.env.MONGODB_URI!).then(()=>{
    console.log("Database connected successfully!!");
    getData();
}).catch(error=>{
    throw error;
});

app.get('/', (req, res) => {
    res.send("Testing route!!");
})

app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});