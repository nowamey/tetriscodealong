document.addEventListener('DOMContentLoaded',() => {
    const width = 10
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const grid = document.querySelector('.grid')
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    let nextRandom = 0


    //The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
      ]
    
      const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ]
    
      const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
      const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]
    
      const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]
    
      const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

      let currentPosition = 4
      let currentRotation = 0
      let random = Math.floor(Math.random()*theTetrominoes.length)
      let current = theTetrominoes[random][0]
    

      //draw the tetromino

      function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
      }

      function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
      }

      //make the tetromino move down every second
      timerId = setInterval(moveDown,1000)

      //assign functions to keyCodes
      function control(e){
        if(e.keyCode === 37){
            moveLeft()
        }else if (e.keyCode === 38){
            rotate()
        }else if (e.keyCode === 39){
            moveRight()
        }else if (e.keyCode === 40){
            moveDown()
        }
      }
      document.addEventListener('keyup',control)

      
      //move donw function
      function moveDown(){
        undraw()
        currentPosition += width
        draw()
        freeze()
      }

      function freeze(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            random = nextRandom 
            nextRandom = Math.floor(Math.random() *theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()

        }
      }


      function moveLeft(){
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index=>squares[currentPosition+index].classList.contains('taken'))) {
            currentPosition +=1
        }

        draw()
      }
    
      //move the tetromino right unless it is at the edge or blockage
      function moveRight(){
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index)% width ===width -1 )

        if(!isAtRightEdge) currentPosition +=1

        if(current.some(index=>squares[currentPosition+index].classList.contains('taken'))){
            currentPosition -=1
        }
        draw()
      }

      //rotate the tetromino
      function rotate(){
        undraw()
        currentRotation++

        if(currentRotation === current.length){
          //when current rotation is at four, it needs to reset
          currentRotation =0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
      }
      const displaySquares = document.querySelectorAll('.mini-grid div')
      const displayWidth = 4
      let displayIndex = 0

      //the Tetrominos without rotations 
      const upNextTetrominoes = [
        [1,displayWidth+1,displayWidth*2+1,2], //l
        [0,displayWidth,displayWidth+1,displayWidth*2+1],//z
        [1,displayWidth,displayWidth+1,displayWidth+2],//t
        [0,1,displayWidth,displayWidth+1] //o
        [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]//i
      ]

      function displayShape(){
        displaySquares.forEach(square=>{
          square.classList.remove('tetromino')
        })
        upNextTetrominoes[nextRandom].forEach(index =>{
          displaySquares[displayIndex+index].classList.add('tetromino')
        })
      }
})