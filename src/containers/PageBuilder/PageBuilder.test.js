/* eslint-disable import/first */

import React from "react";
import { PageBuilder } from "./PageBuilder";
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

describe("PageBuilder component", () => {
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
      router: {
        location: {
          query: {
            storeId: 'abc'
          }
        }
      }
    }
  });

  it("should be truthy", () => {
    const wrapper = shallow(<PageBuilder { ...props } />);
    expect(wrapper).toBeTruthy();
  });
});
