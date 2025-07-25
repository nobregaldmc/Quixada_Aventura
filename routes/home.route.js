const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  try {
    const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
    const postsFileContent = fs.readFileSync(postsFilePath, 'utf8');
    const todosOsPosts = JSON.parse(postsFileContent);

    const postsRecentes = todosOsPosts.slice(0, 5);

    res.render('home', { postsRecentes: postsRecentes });

  } catch (error) {
    console.error("Erro ao carregar posts para a home:", error);
    res.render('home', { postsRecentes: [] }); 
  }
});

module.exports = router;