import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/context/ThemeContext';
import MainStackNavigation from './navigation/stackNavigation/MainStackNavigation';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
