function qtdeCartasConfigurar(){
    document.querySelector('.cards').innerHTML = "";
    let size_config = Number( window.prompt("Numero de Cards (de 4 a 14)") );

    while (size_config%2 !== 0 || size_config < 4 || size_config > 14) {
        size_config = Number( window.prompt("Numero de Cards (por favor numeros pares de 4 a 14)") );
    }

    vaiCaralho.board = new Board(size_config, ".cards");
    
    for (let index = 0; index < vaiCaralho.board.board_size/2; index++) {
        vaiCaralho.board.adicionarCarta(vaiCaralho.cards[index][0]+" Caralho", vaiCaralho.cards[index][1])
    }
    
    vaiCaralho.timeCount = 0;
    vaiCaralho.gameIsRunning = true;
}


// Configurações iniciais, numero de cartas e etc...
const vaiCaralho = {}


// Instanciando as variaveis do jogo.
vaiCaralho['gameIsRunning'] = false; // se "False" o contador abaixo para.
vaiCaralho['timeCount'] = 0; // Tempo de jogo.
vaiCaralho['cards'] = [
    ["A", '../../imgs/bobrossparrot.gif'], 
    ["B", '../../imgs/explodyparrot.gif'], 
    ["C", '../../imgs/fiestaparrot.gif'], 
    ["D", '../../imgs/metalparrot.gif'], 
    ["E", '../../imgs/revertitparrot.gif'], 
    ["F", '../../imgs/tripletsparrot.gif'], 
    ["G", '../../imgs/unicornparrot.gif']
]
vaiCaralho['getCardByID'] = (id)=>{
    let cartaObjeto;
    vaiCaralho.board.board_arr.forEach( carta =>{
            if(id == carta.getID()){
                cartaObjeto = carta;
            }
        })
    // Retorna a referencia da carta.
    return cartaObjeto;
}