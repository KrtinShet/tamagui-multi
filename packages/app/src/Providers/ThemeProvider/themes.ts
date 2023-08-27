import { createTheme } from 'tamagui';
import { tokens } from './tokens';


type GenericThemeType = {
  background: any
  backgroundFocus: any
  backgroundHover: any
  backgroundPress: any
  backgroundStrong: any
  backgroundTransparent: any
  borderColor: any
  borderColorFocus: any
  borderColorHover: any
  borderColorPress: any
  color: any
  colorFocus: any
  colorHover: any
  colorPress: any
  colorTransparent: any
  placeholderColor: any
  shadowColor: any
  shadowColorFocus: any
  shadowColorHover: any
  shadowColorPress: any
}

const light = createTheme<GenericThemeType>({
  background: tokens.color.white,
  backgroundFocus: tokens.color.focus,
  backgroundHover: tokens.color.hover,
  backgroundPress: tokens.color.selected,
  backgroundStrong: tokens.color.grey100,
  backgroundTransparent: tokens.color.transparent,
  borderColor: tokens.color.divider,
  borderColorFocus: tokens.color.grey600,
  borderColorHover: tokens.color.hover,
  borderColorPress: tokens.color.selected,
  color: tokens.color.grey800,
  colorFocus: tokens.color.grey800,
  colorHover: tokens.color.grey800,
  colorPress: tokens.color.grey800,
  colorTransparent: tokens.color.transparent,
  placeholderColor: tokens.color.grey500,
  shadowColor: tokens.color.shadowLight,
  shadowColorFocus: tokens.color.shadowLight,
  shadowColorHover: tokens.color.shadowLight,
  shadowColorPress: tokens.color.shadowLight,
});

const dark = createTheme<GenericThemeType>({
  background: tokens.color.grey900,
  backgroundFocus: tokens.color.focus,
  backgroundHover: tokens.color.hover,
  backgroundPress: tokens.color.selected,
  backgroundStrong: tokens.color.grey100,
  backgroundTransparent: tokens.color.transparent,
  borderColor: tokens.color.divider,
  borderColorFocus: tokens.color.grey500,
  borderColorHover: tokens.color.hover,
  borderColorPress: tokens.color.selected,
  color: tokens.color.white,
  colorFocus: tokens.color.grey800,
  colorHover: tokens.color.grey800,
  colorPress: tokens.color.grey800,
  colorTransparent: tokens.color.transparent,
  placeholderColor: tokens.color.grey600,
  shadowColor: tokens.color.shadowDark,
  shadowColorFocus: tokens.color.shadowDark,
  shadowColorHover: tokens.color.shadowDark,
  shadowColorPress: tokens.color.shadowDark,
});


type BaseTheme = typeof light & typeof dark;

// 1. to get ThemeNames/Theme, first create an object with all themes
const allThemes = {
  dark,
  light,
}

// 2. then get the name type
type ThemeName = keyof typeof allThemes

// 3. then, create a Themes type that explicitly maps ThemeName => BaseTheme
type Themes = {
  [key in ThemeName]: BaseTheme
}

// 4. finally, export it with the stricter type
export const themes: Themes = allThemes