let level = 1;
let choice = [];
let userSequence = [];
let colors = ["blue", "green", "red", "yellow"];

function startGame(level) {
    $("h1").text(`Level ${level}`);
    choice = []; 
    userSequence = [];
    for (let i = 0; i < level; i++) {
        let color = colors[Math.floor(Math.random() * 4)];
        choice.push(color);
        setTimeout(() => pressed(color), i * 1000); 
    }
}

$(document).keydown((event) => {
    if (event.key.toLowerCase() === "a" && !$("h1").text().includes("Level")) {
        level = 1;
        startGame(level);
    }
});

function pressed(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
    $(`.${color}`).addClass("pressed");
    setTimeout(() => {
        $(`.${color}`).removeClass("pressed");
    }, 300);
}

$(".box").click((event) => {
    let current;
    if (event.target.classList.contains("blue")) current = "blue";
    else if (event.target.classList.contains("green")) current = "green";
    else if (event.target.classList.contains("red")) current = "red";
    else if (event.target.classList.contains("yellow")) current = "yellow";

    pressed(current);
    userSequence.push(current);

    let index = userSequence.length - 1;

    if (current === choice[index]) {
        if (userSequence.length === choice.length) {
            setTimeout(() => {
                level++;
                startGame(level);
            }, 1000);
        }
    } else {
        $("h1").text("Wrong! Press A key to Start Again");
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        level = 1;
        choice = [];
        userSequence = [];
        $('body').css("background-color", "#ff1234")
        setTimeout(() => {
            $('body').css("background-color", "#200250")
        }, 200);
        console.log("hello")
        
    }
});
