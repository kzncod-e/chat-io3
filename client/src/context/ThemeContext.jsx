import { createContext, useState } from 'react';

export const themeContext = createContext({
    currentTheme: "",
    setCurrentTheme: () => { },
    theme: {
        light: {
            dataTheme: ""
        },
        dark: {
            dataTheme: ""
        }
    }
});

export default function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState("light")

    return (
        <themeContext.Provider value={{
            currentTheme,
            setCurrentTheme,
            theme: {
                light: {
                    dataTheme: "light"
                },
                dark: {
                    dataTheme: "dark"
                }
            }
        }}>
            {children}
        </themeContext.Provider>
    );
}