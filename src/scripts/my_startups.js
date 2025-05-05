document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".competitors-grid");
    const startups = JSON.parse(localStorage.getItem("startups")) || [];

    container.innerHTML = "";

    if (startups.length === 0) {
        const emptyCard = document.createElement("div");
        emptyCard.className = "competitor-card empty-info";
        emptyCard.innerHTML = `
            <p style="font-weight: bold; font-size: 17px;">Поки не створено жодного стартапу,</p>
            <p style="color: #444;">втім ви можете це виправити →</p>
        `;
        container.appendChild(emptyCard);
    }

    startups.forEach((startup, index) => {
        const card = document.createElement("div");
        card.className = "competitor-card";

        card.innerHTML = `
            <img src="${startup.image}" alt="${startup.name}">
            <div class="competitor-info">
                <p><strong>Компанія:</strong> ${startup.name}</p>
                <p><strong>Сфера:</strong> ${startup.sector}</p>
            </div>
            <div class="card-buttons">
                <button class="learn-more-btn" data-index="${index}">Дізнатись більше</button>
                <button class="edit-btn" data-index="${index}" title="Редагувати">
                    <img src="/assets/icons/edit.png" alt="edit" />
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    const addCard = document.createElement("a");
    addCard.href = "/pages/create_startup.html";
    addCard.className = "competitor-card add-card";
    addCard.innerHTML = `<span>+</span>`;
    container.appendChild(addCard);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Детальний аналіз:</h2>
            <div class="modal-grid">
                <div class="modal-left">
                    <p><strong>Назва:</strong> <span id="modal-name"></span></p>
                    <p><strong>Сфера:</strong> <span id="modal-sector"></span></p>
                    <p><strong>Капітал:</strong> $<span id="modal-capital"></span></p>
                    <p><strong>Тип організації:</strong> <span id="modal-type"></span></p>
                    <p><strong>Адреса:</strong> <span id="modal-address"></span></p>
                </div>
                <div class="modal-right">
                    <p><strong>Кількість працівників:</strong> <span id="modal-employees"></span></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalFields = {
        name: document.getElementById("modal-name"),
        sector: document.getElementById("modal-sector"),
        capital: document.getElementById("modal-capital"),
        type: document.getElementById("modal-type"),
        address: document.getElementById("modal-address"),
        employees: document.getElementById("modal-employees")
    };

    document.querySelectorAll(".learn-more-btn").forEach(button => {
        button.addEventListener("click", () => {
            const index = parseInt(button.getAttribute("data-index"));
            const data = startups[index];

            modalFields.name.textContent = data.name || "-";
            modalFields.sector.textContent = data.sector || "-";
            modalFields.capital.textContent = data.capital || "-";
            modalFields.type.textContent = data.type || "-";
            modalFields.employees.textContent = data.employees || "-";
            modalFields.address.textContent = `${data.country || "-"}, ${data.city || "-"}, ${data.street || "-"}, ${data.building || "-"}`;

            modal.style.display = "flex";
        });
    });

    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            window.location.href = `/pages/edit_startup.html?index=${index}`;
        });
    });

    modal.querySelector(".close-btn").addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
