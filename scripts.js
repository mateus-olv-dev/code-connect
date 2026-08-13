const uploadBtn = document.getElementById("upload-btn");
const imageInput = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    imageInput.click();
}) 

function lerConteudoDoArquivo(arquivo) {
    return new Promise ((resolve, reject) => {
        const leitor = new FileReader();

        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name});
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        }

        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".imagem-principal");
const imagemNome = document.querySelector(".container-imagem-nome p");

imageInput.addEventListener('change', async function(event) {

   const file = event.target.files[0]; //Pegando o arquivo selecionado pelo usuário
   
    if (file) {
        try {

            const conteudoArquivo = await lerConteudoDoArquivo(file);

            imagemPrincipal.src = conteudoArquivo.url;
            imagemNome.textContent = conteudoArquivo.nome;
        } catch (erro){
            console.error("Erro na leitura do arquivo");
        }
    }
});


// Define as tags que estarão disponiveis p/ serem adicionadas
const tagsDisponiveis = ["Front-end", "Programação", "Back-end", "Full-stack"];

async function verificarTags(tagTexto) {
    return new Promise( (resolve) => {
        setTimeout(() => {
            // Simulação que sempre retorna uma promessa resolvida/bem sucedida
            resolve(tagsDisponiveis.includes(tagTexto))
        }, 500) 
    })
}


const listaTags = document.querySelector(".lista-tags");
const inputTags = document.getElementById("input-tags");

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();

        // Valor digitado dentro do input tags
        const tagTexto = inputTags.value.trim();

        // se o input estiver com algum valor, será criado um novo elemento na lista com o valor do input
        if (tagTexto !== "") {


                try {
                    // Verifica se o input digitado está contido nas tags disponiveis
                    const tagExistente = await verificarTags(tagTexto); //retorna true ou false
                    
                    if (tagExistente) {
                        // console.log("a tag está inclusa e foi adicionada");
                        const tagNova = document.createElement("li");
                        tagNova.classList.add("tag-nova");
                        tagNova.innerHTML = `<p>${tagTexto}</p> <img src ="./img/close-black.svg" class = "remove-tag"/>`;

                        // Adiciona a nova tag criada a lista de tags ja existente
                        listaTags.appendChild(tagNova);
                    } else {
                        alert(`Tag não pode ser adicionada, pois tag não está inclusa. ${tagExistente}`);
                    } 
                    // Limpa o campo 
                        inputTags.value = ""
                   
                }
                catch (error) {
                    // É um erro ao acessar a função, e não se a tag é inexistente
                    console.log("Erro ao verificar existencia da tag"); 
                }
            
        }
    }
})

// Evento para remover a tag adicionada por meio do botão de close 
listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")){
        const tag = evento.target.parentElement;

        listaTags.removeChild(tag);
    }
})


const botaoPublicar = document.querySelector(".bt-publicar");

botaoPublicar.addEventListener("click", async (evento) => {

    const projetoNome = document.querySelector("#nome-projeto").value;
    const projetoDescricao = document.querySelector("#descricao-projeto").value;
    const projetoTags = Array.from(listaTags.querySelectorAll("p").map((tag) => tag.textContent));

    console.log(`Nome projeto: ${projetoNome}`);
    console.log(`Descrição projeto: ${projetoDescricao}`);
    console.log(`tags projeto: ${projetoTags}`);

})


const botaoDescartar = document.querySelector(".bt-descartar");


botaoDescartar.addEventListener( "click", () => {

    const formulario = document.querySelectorAll("input");
    const textArea = document.querySelector("textarea");
    const tags = document.querySelectorAll(".tag-nova");
    const imagem = document.querySelector(".imagem-principal");

    formulario.forEach((elemento) => {
        elemento.value = "";
    })

    textArea.value = "";

    tags.forEach((tag) => {
        tag.remove();
    })    

    imagem.setAttribute("src", "img/imagem1.png");
    imagemNome.textContent = "imagem_projeto.png";
})

























// const reader = new FileReader(); //Criando uma instância do FileReader
//         reader.onload = function(e) {
//             const preview = document.getElementById('preview');
//             preview.src = e.target.result; //Atribuindo o resultado da leitura como fonte da imagem de pré-visualização
//             preview.style.display = 'block'; //Tornando a pré-visualização visível
//         };
//         reader.readAsDataURL(file); //Lendo o arquivo como um Data URL