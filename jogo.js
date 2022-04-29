const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura
  const chaoY = chao.y

  if (flappyBirdY >= chaoY) {
    return true
  }
  return false
}

function criaFlapplyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    velocidade: 0,
    gravidade: 0.25,
    pulo: 4.6,
    desenha() {
      contexto.drawImage(
        sprites, // imagem
        flappyBird.spriteX, flappyBird.spriteY, // sprite x e sprite y
        flappyBird.largura, flappyBird.altura,  // tamanho do recorte
        flappyBird.x, flappyBird.y, // onde ele vai aparecer
        flappyBird.largura, flappyBird.altura // tamanho dentro do canvas
      )
    },
    atualiza() {
      if (fazColisao(flappyBird, chao)) {
        console.log('Fez colisão')
        mudaParaTela(Telas.INICIO)
        return
      }
      flappyBird.velocidade += flappyBird.gravidade
      flappyBird.y += flappyBird.velocidade
    },
    pula() {
      console.log('devo pular')
      flappyBird.velocidade = - flappyBird.pulo
    }
  }
  return flappyBird
}

const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura
    )

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura
    )
  }
}

const background = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {

    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.largura, background.altura,
      background.x, background.y,
      background.largura, background.altura
    )

    contexto.drawImage(
      sprites,
      background.spriteX, background.spriteY,
      background.largura, background.altura,
      (background.x + background.largura), background.y,
      background.largura, background.altura
    )
  }
}

const telaInicial = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {

    contexto.drawImage(
      sprites,
      telaInicial.spriteX, telaInicial.spriteY,
      telaInicial.largura, telaInicial.altura,
      telaInicial.x, telaInicial.y,
      telaInicial.largura, telaInicial.altura
    )
  }
}

const globais = {}
let telaAtiva = {}

function mudaParaTela(novaTela) {
  telaAtiva = novaTela

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa()
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlapplyBird()
    },
    desenha() {
      background.desenha()
      chao.desenha()
      globais.flappyBird.desenha()
      telaInicial.desenha()
    },
    click() {
      mudaParaTela(Telas.JOGO)
    },
    atualiza() {

    }
  }
}

Telas.JOGO = {
  desenha() {
    background.desenha()
    chao.desenha()
    globais.flappyBird.desenha()
  },
  click() {
    globais.flappyBird.pula()
  },
  atualiza() {
    globais.flappyBird.atualiza()
  }
}

function loop() {
  telaAtiva.desenha()
  telaAtiva.atualiza()
  requestAnimationFrame(loop)
}

window.addEventListener('click', function () {
  if (telaAtiva.click) {
    telaAtiva.click()
  }
})

mudaParaTela(Telas.INICIO)
loop()
