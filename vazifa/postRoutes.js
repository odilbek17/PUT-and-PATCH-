import express from 'express';
import { body } from 'express-validator';
import { create, update, remove, getOne, getAll } from '../blog-api/controllers/postController.js';

const router = express.Router();

router.post('/',
  body('title').isString().isLength({ min: 1 }),
  body('content').isString().isLength({ min: 1 }),
  body('category').isString().isLength({ min: 1 }),
  body('tags').optional().isArray(),
  create
);

router.put('/:id',
  body('title').isString().isLength({ min: 1 }),
  body('content').isString().isLength({ min: 1 }),
  body('category').isString().isLength({ min: 1 }),
  body('tags').optional().isArray(),
  update
);

router.delete('/:id', remove);
router.get('/:id', getOne);
router.get('/', getAll);

export default router;
