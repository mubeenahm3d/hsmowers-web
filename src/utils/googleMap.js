export const loadGoogleMapsScript = (apiKey, callback) => {
  if (!window.google) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
};
