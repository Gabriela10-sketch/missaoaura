
const perfis = [
    {
        id: 1,
        nome: "Piloto Espacial",
        categoria: "Líder da tripulação",
        descricao: "Você é ágil, corajoso e sabe agir em situações de risco. Sua função é conduzir a nave e explorar o futuro.",
        imagem: "img/perfil-1.jpg"
    },
    {
        id: 2,
        nome: "Médico da Tripulação",
        categoria: "medicina",
        descricao: "Você se preocupa com as pessoas e está sempre disposto a ajudar. Sua função é cuidar da saúde e do bem-estar da equipe.",
        imagem: "img/perfil-2.jpg"
    },
    {
        id: 3,
        nome: "Engenheiro do Sistema",
        categoria: "Construção",
        descricao: "Você é prático e gosta de resolver problemas. Sua função é consertar equipamentos e manter a nave funcionando.",
        imagem: "img/perfil-3.jpg"
    },
    {
        id: 4,
        nome: "Pesquisador Espacial",
        categoria: "Pesquisa",
        descricao: "Você é curioso e observador. Sua função é registrar descobertas e estudar as características do planeta Aura.",
        imagem: "img/perfil-4.jpg"
    }
];

const formulario = document.getElementById("formulario");
const campoNome = document.getElementById("name");
const campoNascimento = document.getElementById("nasceu");

// ÁREA RESULTADO
const resultado = document.createElement("div");
resultado.id = "resultado";
resultado.hidden = true;

formulario.parentElement.appendChild(resultado);

// NAO PODE DATA FUTURA
const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

campoNascimento.max = `${ano}-${mes}-${dia}`;

// CALCULO IDADE
function calcularIdade(dataNascimento) {
    const partes = dataNascimento.split("-");
    const anoNascimento = Number(partes[0]);
    const mesNascimento = Number(partes[1]);
    const diaNascimento = Number(partes[2]);

    let idade = hoje.getFullYear() - anoNascimento;

    // PESSOA JÁ FEZ ANIVER
    if (
        hoje.getMonth() + 1 < mesNascimento ||
        (hoje.getMonth() + 1 === mesNascimento &&
            hoje.getDate() < diaNascimento)
    ) {
        idade--;
    }

    return idade;
}

// MENSAGENS DE ERRO
function mostrarMensagem(mensagem) {
    resultado.replaceChildren();
    resultado.textContent = mensagem;
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

const nome = campoNome.value.trim();
const nascimento = campoNascimento.value;

    const p1 = formulario.elements["p1"].value;
    const p2 = formulario.elements["p2"].value;
    const p3 = formulario.elements["p3"].value;
    const p4 = formulario.elements["p4"].value;


    // VALIDAÇÃO 
    if (nome === "") {
        mostrarMensagem("O campo nome está vazio!");
        return;
    }

    if (nascimento === "") {
        mostrarMensagem("O campo data de nascimento está vazio!");
        return;
    }

    const dataNascimento = new Date(nascimento + "T00:00:00");

    if (Number.isNaN(dataNascimento.getTime())) {
        mostrarMensagem("Informe uma data de nascimento válida!");
        return;
    }

    if (dataNascimento > hoje) {
        mostrarMensagem("A data de nascimento não pode ser futura!");
        return;
    }

  const idade = calcularIdade(nascimento);

    if (
        p1 === "nulo1" ||
        p2 === "nulo2" ||
        p3 === "nulo3" ||
        p4 === "nulo4"
    ) {
        mostrarMensagem("Responda às quatro perguntas antes de continuar.");
        return;
    }

    // PERFIL PONTOS
    const pontuacao = [0, 0, 0, 0];

    // PRIMEIRA PERGUNTA
    if (p1 === "pilotagem") {
        pontuacao[0] += 2;
    } else if (p1 === "medicina") {
        pontuacao[1] += 2;
    } else if (p1 === "engenharia") {
        pontuacao[2] += 2;
    } else if (p1 === "anotaçao") {
        pontuacao[3] += 2;
    }

    // SEGUNDA PERGUNTA
    if (p2 === "reforço") {
        pontuacao[0] += 2;
    } else if (p2 === "ajuda") {
        pontuacao[1] += 2;
    } else if (p2 === "conserto") {
        pontuacao[2] += 2;
    } else if (p2 === "calma") {
        pontuacao[3] += 2;
    }

    // TERCEIRA PERGUNTA
    if (p3 === "extremo") {
        for (let i = 0; i < pontuacao.length; i++) {
            pontuacao[i] += 2;
        }
    } else if (p3 === "acima") {
        for (let i = 0; i < pontuacao.length; i++) {
            pontuacao[i] += 1;
        }
    }

    // QUARTA PERGUNTA
    if (p4 === "radar") {
        pontuacao[0] += 2;
    } else if (p4 === "kit") {
        pontuacao[1] += 2;
    } else if (p4 === "arma") {
        pontuacao[2] += 2;
    } else if (p4 === "bloco") {
        pontuacao[3] += 2;
    }

    resultado.replaceChildren();

// MAIOR PONTUAÇÃO
const maiorPontuacao = Math.max(...pontuacao);

// PERFIL VENCEDOR
const vencedores = [];

for (let i = 0; i < pontuacao.length; i++) {
    if (pontuacao[i] === maiorPontuacao) {
        vencedores.push(perfis[i]);
    }
}

// MOSTRAR RESULTADOS
resultado.replaceChildren();

formulario.hidden = true;
resultado.hidden = false;

const titulo = document.createElement("h2");
titulo.textContent = `Olá, ${nome}!`;

const idadeTexto = document.createElement("p");
idadeTexto.textContent = `Idade: ${idade} anos`;

const mensagem = document.createElement("p");

if (vencedores.length > 1) {
    mensagem.textContent = "Houve um empate! Seus perfis são:";
} else {
    mensagem.textContent = "O perfil que mais combina com você é:";
}

resultado.append(titulo, idadeTexto, mensagem);

vencedores.forEach(function(perfil) {
    const nomePerfil = document.createElement("h3");
    nomePerfil.textContent = perfil.nome;

    const categoria = document.createElement("p");
    categoria.textContent = `Categoria: ${perfil.categoria}`;

    const descricao = document.createElement("p");
    descricao.textContent = perfil.descricao;

    const imagem = document.createElement("img");
    imagem.src = perfil.imagem;
    imagem.alt = perfil.nome;
    imagem.width = 170;

    resultado.append(
        nomePerfil,
        categoria,
        descricao,
        imagem
    );
});

// BOTÃO PARA REFAZER
const voltar = document.createElement("button");
voltar.textContent = "Refazer formulário";


voltar.addEventListener("click", function() {
    formulario.reset();
    resultado.replaceChildren();
    resultado.hidden = true;
    formulario.hidden = false;
});

resultado.appendChild(voltar);
});