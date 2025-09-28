import express from 'express';
import postRoutes from '../blog-api/routes/postRoutes.js';

const app = express();
app.use(express.json());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
