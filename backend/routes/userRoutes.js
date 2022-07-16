import express from 'express';
import { createUser, deleteUser, getAllUser, getUser, updateUser } from '../controllers/userscontroller.js';

const router = express.Router();

router.post('/create', createUser);
router.get('/',getAllUser);
router.get('/:id',getUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

export default router;