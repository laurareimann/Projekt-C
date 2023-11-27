/* eslint-disable @typescript-eslint/no-unused-vars */
import express, {Request, Response} from 'express';

const app = express();

app.get('/api/products',(req:Request, res: Response) =>{
    
})
const PORT = 4000
app.listen(PORT,() => {
    console.log('Server started at http://localhost:${PORT}')
})