import React from "react";
import { shallow } from "enzyme";
import { NavBar } from "./NavBar";
import { findByTestAttribute } from "../../../testUtils";

const setup = (props = {}) => {
  const component = shallow(<NavBar {...props} />).shallow();
  return component;
};

describe("NavBar component", () => {
  let component;

  beforeEach(() => {
    component = setup();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttribute(component, "headerComponent");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a title", () => {
    const wrapper = findByTestAttribute(component, "appTitle");
    expect(wrapper.length).toBe(1);
  });
});
