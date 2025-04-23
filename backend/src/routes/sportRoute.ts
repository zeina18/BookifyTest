import express from 'express';
import { getAllSports } from '../services/sportService';

const router = express.Router();


router.get('/', async (request, response) => {
    try {
    const sport = await getAllSports();
    response.status(200).send(sport)
    } catch (err) {
    response.status(500).send("Something went wrong!") 
    }
});

export default router;