import React, { useEffect } from "react";

const GoogleMap = () => {
  useEffect(() => {
    // Verifica si google está disponible (API cargada)
    if (!window.google) return;

    function initMap() {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
        mapTypeControl: false,
      });

      const input = document.getElementById("pac-input");
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
      });

      autocomplete.bindTo("bounds", map);

      const infowindow = new window.google.maps.InfoWindow();
      const infowindowContent = document.getElementById("infowindow-content");
      infowindow.setContent(infowindowContent);

      const marker = new window.google.maps.Marker({
        map,
        anchorPoint: new window.google.maps.Point(0, -29),
      });

      autocomplete.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);

        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          window.alert("No hay detalles disponibles para: '" + place.name + "'");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        infowindowContent.querySelector("#place-name").textContent = place.name;
        infowindowContent.querySelector("#place-address").textContent = place.formatted_address;
        infowindow.open(map, marker);
      });
    }

    initMap();
  }, []);

  return (
    <div>
      {/* Input para la búsqueda de direcciones */}
      <input id="pac-input" type="text" placeholder="Buscar un lugar..." style={{ width: "300px", padding: "8px" }} />

      {/* Mapa de Google */}
      <div id="map" style={{ height: "400px", width: "100%" }}></div>

      {/* Información del lugar seleccionado */}
      <div id="infowindow-content" style={{ display: "none" }}>
        <span id="place-name"></span><br />
        <span id="place-address"></span>
      </div>
    </div>
  );
};

export default GoogleMap;
