function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {
            lat: 46.69261,
            lng: -33.134766
        }
    });

    // Labels for markers
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Locations for markers
const locations = [
    { lat: 40.785091, lng: -73.968285, title: "Central Park" },
    { lat: 41.084045, lng: -73.874245, title: "Bear Mountain" },
    { lat: 40.754932, lng: -73.984016, title: "Times Square" },
];



const infoWindow = new google.maps.InfoWindow();

const tooltip = document.getElementById('tooltip'); // Get the tooltip element


// Create markers
const markers = locations.map(function(location, i) {
    const marker = new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
    });

    // Add a click event listener to show the title in an info window
    marker.addListener('mouseover', () => {
        tooltip.textContent = location.title; // Set the tooltip text
        tooltip.style.display = 'block'; // Show the tooltip

        // Position the tooltip near the marker
        const markerPosition = marker.getPosition();
        const projection = map.getProjection();
        const pixelPosition = projection.fromLatLngToContainerPixel(markerPosition);

        tooltip.style.left = `${pixelPosition.x - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${pixelPosition.y - tooltip.offsetHeight - 10}px`;
    });

    map.addListener('mouseleave', () => {
        infoWindow.close();
    });

    return marker;
});

map.addListener('mouseleave', () => {
    infoWindow.close();
});

// Initialize MarkerClusterer
const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });

}