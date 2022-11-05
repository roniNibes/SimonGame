let gamePattern = [];
const buttonColors = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern = [];

let started = false;
//! this is for penentuan level
let level = 0;


function nextSequence() {
    // console.info(randomNumber);

    userClickedPattern = [];
    level++

    $('#level-title').text(`Level ${level}`);
    //! ini buat nagkap warna tombol secara acak
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);
    
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    let audio = new Audio('sounds/' + randomChosenColour + '.mp3');
    audio.play();   


   
}


function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();   

}

function animatePress(curretnColor) {
    let activeButton = $(`#${curretnColor}`);
    activeButton.addClass('pressed');

        setTimeout(function(){
            activeButton.removeClass('pressed')
        }, 100)
    
}

$(document).on('keydown', function (e) {
    if (!started) {

        $('#level-title').text(`Level ${level}`);
        nextSequence();
        started = true;
    }
})

// ! ini event buat di hp


$(function($) { // DOM ready and $ alias secured

    $(window).on('keydown', function(e){
      alert( e.which );
    });
  
  });

$('.btn').click(function(){
        
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    // console.info(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel) {
    

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.info('succes');

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else {
        let wrongSound = new Audio('sounds/wrong.mp3');
        wrongSound.play();

        
        $('h1').text('Game over bruh... Press any key to restart game.')
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200)
        startOver();

    }
}

function startOver() {
    level = 0,
    gamePattern = [],
    started = false;
}
