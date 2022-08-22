setInterval(() => {
    if(vaiCaralho.gameIsRunning){
        vaiCaralho.timeCount++;
        document.querySelector('.timer').innerHTML = vaiCaralho.timeCount;
    }
}, 1000);



qtdeCartasConfigurar();