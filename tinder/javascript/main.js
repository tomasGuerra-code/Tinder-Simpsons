const DECISION_THRESHOLD = 75

let isAnimating = false
let pullDeltaX = 0

function startDrag(event) {
    if (isAnimating) return

    const actualCard = event.target.closest('article')
    if (!actualCard) return

    const startX = event.pageX ?? event.touches[0].pageX

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)

    document.addEventListener('touchmove', onMove, {passive: true})
    document.addEventListener('touchend', onEnd, {passive: true})

    function onMove(event) {
        const currentX = event.pageX ?? event.touches[0].pageX

        pullDeltaX = currentX - startX

        if (pullDeltaX === 0) return

        isAnimating = true

        const deg = pullDeltaX / 13

        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`
        actualCard.style.cursor = 'grabbing'

        const opacity = Math.abs(pullDeltaX) / 100
        const isRight = pullDeltaX > 0
        const choiceEl = isRight
        ? actualCard.querySelector('.choice.like')
        : actualCard.querySelector('.choice.nope')

        choiceEl.style.opacity = opacity
    }

    function onEnd(event) {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onEnd)

      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend', onEnd)

      const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

      if (decisionMade) {
        const goRight = pullDeltaX >= 0

        actualCard.classList.add(goRight ? 'go-right' : 'go-left')
        actualCard.addEventListener('transitionend', () => {
            actualCard.remove()
        })
      } else {
        actualCard.classList.add('reset')
        actualCard.classList.remove('go-right', 'go-left')

        actualCard.querySelectorAll('.choice').forEach(choice => {
            choice.style.opacity = 0
        })
      }

      actualCard.addEventListener('transitionend', () => {
        actualCard.removeAttribute('style')
        actualCard.classList.remove('reset')

        pullDeltaX = 0
        isAnimating = false
      })
      actualCard
        .querySelectorAll(".choice")
        .forEach((el) => (el.style.opacity = 0));
    }
}

document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, {passive: true})

//Botones del footer
const btnUndo = document.querySelector('.is-undo')
const btnRemove = document.querySelector('.is-remove')
const btnStar = document.querySelector('.is-star')
const btnFav = document.querySelector('.is-fav')
const btnZap = document.querySelector('.is-zap')

let lastRemovedCard = null // Guarda la ultima card

//Swipe a la izquierda, va muy rapido creo y no muestra el nope

btnRemove.addEventListener('click', () => {
  const topCard = document.querySelector('.cards article:last-of-type')
  if (topCard) {
    lastRemovedCard = topCard.cloneNode(true)
    topCard.classList.add('go-left')
    topCard.addEventListener('transitionend', () => topCard.remove())
    }
  })

//Swipe a la derecha, va muy rapido creo y no muestra el like

btnFav.addEventListener('click', () => {
  const topCard = document.querySelector('.cards article:last-of-type')
  if (topCard) {
    lastRemovedCard = topCard.cloneNode(true)
    topCard.classList.add('go-right')
    topCard.addEventListener('transitionend', () => topCard.remove())
    }
  })

  //Deshacer el ultimo swipe
btnUndo.addEventListener('click', () => {
  if (lastRemovedCard) {
    lastRemovedCard.classList.remove('go-left', 'go-right')
    lastRemovedCard.style.transform = ''
    document.querySelector('.cards').appendChild(lastRemovedCard)
    lastRemovedCard = null
  }
})

//Agregar alguna funcionalidad a los botones de estrella y rayo

btnStar.addEventListener('click', () => {
  alert('¡Funcionalidad pendiente para el botón de estrella!');
})

btnZap.addEventListener('click', () => {
  alert('¡Funcionalidad pendiente para el botón de rayo!');
})

//Personajes de Springfield

const characters = [
  {
    name: "Homero",
    age: 39,
    img: "./assets/cards/Homero.webp",
    alt: "Homero Simpson, 39 años",
  },
  {
    name: "Marge",
    age: 38,
    img: "./assets/cards/Marge.webp",
    alt: "Margie Bouvier, 38 años",
  },
  {
    name: "Ned",
    age: 60,
    img: "./assets/cards/Flanders.webp",
    alt: "Ned Flanders, 60 años",
  },
    {
    name: "Patty",
    age: 45,
    img: "./assets/cards/Patty.webp",
    alt: "Paty Bouvier, 45 años",
  },
    {
    name: "Selma",
    age: 45,
    img: "./assets/cards/Selma.webp",
    alt: "Selma Bouvier, 45 años",
  },
    {
    name: "Abraham",
    age: 87,
    img: "./assets/cards/Abuelo.webp",
    alt: "Abraham Simpson, 87 años",
  },
    {
    name: "Jaqueline",
    age: 76,
    img: "./assets/cards/MamaMarge.webp",
    alt: "Jaqueline Bouvier, 76 años",
  },
    {
    name: "Montgomery",
    age: 104,
    img: "./assets/cards/Burns.webp",
    alt: "Charles Montgomery Burns, 104 años",
  },
    {
    name: "Smithers",
    age: 44,
    img: "./assets/cards/Smithers.webp",
    alt: "Waylon Smithers, 44 años",
  },
    {
    name: "Lenny",
    age: 35,
    img: "./assets/cards/Lenny.webp",
    alt: "Lenny Leonard, 35 años",
  },
    {
    name: "Carl",
    age: 35,
    img: "./assets/cards/Carl.webp",
    alt: "Carl Carson, 35 años",
  },
    {
    name: "Moe", //revisar foto
    age: 35,
    img: "./assets/cards/Moe.webp",
    alt: "Moe Szyslak, 35 años",
  },
    {
    name: "Barney", //baja calidad
    age: 33,
    img: "./assets/cards/Barney.webp",
    alt: "Barney Gumble, 33 años",
  },
    {
    name: "Apu", //cambiar foto
    age: 33,
    img: "./assets/cards/Apu.webp",
    alt: "Apu Nahasapeemapetilon, 33 años",
  },
    {
    name: "Hershel",
    age: 54,
    img: "./assets/cards/Krusty.webp",
    alt: "Krusty el Payaso, 54 años",
  },
    {
    name: "Gorgory",
    age: 40,
    img: "./assets/cards/Gorgory.webp",
    alt: "Gregory Wiggum, 40 años",
  },
    {
    name: "Julius",
    age: 56,
    img: "./assets/cards/Hibbert.webp",
    alt: "Julius Hibbert, 56 años",
  },
    {
    name: "Otto",
    age: 31,
    img: "./assets/cards/Otto.webp",
    alt: "Otto Mann, 31 años",
  },
    {
    name: "Saymour",
    age: 44,
    img: "./assets/cards/Skinner.webp",
    alt: "Seymour Skinner, 44 años",
  },
      {
    name: "Edna",
    age: 30,
    img: "./assets/cards/Edna.webp",
    alt: "Edna Krabappel, 30 años",
  },
    {
    name: "Elisabeth",
    age: 30,
    img: "./assets/cards/Hoover.webp",
    alt: "Elisabeth Hoover, 30 años",
  },
];

function renderCards() {
  const cardsContainer = document.querySelector('.cards');
  cardsContainer.innerHTML = characters.map(char =>`
    <article>
      <img src="${char.img}" alt="${char.alt}">
      <h2>${char.name}<span>${char.age}</span></h2>
      <div class="choice nope">NOPE</div>
      <div class="choice like">LIKE</div>
    </article>
  `).join('') + `
    <span>
      No hay más personas en Springfield... <br>
      Vuelve a intentarlo más tarde.
      </span>
    `;
}
document.addEventListener('DOMContentLoaded', renderCards);