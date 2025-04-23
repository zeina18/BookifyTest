import express from 'express';
import { getAllCinemas } from '../services/cinemaServices';

const router = express.Router();


router.get('/', async (request, response) => {
    try {
    const cinema = await getAllCinemas();
    response.status(200).send(cinema)
    } catch (err) {
    response.status(500).send("Something went wrong!") 
    }
});

export default router;