const fs = require('fs');
const path = require('path');

const postsFilePath = path.join(__dirname, '..', 'data', 'posts.json');

function getAllPosts() {
  try {
    const postsFileContent = fs.readFileSync(postsFilePath, 'utf8');
    return JSON.parse(postsFileContent);
  } catch (error) {
    console.error("Erro ao ler o arquivo de posts:", error);
    return []; 
  }
}

function createPost(novoPost) {
  try {
    const posts = getAllPosts(); 
    posts.unshift(novoPost); 
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
    return novoPost;
  } catch (error) {
    console.error("Erro ao criar o post:", error);
    return null;
  }
}

// Exportamos as funções para que as rotas possam usá-las
module.exports = {
  getAllPosts,
  createPost
};