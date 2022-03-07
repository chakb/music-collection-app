import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import { StateProvider } from './src/state';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <StateProvider>
      <RootSiblingParent>
        <SafeAreaProvider>
          <StatusBar />
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </RootSiblingParent>
    </StateProvider>
  );
}
