/** Mirrors the inline `tailwind.config` the CDN build used, so the vendored
    stylesheet renders identically to the reviewed demo.

    Content includes index.html because the board's markup lives inside
    JavaScript template literals in that file's inline script. Tailwind scans
    raw file text, so those class names are found there. */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: { serif: ['Georgia', 'Cambria', 'serif'] },
      colors: {
        lyceum: {
          50:  '#f6f4ef',
          100: '#ece6da',
          700: '#7c6f53',
          800: '#5f553f',
          900: '#403a2c',
        },
      },
    },
  },
};
