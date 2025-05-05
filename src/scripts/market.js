document.addEventListener("DOMContentLoaded", function () {
    fetch("/components/header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header-container").innerHTML = data);

    fetch("/components/footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-container").innerHTML = data);

    const competitors = window.marketCompetitors || [];
    const competitorsList = document.getElementById("competitors-list");

    const cardsHTML = competitors.map((comp, index) => `
        <div class="competitor-card">
            <img src="${comp.image}" alt="${comp.name}">
            <div class="competitor-info">
                <p><strong>Компанія:</strong> ${comp.name}</p>
                <p><strong>Сфера:</strong> ${comp.sector}</p>
                <button class="learn-more-btn" data-index="${index}">Дізнатись більше</button>
            </div>
        </div>
    `).join("");

    competitorsList.innerHTML = cardsHTML;

    const modal = document.getElementById("competitor-modal");
    modal.style.display = "none";

    document.querySelectorAll(".learn-more-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            const competitor = competitors[index];

            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <h2>Детальний аналіз:</h2>
                    <div class="modal-grid">
                        <div class="modal-left">
                            <p><strong>Назва:</strong> ${competitor.name}</p>
                            <p><strong>Сфера:</strong> ${competitor.sector}</p>
                            <p><strong>Капітал:</strong> ${competitor.capital}</p>
                            <p><strong>Адреса:</strong> ${competitor.address}</p>
                            <p><strong>Фінансові показники:</strong> ${competitor.financials}</p>
                            <p><strong>Засновано:</strong> ${competitor.founded}</p>
                            <p><strong>CEO:</strong> ${competitor.ceo}</p>
                            <p><strong>Кількість працівників:</strong> ${competitor.employees}</p>
                            <p><strong>Частка ринку:</strong> ${competitor.marketShare}</p>
                            <p><strong>Дохід:</strong> ${competitor.revenue}</p>
                            <p><strong>Витрати:</strong> ${competitor.expenses}</p>
                        </div>
                        <div class="modal-right">
                            <p><strong>Тренди:</strong> ${competitor.trends}</p>
                            <p><strong>Можливості для розвитку:</strong> ${competitor.opportunities}</p>
                        </div>
                    </div>
                </div>
            `;

            modal.style.display = "flex";

            document.querySelector(".close-btn").addEventListener("click", function () {
                modal.style.display = "none";
            });
        });
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
