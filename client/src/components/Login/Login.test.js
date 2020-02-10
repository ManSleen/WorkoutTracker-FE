import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";
import { findByTestAttribute } from "../../../testUtils";

const setup = (props = {}) => {
  const component = shallow(<Login {...props} />).shallow();
  return component;
};

describe("Login component", () => {
  let component;

  beforeEach(() => {
    component = setup();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttribute(component, "loginContainer");
    expect(wrapper.length).toBe(1);
  });

  it("Should render an h1", () => {
    const wrapper = findByTestAttribute(component, "loginTitle");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a login form", () => {
    const wrapper = findByTestAttribute(component, "loginForm");
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

  it("Should render a submit button", () => {
    const wrapper = findByTestAttribute(component, "loginSubmitButton");
    expect(wrapper.length).toBe(1);
  });
});
