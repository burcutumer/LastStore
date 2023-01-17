import { Container, createTheme, CssBaseline, Switch, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Catalog from "../../features/catalog/catalog";
import Header from "./Header";


function App() {
  const [darkMode, setDarkMode] = useState(false); // gonna start at light mode
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default:paletteType === 'light' ?'#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header handleThemeChange={handleThemeChange} darkMode={darkMode}/>
      <Container>
         <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
