import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import GlobalStyles from '../src/styles/GlobalStyled';
import { Preview } from '@storybook/react';

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles,
  }),
];

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Atoms', 'Molecules', 'Math', 'English'],
      },
    },
  },
};

export default preview;
