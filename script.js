// ======================================
// ELEMENTOS DA PÁGINA
// ======================================

const campoBusca = document.getElementById("campo-busca");

const botaoBuscar = document.getElementById("botao-buscar");

const areaResultado = document.getElementById("resultado");


// ======================================
// FUNÇÃO PARA BUSCAR O POKÉMON
// ======================================

async function buscarPokemon(nome) {

    // Remove espaços e transforma tudo em letras minúsculas
    const termo = nome.trim().toLowerCase();


    // ======================================
    // VERIFICA SE O CAMPO ESTÁ VAZIO
    // ======================================

    if (termo === "") {

        areaResultado.innerHTML = `
            <div class="error">

                <h2>Digite um nome</h2>

                <p>
                    Digite o nome de um Pokémon para realizar a pesquisa.
                </p>

            </div>
        `;

        return;
    }


    // ======================================
    // MOSTRA MENSAGEM DE CARREGAMENTO
    // ======================================

    areaResultado.innerHTML = `
        <div class="loading">

            <h2>Carregando...</h2>

            <p>
                Consultando informações na PokéAPI.
            </p>

        </div>
    `;


    // ======================================
    // TENTA CONSULTAR A API
    // ======================================

    try {

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(termo)}`
        );


        // Se a API retornar erro, lança uma exceção
        if (!resposta.ok) {

            throw new Error("Pokémon não encontrado");

        }


        // Converte a resposta para JSON
        const dados = await resposta.json();


        // ======================================
        // PEGA OS TIPOS DO POKÉMON
        // ======================================

        const tipos = dados.types
            .map(item => item.type.name)
            .join(", ");


        // ======================================
        // MOSTRA OS DADOS NA TELA
        // ======================================

        areaResultado.innerHTML = `

            <article class="pokemon-card">


                <!-- IMAGEM -->

                <div class="pokemon-image">

                    <img
                        src="${dados.sprites.front_default}"
                        alt="Imagem do Pokémon ${dados.name}"
                    >

                </div>


                <!-- INFORMAÇÕES -->

                <div class="pokemon-info">

                    <h2>
                        ${dados.name}
                    </h2>


                    <div class="info-grid">


                        <!-- ALTURA -->

                        <div class="info-box">

                            <strong>Altura</strong>

                            <span>
                                ${dados.height / 10} m
                            </span>

                        </div>


                        <!-- PESO -->

                        <div class="info-box">

                            <strong>Peso</strong>

                            <span>
                                ${dados.weight / 10} kg
                            </span>

                        </div>


                        <!-- TIPO -->

                        <div class="info-box">

                            <strong>Tipo</strong>

                            <span>
                                ${tipos}
                            </span>

                        </div>


                        <!-- ID -->

                        <div class="info-box">

                            <strong>ID</strong>

                            <span>
                                #${dados.id}
                            </span>

                        </div>


                    </div>

                </div>

            </article>

        `;

    }


    // ======================================
    // TRATAMENTO DE ERROS
    // ======================================

    catch (erro) {

        areaResultado.innerHTML = `

            <div class="error">

                <h2>Pokémon não encontrado!</h2>

                <p>
                    Verifique o nome digitado e tente novamente.
                </p>

            </div>

        `;

    }

}


// ======================================
// BOTÃO BUSCAR
// ======================================

botaoBuscar.addEventListener("click", function () {

    buscarPokemon(campoBusca.value);

});


// ======================================
// PERMITIR PESQUISAR PRESSIONANDO ENTER
// ======================================

campoBusca.addEventListener("keydown", function (evento) {

    if (evento.key === "Enter") {

        buscarPokemon(campoBusca.value);

    }

});

// Consulta de dados realizada através da PokéAPI.
// Tratamento de erros implementado na busca.
