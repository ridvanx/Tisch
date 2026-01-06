const drinks = [
    "Cola","Fanta","ColaZero","Apfelschorle","OrangenSaft","ApfelSaft",
    "WasserNatural","WasserClassic","BitterLemon","TonicWasser","Latte",
    "Cappuccino","Kaffee","Espresso","Bitburger","Tee","Kakao","A.freiBitburger","Weizen","WeizenAfrei","Redbull","Rotwein",
    "Sekt","Weisswein"
];

function getActiveTisch() {
    const selected = document.querySelector('input[name="table"]:checked');
    return selected ? selected.value : "1";
}

function storageKey(drink) {
    return `tisch${getActiveTisch()}_${drink}`;
}

function loadCounts() {
    drinks.forEach(drink => {
        const value = localStorage.getItem(storageKey(drink)) || 0;
        document.getElementById(drink).innerText = value;
    });
}

function update(drink, change) {
    const el = document.getElementById(drink);
    let value = parseInt(el.innerText, 10) || 0;

    value += change;
    if (value < 0) value = 0;

    el.innerText = value;
    localStorage.setItem(storageKey(drink), value);
}

function resetActiveTisch() {
    const table = getActiveTisch();
    if (!confirm(`Soll Tisch ${table} zürückgesetz wird?`)) return;

    drinks.forEach(drink => {
        localStorage.setItem(`tisch${table}_${drink}`, 0);
        const el = document.getElementById(drink);
        if (el) el.innerText = 0;
    });
}
function resetAlleTischen() {
    if (!confirm("Sollen Alle Tischen zürückgesetz werden?")) return;

    drinks.forEach(drink => {
        localStorage.setItem(`tisch1_${drink}`, 0);
        localStorage.setItem(`tisch2_${drink}`, 0);

        const el = document.getElementById(drink);
        if (el) el.innerText = 0;
    });
}

window.addEventListener("DOMContentLoaded", loadCounts);
