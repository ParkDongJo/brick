import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import App, {Props} from './App';

describe('App render', () => {
  const props = {};

  function renderApp(temprops) {
    return <App {...temprops} />;
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render title Move to Detail', () => {
    const screen = render(renderApp(props));
    const title = screen.getByText('Move to Detail');
    expect(title).toBeTruthy();
  });
});
