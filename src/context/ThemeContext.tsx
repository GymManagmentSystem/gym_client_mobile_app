import {createContext, useContext} from 'react';
import { getScaleFontSize } from '../utility/FontScaleRatio';


type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: {
      primary: string;
      secondary: string;
      quaternary:{
        primary:string,
        secondary:string
        highLight:string
      }
      other:string
    };
    text: string;
    error: string;
  };
  typography: {
    fontFamiliy: {
      primary: {
        regular: string;
        medium: string;
        semiBold: string;
        bold: string;
      };
      secondary: {
        regular: string;
        bold: string;
      };
    };
    fontSize: {
      xsmall: number;
      small: number;
      medium: number;
      xmedium: number;
      large: number;
    };
    colors: {
      primary: string;
      secondary: string;
      tertiory: string;
      other: string;
      error: string;
    };
  };
  icons: {
    iconColor: {
      inActive: string;
      active: string;
    };
    backgroundColor: {
      inActive: string;
      active: string;
    };
  };
};

const theme: Theme = {
  colors: {
    primary: '#fff',
    secondary: '#F1B900',
    background: {
      primary: '#000',
      secondary: '#1A1A1C',
      quaternary:{        //gray colour varient
        primary:"#535353",
        secondary:"#8F918F",
        highLight:"#5C635D"
      },
      other:"#fff"
    },
    text: '#000',
    error: 'red',
  },
  typography: {
    fontFamiliy: {
      primary: {
        regular: 'Poppins-Regular',
        medium: 'Poppins-Medium',
        semiBold: 'Poppins-SemiBold',
        bold: 'Poppins-Bold',
      },
      secondary: {
        regular: 'Lato-Regular',
        bold: 'Lato-Bold',
      },
    },
    fontSize: {
      xsmall: getScaleFontSize(14),
      small: getScaleFontSize(16),
      medium: getScaleFontSize(18),
      xmedium: getScaleFontSize(20),
      large:getScaleFontSize(24) ,
    },
    colors: {
      primary: '#fff',
      secondary: '#5C635D',
      tertiory: '#000',
      other: '#F1B900',
      error: '#FA3535',
    },
  },
  icons: {
    iconColor: {
      inActive: '#E8EAED',
      active: '#F1B900',
    },
    backgroundColor: {
      inActive: '#1A1A1C',
      active: '#000',
    },
  },
};

const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
