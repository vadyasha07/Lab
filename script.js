// Зберігаємо інформацію про браузер у localStorage
var userAgent = navigator.userAgent;
var platform = navigator.platform;
var language = navigator.language;
var screenWidth = screen.width;
var screenHeight = screen.height;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

// Створюємо об'єкт з даними
var info = {
    userAgent: userAgent,
    platform: platform,
    language: language,
    screen: screenWidth + "x" + screenHeight,
    window: windowWidth + "x" + windowHeight
};

// Зберігаємо у localStorage
localStorage.setItem("browserInfo", JSON.stringify(info));

// Відображаємо у футері
var footer = document.querySelector("footer");
var infoDiv = document.createElement("div");
infoDiv.innerHTML = "<p><strong>Інформація про браузер:</strong></p>";
infoDiv.innerHTML += "<p>User Agent: " + userAgent + "</p>";
infoDiv.innerHTML += "<p>Платформа: " + platform + "</p>";
infoDiv.innerHTML += "<p>Мова: " + language + "</p>";
infoDiv.innerHTML += "<p>Розмір екрану: " + screenWidth + "x" + screenHeight + "</p>";
infoDiv.innerHTML += "<p>Розмір вікна: " + windowWidth + "x" + windowHeight + "</p>";
footer.appendChild(infoDiv);

// Отримуємо коментарі з серверу
var variant = 5;
var url = "https://jsonplaceholder.typicode.com/posts/" + variant + "/comments";

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(comments) {
        var container = document.getElementById("comments-container");
        
        for (var i = 0; i < comments.length; i++) {
            var comment = comments[i];
            var div = document.createElement("div");
            div.className = "comment";
            div.innerHTML = "<h4>" + comment.name + "</h4>";
            div.innerHTML += "<p><strong>Email:</strong> " + comment.email + "</p>";
            div.innerHTML += "<p>" + comment.body + "</p>";
            container.appendChild(div);
        }
        
        // Показуємо секцію з коментарями
        document.getElementById("comments-section").style.display = "block";
    })
    .catch(function(error) {
        console.log("Помилка: " + error);
    });

// Показуємо модальне вікно через 1 хвилину
setTimeout(function() {
    document.getElementById("feedback-modal").classList.add("active");
}, 60000);

// Закрити модальне вікно
function closeModal() {
    document.getElementById("feedback-modal").classList.remove("active");
}

// Перемикання теми
function toggleTheme() {
    var body = document.body;
    var currentTheme = body.getAttribute("data-theme");
    
    if (currentTheme == "night") {
        body.setAttribute("data-theme", "day");
        document.getElementById("theme-toggle").textContent = "🌙";
    } else {
        body.setAttribute("data-theme", "night");
        document.getElementById("theme-toggle").textContent = "☀️";
    }
}

// Автоматичне перемикання теми залежно від часу
var hour = new Date().getHours();
if (hour >= 7 && hour < 21) {
    document.body.setAttribute("data-theme", "day");
} else {
    document.body.setAttribute("data-theme", "night");
}
