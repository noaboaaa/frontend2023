import { loadAlbums, loadTracks, loadArtists } from "./data.js";
import { performSearch } from "./search.js";
import { initFormEventListeners } from "./forms.js";

// Initialize application by loading data
document.addEventListener("DOMContentLoaded", () => {
  loadAlbums();
  loadTracks();
  loadArtists();
   initFormEventListeners();
});


// Set up search functionality
document
  .getElementById("search-button")
  .addEventListener("click", performSearch);


