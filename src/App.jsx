import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import { SectionA } from './pages/SectionA';
import { SectionB } from './pages/SectionB';
import { SectionC } from './pages/SectionC';
import { SectionD } from './pages/SectionD';
import { SectionE } from './pages/SectionE';
import { SectionF } from './pages/SectionF';
import { Summary } from './pages/Summary';
import { ThankYou } from './pages/ThankYou';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/section-a" replace />} />
          <Route path="/section-a" element={<SectionA />} />
          <Route path="/section-b" element={<SectionB />} />
          <Route path="/section-c" element={<SectionC />} />
          <Route path="/section-d" element={<SectionD />} />
          <Route path="/section-e" element={<SectionE />} />
          <Route path="/section-f" element={<SectionF />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
