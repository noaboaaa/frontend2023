import { displayArtists, displayAlbums, displayTracks } from "./data.js";

export function performSearch() {
  const searchTerm = document.getElementById("search-input").value.trim();
  if (!searchTerm) {
    alert("Please enter a search term.");
    return;
  }

  searchArtists(searchTerm);
  searchAlbums(searchTerm);
  searchTracks(searchTerm);
}

function searchArtists(searchTerm) {
  fetch(
    `http://localhost:4000/artists/search?q=${encodeURIComponent(searchTerm)}`
  )
    .then((response) => response.json())
    .then((artists) => displayArtists(artists))
    .catch((error) =>
      console.error("Error fetching artist search results:", error)
    );
}

function searchAlbums(searchTerm) {
  fetch(
    `http://localhost:4000/albums/search?q=${encodeURIComponent(searchTerm)}`
  )
    .then((response) => response.json())
    .then((albums) => displayAlbums(albums))
    .catch((error) =>
      console.error("Error fetching album search results:", error)
    );
}

function searchTracks(searchTerm) {
  fetch(
    `http://localhost:4000/tracks/search?q=${encodeURIComponent(searchTerm)}`
  )
    .then((response) => response.json())
    .then((tracks) => displayTracks(tracks))
    .catch((error) =>
      console.error("Error fetching track search results:", error)
    );
}
