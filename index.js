const countriesContainer = document.querySelector('.countries')
const countryInput = document.getElementById('country-input')
const RegionInput = document.getElementById('search-by-region')


// All countries as page Loads
async function initalPageLoad(){
    
    // If found on local storage 
    if(localStorage.getItem('allCountryData')){
        // Adding to UI from Local Storage 
        showData(JSON.parse(localStorage.getItem('allCountryData')))
    }else{
        const countryData = await getData('https://restcountries.com/v3.1/all')
        localStorage.setItem("allCountryData",JSON.stringify(countryData))
    }

}
initalPageLoad()


function showData(countryData){

    countriesContainer.innerHTML = ''
    const temp=[]


    const top5 = countryData.slice(0,5)
    
    top5.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('country')
        div.setAttribute('id',data.cca2)

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



}



// Get the data for first Time 
async function getData(url){
    try{
        const res  = await fetch(url)
        const countryData = await res.json()


        showData(countryData)
        return countryData
        
    }catch(err){
        console.log(err)
    }
    
}


// Search Input  Event 

countryInput.addEventListener('input', (e) =>{
    const inputText = e.target.value
    
    const urlFromSearch = `https://restcountries.com/v3.1/name/${inputText}`

    if(inputText.length>= 3){
        getData(urlFromSearch)
    }else if(inputText.length == 0){
        // If the search box is again empty then so all data
        initalPageLoad()
    }
})


// Search by region

RegionInput.addEventListener('change',(e) => {

    const inputRegion = e.target.value
    const urlFromRegion = `https://restcountries.com/v3.1/region/${inputRegion}`

    if(inputRegion == ''){
        //By Default
        initalPageLoad()
    }else{

        getData(urlFromRegion)
    }
})


// Details Pop Up when clicked on country Card 

const countryCard = document.querySelectorAll('.country')


countryCard.forEach(country => {
    country.addEventListener('click',(e) => {
        let ele = e.target 
        let id = ''

        while (true){
            if(ele.parentElement.id){
                id = ele.parentElement.id
                break
            }else{
                ele = ele.parentElement
            }
        }

        const urlForPopUp = `https://restcountries.com/v3.1/alpha/${id}`

        showDataForPopUp(urlForPopUp)


    })
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
