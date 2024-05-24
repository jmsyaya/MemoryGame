const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // 첫번째 카드
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // 두번째 카드
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {  // 카드 매칭!
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {   // 1카드, 2카드가 같을 경우 그대로 둠.
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {    // 1카드, 2카드가 다를 경우 0.777초 뒤에 다시 뒤집음.
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 777);
}

function resetBoard() {     // 보드 초기화
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));