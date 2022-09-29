const countriesContainer = document.querySelector('.countries')
// Theme 

document.getElementById('theme').addEventListener('click',function(e){
    document.body.classList.toggle('light')
    if(document.body.classList.contains('light')){
        e.target.textContent = 'Dark Mode'
    }else{
        e.target.textContent = 'Light Mode'
    }
})


async function onPageLoad(url){
    const res  = await fetch(url)
    const countryData = await res.json()

    const top5 = countryData.slice(0,5)
    console.log(top5)

    const temp=[]
    top5.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('country')

        div.innerHTML =  ` 
            <img src=${data.flags.svg} alt="${data.name.common} flag image">
            <div class="card-details">
                <h2>${data.name.common}</h2>
                <p>Population: <span>${data.population}</span> </p>
                <p>Region: <span>${data.region}</span> </p>
                <p>Capital: <span>${data.capital}</span> </p>
            </div>
        `
        temp.push(div)
    })
    countriesContainer.append(...temp)

}



{/* 
<div class="country">
    <img src="https://flagcdn.com/ve.svg" alt="flag">
    <div class="card-details">
        <h2>Venezuela</h2>
        <p>Population: <span>2314</span> </p>
        <p>Region: <span>2314</span> </p>
        <p>Capital: <span>2314</span> </p>
    </div>
</div> 
*/}






// All countries as page Loads
onPageLoad('https://restcountries.com/v3.1/all')