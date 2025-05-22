
const COLORS = ["red", "green", "blue", "yellow"]
let colorPattern = [];
let userPattern = [];
let level = 1
let run = false


const makeSound = (color) => {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
    const button = $(`.${color}`)
    button.fadeOut(100).fadeIn(100);
    
}

const getRandomColor = () => {
    let randomColor = COLORS[Math.floor(Math.random() * 4)]
    colorPattern.push(randomColor)
    makeSound(randomColor);
    userPattern = []
}

const checkPattern = () => {
    for (let i = 0; i < userPattern.length; i++) {
        if(userPattern[i] !== colorPattern[i]){
            run = false
            colorPattern = []
            userPattern = []
            level = 1
            $("h1").text(`Game Over, Press Any Key to Restart`)
            const audio = new Audio(`sounds/wrong.mp3`);
            audio.play();
            $("body").addClass("game-over")
            setTimeout(() => {
                $("body").removeClass("game-over")
            }, 50);
        }
    }
}

const handleClick = (e) => {
    if(run){
        let colorClicked = e.target.id;
        makeSound(colorClicked);
        userPattern.push(colorClicked);
        checkPattern()
        if(userPattern.length === colorPattern.length && run){
            setTimeout(() => {
                level += 1
                $("h1").text(`Level ${level}`)
                getRandomColor()
            }, 1000);
        }
    }
}

$(".btn").on("click", handleClick)


$("body").keydown(() => {
    if(run === false) {
        getRandomColor();
        $("h1").text(`Level ${level}`)
        run = true
    }
})

