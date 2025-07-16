const express = require('express');
const router = express.Router();
const postService = require('../services/post.service.js');

router.get('/posts', (req, res) => {
  try {
    const todosOsPosts = postService.getAllPosts();
    res.json(todosOsPosts);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar os posts." });
  }
});

router.get('/posts/:id', (req, res) => {
  try {
    const postId = Number(req.params.id);
    const postEncontrado = postService.getPostById(postId);

    if (postEncontrado) {
      res.json(postEncontrado); 
    } else {
      res.status(404).json({ mensagem: "Post não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar o post." });
  }
});

module.exports = router;