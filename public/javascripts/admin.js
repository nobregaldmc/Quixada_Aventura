document.addEventListener('DOMContentLoaded', () => {
  async function carregarPostsParaAdmin() {
    const container = document.getElementById('lista-posts-admin');
    if (!container) return;

    try {
      const response = await fetch('/api/posts');
      const posts = await response.json();

      if (posts.length === 0) {
        container.innerHTML = '<p>Nenhum post para gerenciar.</p>';
        return;
      }

      let html = '';
      posts.forEach(post => {
        html += `
          <div class="post-item">
            <span class="post-titulo">${post.titulo}</span>
            <div class="post-acoes">
              <a href="/admin/blog/editar/${post.id}" class="btn-editar">Editar</a>
              <form action="/admin/blog/apagar/${post.id}" method="POST" onsubmit="return confirm('Tem certeza que deseja apagar este post?');">
                <button type="submit" class="btn-apagar">Apagar</button>
              </form>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;

    } catch (error) {
      console.error('Erro ao carregar posts no admin:', error);
      container.innerHTML = '<p>Erro ao carregar os posts.</p>';
    }
  }
  carregarPostsParaAdmin();
});