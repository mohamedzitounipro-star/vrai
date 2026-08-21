/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  CarFront
} from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

// --- Static Data ---

const EXPERIENCES = [
  {
    date: "2024 — PRÉSENT",
    title: "CONVOYEUR & CONSEILLER",
    subtitle: "RENAULT / PEUGEOT / INDÉPENDANT",
    desc: "Gestion de la logistique et de la mise en main client. Livraison premium, expertise technique et administrative.",
    img: "https://i.postimg.cc/3RPCcNk1/exp-convoyeur.jpg",
    kpis: [{ val: "200+", label: "Livraisons et mises en main" }, { val: "100%", label: "Satisfaction" }]
  },
  {
    date: "2022 — 2023",
    title: "VENDEUR AUTOMOBILE",
    subtitle: "DUTTON ONE — AUSTRALIE",
    desc: "Vente de véhicules d'exception sur le marché australien. 30+ ventes réalisées dans un environnement ultra-compétitif.",
    img: "https://i.postimg.cc/tTtW2kHQ/exp-vendeur.jpg",
    kpis: [{ val: "30+", label: "Véhicules vendus" }, { val: "1 M$+", label: "CA Généré" }]
  },
  {
    date: "2023 — PRÉSENT",
    title: "DÉVELOPPEUR WEB",
    subtitle: "FREELANCE",
    desc: "Création d'écosystèmes digitaux (sites vitrines, e-commerce, web apps). Stratégies d'acquisition en solo et gestion de campagnes publicitaires. Allier expertise technique et performance commerciale.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
    kpis: [{ val: "Web & Pub", label: "Création" }, { val: "360°", label: "Acquisition" }]
  }
];

const PREVIOUS_EXPERIENCES = [
  { date: "2021 — 2022", title: "RESPONSABLE MARKETING", company: "YELLOCLOUD · LYON", desc: "Création de sites web, supports de communication, community management et sourcing commercial." },
  { date: "2019 — 2021", title: "CONSEILLER VENTE MULTIMÉDIA", company: "AUCHAN · LA GLACERIE", desc: "Conseil client, gestion des commandes et des stocks." },
  { date: "JANV. 2020", title: "COMMERCIAL STAGIAIRE", company: "CITROËN · TOURLAVILLE", desc: "Financement, conseil client et suivi satisfaction de la commande à la livraison." },
  { date: "2018 — 2019", title: "COMMERCIAL STAGIAIRE", company: "MERCEDES-BENZ & SMART", desc: "Rappelé suite au 1er stage ✓ Financement, découverte client et réalisation de clip promotionnel." }
];

const SKILLS = [
  {
    title: "LOGISTIQUE & LIVRAISON",
    skills: ["Coordination des acheminements", "Contrôle qualité & conformité VN/VO", "Mise en main premium", "Convoyage International"]
  },
  {
    title: "PERFORMANCE COMMERCIALE",
    skills: ["Vente B2B/B2C", "Conseil & Financement", "Prospection Terrain", "Fidélisation Client"]
  },
  {
    title: "MOTEUR DIGITAL",
    skills: ["Outils CRM & DMS", "Développement Web", "Stratégie Marketing", "Acquisition Digitale"]
  }
];

const GALLERY_IMAGES = [
  {
    src: "https://i.postimg.cc/VvJsds4L/galerie-1.jpg",
    alt: "Showroom automobile"
  },
  {
    src: "https://i.postimg.cc/t4sRXNDK/galerie-2.jpg",
    alt: "Détail volant"
  },
  {
    src: "https://i.postimg.cc/k5N09VrH/galerie-3.jpg",
    alt: "Code sur écran"
  },
  {
    src: "https://i.postimg.cc/yN3wggCn/galeriee4.jpg",
    alt: "Voiture classique"
  }
];

// --- Components ---

