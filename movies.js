const movies = [
  // Bollywood Movies
  { id: 1, title: 'Dil Chahta Hai', genre: 'Bollywood', year: 2001, rating: 4.2, emoji: '😘' },
  { id: 2, title: '3 Idiots', genre: 'Bollywood', year: 2009, rating: 4.4, emoji: '🎓' },
  { id: 3, title: 'Dangal', genre: 'Bollywood', year: 2016, rating: 4.5, emoji: '💪' },
  { id: 4, title: 'Gully Boy', genre: 'Bollywood', year: 2019, rating: 4.0, emoji: '🎤' },
  { id: 5, title: 'Baahubali', genre: 'Bollywood', year: 2015, rating: 4.3, emoji: '⚔️' },
  { id: 6, title: 'Kabali', genre: 'Bollywood', year: 2016, rating: 4.1, emoji: '🔥' },
  { id: 7, title: 'Padmaavat', genre: 'Bollywood', year: 2018, rating: 4.2, emoji: '👑' },
  { id: 8, title: 'Dilwale Dulhania Le Jayenge', genre: 'Bollywood', year: 1995, rating: 4.3, emoji: '🚂' },
  { id: 9, title: 'Rang De Basanti', genre: 'Bollywood', year: 2006, rating: 4.4, emoji: '🇮🇳' },
  { id: 10, title: 'Shah Rukh Khan Ki Jaan', genre: 'Bollywood', year: 2021, rating: 3.9, emoji: '❤️' },
  
  // Hollywood Movies
  { id: 11, title: 'Inception', genre: 'Hollywood', year: 2010, rating: 4.6, emoji: '💭' },
  { id: 12, title: 'The Dark Knight', genre: 'Hollywood', year: 2008, rating: 4.7, emoji: '🦇' },
  { id: 13, title: 'Forrest Gump', genre: 'Hollywood', year: 1994, rating: 4.5, emoji: '🏃' },
  { id: 14, title: 'Avatar', genre: 'Hollywood', year: 2009, rating: 4.4, emoji: '🌎' },
  { id: 15, title: 'Interstellar', genre: 'Hollywood', year: 2014, rating: 4.6, emoji: '🌌' },
  { id: 16, title: 'The Shawshank Redemption', genre: 'Hollywood', year: 1994, rating: 4.8, emoji: '🔓' },
  { id: 17, title: 'Pulp Fiction', genre: 'Hollywood', year: 1994, rating: 4.5, emoji: '🎬' },
  { id: 18, title: 'The Matrix', genre: 'Hollywood', year: 1999, rating: 4.6, emoji: '💊' },
  { id: 19, title: 'Fight Club', genre: 'Hollywood', year: 1999, rating: 4.5, emoji: '👊' },
  { id: 20, title: 'Titanic', genre: 'Hollywood', year: 1997, rating: 4.3, emoji: '🚢' },
  
  // Action Movies
  { id: 21, title: 'John Wick', genre: 'Action', year: 2014, rating: 4.4, emoji: '🔫' },
  { id: 22, title: 'Die Hard', genre: 'Action', year: 1988, rating: 4.5, emoji: '💣' },
  { id: 23, title: 'Mad Max: Fury Road', genre: 'Action', year: 2015, rating: 4.6, emoji: '🏎️' },
  { id: 24, title: 'Mission Impossible', genre: 'Action', year: 1996, rating: 4.2, emoji: '🚁' },
  { id: 25, title: 'Top Gun', genre: 'Action', year: 1986, rating: 4.3, emoji: '✈️' },
  
  // Comedy Movies
  { id: 26, title: 'The Grand Budapest Hotel', genre: 'Comedy', year: 2014, rating: 4.3, emoji: '🎪' },
  { id: 27, title: 'Superbad', genre: 'Comedy', year: 2007, rating: 4.4, emoji: '😂' },
  { id: 28, title: 'The Hangover', genre: 'Comedy', year: 2009, rating: 4.2, emoji: '🍺' },
  { id: 29, title: 'Deadpool', genre: 'Comedy', year: 2016, rating: 4.3, emoji: '🔴' },
  { id: 30, title: 'Tropic Thunder', genre: 'Comedy', year: 2008, rating: 4.2, emoji: '🎥' },
  
  // Drama Movies
  { id: 31, title: 'The Irishman', genre: 'Drama', year: 2019, rating: 4.4, emoji: '🚗' },
  { id: 32, title: 'Once Upon a Time in America', genre: 'Drama', year: 1984, rating: 4.5, emoji: '🌃' },
  { id: 33, title: 'Parasite', genre: 'Drama', year: 2019, rating: 4.6, emoji: '👨‍👩‍👧‍👦' },
  { id: 34, title: 'Moonlight', genre: 'Drama', year: 2016, rating: 4.3, emoji: '🌙' },
  { id: 35, title: 'The Green Mile', genre: 'Drama', year: 1999, rating: 4.5, emoji: '💚' },
  
  // Romance Movies
  { id: 36, title: 'La La Land', genre: 'Romance', year: 2016, rating: 4.3, emoji: '💕' },
  { id: 37, title: 'Pride and Prejudice', genre: 'Romance', year: 2005, rating: 4.2, emoji: '💍' },
  { id: 38, title: 'Notting Hill', genre: 'Romance', year: 1999, rating: 4.1, emoji: '🏠' },
  { id: 39, title: 'The Notebook', genre: 'Romance', year: 2004, rating: 4.2, emoji: '📔' },
  { id: 40, title: 'Breakfast at Tiffanys', genre: 'Romance', year: 1961, rating: 4.2, emoji: '☕' },
  
  // Thriller Movies
  { id: 41, title: 'Shutter Island', genre: 'Thriller', year: 2010, rating: 4.4, emoji: '🏝️' },
  { id: 42, title: 'Se7en', genre: 'Thriller', year: 1995, rating: 4.6, emoji: '🔍' },
  { id: 43, title: 'The Sixth Sense', genre: 'Thriller', year: 1999, rating: 4.4, emoji: '👻' },
  { id: 44, title: 'Gone Girl', genre: 'Thriller', year: 2014, rating: 4.3, emoji: '🕵️' },
  { id: 45, title: 'Psycho', genre: 'Thriller', year: 1960, rating: 4.5, emoji: '🔪' },
  
  // Horror Movies
  { id: 46, title: 'The Exorcist', genre: 'Horror', year: 1973, rating: 4.5, emoji: '😱' },
  { id: 47, title: 'The Shining', genre: 'Horror', year: 1980, rating: 4.4, emoji: '🏨' },
  { id: 48, title: 'It', genre: 'Horror', year: 2017, rating: 4.2, emoji: '🎈' },
  { id: 49, title: 'A Nightmare on Elm Street', genre: 'Horror', year: 1984, rating: 4.2, emoji: '😴' },
  { id: 50, title: 'The Conjuring', genre: 'Horror', year: 2013, rating: 4.3, emoji: '👹' }
];

// Store initial ratings in localStorage
if (!localStorage.getItem('movieRatings')) {
  localStorage.setItem('movieRatings', JSON.stringify({}));
}

if (!localStorage.getItem('watchlist')) {
  localStorage.setItem('watchlist', JSON.stringify([]));
}
