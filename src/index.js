let url = 'http://localhost:3000/films';
const listHolder = document.getElementById('films');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.film.item').remove();
    fetchMovies(url);
});

// Create fetch function
function fetchMovies(url) {
    fetch(url)
    .then(response => response.json())
    .then(movies => {
        movies.forEach(movie => {
            displayMovie(movie);
        });
    })
    .catch(error => console.error('Error fetching movies:', error));
}

function displayMovie(movie) {
    const li = document.createElement('li');
    li.style.cursor = "pointer";
    li.textContent = movie.title.toUpperCase();
    listHolder.appendChild(li);
    addClickEvent(li, movie.id);
}

function addClickEvent(element, movieId) {
    element.addEventListener('click', () => {
        fetch(`${url}/${movieId}`)
        .then(response => response.json())
        .then(movie => {
            document.getElementById('buy-ticket').textContent = 'Buy Ticket';
            setUpMovieDetails(movie);
        })
        .catch(error => console.error('Error fetching movie details:', error));
    });
}

function setUpMovieDetails(movie) {
    const preview = document.getElementById('poster');
    preview.src = movie.poster;

    const movieTitle = document.querySelector('#title');
    movieTitle.textContent = movie.title;
    const movieTime = document.querySelector('#runtime');
    movieTime.textContent = `${movie.runtime} minutes`;
    const movieDescription = document.querySelector('#film-info');
    movieDescription.textContent = movie.description;
    const showTime = document.querySelector('#showtime');
    showTime.textContent = movie.showtime;
    const tickets = document.querySelector('#ticket-num');
    tickets.textContent = movie.capacity - movie.tickets_sold;
}

const btn = document.getElementById('buy-ticket');

btn.addEventListener('click', function(e) {
    e.preventDefault();
    let remTickets = document.querySelector('#ticket-num').textContent;
    if (parseInt(remTickets, 10) > 0) {
        document.querySelector('#ticket-num').textContent = parseInt(remTickets, 10) - 1;
    } else if (parseInt(remTickets, 10) === 0) {
        btn.textContent = 'Sold Out';
    }
});

