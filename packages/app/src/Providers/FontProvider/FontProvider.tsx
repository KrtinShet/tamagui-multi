import { useFonts } from "expo-font";
import React from "react";

export default function FontProvider({ children }: {
  children: React.ReactNode;
}) {
  const [loaded] = useFonts({
    // PublicSans: require("../../assets/fonts/PublicSans/PublicSans-Regular.ttf"),
    // PublicSansBold: require("../../assets/fonts/PublicSans/PublicSans-Bold.ttf"),
    // PublicSansExtraBold: require("../../assets/fonts/PublicSans/PublicSans-ExtraBold.ttf"),
    // PublicSansSemiBold: require("../../assets/fonts/PublicSans/PublicSans-SemiBold.ttf"),
    PublicSans: "https://fonts.gstatic.com/s/a/a43ba20728262f80018c0f9cb41348b11a7a0f7ce4cec9524908f09a1ba9fc10.ttf",
    PublicSansBold: "https://fonts.gstatic.com/s/a/1ba049c8f5505f644eeedde917f31244fbce5797f1daa0bc6ad7dee626cdd493.ttf",
    PublicSansExtraBold: "https://fonts.gstatic.com/s/a/b64cde6ef854e50377acd226084a3b56da54c708c4b6b56b0e6efdbd6725e2eb.ttf",
    PublicSansSemiBold: "https://fonts.gstatic.com/s/a/a88f82d3a4c9ff1ef0ddd06d1f62a10636942fb2461837a8555c5a0c6c362c84.ttf",
  });

  if (!loaded) {
    return null;
  }

  return <>{children}</>;

}