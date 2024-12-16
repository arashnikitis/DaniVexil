// Get elements
const playPauseButton = document.getElementById('playPauseButton');
const playIcon = document.getElementById('playIcon');
const audioPlayer = document.getElementById('audioPlayer');
const volumeControl = document.getElementById('volume');
const progressBar = document.getElementById('progressBar');
const songSelect = document.getElementById('songSelect');
const songImage = document.getElementById('songImage');

// Play/Pause Button
playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.textContent = '⏸️'; // Change icon to pause
    } else {
        audioPlayer.pause();
        playIcon.textContent = '▶️'; // Change icon to play
    }
});

// Change song when selecting a new one
songSelect.addEventListener('change', () => {
    const selectedSong = songSelect.value;
    audioPlayer.src = selectedSong;
    audioPlayer.play();
});

// Volume Control
volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value / 100;
});

// Update progress bar as music plays
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
});

// Seek music when clicking on progress bar
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

// Image rotation while music is playing
audioPlayer.addEventListener('play', () => {
    songImage.style.animation = 'spin 10s linear infinite';  // Start rotation when playing
});

audioPlayer.addEventListener('pause', () => {
    songImage.style.animation = '';  // Stop rotation when paused
});

// Add CSS animation for spinning the image
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`, styleSheet.cssRules.length);

// Handle ring navigation effect on mouse move
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const itemRect = item.getBoundingClientRect();
        const offsetX = e.clientX - itemRect.left;
        const offsetY = e.clientY - itemRect.top;
        const centerX = itemRect.width / 2;
        const centerY = itemRect.height / 2;
        const deltaX = offsetX - centerX;
        const deltaY = offsetY - centerY;

        const rotateX = deltaY / centerY * 10; // Rotate X axis
        const rotateY = -deltaX / centerX * 10; // Rotate Y axis

        item.style.transform = `scale(1.2) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)'; // Reset the transform when mouse leaves
    });
});

// Function to change the song and update the image
function changeSong() {
    const songSelect = document.getElementById('songSelect');
    const selectedOption = songSelect.options[songSelect.selectedIndex];
    const songImage = document.getElementById('songImage');
    const audioPlayer = document.getElementById('audioPlayer');
    
    // Change the song source
    audioPlayer.src = selectedOption.value;
    
    // Change the song image
    const newImage = selectedOption.getAttribute('data-image');
    songImage.src = newImage;
    
    // Play the new song
    audioPlayer.play();
}
