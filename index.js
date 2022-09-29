const countriesContainer = document.querySelector('.countries')
const countryInput = document.getElementById('country-input')



// All countries as page Loads
function initalPageLoad(){
    showData('https://restcountries.com/v3.1/all')
}
initalPageLoad()



async function showData(url){
    try{

        const res  = await fetch(url)
        const countryData = await res.json()

        console.log(countryData)

        const top5 = countryData.slice(0,5)
        console.log(top5)
    
        countriesContainer.innerHTML = ''
    
        const temp=[]
        top5.forEach(data => {
            const div = document.createElement('div')
            div.classList.add('country')
    
            div.innerHTML =  ` 
                <img src=${data.flags.svg} alt="${data.name.common} flag image">
                <div class="card-details">
                    <h2>${data.name.common}</h2>
                    <p>Population: <span>${data.population.toLocaleString('en-US')}</span> </p>
                    <p>Region: <span>${data.region}</span> </p>
                    <p>Capital: <span>${data.capital}</span> </p>
                </div>
            `
            temp.push(div)
        })
        countriesContainer.append(...temp)

    }catch(err){
        
        alert('No Data Found')

    }


}


// Search Input  Event 
countryInput.addEventListener('input', (e) =>{
    const inputText = e.target.value
    
    const urlFromSearch = `https://restcountries.com/v3.1/name/${inputText}`

    console.log(urlFromSearch)

    if(inputText.length>= 3){
        showData(urlFromSearch)
    }else if(inputText.length == 0){
        // If the search box is again empty then so all data
        initalPageLoad()
    }
})





// Theme 

document.getElementById('theme').addEventListener('click',function(e){
    document.body.classList.toggle('light')
    if(document.body.classList.contains('light')){
        e.target.textContent = 'Dark Mode'
    }else{
        e.target.textContent = 'Light Mode'
    }
})
