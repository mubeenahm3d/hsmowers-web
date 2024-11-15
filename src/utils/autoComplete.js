export const initAutocomplete = (inputElement, onPlaceChanged) => {
  if (window.google && window.google.maps && window.google.maps.places) {
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputElement,
      {
        types: ["geocode"],
        componentRestrictions: { country: "us" },
      }
    );

    autocomplete.addListener("place_changed", onPlaceChanged);
  }
};
