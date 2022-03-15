const start = document.querySelector('#start')
const screen = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeBtn = document.querySelector('#time')
const board = document.querySelector('#board')
const deleteH3 = document.querySelector('.delete')

let colors = []



let time = 0
let score = 0

start.addEventListener('click', (event) =>{
    event.preventDefault()
    screen[0].classList.add('up')

})


timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        saveTime.push(time)
        screen[1].classList.add('up')
        startGame()
        
        
    } 
})





function startGame(){
    startTime()
    createBox()  
}


function startTime(){
    time = saveTime.toString()
    var interval = setInterval(function(){
         if(time === 0 ){
             clearInterval(interval)
        finishGame()
        
        }else {
            let current = --time
        if(time < 10){
            current = `0${current}`
        }
        timeBtnValue(current)
    }
    },1000)
   
    
}




function finishGame(){
   
    deleteH3.classList.add('hide')
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
    const startBtn = document.createElement('button')
    const useTime = document.createElement('button')

    useTime.classList.add('useTime')
    useTime.innerHTML = 'Изменить время'
    startBtn.classList.add('game')
    startBtn.innerHTML = 'Повторить'
    board.append(startBtn)
    board.append(useTime)
    
    

                        
}


function timeBtnValue(value){
    timeBtn.innerHTML = `00:${value}`
}


function createBox(){
    const box = document.createElement('div')
    const {width,height} = board.getBoundingClientRect()
    const size = getRandom(10,60)
    const y = getRandom(0,height - size)
    const x = getRandom(0,width - size)


    box.classList.add('circle')
    box.style.height =  `${size}px`
    box.style.width = `${size}px`
    box.style.top = `${y}px`
    box.style.left = `${x}px`
    board.append(box)
}


 function getRandom(min,max){
    return Math.floor(Math.random() * (max-min) + min)
}




board.addEventListener('click', (event)=> {
    if(event.target.classList.contains('circle')){
        ++score
        event.target.classList.add('hide')
        createBox()
    }
    if(event.target.classList.contains('game')){
        score = 0
        deleteH3.classList.remove('hide')
        board.innerHTML = ''
        
        
        
        startGame()
    }
    if(event.target.classList.contains('useTime')){
        screen[1].classList.remove('up')
        board.innerHTML = ''
        deleteH3.classList.remove('hide')
        saveTime = []
        score = 0
    }
})


