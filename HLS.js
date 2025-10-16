async function loadStream(channelId) {
    try {
        // Fetch stream URL
        const streamResponse = await fetch(`${API_BASE_URL}/stream/${channelId}`);
        const streamData = await streamResponse.json();

        // Fetch EPG data
        const epgResponse = await fetch(`${API_BASE_URL}/epg/${channelId}`);
        const epgData = await epgResponse.json();

        // Set stream URL to the player
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamData.url);
            hls.attachMedia(streamPlayer);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                streamPlayer.play();
            });
        } else if (streamPlayer.canPlayType('application/vnd.apple.mpegurl')) {
            streamPlayer.src = streamData.url;
            streamPlayer.load();
            streamPlayer.play();
        }

        // Display EPG data
        displayEpg(epgData);
    } catch (error) {
        console.error('Error loading stream or EPG:', error);
        streamPlayer.src = '';
        streamPlayer.load();
        epgDataDiv.innerHTML = '<p>Error loading EPG data.</p>';
    }
}