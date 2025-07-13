const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  try {
    const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
    const postsFileContent = fs.readFileSync(postsFilePath, 'utf8');
    const todosOsPosts = JSON.parse(postsFileContent);
    
    res.render('blog', { posts: todosOsPosts });

  } catch (error) {
    console.error("Erro ao carregar os posts:", error);
    res.status(500).send("Erro ao carregar a página do blog.");
  }
});

module.exports = router;