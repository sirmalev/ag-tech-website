document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should fade in on scroll
    const animatedElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, {
            threshold: 0.15 // Trigger when 15% of the element is visible
        });

        animatedElements.forEach(item => {
            observer.observe(item);
        });
    }

    // --- NEW GAME LOGIC ---
    const gameBoard = document.getElementById('game-board');
    const startGameBtn = document.getElementById('start-game-btn');
    const timeLeftDisplay = document.getElementById('time-left');
    const scoreDisplay = document.getElementById('score');
    const gameEndMessage = document.getElementById('game-end-message');
    const automateBtn = document.getElementById('automate-btn');

    if (gameBoard) {
        const tasks = [
            { name: 'עדכון Excel', icon: '📊' },
            { name: 'שליחת תזכורת', icon: '⏰' },
            { name: 'העתק-הדבק', icon: '📋' },
            { name: 'חיפוש מייל', icon: '📧' },
            { name: 'קביעת פגישה', icon: '📅' },
            { name: 'הפקת דוח', icon: '📈' },
            { name: 'אישור הזמנה', icon: '✅' },
            { name: 'מענה ללקוח', icon: '💬' },
        ];
        const holeCount = 12;
        let holes = [];
        let score = 0;
        let timeLeft = 10;
        let gameTimerId;
        let taskTimerId;
        let lastHole;
        let isGameActive = false;

        function resetEndMessage() {
            const h3 = gameEndMessage.querySelector('h3');
            const p = gameEndMessage.querySelector('p');
            const btn = gameEndMessage.querySelector('#automate-btn');

            if (h3) h3.textContent = 'נגמר הזמן! זה קשה, נכון?';
            if (p) p.textContent = 'לנסות לעשות הכל ידנית זה מתיש ולא יעיל. אבל יש דרך טובה יותר.';
            if (btn) {
                btn.style.display = 'inline-block';
            }
        }

        // Create game board
        for (let i = 0; i < holeCount; i++) {
            const hole = document.createElement('div');
            hole.classList.add('game-hole');
            
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            
            hole.appendChild(taskElement);
            gameBoard.appendChild(hole);
            holes.push(hole);

            hole.addEventListener('click', () => {
                if (isGameActive && taskElement.classList.contains('up')) {
                    score++;
                    scoreDisplay.textContent = score;
                    taskElement.classList.remove('up');
                }
            });
        }

        function randomTask(taskElement) {
            const taskData = tasks[Math.floor(Math.random() * tasks.length)];
            taskElement.innerHTML = `<span class="task-icon">${taskData.icon}</span><span class="task-name">${taskData.name}</span>`;
        }

        function randomHole() {
            const idx = Math.floor(Math.random() * holes.length);
            const hole = holes[idx];
            if (hole === lastHole) {
                return randomHole();
            }
            lastHole = hole;
            return hole;
        }

        function popTask() {
            const hole = randomHole();
            const taskElement = hole.querySelector('.task');
            randomTask(taskElement);
            taskElement.classList.add('up');
            setTimeout(() => {
                taskElement.classList.remove('up');
            }, 1200); // Task stays up for 1.2 seconds
        }

        function startGame() {
            resetEndMessage();
            isGameActive = true;
            score = 0;
            timeLeft = 10;
            scoreDisplay.textContent = score;
            timeLeftDisplay.textContent = timeLeft;
            gameEndMessage.classList.remove('visible');
            startGameBtn.style.display = 'none';

            taskTimerId = setInterval(popTask, 700); // New task every 0.7 seconds

            gameTimerId = setInterval(() => {
                timeLeft--;
                timeLeftDisplay.textContent = timeLeft;
                if (timeLeft === 0) {
                    endGame();
                }
            }, 1000);
        }

        function endGame() {
            isGameActive = false;
            clearInterval(gameTimerId);
            clearInterval(taskTimerId);
            gameEndMessage.classList.add('visible');
        }
        
        function runAutomation() {
            gameEndMessage.classList.remove('visible');
            scoreDisplay.textContent = 0; // Reset score for the animation
            let automatedScore = 0;
            const automationInterval = setInterval(() => {
                const hole = randomHole();
                const taskElement = hole.querySelector('.task');
                randomTask(taskElement);
                taskElement.classList.add('up');
                
                setTimeout(() => {
                    taskElement.classList.remove('up');
                    automatedScore += 5;
                    scoreDisplay.textContent = automatedScore;
                }, 100);

                if (automatedScore >= 500) {
                    clearInterval(automationInterval);
                    const h3 = gameEndMessage.querySelector('h3');
                    const p = gameEndMessage.querySelector('p');
                    const btn = gameEndMessage.querySelector('#automate-btn');

                    if (h3) h3.textContent = 'זה כוחה של אוטומציה.';
                    if (p) p.textContent = 'בזמן שאתם מתמקדים בצמיחה, אנחנו דואגים שהמכונה תעבוד. בלי הפסקה.';
                    if (btn) btn.style.display = 'none';

                    gameEndMessage.classList.add('visible');
                    startGameBtn.textContent = "שחק שוב";
                    startGameBtn.style.display = 'inline-block';
                }
            }, 150);
        }

        startGameBtn.addEventListener('click', startGame);
        automateBtn.addEventListener('click', runAutomation);
    }
});