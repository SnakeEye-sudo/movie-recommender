// Global variables
let currentMovie = null;
let allMovies = [...movies];
const modal = document.getElementById('movieModal');
const searchInput = document.getElementById('searchInput');
const genreCheckboxes = document.querySelectorAll('.genre-checkbox');
const sortSelect = document.getElementById('sortBy');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderMovies(allMovies);
  setupEventListeners();
  loadTheme();
});

// Setup event listeners
function setupEventListeners() {
  searchInput.addEventListener('input', filterMovies);
  genreCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterMovies);
  });
  
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', toggleTheme);
  
  // Modal close button
  document.querySelector('.close').addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Render movies to grid
function renderMovies(moviesToRender) {
  const moviesGrid = document.getElementById('moviesGrid');
  
  if (moviesToRender.length === 0) {
    moviesGrid.innerHTML = '<div class="empty-state"><i class="fas fa-film" style="font-size: 48px; opacity: 0.3;"></i><p>No movies found</p></div>';
    return;
  }
  
  moviesGrid.innerHTML = moviesToRender.map(movie => `
    <div class="movie-card" onclick="openMovieModal(${movie.id})">
      <div class="movie-poster">${movie.emoji}</div>
      <div class="movie-info">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-genre">${movie.genre} • ${movie.year}</div>
        <div class="movie-rating">⭐ ${movie.rating}/5</div>
        <div class="movie-footer">
          <button onclick="event.stopPropagation(); rateMovie(${movie.id})" style="background: #ff6b6b; color: white;">Rate</button>
          <button onclick="event.stopPropagation(); addWatchlist(${movie.id})" style="background: #4ecdc4; color: white;">Save</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Filter movies by search and genre
function filterMovies() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedGenres = Array.from(genreCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  
  allMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
    return matchesSearch && matchesGenre;
  });
  
  renderMovies(allMovies);
  updateRecommendations();
}

// Sort movies
function sortMovies() {
  const sortValue = sortSelect.value;
  
  if (sortValue === 'rating') {
    allMovies.sort((a, b) => b.rating - a.rating);
  } else if (sortValue === 'title') {
    allMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === 'year') {
    allMovies.sort((a, b) => b.year - a.year);
  }
  
  renderMovies(allMovies);
}

// Reset filters
function resetFilters() {
  searchInput.value = '';
  genreCheckboxes.forEach(cb => cb.checked = false);
  sortSelect.value = 'default';
  allMovies = [...movies];
  renderMovies(allMovies);
  updateRecommendations();
}

// Open movie modal
function openMovieModal(movieId) {
  currentMovie = movies.find(m => m.id === movieId);
  if (!currentMovie) return;
  
  document.getElementById('modalTitle').textContent = currentMovie.title;
  document.getElementById('modalYear').textContent = `📅 Year: ${currentMovie.year}`;
  document.getElementById('modalGenre').textContent = `🎬 Genre: ${currentMovie.genre}`;
  document.getElementById('modalDescription').textContent = `⭐ Rating: ${currentMovie.rating}/5 • Watch and rate this movie!`;
  
  // Render star rating
  const starRating = document.getElementById('starRating');
  const savedRatings = JSON.parse(localStorage.getItem('movieRatings'));
  const userRating = savedRatings[movieId] || 0;
  
  starRating.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.className = 'star' + (i <= userRating ? ' active' : '');
    star.innerHTML = '⭐';
    star.onclick = () => saveMovieRating(movieId, i);
    starRating.appendChild(star);
  }
  
  modal.style.display = 'block';
}

// Close modal
function closeModal() {
  modal.style.display = 'none';
  currentMovie = null;
}

// Save movie rating
function saveMovieRating(movieId, rating) {
  const savedRatings = JSON.parse(localStorage.getItem('movieRatings'));
  savedRatings[movieId] = rating;
  localStorage.setItem('movieRatings', JSON.stringify(savedRatings));
  
  // Update stars
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
  
  updateRecommendations();
}

// Add to watchlist
function addWatchlist(movieId) {
  const watchlist = JSON.parse(localStorage.getItem('watchlist'));
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert('Added to watchlist! 🍿');
  } else {
    alert('Already in watchlist!');
  }
}

// AI-Powered Recommendation Algorithm
function getRecommendations() {
  const savedRatings = JSON.parse(localStorage.getItem('movieRatings'));
  
  // If no ratings, return random movies
  if (Object.keys(savedRatings).length === 0) {
    return movies.sort(() => Math.random() - 0.5).slice(0, 3);
  }
  
  const ratedMovies = Object.entries(savedRatings)
    .filter(([_, rating]) => rating >= 4)
    .map(([id, _]) => movies.find(m => m.id === parseInt(id)))
    .filter(m => m);
  
  if (ratedMovies.length === 0) {
    return movies.sort(() => Math.random() - 0.5).slice(0, 3);
  }
  
  // Recommendation algorithm
  const recommendations = new Map();
  
  ratedMovies.forEach(ratedMovie => {
    movies.forEach(candidate => {
      if (Object.keys(savedRatings).includes(String(candidate.id))) return;
      
      let score = 0;
      
      // Same genre = +5 points
      if (candidate.genre === ratedMovie.genre) {
        score += 5;
      }
      
      // Similar rating from algorithm = +3 points
      if (Math.abs(candidate.rating - ratedMovie.rating) < 0.3) {
        score += 3;
      }
      
      // Same genre but different type = +2 points
      if (candidate.genre !== ratedMovie.genre && candidate.rating >= 4) {
        score += 2;
      }
      
      if (score > 0) {
        recommendations.set(candidate.id, (recommendations.get(candidate.id) || 0) + score);
      }
    });
  });
  
  return Array.from(recommendations.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, _]) => movies.find(m => m.id === id));
}

// Update recommendations display
function updateRecommendations() {
  const recommendations = getRecommendations();
  const container = document.getElementById('recommendationsContainer');
  
  container.innerHTML = recommendations.map(movie => `
    <div class="recommendation-item" onclick="openMovieModal(${movie.id})">
      ${movie.emoji} ${movie.title}
    </div>
  `).join('');
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  updateRecommendations();
}
