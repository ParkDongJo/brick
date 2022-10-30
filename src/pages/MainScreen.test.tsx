import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import {waitFor} from '@testing-library/react';
import MainScreen, {Props} from './MainScreen';

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

describe('MainScreen render', () => {
  let props = {};

  function renderMainScreen(temprops: Props) {
    return <MainScreen {...temprops} />;
  }

  beforeEach(() => {
    props = createTestProps({});
    // jest.useFakeTimers();
  });

  it('should render title Main Screen', async () => {
    const screen = render(renderMainScreen(props));
    const title = screen.getByText('Main Screen');
    await waitFor(async () => {
      expect(title).not.toBeNull();
    });
  });

  it('should render title Move to Detail', async () => {
    const screen = render(renderMainScreen(props));
    const title = screen.getByText('Move to Detail');
    await waitFor(async () => {
      expect(title).toBeTruthy();
    });
  });
});
