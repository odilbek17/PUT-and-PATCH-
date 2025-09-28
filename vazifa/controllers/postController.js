import { validationResult } from 'express-validator';
import { createPost, updatePost, deletePost, getPost, getPosts } from '../models/postModel.js';

function rowToPost(row) {
    if (!row) return null;
    return {
        id: row.id,
        title: row.title,
        content: row.content,
        category: row.category,
        tags: row.tags ? JSON.parse(row.tags) : [],
        createdAt: row.createdAt,
        updatedAt: row.updatedAt
    };
}

export const create = (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

    const { title, content, category, tags = [] } = req.body;
    const now = new Date().toISOString();
    const row = createPost({ title, content, category, tags, now });
    return res.status(201).json(rowToPost(row));
};

export const update = (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

    const id = Number(req.params.id);
    const existing = getPost(id);
    if (!existing) return res.status(404).json({ message: 'Post not found' });

    const { title, content, category, tags = [] } = req.body;
    const now = new Date().toISOString();
    const row = updatePost(id, { title, content, category, tags, now });
    return res.status(200).json(rowToPost(row));
};

export const remove = (req, res) => {
    const id = Number(req.params.id);
    const result = deletePost(id);
    if (result.changes === 0) return res.status(404).json({ message: 'Post not found' });
    return res.status(204).send();
};

export const getOne = (req, res) => {
    const id = Number(req.params.id);
    const row = getPost(id);
    if (!row) return res.status(404).json({ message: 'Post not found' });
    return res.status(200).json(rowToPost(row));
};

export const getAll = (req, res) => {
    const { term } = req.query;
    const rows = getPosts(term);
    return res.status(200).json(rows.map(rowToPost));
};
