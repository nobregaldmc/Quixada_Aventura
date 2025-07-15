document.addEventListener('DOMContentLoaded', () => {

  const botaoAdicionar = document.getElementById("botao-adicionar-imagem");
  const inputImagem = document.getElementById("input-imagem");
  const nomeArquivoSpan = document.getElementById("nome-arquivo");

  if (botaoAdicionar && inputImagem && nomeArquivoSpan) {
    botaoAdicionar.addEventListener("click", () => {
      inputImagem.click();
    });

    inputImagem.addEventListener("change", () => {
      if (inputImagem.files.length > 0) {
        nomeArquivoSpan.textContent = inputImagem.files[0].name;
      } else {
        nomeArquivoSpan.textContent = "Nenhum";
      }
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
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Falha ao publicar o post.');
        }

        formPublicar.reset(); 
        document.getElementById('nome-arquivo').textContent = 'Nenhum';
        
        console.log('Post publicado com sucesso!'); 

      } catch (error) {
        console.error('Erro no formulário de publicação:', error);
        alert('Não foi possível publicar o post.'); 
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Publicar';
      }
    });
  }
});