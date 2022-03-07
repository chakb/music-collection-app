/* eslint-disable @typescript-eslint/no-var-requires */
import { Platform } from 'react-native';

const showToast = (message: string) => {
  // react native root toast is not compatible with latests versions of React Native Web
  if (Platform.OS !== 'web') {
    // eslint-disable-next-line global-require
    const Toast = require('react-native-root-toast');
    Toast.default.show(message, {
      duration: 2000,
      position: -20,
      shadow: true,
      animation: true,
    });
  } else {
    // eslint-disable-next-line no-console
    console.warn('Toast:', message);
  }
};

export default showToast;
