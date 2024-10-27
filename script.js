document.addEventListener('DOMContentLoaded', () => {
    // Check if user has already attempted the trial
    if (localStorage.getItem('trialAttempted')) {
        document.body.innerHTML = `
            <div class="trial-locked">
                <div class="locked-text">ACCESS DENIED</div>
                <div class="locked-subtext">You have already attempted the trial.</div>
                <div class="locked-subtext">No second chances are given.</div>
            </div>
        `;
        document.body.style.background = '#0a0a0a';
        return;
    }

    // Set trial as attempted
    localStorage.setItem('trialAttempted', 'true');

    const passkeyInput = document.querySelector('#passkey');
    const passkeySubmit = document.querySelector('.passkey-submit');
    const passkeyError = document.querySelector('.passkey-error');
    const message = document.querySelector('.message');
    const secretBtn = document.querySelector('.secret-btn');
    const coinGame = document.querySelector('.coin-game');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const coin = document.querySelector('.coin');
    const coinInner = document.querySelector('.coin-inner');
    let canFlip = true;
    let headsCount = 0;
    let gameStarted = false;
    
    // Hide the secret button until passkey is verified
    secretBtn.style.display = 'none';

    function verifyPasskey() {
        const input = passkeyInput.value.toLowerCase();
        if (input === 'banana') {
            // Show success animation
            passkeyInput.style.borderColor = '#00ff00';
            passkeySubmit.style.borderColor = '#00ff00';
            passkeyError.style.color = '#00ff00';
            passkeyError.textContent = 'Access Granted';
            
            // Hide passkey section and show message
            setTimeout(() => {
                document.querySelector('.passkey-section').style.display = 'none';
                message.style.display = 'block';
                secretBtn.style.display = 'block';
            }, 1000);
        } else {
            // Show error animation
            passkeyInput.style.borderColor = '#ff0000';
            passkeyError.textContent = 'Invalid Passkey';
            passkeyInput.value = '';
            
            // Shake effect
            passkeyInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passkeyInput.style.animation = '';
            }, 500);
        }
    }

    passkeySubmit.addEventListener('click', verifyPasskey);
    passkeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyPasskey();
        }
    });

    secretBtn.addEventListener('mouseover', () => {
        if (!gameStarted) {
            secretBtn.style.cursor = 'pointer';
        }
    });

    secretBtn.addEventListener('click', () => {
        if (!gameStarted) {
            gameStarted = true;
            
            // Fade out welcome screen
            welcomeScreen.style.opacity = '0';
            
            // After welcome screen fades out, show coin game
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                coinGame.style.display = 'flex';
                
                // Fade in coin game
                setTimeout(() => {
                    coinGame.classList.add('visible');
                    secretBtn.style.display = 'none';
                }, 100);
            }, 1000);
        }
    });

    coin.addEventListener('click', () => {
        if (!canFlip) return;
        
        canFlip = false;
        
        const metalSound = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA');
        metalSound.volume = 0.3;
        metalSound.play();

        coinInner.classList.remove('flip-heads', 'flip-tails');
        void coinInner.offsetWidth;
        
        // Changed probability to 90% heads, 10% tails
        const result = Math.random() < 0.9;
        
        if (result) {
            coinInner.classList.add('flip-heads');
            headsCount++;
            setTimeout(() => {
                updateBackground();
                if (headsCount === 3) {
                    showVictory();
                } else {
                    canFlip = true;
                }
            }, 1500);
        } else {
            coinInner.classList.add('flip-tails');
            setTimeout(() => {
                setTimeout(() => {
                    showGameOver();
                }, 800);
            }, 1500);
        }
    });

    function showGameOver() {
        document.body.innerHTML = `
            <div class="game-over">
                <div class="glitch-text">YOU HAVE FAILED</div>
                <div class="glitch-text-small">THE TRIAL</div>
                <div class="blood"></div>
            </div>
        `;
        const scream = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA');
        scream.volume = 0.3;
        scream.play();
        document.body.classList.add('game-over-bg');
    }

    function showVictory() {
        document.body.innerHTML = `
            <div class="ascension-sequence">
                <div class="light-tunnel"></div>
                <div class="particle-field"></div>
                <div class="ascension-text">ASCENDING</div>
            </div>
        `;
        document.body.classList.add('ascending');
        
        setTimeout(() => startNeonGame(), 20000);
    }

    function startNeonGame() {
        document.body.innerHTML = `
            <div class="neon-realm">
                <div class="neon-cursor"></div>
                <div class="neon-grid"></div>
                <div class="timer">60</div>
            </div>
        `;
        document.body.classList = 'neon-active';
        
        const cursor = document.querySelector('.neon-cursor');
        const realm = document.querySelector('.neon-realm');
        const timer = document.querySelector('.timer');
        let shapes = [];
        let gameTime = 0;
        let isAlive = true;
        
        // Cursor following
        document.addEventListener('mousemove', (e) => {
            if (!isAlive) return;
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Create trail
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 500);
        });

        function createShape() {
            const shape = document.createElement('div');
            shape.className = 'neon-shape';
            
            // Random shape type
            const types = ['triangle', 'square', 'circle'];
            shape.classList.add(types[Math.floor(Math.random() * types.length)]);
            
            // Random starting position and direction
            const startSide = Math.floor(Math.random() * 4);
            let x, y, dx, dy;
            
            switch(startSide) {
                case 0: // top
                    x = Math.random() * window.innerWidth;
                    y = -50;
                    dx = Math.random() * 4 - 2;
                    dy = Math.random() * 2 + 2;
                    break;
                case 1: // right
                    x = window.innerWidth + 50;
                    y = Math.random() * window.innerHeight;
                    dx = -(Math.random() * 2 + 2);
                    dy = Math.random() * 4 - 2;
                    break;
                case 2: // bottom
                    x = Math.random() * window.innerWidth;
                    y = window.innerHeight + 50;
                    dx = Math.random() * 4 - 2;
                    dy = -(Math.random() * 2 + 2);
                    break;
                case 3: // left
                    x = -50;
                    y = Math.random() * window.innerHeight;
                    dx = Math.random() * 2 + 2;
                    dy = Math.random() * 4 - 2;
                    break;
            }
            
            shape.style.left = x + 'px';
            shape.style.top = y + 'px';
            realm.appendChild(shape);
            
            return { element: shape, x, y, dx, dy };
        }

        function checkCollision(shape) {
            const cursorRect = cursor.getBoundingClientRect();
            const shapeRect = shape.element.getBoundingClientRect();
            
            return !(cursorRect.right < shapeRect.left || 
                    cursorRect.left > shapeRect.right || 
                    cursorRect.bottom < shapeRect.top || 
                    cursorRect.top > shapeRect.bottom);
        }

        function showSuccess() {
            document.body.innerHTML = `
                <div class="success">
                    <div class="success-text">TRANSCENDED</div>
                </div>
            `;
            document.body.classList = 'success-bg';

            // After transcended message, show fortune globe sequence
            setTimeout(() => {
                document.body.innerHTML = `
                    <div class="fortune-sequence">
                        <div class="message-text">You have one final task.</div>
                        <div class="fortune-globe">
                            <div class="globe-inner">
                                <div class="fortune-text"></div>
                            </div>
                        </div>
                        <button class="fortune-button">REVEAL DESTINY</button>
                    </div>
                `;

                const fortuneButton = document.querySelector('.fortune-button');
                fortuneButton.addEventListener('click', () => {
                    const isWorthy = Math.random() < 0.5;
                    const globeText = document.querySelector('.fortune-text');
                    
                    // Disable button after click
                    fortuneButton.disabled = true;
                    fortuneButton.style.opacity = '0.5';
                    
                    // Add animation class to globe
                    document.querySelector('.globe-inner').classList.add('revealing');
                    
                    setTimeout(() => {
                        if (isWorthy) {
                            globeText.textContent = 'WORTHY';
                            globeText.style.color = '#0f0';
                            
                            // Show final message after delay
                            setTimeout(() => {
                                document.body.innerHTML = `
                                    <div class="final-message">
                                        <div class="banana-text">BANANA</div>
                                        <div class="encrypted-text">
                                            U2FsdGVkX18EOtFu8Gp0Oz5rsit8D08N8mJwiQhsFq9TnAhva6QTo6lh2oCQ11VBRupMkcLByqKoONTCIr8cqp7GVFTZrkLXbMbTwGuACPHWkdfl1rIzKhX3QCUWE8ja6p9oWCw4MMXQJ4Vch9vO4l57tz83hrZhDV2d/1r519mVLGEOgc0gOoMyIoqFHFfAO1j3l/o5G43dC/78bdfNZivtkmzl3EO0qBM1kAe/rcc1SLLFZ3KO4K4jQ177MzenJ8drKdfhWHn06jbalLjb77o+73o1nL79AE7Ac6AuzRlRs200ZSylWGJxHxNxMJjDsRnLkTqlJUV6Qqsvhi4tT9Rvmi7gDjG9uYiu17rwnwtC+K1R8ya6yk3XxeKFL7bZ1+CLcs5f/FUaO85YPdVUmm9VGw0hxNkVAhbPq+XaFRCGO+vj57wIa55gSyW0P7eVHSszNDrxnerJiSXsTzg/OPHdkmxigQp4O5TriP7UGhA7DRpzXewZuUXwludNKIodge0NUxhsPPiqjsf/nbCbmoC7S0qf5WSM/I7vO3E8JgQJYFzooxUQItIviKr9JbHE9udeqVLP7G/9S2uArsG6Y/oHZcPQJABWt1D4dApIutHZHiFVx/uZgjZz10vDx4zaqoTEJ08viGfhNsFLFDhqfGagN3xdP61JcOAOEp9G/0vWpkMBYpO62/kzEGT82ecFh8kssKKfeqHdqFmRHl2ZOY6SuFmDkKZw+/Br4HlbPziFJ3dx7rSLLQV8aGtYYeUe5c426/AS7mr7ERm1jwZ89yf9Kk2JuZxN9cUwHQSlDe2SKVB/CXKdRQqtyBSLQq77caBHTeSZw08MuYOWubJ6bEw+RaQLb8gX+s+tY/WweOq7vNeaxJLhfq6uNwRN48ZCnaZV81faI+iCh/rQhCfKEg==
                                        </div>
                                    </div>
                                `;
                                document.body.classList = 'final-bg-light';
                            }, 3000);
                        } else {
                            globeText.textContent = 'UNWORTHY';
                            globeText.style.color = '#f00';
                            
                            // Show game over after delay
                            setTimeout(() => {
                                showGameOver();
                            }, 3000);
                        }
                    }, 2000);
                });
            }, 3000);
        }

        let lastShapeTime = 0;
        const gameLoop = setInterval(() => {
            if (!isAlive) return;
            
            gameTime += 16;
            const timeLeft = Math.ceil((60000 - gameTime) / 1000);
            timer.textContent = timeLeft;
            
            // Make last 10 seconds extremely difficult
            const isEndgame = timeLeft <= 10;
            
            // Create new shapes with increasing frequency
            const spawnDelay = isEndgame 
                ? 50 // Spawn shapes very rapidly in last 10 seconds
                : Math.max(1000 - gameTime/50, 200);
                
            if (gameTime - lastShapeTime > spawnDelay) {
                // Spawn multiple shapes at once during endgame
                const spawnCount = isEndgame ? 5 : 1;
                for (let i = 0; i < spawnCount; i++) {
                    shapes.push(createShape());
                }
                lastShapeTime = gameTime;
            }

            // Update shapes
            const baseSpeed = 1 + gameTime/10000;
            const speed = isEndgame 
                ? baseSpeed * 3 // Triple speed in last 10 seconds
                : baseSpeed;
                
            shapes = shapes.filter(shape => {
                // Add wobble movement during endgame
                if (isEndgame) {
                    shape.dx += (Math.random() - 0.5) * 0.5;
                    shape.dy += (Math.random() - 0.5) * 0.5;
                }
                
                shape.x += shape.dx * speed;
                shape.y += shape.dy * speed;
                shape.element.style.left = shape.x + 'px';
                shape.element.style.top = shape.y + 'px';
                
                // Check collision
                if (checkCollision(shape)) {
                    isAlive = false;
                    clearInterval(gameLoop);
                    showGameOver();
                    return false;
                }
                
                // Remove if off screen
                if (shape.x < -100 || shape.x > window.innerWidth + 100 ||
                    shape.y < -100 || shape.y > window.innerHeight + 100) {
                    shape.element.remove();
                    return false;
                }
                return true;
            });

            // Add visual intensity in last 10 seconds
            if (isEndgame) {
                document.body.style.animation = 'endgame-pulse 0.5s infinite';
            }

            // Check for victory
            if (gameTime >= 60000) {
                clearInterval(gameLoop);
                showSuccess();
            }
        }, 16);
    }

    function updateBackground() {
        document.body.className = `stage-${headsCount}`;
    }
});
