document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('form-editar');
  const tituloPagina = document.getElementById('titulo-pagina');
  const inputTitulo = document.getElementById('titulo');
  const inputDescricao = document.getElementById('descricao');
  const containerImagem = document.getElementById('imagem-atual-container');
  const btnSalvar = form.querySelector('button[type="submit"]');

  try {
    const urlParts = window.location.pathname.split('/');
    const postId = urlParts[urlParts.length - 1];

    const response = await fetch(`/api/posts/${postId}`);
    if (!response.ok) {
      throw new Error('Post não encontrado.');
    }
    const post = await response.json();

    tituloPagina.textContent = 'Editar Post';
    inputTitulo.value = post.titulo;
    inputDescricao.value = post.descricao;

    if (post.imagemUrl) {
      containerImagem.innerHTML = `<p>Imagem atual: <img src="${post.imagemUrl}" width="150" alt="Imagem atual"></p>`;
    }

    form.action = `/admin/blog/editar/${post.id}`;

    inputTitulo.disabled = false;
    inputDescricao.disabled = false;
    btnSalvar.disabled = false;

  } catch (error) {
    console.error('Erro ao carregar post para edição:', error);
    tituloPagina.textContent = 'Erro ao Carregar Post';
    form.innerHTML = '<p>Não foi possível encontrar os dados deste post. Por favor, volte para a página de administração.</p>';
  }
});