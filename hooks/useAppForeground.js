import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

export function useAppForeground() {
  const appState = useRef(AppState.currentState);
  const [returnedToForeground, setReturnedToForeground] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      const wasInBackground = appState.current === 'background' || appState.current === 'inactive';
      if (wasInBackground && nextState === 'active') {
        setReturnedToForeground(true);
      }
      appState.current = nextState;
    });

    return () => subscription.remove();
  }, []);

  const clearForegroundMessage = () => setReturnedToForeground(false);
  return { returnedToForeground, clearForegroundMessage };
}