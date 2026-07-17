// Mebieco-AI Computer Vision Interactive HUD Dashboard Controller

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.inspector-tab');
    const viewportImg = document.getElementById('viewport-img');
    const bboxContainer = document.getElementById('bbox-container');
    const crosshair = document.getElementById('viewport-crosshair');
    const viewport = document.getElementById('inspector-viewport');
    
    // Stats elements
    const statClass = document.getElementById('stat-class');
    const statConf = document.getElementById('stat-conf');
    const statBbox = document.getElementById('stat-bbox');
    const statTime = document.getElementById('stat-time');
    
    // Live metrics elements
    const metricCuda = document.getElementById('metric-cuda');
    const barCuda = document.getElementById('bar-cuda');
    const metricFps = document.getElementById('metric-fps');
    const barFps = document.getElementById('bar-fps');
    const metricTemp = document.getElementById('metric-temp');
    const barTemp = document.getElementById('bar-temp');
    const metricCount = document.getElementById('metric-count');

    // Tab images mapping
    const tabImages = {
        'dashboard': '../assets/images/projects/cv/cv-1.png',
        'detail-1': '../assets/images/projects/cv/cv-2.png',
        'detail-2': '../assets/images/projects/cv/cv-3.png'
    };

    // Bounding Box data for each tab
    const bboxData = {
        'dashboard': [
            { class: 'Package Count', conf: '98.7%', box: '[230, 110, 80, 70]', time: '8.2ms', left: '48%', top: '22%', width: '16%', height: '18%' },
            { class: 'Barcode Reader', conf: '99.1%', box: '[340, 210, 60, 40]', time: '5.4ms', left: '68%', top: '48%', width: '12%', height: '12%' },
            { class: 'Conveyor Alert', conf: '95.4%', box: '[110, 180, 90, 80]', time: '9.1ms', left: '15%', top: '38%', width: '20%', height: '22%' }
        ],
        'detail-1': [
            { class: 'Product Label', conf: '97.8%', box: '[180, 90, 120, 100]', time: '6.7ms', left: '35%', top: '18%', width: '24%', height: '26%' },
            { class: 'Defect Detector', conf: '93.2%', box: '[390, 160, 50, 50]', time: '7.1ms', left: '72%', top: '35%', width: '10%', height: '14%' }
        ],
        'detail-2': [
            { class: 'Object Seg', conf: '99.3%', box: '[250, 140, 100, 120]', time: '8.5ms', left: '50%', top: '30%', width: '20%', height: '30%' },
            { class: 'Density Counter', conf: '96.5%', box: '[80, 70, 70, 70]', time: '8.9ms', left: '16%', top: '15%', width: '15%', height: '18%' }
        ]
    };

    // Initialize Bounding Boxes for the active tab
    function renderBBoxes(tabKey) {
        // Clear old overlays (keep crosshair)
        const overlays = bboxContainer.querySelectorAll('.bbox-overlay');
        overlays.forEach(overlay => overlay.remove());

        const items = bboxData[tabKey] || [];
        items.forEach((item, index) => {
            const overlay = document.createElement('div');
            overlay.className = 'bbox-overlay';
            overlay.style.left = item.left;
            overlay.style.top = item.top;
            overlay.style.width = item.width;
            overlay.style.height = item.height;
            overlay.style.display = 'block';

            const label = document.createElement('span');
            label.className = 'bbox-label';
            label.textContent = `${item.class}: ${item.conf}`;
            overlay.appendChild(label);

            // Hover interactions
            overlay.addEventListener('mouseenter', () => {
                statClass.textContent = item.class;
                statConf.textContent = item.conf;
                statBbox.textContent = item.box;
                statTime.textContent = item.time;
                
                // Highlight color changes in statistics
                statClass.style.color = 'var(--hud-secondary)';
                statConf.style.color = 'var(--hud-secondary)';
            });

            overlay.addEventListener('mouseleave', () => {
                // Return to default hover text indicator
                statClass.style.color = '#ffffff';
                statConf.style.color = '#ffffff';
            });

            bboxContainer.appendChild(overlay);
        });

        // Set default HUD stats on render
        if (items.length > 0) {
            statClass.textContent = items[0].class;
            statConf.textContent = items[0].conf;
            statBbox.textContent = items[0].box;
            statTime.textContent = items[0].time;
        } else {
            statClass.textContent = 'None';
            statConf.textContent = '0.0%';
            statBbox.textContent = '[0, 0, 0, 0]';
            statTime.textContent = '0.0ms';
        }
    }

    // Tab switcher
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabKey = tab.getAttribute('data-tab');
            viewportImg.src = tabImages[tabKey];
            renderBBoxes(tabKey);
        });
    });

    // Crosshair movement sync in viewport
    if (viewport && crosshair) {
        viewport.addEventListener('mousemove', (e) => {
            const rect = viewport.getBoundingClientRect();
            const x = e.clientX - rect.left - 15; // Centering offset
            const y = e.clientY - rect.top - 15;
            
            crosshair.style.left = `${x}px`;
            crosshair.style.top = `${y}px`;
        });
    }

    // Dynamic hardware metrics simulator
    let detectionCounter = 3428290;
    setInterval(() => {
        // Fluctuate CUDA Core Load (74% - 82%)
        const cudaLoad = Math.floor(Math.random() * 9) + 74;
        metricCuda.textContent = cudaLoad;
        barCuda.style.width = `${cudaLoad}%`;

        // Fluctuate FPS (83 - 88)
        const fps = Math.floor(Math.random() * 6) + 83;
        metricFps.textContent = fps;
        barFps.style.width = `${(fps/120)*100}%`;

        // Fluctuate GPU Temp (62C - 65C)
        const temp = Math.floor(Math.random() * 4) + 62;
        metricTemp.textContent = temp;
        barTemp.style.width = `${(temp/100)*100}%`;

        // Increment Detections count slightly
        detectionCounter += Math.floor(Math.random() * 3) + 1;
        metricCount.textContent = detectionCounter.toLocaleString();

    }, 2000);

    // Initial render
    renderBBoxes('dashboard');
});
