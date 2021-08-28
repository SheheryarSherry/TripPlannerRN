import React from 'react';
import Router from './routes';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  return (
    // WRAP ALL PAGES IN NAVIGATIONCONTAINER
    <NavigationContainer>
      {/* PAGES ROUTES */}
      <Router />
    </NavigationContainer>
  );
};

export default App;
