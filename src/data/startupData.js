export const sectors = [
    "Технології", "Фінанси", "Охорона здоров'я", "Туризм", "Маркетинг",
    "Освіта", "Електронна комерція", "Логістика", "Енергетика", "Розваги",
    "Агробізнес", "Юридичні послуги", "Дизайн та мистецтво", "Кібербезпека", "Нерухомість"
  ];
  
  export const orgTypes = [
    "ФОП (Фізична особа-підприємець)",
    "ТОВ (Товариство з обмеженою відповідальністю)",
    "ПрАТ (Приватне акціонерне товариство)",
    "ВАТ (Відкрите акціонерне товариство)",
    "Громадська організація"
  ];
  
  export const countrySuggestions = ["Ukraine", "The UK", "Poland", "France", "Germany"];
  export const citySuggestions = ["Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro", "Warsaw", "London", "Berlin", "Paris"];
  
  export const getImageBySector = (sector) => {
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
  };
  