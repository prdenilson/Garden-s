// ========================================
// GARDEN'S
// JavaScript principal
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------
    // MENU MOBILE
    // ------------------------------------

    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            if (mobileMenu.style.display === "block") {
                mobileMenu.style.display = "none";
                menuButton.textContent = "☰";
            } else {
                mobileMenu.style.display = "block";
                menuButton.textContent = "✕";
            }

        });


        // Fecha o menu depois de clicar em um link

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.style.display = "none";
                menuButton.textContent = "☰";

            });

        });

    }


    // ------------------------------------
    // CONTADOR DO CARRINHO
    // ------------------------------------

    atualizarContadorCarrinho();

});


// ========================================
// ATUALIZAR CONTADOR DO CARRINHO
// ========================================

function atualizarContadorCarrinho() {

    const contador = document.getElementById("cart-count");

    if (!contador) {
        return;
    }

    let carrinho = [];

    try {

        carrinho = JSON.parse(
            localStorage.getItem("gardens_cart")
        ) || [];

    } catch (erro) {

        carrinho = [];

    }


    let quantidade = 0;

    carrinho.forEach(item => {

        quantidade += Number(item.quantidade) || 0;

    });


    contador.textContent = quantidade;


    // Esconde o número quando o carrinho está vazio

    if (quantidade === 0) {
        contador.style.display = "none";
    } else {
        contador.style.display = "inline-flex";
    }

}


// ========================================
// ADICIONAR PRODUTO AO CARRINHO
// ========================================

function adicionarAoCarrinho(produto) {

    let carrinho = [];

    try {

        carrinho = JSON.parse(
            localStorage.getItem("gardens_cart")
        ) || [];

    } catch (erro) {

        carrinho = [];

    }


    const produtoExistente = carrinho.find(
        item => item.id === produto.id
    );


    if (produtoExistente) {

        produtoExistente.quantidade += 1;

    } else {

        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        });

    }


    localStorage.setItem(
        "gardens_cart",
        JSON.stringify(carrinho)
    );


    atualizarContadorCarrinho();

}


// ========================================
// REMOVER PRODUTO DO CARRINHO
// ========================================

function removerDoCarrinho(id) {

    let carrinho = [];

    try {

        carrinho = JSON.parse(
            localStorage.getItem("gardens_cart")
        ) || [];

    } catch (erro) {

        carrinho = [];

    }


    carrinho = carrinho.filter(
        item => item.id !== id
    );


    localStorage.setItem(
        "gardens_cart",
        JSON.stringify(carrinho)
    );


    atualizarContadorCarrinho();

}


// ========================================
// LIMPAR CARRINHO
// ========================================

function limparCarrinho() {

    localStorage.removeItem("gardens_cart");

    atualizarContadorCarrinho();

}
