document.addEventListener("DOMContentLoaded", () => {

    // --- 1. ХАМБУРГЕР МЕНИ ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // --- 2. ИНТЕРАКТИВНО МЕНИ (TABS) ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabPanels.forEach(panel => panel.classList.remove("active"));

            button.classList.add("active");
            const targetId = button.getAttribute("data-target");
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add("active");
        });
    });

    // --- 3. СЛАЈДЕР ЗА СОБИТЕ (ROOMS SLIDER) ---
    const track = document.getElementById("roomsSliderTrack");
    const prevBtn = document.getElementById("prevRoomBtn");
    const nextBtn = document.getElementById("nextRoomBtn");
    
    if (track && prevBtn && nextBtn) {
        let index = 0;
        // ОВДЕ Е ИЗМЕНАТА: го сменивме .room-card во .card-room
        const totalCards = document.querySelectorAll(".card-room").length;

        function getCardsVisible() {
            if (window.innerWidth <= 650) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }

        function updateSlider() {
            const cardsVisible = getCardsVisible();
            const widthOffset = index * (100 / cardsVisible);
            track.style.transform = `translateX(-${widthOffset}%)`;
        }

        nextBtn.addEventListener("click", () => {
            const cardsVisible = getCardsVisible();
            const maxIndex = totalCards - cardsVisible;
            index = (index < maxIndex) ? index + 1 : 0;
            updateSlider();
        });

        prevBtn.addEventListener("click", () => {
            const cardsVisible = getCardsVisible();
            const maxIndex = totalCards - cardsVisible;
            index = (index > 0) ? index - 1 : maxIndex;
            updateSlider();
        });

        window.addEventListener("resize", () => {
            index = 0;
            updateSlider();
        });
    }

    // --- 4. ГАЛЕРИЈА ВО КАРТИЧКИТЕ ---
    const cards = document.querySelectorAll(".card-room");
    cards.forEach(card => {
        const images = card.querySelectorAll(".slider-container img");
        const nBtn = card.querySelector(".slider-btn.next");
        const pBtn = card.querySelector(".slider-btn.prev");
        if (!nBtn || !pBtn) return;
        
        let cIndex = 0;
        nBtn.addEventListener("click", (e) => {
            e.preventDefault();
            images[cIndex].classList.remove("active");
            cIndex = (cIndex + 1) % images.length;
            images[cIndex].classList.add("active");
        });
        pBtn.addEventListener("click", (e) => {
            e.preventDefault();
            images[cIndex].classList.remove("active");
            cIndex = (cIndex - 1 + images.length) % images.length;
            images[cIndex].classList.add("active");
        });
    });
});