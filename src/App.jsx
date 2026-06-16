import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import MealBuilder from './MealBuilder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<MealBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;