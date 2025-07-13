const botaoAdicionar = document.getElementById("botao-adicionar-imagem");
const inputImagem = document.getElementById("input-imagem");
const nomeArquivoSpan = document.getElementById("nome-arquivo");

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
