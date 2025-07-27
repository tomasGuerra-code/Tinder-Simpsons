alert()

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

        actualCard.style.transform = `translateX(${pullDeltaX}px rotate(${deg}deg)`
        actualCard.style.cursor = 'grabbing'
    }

    function onEnd(event) {
    
    }
}

document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, {passive: true})