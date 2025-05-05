document.addEventListener("DOMContentLoaded", function () {
    function waitForElements() {
        const heroImage = document.getElementById("hero-image");
        const sectionTitle = document.getElementById("section-title");
        const sectionDescription = document.getElementById("section-description");
        const learnMoreBtn = document.querySelector(".learn-more");
        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");

        if (heroImage && sectionTitle && sectionDescription && learnMoreBtn && prevBtn && nextBtn) {
            initializeScript(heroImage, sectionTitle, sectionDescription, learnMoreBtn, prevBtn, nextBtn);
        } else {
            setTimeout(waitForElements, 100); 
        }
    }

    function initializeScript(heroImage, sectionTitle, sectionDescription, learnMoreBtn, prevBtn, nextBtn) {
        const sections = [
            {
                title: "Ринок",
                description: "Ринок стартапів постійно змінюється, залучаючи нові технології та інноваційні рішення. Основні гравці впливають на формування трендів та напрямків розвитку галузі.",
                image: "/assets/images/image1.jpg",
                link: "/pages/market.html"
            },
            {
                title: "Інвестори",
                description: "Залучення інвестицій є ключовим етапом розвитку стартапу. Правильний вибір інвесторів та партнерів допоможе вийти на новий рівень та масштабувати бізнес.",
                image: "/assets/images/image3.jpg",
                link: "/pages/investors.html"
            },
            {
                title: "Порівняльна аналітика",
                description: "Аналіз ключових показників стартапів: доходів, витрат і кількості працівників. Зручні діаграми та таблиці дозволяють порівнювати компанії та виявляти тренди.",
                image: "/assets/images/image2.jpg",
                link: "/pages/charts.html"
            }
        ];

        let currentIndex = 0;

        function updateContent() {
            sectionTitle.innerText = sections[currentIndex].title;
            sectionDescription.innerText = sections[currentIndex].description;
            heroImage.src = sections[currentIndex].image;
            learnMoreBtn.setAttribute("data-link", sections[currentIndex].link);
        }

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + sections.length) % sections.length;
            updateContent();
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % sections.length;
            updateContent();
        });

        learnMoreBtn.addEventListener("click", function () {
            const url = this.getAttribute("data-link");
            if (url) {
                window.location.href = url;
            }
        });

        updateContent();
    }

    waitForElements();
});
