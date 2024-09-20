import { Routes, Route } from 'react-router-dom'
import { Home, Error }from "./pages"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App
