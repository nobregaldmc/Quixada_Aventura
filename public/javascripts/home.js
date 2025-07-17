document.addEventListener('DOMContentLoaded', () => {
    async function carregarDestaquesBlog() {
        const container = document.getElementById('container-blog-destaques');
        if (!container) return;

        try {
            const response = await fetch('/api/posts');
            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.status}`);
            }
            const todosOsPosts = await response.json();

            const postsRecentes = todosOsPosts.slice(0, 4);

            if (!postsRecentes || postsRecentes.length === 0) {
                container.innerHTML = '<p>Nenhuma notícia em destaque no momento.</p>';
                return;
            }

            const postGrande = postsRecentes[0];
            const postsPequenos = postsRecentes.slice(1, 4);

            let htmlColunaEsquerda = '';
            postsPequenos.forEach(post => {
                htmlColunaEsquerda += `
                    <div class="card pequeno" style="background-image: url('${post.imagemUrl}');">
                        <div class="card-texto">
                            <span class="tag">Em destaque</span>
                            <h3>${post.titulo}</h3>
                        </div>
                    </div>
                `;
            });

            const htmlColunaDireita = `
                <div class="card grande" style="background-image: url('${postGrande.imagemUrl}');">
                    <div class="card-texto">
                        <span class="tag">Em destaque</span>
                        <h3>${postGrande.titulo}</h3>
                    </div>
                </div>
            `;

            container.innerHTML = `
                <div class="coluna-esquerda">${htmlColunaEsquerda}</div>
                <div class="coluna-direita">${htmlColunaDireita}</div>
            `;

        } catch (error) {
            console.error('Erro ao carregar destaques do blog na home:', error);
            if (container) container.innerHTML = '<p>Não foi possível carregar as notícias.</p>';
        }
    }

    carregarDestaquesBlog();
});
