import { createContext, useContext } from "react";


type Theme = {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      error:string
    };
    typography: {
      fontFamiliy: string;
      fontSize: {
          xsmall:number,
          small:number,
          medium:number,
          large:number,
      },
      colors:{
        primary:string,
        secondary:string,
        tertiory:string,
        error:string,
      }
    };
  };
  
  const theme: Theme = {
    colors: {
      primary: '#fff',
      secondary: '#F1B900',
      background: '#242525',
      text: '#000',
      error:"red"
    },
    typography: {
      fontFamiliy: 'Poppins',
      fontSize: {
        xsmall:13,
          small:16,
          medium:18,
          large:24
      },
      colors:{
        primary:"#fff",
        secondary:"#5C635D",
        tertiory:"#000",
        error:"#FA3535",
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