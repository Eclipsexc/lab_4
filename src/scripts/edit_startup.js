document.addEventListener("DOMContentLoaded", () => {
    const index = new URLSearchParams(window.location.search).get("index");
    const startups = JSON.parse(localStorage.getItem("startups")) || [];

    if (index === null || !startups[index]) {
        alert("Стартап не знайдено");
        window.location.href = "/pages/my_startups.html";
        return;
    }

    const data = startups[index];

    document.getElementById("company-name").value = data.name;
    document.getElementById("employees").value = data.employees;
    document.getElementById("starting-capital").value = data.capital;
    document.getElementById("country").value = data.country;
    document.getElementById("city").value = data.city;
    document.getElementById("street").value = data.street;
    document.getElementById("building").value = data.building;

    setTimeout(() => {
        document.getElementById("business-sector").value = data.sector;
        document.getElementById("organization-type").value = data.type;
    }, 0);

    const saveBtn = document.getElementById("save-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    saveBtn.addEventListener("click", () => {
        startups[index] = {
            ...data,
            name: document.getElementById("company-name").value.trim(),
            sector: document.getElementById("business-sector").value.trim(),
            employees: document.getElementById("employees").value.trim(),
            capital: document.getElementById("starting-capital").value.trim(),
            type: document.getElementById("organization-type").value,
            country: document.getElementById("country").value.trim(),
            city: document.getElementById("city").value.trim(),
            street: document.getElementById("street").value.trim(),
            building: document.getElementById("building").value.trim(),
            image: getImageBySector(document.getElementById("business-sector").value.trim())
        };

        localStorage.setItem("startups", JSON.stringify(startups));
        window.location.href = "/pages/my_startups.html";
    });

    cancelBtn.addEventListener("click", () => {
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
