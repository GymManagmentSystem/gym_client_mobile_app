import {Text, View} from 'react-native';
import {ThemeProvider} from './src/context/ThemeContext';
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  return (
    <ThemeProvider>
      <LoginScreen />
    </ThemeProvider>
  );
};

export default App;
