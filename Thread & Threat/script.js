document.addEventListener('DOMContentLoaded', () => {
    let audioCtx = null;
    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtx;
    }

    function playClick() {
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            gain.gain.setValueAtTime(0.015, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        } catch (e) {}
    }

    function playBeep(freq = 440, duration = 0.08) {
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.02, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {}
    }

    const statusTime = document.getElementById('status-time');
    const statusUptime = document.getElementById('status-uptime');
    const statusTheme = document.getElementById('status-theme');
    const statusPing = document.getElementById('status-ping');
    let startTime = Date.now();

    setInterval(() => {
        const now = new Date();
        if (statusTime) {
            statusTime.textContent = `UTC: ${now.toUTCString().split(' ')[4]}`;
        }
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const secs = String(elapsed % 60).padStart(2, '0');
        if (statusUptime) {
            statusUptime.textContent = `UPTIME: ${mins}:${secs}`;
        }
        if (statusPing && Math.random() > 0.7) {
            const jitter = 12 + Math.floor(Math.random() * 8);
            statusPing.textContent = `PING: ${jitter}MS`;
        }
    }, 1000);

    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height);
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const computedColor = getComputedStyle(document.body).getPropertyValue('--term-green').trim();
            ctx.fillStyle = computedColor || '#00ff66';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = Math.random() < 0.5 ? '0' : '1';
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 50);
    }

    const textBanner = [
        " _____ _                       _    _   _____ _                    _   ",
        "|_   _| |__  _ __ ___  __ _  __| | _| |_|_   _| |__  _ __ ___  __ _| |_ ",
        "  | | | '_ \\| '__/ _ \\/ _` |/ _` ||_   _| | | | '_ \\| '__/ _ \\/ _` | __|",
        "  | | | | | | | |  __/ (_| | (_| |  |_|   | | | | | | | |  __/ (_| | |_ ",
        "  |_| |_| |_|_|  \\___|\\__,_|\\__,_|        |_| |_| |_|_|  \\___|\\__,_|\\__|"
    ];

    const tuxFrames = [
        [
            "         _nnnn_",
            "        dGGGGMMb",
            "       @p~qp~~qMb",
            "       M|@||@) M|",
            "       @,----.JM|",
            "      JS^\\__/  qKL",
            "     dZP        qKRb",
            "    dZP          qKKb",
            "   fZP            SMMb",
            "   HZM            MMMM",
            "   FqM            MMMM",
            " __| \".        |\\dS\"qML",
            " |    `.       | `' \\Zq",
            "_|      \\.___.,|     .'",
            "\\____   )MMMMMP|   .'",
            "     `-'       `--' hjm"
        ],
        [
            "         _nnnn_",
            "        dGGGGMMb",
            "       @p~--~~qMb",
            "       M|----| M|",
            "       @,----.JM|",
            "      JS^\\__/  qKL",
            "     dZP        qKRb",
            "    dZP          qKKb",
            "   fZP            SMMb",
            "   HZM            MMMM",
            "   FqM            MMMM",
            " __| \".        |\\dS\"qML",
            " |    `.       | `' \\Zq",
            "_)      \\.___.,|     .'",
            "/_____  )MMMMMP|   .'",
            "     `-'       `--' hjm"
        ],
        [
            "         _nnnn_",
            "        dGGGGMMb",
            "       @p~qp~~qMb",
            "       M|@||@) M|",
            "       @,----.JM|",
            "      JS^\\__/  qKL",
            "     dZP        qKRb",
            "    dZP          qKKb",
            "   fZP            SMMb",
            "   HZM            MMMM",
            "   FqM            MMMM",
            " __| \".        |\\dS\"qML",
            " |    `.       | `' \\Zq",
            "_|      \\.___.,|     .'",
            "\\____   )MMMMMP|   .'",
            "   `--'       `-'   hjm"
        ]
    ];

    const taglineText = "[SYS_ANALYSIS] Unraveling security exploits, root causes, and defensive mitigations.";
    const penguinElement = document.getElementById('typewriter-penguin');
    const asciiElement = document.getElementById('typewriter-ascii');
    const taglineElement = document.getElementById('typewriter-text');
    
    let currentFrame = 0;
    let taglineIndex = 0;
    let typeCharsCountBanner = 0;
    let typeCharsCountPenguin = 0;

    const fullBannerString = textBanner.join('\n');
    const getPenguinString = (idx) => tuxFrames[idx].join('\n');

    function typeBanner() {
        if (asciiElement && typeCharsCountBanner <= fullBannerString.length) {
            asciiElement.innerHTML = `<pre style="margin:0; font-family:inherit;">${fullBannerString.substring(0, typeCharsCountBanner)}</pre>`;
            typeCharsCountBanner += 10;
            setTimeout(typeBanner, 12);
        }
    }

    function typePenguin() {
        const fullPenguinString = getPenguinString(0);
        if (penguinElement && typeCharsCountPenguin <= fullPenguinString.length) {
            penguinElement.innerHTML = `<pre style="margin:0; font-family:inherit;">${fullPenguinString.substring(0, typeCharsCountPenguin)}</pre>`;
            typeCharsCountPenguin += 8;
            setTimeout(typePenguin, 15);
        } else {
            startBlinkingLoop();
        }
    }

    function startBlinkingLoop() {
        function animateTux() {
            currentFrame = (currentFrame + 1) % tuxFrames.length;
            if (penguinElement) {
                penguinElement.innerHTML = `<pre style="margin:0; font-family:inherit;">${getPenguinString(currentFrame)}</pre>`;
            }
            setTimeout(animateTux, 550);
        }
        setTimeout(animateTux, 550);
    }

    setTimeout(typePenguin, 100);
    setTimeout(typeBanner, 200);

    function typeTagline() {
        if (taglineElement && taglineIndex < taglineText.length) {
            taglineElement.textContent += taglineText.charAt(taglineIndex);
            taglineIndex++;
            setTimeout(typeTagline, 8);
        }
    }
    setTimeout(typeTagline, 500);

    function togglePost(post, forceState = null) {
        const icon = post.querySelector('.toggle-icon');
        const isExpanded = forceState !== null ? !forceState : post.classList.contains('expanded');
        if (isExpanded) {
            post.classList.remove('expanded');
            if (icon) icon.textContent = '[+]';
        } else {
            post.classList.add('expanded');
            if (icon) icon.textContent = '[-]';
        }
    }

    function selectPost(postToSelect) {
        document.querySelectorAll('.post').forEach(post => post.classList.remove('selected'));
        postToSelect.classList.add('selected');
    }

    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const header = post.querySelector('.post-header');
        post.addEventListener('focus', () => selectPost(post));
        if (header) {
            header.addEventListener('click', () => {
                selectPost(post);
                togglePost(post);
            });
        }
    });

    const input = document.getElementById('cli-input');
    const outputLog = document.getElementById('cli-output-log');

    function logToTerminal(htmlContent, isCommandEcho = false) {
        const entry = document.createElement('div');
        entry.className = 'cli-log-entry';
        if (isCommandEcho) {
            entry.innerHTML = `<span style="color:#fff;">> ${htmlContent}</span>`;
        } else {
            entry.innerHTML = htmlContent;
        }
        outputLog.appendChild(entry);
        outputLog.scrollTop = outputLog.scrollHeight;
    }

    let commandHistory = [];
    let historyIndex = -1;
    const availableCommands = ['help', 'list', 'cat', 'search', 'pin', 'pins', 'copy', 'color', 'clear', 'about'];

    if (input) {
        input.addEventListener('input', () => {
            playClick();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const currentText = input.value.trim().toLowerCase();
                const match = availableCommands.find(c => c.startsWith(currentText));
                if (match) {
                    input.value = match + ' ';
                    playBeep(600, 0.04);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[commandHistory.length - 1 - historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[commandHistory.length - 1 - historyIndex];
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    input.value = '';
                }
            } else if (e.key === 'Enter') {
                const rawCmd = input.value.trim();
                if (!rawCmd) return;

                commandHistory.push(rawCmd);
                historyIndex = -1;
                input.value = '';
                logToTerminal(rawCmd, true);
                playBeep(520, 0.05);

                const cmdLower = rawCmd.toLowerCase();

                if (cmdLower === 'help') {
                    logToTerminal('Available commands: <code>help</code>, <code>list</code>, <code>cat [id]</code>, <code>search [kw]</code>, <code>pin [id]</code>, <code>pins</code>, <code>copy [id]</code>, <code>color [theme]</code>, <code>clear</code>, <code>about</code>');
                } else if (cmdLower === 'list') {
                    logToTerminal('Index: [001] Mexican Gov | [002] Stryker Sabotage | [003] Singapore Telecom');
                } else if (cmdLower === 'about') {
                    logToTerminal('Thread+Threat: Technical exploit breakdown blog built for cyber threat analysis.');
                } else if (cmdLower === 'clear') {
                    outputLog.innerHTML = '';
                    logToTerminal('Log reset.');
                } else if (cmdLower === 'pins') {
                    const pins = JSON.parse(localStorage.getItem('thread_pins') || '[]');
                    if (pins.length === 0) {
                        logToTerminal('No bookmarked threads. Use <code>pin [id]</code> to bookmark.');
                    } else {
                        logToTerminal(`Bookmarked threads: <span style="color:#fff;">${pins.join(', ')}</span>`);
                    }
                } else if (cmdLower.startsWith('pin')) {
                    const pinArg = cmdLower.replace(/^pin\s*/, '').trim();
                    let targetPost = null;
                    posts.forEach(p => {
                        const pid = p.getAttribute('data-id');
                        if (parseInt(pid, 10) === parseInt(pinArg, 10) || pid.toLowerCase().includes(pinArg)) {
                            targetPost = p;
                        }
                    });
                    if (targetPost) {
                        const pid = targetPost.getAttribute('data-id');
                        let pins = JSON.parse(localStorage.getItem('thread_pins') || '[]');
                        if (!pins.includes(pid)) {
                            pins.push(pid);
                            localStorage.setItem('thread_pins', JSON.stringify(pins));
                        }
                        logToTerminal(`Thread #${pid} successfully bookmarked.`);
                    } else {
                        logToTerminal(`Could not find thread for pin query: "${pinArg}".`);
                    }
                } else if (cmdLower.startsWith('copy')) {
                    const copyArg = cmdLower.replace(/^copy\s*/, '').trim();
                    let targetPost = null;
                    posts.forEach(p => {
                        const pid = p.getAttribute('data-id');
                        if (parseInt(pid, 10) === parseInt(copyArg, 10) || pid.toLowerCase().includes(copyArg)) {
                            targetPost = p;
                        }
                    });
                    if (targetPost) {
                        const textToCopy = targetPost.innerText;
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            logToTerminal(`Copied contents of Thread #${targetPost.getAttribute('data-id')} to clipboard.`);
                        }).catch(() => {
                            logToTerminal(`Failed to access clipboard permissions.`);
                        });
                    } else {
                        logToTerminal(`Thread not found for copy query: "${copyArg}".`);
                    }
                } else if (cmdLower.startsWith('color')) {
                    const theme = cmdLower.replace(/^color\s*/, '').trim();
                    const validThemes = ['green', 'amber', 'cyan', 'red', 'purple', 'matrix', 'blue', 'white'];
                    if (validThemes.includes(theme)) {
                        document.body.className = `theme-${theme}`;
                        if (statusTheme) statusTheme.textContent = `THEME: ${theme.toUpperCase()}`;
                        logToTerminal(`Theme updated to <span style="color:#fff;">${theme}</span>.`);
                    } else {
                        logToTerminal(`Invalid theme. Choose from: green, amber, cyan, red, purple, matrix, blue, white`);
                    }
                } else if (cmdLower.startsWith('search')) {
                    const query = cmdLower.replace(/^search\s*/, '').trim();
                    if (!query) {
                        logToTerminal("Please provide a keyword (e.g. search mexican)");
                        return;
                    }
                    let matchedPost = null;
                    let matchCount = 0;
                    posts.forEach(p => {
                        if (p.innerText.toLowerCase().includes(query)) {
                            matchCount++;
                            if (!matchedPost) matchedPost = p;
                        }
                    });

                    if (matchedPost) {
                        selectPost(matchedPost);
                        togglePost(matchedPost, true);
                        matchedPost.scrollIntoView({ behavior: 'smooth' });
                        logToTerminal(`Found ${matchCount} match(es) for "${query}". Opening first result.`);
                    } else {
                        logToTerminal(`No threads found matching "${query}".`);
                    }
                } else if (cmdLower.startsWith('cat')) {
                    const queryArg = cmdLower.replace(/^cat\s*/, '').trim();
                    let matchedPost = null;
                    posts.forEach(p => {
                        const pid = p.getAttribute('data-id');
                        if (parseInt(pid, 10) === parseInt(queryArg, 10) || pid.toLowerCase().includes(queryArg)) {
                            matchedPost = p;
                        }
                    });

                    if (matchedPost) {
                        selectPost(matchedPost);
                        togglePost(matchedPost, true);
                        matchedPost.scrollIntoView({ behavior: 'smooth' });
                        logToTerminal(`Navigating to Post #${matchedPost.getAttribute('data-id')}...`);
                    } else {
                        logToTerminal(`Thread not found for query: "${queryArg}". Type 'list' for indices.`);
                    }
                } else {
                    logToTerminal(`Command not found: ${rawCmd}. Type 'help' for options.`);
                }
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        const activeInput = document.activeElement;
        const isTypingInCLI = (activeInput === input);
        let activePost = document.querySelector('.post:focus') || document.querySelector('.post.selected') || posts[0];

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            if (!isTypingInCLI) {
                e.preventDefault();
                togglePost(activePost, true);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (!isTypingInCLI) {
                e.preventDefault();
                togglePost(activePost, false);
            }
        }
    });
});