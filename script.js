// Selecionando elementos do HTML
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer"); // Elemento do timer
const restartBtn = document.getElementById('restart-btn');
const buttonContainer = document.getElementById('button-container'); // Container para o botão de próxima fase

const nextPhaseBtn = document.createElement('button'); // Botão para a próxima fase
nextPhaseBtn.innerText = "Prosseguir para a segunda fase";
nextPhaseBtn.classList.add("btn");
nextPhaseBtn.style.display = "none";
buttonContainer.appendChild(nextPhaseBtn); // Adiciona o botão ao container

// Recuperar o nome do usuário do localStorage
const username = localStorage.getItem("currentUser");

const greeting = document.getElementById("greeting");

// Exibir a saudação com o nome do usuário
if (username) {
    greeting.textContent = `Bem-vindo, ${username}!`;
}

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;
let countdown;
let phase = 1; // Variável para controlar a fase do quiz

// Lista de perguntas da primeira fase (Front-End)
const questionsPhase1 = [
    {
        question: "Qual delas serve para estilizar na Web?",
        answers: [
            { text: "Html", correct: false },
            { text: "Javascript", correct: false },
            { text: "Css", correct: true },
            { text: "PHP", correct: false }
        ]
    },
    {
        question: "Para que serve a tag nav?",
        answers: [
            { text: "Agrupar Elementos de navegação", correct: true },
            { text: "Negritar texto", correct: false },
            { text: "Quebrar linha", correct: false },
            { text: "Sublinhar", correct: false }
        ]
    },
    {
        question: "O que é uma variável?",
        answers: [
            { text: "Um operador", correct: false },
            { text: "Um espaço de memória", correct: true },
            { text: "Um objeto", correct: false },
            { text: "Uma comparação", correct: false }
        ]
    },
    {
        question: "O que é uma linguagem orientada a objeto?",
        answers: [
            { text: "São linguagens que servem para estilizar", correct: false },
            { text: "São linguagens que eliminam objetos", correct: false },
            { text: "São linguagens que organizam o código em objetos", correct: true },
            { text: "É toda aquela que utiliza banco de dados", correct: false }
        ]
    },
    {
        question: "O que é o HTML?",
        answers: [
            { text: "Uma linguagem de marcação", correct: true },
            { text: "Uma linguagem de programação", correct: false },
            { text: "Um framework", correct: false },
            { text: "Um sistema operacional", correct: false }
        ]
    },
    {
        question: "Qual a função da tag <head>?",
        answers: [
            { text: "Definir o corpo do documento", correct: false },
            { text: "Incluir metadados e links para CSS", correct: true },
            { text: "Criar listas", correct: false },
            { text: "Adicionar imagens", correct: false }
        ]
    },
    {
        question: "O que faz a propriedade CSS 'display: none'?",
        answers: [
            { text: "Exibe o elemento", correct: false },
            { text: "Muda a cor do elemento", correct: false },
            { text: "Aumenta o tamanho do elemento", correct: false },
            { text: "Remove o elemento do fluxo do documento", correct: true }
        ]
    },
    {
        question: "Qual é a função do JavaScript?",
        answers: [
            { text: "Estilizar páginas web", correct: false },
            { text: "Adicionar interatividade às páginas web", correct: true },
            { text: "Estruturar o conteúdo", correct: false },
            { text: "Criar imagens", correct: false }
        ]
    },
    {
        question: "O que é um 'div' em HTML?",
        answers: [
             { text: "Um contêiner genérico para agrupar elementos", correct: true },
             { text: "Um elemento de formatação de texto", correct: false },
             { text: "Um tipo de lista", correct: false },
             { text: "Um link", correct: false }
        ]
    },
    {
        question: "Qual a diferença entre 'class' e 'id' em HTML?",
        answers: [
            { text: "Um é para estilização e o outro para estrutura", correct: false },
            { text: "Um é único e o outro pode ser repetido", correct: true },
            { text: "Ambos são iguais", correct: false },
            { text: "Um é usado apenas em CSS", correct: false }
        ]
    },
    {
        question: "O que faz a propriedade CSS 'margin'?",
        answers: [
             { text: "Define o espaço externo de um elemento", correct: true },
            { text: "Define o espaço interno de um elemento", correct: false },
            { text: "Muda a cor do texto", correct: false },
            { text: "Alinha o texto", correct: false }
        ]
    },
    {
        question: "Para que serve a tag <footer>?",
        answers: [
            { text: "Definir o cabeçalho da página", correct: false },
            { text: "Criar uma lista", correct: false },
             { text: "Definir o rodapé da página", correct: true },
            { text: "Adicionar imagens", correct: false }
        ]
    },
    {
        question: "O que é um 'framework' JavaScript?",
        answers: [
            { text: "Uma biblioteca de estilos", correct: false },
            { text: "Um tipo de banco de dados", correct: false },
             { text: "Um conjunto de ferramentas para facilitar o desenvolvimento", correct: true },
            { text: "Um sistema operacional", correct: false }
        ]
    },
    {
        question: "Qual a função da tag <img>?",
        answers: [
            { text: "Adicionar um vídeo", correct: false },
            { text: "Adicionar uma imagem", correct: true },
            { text: "Criar um link", correct: false },
            { text: "Definir um cabeçalho", correct: false }
        ]
    },
    {
        question: "O que é o CSS?",
        answers: [
            { text: "Uma linguagem de marcação", correct: false },
            { text: "Uma linguagem de programação", correct: false },
            { text: "Um banco de dados", correct: false },
            { text: "Uma linguagem de estilo", correct: true }
        ]
    },
    {
        question: "Para que serve a tag <form>?",
        answers: [
            { text: "Criar um formulário para entrada de dados", correct: true },
            { text: "Adicionar uma imagem", correct: false },
            { text: "Definir um cabeçalho", correct: false },
            { text: "Criar uma lista", correct: false }
        ]
    },
    {
        question: "O que é o DOM?",
        answers: [
            { text: "Document Object Model, uma representação da estrutura do documento HTML", correct: true },
            { text: "Um tipo de banco de dados", correct: false },
            { text: "Uma linguagem de programação", correct: false },
            { text: "Um framework CSS", correct: false }
        ]
    },
    {
        question: "Qual a função da propriedade CSS 'background-color'?",
        answers: [
            { text: "Define a cor do texto", correct: false },
            { text: "Define a cor da borda", correct: false },
            { text: "Define a cor do link", correct: false },
            { text: "Define a cor de fundo de um elemento", correct: true }
        ]
    },
    {
        question: "O que é uma API?",
        answers: [
            { text: "Um tipo de banco de dados", correct: false },
            { text: "Uma linguagem de programação", correct: false },
            { text: "Uma interface que permite a comunicação entre diferentes sistemas", correct: true },
            { text: "Um framework CSS", correct: false }
        ]
    },
    {
        question: "O que é um programador Front End?",
        answers: [
            { text: "Um programador que trabalha com o back-end", correct: false },
            { text: "Um programador que trabalha com a interface do usuário", correct: true },
            { text: "Um programador que trabalha com banco de dados", correct: false },
            { text: "Um programador que trabalha com redes", correct: false }
        ]
    }
];

