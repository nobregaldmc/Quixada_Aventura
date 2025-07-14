document.addEventListener('DOMContentLoaded', () => {
    const displayPrincipal = document.getElementById('display-post-principal');
    const containerSugestoes = document.getElementById('container-sugestoes');
    const header = document.getElementById('navbar');

    if (!displayPrincipal || !containerSugestoes) {
        console.error('Elementos do blog não encontrados!');
        return;
    }

    function renderizarPrincipal(post) {
        if (!post) {
            displayPrincipal.innerHTML = '<h2>Bem-vindo ao Blog!</h2><p>Nenhum post publicado ainda.</p>';
            return;
        }
        const html = `
            <article class="blog-post">
                <h2>${post.titulo}</h2>
                ${post.imagemUrl ? `<img src="${post.imagemUrl}" alt="${post.titulo}" class="post-img" />` : ''}
                <p>${post.descricao.replace(/\n/g, '<br>')}</p>
                <p class="data">
                    Publicado em: ${new Date(post.dataPublicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
            </article>
        `;
        displayPrincipal.innerHTML = html;
    }

    function renderizarSugestoes(sugestoes) {
        let html = '';
        if (sugestoes && sugestoes.length > 0) {
            sugestoes.forEach(sugestao => {
                html += `
                    <div class="sugestao">
                        ${sugestao.imagemUrl ? `<img src="${sugestao.imagemUrl}" alt="${sugestao.titulo}">` : ''}
                        <div>
                            <h4>${sugestao.titulo}</h4>
                            <p class="sugestao-descricao">${sugestao.descricao.substring(0, 80)}...</p>
                            <small><a href="#" class="btn-ler-artigo" data-id="${sugestao.id}">ler artigo</a></small>
                        </div>
                    </div>
                `;
            });
        } else {
            html = '<p>Nenhuma outra sugestão no momento.</p>';
        }
        containerSugestoes.innerHTML = html;
    }

    async function carregarBlog() {
        try {
            const response = await fetch('/api/posts');
            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.status}`);
            }
            const todosOsPosts = await response.json();
            let postPrincipalAtual = todosOsPosts[0];
            let listaDeSugestoes = todosOsPosts.slice(1);

            renderizarPrincipal(postPrincipalAtual);
            renderizarSugestoes(listaDeSugestoes);

            containerSugestoes.addEventListener('click', (event) => {
                const botaoClicado = event.target.closest('.btn-ler-artigo');
                if (botaoClicado) {
                    event.preventDefault();
                    const postId = Number(botaoClicado.dataset.id);
                    const postClicado = todosOsPosts.find(p => p.id === postId);
                    if (postClicado) {
                        postPrincipalAtual = postClicado;
                        listaDeSugestoes = todosOsPosts.filter(p => p.id !== postPrincipalAtual.id).sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao));
                        renderizarPrincipal(postPrincipalAtual);
                        renderizarSugestoes(listaDeSugestoes);
                        const headerHeight = header ? header.offsetHeight : 0;
                        const topPos = displayPrincipal.offsetTop - headerHeight - 20;
                        window.scrollTo({ top: topPos, behavior: 'smooth' });
                    }
                }
            });

        } catch (error) {
            console.error('Erro ao buscar e renderizar posts:', error);
            displayPrincipal.innerHTML = '<h2>Erro ao carregar o blog. Tente novamente mais tarde.</h2>';
        }
    }

    carregarBlog();
});
