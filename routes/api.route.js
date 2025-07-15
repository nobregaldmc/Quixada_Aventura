const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const postService = require('../services/post.service.js');


const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'public/uploads/'); },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get('/posts', (req, res) => {
  try {
    const todosOsPosts = postService.getAllPosts();
    res.json(todosOsPosts);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar os posts." });
  }
});

router.post('/posts', upload.single('imagemPost'), (req, res) => {
  try {
    let imageUrl = null;
    if (req.file) {
      imageUrl = '/uploads/' + req.file.filename;
    }

    const dadosDoNovoPost = {
      id: Date.now(),
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      imagemUrl: imageUrl,
      dataPublicacao: new Date().toISOString()
    };

    const postCriado = postService.createPost(dadosDoNovoPost);

    res.status(201).json(postCriado);

  } catch (error) {
    res.status(500).json({ mensagem: "Ocorreu um erro ao publicar a notícia." });
  }
});

module.exports = router;