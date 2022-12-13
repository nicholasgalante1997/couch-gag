import { create } from '@storybook/theming';
import { _lasercat_ } from '@nickgdev/couch-gag-common-lib';

export default create({
  base: 'dark',

  colorPrimary: _lasercat_.prp_dark_2,
  colorSecondary: 'rgba(0,0,0,0.9)',

  // UI
  appBg: _lasercat_.prp_dark_2,
  appContentBg: _lasercat_.prp_dark_2,
  appBorderColor: _lasercat_.prp_dark_2,
  appBorderRadius: 2,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: _lasercat_.bl_light,
  textInverseColor: _lasercat_.pk_lightest,

  // Toolbar default and active colors
  barTextColor: _lasercat_.bl_light,
  barSelectedColor: _lasercat_.pk_lightest,
  barBg: _lasercat_.prp_dark_2,

  // Form colors
  inputBg: 'white',
  inputBorder: 'black',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'couch-gag [cyberwave-theme]',
});