// Lista de perguntas da segunda fase (Back-End)
const questionsPhase2 = [
    {
        question: "O que é um servidor web?",
        answers: [
            { text: "Um software que serve páginas web para os usuários", correct: true },
            { text: "Um banco de dados", correct: false },
            { text: "Um navegador web", correct: false },
            { text: "Um sistema operacional", correct: false }
        ]
    },
    {
        question: "Qual linguagem é comumente usada para desenvolvimento back-end?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: true }
        ]
    },
    {
        question: "O que é uma API REST?",
        answers: [
            { text: "Uma interface de programação de aplicativos baseada em REST", correct: true },
            { text: "Um tipo de banco de dados", correct: false },
            { text: "Um framework CSS", correct: false },
            { text: "Um servidor web", correct: false }
        ]
    },
    {
        question: "O que é um banco de dados relacional?",
        answers: [
            { text: "Um banco de dados que armazena dados em tabelas relacionadas", correct: true },
            { text: "Um banco de dados que armazena dados em documentos", correct: false },
            { text: "Um banco de dados que armazena dados em grafos", correct: false },
            { text: "Um banco de dados que armazena dados em chaves-valor", correct: false }
        ]
    },
    {
        question: "O que é SQL?",
        answers: [
            { text: "Uma linguagem de programação", correct: false },
            { text: "Uma linguagem de consulta para bancos de dados", correct: true },
            { text: "Um framework CSS", correct: false },
            { text: "Um servidor web", correct: false }
        ]
    },
    {
        question: "O que é Node.js?",
        answers: [
            { text: "Um framework CSS", correct: false },
            { text: "Um banco de dados", correct: false },
            { text: "Um ambiente de execução JavaScript no lado do servidor", correct: true },
            { text: "Um navegador web", correct: false }
        ]
    },
    {
        question: "O que é um middleware?",
        answers: [
            { text: "Um software que conecta diferentes sistemas ou aplicativos", correct: true },
            { text: "Um banco de dados", correct: false },
            { text: "Um servidor web", correct: false },
            { text: "Um navegador web", correct: false }
        ]
    },
    {
        question: "O que é um framework?",
        answers: [
            { text: "Uma biblioteca de estilos", correct: false },
            { text: "Um conjunto de ferramentas para facilitar o desenvolvimento", correct: true },
            { text: "Um tipo de banco de dados", correct: false },
            { text: "Um sistema operacional", correct: false }
        ]
    },
    {
        question: "O que é um banco de dados NoSQL?",
        answers: [
            { text: "Um banco de dados que não usa SQL como linguagem de consulta", correct: true },
            { text: "Um banco de dados que usa SQL como linguagem de consulta", correct: false },
            { text: "Um banco de dados que armazena dados em tabelas", correct: false },
            { text: "Um banco de dados que armazena dados em grafos", correct: false }
        ]
    },
    {
        question: "O que é um servidor de aplicação?",
        answers: [
            { text: "Um software que fornece um ambiente para executar aplicativos", correct: true },
            { text: "Um banco de dados", correct: false },
            { text: "Um navegador web", correct: false },
            { text: "Um sistema operacional", correct: false }
        ]
    },
    {
        question: "Qual é a principal função do Express.js?",
        answers: [
            { text: "Gerenciar o banco de dados", correct: false },
            { text: "Criar interfaces de usuário", correct: false },
            { text: "Facilitar a criação de aplicações web em Node.js", correct: true },
            { text: "Estilizar páginas web", correct: false }
        ]
    }
];

