// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-localstorage-mock';
import './jestShims.js';
// './jestShims.js' MUST be imported before 'enzyme-adapter-react-16'

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const createElementNSOrig = global.document.createElementNS;
global.document.createElementNS = function(namespaceURI, qualifiedName) {
  if (namespaceURI === 'http://www.w3.org/2000/svg' && qualifiedName === 'svg') {
    const element = createElementNSOrig.apply(this, arguments);
    element.createSVGRect = function() { };
    return element;
  }
  return createElementNSOrig.apply(this, arguments);
};
