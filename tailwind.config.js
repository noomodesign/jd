const REM_BASE = 10;
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = (px, base = REM_BASE) => `${round(px / base)}rem`;
const stripUnit = (value) => parseInt(value, 10);
const media = (resolution, mobileFirst = true) => {
  if (mobileFirst) {
    return `@media (min-width: ${stripUnit(resolution)}px)`;
  }

  return `@media (max-width: ${stripUnit(resolution) - 1}px)`;
};

const extraSizes = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '15/12': '125%',
  '1/10': '10%',
  '2/10': '20%',
  '3/10': '30%',
  '4/10': '40%',
  '5/10': '50%',
  '6/10': '60%',
  '7/10': '70%',
  '8/10': '80%',
  '9/10': '90%',
};

const SPACING = {
  full: '100%',
  0: 0,
  1: '1px',
  2: '2px',
  3: '3px',
  4: rem(4),
  5: rem(5),
  6: rem(6),
  7: rem(7),
  8: rem(8),
  9: rem(9),
  10: rem(10),
  11: rem(11),
  12: rem(12),
  13: rem(13),
  14: rem(14),
  15: rem(15),
  16: rem(16),
  18: rem(18),
  20: rem(20),
  24: rem(24),
  25: rem(25),
  26: rem(26),
  28: rem(28),
  30: rem(30),
  31: rem(31),
  39: rem(39),
  35: rem(35),
  40: rem(40),
  41: rem(41),
  45: rem(45),
  50: rem(50),
  55: rem(55),
  60: rem(60),
  65: rem(65),
  70: rem(70),
  75: rem(75),
  80: rem(80),
  85: rem(85),
  90: rem(90),
  95: rem(95),
  100: rem(100),
  110: rem(110),
  115: rem(115),
  120: rem(120),
  130: rem(130),
  140: rem(140),
  145: rem(145),
  150: rem(150),
  155: rem(155),
  160: rem(160),
  165: rem(165),
  170: rem(170),
  180: rem(180),
  190: rem(190),
  200: rem(200),
  210: rem(210),
  220: rem(220),
  230: rem(230),
  240: rem(240),
  250: rem(250),
  260: rem(260),
  280: rem(280),
  300: rem(300),
  350: rem(350),
  400: rem(400),
  440: rem(440),
  500: rem(500),
  600: rem(600),
  640: rem(640),
  700: rem(700),
  800: rem(800),
  900: rem(900),
  1000: rem(1000),
};

const OPACITY = {
  0: '0',
  10: '0.1',
  20: '0.2',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  80: '0.8',
  90: '0.9',
  100: '1',
};

