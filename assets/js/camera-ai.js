// Mebieco Camera AI CCTV Control Room Controller

document.addEventListener('DOMContentLoaded', () => {
    const cameraItems = document.querySelectorAll('.camera-item');
    const cctvScreen = document.querySelector('.cctv-screen');
    const video = document.querySelector('.cctv-screen video');
    
    // HUD overlay text elements
    const hudCamId = document.getElementById('hud-cam-id');
    const hudCamName = document.getElementById('hud-cam-name');
    const hudTimestamp = document.getElementById('hud-timestamp');
    
    // Logs feed container
    const logFeed = document.getElementById('log-feed');

    // Camera details mapping
    const cameraDetails = {
        'cam-1': { id: 'CAM_01', name: 'ENTRANCE_GATE_NORTH' },
        'cam-2': { id: 'CAM_02', name: 'MAIN_PROCESSING_LINE_A' },
        'cam-3': { id: 'CAM_03', name: 'WAREHOUSE_CORRIDOR_04' }
    };

    // Tracking logs data pool (simulated)
    const trackedPersons = [
        { id: '1092', flow: 'CAM_01 -> CAM_02', match: '94.6%', isAlert: false },
        { id: '0894', flow: 'CAM_02 -> CAM_03', match: '98.2%', isAlert: false },
        { id: '1184', flow: 'CAM_01 -> CAM_03', match: '91.8%', isAlert: false },
        { id: '0997', flow: 'UNKNOWN_ZONE', match: 'ALERT // UNREGISTERED', isAlert: true },
        { id: '1201', flow: 'CAM_03 -> CAM_02', match: '95.4%', isAlert: false },
        { id: '1092', flow: 'CAM_02 -> CAM_03', match: '96.1%', isAlert: false },
        { id: '1430', flow: 'CAM_01 -> CAM_02', match: '93.5%', isAlert: false },
        { id: '0712', flow: 'CAM_03 -> CAM_01', match: '89.7%', isAlert: false }
    ];

    // Camera feed switcher function
    function switchCamera(cameraKey) {
        if (cctvScreen.classList.contains('switching')) return;

        // Add connecting static noise overlay
        cctvScreen.classList.add('switching');
        
        // Pause current video play
        if (video) video.pause();

        setTimeout(() => {
            // Update HUD elements
            const cam = cameraDetails[cameraKey];
            if (cam) {
                hudCamId.textContent = cam.id;
                hudCamName.textContent = cam.name;
            }

            // Remove static screen
            cctvScreen.classList.remove('switching');

            // Play video from random start point for realistic switch feel
            if (video) {
                const randomTime = Math.random() * (video.duration || 10);
                video.currentTime = randomTime;
                video.play().catch(() => {});
            }

            // Add signal connection log
            appendLog(`SYS_${cam.id}`, `SIGNAL CONNECTED // ${cam.name}`, '99.9%', false);

        }, 600);
    }

    // Append log row helper
    function appendLog(id, desc, match, isAlert) {
        const entry = document.createElement('div');
        entry.className = `log-entry ${isAlert ? 'alert' : ''}`;

        const header = document.createElement('div');
        header.className = 'entry-header';

        const timeSpan = document.createElement('span');
        timeSpan.className = 'entry-time';
        const now = new Date();
        timeSpan.textContent = now.toTimeString().split(' ')[0];

        const idSpan = document.createElement('span');
        idSpan.className = 'entry-id';
        idSpan.textContent = `ID #${id}`;

        header.appendChild(timeSpan);
        header.appendChild(idSpan);

        const body = document.createElement('div');
        body.className = 'entry-desc';
        body.innerHTML = `${desc} - MATCH: <span class="entry-match">${match}</span>`;

        entry.appendChild(header);
        entry.appendChild(body);

        logFeed.appendChild(entry);
        
        // Auto scroll to bottom
        logFeed.scrollTop = logFeed.scrollHeight;

        // Keep maximum logs in view to prevent performance lag
        const logEntries = logFeed.querySelectorAll('.log-entry');
        if (logEntries.length > 20) {
            logEntries[0].remove();
        }
    }

    // CCTV Clock Updater
    function updateClock() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        hudTimestamp.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // Event listener for feed buttons
    cameraItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('active')) return;

            cameraItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const cameraKey = item.getAttribute('data-camera');
            switchCamera(cameraKey);
        });
    });

    // Clock Interval
    setInterval(updateClock, 1000);
    updateClock();

    // Auto-generate logs periodically
    setInterval(() => {
        // Only run ReID logs if video is playing
        if (video && !video.paused) {
            const randomIndex = Math.floor(Math.random() * trackedPersons.length);
            const person = trackedPersons[randomIndex];
            appendLog(person.id, person.flow, person.match, person.isAlert);
        }
    }, 4500);

    // Initial dummy logs
    appendLog('1092', 'CAM_01 -> CAM_02', '94.6%', false);
    appendLog('0894', 'CAM_02 -> CAM_03', '98.2%', false);
});
