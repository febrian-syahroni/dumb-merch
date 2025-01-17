import express from 'express';
import { getAllGenders } from '../controllers/gender';

const genderRoutes = express.Router();

genderRoutes.get('/', getAllGenders);

export default genderRoutes;