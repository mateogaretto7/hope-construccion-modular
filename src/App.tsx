import logo from './assets/logo.png';
import imagenPrincipal from './assets/imagen principal.webp';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Home, 
  Briefcase, 
  Clock, 
  ArrowRight,
  ChevronDown,
  ArrowUpRight,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Building2,
  Truck,
  ShieldCheck,
  Factory,
  HelpCircle,
  Maximize2,
  Zap,
  Leaf,
  Shield,
  Star,
  Users,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Types ---
interface ModelCard {
  id: string;
  name: string;
  size: string | number;
  segment: 'particular' | 'empresa';
  type: 'contenedor' | 'modulo';
  image: string;
  features: string[];
  variants?: string[];
}

// --- Data ---
const MODELS: ModelCard[] = [
  // Particular - Contenedores
  { 
    id: 'p-c-15', 
    name: 'Monoambiente', 
    size: 15, 
    segment: 'particular', 
    type: 'contenedor',
    image: 'https://images.unsplash.com/photo-1513584684374-8bdb74838a0f?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  { 
    id: 'p-c-30', 
    name: 'Vivienda', 
    size: 30, 
    segment: 'particular', 
    type: 'contenedor',
    image: 'https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  { 
    id: 'p-c-45', 
    name: 'Vivienda', 
    size: 45, 
    segment: 'particular', 
    type: 'contenedor',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  { 
    id: 'p-c-60', 
    name: 'Vivienda', 
    size: 60, 
    segment: 'particular', 
    type: 'contenedor',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  { 
    id: 'p-c-75', 
    name: 'Vivienda', 
    size: 75, 
    segment: 'particular', 
    type: 'contenedor',
    image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  { 
    id: 'p-c-90', 
    name: 'Vivienda', 
    size: 90, 
    segment: 'particular', 
    type: 'contenedor',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  { 
    id: 'p-c-custom', 
    name: 'Diseño propio / a medida', 
    size: 'Variable', 
    segment: 'particular', 
    type: 'contenedor',
    image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  // Particular - Módulos
  { 
    id: 'p-m-18', 
    name: 'Módulo', 
    size: 18, 
    segment: 'particular', 
    type: 'modulo',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  { 
    id: 'p-m-36', 
    name: 'Módulo', 
    size: 36, 
    segment: 'particular', 
    type: 'modulo',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  { 
    id: 'p-m-60', 
    name: 'Módulo', 
    size: 60, 
    segment: 'particular', 
    type: 'modulo',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  { 
    id: 'p-m-80', 
    name: 'Módulo', 
    size: 80, 
    segment: 'particular', 
    type: 'modulo',
    image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },

  // Empresa - Contenedores
  { 
    id: 'e-c-offices', 
    name: 'Oficinas', 
    size: '15 / 30 / 60', 
    segment: 'empresa', 
    type: 'contenedor',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'],
    variants: ['Con/Sin Baño', 'Con/Sin Kitchenette']
  },
  { 
    id: 'e-c-sanitarios', 
    name: 'Sanitarios', 
    size: '15 / 30', 
    segment: 'empresa', 
    type: 'contenedor',
    image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  // Empresa - Módulos
  { 
    id: 'e-m-18', 
    name: 'Oficinas módulo', 
    size: 18, 
    segment: 'empresa', 
    type: 'modulo',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
  { 
    id: 'e-m-30', 
    name: 'Oficinas módulo', 
    size: 30, 
    segment: 'empresa', 
    type: 'modulo',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200', 
    features: ['Listo para usar (solo amoblar)', 'Aislación según línea', 'Instalación eléctrica y sanitaria listas', 'Estándar / Premium', 'Plazo estimado (según línea)'] 
  },
];

const WHY_MODULAR = [
  { icon: <Clock />, title: "Rapidez", desc: "Reducción del 50% en tiempos de obra frente a la construcción tradicional." },
  { icon: <Zap />, title: "Eficiencia", desc: "Aislación térmica y acústica superior para un menor consumo energético." },
  { icon: <Leaf />, title: "Sustentabilidad", desc: "Menor impacto ambiental y generación mínima de residuos en obra." },
  { icon: <Shield />, title: "Calidad", desc: "Fabricación controlada en planta bajo estándares industriales rigurosos." },
  { icon: <Maximize2 />, title: "Versatilidad", desc: "Sistemas modulares que permiten ampliaciones futuras de forma simple." },
  { icon: <Truck />, title: "Movilidad", desc: "Posibilidad de relocalizar tu espacio donde lo necesites en el futuro." }
];

const STEPS = [
  { num: "01", title: "Asesoramiento", desc: "Definimos uso, m² y ciudad de destino para tu proyecto." },
  { num: "02", title: "Configuración", desc: "Elegís entre línea Estándar o Premium y detalles finales." },
  { num: "03", title: "Fabricación", desc: "Construimos tu módulo en nuestra planta con control total." },
  { num: "04", title: "Entrega", desc: "Logística e instalación final en tu terreno, listo para usar." }
];

const FAQS = [
  { q: "¿Qué diferencia hay entre Estándar y Premium?", a: "La línea Premium incluye aberturas con DVH (Doble Vidriado Hermético), revestimientos de mayor categoría y detalles de terminación superiores." },
  { q: "¿Hacen envíos a todo el país?", a: "Sí, realizamos entregas e instalaciones en toda la Argentina con logística propia y especializada." },
  { q: "¿Se pueden ampliar en el futuro?", a: "Exactamente. Nuestro sistema modular está diseñado para permitir acoples y ampliaciones de forma sencilla." },
  { q: "¿Qué mantenimiento requieren?", a: "Mínimo. Al ser estructuras de acero tratadas, solo requieren mantenimiento preventivo de pintura cada 5-7 años." }
];

// --- Components ---

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Navbar = ({ segment, onSelectSegment }: { segment: 'particular' | 'empresa', onSelectSegment: (s: 'particular' | 'empresa') => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Quiénes somos', href: '#nosotros' },
    { name: 'Cómo trabajamos', href: '#proceso' },
    { name: 'Modelos', href: '#modelos' },
    { name: 'Fábrica', href: '#fabrica' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-hope-bg/90 backdrop-blur-md border-hope-border py-4' : 'bg-transparent border-transparent py-8'}`}>
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img 
            src={logo} 
            alt="Hope Construcción Modular" 
            className="h-10 md:h-12 w-auto object-contain" 
          />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.name} href={l.href} className="text-[11px] uppercase tracking-widest font-semibold hover:text-hope-orange transition-colors">
              {l.name}
            </a>
          ))}

          <a 
            href="#contacto"
            className="bg-hope-orange text-hope-white px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-hope-text transition-all"
          >
            Cotizar
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-hope-bg border-b border-hope-border p-8 flex flex-col gap-6 shadow-2xl"
          >
            {links.map(l => (
              <a key={l.name} href={l.href} onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-widest font-bold text-hope-text/70 hover:text-hope-orange transition-colors">
                {l.name}
              </a>
            ))}
            <a 
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="bg-hope-orange text-hope-white px-6 py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest text-center"
            >
              Cotizar
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onSelectSegment }: { onSelectSegment: (s: 'particular' | 'empresa') => void }) => {
  return (
    <section className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={imagenPrincipal}
          className="w-full h-full object-cover" 
          alt="Hope Hero" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-hope-bg/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-hope-text">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display-bold mb-8 md:mb-12 leading-[1.1] md:leading-[0.9] tracking-tight text-hope-text">
            Arquitectura modular <br className="hidden md:block" /> para vivir y trabajar
          </h1>
          <p className="text-base md:text-xl font-light max-w-3xl mx-auto mb-10 md:mb-16 text-white leading-relaxed">
            Soluciones listas para usar. Fabricación en planta, plazos claros, entrega en todo el país.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
            <button 
              onClick={() => onSelectSegment('particular')}
              className="group bg-hope-white/40 backdrop-blur-md border border-hope-border/50 p-6 md:p-8 rounded-sm text-left hover:bg-hope-white hover:border-hope-orange transition-all duration-500"
            >
              <h3 className="text-lg md:text-xl font-bold text-hope-text mb-1 md:mb-2">Soy Particular</h3>
              <p className="text-[10px] md:text-xs text-hope-arena uppercase tracking-widest font-bold mb-4 md:mb-6">Vivienda / Turismo</p>
              <p className="text-xs md:text-sm text-hope-muted font-light leading-relaxed">Viviendas compactas, ampliables y listas para usar.</p>
              <ArrowRight size={18} className="mt-6 md:mt-8 text-hope-arena group-hover:text-hope-orange transition-colors" />
            </button>

            <button 
              onClick={() => onSelectSegment('empresa')}
              className="group bg-hope-white/40 backdrop-blur-md border border-hope-border/50 p-6 md:p-8 rounded-sm text-left hover:bg-hope-white hover:border-hope-orange transition-all duration-500"
            >
              <h3 className="text-lg md:text-xl font-bold text-hope-text mb-1 md:mb-2">Soy Empresa</h3>
              <p className="text-[10px] md:text-xs text-hope-arena uppercase tracking-widest font-bold mb-4 md:mb-6">Obra / Industria / Servicios</p>
              <p className="text-xs md:text-sm text-hope-muted font-light leading-relaxed">Oficinas, sanitarios y soluciones para operación.</p>
              <ArrowRight size={18} className="mt-6 md:mt-8 text-hope-arena group-hover:text-hope-orange transition-colors" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TrustStrip = () => (
  <div className="bg-hope-white border-y border-hope-border py-8 md:py-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:flex md:flex-wrap justify-center gap-6 md:gap-16">
      {[
        { icon: <Factory size={16} />, text: "Fábrica Propia" },
        { icon: <Truck size={16} />, text: "Envíos a todo el país" },
        { icon: <ShieldCheck size={16} />, text: "Garantía Escrita" },
        { icon: <Clock size={16} />, text: "Plazos Reales" }
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 md:gap-3 text-hope-arena justify-center md:justify-start">
          {item.icon}
          <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-hope-text text-center md:text-left">{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const About = () => {
  return (
    <section id="nosotros" className="py-20 md:py-32 bg-hope-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-hope-arena font-bold mb-4 block">Confianza Humana</span>
            <h2 className="text-3xl md:text-6xl font-display-bold mb-6 md:mb-8">Quiénes somos</h2>
            <p className="text-hope-muted text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12">
              En Hope simplificamos la construcción. Nacimos para transformar el acero en espacios que inspiren, con un equipo que prioriza la calidad y el cumplimiento de plazos. <br /><br />
              <span className="text-hope-text font-medium italic">“Humanizamos la construcción: proceso claro y trato humano.”</span>
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Factory size={20} />, text: "Fabricación en planta en Esperanza, Santa Fe" },
                { icon: <Truck size={20} />, text: "Entrega e instalación en todo el país (logística cotizada según destino)" },
                { icon: <ShieldCheck size={20} />, text: "Garantía escrita + postventa real" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-hope-orange">{item.icon}</div>
                  <p className="text-sm text-hope-text font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative aspect-square overflow-hidden rounded-sm shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200" 
              alt="Hope Factory" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhyModularSection = () => (
  <section id="porque" className="py-20 md:py-32 bg-hope-alt-bg">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 md:mb-20">
        <span className="text-[10px] uppercase tracking-[0.4em] text-hope-arena font-bold mb-4 block">Beneficios</span>
        <h2 className="text-3xl md:text-6xl font-display-bold">¿Por qué construcción modular?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {WHY_MODULAR.map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="bg-hope-white p-10 border border-hope-border rounded-sm group transition-all"
          >
            <div className="text-hope-arena mb-6 group-hover:text-hope-orange transition-colors">
              {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">{item.title}</h3>
            <p className="text-hope-muted text-sm leading-relaxed font-light">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section id="proceso" className="py-20 md:py-32 bg-hope-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-hope-arena font-bold mb-4 block">El Camino</span>
          <h2 className="text-3xl md:text-6xl font-display-bold mb-8">Cómo trabajamos</h2>
          <p className="text-hope-muted text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12">
            Humanizamos la construcción modular con un proceso transparente y sin sorpresas. Desde la primera charla hasta la entrega de llaves.
          </p>
          <div className="space-y-6 md:space-y-8">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 md:gap-6">
                <span className="text-3xl md:text-4xl font-display-bold text-hope-arena/20">{step.num}</span>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-[10px] md:text-xs mb-1 md:mb-2">{step.title}</h4>
                  <p className="text-xs md:text-sm text-hope-muted font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square rounded-sm overflow-hidden mt-12 lg:mt-0">
          <img 
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover" 
            alt="Proceso Hope" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </section>
);

const ModelDetail = ({ model, onClose }: { model: ModelCard, onClose: () => void }) => {
  if (!model) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-hope-text/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-hope-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={model.image} 
            alt={model.name} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-hope-white p-2 rounded-full shadow-lg md:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-hope-arena font-bold mb-2 block">Ficha Técnica</span>
              <h2 className="text-3xl md:text-5xl font-display-bold leading-tight">
                {model.name} <br />
                <span className="text-hope-arena">{model.size} {typeof model.size === 'number' ? 'm²' : ''}</span>
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="hidden md:block text-hope-text/20 hover:text-hope-orange transition-colors"
            >
              <X size={32} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-[9px] uppercase tracking-widest font-bold text-hope-arena mb-3">Segmento</p>
              <p className="text-sm font-bold uppercase">{model.segment}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest font-bold text-hope-arena mb-3">Tipo</p>
              <p className="text-sm font-bold uppercase">{model.type}</p>
            </div>
          </div>

          <div className="mb-10">
            <p className="text-[9px] uppercase tracking-widest font-bold text-hope-arena mb-4">Especificaciones</p>
            <ul className="space-y-4">
              {model.features.map((f, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-hope-muted font-light border-b border-hope-border pb-4 last:border-0">
                  <CheckCircle2 size={18} className="text-hope-orange shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {model.variants && (
            <div className="mb-10">
              <p className="text-[9px] uppercase tracking-widest font-bold text-hope-arena mb-4">Variantes disponibles</p>
              <div className="flex flex-wrap gap-3">
                {model.variants.map((v, i) => (
                  <span key={i} className="bg-hope-bg border border-hope-border px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-8 border-t border-hope-border flex flex-col sm:flex-row gap-4">
            <a 
              href={`https://wa.me/543496557841?text=Hola! Quiero cotizar el modelo ${model.name} de ${model.size}m2.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-hope-orange text-hope-white py-5 rounded-sm font-bold uppercase tracking-widest text-[10px] text-center hover:bg-hope-text transition-all shadow-xl shadow-hope-orange/20"
            >
              Cotizar Proyecto
            </a>
            <button 
              onClick={onClose}
              className="flex-1 border border-hope-border py-5 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-hope-bg transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ModelCardItem: React.FC<{ m: ModelCard, onViewModel: (m: ModelCard) => void }> = ({ m, onViewModel }) => (
  <motion.div layout className="bg-hope-white border border-hope-border rounded-sm overflow-hidden flex flex-col h-full group">
    <div className="aspect-[4/3] overflow-hidden relative">
      <img 
        src={m.image} 
        alt={m.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        referrerPolicy="no-referrer" 
      />
      <div className="absolute top-4 left-4 bg-hope-white/90 backdrop-blur-sm px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-sm">
        {m.size} {typeof m.size === 'number' ? 'm²' : ''}
      </div>
    </div>
    
    <div className="p-4 md:p-8 flex flex-col flex-grow">
      <h3 className="text-sm md:text-2xl font-bold uppercase tracking-tight mb-2">
        {m.name} <span className="text-hope-arena ml-1">{m.size} {typeof m.size === 'number' ? 'm²' : ''}</span>
      </h3>
      
      {m.variants && (
        <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
          {m.variants.map((v, i) => (
            <span key={i} className="text-[7px] md:text-[8px] uppercase tracking-widest font-bold bg-[#C7A46A]/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm text-hope-text border border-[#C7A46A]/20">
              {v}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-8 flex-grow content-start">
        {m.features.map((f, i) => (
          <span key={i} className="text-[7px] md:text-[9px] uppercase tracking-wider font-medium bg-[#C7A46A]/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm text-hope-text border border-[#C7A46A]/10">
            {f}
          </span>
        ))}
      </div>

      <div className="space-y-2 md:space-y-3">
        <button 
          onClick={() => onViewModel(m)}
          className="w-full bg-hope-text text-hope-white py-3 md:py-4 rounded-sm text-[8px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-hope-orange transition-all shadow-lg shadow-hope-text/10"
        >
          Ver Detalles
        </button>
        <a 
          href={`https://wa.me/543496557841?text=Hola! Quiero cotizar el modelo ${m.name} de ${m.size}m2.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full border border-hope-border py-3 md:py-4 rounded-sm text-[8px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-hope-bg transition-all flex items-center justify-center gap-2"
        >
          Cotizar <WhatsAppIcon size={12} />
        </a>
      </div>
    </div>
  </motion.div>
);

const ModelsSection = ({ segment, onSelectSegment, onViewModel }: { segment: 'particular' | 'empresa', onSelectSegment: (s: 'particular' | 'empresa') => void, onViewModel: (m: ModelCard) => void }) => {
  const containers = MODELS.filter(m => m.segment === segment && m.type === 'contenedor');
  const modules = MODELS.filter(m => m.segment === segment && m.type === 'modulo');

  return (
    <section id="modelos" className="py-20 md:py-32 bg-hope-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-hope-arena font-bold mb-4 block">Catálogo</span>
            <h2 className="text-3xl md:text-6xl font-display-bold">Nuestros Modelos</h2>
          </div>
          <div className="flex bg-hope-white p-1 rounded-sm border border-hope-border w-full md:w-auto">
            <button 
              onClick={() => onSelectSegment('particular')}
              className={`flex-1 md:flex-none px-6 md:px-10 py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${segment === 'particular' ? 'bg-hope-orange text-hope-white shadow-lg shadow-hope-orange/20' : 'text-hope-text/40 hover:text-hope-text'}`}
            >
              Particular
            </button>
            <button 
              onClick={() => onSelectSegment('empresa')}
              className={`flex-1 md:flex-none px-6 md:px-10 py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${segment === 'empresa' ? 'bg-hope-orange text-hope-white shadow-lg shadow-hope-orange/20' : 'text-hope-text/40 hover:text-hope-text'}`}
            >
              Empresa
            </button>
          </div>
        </div>

        {/* Grupo 1: Contenedores */}
        {containers.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-hope-arena">Grupo 1: Contenedores</h3>
              <div className="h-px bg-hope-border flex-grow"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
              {containers.map(m => <ModelCardItem key={m.id} m={m} onViewModel={onViewModel} />)}
            </div>
          </div>
        )}

        {/* Grupo 2: Módulos */}
        {modules.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-hope-arena">Grupo 2: Módulos</h3>
              <div className="h-px bg-hope-border flex-grow"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
              {modules.map(m => <ModelCardItem key={m.id} m={m} onViewModel={onViewModel} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const QualityComparison = () => (
  <section className="py-20 md:py-32 bg-hope-white">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-4xl font-display-bold mb-4">Estándar vs Superior</h2>
        <p className="text-hope-muted text-sm md:text-base font-light">Elegí el nivel de terminación que mejor se adapte a tu proyecto.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="p-8 md:p-10 border border-hope-border rounded-sm">
          <h3 className="text-lg md:text-xl font-bold mb-6 uppercase tracking-widest">Línea Estándar</h3>
          <ul className="space-y-4 text-sm text-hope-muted font-light">
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-hope-arena" /> Aberturas de aluminio blanco</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-hope-arena" /> Aislación térmica estándar</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-hope-arena" /> Pisos vinílicos de alto tránsito</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-hope-arena" /> Instalaciones completas</li>
          </ul>
        </div>
        <div className="p-8 md:p-10 bg-hope-bg border border-hope-arena rounded-sm relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Star className="text-hope-arena fill-hope-arena" size={20} />
          </div>
          <h3 className="text-lg md:text-xl font-bold mb-6 uppercase tracking-widest text-hope-orange">Línea Superior</h3>
          <ul className="space-y-4 text-sm text-hope-text font-light">
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-hope-orange" /> Aberturas con DVH (Doble Vidrio)</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-hope-orange" /> Aislación termoacústica reforzada</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-hope-orange" /> Revestimientos de diseño</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-hope-orange" /> Griferías y sanitarios de alta gama</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const FactoryVisit = () => (
  <section id="fabrica" className="py-20 md:py-32 bg-hope-alt-bg">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-hope-white p-8 md:p-24 rounded-sm border border-hope-border grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Factory size={40} className="text-hope-arena mb-6 md:mb-8" />
          <h2 className="text-3xl md:text-6xl font-display-bold mb-6 md:mb-8">Vení a conocer nuestra fábrica</h2>
          <p className="text-hope-muted text-base md:text-lg font-light max-w-2xl mb-10 md:mb-12">
            Estamos en Esperanza, Santa Fe. Queremos que veas con tus propios ojos la calidad de los materiales y el profesionalismo de nuestro equipo.
          </p>
          <a 
            href="https://wa.me/543496557841?text=Hola! Quiero agendar una visita a la fábrica."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-hope-orange text-hope-white px-10 md:px-12 py-5 md:py-6 rounded-sm font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-hope-text transition-all shadow-xl shadow-hope-orange/20"
          >
            Agendar Visita
          </a>
        </div>
        <div className="h-[300px] md:h-[400px] rounded-sm overflow-hidden border border-hope-border mt-8 lg:mt-0">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.011867160359!2d-60.9211582!3d-31.484768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b51398ca4f0dcd%3A0xa09dbf5f151ebcf7!2sParque%20Industrial%20Esperanza!5e0!3m2!1ses-419!2sar!4v1711832924000!5m2!1ses-419!2sar" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="py-20 md:py-32 bg-hope-white">
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-display-bold text-center mb-12 md:mb-16 uppercase tracking-tighter">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {[
          { q: "¿Qué incluye Estándar vs Premium?", a: "La línea Premium incluye aberturas con DVH (Doble Vidriado Hermético), mejores revestimientos y terminaciones de diseño superior." },
          { q: "¿Cuáles son los plazos de entrega?", a: "Contenedores: 30–45 días. Módulos: 60–90 días. Los plazos se confirman al momento de la seña según carga de planta." },
          { q: "¿Cómo se cotiza la instalación?", a: "Se cotiza aparte según la distancia desde nuestra planta en Esperanza, Santa Fe, el acceso al terreno y el tipo de grúa necesaria." },
          { q: "¿Qué mantenimiento requieren?", a: "Mínimo. Al ser estructuras de acero con tratamientos anticorrosivos, solo requieren pintura exterior cada 5-7 años según el entorno." },
          { q: "Garantía escrita + postventa", a: "Todos nuestros módulos cuentan con garantía escrita de estructura y filtraciones, además de un servicio de postventa real para tu tranquilidad." },
          { q: "¿Se pueden ampliar en el futuro?", a: "Sí, nuestro sistema modular permite acoples y ampliaciones de forma sencilla y limpia." },
          { q: "¿Necesito platea de hormigón?", a: "No necesariamente. Pueden apoyarse sobre pilotes o bases puntuales, lo que reduce costos y tiempos de obra." },
          { q: "¿Son aptos para climas extremos?", a: "Totalmente. La aislación térmica de alta densidad permite habitarlos confortablemente tanto en zonas de calor intenso como de frío extremo." },
          { q: "¿Cómo es el pago?", a: "Manejamos un esquema de anticipo para congelar precio y cuotas durante la fabricación, con saldo contra entrega." }
        ].map((f, i) => (
          <details key={i} className="group border border-hope-border rounded-sm overflow-hidden">
            <summary className="p-5 md:p-6 cursor-pointer list-none flex justify-between items-center font-bold uppercase tracking-widest text-[10px] md:text-xs">
              {f.q}
              <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 md:px-6 pb-5 md:pb-6 text-xs md:text-sm text-hope-muted font-light leading-relaxed">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contacto" className="py-20 md:py-32 bg-hope-bg">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-hope-arena font-bold mb-4 block">Contacto</span>
          <h2 className="text-3xl md:text-6xl font-display-bold mb-10 md:mb-12">Hablemos de tu proyecto</h2>
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-hope-white rounded-sm flex items-center justify-center text-hope-orange shadow-sm">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-hope-arena font-bold">WhatsApp</p>
                <p className="text-sm md:text-base font-bold">+54 3496 55-7841</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-hope-white rounded-sm flex items-center justify-center text-hope-orange shadow-sm">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-hope-arena font-bold">Email</p>
                <p className="text-sm md:text-base font-bold">hopecontenedores@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-hope-white rounded-sm flex items-center justify-center text-hope-orange shadow-sm">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-hope-arena font-bold">Ubicación</p>
                <p className="text-sm md:text-base font-bold">Esperanza, Santa Fe</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-hope-white p-6 md:p-10 rounded-sm border border-hope-border shadow-sm mt-12 lg:mt-0">
          <form className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-hope-arena">Uso</label>
                <select className="w-full bg-transparent border-b border-[#E7E3DA] p-3 md:p-4 text-sm focus:outline-none focus:border-hope-orange transition-colors">
                  <option>Particular</option>
                  <option>Empresa</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-hope-arena">m² aprox</label>
                <input type="text" placeholder="Ej: 30" className="w-full bg-transparent border-b border-[#E7E3DA] p-3 md:p-4 text-sm focus:outline-none focus:border-hope-orange transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-hope-arena">Ciudad de destino</label>
              <input type="text" placeholder="Ej: Rosario" className="w-full bg-transparent border-b border-[#E7E3DA] p-3 md:p-4 text-sm focus:outline-none focus:border-hope-orange transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-hope-arena">Mensaje</label>
              <textarea rows={3} placeholder="Contanos más..." className="w-full bg-transparent border-b border-[#E7E3DA] p-3 md:p-4 text-sm focus:outline-none focus:border-hope-orange transition-colors"></textarea>
            </div>
            <button className="w-full bg-hope-orange text-hope-white py-4 md:py-6 rounded-sm font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-hope-text transition-all shadow-xl shadow-hope-orange/20">
              Enviar Consulta
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/543496557841"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-3 group"
  >
    <WhatsAppIcon size={24} />
    <span className="text-[10px] font-bold uppercase tracking-widest">
      Cotizar ahora
    </span>
  </a>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-28 right-8 z-[100] bg-hope-white text-hope-text p-4 rounded-full shadow-2xl border border-hope-border hover:bg-hope-orange hover:text-hope-white transition-all group"
          aria-label="Volver arriba"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [segment, setSegment] = useState<'particular' | 'empresa'>('particular');
  const [selectedModel, setSelectedModel] = useState<ModelCard | null>(null);

  // Sync segment with URL query
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('segment');
    if (s === 'particular' || s === 'empresa') {
      setSegment(s);
    }
  }, []);

  const handleSelectSegment = (s: 'particular' | 'empresa') => {
    setSegment(s);
    const newUrl = `${window.location.pathname}?segment=${s}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    const el = document.getElementById('modelos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-hope-bg selection:bg-hope-arena selection:text-hope-white">
      <Navbar segment={segment} onSelectSegment={setSegment} />
      <Hero onSelectSegment={handleSelectSegment} />
      <TrustStrip />
      <About />
      <WhyModularSection />
      <ProcessSection />
      <ModelsSection 
        segment={segment} 
        onSelectSegment={setSegment} 
        onViewModel={(m) => setSelectedModel(m)}
      />
      <QualityComparison />
      <FactoryVisit />
      <FAQSection />
      <ContactSection />
      
      {/* Cierre CTA */}
      <section className="py-20 md:py-32 bg-hope-white text-center border-t border-hope-border">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display-bold mb-8 md:mb-10">¿Listo para empezar?</h2>
          <a 
            href="https://wa.me/543496557841?text=Hola! Quiero cotizar un proyecto."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-hope-orange text-white px-8 md:px-12 py-5 md:py-6 rounded-sm font-bold uppercase tracking-widest text-[10px] md:text-sm hover:scale-105 transition-transform shadow-2xl"
          >
            Cotizar por WhatsApp <WhatsAppIcon size={18} />
          </a>
        </div>
      </section>

      <footer className="py-12 md:py-16 border-t border-hope-border text-center">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Hope Logo" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
        </div>  
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-hope-arena font-bold px-6">
          © 2026 Hope Construcción Modular. Esperanza, Santa Fe.
        </p>
      </footer>

      <WhatsAppButton />
      <ScrollToTop />

      <AnimatePresence>
        {selectedModel && (
          <ModelDetail 
            model={selectedModel} 
            onClose={() => setSelectedModel(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
