import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const LanguageContext = createContext();

export const translations = {
  en: {
    hello: 'Hello, I\'m',
    name: 'Davi José da Silva.',
    title: 'WordPress & Shopify Developer.',
    intro:
      'I design, develop and optimize e-commerce experiences that help brands look professional, load fast and convert more of the traffic they already have.',
    learnMore: 'Learn More',
    aboutTitle: 'About My Service',
    aboutP1:
      'Looking for a modern, high-converting WordPress or Shopify store built by an expert developer? You\'re in the right place!',
    aboutP2:
      'With 10+ years of professional experience, I specialize in WordPress design and redesign, custom sites, and WooCommerce and Shopify stores — from theme development and Liquid customization to TikTok Shop integration. I build modern, responsive, SEO-friendly, fast-loading and secure stores tailored to your business goals.',
    aboutP3:
      'Whether you need a new build, a redesign, or conversion rate optimization on a store you already run, I\'ll deliver a premium experience that strengthens your brand, attracts customers and drives business growth.',
    aboutSkills: 'Here are some of my key expertise areas:',
    whatIOffer: 'What I Offer',
    proofEyebrow: 'Proof of Results',
    proofTitle: 'Real revenue from stores I\'ve built and optimized',
    proofSubtitle:
      'Screenshots taken straight from client Shopify, Google Analytics and TikTok Shop dashboards.',
    proofSource: 'Source',
    proofCards: {
      lavishChic: {
        label: 'Total Revenue',
        description:
          '32K users driven to a rebuilt storefront with restructured collections and product pages.',
      },
      lumiereSkin: {
        label: 'Total Sales',
        description:
          '2.54% conversion rate after a full redesign, speed work and checkout clean-up.',
      },
      beautyGlow: {
        label: 'Revenue',
        description:
          '28K users at a 2.85% conversion rate following CRO and product page optimization.',
      },
    },
    problemEyebrow: 'The Problem',
    problemTitle: 'Most stores lose sales for the same reasons',
    problemSubtitle:
      'Traffic is rarely the real issue. The experience customers land on usually is.',
    problemCards: {
      storeExperience: {
        title: 'Poor Store Experience',
        description:
          'Customers leave when a store feels confusing, outdated, or difficult to navigate.',
      },
      lowConversion: {
        title: 'Low Conversion',
        description:
          'Traffic means little when product pages, trust signals, and checkout journeys are not optimized.',
      },
      brandPresentation: {
        title: 'Weak Brand Presentation',
        description: 'A professional brand deserves a storefront that communicates credibility.',
      },
      technicalFriction: {
        title: 'Technical Friction',
        description:
          'Slow pages, poor mobile experiences, broken sections, and unnecessary complexity can cost sales.',
      },
    },
    featuredTitle: 'Featured Projects',
    allProjects: 'All Projects',
    nav: {
      about: 'About',
      experience: 'Experience',
      work: 'Work',
    },
    skills: [
      'Shopify Development',
      'Shopify Theme & Liquid',
      'WordPress Development',
      'WooCommerce',
      'TikTok Shop',
      'Conversion Rate Optimization',
      'Elementor Pro',
      'SEO Optimization',
      'Speed Optimization',
      'Website Security',
    ],
  },
  es: {
    hello: 'Hola, soy',
    name: 'Davi José da Silva.',
    title: 'Desarrollador WordPress y Shopify.',
    intro:
      'Diseño, desarrollo y optimizo experiencias de e-commerce que ayudan a las marcas a verse profesionales, cargar rápido y convertir más del tráfico que ya tienen.',
    learnMore: 'Saber Más',
    aboutTitle: 'Sobre Mi Servicio',
    aboutP1:
      '¿Buscas una tienda WordPress o Shopify moderna y de alta conversión construida por un desarrollador experto? ¡Estás en el lugar correcto!',
    aboutP2:
      'Con más de 10 años de experiencia profesional, me especializo en diseño y rediseño de WordPress, sitios personalizados, y tiendas WooCommerce y Shopify — desde el desarrollo de temas y la personalización con Liquid hasta la integración con TikTok Shop. Construyo tiendas modernas, responsivas, optimizadas para SEO, de carga rápida y seguras.',
    aboutP3:
      'Ya sea que necesites una tienda nueva, un rediseño u optimización de conversión en una tienda que ya tienes, te entregaré una experiencia premium que fortalece tu marca, atrae clientes e impulsa el crecimiento de tu negocio.',
    aboutSkills: 'Estas son algunas de mis áreas de experiencia:',
    whatIOffer: 'Lo Que Ofrezco',
    proofEyebrow: 'Prueba de Resultados',
    proofTitle: 'Ingresos reales de tiendas que he construido y optimizado',
    proofSubtitle:
      'Capturas tomadas directamente de los paneles de Shopify, Google Analytics y TikTok Shop de clientes.',
    proofSource: 'Fuente',
    proofCards: {
      lavishChic: {
        label: 'Ingresos Totales',
        description:
          '32K usuarios dirigidos a una tienda reconstruida con colecciones y páginas de producto reestructuradas.',
      },
      lumiereSkin: {
        label: 'Ventas Totales',
        description:
          'Tasa de conversión del 2,54% tras un rediseño completo, trabajo de velocidad y limpieza del checkout.',
      },
      beautyGlow: {
        label: 'Ingresos',
        description:
          '28K usuarios con una tasa de conversión del 2,85% tras CRO y optimización de páginas de producto.',
      },
    },
    problemEyebrow: 'El Problema',
    problemTitle: 'La mayoría de las tiendas pierden ventas por las mismas razones',
    problemSubtitle:
      'El tráfico rara vez es el problema real. Normalmente lo es la experiencia con la que se encuentran los clientes.',
    problemCards: {
      storeExperience: {
        title: 'Mala Experiencia de Tienda',
        description:
          'Los clientes se van cuando una tienda resulta confusa, anticuada o difícil de navegar.',
      },
      lowConversion: {
        title: 'Baja Conversión',
        description:
          'El tráfico sirve de poco cuando las páginas de producto, las señales de confianza y el checkout no están optimizados.',
      },
      brandPresentation: {
        title: 'Presentación de Marca Débil',
        description: 'Una marca profesional merece una tienda que comunique credibilidad.',
      },
      technicalFriction: {
        title: 'Fricción Técnica',
        description:
          'Páginas lentas, mala experiencia móvil, secciones rotas y complejidad innecesaria pueden costar ventas.',
      },
    },
    featuredTitle: 'Proyectos Destacados',
    allProjects: 'Todos los Proyectos',
    nav: {
      about: 'Sobre Mí',
      experience: 'Experiencia',
      work: 'Trabajo',
    },
    skills: [
      'Desarrollo Shopify',
      'Temas Shopify & Liquid',
      'Desarrollo WordPress',
      'WooCommerce',
      'TikTok Shop',
      'Optimización de Conversión',
      'Elementor Pro',
      'Optimización SEO',
      'Optimización de Velocidad',
      'Seguridad Web',
    ],
  },
  pt: {
    hello: 'Oi, eu sou',
    name: 'Davi José da Silva.',
    title: 'Desenvolvedor WordPress e Shopify.',
    intro:
      'Eu projeto, desenvolvo e otimizo experiências de e-commerce que ajudam marcas a parecerem profissionais, carregarem rápido e converterem mais do tráfego que já possuem.',
    learnMore: 'Saiba Mais',
    aboutTitle: 'Sobre Meu Serviço',
    aboutP1:
      'Procurando uma loja WordPress ou Shopify moderna e de alta conversão construída por um desenvolvedor especialista? Você está no lugar certo!',
    aboutP2:
      'Com mais de 10 anos de experiência profissional, me especializo em design e redesign WordPress, sites personalizados, e lojas WooCommerce e Shopify — do desenvolvimento de temas e personalização com Liquid até a integração com o TikTok Shop. Construo lojas modernas, responsivas, otimizadas para SEO, de carregamento rápido e seguras.',
    aboutP3:
      'Seja uma loja nova, um redesign ou otimização de conversão em uma loja que você já tem, entregarei uma experiência premium que fortalece sua marca, atrai clientes e impulsiona o crescimento do seu negócio.',
    aboutSkills: 'Aqui estão algumas das minhas áreas de expertise:',
    whatIOffer: 'O Que Eu Ofereço',
    proofEyebrow: 'Prova de Resultados',
    proofTitle: 'Receita real de lojas que construí e otimizei',
    proofSubtitle:
      'Capturas de tela tiradas diretamente dos painéis de Shopify, Google Analytics e TikTok Shop dos clientes.',
    proofSource: 'Fonte',
    proofCards: {
      lavishChic: {
        label: 'Receita Total',
        description:
          '32K usuários direcionados a uma loja reconstruída com coleções e páginas de produto reestruturadas.',
      },
      lumiereSkin: {
        label: 'Vendas Totais',
        description:
          'Taxa de conversão de 2,54% após um redesign completo, trabalho de velocidade e limpeza do checkout.',
      },
      beautyGlow: {
        label: 'Receita',
        description:
          '28K usuários com taxa de conversão de 2,85% após CRO e otimização das páginas de produto.',
      },
    },
    problemEyebrow: 'O Problema',
    problemTitle: 'A maioria das lojas perde vendas pelos mesmos motivos',
    problemSubtitle:
      'O tráfego raramente é o problema real. Normalmente, é a experiência que os clientes encontram.',
    problemCards: {
      storeExperience: {
        title: 'Experiência de Loja Ruim',
        description:
          'Os clientes saem quando uma loja parece confusa, desatualizada ou difícil de navegar.',
      },
      lowConversion: {
        title: 'Baixa Conversão',
        description:
          'O tráfego significa pouco quando as páginas de produto, os sinais de confiança e o checkout não estão otimizados.',
      },
      brandPresentation: {
        title: 'Apresentação de Marca Fraca',
        description: 'Uma marca profissional merece uma loja que comunique credibilidade.',
      },
      technicalFriction: {
        title: 'Fricção Técnica',
        description:
          'Páginas lentas, experiência mobile ruim, seções quebradas e complexidade desnecessária podem custar vendas.',
      },
    },
    featuredTitle: 'Projetos em Destaque',
    allProjects: 'Todos os Projetos',
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      work: 'Trabalho',
    },
    skills: [
      'Desenvolvimento Shopify',
      'Temas Shopify & Liquid',
      'Desenvolvimento WordPress',
      'WooCommerce',
      'TikTok Shop',
      'Otimização de Conversão',
      'Elementor Pro',
      'Otimização SEO',
      'Otimização de Velocidade',
      'Segurança Web',
    ],
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt');

  const t = key => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
