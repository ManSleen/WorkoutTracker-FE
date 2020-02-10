import React from "react";
import { shallow } from "enzyme";
import Register from "./Register";
import { findByTestAttribute } from "../../../testUtils";

const setup = (props = {}) => {
  const component = shallow(<Register {...props} />).shallow();
  return component;
};

describe("Register component", () => {
  let component;

  beforeEach(() => {
    component = setup();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttribute(component, "registerContainer");
    expect(wrapper.length).toBe(1);
  });

  it("Should render an h1", () => {
    const wrapper = findByTestAttribute(component, "registerTitle");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a login form", () => {
    const wrapper = findByTestAttribute(component, "registerForm");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a username field", () => {
    const wrapper = findByTestAttribute(component, "usernameField");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a password field", () => {
    const wrapper = findByTestAttribute(component, "passwordField");
    expect(wrapper.length).toBe(1);
  });
  it("Should render a bio field", () => {
    const wrapper = findByTestAttribute(component, "bioField");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a submit button", () => {
    const wrapper = findByTestAttribute(component, "registerSubmitButton");
    expect(wrapper.length).toBe(1);
  });
});
