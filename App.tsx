import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme, Text } from 'react-native'
import { Button, Checkbox, Input, Paragraph, TamaguiProvider, Theme, View } from 'tamagui'
// import { customToken } from './themes';
import config from "./Themes/tamagui.config";


export default function App() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light")
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (colorScheme === 'dark') {
      setThemeMode("dark")
    } else {
      setThemeMode("light")
    }
  }, [])

  console.log("Color scheme", themeMode)


  const toggleTheme = () => {
    if (themeMode === "light") {
      setThemeMode("dark")
    } else {
      setThemeMode("light")
    }
  }

  const [loaded] = useFonts({
    PublicSans: require('./assets/fonts/PublicSans/PublicSans-Regular.ttf'),
    PublicSansBold: require('./assets/fonts/PublicSans/PublicSans-Bold.ttf'),
    PublicSansExtraBold: require('./assets/fonts/PublicSans/PublicSans-ExtraBold.ttf'),
    PublicSansSemiBold: require('./assets/fonts/PublicSans/PublicSans-SemiBold.ttf'),
  })


  if (!loaded) {
    return null
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={themeMode} >
        <View f={1} display='flex' flexDirection='column' backgroundColor={"$background"} jc='center' ai='center' ac='center' >
          <Paragraph mb="$14">
            {themeMode} Mode
          </Paragraph>
          <Button onPress={toggleTheme}>Change Theme</Button>
          <View mt={"$1"}>
            {/* CheckBox */}
            <Checkbox size="$4">
              <Checkbox.Indicator>
                <Text>
                  ✅
                </Text>
              </Checkbox.Indicator>
            </Checkbox>
            {/* Input */}
            <Input size="$4" borderWidth={2} />
          </View>
          <StatusBar style="auto" />
        </View>
      </Theme>
    </ TamaguiProvider>
  )
}


