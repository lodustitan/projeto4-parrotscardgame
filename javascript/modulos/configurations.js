function qtdeCartasConfigurar(){
    document.querySelector('.cards').innerHTML = "";
    let size_config = Number( window.prompt("Numero de Cards (de 4 a 14)") );
    while (size_config%2 !== 0 || size_config < 4 || size_config > 14) {
        size_config = Number( window.prompt("Numero de Cards (por favor numeros pares de 4 a 14)") );
    }
    boraporra.board = new Board(size_config, ".cards");
    for (let index = 0; index < boraporra.board.board_size/2; index++) {
        boraporra.board.adicionarCarta(cards[index][0]+" Caralho", cards[index][1])
    }
    boraporra.timeCount = 0;
}



// Configurações iniciais, numero de cartas e etc...
const boraporra = {}
const cards = [
    ["A", '../../imgs/bobrossparrot.gif'], 
    ["B", '../../imgs/explodyparrot.gif'], 
    ["C", '../../imgs/fiestaparrot.gif'], 
    ["D", '../../imgs/metalparrot.gif'], 
    ["E", '../../imgs/revertitparrot.gif'], 
    ["F", '../../imgs/tripletsparrot.gif'], 
    ["G", '../../imgs/unicornparrot.gif']
]


// Instanciando o as variaveis do jogo.
boraporra['timeCount'] = 0;
boraporra['getCardByID'] = (id)=>{
    let cartaObjeto;
    boraporra.board.board_arr.forEach( carta =>{
            if(id == carta.getID()){
                cartaObjeto = carta;
            }
        })
    return cartaObjeto;
}