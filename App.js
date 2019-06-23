import React from 'react';

import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';


import Temporada from './src/pages/temporada';
import Pilotos from './src/pages/pilotos';
import Construtores from './src/pages/construtor'
import Results from './src/pages/results'
import Circuitos from './src/pages/circuito'
import Home from './home';
import Circuito from './src/pages/circuito';

const AppNavigator = createStackNavigator({
  Temporada: {
    screen: Temporada,
  },
  Home: {
    screen: Home,
  },
  Pilotos: {
    screen: Pilotos
  },
  Construtores: {
    screen: Construtores
  },
  Results: {
    screen: Results
  },
  Circuito:{
    screen:Circuito
  }
},
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#FFD700',
      },
      headerTintColor: '#000',
      headerBackTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });

export default createAppContainer(AppNavigator)