const InteractiveKPI = ({ val, label }: { val: string, label: string, key?: number | string }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <motion.div 
      onClick={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
      animate={isAnimating ? { scale: [1, 1.15, 1] } : { scale: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="cursor-pointer select-none will-change-transform"
    >
      <p className="text-xl md:text-2xl font-display text-accent mb-1">{val}</p>
      <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-ink/40">{label}</p>
    </motion.div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Add a class to disable transitions temporarily
    document.documentElement.classList.add('theme-transitioning');
    
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }

    // Remove the class after a short delay to re-enable transitions
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 50);

    return () => clearTimeout(timeout);
  }, [isDarkMode]);

  return (
    <div className="min-h-[100dvh] selection:bg-accent selection:text-bg bg-bg text-ink cursor-default overflow-x-hidden carbon-pattern">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 md:h-1 bg-accent z-[10000] origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

      <main>
        {/* Hero Section - Magazine Style */}
        <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
          {/* Static Image Background - Maximum Performance */}
          <div className="absolute inset-0 z-0 bg-surface overflow-hidden">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2000" 
                alt="Luxury Car in Garage"
                className="w-full h-full object-cover will-change-transform"
                referrerPolicy="no-referrer"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                decoding="async"
              />
            </motion.div>
            
            {/* Gradient Overlays for readability and premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
            
            {/* Static Glow instead of interactive */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none" 
              style={{ background: 'radial-gradient(circle, rgba(255, 78, 0, 0.15) 0%, transparent 70%)' }} 
            />
          </div>

          <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full mt-28 md:mt-32 lg:mt-0">
            {/* Inline Edition Label */}
            <div className="flex flex-col md:flex-row items-baseline gap-4 mb-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <span className="text-accent font-mono text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase whitespace-nowrap transition-colors duration-200">
                  Édition N° 01 / 2026
                </span>
              </motion.div>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-px flex-grow bg-ink/20 origin-left" 
              />
            </div>

            <div className="relative">
              <div className="text-reveal-container">
                <motion.div 
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                >
                  <h1 className="text-[18vw] md:text-[14vw] leading-[0.8] font-display italic tracking-tighter text-ink transition-colors duration-200">
                    MOHAMED
                  </h1>
                </motion.div>
              </div>
              <div className="text-reveal-container">
                <motion.div 
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <h1 className="text-[18vw] md:text-[14vw] leading-[0.8] text-accent font-display font-black tracking-normal transition-colors duration-200">
                    ZITOUNI
                  </h1>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="relative mt-6 md:absolute md:-bottom-12 right-0 md:right-auto md:left-0 flex flex-col items-start"
              >
                <p className="text-lg sm:text-xl md:text-3xl font-display uppercase tracking-widest text-ink/60">
                  Vente & <span className="text-ink">Opérations</span>
                </p>
                <div className="w-24 md:w-32 h-1 bg-accent mt-4" />
              </motion.div>
            </div>

            <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p className="text-xl sm:text-2xl md:text-4xl font-light leading-tight text-ink/90 drop-shadow-md transition-colors duration-200">
                    Expert en <span className="text-accent font-bold italic">performance commerciale</span>, 
                    <span className="text-accent font-bold italic">conseil livraison</span>, <span className="text-accent font-bold italic">convoyage</span> et <span className="text-accent font-bold italic">développement web</span>. 
                    Plus de 200 véhicules livrés, 30+ ventes à l'international et création d'expériences digitales sur mesure.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="mt-8 md:mt-12 flex flex-col items-start"
                >
                  <a 
                    href="#contact" 
                    className="relative overflow-hidden inline-flex items-center px-8 py-4 md:px-10 md:py-5 bg-accent text-ink text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] group w-full sm:w-auto justify-center cursor-pointer"
                  >
                    <div className="absolute inset-0 w-full h-full bg-ink origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></div>
                    <span className="relative z-10 group-hover:text-bg transition-colors duration-300 ease-out">Démarrer le moteur</span>
                    <ArrowRight size={16} className="relative z-10 ml-4 group-hover:translate-x-2 group-hover:text-bg transition-all duration-300 ease-out" />
                  </a>
                </motion.div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-end">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="grid grid-cols-3 gap-4 sm:gap-8 border-t border-ink/20 pt-8 transition-colors duration-200">
                    {[
                      { val: "200+", label: "Véhicules Livrés" },
                      { val: "1 M$+", label: "Volume de Ventes" },
                      { val: "360°", label: "Expertise Digitale" },
                    ].map((stat, i) => (
                      <div key={i} className="group">
                        <p className="text-2xl sm:text-3xl font-display text-accent transition-colors duration-200">{stat.val}</p>
                        <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-ink/60 transition-colors duration-200">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-12 md:mt-16 pb-12 md:pb-24"
            >
              <p className="text-ink/60 text-sm md:text-base font-light border-l-2 border-accent pl-4 max-w-md">
                Prêt à relever de nouveaux défis. <br/>
                <span className="text-ink font-medium">Vente, expérience client et gestion des opérations.</span>
              </p>
            </motion.div>
          </div>
          
          {/* Vertical Rail Text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute right-6 top-[40%] -translate-y-1/2 hidden lg:block"
          >
            <span className="vertical-text">Expert Automobile & Digital — Depuis 2018</span>
          </motion.div>
        </section>

        {/* Profile Section - Split Layout */}
        <section id="profil" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-0">
          <SectionTitle number="01">Le Châssis</SectionTitle>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mt-12 md:mt-20">
            <div className="relative order-2 lg:order-1 lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="aspect-square sm:aspect-[4/3] lg:aspect-[4/5] bg-surface relative overflow-hidden group"
              >
                <img 
                  src="https://i.postimg.cc/15z5jBZL/profil-cockpit.jpg" 
                  alt="Détail intérieur automobile" 
                  className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 will-change-transform"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 border-[12px] md:border-[20px] border-bg pointer-events-none" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-accent p-4 md:p-6 z-10">
                  <p className="text-xl md:text-2xl font-display leading-none text-bg">AUX COMMANDES</p>
                  <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-1 text-bg/70">Pilotage & Opérations</p>
                </div>
              </motion.div>
            </div>
            
            <div className="space-y-8 md:space-y-12 order-1 lg:order-2 lg:col-span-7 lg:pt-4">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-surface p-6 md:p-10 border border-ink/10 shadow-2xl"
              >
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-ink/90">
                  Plus qu'une passion, l'automobile est mon terrain d'expertise. De la vente de véhicules d'exception en Australie à la logistique du dernier kilomètre en Île-de-France, j'ai développé une <span className="text-accent font-display">vision globale du secteur</span>.
                  <br/><br/>
                  Mon profil est hybride : je combine la rigueur opérationnelle (contrôle de conformité, gestion des flux), le sens du commerce et une forte culture digitale (développement web, CRM). Mon objectif ? Apporter des solutions concrètes et optimiser les processus, que ce soit sur le terrain, en concession ou dans l'écosystème digital de l'entreprise.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-6 md:gap-8 pt-4 border-t border-ink/10">
                {[
                  { label: "Concession", val: "Villeparisis (77)" },
                  { label: "Permis", val: "B (Véhicule Perso)" },
                  { label: "Motorisation", val: "Commerce & Logistique" },
                  { label: "Statut", val: "Sur la grille de départ" },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="border-l-2 border-accent pl-4 md:pl-6 py-1 md:py-2"
                  >
                    <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-1">{item.label}</p>
                    <p className="text-sm md:text-base lg:text-lg font-display">{item.val}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience - Magazine Cards */}
        <section id="parcours" className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto relative z-0">
          <SectionTitle number="02">Carnet d'entretien</SectionTitle>
          
          <div className="mt-10 md:mt-20 flex flex-col gap-12 md:gap-24">
            {EXPERIENCES.map((exp, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-surface border border-ink/10 p-6 md:p-12 flex flex-col lg:flex-row gap-8 md:gap-16 items-center shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="w-full lg:w-1/2 order-2 lg:order-1">
                  <span className="text-accent font-mono text-[10px] md:text-xs mb-3 md:mb-4 block">{exp.date}</span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 leading-none">{exp.title}</h3>
                  <p className="text-ink/40 font-bold mb-4 md:mb-6 tracking-widest text-xs md:text-sm">{exp.subtitle}</p>
                  <p className="text-base sm:text-lg text-ink/70 leading-relaxed mb-8">{exp.desc}</p>
                  
                  <div className="flex gap-8 md:gap-12 border-t border-ink/10 pt-6">
                    {exp.kpis.map((kpi, idx) => (
                      <InteractiveKPI key={idx} val={kpi.val} label={kpi.label} />
                    ))}
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2 order-1 lg:order-2">
                  <div className="w-full aspect-[4/3] md:aspect-video relative overflow-hidden">
                    <img 
                      src={exp.img} 
                      alt={exp.title} 
                      className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 will-change-transform"
                      referrerPolicy="no-referrer"
                      decoding="async"
                      loading="lazy"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Autres Expériences - Compact Grid */}
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-ink/10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-1/3">
              <h3 className="text-xl md:text-2xl font-display uppercase tracking-widest mb-4">Parcours Antérieur</h3>
              <p className="text-ink/50 text-sm leading-relaxed">Fondations et expériences formatrices dans le secteur de la vente, du service client et de l'automobile.</p>
            </div>
            <div className="md:w-2/3 relative">
              {/* Timeline Road */}
              <div className="absolute left-4 md:left-8 top-0 bottom-0 border-l-2 border-dashed border-ink/20"></div>
              
              {/* Car Icon at the start of the road */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-[1px] md:left-[17px] top-0 bg-surface p-1.5 rounded-full border border-ink/10 z-10 text-accent shadow-sm"
              >
                <CarFront size={16} />
              </motion.div>

              <div className="flex flex-col gap-8 pt-16">
                {PREVIOUS_EXPERIENCES.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pl-12 md:pl-20"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-[10px] md:left-[26px] top-2 w-3 h-3 rounded-full bg-surface border-2 border-accent z-10"></div>
                    
                    <div className="p-6 border border-ink/10 bg-ink/5 hover:bg-ink/10 transition-colors flex flex-col group relative overflow-hidden">
                      {/* Subtle hover effect background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <p className="text-accent text-xs font-bold tracking-widest mb-2">{item.date}</p>
                        <h4 className="text-ink font-display uppercase tracking-widest text-lg md:text-xl mb-1 group-hover:text-accent transition-colors duration-300">{item.title}</h4>
                        <p className="text-ink/50 text-xs uppercase tracking-widest mb-3">{item.company}</p>
                        <p className="text-ink/70 text-sm leading-relaxed mt-auto">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills - Technical Specs Style */}
        <section id="competences" className="py-20 md:py-32 bg-surface relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-0">
            <SectionTitle number="03">Fiche Technique</SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mt-12 md:mt-20">
              {SKILLS.map((cat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-ink/10 pt-6 md:pt-8"
                >
                  <h4 className="text-accent text-xl md:text-2xl mb-6 md:mb-10">{cat.title}</h4>
                  <ul className="space-y-4 md:space-y-6">
                    {cat.skills.map((s, j) => (
                      <li key={j} className="flex items-center justify-between group cursor-default">
                        <span className="text-xs md:text-sm font-bold tracking-widest text-ink/60 group-hover:text-ink transition-colors">{s}</span>
                        <div className="h-px flex-grow mx-4 bg-ink/5 group-hover:bg-accent transition-colors" />
                        <span className="text-accent font-mono text-[10px] md:text-xs">OK</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Galerie Photo */}
        <section id="galerie" className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto relative z-0">
          <SectionTitle number="04">Galerie</SectionTitle>
          
          <div className="mt-12 md:mt-20 flex flex-col gap-8 md:gap-12">
            {/* Image 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-surface border border-ink/10 overflow-hidden group p-4 md:p-8"
            >
               <img src={GALLERY_IMAGES[0].src} alt={GALLERY_IMAGES[0].alt} className="w-full h-auto max-h-[85vh] object-contain grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 will-change-transform" referrerPolicy="no-referrer" decoding="async" loading="lazy" draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </motion.div>
            
            {/* Image 2 & 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "100px" }}
                 transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                 className="w-full bg-surface border border-ink/10 overflow-hidden group p-4 md:p-8"
               >
                 <img src={GALLERY_IMAGES[1].src} alt={GALLERY_IMAGES[1].alt} className="w-full h-auto max-h-[70vh] object-contain grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 will-change-transform" referrerPolicy="no-referrer" decoding="async" loading="lazy" draggable="false" onContextMenu={(e) => e.preventDefault()} />
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "100px" }}
                 transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                 className="w-full bg-surface border border-ink/10 overflow-hidden group p-4 md:p-8"
               >
                 <img src={GALLERY_IMAGES[2].src} alt={GALLERY_IMAGES[2].alt} className="w-full h-auto max-h-[70vh] object-contain grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 will-change-transform" referrerPolicy="no-referrer" decoding="async" loading="lazy" draggable="false" onContextMenu={(e) => e.preventDefault()} />
               </motion.div>
            </div>
            
            {/* Image 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-surface border border-ink/10 overflow-hidden group p-4 md:p-8"
            >
               <img src={GALLERY_IMAGES[3].src} alt={GALLERY_IMAGES[3].alt} className="w-full h-auto max-h-[85vh] object-contain grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 will-change-transform" referrerPolicy="no-referrer" decoding="async" loading="lazy" draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </motion.div>
          </div>
        </section>

        {/* Contact - Final Call */}
        <section id="contact" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "100px" }}
          >
            <h2 className="text-[15vw] md:text-[10vw] leading-none mb-4 md:mb-6">
              PASSER LA <span className="text-accent italic">SECONDE</span>
            </h2>
            <p className="text-ink/50 uppercase tracking-widest text-xs md:text-sm mb-8 md:mb-12">
              Le moteur tourne. Prêt pour le prochain défi.
            </p>

            <div className="flex justify-center mb-10 md:mb-16">
              <div 
                className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-surface shadow-xl relative group"
                onContextMenu={(e) => e.preventDefault()}
              >
                <img 
                  src="https://i.postimg.cc/Hx9fp0dn/contact-moi.jpg" 
                  alt="Mohamed Zitouni" 
                  className="w-full h-full object-cover scale-[1.4] -translate-x-[15%] translate-y-[5%] grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-500 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20">
              <a href="mailto:mohamedzitouni.pro@gmail.com" className="group text-center">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-ink/40 mb-3 md:mb-4 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  Email
                </p>
                <p className="text-lg sm:text-2xl md:text-4xl font-display group-hover:text-accent transition-colors break-all sm:break-normal">
                  mohamedzitouni.pro@gmail.com
                </p>
              </a>
              <a href="tel:0762055190" className="group text-center">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-ink/40 mb-3 md:mb-4 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  Téléphone
                </p>
                <p className="text-xl sm:text-2xl md:text-4xl font-display group-hover:text-accent transition-colors">
                  07 62 05 51 90
                </p>
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 md:py-12 border-t border-ink/5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-ink/20 text-center md:text-left">
            © 2026 MZ PORTFOLIO — TOUS DROITS RÉSERVÉS
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-ink/40">FRANCE</span>
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-ink/40">AUSTRALIE</span>
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-ink/40">EUROPE</span>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-200 ${isScrolled ? "glass py-4" : "py-6 md:py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-3xl font-display font-black tracking-tighter relative z-50 transition-colors duration-200">
          MZ<span className="text-accent">.</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: "Châssis", id: "profil" },
            { name: "Entretien", id: "parcours" },
            { name: "Compétences", id: "competences" },
            { name: "Contact", id: "contact" }
          ].map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-accent transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center relative z-50">
          <button 
            className="p-2 -mr-2 text-ink transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 w-full h-[100dvh] bg-bg/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 z-40"
            >
              {[
                { name: "Châssis", id: "profil" },
                { name: "Entretien", id: "parcours" },
                { name: "Compétences", id: "competences" },
                { name: "Contact", id: "contact" }
              ].map((link) => (
                <a 
                  key={link.id} 
                  href={`#${link.id}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display uppercase tracking-widest hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const SectionTitle = ({ children, number }: { children: ReactNode, number: string }) => (
  <div className="relative mb-16">
    <div className="big-number">{number}</div>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-sm font-mono text-accent tracking-[0.5em] flex items-center">
        <span className="w-12 h-px bg-accent mr-4" />
        {children}
      </h2>
    </motion.div>
  </div>
);

const ThemeToggle = ({ isDarkMode, toggleTheme }: { isDarkMode: boolean, toggleTheme: () => void }) => {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
      <button
        onClick={toggleTheme}
        className={`w-11 h-6 rounded-full p-1 flex items-center transition-colors duration-300 ease-in-out focus:outline-none shadow-lg backdrop-blur-md border border-ink/5 ${
          isDarkMode ? 'bg-accent' : 'bg-ink/20'
        }`}
        aria-label="Toggle theme"
      >
        <motion.div
          className="w-4 h-4 bg-bg rounded-full shadow-sm flex items-center justify-center"
          animate={{ x: isDarkMode ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {isDarkMode ? (
            <Moon size={10} className="text-accent" />
          ) : (
            <Sun size={10} className="text-ink/70" />
          )}
        </motion.div>
      </button>
    </div>
  );
};
