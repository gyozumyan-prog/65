import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Programs from './components/Programs';
import Trainers from './components/Trainers';
import Pricing from './components/Pricing';
import Schedule from './components/Schedule';
import Booking from './components/Booking';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-dark text-white font-body min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Programs />
      <Trainers />
      <Pricing />
      <Schedule />
      <Booking />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
