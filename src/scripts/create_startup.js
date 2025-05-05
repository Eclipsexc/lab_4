document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".button-container button");

    button.addEventListener("click", () => {
        const name = document.getElementById("company-name").value.trim();
        const sector = document.getElementById("business-sector").value.trim();
        const employees = document.getElementById("employees").value.trim();
        const capital = document.getElementById("starting-capital").value.trim();
        const organization = document.getElementById("organization-type").value;
        const country = document.getElementById("country").value.trim();
        const city = document.getElementById("city").value.trim();
        const street = document.getElementById("street").value.trim();
        const building = document.getElementById("building").value.trim();

        if (!name || !sector) {
            alert("Будь ласка, введіть назву та сектор.");
            return;
        }

        const startup = {
            name,
            sector,
            employees,
            capital,
            type: organization,
            country,
            city,
            street,
            building,
            image: getImageBySector(sector)
        };

        const existing = JSON.parse(localStorage.getItem("startups")) || [];
        existing.push(startup);
        localStorage.setItem("startups", JSON.stringify(existing));

        window.location.href = "/pages/my_startups.html";
    });

    function getImageBySector(sector) {
        const map = {
            "Агробізнес": "/assets/startups_icons/Агробізнес.jpg",
            "Дизайн та мистецтво": "/assets/startups_icons/Дизайн та мистецтво.jpg",
            "Електронна комерція": "/assets/startups_icons/Електронна комерція.jpg",
            "Енергетика": "/assets/startups_icons/Енергетика.jpg",
            "Кібербезпека": "/assets/startups_icons/Кібербезпека.jpg",
            "Логістика": "/assets/startups_icons/Логістика.jpg",
            "Маркетинг": "/assets/startups_icons/Маркетинг.jpg",
            "Освіта": "/assets/startups_icons/Освіта.jpg",
            "Охорона здоров'я": "/assets/startups_icons/Охорона здоров'я.jpg",
            "Розваги": "/assets/startups_icons/Розваги.jpg",
            "Технології": "/assets/startups_icons/Технології.jpg",
            "Туризм": "/assets/startups_icons/Туризм.jpg",
            "Фінанси": "/assets/startups_icons/Фінанси.jpg",
            "Юридичні послуги": "/assets/startups_icons/Юридичні послуги.jpg",
            "Нерухомість": "/assets/startups_icons/Нерухомість.jpg"
        };
        return map[sector] || "/assets/startups_icons/default.jpg";
    }
});
