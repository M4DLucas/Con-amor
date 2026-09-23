let isPink = false;

function toggleFlowers(e){
  isPink = !isPink;
  const body = document.body;
  const msg = document.getElementById('message');
  const hint = document.getElementById('hint');
  const flowersGroup = document.getElementById('flowersGroup');

  flowersGroup.classList.toggle('pink', isPink);

  if(isPink){
    body.classList.add('pink');
    msg.textContent = "Nunca me voy a cansar tuyo";
    hint.textContent = "te amo para siempre";
  } else {
    body.classList.remove('pink');
    msg.textContent = "Te amo con todo mi ser, hoy y siempre";
    hint.textContent = "toca el ramo";
  }

  burstHearts(e, isPink);
}


function createFallingPetals(){
  const container = document.getElementById('petalsBg');
  const total = 22;
  for(let i=0;i<total;i++){
    const petal = document.createElement('div');
    petal.className = 'falling-petal';

    const size = 8 + Math.random()*10;
    const left = Math.random()*100;
    const duration = 8 + Math.random()*10;
    const delay = Math.random()*10;
    const drift = (Math.random()*80 - 40) + "px";

    petal.style.left = left + "vw";
    petal.style.width = size + "px";
    petal.style.height = size + "px";
    petal.style.animationDuration = duration + "s";
    petal.style.animationDelay = "-" + delay + "s";
    petal.style.setProperty('--drift', drift);
    petal.dataset.index = i;

    container.appendChild(petal);
  }
  updatePetalColors(false);
}

function updatePetalColors(pink){
  const petals = document.querySelectorAll('.falling-petal');
  petals.forEach(p=>{
    p.style.background = pink
      ? (Math.random() > 0.5 ? '#ff8fb3' : '#ff6fa0')
      : (Math.random() > 0.5 ? '#ffd93d' : '#ffc93d');
  });
}

function burstHearts(e, pink){
  const symbols = pink ? ['💗','💕','🌸','💓'] : ['🌼','✨','💛','🌻'];
  const originX = e && e.clientX ? e.clientX : window.innerWidth/2;
  const originY = e && e.clientY ? e.clientY : window.innerHeight/2;
  const count = 14;

  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'burst-heart';
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];

    const angle = Math.random()*Math.PI*2;
    const distance = 60 + Math.random()*90;
    const bx = Math.cos(angle)*distance;
    const by = Math.sin(angle)*distance - 60;

    el.style.left = originX + "px";
    el.style.top = originY + "px";
    el.style.setProperty('--bx', bx + "px");
    el.style.setProperty('--by', by + "px");
    el.style.animationDuration = (0.9 + Math.random()*0.5) + "s";

    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 1500);
  }

  updatePetalColors(pink);
}

createFallingPetals();