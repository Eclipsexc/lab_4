document.addEventListener("DOMContentLoaded", function () {
    const businessSectors = [
        "Технології", "Фінанси", "Охорона здоров'я", "Туризм", "Маркетинг",
        "Освіта", "Електронна комерція", "Логістика", "Енергетика", "Розваги",
        "Агробізнес", "Юридичні послуги", "Дизайн та мистецтво", "Кібербезпека", "Нерухомість"
    ];

    const organizationTypes = [
        { value: "ФОП (Фізична особа-підприємець)", label: "ФОП (Фізична особа-підприємець)" },
        { value: "ТОВ (Товариство з обмеженою відповідальністю)", label: "ТОВ (Товариство з обмеженою відповідальністю)" },
        { value: "ПрАТ (Приватне акціонерне товариство)", label: "ПрАТ (Приватне акціонерне товариство)" },
        { value: "ВАТ (Відкрите акціонерне товариство)", label: "ВАТ (Відкрите акціонерне товариство)" },
        { value: "Громадська організація", label: "Громадська організація" }
    ];

    const countrySuggestions = [
        "Ukraine", "The UK", "Poland", "France", "Germany"
    ];

    const citySuggestions = [
        "Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro", "Warsaw", "London", "Berlin", "Paris"
    ];

    const sectorSelect = document.getElementById("business-sector");
    const orgSelect = document.getElementById("organization-type");
    const countryInput = document.getElementById("country");
    const cityInput = document.getElementById("city");

    if (sectorSelect) {
        businessSectors.forEach(sector => {
            const option = document.createElement("option");
            option.textContent = sector;
            sectorSelect.appendChild(option);
        });
    }

    if (orgSelect) {
        organizationTypes.forEach(org => {
            const option = document.createElement("option");
            option.value = org.value;
            option.textContent = org.label;
            orgSelect.appendChild(option);
        });
    }

    if (countryInput) {
        const datalist = document.createElement("datalist");
        datalist.id = "country-list";

        countrySuggestions.forEach(country => {
            const option = document.createElement("option");
            option.value = country;
            datalist.appendChild(option);
        });

        document.body.appendChild(datalist);
        countryInput.setAttribute("list", "country-list");
    }

    if (cityInput) {
        const datalist = document.createElement("datalist");
        datalist.id = "city-list";

        citySuggestions.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            datalist.appendChild(option);
        });

        document.body.appendChild(datalist);
        cityInput.setAttribute("list", "city-list");
    }
});
