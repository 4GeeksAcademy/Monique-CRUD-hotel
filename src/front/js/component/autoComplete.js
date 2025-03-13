import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from "react-places-autocomplete";

const Autocomplete = ({ value, onChange, onSelect, onLatLngChange }) => {
  const handleSelect = (address) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        // Actualiza las coordenadas latitud y longitud
        onLatLngChange(lat, lng);
        // Llama a onSelect para actualizar la dirección en el formulario
        onSelect(address);
      } else {
        alert("No se pudo obtener la dirección.");
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC8SG3Um8XsfFXmzbCEql6ajptCOqpQUNw" libraries={["places"]}>
      <PlacesAutocomplete value={value} onChange={onChange} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Buscar dirección...",
                className: "form-control mb-3",
              })}
            />
            <div>
              {loading && <div>Cargando...</div>}
              {suggestions.map((suggestion) => (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className: suggestion.active ? "suggestion-item--active" : "suggestion-item",
                  })}
                  key={suggestion.placeId}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </LoadScript>
  );
};

export default Autocomplete;
