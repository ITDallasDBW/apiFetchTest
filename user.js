const movieIdBox = document.getElementById("idBox");
const buttonIdBtn = document.getElementById("idBtn");

buttonIdBtn.addEventListener('click', () => {
  const searchTerm = movieIdBox.value;
  if (searchTerm) {
    main(searchTerm);
  } else {
    console.log("Please enter a search term");
  }
})



// //Event Listeners
// buttonIdBtn.addEventListener("click", handleSearch);
// movieIdBox.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") handleSearch();
// });

// let movieRequest;
// //get term to search
// function handleSearch() {
//   movieRequest = movieIdBox.value.trim();
//   console.log(movieRequest);
// }




//api call

async function main(movieRequest) {
  const apiCall = `http://www.omdbapi.com/?apikey=c393ced6&s=${movieRequest}`;

  const response = await fetch(apiCall);
  const apiData = await response.json();
  const insertEl = document.querySelector(".container");
  const firstSix = apiData.Search.slice(0, 6);
  insertEl.innerHTML = firstSix
    .map((inserted) => inserting(inserted))
    .join("");
        console.log(apiData.Search[0])
}

main();

//populate html
function inserting(inserted) {
  return `<div class="imported">
  <img src="${inserted.Poster}">
        <h1>${inserted.Title}</h1>
        <p>Released ${inserted.Year}</p>
        <p>IMDB ID: ${inserted.imdbID}</p>
        <p>${inserted.Type}</p>
        </div>
`;
}
