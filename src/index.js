let breeds = [];

document.addEventListener("DOMContentLoaded", function () {
  loadImages();
  loadBreedOptions();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
    .then((res) => res.json())
    .then((results) => {
      results.message.forEach((image) => addImage(image));
    });
}

function addImage(dogUrl) {
  let container = document.getElementById("dog-image-container");
  let imgEl = document.createElement("img");
  imgEl.src = dogUrl;
  container.appendChild(imgEl);
}

function loadBreedOptions() {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  fetch(breedUrl)
    .then((res) => res.json())
    .then((results) => {
      breeds = Object.keys(results.message);
      breeds.forEach((breed) => addBreed(breed));
    });

    // add event listener for select box change

    let select = document.getElementById("breed-dropdown")
    select.addEventListener("change", (event) => {
        filterBreeds(event.target.value)
    })
}

function addBreed(breedName) {
  let breedUl = document.getElementById("dog-breeds");
  let li = document.createElement("li");
  li.addEventListener("click", () => li.style.color = "blue");
  li.innerHTML = breedName;
  breedUl.appendChild(li);
}

function filterBreeds(letter) {
    updateBreeds(breeds.filter((breed) => breed.startsWith(letter)))
}

function updateBreeds(breeds) {
    let breedUl = document.getElementById("dog-breeds");
    breedUl.innerHTML = "" //removes all the li's
    breeds.forEach((breed) => addBreed(breed));
}

