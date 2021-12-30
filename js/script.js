// FUNÇÃO PARA FECHAR AVISO

function fecharAviso() {
    document.getElementsByClassName("aviso")[0].style.display = "none";
}

// ---------------------

// FUNÇÃO PARA REMOVER NAVBAR MOBILE SE CLICAR FORA DELA:

$(document).click(function (event) {
    if (!$(event.target).is('.navbar-collapse *')) {
        $('.navbar-collapse').collapse('hide');
    }
});



// ----------------------------

// FUNÇÃO PARA MOSTRAR O DISPLAY DE IMAGENS FORA DO MOBILE FORA DO LIGHT-BOX

function mostrarImagem(id) {
    var i;
    var img_principal = document.getElementsByClassName("img-principal")
    // pega todas as imagens grandes fora do modal
    for (i = 0; i < img_principal.length; i++) {
        img_principal[i].className = img_principal[i].className.replace("d-block", "d-none");
        // muda o display de todas elas pra none
    }

    img_principal[id - 1].className = img_principal[id - 1].className.replace("d-none", "d-block");
    // muda o display da imagem atual pra block

    var thumbnails = document.getElementsByClassName("thumb-principal")
    // pega todas as imagens thumbnail da tela principal

    for (i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace("thumb-active-border", "thumb-demo-border");
        // muda a borda de todas as thumbnails principais pra borda de não selecionado
    }

    thumbnails[id - 1].className = thumbnails[id - 1].className.replace("thumb-demo-border", "thumb-active-border");
    // muda a borda da thumbnail atual para borda de selecionado
}

// getElementByClassName() não existe, só existe getElementsByClassName(), mesmo que seja 1
// só elemento, é necessário colocar on índice dele [0], pois este metodo retorna um array.


// FUNÇÃO PARA ABRIR MODAL DO LIGHTBOX

function abrirModal() {
    var lightbox = document.getElementById("modal-lightbox");
    lightbox.style.display = "block";
    lightbox.classList.add("fade-in");

    document.body.style.overflow = "hidden";
    // overflow hidden impede que o documento seja rolado quando o modal do 
    // lightbox tá aberto
}

// fUNÇÃO PARA FECHAR MODAL DO LIGHTBOX
function fecharModal() {
    var lightbox = document.getElementById("modal-lightbox");
    lightbox.classList.remove("fade-in");
    lightbox.classList.add("fade-out");
    // timeout espera a animação de fade-out terminar para fechar o modal
    setTimeout(function () {
        lightbox.style.display = "none";
        lightbox.classList.remove("fade-out");
        document.body.style.overflow = "visible";
        // overflow visible torna o documento rolavel quando o modal do lightbox 
        // for fechado
    }, 300)

}

// FUNÇÕES PARA CONTROLAR AS IMAGENS DO MODAL DO LIGHTBOX

// Next/previous controls
function proximoSlide(n) {
    mostrarSlide(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    mostrarSlide(slideIndex = n);
}


// a função show slides coloca 'active' na imagem do slide clicada, usando o parametro 'n'
function mostrarSlide(n) {
    var i; // define i
    var slides = document.getElementsByClassName("modal-image");
    // recupera os slides (imagens grandes)
    var dots = document.getElementsByClassName("dot");
    // recupera os botões (mini-imagens) do modal
    var slideNumeroTexto = document.getElementById("slide-number-text");
    // recupera a div que contém o número atual do slide
    if (n > slides.length) { slideIndex = 1 }
    // se o botão > foi clicado no último slide, o índice passa a ser slides.length +1, esse if 
    // faz com que ele volte a 1.
    if (n < 1) { slideIndex = slides.length }
    // se o botão < foi clicado no primeiro slide, o índice passa a ser 0, esse if faz com que
    // ele passe a ser slides.length.
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        // pega todas as imagens do slide e faz com que o display delas seja none
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("thumb-active-border", "thumb-demo-border");
        // pega todas os botões (mini-imagem) do slide e muda a classe active delas para demo,
        // ou seja, escurece todas as thumbs
    }

    slides[slideIndex - 1].style.display = "block";
    // pega a imagem do slide cujo index seja seja o atual e exibe ela
    dots[slideIndex - 1].className = dots[slideIndex - 1].className.replace("thumb-demo-border", "thumb-active-border");
    // pega a thumb (mini-imagem) do slide cujo index seja o atual e troca a classe 'demo' por
    // 'active', ou seja, ilumina a thumb

    slideNumeroTexto.innerHTML = slideIndex + "/" + slides.length + " - " + dots[slideIndex - 1].alt;
    // muda o texto da div pelo número atual do slide e coloca dentro dele a string que 
    // fica dentro da propriedade 'alt' da thumb atual.
}

var slideIndex = 1;
// define um valor aleatório pro índice do slide, ao clicar em qualquer uma imagem do lightbox,
// esse valor vai ser mudado pelo índice da imagem.


