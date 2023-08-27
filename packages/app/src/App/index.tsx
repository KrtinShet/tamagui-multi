import React from "react";
import { Text, Button } from "tamagui";
import FontProvider from "../Providers/FontProvider/FontProvider";
import ThemeProvider from "../Providers/ThemeProvider";

const App: React.FC<{}> = () => {
  return (
    <>
      <FontProvider>
        <ThemeProvider>
          <Text fontFamily={"$body"}>
            Marketing, Fonts is PublicSans
          </Text>
          <Button size="$6">Lorem ipsum</Button>
        </ThemeProvider>
      </FontProvider>
    </>
  );
};

export default App;