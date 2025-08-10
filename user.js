
const insertEl = document.querySelector(".container"); // var defines where to put data in HTML

//Event listeners
const movieIdBox = document.getElementById("idBox");
const buttonIdBtn = document.getElementById("idBtn");

//This makes the button send whatever data is in the input box to the search function
buttonIdBtn.addEventListener("click", () => {
  const searchTerm = movieIdBox.value;
  console.log("fetched with button");
  if (searchTerm) {
    main(searchTerm);
  } else {
    console.log("No search term entered");
  }
});
//This activates the search if the user presses Enter
movieIdBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    main(movieIdBox.value);
    console.log("fetched with Enter key");
  }
});




//api call
  const API_KEY = "c393ced6";

async function main(movieRequest) {
  //The search function is called main. 'movieRequest' is what it asks the API for

  const apiCall = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movieRequest}`;

  const res = await fetch(apiCall); //var sends message to API and waits for response
  const apiData = await res.json(); //var decodes response and makes it usable
  const firstSix = apiData.Search.slice(0, 6); //var takes first six reults to show
  localStorage.setItem("displayData", firstSix);

  insertEl.innerHTML = firstSix.map((inserted) => renderMovies(inserted)).join("");
  //into where.
  console.log(localStorage.getItem("displayData"));

  // console.log(apiData.Search[0]);
  // console.log(firstSix);
  // console.log("end main");
}



//populate html
function renderMovies(inserted) {
  
    console.log(inserted.Year);
    
    // inserted.sort (function (a, b) {
    //   return a.Year - b. Year
    // });
    // console.log(inserted.Year);

  return `<div class="imported">
  <img src="${inserted.Poster}">
        <h1>${inserted.Title}</h1>
        <p>Released ${inserted.Year}</p>
        <p>IMDB ID: ${inserted.imdbID}</p>
        <p>${inserted.Type}</p>
        </div>`;

}


function filterMovies(event) {
  sorted = event.target.value;
  console.log(sorted);
  // return sorted;
}
if (filterMovies.sorted === 'A_Z') {
  firstSix.sort((a, b) => a.Title.localeCompare(b.Title));
}else if (filterMovies.sorted === 'Z_A') {
  firstSix.sort((a, b) => b.Title.localeCompare(a.Title));
}else if (filterMovies.sorted === 'LOW_TO_HIGH') {
  firstSix.sort((a, b) => a.Year - b.Year);
} else if (filterMovies.sorted === 'HIGH_TO_LOW') {
  firstSix.sort((a, b) => b.Year - a.Year);
};
