// FUNÇÃO PARA REMOVER NAVBAR MOBILE SE CLICAR FORA DELA:

$(document).click(function (event) {
    if (!$(event.target).is('.navbar-collapse *')) {
        $('.navbar-collapse').collapse('hide');
    }
});



function mostrarImagem(id) {
    var i;
    var img_principal = document.getElementsByClassName("img-principal")
    // pega todas as imagens grandes fora do modal
    for (i = 0; i < img_principal.length ; i++) {
        img_principal[i].className = img_principal[i].className.replace("d-block", "d-none");
        // muda o display de todas elas pra none
    }
    var img_atual = document.getElementById("imagem-" + id);
    // pega a imagem principal cujo id é o atual
    img_atual.className = img_atual.className.replace("d-none", "d-block");
    // muda o display da imagem atual pra block

    var thumbnails = document.getElementsByClassName("thumb-principal")
    // pega todas as imagens thumbnail da tela principal

    for (i = 0; i < thumbnails.length ; i++) {
        thumbnails[i].className = thumbnails[i].className.replace("thumb-active-border", "thumb-demo-border");
        // muda a borda de todas as thumbnails principais pra borda de não selecionado
    }

    thumbnails[id-1].className = thumbnails[id-1].className.replace("thumb-demo-border", "thumb-active-border");
    // muda a borda da thumbnail atual para borda de selecionado
}

// abrir o modal
function abrirModal() {
    document.getElementById("myModal").style.display = "block";

    // como a navbar por padrão do bootstrap tem z-index 100 é preciso fechá-la ao abrir o modal
    document.getElementsByClassName("navbar")[0].style.display = "none";
    // getElementByClassName() não existe, só existe getElementsByClassName(), mesmo que seja 1
    // só elemento, é necessário colocar on índice dele [0], pois este metodo retorna um array.
}

// fechar o modal
function fecharModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementsByClassName("navbar")[0].style.display = "block";
}

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
    var slides = document.getElementsByClassName("mySlides"); 
    // recupera os slides (imagens grandes)
    var dots = document.getElementsByClassName("dot"); 
    // recupera os botões (mini-imagens) do modal
    var captionText = document.getElementById("caption"); 
    // recupera o parágrafo que serve de título pra cada imagem do modal
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
        dots[i].className = dots[i].className.replace("active", "demo");
        // pega todas os botões (mini-imagem) do slide e muda a classe active delas para demo,
        // ou seja, escurece todas as thumbs
    }

    slides[slideIndex - 1].style.display = "block";
    // pega a imagem do slide cujo index seja seja o atual e exibe ela
    dots[slideIndex - 1].className = dots[slideIndex - 1].className.replace("demo", "active");
    // pega a thumb (mini-imagem) do slide cujo index seja o atual e troca a classe 'demo' por
    // 'active', ou seja, ilumina a thumb
    captionText.innerHTML = dots[slideIndex - 1].alt;
    // pega o parágrafo que contém o título da imagem e coloca no dentro dele a string que fica
    // dentro da propriedade 'alt' da thumb atual.
}

var slideIndex = 1;
// define um valor aleatório pro índice do slide, ao clicar em qualquer uma imagem do lightbox,
// esse valor vai ser mudado pelo índice da imagem.