import React from 'react';
import config from './tamagui.config'
import { TamaguiProvider } from 'tamagui'

const ThemeProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <TamaguiProvider config={config}>
      {children}
    </TamaguiProvider>
  );
}

export default ThemeProvider;