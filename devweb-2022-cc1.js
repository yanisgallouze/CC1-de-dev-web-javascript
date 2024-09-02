"use strict";

//récupération des éléments du DOM par ID
const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");



let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;


//méthode pour lancer le jeu et activer le bouton pour jouer avec un message en retour
function launchGame(_evt) {
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;
  nbGuesses = 0;
  $output.textContent = "Jeu démarré ! Devinez un nombre entre 1 et " +$maxUsr.value;
  $guessBtn.disabled = false;
}

/**
 * fonction pour vérifier si le nombre saisi par l'utilisateur est correct
 * compare la valeur saisie avec le nombre secret et affiche un message approprié
 */

function checkGuess(){
  if ($numUsr.value == "") return;

  const guess = Number($numUsr.value);
  nbGuesses++;

  if (guess === secretNumber) {
    $output.textContent = "Félicitations ! Vous avez trouvé le nombre " + secretNumber + " en " + nbGuesses + " coups.";
    endGame();
  } else if (guess < secretNumber) {
    $output.textContent = "C'est trop bas ! Tentative " + nbGuesses + "/"  + maxGuesses + ".";
  } else {
    $output.textContent = "C'est trop haut ! Tentative " + nbGuesses + "/"  + maxGuesses + ".";
  }

  if (nbGuesses >= maxGuesses) {
    if (guess != secretNumber){
      $output.textContent += " Nombre maximum de tentatives atteint ! Le nombre était : " + secretNumber + ".";
    }
    else {
      $output.textContent += " Nombre maximum de tentatives atteint !";
    }
    endGame();
    
  }
}



//méthode de fin de jeu qui désactive le bouton après avoir deviner le nombre ou après avoir fini le nombre de tentatives
function endGame(){
  $guessBtn.disabled = true;
}

//handlers pour lancer le jeu et vérifier le nombre saisie avec la touche entrer
$startBtn.addEventListener("click", launchGame);
$guessBtn.addEventListener("click", checkGuess);
$numUsr.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

// exercice 2 : vacher/devacher

function addCow(evt) {
  console.debug(evt.x, evt.y);

  
  const cowImage = document.createElement("img");
  cowImage.src = "cow.svg"; //image relative path
  cowImage.className = "cow";


  cowImage.style.transform = `rotate(${Math.random() * 360}deg)`;

  //propriétés css pour mettre l'image de la vache sur le pointeur de la souris
  cowImage.style.left = `${evt.pageX}px`;
  cowImage.style.top = `${evt.pageY}px`

  document.body.appendChild(cowImage)
}

/**
 * fonction pour activer ou désactiver l'ajout d'images de vache sur clic
 * active l'ajout de vache si désactivé, et vice versa
 */

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);






