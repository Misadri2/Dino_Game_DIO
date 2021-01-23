const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000; // Velocidade para gerar novos cactus

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {    // Para fazer mais cactus aparecerem
        clearInterval(leftInterval);
        background.removeChild(cactus);  // remover elemento da tela
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {      // Altura do pulo de dino
        clearInterval(leftInterval); 
        isGameOver = true;    // Game over
        document.body.innerHTML = '<h1 class="game-over">Fim de jogo!!!</h1>';
        } else {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

  setTimeout(createCactus, randomTime);   // Recursividade, invoca a criação de um novo cactus
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
