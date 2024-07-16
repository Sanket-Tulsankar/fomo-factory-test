import axios from 'axios';
import Price from '../models/price';

let intervalId: NodeJS.Timeout;

const ids = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'solana'];

export const getData = async () => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd`, {
            headers: { accept: 'application/json', 'x-cg-api-key': 'CG-HdtQUrfezs4Jw8n8f3U5EU2N' }
        });
        const data = response.data;
        console.log(data);
        ids.forEach(async (id) => {
            const price = new Price({ id, price: data[id].usd });
            await price.save();
            console.log("Saved data successfully!!")
        });
    } catch (error) {
        console.error('Error getting data');
        clearInterval(intervalId);
    }
};


setInterval(() => {
    intervalId = setInterval(() => {
        getData()
    }, 5000);
}, 60000);