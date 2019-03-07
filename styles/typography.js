import Typography from 'typography';

export const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.8,
  headerFontFamily: ['Lato', 'sans-serif'],
  bodyFontFamily: ['Lato', 'sans-serif'],
  googleFonts: [{ name: 'Lato', styles: ['400', '700'] }],
  overrideThemeStyles: ({ rhythm }) => ({
    'h2,h3': {
      lineHeight: rhythm(1.2),
    },
    li: {
      marginBottom: 0,
    },
  }),
});
