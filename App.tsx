import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { Paragraph, TamaguiProvider, Theme, View } from 'tamagui'
import { themes } from './themes';
import config from './tamagui.config'

const style = (theme: "light" | "dark") => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themes[theme].background.toString(),
      color: themes[theme].color.valueOf(),
      width: 'auto',
      justifyContent: "center",
      alignItems: "center"
    }
  });
}


export default function App() {
  const colorScheme = useColorScheme()

  const [loaded] = useFonts({
    PublicSans: require('./assets/fonts/PublicSans/PublicSans-Regular.ttf'),
    PublicSansBold: require('./assets/fonts/PublicSans/PublicSans-Bold.ttf'),
    PublicSansExtraBold: require('./assets/fonts/PublicSans/PublicSans-ExtraBold.ttf'),
    PublicSansSemiBold: require('./assets/fonts/PublicSans/PublicSans-SemiBold.ttf'),
  })


  const styles = useMemo(() => style(colorScheme === 'dark' ? 'dark' : 'light'), [colorScheme])



  if (!loaded) {
    return null
  }

  return (
    <TamaguiProvider config={config}>
      <View style={styles.container}>
        <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
          <Paragraph >
            Marketing
          </Paragraph>
          <StatusBar style="auto" />
        </Theme>
      </View>
    </TamaguiProvider>
  )
}


