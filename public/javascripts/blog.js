document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.querySelector('.blog-container');
    const displayPrincipal = document.getElementById('display-post-principal');
    const containerSugestoes = document.getElementById('container-sugestoes');
    const header = document.getElementById('navbar');

    if (!blogContainer || !displayPrincipal || !containerSugestoes) return;

    const todosOsPosts = JSON.parse(blogContainer.dataset.posts);

    if (todosOsPosts.length === 0) {
        displayPrincipal.innerHTML = '<h2>Bem-vindo ao Blog!</h2><p>Nenhum post publicado ainda.</p>';
        return;
    }
    
    let postPrincipalAtual = todosOsPosts[0];
    let listaDeSugestoes = todosOsPosts.slice(1);

    function renderizarPrincipal() {
        const post = postPrincipalAtual;
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

    function renderizarSugestoes() {
        let html = '';
        listaDeSugestoes.forEach(sugestao => {
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
        containerSugestoes.innerHTML = html;
    }

    containerSugestoes.addEventListener('click', (event) => {
        const botaoClicado = event.target.closest('.btn-ler-artigo');
        if (botaoClicado) {
            event.preventDefault();
            
            const postId = Number(botaoClicado.dataset.id);
            const postClicado = listaDeSugestoes.find(p => p.id === postId);
            
            if (postClicado) {
                const antigoPrincipal = postPrincipalAtual;
                postPrincipalAtual = postClicado;
                
                listaDeSugestoes = todosOsPosts
                    .filter(p => p.id !== postPrincipalAtual.id)
                    .sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao));

                renderizarPrincipal();
                renderizarSugestoes();

                const headerHeight = header ? header.offsetHeight : 0;
                window.scrollTo({
                    top: displayPrincipal.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        }
    });

    renderizarPrincipal();
    renderizarSugestoes();
});
