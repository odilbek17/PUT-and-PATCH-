import db from './db/database.js';

export function createPost({ title, content, category, tags, now }) {
  const stmt = db.prepare(`INSERT INTO posts (title, content, category, tags, createdAt, updatedAt)
                           VALUES (?, ?, ?, ?, ?, ?)`);
  const info = stmt.run(title, content, category, JSON.stringify(tags), now, now);
  return db.prepare('SELECT * FROM posts WHERE id = ?').get(info.lastInsertRowid);
}

export function updatePost(id, { title, content, category, tags, now }) {
  db.prepare(`UPDATE posts SET title=?, content=?, category=?, tags=?, updatedAt=? WHERE id=?`)
    .run(title, content, category, JSON.stringify(tags), now, id);
  return db.prepare('SELECT * FROM posts WHERE id=?').get(id);
}

export function deletePost(id) {
  return db.prepare('DELETE FROM posts WHERE id=?').run(id);
}

export function getPost(id) {
  return db.prepare('SELECT * FROM posts WHERE id=?').get(id);
}

export function getPosts(term) {
  if (term) {
    const q = `%${term.toLowerCase()}%`;
    return db.prepare(`
      SELECT * FROM posts
      WHERE lower(title) LIKE ? OR lower(content) LIKE ? OR lower(category) LIKE ?
      ORDER BY createdAt DESC
    `).all(q, q, q);
  }
  return db.prepare('SELECT * FROM posts ORDER BY createdAt DESC').all();
}
