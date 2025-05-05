document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header-container", "/components/header.html");
    loadComponent("footer-container", "/components/footer.html");

    const realChartData = marketCompetitors.map(c => ({
        name: c.name,
        revenue: parseInt(c.revenue.replace(/[$M]/g, "")),
        expenses: parseInt(c.expenses.replace(/[$M]/g, "")),
        employees: parseInt(c.employees)
    }));

    const modeledChartData = realChartData.map(d => ({
        name: d.name,
        revenue: Math.round(d.revenue * 1.1),
        expenses: Math.round(d.expenses * 1.05),
        employees: Math.round(d.employees * 0.98)
    }));

    let currentType = "revenue";

    const barCtx = document.getElementById("barChart").getContext("2d");
    let barChart;

    function renderCharts(type) {
        if (barChart) barChart.destroy();

        const real = realChartData.map(d => d[type]);
        const modeled = modeledChartData.map(d => d[type]);
        const labels = realChartData.map(d => d.name);

        barChart = new Chart(barCtx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "Реальне значення",
                        data: real,
                        backgroundColor: "#007bff"
                    },
                    {
                        label: "Змодельоване значення",
                        data: modeled,
                        backgroundColor: "#28a745"
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "top" }
                }
            }
        });

        updateTable(type);
    }

    function updateTable(type) {
        const tbody = document.querySelector("#comparison-table tbody");
        tbody.innerHTML = "";

        realChartData.forEach((real, i) => {
            const modeled = modeledChartData[i];
            const realValue = real[type];
            const modeledValue = modeled[type];
            const diff = modeledValue - realValue;
            const diffClass = diff > 0 ? "positive" : (diff < 0 ? "negative" : "");

            tbody.innerHTML += `
                <tr>
                    <td>${real.name}</td>
                    <td>${realValue}</td>
                    <td>${modeledValue}</td>
                    <td class="${diffClass}">${diff > 0 ? "+" : ""}${diff}</td>
                </tr>
            `;
        });
    }

    document.querySelectorAll(".toggle-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            currentType = this.dataset.type;
            renderCharts(currentType);
        });
    });

    renderCharts(currentType);
});

function loadComponent(id, url) {
    fetch(url)
        .then(res => res.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(err => console.error("Помилка завантаження компонента:", err));
}
