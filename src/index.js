// const { forEach } = require("core-js/core/array")

console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    //fetch 1: images
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    makeFetch(imgUrl)
    .then(appendImages)

    //fetch 2: breeds
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
    makeFetch(breedUrl)
    .then(addBreeds)

    //click event: breeds to 'blue'
    const dogUL = document.querySelector('#dog-breeds');
    dogUL.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            event.target.style.color = 'blue'
        }
    })

    //filter
    const dropDown = document.querySelector('#breed-dropdown')
    dropDown.addEventListener('change', (event) => {
        makeFetch(breedUrl)
        .then(breedObj => {
            const selected = event.target.value;
            const dogBreeds = Object.keys(breedObj.message)
            const filteredBreeds = dogBreeds.filter((breed) => {
                return breed.startsWith(selected)
            })

            dogUL.innerHTML = '' // clears <li> elements
            filteredBreeds.forEach((breed) => {
                dogUL.innerHTML += `<li>${breed}</li>`
            })
        })
        
    })

}) 
// DOMContentLoaded

   function makeFetch(url) {
       return fetch(url)
        .then((res) => res.json())
   }

//Append dog images    
function appendImages (images) {
    const dogImageContainer = document.querySelector('#dog-image-container');
    const arrOfDogURLS = images.message;
    arrOfDogURLS.forEach((url) => {const imageTag = document.createElement('img')
    imageTag.src = url
    dogImageContainer.append(imageTag)})
}

//Add breeds to UL
function addBreeds(breedsObj) {
    const dogUL = document.querySelector('#dog-breeds');
    const dogBreeds = Object.keys(breedsObj.message);
        dogBreeds.forEach((breed) => {
            dogUL.innerHTML += `<li>${breed}</li>`
        })
}


   




