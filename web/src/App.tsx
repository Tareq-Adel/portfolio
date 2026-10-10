import ContactBar from './components/ContactBar';
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
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
