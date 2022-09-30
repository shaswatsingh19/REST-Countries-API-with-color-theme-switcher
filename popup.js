

const popUpContainer = document.getElementById('popup')

async function showDataForPopUp(urlForPopUp) {

    try {

        const res = await fetch(urlForPopUp)
        const data = await res.json()

        const currCode = Object.keys(data[0].currencies)[0]
        const nativeCode = Object.keys(data[0].name.nativeName)


        if(data[0].borders){
            // console.log('border')
            const border = data[0].borders.map(border => {
                return `<span>${border}</span>`
            }).join('')
        }else{
            // console.log('no border')
        }

        popUpContainer.innerHTML = `
            <div class="popup-details">
            <img src=${data[0].flags.svg} alt="${data[0].name.common} flag">
            <div class="popup-country">
            <h2>${data[0].name.common}</h2>
            <div class="popup-country-details">
            <p>Native Name: <span>${data[0].name.nativeName[nativeCode[0]].common}</span> </p>
            <p>Population: <span>${data[0].population.toLocaleString('en-US')}</span> </p>
            <p>Region: <span>${data[0].region}</span> </p>                   
            <p>Sub Region: <span>${data[0].subregion}</span> </p>
            <p>Capital: <span>${data[0].capital}</span> </p>
            <p>Top Level Domain: <span>${data[0].tld[0]}</span> </p>
            <p>Currencies: <span>${data[0].currencies[currCode].name}</span> </p>
            <p>Languages : <span>${Object.values(data[0].languages)}</span> </p>
            </div>
            </div>
            
            <div class="border-countries">
            <p>Border Countries:</p>
            
            </div>
            
            </div>
            `
        const borderCountryContainer = document.querySelector('.border-countries')

        borderCountryContainer.innerHTML += border
    }
    catch (err) {
        console.log(err)
    }

}


showDataForPopUp(`https://restcountries.com/v3.1/alpha/nz`)



// Theme 

document.getElementById('theme').addEventListener('click', function (e) {
    document.body.classList.toggle('light')
    if (document.body.classList.contains('light')) {
        e.target.textContent = 'Dark Mode'
    } else {
        e.target.textContent = 'Light Mode'
    }
})
