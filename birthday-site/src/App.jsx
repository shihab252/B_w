import { useState } from 'react' // Added this import
import './index.css'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import BirthdayWishes from './components/BirthdayWishes'
import SecretSection from './components/SecretSection' 
import SecretRomanticPage from './components/SecretAgain'

function App() {
  const [lang, setLang] = useState('BN');
  return (
    <main className="bg-[#fff5f5] selection:bg-rose-200">
      <Hero lang={lang} setLang={setLang}/>
      <Timeline lang={lang}/>
      <BirthdayWishes lang={lang}/>
      <SecretSection lang={lang}/>
      <SecretRomanticPage lang={lang}/>
      
    </main>
  );
}

export default App