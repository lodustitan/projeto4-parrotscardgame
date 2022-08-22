// introduzido por Richard Durstenfeld no ano de 1964.
// https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/*
    Board

    Board.adicionarCarta - literalmente adiciona um objeto do tipo "new Card()" a propriedade board_arr. 
    Board.verificarViradas - faz uma varredura nas cartas, aplicando as regras do jogo.
    Board.verificarVitoria - faz mais uma varredura para verificar se as condições de vitória foram atendidas e então aplicar a ação de reiniciar jogo.
*/
class Board {
    constructor(size, html_source){
        this.html_source = html_source; // classe html onde o jogo iniciará.
        this.board_size = Number(size); // só um limitador.
        this.board_arr = new Array(); // aqui ficam todas as cartas do game.
        this.viradas = new Array(); // uma array de 2 indices, que guardará as 2 cartas que forem viradas e testará se são iguais ou diferentes.
        this.points = 0; // cartas clicadas.
    }
    adicionarCarta(nome, image){
        this.board_arr.push(
            new Card(nome, image, this.html_source),
            new Card(nome, image, this.html_source)
        );
        let cardARRAY = new Array();
        let shuffled =  document.querySelectorAll(".Carta");
        shuffled.forEach( a=> { cardARRAY.push(a) });
        shuffled = shuffleArray( cardARRAY );
        document.querySelector(this.html_source).innerHTML = "";
        shuffled.forEach( old_Newcard =>{ 
            old_Newcard.onclick = ()=>{
            let essaCarta = vaiCaralho.getCardByID(old_Newcard.dataset.id);
            // carta só pode ser virada caso não esteja virada ou concluida
                if(essaCarta.completa === false && essaCarta.podeVirar === true && essaCarta.virada === false){
                    essaCarta.virada = true;
                    essaCarta.virarCartaHTML();
                    this.viradas.push( essaCarta );
                    this.points++;
                }
                this.verificarViradas();
            }
            document.querySelector(this.html_source).appendChild(old_Newcard)
        });
    }
    verificarViradas(){
        if(this.viradas.length === 2){
            this.board_arr.forEach(a=>{a.podeVirar = false })
            if ( this.viradas[0].nome === this.viradas[1].nome ){
                vaiCaralho.getCardByID(this.viradas[0].id).completeCard();
                vaiCaralho.getCardByID(this.viradas[1].id).completeCard();
                this.viradas = [];
                this.board_arr.forEach(a=>{
                    if(a.completa === true && a.virada === true){
                        a.podeVirar = false; 
                    }else if(a.completa === false && a.virada === false){
                        a.podeVirar = true;
                    }
                });
                this.verificarVitoria();
            }
            else{
                const verify = ()=>{
                    this.board_arr.forEach(a=>{
                        if(a.completa === false && a.virada === true){
                            a.virada = false;
                            a.podeVirar = true;
                            a.virarCartaHTML();
                        }else if(a.completa === false && a.virada === false){
                            a.podeVirar = true;
                        }
                    })
                }
                this.viradas = [];
                setTimeout(verify, 1000)
            }
        }
    }
    verificarVitoria(){
        let c_viradas = this.board_size; 
        this.board_arr.forEach( a =>{
            if(a.completa === true){
                c_viradas--;
            }
        })
        if(c_viradas <= 0){
            setTimeout(()=>{
                let promise = new Promise( (res, rej)=>{
                    let mensagens = [
                        "Acertou todas sem errar, Ta de hack com certeza... quer jogar denovo?",
                        "Jogou bem, Quer jogar denovo meu rei?",
                        "O Omega 3, ajuda na memória, deseja tentar novamente?"
                    ]
                    let ind = 0;
                    if(this.points === this.board_size){ ind=0 }
                    else if (this.points > this.board_size && this.points <= this.board_size*2){ ind=1 }
                    else if (this.points > this.board_size*2){ ind=2 }
                    if(window.confirm(`Você ganhou em ${this.points} jogadas!, ${mensagens[ind]}`)){
                        res();
                    }else{
                        rej();
                    }
                })
                .then(function(){
                    console.log("Jogo reiniciado!");
                    qtdeCartasConfigurar();
                })
                .catch(function(){
                    console.log("A sessão foi encerrada, obrigado por jogar!");
                    vaiCaralho.gameIsRunning = false;
                });
            }, 1000)
        }
    }
}

/*
    Card

    Card.getID - retorna o id atual da carta.
    Card.virarCartaHTML - literalmente vira a carta html que a corresponde, ja que estão "linkadas".
    completeCard - marca ela como completa para que não possa mais ser virada, é um dos requisitos para vitoria.
*/
class Card {
    constructor(name, image, classOfElementList){
        // Propriedades das Cards
        this.id = Math.random().toString(36).substr(2, 5); 
        this.nome = name;
        this.virada = false;
        this.podeVirar = true;
        this.completa = false;

        // Esse objeto está diretamente linkado a um HTML.
        // Construção do HTML.
        let cardDom = document.createElement('flex-box');
        let cardImage1 = new Image(); 
        let cardImage2 = new Image(); 
        cardImage1.src = image; 
        cardImage1.className = "Back"; 
        cardImage2.src = "../../imgs/front.png";
        cardImage2.className = "Front"; 
        cardDom.classList.add('Carta');
        cardDom.dataset.id = this.id;
        

        cardDom.appendChild(cardImage2);
        cardDom.appendChild(cardImage1);
        document.querySelector(classOfElementList).appendChild(cardDom)
    }
    getID(){ return this.id }
    virarCartaHTML(){ document.querySelector(`flex-box[data-id="${this.id}"]`).classList.toggle('virada') }
    completeCard(){ this.completa = true }
}