// Iniciar quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    phase = 1; // Resetar a fase para a primeira fase
    scoreElement.innerText = `Pontuação: ${score}`;
    restartBtn.style.display = "none";
    nextPhaseBtn.style.display = "none"; // Esconder o botão de próxima fase
    showQuestion();
}

// Mostrar pergunta
function showQuestion() {
    resetState();
    let currentQuestion;
    if (phase === 1) {
        currentQuestion = questionsPhase1[currentQuestionIndex];
    } else {
        currentQuestion = questionsPhase2[currentQuestionIndex];
    }
    questionElement.innerText = currentQuestion.question;

    const letters = ["A", "B", "C", "D"];
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = `${letters[index]}) ${answer.text}`;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButtons.appendChild(button);
    });

    startTimer(); // Iniciar contagem regressiva
}

// Resetar estado dos botões
function resetState() {
    answerButtons.innerHTML = "";
    questionElement.style.color = "black"; // Resetar cor do texto
    clearTimeout(timer); // Limpa timeout do perder jogo
    clearInterval(countdown); // Limpa contagem regressiva
    document.body.classList.remove('second-phase'); // Remover classe da segunda fase ao resetar
}

// Iniciar temporizador de 10 segundos
function startTimer() {
    timeLeft = 10; // Tempo inicial
    timerElement.innerText = timeLeft; // Exibe o tempo inicial

    countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft; // Atualiza tempo na tela

        if (timeLeft <= 0) {
            clearInterval(countdown);
            loseGame(); // Se o tempo acabar, perde o jogo
        }
    }, 1000);
}