// FUNÇÃO PARA FECHAR O LIGHT-BOX CLICANDO APENAS NA PARTE PRETA (LUGARES QUE N A CLASSE fechar-modal)
// FUNCIONA DESSA FORMA PORQUE O LISTENER É APENAS PARA O ELEMENTO 'modal-lightbox' E NÃO PARA
// O DOCUMENTO INTEIRO, SE FOSSE PARA O DOCUMENTO QUALQUER LUGAR QUE CLICASSE ATIVARIA ESSE EVENTO
// E SERIA ALGO RUIM EM TERMOS DE PERFORMANCE

var backdrop = document.getElementsByClassName("modal-lightbox")[0];

backdrop.addEventListener('click', function (event) {
    // é preciso colocar a classe "manter-modal" em todos os elementos-pai do lightbox
    // que não devem fechar o modal ao serem clicados
    // é diferente da função de fechar o carrinho pois o carrinho é um elemento único,
    // então não precisar pegar todos os elementos dentro de algo
    var lightbox_elems = document.getElementsByClassName("manter-modal");
    // pega todos os elementos com a classe manter-modal
    var flag = false;
    for (const elem of lightbox_elems) {
        // pra cada elemento
        if (elem.contains(event.target)) {
            // checa se o elemento contém ou é o alvo do evento (a div clicada)
            flag = true;
            // se for a flag vira true
        }
    }
    if (!flag) {
        // se a flag for false, fecha o modal
        fecharModal();
    }
});

// ----------------------


// FUNÇÕES DO DISPLAY DE IMAGENS MOBILE

var slideIndexMobile = 1;

function proximoSlideMobile(n) {
    mostrarSlideMobile(slideIndexMobile += n);
}

function mostrarSlideMobile(id) {
    var i; // define i
    var slides_mobile = document.getElementsByClassName("img-principal-mobile");
    // recupera as imagens do display mobile
    if (id > slides_mobile.length) { slideIndexMobile = 1 }
    // se o botão > foi clicado no último slide, o índice passa a ser slides.length +1, esse if 
    // faz com que ele volte a 1.
    if (id < 1) { slideIndexMobile = slides_mobile.length }
    // se o botão < foi clicado no primeiro slide, o índice passa a ser 0, esse if faz com que
    // ele passe a ser slides.length.
    for (i = 0; i < slides_mobile.length; i++) {
        slides_mobile[i].className = slides_mobile[i].className.replace("d-block", "d-none");
        // pega todas as imagens do display e muda de d-block para d-none
    }

    slides_mobile[slideIndexMobile - 1].className = slides_mobile[slideIndexMobile - 1].className.replace("d-none", "d-block");
    // pega a imagem cujo index seja seja o atual e exibe ela
}


// FUNÇÃO PARA ABRIR E FECHAR CARRINHO

function toggleCarrinho() {
    var carrinho = document.getElementsByClassName("cart-modal")[0];
    // pega o elemento do modal e coloca no atributo carrinho
    var btn_carrinho = document.getElementById("abrir-carrinho");

    if (carrinho.style.display == 'none') {
        // se o carrinho estiver fechado, executa:

        carrinho.style.display = "block";
        // muda o display pra block
        carrinho.classList.add("fade-in");
        // adiciona efeito fade in
        btn_carrinho.classList.add("cart-open-btn");
        // ativa o botão do carrinho

        var eventHandler = function (event) {
            // adiciona evento de click em qualquer lugar do documento
            var modal = document.getElementsByClassName("cart-modal")[0];
            // pega a div do carrinho novamente

            if (!modal.contains(event.target) && !btn_carrinho.contains(event.target)) {
                // checa se algum elemento dentro da div do carrinho foi clicado e checa
                // se algum elemento dentro da div do botão do carrinho foi clicado, se nenhum
                // dos dois foram clicados:

                document.removeEventListener('click', eventHandler)
                // remove o evento de clique do documento

                btn_carrinho.classList.remove("cart-open-btn");
                // ativa o botão do carrinho

                fecharCarrinho();
                // executa a função de fechar o carrinho

            }

        }
        // define o evento de clique do documento

        document.addEventListener('click', eventHandler)
        // adiciona o evento de clique do documento

        return;
    }
    // se o carrinho estiver aberto executa:

    document.removeEventListener('click', eventHandler)
    // remove o evento de clique do documento, que foi adicionado ao abrir o carrinho

    btn_carrinho.classList.remove("cart-open-btn");
    // ativa o botão do carrinho

    fecharCarrinho();
    // fecha o carrinho


}

function fecharCarrinho() {
    var carrinho = document.getElementsByClassName("cart-modal")[0];
    // pega o elemento carrinho
    carrinho.classList.remove("fade-in");
    // remove a classe fade-in do carrinho
    carrinho.classList.add("fade-out");
    // adiciona a classe fade-out

    setTimeout(function () {
        // adiciona um time out de 0.3s, tempo do efeito de fade-out terminar
        carrinho.style.display = "none";
        // muda o display do carrinho para none
        carrinho.classList.remove("fade-out");
        // remove a classe fade-out do carrinho
    }, 300)
}

