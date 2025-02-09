import { createContext, useContext } from "react";


type Theme = {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    typography: {
      fontFamiliy: string;
      fontSize: {
          small:number,
          medium:number,
          large:number,
      }
    };
  };
  
  const theme: Theme = {
    colors: {
      primary: '#fff',
      secondary: '#F1B900',
      background: '#242525',
      text: '#000',
    },
    typography: {
      fontFamiliy: 'Poppins',
      fontSize: {
          small:16,
          medium:18,
          large:24
      }
    },
  };

  const ThemeContext=createContext<Theme>(theme);

  export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
    children,
  }) => {
    return (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
  };

  export const useTheme = () => useContext(ThemeContext);