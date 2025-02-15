import React from "react";
import { StyledProfileSetupStep } from "../../styles/StyledProfileSetup";

export default function ServicesOffered({ form, onChangeHandler }) {
  const isActive = (service) =>
    form.services.includes(service.toLowerCase().split(" ").join("-"));

  function servicesBtnClicked(e) {
    e.preventDefault();
    const { classList, value } = e.target;
    const serviceValue = value;

    let updatedServices = [...form.services];

    if (classList.contains("active")) {
      updatedServices = updatedServices.filter(
        (service) => service !== serviceValue
      );
      classList.remove("active");
    } else {
      updatedServices.push(serviceValue);
      classList.add("active");
    }
    onChangeHandler({ target: { name: "services", value: updatedServices } });
  }

  const servicesOptions = [
    "Mowing",
    "Snow Removal",
    "Baby Sitting",
    "Window Cleaning",
    "Edging",
    "Weeding",
    "Leaf Removal",
  ];
  return (
    <StyledProfileSetupStep className="step2">
      <h3 className="header">Your Services</h3>
      <p className="description">Select the services you want to provide.</p>
      <div className="fields">
        <div className="field">
          <label htmlFor="services">Select Services</label>
          <div className="services-btns">
            {servicesOptions.map((service, index) => (
              <button
                key={index}
                className={`gray-btn ${isActive(service) ? "active" : ""}`}
                value={service.toLowerCase().split(" ").join("-")}
                onClick={servicesBtnClicked}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label htmlFor="serviceDistance">Service Distance</label>
          <h5>{form.serviceDistance} Miles</h5>
          <input
            type={"range"}
            min={0.5}
            step={0.5}
            max={20}
            className="range-input"
            name={"serviceDistance"}
            value={form.serviceDistance}
            onChange={onChangeHandler}
          />
        </div>
      </div>
    </StyledProfileSetupStep>
  );
}
