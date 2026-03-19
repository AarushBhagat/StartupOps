import dotenv from 'dotenv';
// Load environment variables before anything else
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
