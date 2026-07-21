import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ThemeToggle } from "@/components/theme-toggle"
import CategoryPage from "@/pages/CategoryPage"
import GamePage from "@/pages/GamePage"
import PlaceholderPage from "@/pages/PlaceholderPage"
import ResultPage from "@/pages/ResultPage"

function App() {
  return (
    <BrowserRouter>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route
          path="*"
          element={<PlaceholderPage title="Страница не найдена" />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
