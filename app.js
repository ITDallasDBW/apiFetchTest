const movie = `http://www.omdbapi.com/?apikey=c393ced6&s=love`;

async function main() {
  const fetchable = await fetch(movie);
  const usable = await fetchable.json();
  const insertable = document.querySelector(".container");
  const firstSix = usable.Search.slice(0, 6);
  insertable.innerHTML = firstSix
    .map((inserted) => inserting(inserted))
    .join("");
        console.log(usable.Search[0])

}

main();

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
