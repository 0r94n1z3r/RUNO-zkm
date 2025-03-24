<template>
    <div class="contacts-map">
        <div
            id="map"
        ></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Configuration
const apiKey = 'AIzaSyBAxFWKiq9alEu2A2N1waiADcP_aHNXlgQ';
const mapElementId = 'map';

const addr = {
    lat: 55.572885,
    lng: 37.617769, 
}

// Reactive references
const map = ref(null);

const initMap = async () => {
  const mapElement = document.getElementById(mapElementId);
  if (!mapElement) return;

  // Extract data attributes
  const lat = addr.lat;
  const lng = addr.lng;

  // Load Google Maps API script
  await loadGoogleMapsAPI(apiKey);

  // Fetch custom map styles
  const style = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]

  // Initialize map
  const latLng = { lat, lng };
  map.value = new google.maps.Map(mapElement, {
    zoom: 15,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: { position: google.maps.ControlPosition.LEFT_TOP },
    streetViewControl: false,
    styles: style,
  });

  // Add marker
  const pin = new google.maps.MarkerImage(
    '/images/pin.svg',
    new google.maps.Size(40, 40),
    new google.maps.Point(0, 0),
    new google.maps.Point(20, 40)
  );

  const infowindow = new google.maps.InfoWindow({
    maxWidth: 200,
    content: "142718, Автогипермаркет «Тракт» МКАД 32 км (внешняя сторона) Нагорная ул., с11, пос. Битца Офис 2-16 (2 этаж), Склад (19 бокс)",
    pixelOffset: new google.maps.Size(0, 0),
  });

  const marker = new google.maps.Marker({
    position: latLng,
    map: map.value,
    icon: pin,
  });

  marker.addListener('click', () => {
    infowindow.open(map.value, marker);
  });
};

const loadGoogleMapsAPI = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (typeof google !== 'undefined' && google.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Failed to load Google Maps API.'));
    document.head.appendChild(script);
  });
};

// Initialize map on component mount
onMounted(initMap);
</script>

<style lang="scss" scoped>
    #map {
        width: 100%;
        height: 400px;
    }
</style>