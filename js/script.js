
// ==========================================
// CARROSSEL DA PÁGINA INICIAL
// ==========================================

const carrossel = document.querySelector(".carrossel-lista");

const desenhosCarrossel = Array.from(
    document.querySelectorAll(".desenho-carrossel")
);

function atualizarCarrossel(indiceCentro) {

    if (!carrossel || desenhosCarrossel.length < 3) {
        return;
    }

    desenhosCarrossel.forEach(function(desenho, indice) {

        desenho.classList.remove(
            "destaque",
            "lado-esquerdo",
            "lado-direito"
        );

        if (indice === indiceCentro) {

            desenho.classList.add("destaque");

        } else if (
            indice === (indiceCentro + 1) % desenhosCarrossel.length
        ) {

            desenho.classList.add("lado-direito");

        } else {

            desenho.classList.add("lado-esquerdo");

        }

    });

    const ordem = [
        desenhosCarrossel[
            (indiceCentro + 1) % desenhosCarrossel.length
        ],

        desenhosCarrossel[indiceCentro],

        desenhosCarrossel[
            (indiceCentro + 2) % desenhosCarrossel.length
        ]
    ];

    ordem.forEach(function(desenho) {
        carrossel.appendChild(desenho);
    });

}

desenhosCarrossel.forEach(function(desenho, indice) {

    desenho.addEventListener("click", function() {

        if (desenho.classList.contains("destaque")) {
            return;
        }

        atualizarCarrossel(indice);

    });

});

if (carrossel && desenhosCarrossel.length >= 3) {
    atualizarCarrossel(1);
}


// ==========================================
// FILTROS DA GALERIA
// ==========================================

const botoesFiltro = document.querySelectorAll(".filtro-btn");

const desenhosGaleria = Array.from(
    document.querySelectorAll("#portfolio .desenho")
);

botoesFiltro.forEach(function(botao) {

    const filtro = botao.dataset.filtro;

    let quantidade = 0;

    if (filtro === "todos") {

        quantidade = desenhosGaleria.length;

    } else {

        quantidade = desenhosGaleria.filter(function(desenho) {
            return desenho.dataset.categoria === filtro;
        }).length;

    }

    const contador = document.createElement("span");

    contador.classList.add("filtro-contagem");
    contador.textContent = quantidade;

    botao.appendChild(contador);

});

botoesFiltro.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const filtroSelecionado = botao.dataset.filtro;

        botoesFiltro.forEach(function(outroBotao) {
            outroBotao.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        desenhosGaleria.forEach(function(desenho) {

            const categoria = desenho.dataset.categoria;

            const deveMostrar =
                filtroSelecionado === "todos" ||
                categoria === filtroSelecionado;

            if (deveMostrar) {

                desenho.classList.remove("oculto");

                desenho.classList.remove("aparecendo");

                void desenho.offsetWidth;

                desenho.classList.add("aparecendo");

            } else {

                desenho.classList.add("oculto");
                desenho.classList.remove("aparecendo");

            }

        });

    });

});


// ==========================================
// LIGHTBOX - VISUALIZAÇÃO AMPLIADA
// ==========================================

const lightbox = document.getElementById("lightbox");

const imagemAmpliada = document.getElementById("lightbox-imagem");

const tituloDesenho = document.getElementById("lightbox-titulo");

const descricaoDesenho = document.getElementById("lightbox-descricao");

const botaoFechar = document.getElementById("fechar-lightbox");

const botaoAnterior = document.getElementById("desenho-anterior");

const botaoProximo = document.getElementById("proximo-desenho");

let desenhoAtual = 0;

const lightboxCompleto =
    lightbox &&
    imagemAmpliada &&
    tituloDesenho &&
    descricaoDesenho;

function obterDesenhosVisiveis() {

    return desenhosGaleria.filter(function(desenho) {
        return !desenho.classList.contains("oculto");
    });

}

function abrirLightbox() {

    if (!lightboxCompleto) {
        return;
    }

    const visiveis = obterDesenhosVisiveis();

    if (visiveis.length === 0) {
        return;
    }

    if (desenhoAtual >= visiveis.length) {
        desenhoAtual = 0;
    }

    if (desenhoAtual < 0) {
        desenhoAtual = visiveis.length - 1;
    }

    const desenho = visiveis[desenhoAtual];

    const imagem = desenho.querySelector("img");

    const titulo = desenho.querySelector("p");

    if (!imagem || !titulo) {
        return;
    }

    imagemAmpliada.src = imagem.src;
    imagemAmpliada.alt = imagem.alt;

    tituloDesenho.textContent = titulo.textContent;

    descricaoDesenho.textContent = "";

    lightbox.style.display = "flex";

}

function fecharLightbox() {

    if (!lightboxCompleto) {
        return;
    }

    lightbox.style.display = "none";

}

desenhosGaleria.forEach(function(desenho) {

    desenho.addEventListener("click", function() {

        const visiveis = obterDesenhosVisiveis();

        desenhoAtual = visiveis.indexOf(desenho);

        if (desenhoAtual !== -1) {
            abrirLightbox();
        }

    });

});

if (botaoFechar) {
    botaoFechar.addEventListener("click", fecharLightbox);
}

