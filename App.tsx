import React from 'react';
import {Amplify} from 'aws-amplify';
import awsmobile from './src/aws-exports';
import MainNavigation from './src/Navigation';
import {DataStore} from '@aws-amplify/datastore';
// Amplify.Logger.LOG_LEVEL = 'DEBUG';
// Amplify.configure(awsmobile),
DataStore.configure(awsmobile);
const App = () => {
  return <MainNavigation />;
};

export default App;
