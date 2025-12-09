const movies = [
  // Bollywood
  { id: 1, title: 'Dil Chahta Hai', genre: 'Bollywood', year: 2001, rating: 4.2, poster: 'linear-gradient(135deg, #FF6B6B, #FF8E72)', color: '#FF6B6B' },
  { id: 2, title: '3 Idiots', genre: 'Bollywood', year: 2009, rating: 4.4, poster: 'linear-gradient(135deg, #4ECDC4, #44A08D)', color: '#4ECDC4' },
  { id: 3, title: 'Dangal', genre: 'Bollywood', year: 2016, rating: 4.5, poster: 'linear-gradient(135deg, #F093FB, #F5576C)', color: '#F5576C' },
  { id: 4, title: 'Gully Boy', genre: 'Bollywood', year: 2019, rating: 4.0, poster: 'linear-gradient(135deg, #4158D0, #C850C0)', color: '#C850C0' },
  { id: 5, title: 'Baahubali', genre: 'Bollywood', year: 2015, rating: 4.3, poster: 'linear-gradient(135deg, #FA709A, #FEE140)', color: '#FA709A' },
  { id: 6, title: 'Kabali', genre: 'Bollywood', year: 2016, rating: 4.1, poster: 'linear-gradient(135deg, #FFA502, #FFD89B)', color: '#FFA502' },
  { id: 7, title: 'Padmaavat', genre: 'Bollywood', year: 2018, rating: 4.2, poster: 'linear-gradient(135deg, #A8EDEA, #FED6E3)', color: '#A8EDEA' },
  { id: 8, title: 'DDLJ', genre: 'Bollywood', year: 1995, rating: 4.3, poster: 'linear-gradient(135deg, #FF9A56, #FF6A88)', color: '#FF9A56' },
  { id: 9, title: 'Rang De Basanti', genre: 'Bollywood', year: 2006, rating: 4.4, poster: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#667eea' },
  { id: 10, title: 'Shah Rukh Khan Ki Jaan', genre: 'Bollywood', year: 2021, rating: 3.9, poster: 'linear-gradient(135deg, #f093fb, #f5576c)', color: '#f5576c' },
  
  // Hollywood
  { id: 11, title: 'Inception', genre: 'Hollywood', year: 2010, rating: 4.6, poster: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#667eea' },
  { id: 12, title: 'The Dark Knight', genre: 'Hollywood', year: 2008, rating: 4.7, poster: 'linear-gradient(135deg, #0f0c29, #302b63)', color: '#302b63' },
  { id: 13, title: 'Forrest Gump', genre: 'Hollywood', year: 1994, rating: 4.5, poster: 'linear-gradient(135deg, #ffecd2, #fcb69f)', color: '#fcb69f' },
  { id: 14, title: 'Avatar', genre: 'Hollywood', year: 2009, rating: 4.4, poster: 'linear-gradient(135deg, #00d4ff, #0099ff)', color: '#0099ff' },
  { id: 15, title: 'Interstellar', genre: 'Hollywood', year: 2014, rating: 4.6, poster: 'linear-gradient(135deg, #1a237e, #283593)', color: '#1a237e' },
  { id: 16, title: 'The Shawshank Redemption', genre: 'Hollywood', year: 1994, rating: 4.8, poster: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', color: '#c3cfe2' },
  { id: 17, title: 'Pulp Fiction', genre: 'Hollywood', year: 1994, rating: 4.5, poster: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#667eea' },
  { id: 18, title: 'The Matrix', genre: 'Hollywood', year: 1999, rating: 4.6, poster: 'linear-gradient(135deg, #0a0e27, #23074d)', color: '#0a0e27' },
  { id: 19, title: 'Fight Club', genre: 'Hollywood', year: 1999, rating: 4.5, poster: 'linear-gradient(135deg, #fa4b4b, #fdb835)', color: '#fdb835' },
  { id: 20, title: 'Titanic', genre: 'Hollywood', year: 1997, rating: 4.3, poster: 'linear-gradient(135deg, #2e2e2e, #1c92d2)', color: '#1c92d2' },
  
  // Action
  { id: 21, title: 'John Wick', genre: 'Action', year: 2014, rating: 4.4, poster: 'linear-gradient(135deg, #1a1a1a, #434343)', color: '#434343' },
  { id: 22, title: 'Die Hard', genre: 'Action', year: 1988, rating: 4.5, poster: 'linear-gradient(135deg, #ff6b35, #f7931e)', color: '#f7931e' },
  { id: 23, title: 'Mad Max: Fury Road', genre: 'Action', year: 2015, rating: 4.6, poster: 'linear-gradient(135deg, #d32f2f, #ff6f00)', color: '#ff6f00' },
  { id: 24, title: 'Mission Impossible', genre: 'Action', year: 1996, rating: 4.2, poster: 'linear-gradient(135deg, #1c3c3c, #2d5016)', color: '#2d5016' },
  { id: 25, title: 'Top Gun', genre: 'Action', year: 1986, rating: 4.3, poster: 'linear-gradient(135deg, #0093E9, #80D0C7)', color: '#80D0C7' },
  
  // Comedy
  { id: 26, title: 'The Grand Budapest Hotel', genre: 'Comedy', year: 2014, rating: 4.3, poster: 'linear-gradient(135deg, #fa709a, #fee140)', color: '#fee140' },
  { id: 27, title: 'Superbad', genre: 'Comedy', year: 2007, rating: 4.4, poster: 'linear-gradient(135deg, #f5f5f5, #f9f9f9)', color: '#f9f9f9' },
  { id: 28, title: 'The Hangover', genre: 'Comedy', year: 2009, rating: 4.2, poster: 'linear-gradient(135deg, #ffd700, #ffed4e)', color: '#ffed4e' },
  { id: 29, title: 'Deadpool', genre: 'Comedy', year: 2016, rating: 4.3, poster: 'linear-gradient(135deg, #c41e3a, #000000)', color: '#c41e3a' },
  { id: 30, title: 'Tropic Thunder', genre: 'Comedy', year: 2008, rating: 4.2, poster: 'linear-gradient(135deg, #7cb342, #558b2f)', color: '#558b2f' },
  
  // Drama
  { id: 31, title: 'The Irishman', genre: 'Drama', year: 2019, rating: 4.4, poster: 'linear-gradient(135deg, #2c3e50, #34495e)', color: '#34495e' },
  { id: 32, title: 'Once Upon a Time in America', genre: 'Drama', year: 1984, rating: 4.5, poster: 'linear-gradient(135deg, #5e4a2e, #8b7355)', color: '#8b7355' },
  { id: 33, title: 'Parasite', genre: 'Drama', year: 2019, rating: 4.6, poster: 'linear-gradient(135deg, #1a1a1a, #4a4a4a)', color: '#4a4a4a' },
  { id: 34, title: 'Moonlight', genre: 'Drama', year: 2016, rating: 4.3, poster: 'linear-gradient(135deg, #001f3f, #003d82)', color: '#003d82' },
  { id: 35, title: 'The Green Mile', genre: 'Drama', year: 1999, rating: 4.5, poster: 'linear-gradient(135deg, #1b4332, #2d6a4f)', color: '#2d6a4f' },
  
  // Romance
  { id: 36, title: 'La La Land', genre: 'Romance', year: 2016, rating: 4.3, poster: 'linear-gradient(135deg, #ff6b9d, #c44569)', color: '#c44569' },
  { id: 37, title: 'Pride and Prejudice', genre: 'Romance', year: 2005, rating: 4.2, poster: 'linear-gradient(135deg, #f5deb3, #daa520)', color: '#daa520' },
  { id: 38, title: 'Notting Hill', genre: 'Romance', year: 1999, rating: 4.1, poster: 'linear-gradient(135deg, #ffd89b, #ff9a56)', color: '#ff9a56' },
  { id: 39, title: 'The Notebook', genre: 'Romance', year: 2004, rating: 4.2, poster: 'linear-gradient(135deg, #a8edea, #fed6e3)', color: '#fed6e3' },
  { id: 40, title: 'Breakfast at Tiffanys', genre: 'Romance', year: 1961, rating: 4.2, poster: 'linear-gradient(135deg, #000000, #4a4a4a)', color: '#4a4a4a' },
  
  // Thriller
  { id: 41, title: 'Shutter Island', genre: 'Thriller', year: 2010, rating: 4.4, poster: 'linear-gradient(135deg, #1a1a2e, #16213e)', color: '#16213e' },
  { id: 42, title: 'Se7en', genre: 'Thriller', year: 1995, rating: 4.6, poster: 'linear-gradient(135deg, #2d1b2e, #4a1d44)', color: '#4a1d44' },
  { id: 43, title: 'The Sixth Sense', genre: 'Thriller', year: 1999, rating: 4.4, poster: 'linear-gradient(135deg, #1a0033, #330066)', color: '#330066' },
  { id: 44, title: 'Gone Girl', genre: 'Thriller', year: 2014, rating: 4.3, poster: 'linear-gradient(135deg, #3d3d3d, #1a1a1a)', color: '#1a1a1a' },
  { id: 45, title: 'Psycho', genre: 'Thriller', year: 1960, rating: 4.5, poster: 'linear-gradient(135deg, #000000, #1a1a1a)', color: '#1a1a1a' },
  
  // Horror
  { id: 46, title: 'The Exorcist', genre: 'Horror', year: 1973, rating: 4.5, poster: 'linear-gradient(135deg, #0d0221, #1d1b34)', color: '#1d1b34' },
  { id: 47, title: 'The Shining', genre: 'Horror', year: 1980, rating: 4.4, poster: 'linear-gradient(135deg, #2d0d2d, #5d0d5d)', color: '#5d0d5d' },
  { id: 48, title: 'It', genre: 'Horror', year: 2017, rating: 4.2, poster: 'linear-gradient(135deg, #ff6b35, #f7931e)', color: '#f7931e' },
  { id: 49, title: 'A Nightmare on Elm Street', genre: 'Horror', year: 1984, rating: 4.2, poster: 'linear-gradient(135deg, #1a0000, #660000)', color: '#660000' },
  { id: 50, title: 'The Conjuring', genre: 'Horror', year: 2013, rating: 4.3, poster: 'linear-gradient(135deg, #2d1b00, #5d3a00)', color: '#5d3a00' }
];

// Initialize ratings
if (!localStorage.getItem('movieRatings')) {
  localStorage.setItem('movieRatings', JSON.stringify({}));
}

if (!localStorage.getItem('watchlist')) {
  localStorage.setItem('watchlist', JSON.stringify([]));
}

// Auto-update check (for future API integration)
let lastUpdate = localStorage.getItem('lastMoviesUpdate') || new Date().getTime();
setInterval(() => {
  const now = new Date().getTime();
  if (now - lastUpdate > 86400000) { // 24 hours
    lastUpdate = now;
    localStorage.setItem('lastMoviesUpdate', lastUpdate);
    // Future: Fetch updates from server
  }
}, 3600000); // Check every hour
