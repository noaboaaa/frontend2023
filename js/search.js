import { displayArtists, displayAlbums, displayTracks } from "./data.js";

// Function to perform the search
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
    .then((artists) => {
      // Assuming displayArtists function can handle artists with their albums and tracks
      displayArtists(artists);
    })
    .catch((error) =>
      console.error("Error fetching artist search results:", error)
    );
}

function searchAlbums(searchTerm) {
  fetch(`http://localhost:4000/albums/search?q=${encodeURIComponent(searchTerm)}`)
    .then((response) => response.json())
    .then((albums) => {
      displayAlbums(albums);
    })
    .catch((error) =>
      console.error("Error fetching album search results:", error)
    );
}


function searchTracks(searchTerm) {
  fetch(`http://localhost:4000/tracks/search?q=${encodeURIComponent(searchTerm)}`)
    .then((response) => response.json())
    .then((tracks) => {
      displayTracks(tracks);
    })
    .catch((error) =>
      console.error("Error fetching track search results:", error)
    );
}


export function displayArtistSearchResults(artists) {
  const artistsList = document.getElementById("artists-list");
  artistsList.innerHTML = ""; // Clear current list

  artists.forEach((artist) => {
    const artistDiv = document.createElement("div");
    artistDiv.className = "artist";
    artistDiv.innerHTML = `<h3>${artist.name}</h3>`;

    // Add albums
    const albumsList = document.createElement("ul");
    artist.albums.forEach((album) => {
      const albumItem = document.createElement("li");
      albumItem.textContent = album.title;
      albumsList.appendChild(albumItem);
    });
    artistDiv.appendChild(albumsList);

    // Add tracks
    const tracksList = document.createElement("ul");
    artist.tracks.forEach((track) => {
      const trackItem = document.createElement("li");
      trackItem.textContent = track.trackName;
      tracksList.appendChild(trackItem);
    });
    artistDiv.appendChild(tracksList);

    artistsList.appendChild(artistDiv);
  });
}