module.exports = {
  mode: 'jit',
  important: false,
  content: ['src/assets/js/**/*', 'src/views/**/*', 'src/assets/styles/**/*', '.eleventy.utils.js'],
  theme: {
    container: {
      // padding: {
      //   DEFAULT: '2rem',
      //   desktop: '2.8rem',
      // },
      screens: {},
    },
    extend: {
      opacity: OPACITY,
      borderOpacity: OPACITY,
      height: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
        screen: '100svh',
      }),
      minHeight: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
        screen: '100svh',
      }),
      minWidth: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
      }),
      maxWidth: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
      }),
      spacing: {
        ...SPACING,
        ...extraSizes,
      },
      inset: (theme) => ({
        ...SPACING,
        ...extraSizes,
        ...theme('spacing'),
        ...theme('width'),
      }),
      transitionTimingFunction: {
        linear: 'linear',
        in: 'cubic-bezier(0.25,0.46,0.45,0.94)',
        out: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        'in-out': 'cubic-bezier(0.19,1,0.22,1)',
        back: 'cubic-bezier(0.68,-0.55,0.27,1.55)',
      },
      transitionDelay: {
        0: '0ms',
      },
      zIndex: {
        n1: '-1',
        n2: '-2',
        n3: '-3',
        n4: '-4',
        n5: '-5',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      aspectRatio: {
        none: 0,
        square: '1/1',
        '16/9': '16/9',
        '4/3': '4/3',
        '21/9': '21/9',
      },
      scale: {
        ...OPACITY,
      },
      cursor: {
        draggable: 'draggable',
      },
      animation: {
        'crawling-line': 'crawling-line 15s linear infinite backwards',
        'crawling-line-reverse': 'crawling-line 15s linear infinite reverse',
      },
      keyframes: {
        'crawling-line': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-100%, 0, 0)' },
        },
        link: {
          '0%, 0.1%': {
            transformOrigin: '100% 100%',
            transform: 'scaleX(1)',
          },

          '49.9%': {
            transformOrigin: '100% 100%',
            transform: 'scaleX(0)',
          },

          '50%, 50.1%': {
            transformOrigin: '0 0',
            transform: 'scaleX(0)',
          },

          '100%': {
            transformOrigin: '0 0',
            transform: 'scaleX(1)',
          },
        },
      },
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        DEFAULT: theme('currentColor'),
      }),
      borderWidth: {
        DEFAULT: '0.1rem',
        0: '0',
        2: '0.2rem',
        4: '0.4rem',
        8: '0.8rem',
      },
    },
    colors: {
      current: 'currentColor',
      inherit: 'inherit',
      transparent: 'transparent',
      white: '#E6E6E1',
      black: {
        ...Object.keys(OPACITY).reduce((acc, key) => ({ ...acc, [`${key}0`]: `rgba(0,0,0, ${OPACITY[key]})` }), {}),
        DEFAULT: '#000',
      },
      purple: '#B3B2FB',
      levander: '#9A92D9',
      blue: {
        100: '#B3B2FB',
        DEFAULT: '#0A0521'
      },
      secondary: {
        100: '#E7EFFB',
        100: '#9A92D9',
        DEFAULT: '#913EF7',
      }
    },
    screens: {
      xs: '375px',
      sm: '420px',
      md: '768px',
      lg: '1024px',
      laptop: '1280px',
      xl: '1366px',
      '2xl': '1440px',
      '3xl': '1650px',
      fhd: '1920px',
      'h-min': { raw: '(max-height: 800px) and (min-width: 1280px)' },
      land: { raw: '(orientation: landscape) and (max-width: 1023px)' },
    },
    fontFamily: {
      primary: ['Work Sans, Roboto, serif'],
      secondary: ['Taviraj, sans-serif '],
    },
    fontSize: {
      xxs: rem(10),
      xs: rem(12),
      sm: rem(14),
      base: rem(16),
      md: rem(18),
      lg: rem(20),
      xl: rem(22),
    },
    lineHeight: {
      xs: '0.8',
      none: '1',
      tight: '1.1',
      small: '1.2',
      base: '1.3',
      relaxed: '1.4',
      loose: '1.5',
      high: '1.7',
    },
    letterSpacing: {
      tightest: '-0.07em',
      tighter: '-0.03em',
      tight: '-0.02em',
      normal: '0',
      high: '0.01em',
      higher: '0.02em',
      highest: '0.04em',
    },
    borderRadius: {
      none: '0',
      xs: '0.4rem',
      sm: '0.5rem',
      DEFAULT: '1rem',
      md: '1.2rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      full: '9999px',
      circle: '50%',
    },
  },
  plugins: [
    ({ addComponents, theme, addBase }) => {
      const inputHoverFocus = {
        color: 'currentColor',
        outline: 'none',
      };

      const nonAppearance = {
        appearance: 'none',
        '-moz-appearance': 'none',
        '-webkit-appearance': 'none',
      };

      const headingsGeneral = {
        lineHeight: 1.1,
        fontWeight: theme('fontWeight.normal'),
        marginBottom: '2rem',
        letterSpacing: '0.03em',
        fontFamily: theme('fontFamily.secondary'),
      };

      const BUTTON_STATES = '&:hover, .group:not(.group--no-events):hover &, &.is-active';

      addBase({
        '*': {
          '-webkit-tap-highlight-color': 'transparent',
        },

        'div[style="width: 0; height: 0;"]': {
          position: 'fixed',
          zIndex: -9999,
        },

        sup: {
          top: '-1.5em',
          left: '-0.5em',
          fontSize: '32%',
        },

        sub: {
          fontSize: '30%',
          lineHeight: 0,
          position: 'relative',
          verticalAlign: 'baseline',
          left: '-0.4em',
          bottom: 0,
        },

        html: {
          fontSize: `${REM_BASE}px`,
          marginTop: '0 !important',
          // scrollBehavior: 'initial',

          [media(theme('screens.2xl'))]: {
            fontSize: `${1000 / stripUnit(theme('screens.2xl'))}vw`,
          },
        },

        'html, body': {
          width: '100%',
          minHeight: '100%',
          // 'overscroll-behavior-y': 'none',
        },

        button: {
          '&:focus': {
            outline: 'none',
          },
        },

        body: {
          lineHeight: '1.45',
          fontSize: theme('fontSize.base'),
          fontFamily: theme('fontFamily.primary'),
          fontWeight: theme('fontWeight.normal'),
          '-webkit-font-smoothing': 'antialiased',
          marginRight: '0 !important',
          background: theme('colors.blue.DEFAULT'),
          color: theme('colors.white'),
          letterSpacing: '0.02em',


          [media(theme('screens.2xl'))]: {
            fontSize: theme('fontSize.md'),
          },

        },

        '.cursor-none': {
          '*': {
            cursor: 'none !important',
          },
        },

        '[style^="--aspect"]': {
          aspectRatio: 'var(--aspect)',
        },

        'main[tabindex="-1"]': {
          outline: 'none',
        },

        '[data-lenis-prevent]': {
          overscrollBehavior: 'contain',
        },

        '.is-transitioning, .is-animating': {
          pointerEvents: 'none !important',
          cursor: 'progress !important',
        },

        'h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6': {
          ...headingsGeneral,
        },

        'h1, .h1': {
          fontSize: rem(58),
          fontWeight: 400,

          [media(theme('screens.md'))]: {
            fontSize: rem(74),
          },

          [media(theme('screens.lg'))]: {
            fontSize: rem(98),
          },
        },

        'h2, .h2': {
          fontSize: rem(32),
          letterSpacing: '0.04em',
          fontWeight: 400,
          lineHeight: 1.2,

          [media(theme('screens.md'))]: {
            fontSize: rem(40),
          },

          [media(theme('screens.lg'))]: {
            fontSize: rem(48),
          },
        },

        'h3, .h3': {
          fontSize: rem(22),

          [media(theme('screens.md'))]: {
            fontSize: rem(32),
          },

          [media(theme('screens.lg'))]: {
            fontSize: rem(40),
          },
        },

        'h4, .h4': {
          fontSize: rem(20),

          [media(theme('screens.lg'))]: {
            fontSize: rem(36),
          },
        },

        'h5, .h5': {
          fontSize: rem(18),
        },

        'h6, .h6': {
          fontSize: rem(18),
        },

        p: {
          marginBottom: '1.25em',
        },

        '.text-large': {
          fontSize: rem(18),

          [media(theme('screens.laptop'))]: {
            fontSize: rem(20),
          },
        },

        '.form-group': {
          label: {
            marginBottom: theme('spacing[10]'),
          },
        },

        '.reset-last': {
          '> *:last-child': {
            marginBottom: '0',
          },
        },

        strong: {
          display: 'inline',
          fontWeight: 700,

        },

        '.wysiwyg': {
          'h1, h2, h3': {
            lineHeight: 1.1,
            margin: '4rem 0',

            '&:first-child': {
              marginTop: 0,
            },
          },

          'h1, .h1': {
            fontSize: rem(30),

            [media(theme('screens.laptop'))]: {
              fontSize: rem(40),
            },
          },

          'h2, .h2': {
            fontSize: rem(28),

            [media(theme('screens.laptop'))]: {
              fontSize: rem(36),
            },
          },

          'h3, .h3': {
            fontSize: rem(24),

            [media(theme('screens.laptop'))]: {
              fontSize: rem(34),
            },
          },

          // fontSize: rem(16),
          // lineHeight: 1.25,

          // [media(theme('screens.md'))]: {
          //   fontSize: rem(20),
          // },

          h4: {
            marginTop: '3.5rem',
            opacity: 0.4,

            '&:first-child': {
              marginTop: '0 !important',
            },
          },

          a: {
            transition: 'opacity 0.3s',
            textDecoration: 'underline',

            '&:hover': {
              opacity: 0.5,
            },
          },

          p: {
            marginBottom: '1.5em',

            '&.has-image': {
              paddingRight: 0,
            },
          },

          '.double-images-container': {
            margin: '4rem 0',
            img: {
              width: '100% !important',
              height: 'auto',
            },
          },

          '.image__container': {
            margin: '4rem 0 6rem',

            [media(theme('screens.laptop'))]: {
              marginBottom: '8rem',
            },
          },

          '.image_resized': {
            [media(theme('screens.lg'), false)]: {
              width: '100% !important',
            },
          },

          'ol, ul': {
            margin: '4rem 0',

            '&:first-child': {
              marginTop: 0,
            },
          },

          img: {
            width: '100%',
            height: 'auto',
            borderRadius: '1rem',
          },

          '.image': {
            margin: '4rem 0',

            '.image__container': {
              margin: 0,
            },

            figcaption: {
              opacity: 0.4,
              marginTop: '1rem',

              [media(theme('screens.lg'))]: {
                paddingRight: '6rem',
              },
            },
          },

          '.media': {
            margin: '4rem 0',
          },

          ol: {
            listStyle: 'none',
            counterReset: 'ol-counter',
            marginBottom: '6rem',

            [media(theme('screens.lg'))]: {
              marginBottom: '10rem',
            },

            li: {
              display: 'flex',
              counterIncrement: 'ol-counter',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(0,0,0,0.2)',
              marginBottom: '4rem',

              [media(theme('screens.lg'))]: {
                paddingRight: '7rem',
              },

              '&:last-child': {
                marginBottom: 0,
              },

              '&:before': {
                content: '"0" counter(ol-counter)',
                gridColumn: 'span 1/span 1',
                width: '16.666%',
                display: 'block',
                flexShrink: '0',

                [media(theme('screens.lg'))]: {
                  gridColumn: 'span 2/span 2',
                  width: '33.333%',
                },
              },
            },
          },

          ul: {
            listStyle: 'none',

            '> li': {
              paddingLeft: '2rem',
              position: 'relative',

              '&:before': {
                content: '""',
                width: '1rem',
                height: '1rem',
                borderRadius: '50%',
                background: 'currentColor',
                position: 'absolute',
                border: '0.2rem solid currentColor',
                left: 0,
                top: '0.45em',
              },
            },

            'ul, ol': {
              paddingTop: '1em',
            },

            ul: {
              '> li': {
                '&:before': {
                  backgroundColor: 'transparent',
                },
              },
            },

            li: {
              marginBottom: '1em',

              '&:last-child': {
                marginBottom: 0,
              },
            },
          },

          '&--font-description, &--case': {
            'ol, ul, p, h1, h2,h3,h4': {
              marginBottom: '1.25em',
              paddingRight: 0,
            },
          },

          '&--case': {
            ul: {
              fontSize: rem(18),

              [media(theme('screens.lg'))]: {
                fontSize: rem(20),
              },
            },
          },
        },
      });

      addComponents({
        '.container': {
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '2rem',
          paddingRight: '2rem',

          [media(theme('screens.laptop'))]: {
            paddingLeft: '4rem',
            paddingRight: '4rem',
          },
        },

        '.container-lg': {
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '4rem',
          paddingRight: '4rem',

          [media(theme('screens.laptop'))]: {
            paddingLeft: '11.2rem',
            paddingRight: '11.2rem',
          },
        },

        '.btn__icon': {
          position: 'absolute',
          right: '2px',
          top: '2px',
          left: '2px',
          bottom: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '1.2rem',
          overflow: 'hidden',
          borderRadius: 'inherit',

          '&:before': {
            content: "''",
            borderRadius: '2rem',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            transition: theme('transition.transform'),
            transitionDuration: '0.9s',
            transitionTimingFunction: 'cubic-bezier(0.77,0,0.18,1);',
            zIndex: '-1',
            transform: 'translateX(100%) translateX(-3.8rem)',
          },


          svg: {
            aspectRatio: '1/1',
            width: 'auto',
            height: '100%',
            objectFit: 'contain'
          }
        },

        '.btn': {
          '-webkit-appearance': 'none',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          height: '4.8rem',
          cursor: 'pointer',
          fontSize: rem(16),
          padding: '1.2rem 2.4rem',
          lineHeight: 1.5,
          fontWeight: theme('fontWeight.bold'),
          fontFamily: theme('fontFamily.primary'),
          userSelect: 'none',
          justifyContent: 'center',
          borderRadius: '3rem',
          willChange: 'transform',
          overflow: 'hidden',
          textAlign: 'left',
          position: 'relative',
          transitionProperty: 'background-color, color',
          transitionDuration: '0.3s',
          transitionTimingFunction: 'cubic-bezier(0.77,0,0.18,1);',

          '&:disabled': {
            pointerEvents: 'none',
          },

          '&:focus': {
            outline: 'none',

            // '&:before': {
            //   transform: 'translateY(0) scale(1.05) !important',
            // }
          },

          '&:before': {
            content: '""',
            position: 'absolute',
            left: '-10%',
            right: '-10%',
            top: '-10%',
            bottom: '-10%',
            borderRadius: '50%',
            zIndex: '-1',
            transformOrigin: '100% 100%',
            transform: 'translateY(-100%) scaleX(0.5)',
            transitionProperty: 'transform',
            transitionDuration: '0.4s',
            transformOrigin: 'center',
            transitionTimingFunction: 'cubic-bezier(0.55,0.06,0.68,0.19)',
          },

          [BUTTON_STATES]: {

            '&:before': {
              transitionDuration: '0.8s',
              transform: 'translateY(0) scale(1.05)',
              transitionTimingFunction: 'cubic-bezier(0.65,0.05,0.36,1)',
            },

            '.btn__icon': {
              '&:before': {
                transform: 'none'
              }
            }
          },

          '&--primary': {
            backgroundColor: 'transparent',
            color: theme('colors.cream'),
            borderColor: theme('colors.levander'),
            boxShadow: `inset 0 0 0 2px ${theme('colors.levander')}`,


            [BUTTON_STATES]: {
              color: theme('colors.gray[900]'),
            },

            '&:before': {
              background: 'linear-gradient(84.19deg, #9A92D9 12.24%, #CB9CFA 108.86%)',

            },

            '&:disabled': {
              opacity: 0.4,

              '&:before': {
                transform: 'none !important',
              }
            },

            '&:focus, &:focus-visible': {
              background: theme('colors.levander'),
              outline: '2px solid #fff',
              outlineOffset: '-4px',
            },
          },

          '&--secondary': {
            border: 0,
            borderColor: theme('colors.blue.DEFAULT'),
            backgroundColor: theme('colors.blue.DEFAULT'),
            color: theme('colors.cream'),
            boxShadow: '0px 0px 2rem 0.1rem #474473',

            '&:before': {
              background: theme('colors.purple'),
            },


            [BUTTON_STATES]: {
              color: theme('colors.cream'),
            },

            '&:focus, &:focus-visible': {
              background: theme('colors.blue.DEFAULT'),
              outline: '2px solid #fff',
              outlineOffset: '-4px',
            },
          },
        },

        '.custom-icon': {
          overflow: 'hidden',

          'img,svg': {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          },

          '&--small': {
            width: rem(20),
            height: rem(20),
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',

          },

          '&--large': {
            width: rem(50),
            height: rem(50),
            borderRadius: '50rem',
            padding: rem(14),
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',

            [media(theme('screens.laptop'))]: {
              width: rem(70),
              height: rem(70),
              padding: rem(20),
            },

            '&:before': {
              content: "''",
              position: 'absolute',
              left: 0,
              top: 0,
              borderRadius: 'inherit',
              border: '1px solid currentColor',
              opacity: 0.2,
              width: '100%',
              height: '100%',

            },


          }
        },

        '.social-button': {
          position: 'relative',
          overflow: 'hidden',
          transition: 'color 0.3s cubic-bezier(0.1, 0, 0.3, 1)',

          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            background: theme('colors.black.DEFAULT'),
          },

          '&:before': {
            aspectRatio: '1/1',
            width: '170%',
            top: '50%',
            left: '50%',
            borderRadius: '50%',
            transform: ' translate3d(-50%,-50%,0) scale3d(0,0,1)',
          },

          '&:after': {
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            transition: 'opacity 0.3s',
          },

          '&:hover': {
            color: theme('colors.white'),

            '&:before': {
              transition: 'transform 0.6s cubic-bezier(0.1, 0, 0.3, 1)',
              transform: 'translate3d(-50%,-50%,0) scale3d(1,1,1)',
            },

            '&:after': {
              opacity: 1,
              transitionDuration: '0.01s',
              transitionDelay: '0.6s',
            },

            '.social-button__icon': {
              color: theme('colors.black.DEFAULT'),
              background: theme('colors.white'),
            },
          },
        },

        '.content-block': {
          '> p': {
            color: theme('colors.gray[400]'),
          },

          mark: {
            color: theme('colors.black.DEFAULT'),
            background: 'transparent',
          },
        },

        '.link': {
          position: 'relative',
          cursor: 'pointer',
          display: 'inline-block',
          verticalAlign: 'top',
          transition: 'opacity 0.5s ease-out',

          '&:after': {
            content: "''",
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '1px',
            background: 'currentColor',
            willChange: 'transform',
            transformOrigin: '100% 100%',
            transform: 'scaleX(0)',
            pointerEvents: 'none',
            transitionProperty: theme('transitionProperty.transform'),
            transitionTimingFunction: theme('transitionTimingFunction[out]'),
            transitionDuration: theme('transitionDuration[500]'),
          },

          '&:hover, .group.is-active &, .group:hover &, &.is-active': {
            '&:after': {
              opacity: 1,

              '.no-touchevents &': {
                transformOrigin: '0 0',
                transform: 'scaleX(1)',
                opacity: 1,

              },
            },
          },

          '.group.is-active &, &.is-active, .active &': {
            '&:after': {
              transformOrigin: '0 0',
              transform: 'scaleX(1)',
            },
          },

          '&--secondary': {
            '&:after': {
              opacity: 0.2,
            }
          },

          '&--underline': {
            '&:after': {
              transformOrigin: '0 0',
              transform: 'scaleX(1)',
              animation: 'none',
            },

            '&:hover, .group.is-active &, .group:hover &, &.is-active': {
              '&:after': {
                '.no-touchevents &': {
                  animation: 'link 0.75s forwards',
                },
              },
            },

            '.group.is-active &, &.is-active': {
              '&:after': {
                animation: 'link 0.75s forwards',
              },
            },

            // '.touchevents &': {
            //   textDecoration: 'underline',

            //   '&:after': {
            //     display: 'none',
            //   },
            // },
          },

          '&--underline-default': {
            textDecoration: 'underline',

            '&:after': {
              display: 'none',
            },

            '&:hover, .group.is-active &, .group:hover &, &.is-active': {
              textDecoration: 'none',
            },
          },

          '&--custom': {
            display: 'inline-block',
            verticalAlign: 'top',

            '&:after': {
              bottom: '-0.15em',
            },

            '.link__inner': {
              overflow: 'hidden',
              position: 'relative',
              display: 'block',
            },

            '.link__hover-text, .link__default-text': {
              display: 'block',
              position: 'relative',
              transitionProperty: theme('transitionProperty.transform'),
              transitionTimingFunction: theme('transitionTimingFunction[out]'),
              transitionDuration: theme('transitionDuration[500]'),
            },

            '.link__hover-text': {
              position: 'absolute',
              left: 0,
              top: 0,
              transform: 'translateY(125%)',
            },

            '&:hover, .group.is-active &, .group:hover &, &.is-active': {
              '.no-touchevents &': {
                '.link__hover-text': {
                  transform: 'none',
                },

                '.link__default-text': {
                  transform: 'translateY(-125%)',
                },
              },
            },

            '.group.is-active &, &.is-active': {
              '.link__hover-text': {
                transform: 'none',
              },

              '.link__default-text': {
                transform: 'translateY(-125%)',
              },
            },
          },

          '&--innactive': {
            '&:after': {
              display: 'none',
            },

            '.splitter-row': {
              overflow: 'visible !important',

              '.link': {
                display: 'inline-block !important',
                verticalAlign: 'top',
              },
            },
          },
        },

        'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },

        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },

        '.choices, .js-custom-select': {
          borderRadius: 0,
          borderStyle: 'solid',
          borderWidth: '0.1rem 0',
          height: '4.5rem',
          borderColor: 'rgba(255,255,255, 0.2)',
          color: 'currentColor',
          width: '100%',
          paddingRight: '2rem',
          backgroundColor: 'transparent',
          fontFamily: theme('fontFamily.primary'),
          fontSize: theme('fontSize.base'),
          lineHeight: 1,
          transitionProperty: 'opacity, color, border-color',
          transitionTimingFunction: theme('transitionTimingFunction[in-out]'),
          transitionDuration: theme('transitionDuration[300]'),
          ...nonAppearance,

          '&:hover, &:focus': inputHoverFocus,

          [media(theme('screens.lg'))]: {
            fontSize: rem(20),
          },

          '&[data-has-value="true"]': {
            opacity: 1,
          },

          '&:disabled': {
            pointerEvents: 'none',
          },

          'option[value="placeholder"]': {
            display: 'none',
          },

          '[data-theme="dark"] &': {
            color: 'rgba(255,255,255,0.4)',
            borderColor: 'rgba(255,255,255,0.2)',

            '&.has-value,&:hover, &:focus': {
              color: 'rgba(255,255,255,1)',
            },
          },
          '[data-theme="light"] &': {
            color: 'rgba(10,10,10,0.4)',
            borderColor: 'rgba(10,10,10,0.2)',

            '&.has-value,&:hover, &:focus': {
              color: 'rgba(10,10,10,1)',
            },
          },

          '&--secondary': {
            borderWidth: '1px',
            height: '4rem',
            borderRadius: '1.5rem',
            padding: '0.8rem 1.5rem',
            backgroundPosition: 'calc(100% - 1.5rem) 50%',


            [media(theme('screens.laptop'))]: {
              height: '5.4rem',
              padding: '1rem 2rem',
              backgroundPosition: 'calc(100% - 2rem) 50%',
            },

            '[data-theme="dark"] &': {
              color: 'var(--theme-color)',
              borderColor: 'rgba(255,255,255,0)',
              backgroundColor: 'rgba(255,255,255,0.05)',

              '&.has-value,&:hover, &:focus': {
                borderColor: 'rgba(255,255,255, 0.2)',
              },

            },

            '[data-theme="light"] &': {
              color: 'var(--theme-color)',
              borderColor: 'rgba(10,10,10,0)',
              backgroundColor: 'rgba(10,10,10,0.05)',

              '&.has-value,&:hover, &:focus': {
                borderColor: 'rgba(10,10,10,0.2)',
              },
            },
          }
        },

        select: {
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '100% 50%',
          ...nonAppearance,

          '[data-theme="dark"] &': {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M1 0.725L5.275 5L9.55 0.724999' stroke='%23ffffff'/%3E %3C/svg%3E ")`,
          },
          '[data-theme="light"] &': {
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M1 0.725L5.275 5L9.55 0.724999' stroke='%230A0A0A'/%3E %3C/svg%3E ")`,
          },

          '&.btn': {
            ...nonAppearance,
            backgroundSize: '1rem',
            backgroundPosition: '100% 50%',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'difference',
            backgroundPosition: 'calc(100% - 1.5rem) 50%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M1 0.725L5.275 5L9.55 0.724999' stroke='%23ffffff'/%3E %3C/svg%3E ") !important`,
          },
        },

        'input[type="submit"]': {
          transitionProperty: theme('transitionProperty.colors'),
          transitionTimingFunction: theme('transitionTimingFunction[in-out]'),
          transitionDuration: theme('transitionDuration[300]'),
          backgroundColor: theme('colors.gray[900]'),
          border: `1px solid ${theme('colors.gray[900]')}`,
          color: theme('colors.white'),
          padding: '1rem 1.5rem',
          height: '4rem',
          fontFamily: theme('fontFamily.secondary'),
          fontSize: theme('fontSize.sm'),
          lineHeight: 1,
          textTransform: 'uppercase',
          fontWeight: 500,
          cursor: 'pointer',

          '&:hover': {
            backgroundColor: 'transparent',
            color: theme('colors.gray[900]'),
          },
        },

        '.form-control': {
          position: 'relative',

          '&:after': {
            content: "''",
            position: 'absolute',
            height: '1px',
            width: '100%',
            background: 'linear-gradient(to right, rgba(230, 230, 255, 1) 0%, rgba(230, 230, 255, 0.3) 77%, rgba(230, 230, 255, 1) 100%)'
          }
        },

        "input[type='text'], input[type='password'], input[type='email'], input[type='tel'], textarea, .woocommerce-input-wrapper .choices": {
          width: '100%',
          backgroundColor: 'transparent',
          borderRadius: 0,
          height: '4rem',
          // borderStyle: 'solid',
          // borderWidth: '0 0 1px',
          // borderColor: 'currentColor',
          fontFamily: theme('fontFamily.primary'),
          fontSize: rem(16),
          padding: '1rem 0',
          fontWeight: theme('fontWeight.medium'),
          lineHeight: 1,
          transitionProperty: theme('transitionProperty.colors'),
          transitionTimingFunction: theme('transitionTimingFunction[in-out]'),
          transitionDuration: theme('transitionDuration[300]'),
          ...nonAppearance,

          '&:hover, &:focus, &:not(:placeholder-shown)': inputHoverFocus,

          '&::-internal-input-suggested': {
            fontFamily: "theme('fontFamily.primary') !important",
            fontSize: '2rem !imporant',
          },
        },



        'input::-webkit-search-cancel-button': {
          appearance: 'none',
          // backgroundImage: `url(
          //   "data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M5.91615 5.00007L9.80995 1.10608C10.0634 0.852787 10.0634 0.443255 9.80995 0.189966C9.55667 -0.0633221 9.14714 -0.0633221 8.89386 0.189966L4.99994 4.08396L1.10614 0.189966C0.85274 -0.0633221 0.443335 -0.0633221 0.190051 0.189966C-0.0633505 0.443255 -0.0633505 0.852787 0.190051 1.10608L4.08385 5.00007L0.190051 8.89407C-0.0633505 9.14736 -0.0633505 9.55689 0.190051 9.81018C0.316278 9.93653 0.482246 10 0.648097 10C0.813947 10 0.979797 9.93653 1.10614 9.81018L4.99994 5.91618L8.89386 9.81018C9.0202 9.93653 9.18605 10 9.3519 10C9.51775 10 9.6836 9.93653 9.80995 9.81018C10.0634 9.55689 10.0634 9.14736 9.80995 8.89407L5.91615 5.00007Z' fill='currentColor'/%3E %3C/svg%3E "
          // )`,
          // backgroundSize: 'contain',
          // width: '1rem',
          // height: '1rem',
          // margin: 0,
        },

        'input, textarea': {
          '&::placeholder': {
            transitionProperty: theme('transitionProperty.opacity'),
            transitionTimingFunction: theme('transitionTimingFunction[out]'),
            transitionDuration: theme('transitionDuration[300]'),
            color: 'currentColor',
            opacity: 0.5,

          },

          '&:hover': {
            '&::placeholder': {
              opacity: 1,
            },
          },

          '&:focus': {
            '&::placeholder': {
              opacity: 0,
            },
          },

          '&:not(:placeholder-shown)': {
            opacity: 1,
          },

          '&.is-invalid': {
            borderColor: theme('colors.red'),
          },
        },

        '[data-error-field]': {
          fontSize: rem(12),
          position: 'absolute',
          right: '2rem',
          top: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          color: theme('colors.red'),

          '&:empty': {
            display: 'none',

          }
        },

        // '.input-group': {
        //   position: 'relative',

        //   '&:after': {
        //     content: "''",
        //     position: 'absolute',
        //     left: 0,
        //     bottom: 0,
        //     width: '100%',
        //     height: '1px',
        //     background: 'currentColor',
        //     transformOrigin: '100% 100%',
        //     transitionProperty: theme('transitionProperty.transform'),
        //     transitionTimingFunction: theme('transitionTimingFunction[inOut]'),
        //     transitionDuration: '0.4s',
        //     transform: 'scaleX(0)',
        //   },


        //   '&:hover, &:focus-within': {
        //     // '&:before, &:after': {
        //     //   transform: 'scaleX(1)',
        //     //   transformOrigin: '0 0',
        //     // },


        //     '.input-group__input': {
        //       '&:placeholder': {
        //         opacity: 1,
        //       },
        //     },
        //   },

        //   '&:not(:first-child)': {
        //     '&:before': {
        //       display: 'none',
        //     },

        //     '> input': {
        //       borderTop: 0,
        //     },
        //   },

        //   '&.has-error, &.is-invalid': {
        //     '&:after': {
        //       opacity: 1,
        //       transform: 'scaleX(1)',
        //       transformOrigin: '0 0',
        //       background: theme('colors.red'),
        //     },
        //   },

        //   '.js-custom-select': {
        //     borderTop: 0,
        //   },
        // },

        // '.input-group__input': {
        //   padding: '2rem 2rem 2rem 0',
        //   background: 'none',
        //   border: 0,
        //   outline: 'none',
        //   flexGrow: 1,
        // },

        // '.input-group__submit': {
        //   color: theme('colors.gray[900]'),
        //   transitionProperty: theme('transitionProperty.opacity'),
        //   transitionTimingFunction: theme('transitionTimingFunction[out]'),
        //   transitionDuration: theme('transitionDuration[300]'),

        //   '&:hover': {
        //     opacity: 0.2,
        //   },
        // },

        // '.search-form-input': {
        //   input: {
        //     paddingLeft: '4rem',
        //   },
        // },

        '.custom-control': {
          display: 'flex',
          alignItems: 'center',

          '.wpcf7-list-item': {
            '> label': {
              display: 'flex',
              alignItems: 'center',
            },
          },
        },

        '.custom-control__label, .wc_payment_method label': {
          display: 'inline-block',
          verticalAlign: 'top',
          fontSize: theme('fontSize.base'),
          lineHeight: 1.5,
          cursor: 'pointer',

          img: {
            marginTop: '1rem',
          },
        },

        '.custom-control__input, .wc_payment_method input': {
          ...nonAppearance,
          cursor: 'pointer',
          transitionProperty: theme('transitionProperty.all'),
          transitionTimingFunction: theme('transitionTimingFunction[in-out]'),
          transitionDuration: theme('transitionDuration[300]'),
          width: '2rem',
          height: '2rem',
          display: 'block',
          flexShrink: 0,
          cursor: 'pointer',
          borderRadius: '0.3rem',
          color: theme('colors.gray[900]'),
          border: `1px solid rgba(0,0,0,0.3)`,
          backgroundSize: '0px',
          marginRight: '1rem',
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',

          '&:checked, &:hover': {
            outline: 'none',
          },

          '&:focus': {
            outline: 'none',
          },

          '&:checked': {
            backgroundSize: `8px`,
            borderColor: 'currentColor',
          },
        },

        'input[type="checkbox"]': {
          appearance: 'none',
          backgroundColor: 'transparent',
          margin: 0,
          font: 'inherit',
          color: 'currentColor',
          width: '2rem',
          height: '2rem',
          border: '0.1rem solid currentColor',
          borderRadius: '10rem',
          flexShrink: 0,
          margin: '0 1.5rem 0 0',
          position: 'relative',
          top: '0.15em',
          opacity: 0.8,
          position: 'relative',

          '&:checked': {
            backgroundColor: 'currentColor',
            opacity: 1,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '0.9rem 0.8rem',
            backgroundPosition: '50% 50%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='9' height='8' viewBox='0 0 9 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M1 3.5L3.33333 6L8 1' stroke='%230A0A0A' stroke-width='2' stroke-linecap='round'/%3E %3C/svg%3E ")`,

            '[data-theme="light"] &': {
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='9' height='8' viewBox='0 0 9 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M1 3.5L3.33333 6L8 1' stroke='%23ffffff' stroke-width='2' stroke-linecap='round'/%3E %3C/svg%3E ")`,
            },
          },

          // transform: translateY(-0.075em),
        },

        '.custom-checkbox .custom-control__input': {
          backgroundImage: `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='1024' height='1024' viewBox='0 0 1024 1024'%3E %3Cpath fill='currentColor' d='M16.052 579.335c-11.587 15.322-17.224 34.829-15.848 54.99 1.376 20.163 9.544 38.51 23.084 51.614l328.639 319.864c12.208 11.846 27.347 18.196 43.239 18.196 1.953 0 3.951-0.101 5.948-0.303 17.979-1.814 34.183-11.542 45.635-27.319l562.101-776.777c11.276-15.625 16.558-35.283 14.828-55.394-1.776-20.111-10.255-38.257-24.017-51.11l-102.902-95.969c-28.368-26.412-70.363-21.775-93.714 10.434l-432.606 597.843-173.843-169.106c-27.878-27.016-69.962-23.438-93.89 8.215l-86.655 114.821z'%3E%3C/path%3E %3C/svg%3E ")`,
        },

        '.custom-radio .custom-control__input, .wc_payment_method input': {
          borderRadius: '50%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 7 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='7' height='7' rx='3.5' fill='%23fff'/%3E %3C/svg%3E ")`,
        },

        '.outline-top, .outline-bottom': {
          position: 'relative',

          '&:before, &:after': {
            position: 'absolute',
            left: '-50vw',
            right: '-50vw',
            height: '1px',
            background: 'currentColor',
            opacity: 0.3,
          },
        },

        '.outline-top': {
          '&:before': {
            content: "''",
            top: 0,
          },
        },

        '.outline-bottom': {
          '&:after': {
            content: "''",
            bottom: 0,
          },
        },

        textarea: {
          minHeight: '10rem',
          resize: 'none !important',
          display: 'flex',

          '&:placeholder': {
            position: 'absolute',
            bottom: '1rem',
            width: '100%',
          },
        },

        hr: {
          borderColor: 'currentColor',
          opacity: 0.15,
        },

        '[data-component="parallax-box"]': {
          willChange: 'transform',

          '> *': {
            willChange: 'transform',
          },
        },

        '.overflow-y-auto': {
          '-webkit-overflow-scrolling': 'touch',

          '&::-webkit-scrollbar': {
            width: '4px',
            background: 'transparent',
          },

          '&::-webkit-scrollbar-thumb': {
            background: theme('colors.black[300]'),
          },
        },

        '.overflow-x-auto': {
          ' &::-webkit-scrollbar': {
            '-webkit-appearance': 'none',
            width: 0,
            height: 0,
            display: 'none',
          },
        },

        '.text-big': {
          fontSize: rem(56),
          letterSpacing: '-0.06em',
          lineHeight: 0.9,

          [media(theme('screens.md'))]: {
            fontSize: rem(64),
          },

          [media(theme('screens.lg'))]: {
            fontSize: rem(82),
          },

          [media(theme('screens.laptop'))]: {
            fontSize: rem(106),
          },
        },

      });
    },
  ],
  future: {
    // removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  variants: {
    aspectRatio: ['responsive'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'checked'],
    borderColor: ['responsive', 'hover', 'focus', 'group-hover', 'checked'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover', 'checked'],
    fontFamily: ['responsive', 'hover', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover', 'checked'],
    transform: ['responsive', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'group-hover'],
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
    transformOrigin: ['responsive', 'hover', 'focus', 'group-hover'],
    mixBlendMode: ['responsive'],
    backgroundBlendMode: ['responsive'],
    isolation: ['responsive'],
    transitionTimingFunction: ['responsive', 'hover', 'group-hover'],
    transitionDuration: ['responsive', 'hover', 'group-hover'],
    transitionDelay: ['responsive', 'hover', 'group-hover'],
    pointerEvents: ['responsive', 'hover', 'group-hover'],
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
};
