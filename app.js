let listaDeNumerosSorteados = [];
let numeroLimite = 10; //define o número máximo de números a serem sorteados ou o range máximo no caso de 1 a 10
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 0;

function exibirTextoNaTela (tag,texto){
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    responsiveVoice.speak (texto, 'Brazilian Portuguese Female', {rate:1.2}); //lê o texto em voz possível pelo fato da linha 7 do index chamar um script para isso
}

function exibirMensagemInicial(){
exibirTextoNaTela ('h1','Jogo do número secreto v2');
exibirTextoNaTela ('p','Escolha um número entre 1 e 10');
}
exibirMensagemInicial ();

function verificarChute (){
    let chute = document.querySelector ('input').value;
    tentativas ++;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela ('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas!' : 'tentativa!';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela ('p',mensagemTentativas);
        document.getElementById ('reiniciar').removeAttribute ('disabled');
        
    }
    else if (chute > numeroSecreto){
        exibirTextoNaTela ('p','O número secreto é menor!');
    }
    else {
        exibirTextoNaTela ('p','O número secreto é maior!');
    }
    limparCampo ();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random () *numeroLimite +1); //armazena o número aleatório dentro da variável numeroEscolhido para verificações
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; //alimenta a variável quantidadeDeElementosNaLista com o comprimento máximo de números que já foram sorteados para futura comparação

    if (quantidadeDeElementosNaLista == numeroLimite){ //compara se a quantidade de elementos na lista já atingiu o número máximo estabelecido na variável numeroLimite
        listaDeNumerosSorteados = []; //Em caso afirmativo ele limpa a lista.
    }
    if (listaDeNumerosSorteados.includes (numeroEscolhido)){ //verifica se o conteúdo da variável numeroEscolhido está dentro da lista (listaDeNumerosSorteados)
        return gerarNumeroAleatorio (); //Caso a condicional seja atendida ele chama novamente a função gerarNumeroAleatorio para sortear um novo número
    } else { //Condição para caso o numeroEscolhido não está na lista listaDeNumerosSorteados
        listaDeNumerosSorteados.push (numeroEscolhido); //o push serve para colocar a variável que está dentro de numeroEscolhido ao final da lista listaDeNumerosSorteados
        console.log (listaDeNumerosSorteados);
        return numeroEscolhido; //retorna o numeroEscolhido como saída da função gerarNumeroAleatorio caso ele não esteja na lista listaDeNumerosSorteados
    }
}

function limparCampo (){
    chute = document.querySelector ('input');
    chute.value = '';
    //document.querySelector ('input').value ='';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio ();
    limparCampo ();
    tentativas = 0;
    exibirMensagemInicial ();
    document.getElementById ('reiniciar').setAttribute ('disabled', true);
}