document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(id, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error(`Помилка завантаження ${url}:`, error));
    }

    loadComponent("header-container", "/components/header.html");
    loadComponent("footer-container", "/components/footer.html");

    const investors = [
        { name: "Петренко Іван", sector: "Технології", portfolio: "$500 мільйонів USD", companies: "TechCorp, InnovateLtd", country: "Україна", flag: "/assets/flags/ukraine.png", image: "/assets/people/investor1.jpg", experience: "15 років" },
        { name: "Смірнов Олексій", sector: "Охорона здоров'я", portfolio: "$300 мільйонів USD", companies: "MedCare, HealthPlus", country: "США", flag: "/assets/flags/the_usa.png", image: "/assets/people/investor2.jpg", experience: "10 років" },
        { name: "Мюллер Ганс", sector: "Енергетика", portfolio: "$1 мільярд USD", companies: "EnergyNet, PowerGrid", country: "Німеччина", flag: "/assets/flags/germany.png", image: "/assets/people/investor3.jpg", experience: "20 років" },
        { name: "Сміт Джон", sector: "Фінансові послуги", portfolio: "$700 мільйонів USD", companies: "FinServe, BankPro", country: "Велика Британія", flag: "/assets/flags/the_uk.png", image: "/assets/people/investor4.jpg", experience: "12 років" },
        { name: "Гарсія Карлос", sector: "Туризм", portfolio: "$150 мільйонів USD", companies: "TourWorld, ExploreMore", country: "Іспанія", flag: "/assets/flags/spain.png", image: "/assets/people/investor5.jpg", experience: "8 років" },
        { name: "Дюпон Марі", sector: "Освіта", portfolio: "$400 мільйонів USD", companies: "EduTech, LearnNow", country: "Франція", flag: "/assets/flags/france.png", image: "/assets/people/investor6.jpg", experience: "18 років" },
        { name: "Танака Хіро", sector: "Інфраструктура", portfolio: "$900 мільйонів USD", companies: "InfraBuild, CityScape", country: "Японія", flag: "/assets/flags/japan.png", image: "/assets/people/investor7.jpg", experience: "25 років" },
        { name: "Вільямс Емма", sector: "Споживчі товари", portfolio: "$600 мільйонів USD", companies: "ConsumerGoodsInc, DailyProducts", country: "Канада", flag: "/assets/flags/canada.png", image: "/assets/people/investor8.jpg", experience: "10 років" },
        { name: "Чан Вей", sector: "ІТ", portfolio: "$2 мільярди USD", companies: "TechWorld, SoftWareInc", country: "Сінгапур", flag: "/assets/flags/singapore.png", image: "/assets/people/investor9.jpg", experience: "30 років" },
        { name: "Шмідт Маркус", sector: "Автомобільна промисловість", portfolio: "$800 мільйонів USD", companies: "AutoTech, CarMakers", country: "Німеччина", flag: "/assets/flags/germany.png", image: "/assets/people/investor10.jpg", experience: "22 роки" }
    ];

    const tableBody = document.getElementById("investors-table");

    function populateTable() {
        const rows = investors.map(investor => {
            return `
                <tr>
                    <td>
                        <img src="${investor.image}" alt="${investor.name}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px; vertical-align: middle;">
                        ${investor.name}
                    </td>
                    <td>${investor.sector}</td>
                    <td style="color: green; font-weight: bold;">${investor.portfolio}</td>
                    <td>${investor.companies}</td>
                    <td>
                        ${investor.country}
                        <img src="${investor.flag}" alt="${investor.country} flag" style="width: 25px; height: auto; margin-left: 5px; vertical-align: middle;">
                    </td>
                    <td>${investor.experience}</td>
                </tr>
            `;
        });

        tableBody.innerHTML = rows.join("");
    }

    populateTable();
});
