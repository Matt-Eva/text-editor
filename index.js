const input = document.getElementById('textarea')
const container = document.getElementById('container')
const submit = document.getElementById('submit')

fetch('http://localhost:3000/text')
.then(r => r.json())
.then( data => {
    data.forEach(renderText)
})

input.addEventListener('paste', (e) =>{
    const text = e.clipboardData.getData('Text')
    console.log(e.clipboardData.getData('Text'))
    console.log(text.split('\n'))
})

submit.addEventListener('click', ()=>{
    if (input.value === ''){
        return
    }
    const text = input.value

    const newWriting = {
        text: text
    }
    fetch('http://localhost:3000/text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWriting)
    })
    .then(r => r.json())
    .then(data => renderText(data))
    input.value = ''
})

function renderText(object){
    const pArray = object.text.split('\n')
    pArray.forEach(p =>{
        const newP = document.createElement('p')
        newP.textContent = p
        container.append(newP)
    })
}