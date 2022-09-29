// Theme 

document.getElementById('theme').addEventListener('click',function(e){
    document.body.classList.toggle('light')
    if(document.body.classList.contains('light')){
        e.target.textContent = 'Dark Mode'
    }else{
        e.target.textContent = 'Light Mode'
    }
})