import { loadAlbums, loadArtists, loadTracks } from "./data.js";

// Function to open a modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
  }
}

// Function to close a modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

// Function to handle form submission for artists and albums
function handleFormSubmission(event, modalId, apiUrl, reloadFunction) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
      closeModal(modalId);
      reloadFunction(); // Reload the list to show the new data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to handle form submission for adding a new track
function handleAddTrackFormSubmission(event) {
  event.preventDefault();
  const trackName = document.getElementById("track-name").value;
  const trackDuration = document.getElementById("track-duration").value;

  const trackData = {
    trackName: trackName,
    duration: trackDuration,
  };

  fetch("https://nkrmusic-backend.azurewebsites.net/tracks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trackData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Track added:", data);
      closeModal("add-track-modal");
      loadTracks(); // Reload the tracks list to show the new track
    })
    .catch((error) => {
      console.error("Error adding track:", error);
    });
}

// Function to initialize form event listeners
export function initFormEventListeners() {
  // Artist Form
  document
    .getElementById("add-artist-button")
    .addEventListener("click", () => openModal("add-artist-modal"));
  document
    .querySelector("#add-artist-modal .close-button")
    .addEventListener("click", () => closeModal("add-artist-modal"));
  document
    .getElementById("add-artist-form")
    .addEventListener("submit", (e) =>
      handleFormSubmission(
        e,
        "add-artist-modal",
        "https://nkrmusic-backend.azurewebsites.net/artists",
        loadArtists
      )
    );

  // Album Form
  document
    .getElementById("add-album-button")
    .addEventListener("click", () => openModal("add-album-modal"));
  document
    .querySelector("#add-album-modal .close-button")
    .addEventListener("click", () => closeModal("add-album-modal"));
  document
    .getElementById("add-album-form")
    .addEventListener("submit", (e) =>
      handleFormSubmission(
        e,
        "add-album-modal",
        "https://nkrmusic-backend.azurewebsites.net/albums",
        loadAlbums
      )
    );

  // Track Form
  document
    .getElementById("add-track-button")
    .addEventListener("click", () => openModal("add-track-modal"));
  document
    .querySelector("#add-track-modal .close-button")
    .addEventListener("click", () => closeModal("add-track-modal"));
  document
    .getElementById("add-track-form")
    .addEventListener("submit", handleAddTrackFormSubmission);
}

// Close modal if clicked outside of it
window.addEventListener("click", function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
