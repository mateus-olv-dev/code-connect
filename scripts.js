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

const listaTags = document.querySelector(".lista-tags");
const inputTags = document.getElementById("input-tags");


inputTags.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();

        // Valor digitado dentro do input tags
        const tagTexto = inputTags.value.trim();

        if (tagTexto !== "") {
            // se o input estiver com algum valor, será criado um novo elemento na lista com o valor do input

            const tagNova = document.createElement("li");
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src ="./img/close-black.svg" class = "remove-tag"/>`;
            
            // Limpa o campo 
            inputTags.value = ""
            // Adiciona a nova tag criada a lista de tags ja existente
            listaTags.appendChild(tagNova);
        }
    }
})

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")){
        const tag = evento.target.parentElement;

        listaTags.removeChild(tag);
    }
})


const tagsDisponiveis = ["Front-end", "Programação", "Back-end", "Full-stack"];

async function verificarTags(tagTexto) {
    return new Promise( (resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
        }, 1000) 
    })
}


// const reader = new FileReader(); //Criando uma instância do FileReader
//         reader.onload = function(e) {
//             const preview = document.getElementById('preview');
//             preview.src = e.target.result; //Atribuindo o resultado da leitura como fonte da imagem de pré-visualização
//             preview.style.display = 'block'; //Tornando a pré-visualização visível
//         };
//         reader.readAsDataURL(file); //Lendo o arquivo como um Data URL