/* eslint-disable import/first */

import React from "react";
import { Home } from "./Home";
import { shallow } from "enzyme";
// eslint-disable-next-line no-unused-vars
import firebase from "firebase";

jest.mock('firebase', () => ({
  firestore: jest.fn().mockReturnValue({
    settings: jest.fn(),
    enablePersistence: jest.fn(),
  }),
  apps: [],
  initializeApp: jest.fn(),
}));

describe("Home component", () => {
  let props = {}

  beforeEach(() => {
    props = {
      loadSavedPages: jest.fn(),
      navigateToBuildPages: jest.fn(),
      slice: {
        loading: false,
        entities: {
          byId: {'abc': {id: 'abc'}, 'xyz': {id: 'xyz'}},
          ids: ['abc', 'xyz'],
        }
      }
    }
  });

  it("should be truthy", () => {
    const wrapper = shallow(<Home { ...props } />);
    expect(wrapper).toBeTruthy();
  });

  it("should call `navigateToBuildPages`", () => {
    const navigateToBuildPages = jest.fn();
    const wrapper = shallow(<Home { ...props } navigateToBuildPages={navigateToBuildPages} />);
    wrapper
        .find('.edit-link').first()
        .find('a').first()
        .simulate('click', { 
          preventDefault: () => {} 
        });
    expect(navigateToBuildPages.mock.calls.length).toBe(1);
  });
});
