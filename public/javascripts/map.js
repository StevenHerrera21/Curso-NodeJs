var map = L.map('main_map').setView([-2.2287768,-79.9354746], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-2.2287768,-79.9354746]).addTo(map);
L.marker([-2.227201,-79.9394636]).addTo(map);
L.marker([-2.222468,-79.936486]).addTo(map);