// Selecionar resposta
function selectAnswer(button, correct) {
    clearTimeout(timer);
    clearInterval(countdown); // Para a contagem regressiva ao responder

    if (correct) {
        button.style.backgroundColor = "green";
        score++;
        scoreElement.innerText = `Pontuação: ${score}`;

        currentQuestionIndex++; // Avança para a próxima pergunta

        if (phase === 1 && currentQuestionIndex < questionsPhase1.length) {
            setTimeout(() => {
                showQuestion(); // Passa direto para a próxima pergunta
            }, 500);
        } else if (phase === 2 && currentQuestionIndex < questionsPhase2.length) {
            setTimeout(() => {
                showQuestion(); // Passa direto para a próxima pergunta
            }, 500);
        } else {
            setTimeout(() => {
                showScore(); // Se acertou todas as perguntas, termina o jogo
            }, 500);
        }
    } else {
        button.style.backgroundColor = "red";
        showCorrectAnswer(); // Mostra a resposta correta
        setTimeout(() => {
            restartBtn.style.display = 'block'; // Exibe o botão de recomeçar
        }, 1000);
    }

    // Desabilita todos os botões após uma resposta
    Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
}

// Mostrar a resposta correta
function showCorrectAnswer() {
    let currentQuestion;
    if (phase === 1) {
        currentQuestion = questionsPhase1[currentQuestionIndex];
    } else {
        currentQuestion = questionsPhase2[currentQuestionIndex];
    }
    currentQuestion.answers.forEach(answer => {
        if (answer.correct) {
            const correctButton = Array.from(answerButtons.children).find(btn => btn.innerText.includes(answer.text));
            if (correctButton) {
                correctButton.style.backgroundColor = "green";
            }
        }
    });
}

// Função para perder o jogo
function loseGame() {
    resetState();
    questionElement.innerText = "Você perdeu és um bosta deverías fazer Saúde!";
    questionElement.style.color = "red";
    restartBtn.style.display = 'block'; // Exibe o botão de recomeçar
}

// Exibir pontuação final
function showScore() {
    resetState();
    if (phase === 1 && score === questionsPhase1.length) {
        questionElement.innerText = "Parabéns, você passou na primeira fase do Front End! Pretende ir para a segunda fase do Back-End?";
        questionElement.style.color = "green";
        nextPhaseBtn.style.display = 'block'; // Exibe o botão de próxima fase
        nextPhaseBtn.addEventListener('click', startSecondPhase);
    } else if (phase === 2 && score === questionsPhase2.length) {
        questionElement.innerText = "Parabéns, você completou todas as fases! Você passou as 2 fases, és um programador Fullstack!";
        questionElement.style.color = "green";
    } else {
        questionElement.innerText = "Fim do jogo!";
        questionElement.style.color = "red";
    }

    restartBtn.style.display = 'block'; // Exibe o botão de recomeçar
}

// Iniciar a segunda fase do quiz
function startSecondPhase() {
    phase = 2;
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = `Pontuação: ${score}`;
    nextPhaseBtn.style.display = "none"; // Esconder o botão de próxima fase
    document.body.classList.add('second-phase'); // Adicionar classe para a segunda fase
    showQuestion();
}

// Evento para recomeçar o jogo
restartBtn.addEventListener('click', startQuiz);

// Iniciar o jogo
startQuiz();
