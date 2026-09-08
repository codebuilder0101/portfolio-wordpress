import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    hello: "Hello, I'm",
    name: "Davi José da Silva.",
    title: "Professional WordPress Developer.",
    intro: "A professional WordPress developer with 10+ years of experience in WordPress website design, development, redesign, and custom website solutions. I build modern, responsive, SEO-friendly, and high-performing websites tailored to your business goals.",
    learnMore: "Learn More",
    aboutTitle: "About My Service",
    aboutP1: "Looking for a modern, high-converting WordPress website built by an expert WordPress developer? You're in the right place!",
    aboutP2: "With 10+ years of professional experience, I specialize in WordPress design and redesign, custom WordPress sites, WordPress business sites, and WooCommerce solutions. I build modern, responsive, SEO-friendly, fast-loading, and secure sites tailored to your business goals.",
    aboutP3: "Whether you need a new WordPress design or redesign, I'll deliver a premium site that strengthens your brand, attracts customers, and drives business growth.",
    aboutSkills: "Here are some of my key expertise areas:",
    whatIOffer: "What I Offer",
    nav: {
      about: "About",
      experience: "Experience",
      work: "Work",
    },
    skills: [
      'WordPress Development',
      'WooCommerce',
      'Elementor Pro',
      'Landing Pages',
      'SEO Optimization',
      'Speed Optimization',
      'Website Security',
      'HTML5 & CSS3',
    ],
  },
  es: {
    hello: "Hola, soy",
    name: "Davi José da Silva.",
    title: "Desarrollador WordPress Profesional.",
    intro: "Desarrollador de WordPress con más de 10 años de experiencia en diseño, desarrollo y rediseño de sitios web, además de soluciones a la medida. Hago sitios modernos, responsivos, optimizados para SEO y con muy buen rendimiento, siempre pensados en los objetivos de tu negocio.",
    learnMore: "Saber Más",
    aboutTitle: "Sobre Mi Servicio",
    aboutP1: "¿Buscas un sitio web WordPress moderno y de alta conversión construido por un desarrollador experto? ¡Estás en el lugar correcto!",
    aboutP2: "Con más de 10 años de experiencia profesional, me especializo en diseño y rediseño de WordPress, sitios personalizados, sitios empresariales y soluciones WooCommerce. Construyo sitios modernos, responsivos, optimizados para SEO, de carga rápida y seguros.",
    aboutP3: "Ya sea que necesites un nuevo diseño o rediseño de WordPress, te entregaré un sitio premium que fortalece tu marca, atrae clientes e impulsa el crecimiento de tu negocio.",
    aboutSkills: "Estas son algunas de mis áreas de experiencia:",
    whatIOffer: "Lo Que Ofrezco",
    nav: {
      about: "Sobre Mí",
      experience: "Experiencia",
      work: "Trabajo",
    },
    skills: [
      'Desarrollo WordPress',
      'WooCommerce',
      'Elementor Pro',
      'Landing Pages',
      'Optimización SEO',
      'Optimización de Velocidad',
      'Seguridad Web',
      'HTML5 & CSS3',
    ],
  },
  pt: {
    hello: "Oi, eu sou",
    name: "Davi José da Silva.",
    title: "Desenvolvedor WordPress Profissional.",
    intro: "Desenvolvedor WordPress com mais de 10 anos de experiência em design, desenvolvimento, redesign e soluções personalizadas de sites. Entrego sites modernos, responsivos, otimizados para SEO e com excelente desempenho, sempre pensados nos objetivos do seu negócio.",
    learnMore: "Saiba Mais",
    aboutTitle: "Sobre Meu Serviço",
    aboutP1: "Procurando um site WordPress moderno e de alta conversão construído por um desenvolvedor especialista? Você está no lugar certo!",
    aboutP2: "Com mais de 10 anos de experiência profissional, me especializo em design e redesign WordPress, sites personalizados, sites empresariais e soluções WooCommerce. Construo sites modernos, responsivos, otimizados para SEO, de carregamento rápido e seguros.",
    aboutP3: "Se você precisa de um novo design ou redesign WordPress, entregarei um site premium que fortalece sua marca, atrai clientes e impulsiona o crescimento do seu negócio.",
    aboutSkills: "Aqui estão algumas das minhas áreas de expertise:",
    whatIOffer: "O Que Eu Ofereço",
    nav: {
      about: "Sobre",
      experience: "Experiência",
      work: "Trabalho",
    },
    skills: [
      'Desenvolvimento WordPress',
      'WooCommerce',
      'Elementor Pro',
      'Landing Pages',
      'Otimização SEO',
      'Otimização de Velocidade',
      'Segurança Web',
      'HTML5 & CSS3',
    ],
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
