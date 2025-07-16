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

function deletePost(postId) {
  try {
    const posts = getAllPosts();
    const postsAtualizados = posts.filter(p => p.id !== postId);
    
    fs.writeFileSync(postsFilePath, JSON.stringify(postsAtualizados, null, 2));
    return true; 
  } catch (error) {
    console.error("Erro ao apagar o post:", error);
    return false; 
  }
}

function getPostById(postId) {
  const posts = getAllPosts();
  return posts.find(p => p.id === postId);
}

function updatePost(postId, dadosAtualizados) {
  try {
    const posts = getAllPosts();
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return null; 
    }

    posts[postIndex] = { ...posts[postIndex], ...dadosAtualizados };
    
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
    return posts[postIndex]; 
  } catch (error) {
    console.error("Erro ao atualizar o post:", error);
    return null;
  }
}

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getPostById,
  updatePost 
};