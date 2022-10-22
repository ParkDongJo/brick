import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, fireEvent, screen} from '@testing-library/react-native';

import TabNavigator from './TabNavigator';

describe('TabNavigator', () => {
  function renderApp() {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
  }
  test('should render title ', async () => {
    render(renderApp());
    const buttonText = await screen.findByText('Move to Detail');
    expect(buttonText).toBeTruthy();
  });

  test('when click on button, move to detail page', async () => {
    render(
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>,
    );
    const toClick = await screen.findByText('Move to Detail');
    fireEvent.press(toClick);

    const headerImage = await screen.findByText('TEST');
    const items = await screen.getAllByText('ITEM');

    expect(headerImage).toBeTruthy();
    expect(items[0]).toBeTruthy();
  });
});
