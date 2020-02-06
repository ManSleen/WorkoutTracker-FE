import React from "react";
import { shallow } from "enzyme";
import LandingPage from "./LandingPage";
import { findByTestAttribute } from "../../../testUtils";

const setup = (props = {}) => {
  const component = shallow(<LandingPage {...props} />).shallow();
  return component;
};

describe("NavBar component", () => {
  let component;

  beforeEach(() => {
    component = setup();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttribute(component, "landingContainer");
    expect(wrapper.length).toBe(1);
  });

  it("Should render an h1", () => {
    const wrapper = findByTestAttribute(component, "landingTitle");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a Sign Up button", () => {
    const wrapper = findByTestAttribute(component, "signUpButton");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a Login button", () => {
    const wrapper = findByTestAttribute(component, "logInButton");
    expect(wrapper.length).toBe(1);
  });
});
