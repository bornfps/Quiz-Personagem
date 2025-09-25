class Personagem {
    constructor(nome, descricao, imagem){
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.pontos = 0;
    }
}

let personagens = [
    new Personagem("Harry Potter", "Um bruxo corajoso, leal e sempre pronto para proteger os amigos.", "img/harry.png"),
    new Personagem("Hermione Granger", "A bruxa mais inteligente da sua idade, dedicada e estrategista.", "img/hermione.png"),
    new Personagem("Ron Weasley", "Leal, engraçado e sempre ao lado dos amigos, mesmo nos momentos difíceis.", "img/ron.png")
];

let perguntas = [
  {
    texto: "Qual matéria de Hogwarts você mais gostaria de estudar?",
    opcoes: [
      { texto: "Defesa Contra as Artes das Trevas", pontos: [3,2,1] },
      { texto: "Feitiços", pontos: [1,3,2] },
      { texto: "Trato das Criaturas Mágicas", pontos: [2,1,3] }
    ]
  },
  {
    texto: "Qual objeto mágico você escolheria?",
    opcoes: [
      { texto: "A Varinha das Varinhas", pontos: [3,2,1] },
      { texto: "O Vira-Tempo", pontos: [1,3,2] },
      { texto: "O Carro Voador dos Weasley", pontos: [2,1,3] }
    ]
  },
  {
    texto: "Qual qualidade mais representa você?",
    opcoes: [
      { texto: "Coragem", pontos: [3,1,2] },
      { texto: "Inteligência", pontos: [1,3,2] },
      { texto: "Lealdade", pontos: [2,1,3] }
    ]
  },
  {
    texto: "Se estivesse em perigo, o que faria?",
    opcoes: [
      { texto: "Enfrentaria de frente", pontos: [3,1,2] },
      { texto: "Usaria estratégia e lógica", pontos: [1,3,2] },
      { texto: "Chamaria meus amigos para ajudar", pontos: [2,1,3] }
    ]
  },
  {
    texto: "Qual é o seu lugar favorito em Hogwarts?",
    opcoes: [
      { texto: "O campo de Quadribol", pontos: [3,1,2] },
      { texto: "A biblioteca", pontos: [1,3,2] },
      { texto: "A sala comunal da Grifinória", pontos: [2,1,3] }
    ]
  },
  {
    texto: "Qual animal mágico você gostaria de ter?",
    opcoes: [
      { texto: "Hipogrifo", pontos: [3,2,1] },
      { texto: "Gato", pontos: [1,3,2] },
      { texto: "Coruja", pontos: [2,1,3] }
    ]
  },
  {
    texto: "Qual feitiço você mais usaria?",
    opcoes: [
      { texto: "Expelliarmus", pontos: [3,2,1] },
      { texto: "Alohomora", pontos: [1,3,2] },
      { texto: "Wingardium Leviosa", pontos: [2,1,3] }
    ]
  },
  {
    texto: "Qual seria o seu maior medo?",
    opcoes: [
      { texto: "Perder meus amigos", pontos: [3,2,1] },
      { texto: "Fracassar nos estudos", pontos: [1,3,2] },
      { texto: "Ficar sozinho", pontos: [2,1,3] }
    ]
  },
  {
    texto: "Qual doce de Hogsmeade você escolheria?",
    opcoes: [
      { texto: "Sapos de Chocolate", pontos: [3,1,2] },
      { texto: "Feijõezinhos de Todos os Sabores", pontos: [1,3,2] },
      { texto: "Pirulito de Sangue", pontos: [2,1,3] }
    ]
  },
  {
    texto: "Se fosse selecionado pelo Chapéu Seletor, em qual casa estaria?",
    opcoes: [
      { texto: "Grifinória", pontos: [3,2,1] },
      { texto: "Corvinal", pontos: [1,3,2] },
      { texto: "Lufa-Lufa", pontos: [2,1,3] }
    ]
  }
];

let perguntaAtual = 0;
let respostaSelecionada = null;

function iniciarQuiz() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    mostrarPergunta();
}

function mostrarPergunta() {
    let p = perguntas[perguntaAtual];
    document.getElementById("pergunta").innerText = p.texto;

    let opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";

   p.opcoes.forEach((opcao, index) => {
    let btn = document.createElement("button");
    btn.innerText = opcao.texto;

    btn.onclick = () => {
        selecionarOpcao(index);
        let botoes = document.querySelectorAll("#opcoes button");
        botoes.forEach(b => b.classList.remove("selecionado"));
        btn.classList.add("selecionado");
    };

    opcoesDiv.appendChild(btn);
});
}

function selecionarOpcao(indice) {
    respostaSelecionada = indice;
}

function proximaPergunta() {
    if (respostaSelecionada == null) {
        alert("Escolha uma Opção!");
        return;
    }


    let pontos = perguntas[perguntaAtual].opcoes[respostaSelecionada].pontos;
    personagens.forEach((p, i) => p.pontos += pontos[i]);

    respostaSelecionada = null;
    perguntaAtual++;

    if (perguntaAtual < perguntas.length){
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("resultado").style.display = "block";

    let vencedor = personagens.reduce((a, b) => a.pontos > b.pontos ? a : b);

    document.getElementById("personagem").innerHTML = `
        <h3>${vencedor.nome}</h3>
        <p>${vencedor.descricao}</p>
        <p>Pontuação: ${vencedor.pontos}</p>
        <img src="${vencedor.imagem}" width="200">
    `;
}

function reiniciar() {
    perguntaAtual = 0;
    personagens.forEach(p => p.pontos = 0);
    document.getElementById("resultado").style.display = "none";
    document.getElementById("tela-inicial").style.display = "block";
}
