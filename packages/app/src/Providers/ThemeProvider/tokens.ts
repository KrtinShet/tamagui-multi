import { COMMON, ERROR, GREY, INFO, PRIMARY, SECONDARY, SUCCESS, WARNING } from './palette';
import { createTokens } from 'tamagui';
import { tokens as TTokens } from '@tamagui/themes'
import alpha from '@chaiwallet/shared/src/alpha';

export const tokens = createTokens({
  color: {
    "primaryLighter": PRIMARY.lighter,
    "primaryLight": PRIMARY.light,
    "primary": PRIMARY.main,
    "primaryDark": PRIMARY.dark,
    "primaryDarker": PRIMARY.darker,
    "primary8": alpha(PRIMARY.main, 0.08),
    "primary12": alpha(PRIMARY.main, 0.12),
    "primary16": alpha(PRIMARY.main, 0.16),
    "primary24": alpha(PRIMARY.main, 0.24),
    "primary32": alpha(PRIMARY.main, 0.32),
    "primary48": alpha(PRIMARY.main, 0.48),

    "secondaryLighter": SECONDARY.lighter,
    "secondaryLight": SECONDARY.light,
    "secondary": SECONDARY.main,
    "secondaryDark": SECONDARY.dark,
    "secondaryDarker": SECONDARY.darker,
    "secondary8": alpha(SECONDARY.main, 0.08),
    "secondary12": alpha(SECONDARY.main, 0.12),
    "secondary16": alpha(SECONDARY.main, 0.16),
    "secondary24": alpha(SECONDARY.main, 0.24),
    "secondary32": alpha(SECONDARY.main, 0.32),
    "secondary48": alpha(SECONDARY.main, 0.48),

    "infoLighter": INFO.lighter,
    "infoLight": INFO.light,
    "info": INFO.main,
    "infoDark": INFO.dark,
    "infoDarker": INFO.darker,
    "info8": alpha(INFO.main, 0.08),
    "info12": alpha(INFO.main, 0.12),
    "info16": alpha(INFO.main, 0.16),
    "info24": alpha(INFO.main, 0.24),
    "info32": alpha(INFO.main, 0.32),
    "info48": alpha(INFO.main, 0.48),

    "successLighter": SUCCESS.lighter,
    "successLight": SUCCESS.light,
    "success": SUCCESS.main,
    "successDark": SUCCESS.dark,
    "successDarker": SUCCESS.darker,
    "success8": alpha(SUCCESS.main, 0.08),
    "success12": alpha(SUCCESS.main, 0.12),
    "success16": alpha(SUCCESS.main, 0.16),
    "success24": alpha(SUCCESS.main, 0.24),
    "success32": alpha(SUCCESS.main, 0.32),
    "success48": alpha(SUCCESS.main, 0.48),

    "warningLighter": WARNING.lighter,
    "warningLight": WARNING.light,
    "warning": WARNING.main,
    "warningDark": WARNING.dark,
    "warningDarker": WARNING.darker,
    "warning8": alpha(WARNING.main, 0.08),
    "warning12": alpha(WARNING.main, 0.12),
    "warning16": alpha(WARNING.main, 0.16),
    "warning24": alpha(WARNING.main, 0.24),
    "warning32": alpha(WARNING.main, 0.32),
    "warning48": alpha(WARNING.main, 0.48),

    "errorLighter": ERROR.lighter,
    "errorLight": ERROR.light,
    "error": ERROR.main,
    "errorDark": ERROR.dark,
    "errorDarker": ERROR.darker,
    "error8": alpha(ERROR.main, 0.08),
    "error12": alpha(ERROR.main, 0.12),
    "error16": alpha(ERROR.main, 0.16),
    "error24": alpha(ERROR.main, 0.24),
    "error32": alpha(ERROR.main, 0.32),
    "error48": alpha(ERROR.main, 0.48),

    "grey100": GREY[100],
    "grey200": GREY[200],
    "grey300": GREY[300],
    "grey400": GREY[400],
    "grey500": GREY[500],
    "grey600": GREY[600],
    "grey700": GREY[700],
    "grey800": GREY[800],
    "grey900": GREY[900],

    "white": COMMON.common.white,
    "black": COMMON.common.black,

    "divider": COMMON.divider,
    "transparent": "rgba(0, 0, 0, 0)",


    "hover": COMMON.action.hover,
    "selected": COMMON.action.selected,
    "disabled": COMMON.action.disabled,
    "disabledBackground": COMMON.action.disabledBackground,
    "focus": COMMON.action.focus,

    "shadowLight": "rgba(145, 158, 171, 0.16)",
    "shadowDark": "rgba(0, 0, 0, 0.16)",



  },
  space: {
    ...TTokens.space
  },
  size: {
    ...TTokens.size
  },
  radius: {
    ...TTokens.radius,
    4: 4,
    8: 8,
    12: 12,
    16: 16,
  },
  zIndex: {
    ...TTokens.zIndex,
  }
});