/* eslint-disable import/first */

import React from "react";
import { LandingPage } from "./LandingPage";
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

describe("LandingPage component", () => {
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
      },
      match: {
        params: {
          id: 'abc'
        }
      }
    }
  });

  it("should be truthy", () => {
    const wrapper = shallow(<LandingPage { ...props } />);
    expect(wrapper).toBeTruthy();
  });
});
