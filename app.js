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
  startAutoUpdate();
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

// Render movies to grid with BEAUTIFUL POSTERS
function renderMovies(moviesToRender) {
  const moviesGrid = document.getElementById('moviesGrid');
  
  if (moviesToRender.length === 0) {
    moviesGrid.innerHTML = '<div class="empty-state"><i class="fas fa-film"></i><p>No movies found</p></div>';
    return;
  }
  
  moviesGrid.innerHTML = moviesToRender.map(movie => `
    <div class="movie-card" onclick="openMovieModal(${movie.id})">
      <div class="movie-poster" style="background: ${movie.poster};">  
        <div style="font-size: 80px; opacity: 0.7;">${movie.emoji || '🎬'}</div>
      </div>
      <div class="movie-info">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-genre">${movie.genre} • ${movie.year}</div>
        <div class="movie-rating">⭐ ${movie.rating}/5</div>
        <div class="movie-footer">
          <button onclick="event.stopPropagation(); openMovieModal(${movie.id})" style="background: #ff6b6b; color: white;">Rate</button>
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
  document.getElementById('modalYear').textContent = `📅 ${currentMovie.year}`;
  document.getElementById('modalGenre').textContent = `🎬 ${currentMovie.genre}`;
  document.getElementById('modalDescription').textContent = `A ${currentMovie.genre} film with rating ⭐ ${currentMovie.rating}/5`;
  
  // Set poster with gradient
  const modalPoster = document.getElementById('modalPoster');
  modalPoster.style.background = currentMovie.poster;
  modalPoster.style.display = 'flex';
  modalPoster.style.alignItems = 'center';
  modalPoster.style.justifyContent = 'center';
  modalPoster.textContent = currentMovie.emoji || '🎬';
  modalPoster.style.fontSize = '120px';
  modalPoster.style.opacity = '0.8';
  
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
    alert('✅ Added to watchlist! 🍿');
  } else {
    alert('Already in watchlist!');
  }
}

// AI-Powered Recommendation Algorithm
function getRecommendations() {
  const savedRatings = JSON.parse(localStorage.getItem('movieRatings'));
  
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
  
  const recommendations = new Map();
  
  ratedMovies.forEach(ratedMovie => {
    movies.forEach(candidate => {
      if (Object.keys(savedRatings).includes(String(candidate.id))) return;
      
      let score = 0;
      if (candidate.genre === ratedMovie.genre) score += 5;
      if (Math.abs(candidate.rating - ratedMovie.rating) < 0.3) score += 3;
      if (candidate.genre !== ratedMovie.genre && candidate.rating >= 4) score += 2;
      
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
    <div class="recommendation-item" onclick="openMovieModal(${movie.id})" style="background: ${movie.poster || '#f0f0f0'}; color: white; font-weight: bold;">
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

// Auto-update system - checks for updates every hour
function startAutoUpdate() {
  // Check for movie updates
  setInterval(() => {
    const lastCheck = localStorage.getItem('lastMoviesCheck') || 0;
    const now = new Date().getTime();
    
    // Update every 24 hours
    if (now - lastCheck > 86400000) {
      localStorage.setItem('lastMoviesCheck', now);
      // Re-initialize recommendations cache
      updateRecommendations();
      console.log('✅ Movies cache updated!');
    }
  }, 3600000); // Check every hour
}

// Rate movie from card button
function rateMovie(movieId) {
  openMovieModal(movieId);
}
