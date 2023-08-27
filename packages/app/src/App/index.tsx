import React from "react";
import { Text } from "react-native";
import FontProvider from "../Providers/FontProvider/FontProvider";
import ThemeProvider from "../Providers/ThemeProvider";

const App: React.FC<{}> = () => {
  return (
    <>
      <FontProvider>
        <ThemeProvider>
          <Text style={{ fontFamily: "PublicSans" }}> Big World K Marketing</Text>
          <Text style={{ fontFamily: "PublicSans" }}>
            Marketing Fonts in PublicSans
          </Text>
        </ThemeProvider>
      </FontProvider>
    </>
  );
};

export default App;