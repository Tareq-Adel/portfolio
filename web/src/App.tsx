import Footer from './components/Footer';
import Header from './components/Header';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Projects from './pages/Projects';

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main>
        <Home />
        <Projects />
        <About />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
