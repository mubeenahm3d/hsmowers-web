export const geocodeAddress = (address, callback, dispatch, alertActions) => {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK" && results[0]) {
      const zipCode = results[0].address_components.find((component) =>
        component.types.includes("postal_code")
      );
      if (zipCode) {
        callback(zipCode.long_name);
      } else {
        dispatch(
          alertActions.setAlert({
            messageType: "error",
            title: "Please enter full address",
          })
        );
      }
    } else {
      console.log("Geocode failed due to: " + status);
    }
  });
};
