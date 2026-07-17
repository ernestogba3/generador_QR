import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { QRSection } from './components/QRSection/QRSection';
import { InfoSection } from './components/InfoSection/InfoSection';
import { DEFAULT_CATEGORY } from './constants/qrCategories';
import './App.css';

function App() {
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [formData, setFormData] = useState({});
  const [format, setFormat] = useState('png');

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <QRSection
          category={category}
          onCategoryChange={setCategory}
          formData={formData}
          onFormChange={setFormData}
          format={format}
          onFormatChange={setFormat}
        />
      </main>

      <InfoSection />

      <Footer />
    </div>
  );
}

export default App;