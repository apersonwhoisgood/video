let videoData = [];
let darkMode = true;

// Upload multiple videos
function uploadVideos() {
    const videoInput = document.getElementById("videoInput");
    const files = Array.from(videoInput.files);

    files.forEach(file => {
        const url = URL.createObjectURL(file);
        const description = prompt("Enter a description for this video:", "My cool video!");

        videoData.push({ url, description });
        createVideoElement(url, description);
    });
}

// Create video element with controls and a delete button
function createVideoElement(src, description) {
    const videoFeed = document.getElementById("videoFeed");

    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-container");

    const videoElement = document.createElement("video");
    videoElement.src = src;
    videoElement.controls = false;
    videoElement.loop = true;
    videoElement.muted = true; // Muted by default

    const videoInfo = document.createElement("div");
    videoInfo.classList.add("video-info");
    videoInfo.textContent = description;

    const videoControls = document.createElement("div");
    videoControls.classList.add("video-controls");

    // Control icons for play/pause and mute/unmute
    const playIcon = document.createElement("span");
    playIcon.classList.add("control-icon");
    playIcon.textContent = "▶";
    playIcon.onclick = () => togglePlay(videoElement, playIcon);

    const muteIcon = document.createElement("span");
    muteIcon.classList.add("control-icon");
    muteIcon.textContent = "🔇";
    muteIcon.onclick = () => toggleMute(videoElement, muteIcon);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteVideo(videoContainer);

    videoControls.appendChild(playIcon);
    videoControls.appendChild(muteIcon);
    videoControls.appendChild(deleteButton);

    videoContainer.appendChild(videoElement);
    videoContainer.appendChild(videoInfo);
    videoContainer.appendChild(videoControls);
    videoFeed.appendChild(videoContainer);

    // Observe the video for autoplay when it comes into view
    observeVideo(videoElement);
}

// Delete video from the page
function deleteVideo(videoContainer) {
    videoContainer.remove();
}

// Toggle play and pause
function togglePlay(video, icon) {
    if (video.paused) {
        video.play();
        icon.textContent = "⏸";
    } else {
        video.pause();
        icon.textContent = "▶";
    }
}

// Toggle mute and unmute
function toggleMute(video, icon) {
    video.muted = !video.muted;
    icon.textContent = video.muted ? "🔇" : "🔊";
}

// Dark/Light mode toggle
function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle("light-mode", !darkMode);
}

// Observe videos for autoplay based on visibility
function observeVideo(video) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 }); // Play when 50% of the video is visible

    observer.observe(video);
}
 