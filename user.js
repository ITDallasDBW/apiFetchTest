async function main() {

    const fetchable = await fetch("http://www.omdbapi.com/?apikey=c393ced6&s=love")
    const usable = await fetchable.json();
    const insertable = document.querySelector(".container");
    const firstSix = usable.Search.slice(0,6);

    console.log(usable)
    console.log(usable.Search[0])
    console.log(firstSix);

    insertable.innerHTML = firstSix
    .map(
        (inserted) =>            
        `<div class="imported">
        <h1>${inserted.Title}</h1>
        <p>${inserted.Year}</p>
        <img src="${inserted.Poster}">
        </div>
`).join('');
}

main();