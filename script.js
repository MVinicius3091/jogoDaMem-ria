
const FRONT =  'front-card';
const BACK =  'back-card';
const CARD = 'card';
const ICON = 'icon';




function startGame(){
  
  inicializaCards(game.createCardFromIcons());

}
startGame();

function inicializaCards(cards){
  let gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  game.cards.forEach(card => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icone = card.icone;

    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  })

}

function createCardContent(card, cardElement){
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element){
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);

  if(face === FRONT){
    let iconElement = document.createElement('img');
    iconElement.classList.add(ICON);
    iconElement.src = './imagens/' + card.icon + '.png';
    cardElementFace.appendChild(iconElement);
  }else{
    cardElementFace.innerHTML = '&lt/&gt';
  }
  element.appendChild(cardElementFace);
}



function flipCard(){

  if(game.setCard(this.id)){

    this.classList.add('flip');

    if(game.secondCard){
      if(game.checkMatch()){
        
        game.clearCards();
      
       setTimeout(()=>{

       
       if(game.checkGameOver()){
        let gameOver = document.getElementById('gameOver');
        gameOver.style.display = 'flex';
       }
       }, 1000)

      }else{
        setTimeout(()=>{
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflipCard();

        }, 1000)
      }
    }
  }
}


function restart(){

  game.clearCards();
  startGame();

  let gameOver = document.getElementById('gameOver');
  gameOver.style.display = 'none';

}