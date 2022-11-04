const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{vue,scss}'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E1E5F0',
          200: '#d9d9d9',
          300: '#8298C4',
          400: '#6980AD',
          500: '#4F6899',
          600: '#294680',
          700: '#213A6E',
          800: '#1B3059',
          850: '#142342',
          900: '#0B1324',
          950: '#9298A6'
        },
        secondary: {
          100: '#F2FFF9',
          200: '#BEEBD5',
          300: '#82C4A3',
          400: '#69AD8B',
          500: '#4F9974',
          600: '#66BB7A',
          700: '#4b977a',
          800: '#468054',
          850: '#14422B',
          900: '#0B2418'
        },
        gray: {
          0: '#000000',
          2: '#434343',
          4: '#333333',
          8: '#707070',
          12: '#F2F5F5',
          15: '#262626',
          20: '#8d8d8d',
          26: '#999999',
          35: '#595959',
          55: '#8C8C8C',
          75: '#BFBFBF',
          85: '#D9D9D9',
          92: '#EBEBEB',
          94: '#F0F0F0',
          96: '#F5F5F5',
          98: '#F6F6F6',
          100: '#FFFFFF'
        },
        blue: {
          100: '#E6F7FF',
          200: '#BAE7FF',
          300: '#91D5FF',
          400: '#69C0FF',
          500: '#40A9FF',
          600: '#1890FF',
          700: '#096DD9',
          800: '#0050B3',
          900: '#003A8C',
          950: '#002766'
        },
        green: {
          100: '#F6FFED',
          200: '#E1F7CD',
          300: '#B7EB8F',
          400: '#95DE64',
          500: '#73D13D',
          600: '#66bb7a',
          700: '#389E0D',
          800: '#237804',
          900: '#135200',
          950: '#092B00'
        },
        red: {
          100: '#FFF1F0',
          200: '#FFCCC7',
          300: '#FFA39E',
          400: '#FF7875',
          500: '#FF4D4F',
          600: '#AC0000',
          700: '#CF1322',
          800: '#A8071A',
          900: '#820014',
          950: '#5C0011'
        },
        yellow: {
          100: '#FEFFE6',
          200: '#FFFFB8',
          300: '#FFFB8F',
          400: '#FFF566',
          500: '#FFEC3D',
          600: '#FADB14',
          700: '#D4B106',
          800: '#AD8B00',
          900: '#876800',
          950: '#614700'
        }
      }
    },
    colors: {
      transparent: 'transparent',
      white: colors.white,
      black: colors.black
    },
    fontSize: {
      tiny: ['10px', '17px'],
      xs: ['12px', '20px'],
      sm: ['13px', '23px'],
      md: ['14px', '24px'],
      lg: ['15px', '26px'],
      normal: ['16px', '32px'],
      'normal-light': ['16px', '24px'],
      base: ['18px', '31px'],
      xl: ['20px', '34px'],
      large: ['24px', '32px'],
      '2xl': ['26px', '44px'],
      '3xl': ['30px', '51px'],
      '4xl': ['36px', '60px'],
      '5xl': ['48px', '1'],
      '6xl': ['60px', '1']
    }
  },
  plugins: []
};
