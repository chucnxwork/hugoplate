/*!***************************************************
 * OpenStreetMap (Leaflet) Map
 *****************************************************/

window.leafletMarker = null;

function initializeOSM() {
  var mapEl = document.getElementById("map");
  if (!mapEl) return;

  var latitude = parseFloat(mapEl.getAttribute("data-latitude")) || 0;
  var longitude = parseFloat(mapEl.getAttribute("data-longitude")) || 0;
  var mapMarker = mapEl.getAttribute("data-marker");
  var mapMarkerName = mapEl.getAttribute("data-marker-name");

  var map = L.map("map", { center: [latitude, longitude], zoom: 15, scrollWheelZoom: false });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(map);

  if (mapMarker) {
    var icon = L.icon({ iconUrl: mapMarker, iconSize: [30, 50] });
    window.leafletMarker = L.marker([latitude, longitude], { icon: icon, title: mapMarkerName }).addTo(map);
  } else {
    window.leafletMarker = L.marker([latitude, longitude], { title: mapMarkerName }).addTo(map);
  }
}

if (document.getElementById("map") != null) {
  window.addEventListener("load", initializeOSM);
}
