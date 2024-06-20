function getroute() {
    var myroutewithout = L.Routing.control({
        waypoints: [
            L.latLng(window.my_lat, window.my_lng),
            L.latLng(window.job_p_lat, window.job_p_lng)
        ],
        show: true,
        units: 'imperial',
        router: L.Routing.mapbox('pk.eyJ1IjoidG9naWFoeSIsImEiOiJjbHd3NThyeXgwdWE0MnFxNXh3MzF4YjE3In0.Ikxdlh66ijGULuZhR3QaMw'),
        createMarker: function(i, wp, nWps) {
            // Use the default marker for all points
            return L.marker(wp.latLng);
        }
    }).addTo(map);

    myroutewithout.on('routesfound', function(e) {
        var routes = e.routes;
        var summary = routes[0].summary;
        // Alert distance and time in km and minutes
        alert('Total distance is ' + (summary.totalDistance / 1000).toFixed(2) + ' km and total time is ' + Math.round(summary.totalTime / 60) + ' minutes');
    });
}

// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Replace these with your own coordinates
window.my_lat = 10.69065;  // Example: New York City latitude
window.my_lng = 106.58309; // Example: New York City longitude
window.job_p_lat = 10.7405447842717; // Example: Another point in New York City latitude
window.job_p_lng = 106.687171356951; // Example: Another point in New York City longitude

getroute();
