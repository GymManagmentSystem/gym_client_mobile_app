import {createContext, useContext} from 'react';

type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: {
      primary: string;
      secondary: string;
      tertiory:string;
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
      primary: '#242525',
      secondary: '#535353',
      tertiory:"#1A1A1C"
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
      xsmall: 13,
      small: 16,
      medium: 18,
      xmedium: 20,
      large: 24,
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
