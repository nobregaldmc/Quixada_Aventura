const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/posts', (req, res) => {
  try {
    const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
    const postsFileContent = fs.readFileSync(postsFilePath, 'utf8');
    const todosOsPosts = JSON.parse(postsFileContent);

    res.json(todosOsPosts);

  } catch (error) {
    console.error("Erro ao ler os posts para a API:", error);
    res.status(500).json({ error: "Não foi possível carregar os posts." });
  }
});

module.exports = router;