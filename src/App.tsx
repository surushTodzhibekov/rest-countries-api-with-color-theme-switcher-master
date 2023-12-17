import { Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./home/home";
import { DarkModeProvider } from "./context";
import Detail from "./detail/detail";

function App() {
  // ---------------------------------------------------------------------------
  return (
    <>
      <DarkModeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<Detail />} />
        </Routes>
      </DarkModeProvider>
    </>
  );
}

export default App;
