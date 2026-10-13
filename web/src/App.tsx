import { SpeedInsights } from '@vercel/speed-insights/react';

import ContactBar from './components/ContactBar';
import Divider from './components/Divider';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Projects from './pages/Projects';

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <ContactBar />
      <main>
        <Home />
        <Divider />
        <About />
        <Divider />
        <Projects />
        <Divider />
        <Contact />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
