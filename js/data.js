export function loadAlbums() {
  fetch("http://localhost:4000/albums") // Adjust the URL as needed
    .then((response) => response.json())
    .then((albums) => displayAlbums(albums))
    .catch((error) => console.error("Error fetching albums:", error));
}

export function displayAlbums(albums) {
  
  const albumsList = document.getElementById("albums-list");
  albumsList.innerHTML = ""; // Clear existing content

  albums.forEach((album) => {
    const albumDiv = document.createElement("div");
    albumDiv.className = "album";

    // Create and append the album title
    const title = document.createElement("h3");
    title.textContent = `${album.title} (${album.releaseYear})`;
    albumDiv.appendChild(title);

    // Create and append the album cover image
    const image = document.createElement("img");
    image.src = album.coverImageUrl;
    image.alt = `Cover of ${album.title}`;
    albumDiv.appendChild(image);

    // Create and append the artist name(s)
    if (album.artistNames) {
      const artists = document.createElement("p");
      artists.textContent = `Artist(s): ${album.artistNames}`;
      albumDiv.appendChild(artists);
    }

    // Append the complete album div to the albums list
    albumsList.appendChild(albumDiv);
  });
}



// album modal stuff
function openModal(albumId) {
  fetch(`http://localhost:4000/albums/${albumId}/tracks`) // Adjust the URL as needed
    .then((response) => response.json())
    .then((tracks) => {
      displayTracksInModal(tracks, albumId);
      document.getElementById("album-modal").style.display = "block";
    })
    .catch((error) => console.error("Error fetching tracks:", error));
}

function displayTracksInModal(tracks, albumId) {
  const modalTrackList = document.getElementById("modal-track-list");
  modalTrackList.innerHTML = ""; // Clear existing content

  tracks.forEach((track) => {
    const li = document.createElement("li");
    li.textContent = `Track ${track.track_position}: ${track.trackName} - Duration: ${track.duration}`;
    modalTrackList.appendChild(li);
  });

  // Optional: Set the album title in the modal
  document.getElementById(
    "modal-album-title"
  ).textContent = `Tracks for Album ID: ${albumId}`;
}
// Event listener for closing the modal
document.querySelector(".close-button").addEventListener("click", () => {
  document.getElementById("album-modal").style.display = "none";
});



// tracks

export function loadTracks() {
  fetch("http://localhost:4000/tracks") // Adjust the URL to your server
    .then((response) => response.json())
    .then((tracks) => displayTracks(tracks))
    .catch((error) => console.error("Error fetching tracks:", error));
}

export function displayTracks(tracks) {
  const tracksList = document.getElementById("tracks-list");
  tracksList.innerHTML = "";

  tracks.forEach((track) => {
    const trackDiv = document.createElement("div");
    trackDiv.className = "track"; // Add a class for styling

    const trackName = document.createElement("h3");
    trackName.textContent = track.trackName; // Display track name
    trackDiv.appendChild(trackName);

    // Display artist names if available
    if (track.artistNames) {
      const byArtist = document.createElement("p");
      byArtist.textContent = `by ${track.artistNames}`;
      trackDiv.appendChild(byArtist);
    }

    tracksList.appendChild(trackDiv);
  });
}

// artists
export function loadArtists() {
  fetch("http://localhost:4000/artists") // Adjust the URL as needed
    .then((response) => response.json())
    .then((artists) => displayArtists(artists))
    .catch((error) => console.error("Error fetching artists:", error));
}

export function displayArtists(artists) {
  const artistsList = document.getElementById("artists-list");
  artistsList.innerHTML = "";

  artists.forEach((artist) => {
    const artistDiv = document.createElement("div");
    artistDiv.className = "artist"; // Add a class for styling

    const image = document.createElement("img");
    image.src = artist.imageUrl;
    image.alt = `Image of ${artist.name}`;
    artistDiv.appendChild(image);

    const name = document.createElement("h3");
    name.textContent = artist.name; // Display artist name
    artistDiv.appendChild(name);

    artistsList.appendChild(artistDiv);
  });
}
