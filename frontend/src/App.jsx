import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { FilterProvider } from "./context/FilterContext"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dashboards from "./pages/Dashboards"

function App() {
  return (
    <FilterProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/dashboards" element={<Dashboards />} />
        </Routes>
      </Router>
    </FilterProvider>
  )
}

export default App