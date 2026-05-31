document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ИНТЕРАКТИВНО МЕНИ (TABS ЛОГИКА) ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Тргни активна класа од сите копчиња
            tabButtons.forEach(btn => btn.classList.remove("active"));
            // Скриј ги сите панели на менито
            tabPanels.forEach(panel => panel.classList.remove("active"));

            // Додај активна класа на кликнатото копче
            button.classList.add("active");
            // Отвори го точниот панел
            const targetId = button.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
        });
    });

    // --- 2. ГАЛЕРИЈА / СЛАЈДЕР НА КАРТИЧКИТЕ ЗА СОБИ ---
    const cards = document.querySelectorAll(".card-room");

    cards.forEach(card => {
        const images = card.querySelectorAll(".slider-container img");
        const nextBtn = card.querySelector(".slider-btn.next");
        const prevBtn = card.querySelector(".slider-btn.prev");
        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove("active"));
            images[index].classList.add("active");
        }

        nextBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Спречува скокање на страницата
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
    });
});




document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ИНТЕРАКТИВНО МЕНИ (TABS ЛОГИКА) ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    if (tabButtons.length > 0) {
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
    }

    // --- 2. СЛАЈДЕР ЛОГИКА ЗА 8 АПАРТМАНИ (3 на десктоп, 1 на мобилен) ---
    const track = document.querySelector(".slider-track");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalItems = document.querySelectorAll(".slider-track .card-room").length;

        function getItemsPerView() {
            return window.innerWidth <= 768 ? 1 : 3;
        }

        function updateSliderPosition() {
            const itemsPerView = getItemsPerView();
            const maxIndex = totalItems - itemsPerView;
            
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            const amountToMove = currentIndex * (100 / itemsPerView);
            track.style.transform = `translateX(-${amountToMove}%)`;
        }

        nextBtn.addEventListener("click", () => {
            const itemsPerView = getItemsPerView();
            if (currentIndex < totalItems - itemsPerView) {
                currentIndex++;
            } else {
                currentIndex = 0; // Кружно враќање на почеток
            }
            updateSliderPosition();
        });

        prevBtn.addEventListener("click", () => {
            const itemsPerView = getItemsPerView();
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalItems - itemsPerView; // Оди на крај
            }
            updateSliderPosition();
        });

        window.addEventListener("resize", updateSliderPosition);
    }
});



// ==========================================================================
// СЛАЈДЕР ЗА СОБИТЕ (ХОРИЗОНТАЛНО ДВИЖЕЊЕ)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("roomsSliderTrack");
    const prevBtn = document.getElementById("prevRoomBtn");
    const nextBtn = document.getElementById("nextRoomBtn");
    
    // Проверка дали елементите постојат на тековната страница за да нема грешки во конзола
    if (!track || !prevBtn || !nextBtn) return;

    let index = 0;

    // Проверува колку картички се прикажуваат според ширината на екранот
    function getCardsVisible() {
        if (window.innerWidth <= 650) return 1;  // Мобилен
        if (window.innerWidth <= 992) return 2;  // Таблет
        return 3;                                // Десктоп
    }

    function updateSlider() {
        const cardsVisible = getCardsVisible();
        const widthOffset = index * (100 / cardsVisible);
        track.style.transform = `translateX(-${widthOffset}%)`;
    }

    nextBtn.addEventListener("click", () => {
        const cardsVisible = getCardsVisible();
        const totalCards = document.querySelectorAll(".room-card").length;
        const maxIndex = totalCards - cardsVisible;

        if (index < maxIndex) {
            index++;
        } else {
            index = 0; // Се враќа на првата картичка
        }
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        const cardsVisible = getCardsVisible();
        const totalCards = document.querySelectorAll(".room-card").length;
        const maxIndex = totalCards - cardsVisible;

        if (index > 0) {
            index--;
        } else {
            index = maxIndex; // Оди на последната картичка
        }
        updateSlider();
    });

    // Ресетирај ја позицијата при промена на големина на прозорецот за да нема заглавување
    window.addEventListener("resize", () => {
        index = 0; 
        updateSlider();
    });
});