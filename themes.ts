import { tokens } from '@tamagui/themes'
import { createTheme, createTokens } from 'tamagui';
import * as Colors from './utils/ColorConstants'

export const customToken = createTokens({
  color: {
    ...tokens.color,
    "primaryLighter": Colors.PRIMARY_LIGHTER,
    "primaryLight": Colors.PRIMARY_LIGHT,
    "primary": Colors.PRIMARY,
    "primaryDark": Colors.PRIMARY_DARK,
    "primaryDarker": Colors.PRIMARY_DARKER,

    "secondaryLighter": Colors.SUCCESS_LIGHTER,
    "secondaryLight": Colors.SUCCESS_LIGHT,
    "secondary": Colors.SECONDARY,
    "secondaryDark": Colors.SECONDARY_DARK,
    "secondaryDarker": Colors.SECONDARY_DAKER,

    "infoLighter": Colors.INFO_LIGHTER,
    "infoLight": Colors.INFO_LIGHT,
    "info": Colors.INFO,
    "infoDark": Colors.INFO_DARK,
    "infoDarker": Colors.INFO_DARKER,

    "successLighter": Colors.SUCCESS_LIGHTER,
    "successLight": Colors.SUCCESS_LIGHT,
    "success": Colors.SUCCESS,
    "successDark": Colors.SUCCESS_DARK,
    "successDarker": Colors.SUCCESS_DARKER,

    "warningLighter": Colors.WARNING_LIGHTER,
    "warningLight": Colors.WARNING_LIGHT,
    "warning": Colors.WARNING,
    "warningDark": Colors.WARNING_DARK,
    "warningDarker": Colors.WARNING_DARKER,

    "errorLighter": Colors.ERROR_LIGHTER,
    "errorLight": Colors.ERROR_LIGHT,
    "error": Colors.ERROR,
    "errorDark": Colors.ERROR_DARK,
    "errorDarker": Colors.ERROR_DARKER,

    "white": Colors.WHITE,
    "black": Colors.BLACK,

    "grey100": Colors.grey100,
    "grey200": Colors.grey200,
    "grey300": Colors.grey300,
    "grey400": Colors.grey400,
    "grey500": Colors.grey500,
    "grey600": Colors.grey600,
    "grey700": Colors.grey700,
    "grey800": Colors.grey800,
    "grey900": Colors.grey900,

    "textPrimaryLight": Colors.grey800,
    "textSecondaryLight": Colors.grey600,
    "textDisabledLight": Colors.grey500,
    "textPrimaryDark": Colors.WHITE,
    "textSecondaryDark": Colors.grey500,
    "textDisabledDark": Colors.grey600,

    "divider": `${Colors.grey500}18`,
    "backgroundLight": Colors.BACKGROUND_LIGHT,
    "backgroundPaperLight": Colors.BACKGROUND_PAPER_LIGHT,
    "backgroundNeturalLight": Colors.BACKGROUND_NETURAL_LIGHT,
    "backgroundDark": Colors.BACKGROUND_DARK,
    "backgroundPaperDark": Colors.BACKGROUND_PAPER_DARK,
    "backgroundNeturalDark": Colors.BACKGROUND_NETURAL_DARK,

    "backgroundLightDisabled": Colors.BACKGROUND_LIGHT_DISABLED,
    "backgroundDarkDisabled": Colors.BACKGROUND_DARK_DISABLED,

    "lightActive": Colors.LIGHT_ACTIVE,
    "lightHover": Colors.LIGHT_HOVER,
    "lightSelected": Colors.LIGHT_SELECTED,
    "lightDisabled": Colors.LIGHT_DISABLED,
    "lightFocus": Colors.LIGHT_FOCUS,

    "darkActive": Colors.DARK_ACTIVE,
    "darkHover": Colors.DARK_HOVER,
    "darkSelected": Colors.DARK_SELECTED,
    "darkDisabled": Colors.DARK_DISABLED,
    "darkFocus": Colors.DARK_FOCUS,


  },
  radius: { ...tokens.radius },
  size: { ...tokens.size },
  space: { ...tokens.space },
  zIndex: { ...tokens.zIndex },
})



type GenericTheme = {
  background: string
  backgroundFocus: string
  backgroundHover: string
  backgroundPress: string
  backgroundStrong: string
  backgroundTransparent: string
  borderColor: string
  borderColorFocus: string
  borderColorHover: string
  borderColorPress: string
  color: string
  colorFocus: string
  colorHover: string
  colorPress: string
  colorTransparent: string
  placeholderColor: string
  shadowColor: string
  shadowColorFocus: string
  shadowColorHover: string
  shadowColorPress: string
}

const lightTheme = createTheme({
  background: customToken.color.backgroundLight,
  backgroundFocus: customToken.color.lightFocus,
  backgroundHover: customToken.color.lightHover,
  backgroundPress: customToken.color.lightActive,
  backgroundStrong: customToken.color.lightActive,
  borderColor: customToken.color.divider,
  color: customToken.color.textPrimaryLight,
  shadowColor: "rgba(145, 158, 171, 0.16)",
  shadowColorFocus: "rgba(145, 158, 171, 0.16)",
  shadowColorHover: "rgba(145, 158, 171, 0.16)",
  shadowColorPress: "rgba(145, 158, 171, 0.16)",
});
const darkTheme = createTheme({
  background: customToken.color.backgroundDark,
  backgroundFocus: customToken.color.darkFocus,
  backgroundHover: customToken.color.darkHover,
  backgroundPress: customToken.color.darkActive,
  backgroundStrong: customToken.color.darkActive,
  borderColor: customToken.color.divider,
  color: customToken.color.textPrimaryDark,
  shadowColor: "rgba(0, 0, 0, 0.16)",
  shadowColorFocus: "rgba(0, 0, 0, 0.16)",
  shadowColorHover: "rgba(0, 0, 0, 0.16)",
  shadowColorPress: "rgba(0, 0, 0, 0.16)",
});
type BaseTheme = typeof lightTheme

const allThemes = {
  dark: darkTheme,
  light: lightTheme,
}

type ThemeName = keyof typeof allThemes

// 3. then, create a Themes type that explicitly maps ThemeName => BaseTheme
type Themes = {
  [key in ThemeName]: BaseTheme
}

// 4. finally, export it with the stricter type
export const themes: Themes = allThemes