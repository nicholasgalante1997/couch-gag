import { createContext, useContext } from 'react';
import { Theme as CouchGagTheme } from '@nickgdev/couch-gag-common-lib';

type Theme = CouchGagTheme & { darkMode: boolean };

export const defaultTheme: Theme = {
    darkMode: true,
    font: {
        fallback: 'sans-serif',
        google: { family: 'Poppins' }
    },
    palette: {
        backgroundColor: '#000020',
        headingPrimaryColor: 'deeppink',
        paragraphTextColor: 'white',
        headingSecondaryColor: 'white',
        buttonColorOptions: []
    },
    treatmentId: 'control-default-theme'
};

const ThemeContext = createContext<Theme>(defaultTheme);
export const useThemeContext = () => useContext(ThemeContext);
export const ThemeProvider = ThemeContext.Provider;