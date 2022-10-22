import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import UsersScreen from './UsersScreen';

const createTestProps = (props: Object) => ({
  navigation: {
    state: {params: {}},
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn(),
    setOptions: jest.fn(),
  },
  ...props,
});

describe('UsersScreen', () => {
  let props = {};
  function renderUsersScreen(temprops) {
    return <UsersScreen {...temprops} />;
  }

  beforeEach(() => {
    props = createTestProps({});
  });

  it('render title User List', () => {
    const screen = render(renderUsersScreen(props));
    const title = screen.getByText('User List');
    expect(title).toBeTruthy();
  });
});
