document.addEventListener('DOMContentLoaded', () => {
  const botaoAdicionar = document.getElementById("botao-adicionar-imagem");
  const inputImagem = document.getElementById("input-imagem");
  const nomeArquivoSpan = document.getElementById("nome-arquivo");

  if (botaoAdicionar && inputImagem && nomeArquivoSpan) {
    botaoAdicionar.addEventListener("click", () => { inputImagem.click(); });
    inputImagem.addEventListener("change", () => {
      nomeArquivoSpan.textContent = inputImagem.files.length > 0 ? inputImagem.files[0].name : "Nenhum";
    });
  }

  const formPublicar = document.querySelector('.formulario');
  if (formPublicar) {
    formPublicar.addEventListener('submit', async (event) => {
      event.preventDefault(); 
      const submitButton = formPublicar.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Publicando...';
      const formData = new FormData(formPublicar);

      try {
        const response = await fetch('/admin/blog/publicar', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) { throw new Error('Falha ao publicar o post.'); }
        formPublicar.reset(); 
        document.getElementById('nome-arquivo').textContent = 'Nenhum';
        alert('Post publicado com sucesso!');
        carregarPostsParaAdmin();
      } catch (error) {
        console.error('Erro no formulário de publicação:', error);
        alert('Não foi possível publicar o post.'); 
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Publicar';
      }
    });
  }

  const container = document.getElementById('lista-posts-admin');
  async function carregarPostsParaAdmin() {
    if (!container) return;
    try {
      const response = await fetch('/admin/posts/json');
      const posts = await response.json();
      
      let html = '<div class="lista-gerenciar">';
      if (posts.length > 0) {
        posts.forEach(post => {
          const tituloCurto = post.titulo.length > 30 ? post.titulo.substring(0, 30) + '...' : post.titulo;
          html += `
            <div class="item-gerenciar">
              <span class="item-titulo">${tituloCurto}</span>
              <div class="item-acoes">
                <a href="/admin/blog/editar/${post.id}" class="btn-acao-gerenciar editar">Editar</a>
                <button type="button" class="btn-acao-gerenciar apagar" data-id="${post.id}">Apagar</button>
              </div>
            </div>
          `;
        });
      } else {
        html += '<p>Nenhum post para gerenciar.</p>';
      }
      html += '</div>';
      container.innerHTML = html;
    } catch (error) {
      console.error('Erro ao carregar posts no admin:', error);
      container.innerHTML = '<p>Erro ao carregar os posts.</p>';
    }
  }

  if (container) {
    container.addEventListener('click', async (event) => {
      if (event.target.classList.contains('apagar')) {
        if (confirm('Tem certeza que deseja apagar este post?')) {
          const postId = event.target.dataset.id;
          try {
            const response = await fetch(`/admin/blog/apagar/${postId}`, {
              method: 'POST'
            });
            if (!response.ok) { throw new Error('Falha ao apagar o post.'); }
            carregarPostsParaAdmin(); 
          } catch (error) {
            console.error('Erro ao apagar:', error);
            alert('Não foi possível apagar o post.');
          }
        }
      }
    });
  }

  carregarPostsParaAdmin(); 
});