document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const enterBtn = document.getElementById('enter-btn');
    const appContent = document.getElementById('app-content');
    const audio = document.getElementById('bg-music');
    
    document.body.classList.add('locked');

    enterBtn.addEventListener('click', () => {
        // Start Audio
        audio.play().catch(e => console.log("Playback failed:", e));
        isPlaying = true;
        updateAudioUI();

        // Trigger Transitions
        loader.classList.add('loader-exit');
        appContent.classList.add('show-content');
        document.body.classList.remove('locked');

        // Initial celebration
        setTimeout(() => {
            for (let i = 0; i < 40; i++) {
                setTimeout(createSparkle, i * 60);
            }
        }, 800);
    });

    // Scroll Reveal Intersection Observer
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // Floating Particles System
    const particlesContainer = document.getElementById('particles-container');
    const particleColors = ['#FFD1DC', '#FFF9F9', '#D4AF37', '#F8E8E8'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 15 + 5;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `110vh`;
        particle.style.opacity = Math.random();
        
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    setInterval(createParticle, 400);

    // Interactive Actions
    const compliments = [
        "You have such a kind heart. ❤️",
        "Your smile lights up every room. 😊",
        "You are stronger than you give yourself credit for. 💪",
        "Your faith is truly inspiring. ✨",
        "You make the world a better place just by being in it. 🌍",
        "You're a rare soul, truly beautiful inside and out. 🌟",
        "I'm so proud of the woman you've become. 🌸"
    ];

    const popupContainer = document.getElementById('popup-container');
    const popupText = document.getElementById('popup-text');
    const closePopupBtn = document.getElementById('close-popup');

    function showPopup(text) {
        popupText.innerText = text;
        popupContainer.classList.remove('hidden');
    }

    closePopupBtn.addEventListener('click', () => {
        popupContainer.classList.add('hidden');
    });

    document.getElementById('tap-smile').addEventListener('click', () => {
        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        showPopup(randomCompliment);
    });

    // Make a Wish
    document.getElementById('make-wish').addEventListener('click', () => {
        showPopup("Close your eyes, make a wish... may it be granted in ways you never imagined. ✨");
        for (let i = 0; i < 30; i++) {
            setTimeout(createSparkle, i * 50);
        }
    });

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerText = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;
        sparkle.style.pointerEvents = 'none';
        sparkle.style.transition = 'all 1s ease-out';
        sparkle.style.fontSize = '20px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0.5) translateY(-50px)';
        }, 50);
        
        setTimeout(() => sparkle.remove(), 1000);
    }

    // Send a Hug (Hearts)
    document.getElementById('send-hug').addEventListener('click', () => {
        for (let i = 0; i < 20; i++) {
            createHeart();
        }
    });

    function createHeart() {
        const heart = document.createElement('div');
        heart.innerText = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = '100vh';
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        heart.style.pointerEvents = 'none';
        heart.style.transition = `all ${Math.random() * 2 + 2}s ease-out`;
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.transform = `translateY(-120vh) translateX(${(Math.random() - 0.5) * 200}px)`;
            heart.style.opacity = '0';
        }, 50);
        
        setTimeout(() => heart.remove(), 4000);
    }

    // Audio Logic
    let isPlaying = false;
    const audioBtn = document.getElementById('play-vibe');
    const globalAudioToggle = document.getElementById('audio-toggle');

    function updateAudioUI() {
        if (isPlaying) {
            globalAudioToggle.innerText = 'Sound: On';
            audioBtn.innerText = '🎵 Pause the Vibe';
        } else {
            globalAudioToggle.innerText = 'Sound: Off';
            audioBtn.innerText = '🎵 Play a Soft Vibe';
        }
    }

    function toggleAudio() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            audio.play().catch(e => console.log("Playback failed:", e));
            updateAudioUI();
        } else {
            audio.pause();
            updateAudioUI();
        }
    }

    audioBtn.addEventListener('click', toggleAudio);
    globalAudioToggle.addEventListener('click', toggleAudio);
});
