const express = require('express');
const router = express.Router();
const path = require('path');
const postService = require('../services/post.service.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.render('adminpage');
});

router.get('/posts/json', (req, res) => {
  try {
    const todosOsPosts = postService.getAllPosts();
    res.json(todosOsPosts);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar os posts." });
  }
});

router.post('/blog/publicar', upload.single('imagemPost'), (req, res) => {
    try {
        const dadosDoNovoPost = {
            id: Date.now(),
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            imagemUrl: req.file ? '/uploads/' + req.file.filename : null,
            dataPublicacao: new Date().toISOString()
        };
        const postCriado = postService.createPost(dadosDoNovoPost);
        res.status(201).json(postCriado); 
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar o post." });
    }
});

router.post('/blog/apagar/:id', (req, res) => {
  const postId = Number(req.params.id);
  const sucesso = postService.deletePost(postId);
  if (sucesso) {
    res.status(204).send(); 
  } else {
    res.status(404).json({ mensagem: 'Post não encontrado.' });
  }
});

router.get('/blog/editar/:id', (req, res) => {
  const postId = Number(req.params.id);
  const post = postService.getPostById(postId);
  if (post) {
    res.render('editpost', { post: post });
  } else {
    res.status(404).send('Post não encontrado');
  }
});

router.post('/blog/editar/:id', upload.single('imagemPost'), (req, res) => {
  try {
    const postId = Number(req.params.id);
    
    const dadosAtualizados = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
    };

    if (req.file) {
      dadosAtualizados.imagemUrl = '/uploads/' + req.file.filename;
    }
    
    postService.updatePost(postId, dadosAtualizados);
    
    res.redirect('/admin');

  } catch (error) {
    console.error("Erro ao salvar a edição do post:", error);
    res.status(500).send("Ocorreu um erro ao salvar as alterações.");
  }
});

module.exports = router;