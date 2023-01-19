import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import HomePage from "../../features/home/HomePage";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";


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
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/catalog/:id' element={<ProductDetails />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
