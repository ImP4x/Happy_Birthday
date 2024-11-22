let currentSongIndex = 0; // Índice de la canción actual
const songs = [
  "audio/cancion2.mp3",
  "audio/cancion3.mp3"
];
const audioElement = document.getElementById("fnd");

// Función para reproducir la primera canción al hacer clic en el fondo
function playAudio() {
  if (audioElement.paused) {
    audioElement.volume = 0.4;
    audioElement.play();
  }
}

// Función para cambiar de canción con el botón
function switchSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  audioElement.src = songs[currentSongIndex];
  audioElement.play();
}

var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        autoplay:true,
        loop:true,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      });


var canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");

var ww,wh;

function onResize(){
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
}

ctx.strokeStyle = "red";
ctx.shadowBlur = 25;
ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";

var precision = 100;
var hearts = [];
var mouseMoved = false;

function onMove(e) {
  mouseMoved = true;
  let x, y;

  if (e.type === "touchmove") {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
  } else {
      x = e.clientX;
      y = e.clientY;
  }

  // Generar corazones en la posición correcta del mouse
  hearts.push(new Heart(x, y));
  hearts.push(new Heart(x, y));
}

document.addEventListener("DOMContentLoaded", function() {
  const textElement = document.querySelector('.text');
  const messages = [
    { text: "<span>Feliz <br/> </span>Cumpleaños Alli", top: "300px" },
    { text: "Feliz cumpleaños, querida amiga. Espero que disfrutes tu día al máximo, ¡te aprecio mucho!", top: "280px" },
    { text: "Siempre estaré aquí para ti.", top: "310px" },
    { text: "Te aprecio más de lo que las palabras pueden decir.", top: "310px" },
    { text: "Contigo, cada día es un nuevo capítulo de diversion.", top: "310px" },
    { text: "No hay nada que desee más que verte feliz. Eres muy especial para mí.", top: "290px" },
    { text: "Eres la razón por la que creo en la amistad verdadera.", top: "305px" },
    { text: "La amistad que siento por ti crece más cada día.", top: "310px" },
    { text: "Tú y yo hacemos un excelente equipo, juntas podemos lograr todo.", top: "290px" },
    { text: "Gracias por ser la persona increíble que eres. Te aprecio mucho.", top: "290px" }
  ];
  let currentIndex = 0;

  textElement.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % messages.length;
      textElement.innerHTML = messages[currentIndex].text;
      textElement.style.top = messages[currentIndex].top; // Ajustar posición

      // Aplicar animación
      textElement.classList.remove('fade-in');
      void textElement.offsetWidth; // Forzar el reflow
      textElement.classList.add('fade-in');
  });
});



var Heart = function(x,y){
  this.x = x || Math.random()*ww;
  this.y = y || Math.random()*wh;
  this.size = Math.random()*2 + 1;
  this.shadowBlur = Math.random() * 10;
  this.speedX = (Math.random()+0.2-0.6) * 8;
  this.speedY = (Math.random()+0.2-0.6) * 8;
  this.speedSize = Math.random()*0.05 + 0.01;
  this.opacity = 1;
  this.vertices = [];
  for (var i = 0; i < precision; i++) {
    var step = (i / precision - 0.5) * (Math.PI * 2);
    var vector = {
      x : (15 * Math.pow(Math.sin(step), 3)),
      y : -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step)) 
    }
    this.vertices.push(vector);
  }
}

Heart.prototype.draw = function(){
  this.size -= this.speedSize;
  this.x += this.speedX;
  this.y += this.speedY;
  ctx.save();
  ctx.translate(-1000,this.y);
  ctx.scale(this.size, this.size);
  ctx.beginPath();
  for (var i = 0; i < precision; i++) {
    var vector = this.vertices[i];
    ctx.lineTo(vector.x, vector.y);
  }
  ctx.globalAlpha = this.size;
  ctx.shadowBlur = Math.round((3 - this.size) * 10);
  ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";
  ctx.shadowOffsetX = this.x + 1000;
  ctx.globalCompositeOperation = "screen"
  ctx.closePath();
  ctx.fill()
  ctx.restore();
};


function render(a){
  requestAnimationFrame(render);
  
  hearts.push(new Heart())
  ctx.clearRect(0,0,ww,wh);
  for (var i = 0; i < hearts.length; i++) {
    hearts[i].draw();
    if(hearts[i].size <= 0){
      hearts.splice(i,1);
      i--;
    }
  }
}



onResize();
window.addEventListener("mousemove", onMove);
window.addEventListener("touchmove", onMove);
window.addEventListener("resize", onResize);
requestAnimationFrame(render);