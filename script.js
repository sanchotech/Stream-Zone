const API_BASE_URL = 'http://localhost:3000/api/v1'; // Adjust if your backend is running elsewhere
const channelListDiv = document.getElementById('channel-list');
const epgDataDiv = document.getElementById('epg-data');
const streamPlayer = document.getElementById('stream-player');

// Function to fetch channels from the API
async function fetchChannels() {
    try {
        const response = await fetch(`${API_BASE_URL}/channels`);
        const data = await response.json();
        displayChannels(data.data);
    } catch (error) {
        console.error('Error fetching channels:', error);
        channelListDiv.innerHTML = '<p>Error loading channels.</p>';
    }
}

// Function to display channels in the HTML
function displayChannels(channels) {
    channelListDiv.innerHTML = ''; // Clear existing content
    channels.forEach(channel => {
        const channelDiv = document.createElement('div');
        channelDiv.classList.add('channel-item');
        channelDiv.innerHTML = `
            <img src="${channel.logo}" alt="${channel.name}">
            <p>${channel.name}</p>
        `;
        channelDiv.addEventListener('click', () => loadStream(channel.id));
        channelListDiv.appendChild(channelDiv);
    });
}

// Function to load a stream and EPG data
async function loadStream(channelId) {
    try {
        // Fetch stream URL
        const streamResponse = await fetch(`${API_BASE_URL}/stream/${channelId}`);
        const streamData = await streamResponse.json();

        // Fetch EPG data
        const epgResponse = await fetch(`${API_BASE_URL}/epg/${channelId}`);
        const epgData = await epgResponse.json();

        // Set stream URL to the player
        streamPlayer.src = streamData.url;
        streamPlayer.load();
        streamPlayer.play();

        // Display EPG data
        displayEpg(epgData);
    } catch (error) {
        console.error('Error loading stream or EPG:', error);
        streamPlayer.src = '';
        streamPlayer.load();
        epgDataDiv.innerHTML = '<p>Error loading EPG data.</p>';
    }
}

// Function to display EPG data in the HTML
function displayEpg(epgData) {
    epgDataDiv.innerHTML = '<ul>'; // Clear existing content
    if (epgData && epgData.programs) {
        epgData.programs.forEach(program => {
            const programItem = document.createElement('li');
            programItem.innerHTML = `
                <strong>${program.title}</strong><br>
                ${program.desc}
            `;
            epgDataDiv.querySelector('ul').appendChild(programItem);
        });
        epgDataDiv.innerHTML += '</ul>';
    } else {
        epgDataDiv.innerHTML = '<p>No EPG data available.</p>';
    }
}

// Load channels when the page loads
window.onload = fetchChannels;