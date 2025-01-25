/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#958475';
const tintColorDark = '#F3F1EB';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F3F1EB',
    tint: tintColorLight,
    icon: '#958475',
    tabIconDefault: '#958475',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#958475',
    tint: tintColorDark,
    icon: '#F2E8D3',
    tabIconDefault: '#F2E8D3',
    tabIconSelected: tintColorDark,
  },
};
