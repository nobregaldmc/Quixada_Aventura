const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
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

router.post('/blog/publicar', upload.single('imagemPost'), (req, res) => {
  const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');
  
  try {
    const postsFileContent = fs.readFileSync(postsFilePath, 'utf8');
    const posts = JSON.parse(postsFileContent);

    let imageUrl = null;
    if (req.file) {
      imageUrl = '/uploads/' + req.file.filename;
    }

    const novoPost = {
      id: Date.now(),
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      imagemUrl: imageUrl,
      dataPublicacao: new Date().toISOString()
    };

    posts.unshift(novoPost);
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
    res.redirect('/admin');

  } catch (error) {
    console.error("Erro ao salvar o post:", error);
    res.status(500).send("Ocorreu um erro ao publicar a notícia.");
  }
});

module.exports = router;