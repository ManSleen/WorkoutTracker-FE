import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
// import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});
