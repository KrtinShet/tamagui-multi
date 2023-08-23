import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { Paragraph, TamaguiProvider, Theme, View } from 'tamagui'
import { customToken } from './themes';
import config from './tamagui.config'


export default function App() {
  const colorScheme = useColorScheme()
  console.log("Color scheme", colorScheme)

  const [loaded] = useFonts({
    PublicSans: require('./assets/fonts/PublicSans/PublicSans-Regular.ttf'),
    PublicSansBold: require('./assets/fonts/PublicSans/PublicSans-Bold.ttf'),
    PublicSansExtraBold: require('./assets/fonts/PublicSans/PublicSans-ExtraBold.ttf'),
    PublicSansSemiBold: require('./assets/fonts/PublicSans/PublicSans-SemiBold.ttf'),
  })

  let backgroundColor = useMemo(() => {
    if (colorScheme === 'dark') {
      return customToken.color.backgroundDark
    } else {
      return customToken.color.backgroundLight
    }
  }, [colorScheme])

  if (!loaded) {
    return null
  }

  return (
    <TamaguiProvider config={config}>
      <View f={1} backgroundColor={backgroundColor}>
        <Theme name={colorScheme}>
          <Paragraph >
            Marketing
          </Paragraph>
          <StatusBar style="auto" />
        </Theme>
      </View>
    </TamaguiProvider>
  )
}


