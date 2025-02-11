import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/context/ThemeContext';
import MainStackNavigation from './src/navigation/stackNavigation/MainStackNavigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const client = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <NavigationContainer>
          <MainStackNavigation />
        </NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
