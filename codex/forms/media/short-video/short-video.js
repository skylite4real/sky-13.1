document.addEventListener("DOMContentLoaded", function() {
    function displayShort(input) {
        const file = input.files[0]; // Get the selected file
        const displayBox = document.getElementById('ShortBox'); // Display container
        const closeIcon = document.querySelector('.short-video-close-icon'); // Close icon
        const previewButton = document.getElementById('shortvideoPreviewButton'); // Preview button

        // Clear any existing Video.js player instance for short video
        if (videojs.getPlayer('short-video-player')) {
            videojs.getPlayer('short-video-player').dispose();
        }

        // Check if the file is a supported video type
        const supportedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        if (file && supportedTypes.includes(file.type)) { // Ensure it's a supported video file
            const videoElementId = 'short-video-player';
            displayBox.innerHTML = `
                <video id="${videoElementId}" class="video-js short-video-js vjs-default-skin" controls preload="auto" data-setup='{}'>
                </video>`;

            // Initialize Video.js player with the selected video
            const player = videojs(videoElementId, {
                fluid: true, // Make the player responsive
            });
            player.src({ type: file.type, src: URL.createObjectURL(file) });

            // Store the file source URL for preview
            previewButton.dataset.videoSrc = URL.createObjectURL(file);

            // Dynamically adjust the aspect ratio based on the video's actual dimensions
            player.ready(function () {
                const width = player.videoWidth();
                const height = player.videoHeight();
                const aspectRatio = width / height;

                // Remove any previous aspect ratio classes
                displayBox.classList.remove('display-aspect-9-16', 'display-aspect-4-3', 'display-aspect-1-1', 'display-aspect-2-1', 'display-aspect-21-9');
                
                // Apply the correct class based on the aspect ratio
                if (aspectRatio > 2.3) {
                    displayBox.classList.add('display-aspect-21-9');
                } else if (aspectRatio > 1.8) {
                    displayBox.classList.add('display-aspect-2-1');
                } else if (aspectRatio > 1.3) {
                    displayBox.classList.add('display-aspect-16-9');
                } else if (aspectRatio > 1.0) {
                    displayBox.classList.add('display-aspect-4-3');
                } else {
                    displayBox.classList.add('display-aspect-1-1');
                }

                // Ensure the close icon is added and visible
                closeIcon.style.display = 'block';
                displayBox.appendChild(closeIcon);
            });

        } else {
            alert('Please select a valid video file (MP4, WebM, or Ogg).');
        }
    }

    function clearShortVideo() {
        const displayBox = document.getElementById('ShortBox');
        const closeIcon = document.querySelector('.short-video-close-icon');
        const previewButton = document.getElementById('shortvideoPreviewButton');

        // Reset the display box content to the initial state
        displayBox.innerHTML = `
            <input type="file" id="shortFile" accept="video/*" style="display: none;" onchange="displayShort(this)">
            <div class="choose-short-video-button" onclick="document.getElementById('shortFile').click();">
                <i class="fa-solid fa-clapperboard shorts-upload-icon"></i>
                <span class="shot-video-blue-text">Choose Short Video</span>
            </div>`;
        
        // Hide the close icon
        closeIcon.style.display = 'none';

        // Reattach the close icon to the display box to ensure it works with the next video selection
        displayBox.appendChild(closeIcon);
    }

    function previewShortVideo() {
        const previewBox = document.getElementById('previewBoxShort');
        const previewElement = document.getElementById('shortPreview');
        const previewButton = document.getElementById('shortvideoPreviewButton');
        const closePreviewButton = document.getElementById('closePreviewButtonShort');

        // Clear any existing Video.js player instance for preview video
        if (videojs.getPlayer('short-preview-video-player')) {
            videojs.getPlayer('short-preview-video-player').dispose();
        }

        // Check if a video source is available
        const videoSrc = previewButton.dataset.videoSrc;
        if (videoSrc) {
            const videoElementId = 'short-preview-video-player';
            previewElement.innerHTML = `
                <video id="${videoElementId}" class="video-js short-video-js vjs-default-skin" controls preload="auto" data-setup='{}'>
                </video>`;

            // Initialize Video.js player for preview with the selected video
            const player = videojs(videoElementId, {
                fluid: true, // Make the player responsive
            });
            player.src({ type: 'video/mp4', src: videoSrc });

            // Display the preview box and close button
            previewBox.style.display = 'block';
            closePreviewButton.style.display = 'block';

            // Hide the preview button
            previewButton.style.display = 'none';
        } else {
            alert('No video selected for preview.');
        }
    }

    function closePreviewShort() {
        const previewBox = document.getElementById('previewBoxShort');
        const previewElement = document.getElementById('shortPreview');
        const previewButton = document.getElementById('shortvideoPreviewButton');
        const closePreviewButton = document.getElementById('closePreviewButtonShort');

        // Hide the preview box and close button
        previewBox.style.display = 'none';
        closePreviewButton.style.display = 'none';

        // Clear the preview content
        previewElement.innerHTML = '';

        // Show the preview button again when the preview is closed
        previewButton.style.display = 'block';
    }

    // Ensure the functions are globally accessible
    window.displayShort = displayShort;
    window.clearShortVideo = clearShortVideo;
    window.previewShortVideo = previewShortVideo;
    window.closePreviewShort = closePreviewShort;
});