if (botaoAnterior) {

    botaoAnterior.addEventListener("click", function() {

        desenhoAtual--;
        abrirLightbox();

    });

}

if (botaoProximo) {

    botaoProximo.addEventListener("click", function() {

        desenhoAtual++;
        abrirLightbox();

    });

}

if (lightbox) {

    lightbox.addEventListener("click", function(event) {

        if (event.target === lightbox) {
            fecharLightbox();
        }

    });

}

document.addEventListener("keydown", function(event) {

    if (!lightbox || lightbox.style.display !== "flex") {
        return;
    }

    if (event.key === "Escape") {
        fecharLightbox();
    }

    if (event.key === "ArrowLeft") {
        desenhoAtual--;
        abrirLightbox();
    }

    if (event.key === "ArrowRight") {
        desenhoAtual++;
        abrirLightbox();
    }

});


// ==========================================
// PLAYER DE MÚSICA - DISCO GIRATÓRIO
// NÃO ALTERAR
// ==========================================

const audioPortfolio = document.getElementById("audioPortfolio");

const discoVinil = document.getElementById("discoVinil");

if (audioPortfolio && discoVinil) {

    audioPortfolio.addEventListener("play", function() {
        discoVinil.classList.add("girando");
    });

    audioPortfolio.addEventListener("pause", function() {
        discoVinil.classList.remove("girando");
    });

    audioPortfolio.addEventListener("ended", function() {
        discoVinil.classList.remove("girando");
    });

}


// ==========================================
// INTERESSES PESSOAIS - ABA SOBRE MIM
// ==========================================

const botoesInteresse = document.querySelectorAll(".interesse-btn");

const paineisInteresse = document.querySelectorAll(".interesse-painel");

if (botoesInteresse.length > 0 && paineisInteresse.length > 0) {

    botoesInteresse.forEach(function(botao) {

        botao.classList.remove("ativo");
        botao.setAttribute("aria-expanded", "false");

    });

    paineisInteresse.forEach(function(painel) {
        painel.hidden = true;
    });

    botoesInteresse.forEach(function(botao) {

        botao.addEventListener("click", function() {

            const categoriaSelecionada = botao.dataset.categoria;

            const painelSelecionado = document.getElementById(
                categoriaSelecionada
            );

            const jaEstaAberto = botao.classList.contains("ativo");

            botoesInteresse.forEach(function(outroBotao) {

                outroBotao.classList.remove("ativo");

                outroBotao.setAttribute("aria-expanded", "false");

            });

            paineisInteresse.forEach(function(painel) {
                painel.hidden = true;
            });

            if (jaEstaAberto) {
                return;
            }

            if (painelSelecionado) {

                botao.classList.add("ativo");

                botao.setAttribute("aria-expanded", "true");

                painelSelecionado.hidden = false;

            }

        });

    });

}


// ==========================================
// PLAYER DE MÚSICA - CARDS DE GÊNEROS
// ==========================================

const botoesMusica = document.querySelectorAll(".musica-play");

let audioGeneroAtual = null;

let botaoMusicaAtual = null;

botoesMusica.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const caminhoAudio = botao.dataset.audio;

        // Verificar se o botão possui um arquivo de áudio

        if (!caminhoAudio) {
            return;
        }

        // Se clicar na música que já está tocando,
        // pausar a reprodução

        if (botaoMusicaAtual === botao && audioGeneroAtual) {

            audioGeneroAtual.pause();

            botao.classList.remove("tocando");

            botao.innerHTML = "▶";

            botao.setAttribute("aria-label", "Tocar música");

            audioGeneroAtual = null;

            botaoMusicaAtual = null;

            return;

        }

        // Parar a música anterior

        if (audioGeneroAtual) {

            audioGeneroAtual.pause();

            audioGeneroAtual.currentTime = 0;

        }

        // Restaurar o botão anterior

        if (botaoMusicaAtual) {

            botaoMusicaAtual.classList.remove("tocando");

            botaoMusicaAtual.innerHTML = "▶";

            botaoMusicaAtual.setAttribute(
                "aria-label",
                "Tocar música"
            );

        }

        // Criar o novo áudio

        const novoAudio = new Audio(caminhoAudio);

        audioGeneroAtual = novoAudio;

        botaoMusicaAtual = botao;

        botao.classList.add("tocando");

        botao.innerHTML = "Ⅱ";

        botao.setAttribute("aria-label", "Pausar música");

        // Reproduzir música

        novoAudio.play().catch(function(erro) {

            console.error(
                "Não foi possível reproduzir a música:",
                erro
            );

            if (audioGeneroAtual === novoAudio) {

                botao.classList.remove("tocando");

                botao.innerHTML = "▶";

                botao.setAttribute(
                    "aria-label",
                    "Tocar música"
                );

                audioGeneroAtual = null;

                botaoMusicaAtual = null;

            }

        });

        // Restaurar o botão quando a música terminar

        novoAudio.addEventListener("ended", function() {

            if (audioGeneroAtual === novoAudio) {

                botao.classList.remove("tocando");

                botao.innerHTML = "▶";

                botao.setAttribute(
                    "aria-label",
                    "Tocar música"
                );

                audioGeneroAtual = null;

                botaoMusicaAtual = null;

            }

        });

    });

});
