import express from 'express';
import Price from '../models/price';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/getPriceData/:id',async (request,response)=>{
    try {
        const { id } = request.params;
        const data = await Price.find({ id }).sort({ time: -1 }).limit(20);
        response.json(data);
      } catch (error) {
        response.status(500).json({ message: 'Error fetching data' });
      }
})

export default app;