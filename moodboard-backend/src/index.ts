import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import journalRoutes from './routes/journal';

dotenv.config();

const app = express();
const PORT: number | string = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('MoodBoard API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});