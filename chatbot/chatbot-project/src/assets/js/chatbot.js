const chatbotResponses = {
    "o que é javascript?": "JavaScript é uma linguagem de programação que permite implementar funcionalidades complexas em páginas web.",
    "o que é html?": "HTML (HyperText Markup Language) é a linguagem padrão para criar páginas web.",
    "o que é css?": "CSS (Cascading Style Sheets) é uma linguagem de estilo usada para descrever a apresentação de um documento escrito em HTML.",
    "como declarar uma variável em javascript?": "Você pode declarar uma variável em JavaScript usando 'var', 'let' ou 'const'. Por exemplo: let nome = 'João';",
    "o que é um array?": "Um array é uma estrutura de dados que pode armazenar múltiplos valores em uma única variável.",
    "como fazer um loop em javascript?": "Você pode usar um loop 'for' para iterar sobre um array. Exemplo: for (let i = 0; i < array.length; i++) { console.log(array[i]); }",
    "o que é uma função?": "Uma função é um bloco de código projetado para executar uma tarefa específica. Você pode defini-la usando a palavra-chave 'function'.",
};

function getResponse(userInput) {
    const normalizedInput = userInput.toLowerCase().trim();
    return chatbotResponses[normalizedInput] || "Desculpe, não entendi sua pergunta. Tente perguntar sobre JavaScript, HTML ou CSS.";
}

document.addEventListener("DOMContentLoaded", function() {
    const chatInput = document.getElementById("chat-input");
    const chatButton = document.getElementById("chat-button");
    const chatArea = document.getElementById("chat-area");

    chatButton.addEventListener("click", function() {
        const userInput = chatInput.value;
        if (userInput) {
            const userMessage = document.createElement("div");
            userMessage.className = "user-message";
            userMessage.textContent = userInput;
            chatArea.appendChild(userMessage);

            const botResponse = getResponse(userInput);
            const botMessage = document.createElement("div");
            botMessage.className = "bot-message";
            botMessage.textContent = botResponse;
            chatArea.appendChild(botMessage);

            chatInput.value = "";
            chatArea.scrollTop = chatArea.scrollHeight; // Scroll to the bottom
        }
    });
});