/**
 * Componente About - Sección de información personal y profesional
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: mostrar información personal, experiencia y valores del desarrollador
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevas secciones sin modificar el código base
 * - Cerrado para modificación: la estructura central no cambia
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Depende de abstracciones (hooks personalizados, datos centralizados) en lugar de implementaciones concretas
 * 
 * BUENAS PRÁCTICAS:
 * - Datos centralizados en constantes
 * - Componentes especializados para cada sección
 * - Animaciones configurables
 * - Responsive design
 * - Accesibilidad completa
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaRocket, FaCalendar, FaBriefcase } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Importar hooks personalizados y datos
import useScrollAnimation from '../hooks/useScrollAnimation';
import { personalData } from '../constants/personalData';
import Card, { CardHeader, CardTitle, CardContent, StatCard } from './UI/Card';

/**
 * Configuración de animaciones para la sección About
 * Centralizada para facilitar mantenimiento
 */
const ABOUT_ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  },

  section: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  },

  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  },

  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  },

  item: {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  }
};

/**
 * Configuración de estadísticas personales
 * Centralizada para fácil mantenimiento y actualización
 */
const PERSONAL_STATS = [
  { 
    icon: FaRocket,
    value: '20+', 
    label: 'Proyectos entregados',
    color: 'text-green-400'
  },
  { 
    icon: FaCode, 
    value: '+3', 
    label: 'Años de experiencia',
    color: 'text-blue-400'
  },
  { 
    icon: FaUsers, 
    value: '10+', 
    label: 'Clientes satisfechos',
    color: 'text-purple-400'
  },
  { 
    icon: FaBriefcase, 
    value: '100%', 
    label: 'Compromiso total',
    color: 'text-orange-400'
  },
];

/**
 * Configuración de experiencia profesional y académica
 * Datos estructurados para timeline de experiencia
 */
const EXPERIENCE_TIMELINE = [
  {
    id: 'web',
    title: 'Desarrollo Web Profesional',
    period: 'Landing Pages & E-commerce',
    type: 'servicio',
    icon: FaBriefcase,
    description: 'Sitios web modernos, rápidos y optimizados para conversión. Desde landing pages que venden hasta tiendas online completas con gestión de pagos y stock.',
    achievements: ['React / Next.js', 'E-commerce', 'SEO Optimizado', 'Diseño Responsive']
  },
  {
    id: 'software',
    title: 'Software de Gestión a Medida',
    period: 'Sistemas & Automatización',
    type: 'servicio',
    icon: FaCode,
    description: 'Sistemas personalizados que automatizan tus procesos de negocio: facturación, inventario, CRM, reportes y más. Ahorra tiempo y reduce errores.',
    achievements: ['Sistemas a medida', 'Automatización', 'Base de datos', 'APIs & Integraciones']
  },
  {
    id: 'mobile',
    title: 'Aplicaciones Móviles',
    period: 'iOS & Android',
    type: 'servicio',
    icon: FaRocket,
    description: 'Apps móviles nativas y multiplataforma que conectan con tus clientes donde estén. Interfaces intuitivas y rendimiento óptimo.',
    achievements: ['Apps Nativas', 'Multiplataforma', 'UI/UX Intuitivo', 'Push Notifications']
  }
];

/**
 * Configuración de valores personales
 * Definición de principios y valores del desarrollador
 */
const PERSONAL_VALUES = [
  {
    icon: '⚡',
    title: 'Entrega Rápida',
    description: 'Desarrollo ágil con entregas parciales para que veas avances constantes',
    color: 'from-blue-500/20 to-blue-600/10'
  },
  {
    icon: '💰',
    title: 'Precio Justo',
    description: 'Sin intermediarios ni agencias. Trabajas directo conmigo, pagas menos',
    color: 'from-green-500/20 to-green-600/10'
  },
  {
    icon: '🛡️',
    title: 'Soporte Post-Entrega',
    description: 'No te dejo solo. Soporte y mantenimiento incluido por 30 días',
    color: 'from-purple-500/20 to-purple-600/10'
  }
];

/**
 * Componente para el título de sección
 * Reutilizable con animaciones consistentes
 */
const SectionTitle = ({ title, subtitle, className = '' }) => (
  <motion.div
    variants={ABOUT_ANIMATIONS.section}
    className={`text-center mb-16 ${className}`}
  >
    <CardTitle level={2} className="mb-6" color="text-dark-text">
      {title.split(' ').map((word, index) => 
        word === 'Servicios' || word === 'Ofrezco' ? (
          <span key={index} className="text-neon-blue"> {word}</span>
        ) : (
          <span key={index}> {word}</span>
        )
      )}
    </CardTitle>
    <div className="w-20 h-1 bg-neon-blue mx-auto mb-8"></div>
    {subtitle && (
      <p className="text-lg text-dark-text/70 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </motion.div>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string
};

/**
 * Componente para las estadísticas personales
 * Grid responsivo de estadísticas clave
 */
const PersonalStats = ({ stats, isVisible }) => (
  <div className="grid grid-cols-2 gap-4">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label}
        custom={index}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={ABOUT_ANIMATIONS.item}
      >
        <StatCard
          title={stat.label}
          value={stat.value}
          icon={stat.icon}
          variant="glass"
          animation="scale"
          className="h-full"
        />
      </motion.div>
    ))}
  </div>
);

PersonalStats.propTypes = {
  stats: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para el timeline de experiencia
 * Línea temporal con información profesional y académica
 */
const ExperienceTimeline = ({ experiences, isVisible }) => (
  <div className="relative">
    {/* Línea temporal vertical */}
    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neon-blue/20 rounded-full"></div>
    
    <div className="space-y-8">
      {experiences.map((experience, index) => (
        <motion.div
          key={experience.id}
          custom={index}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={ABOUT_ANIMATIONS.item}
          className="relative"
        >
          {/* Punto en la línea temporal */}
          <div className="absolute left-6 top-6 w-4 h-4 bg-neon-blue rounded-full z-10 ring-4 ring-dark-bg"></div>
          
          {/* Contenido de la experiencia */}
          <Card
            variant="glass"
            animation="hover"
            className="ml-16"
            padding="lg"
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-dark-bg border border-dark-border`}>
                  <experience.icon className="text-neon-blue text-xl" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <CardTitle level={4} color="text-dark-text">
                      {experience.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-neon-blue text-sm font-medium">
                      <FaCalendar className="text-xs" />
                      {experience.period}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    experience.type === 'servicio' 
                      ? 'bg-neon-blue/20 text-neon-blue' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {experience.type === 'servicio' ? 'Servicio Disponible' : 'Servicio'}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="mb-4">
              {experience.description}
            </CardContent>
            
            {/* Logros/Tecnologías */}
            <div className="flex flex-wrap gap-2">
              {experience.achievements.map((achievement, achIndex) => (
                <span
                  key={achIndex}
                  className="px-3 py-1 bg-neon-blue/10 text-neon-blue rounded-full text-xs font-medium"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
);

ExperienceTimeline.propTypes = {
  experiences: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para los valores personales
 * Tarjetas con los principios y valores del desarrollador
 */
const PersonalValues = ({ values, isVisible }) => (
  <Card variant="glass" padding="lg" animation="glow">
    <CardHeader>
      <CardTitle level={3} color="text-neon-blue" className="text-center">
        ¿Por qué Trabajar Conmigo?
      </CardTitle>
    </CardHeader>
    
    <div className="grid md:grid-cols-3 gap-6">
      {values.map((value, index) => (
        <motion.div
          key={value.title}
          custom={index}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={ABOUT_ANIMATIONS.item}
          className="text-center"
        >
          <div className={`p-6 rounded-xl bg-gradient-to-br ${value.color} border border-dark-border mb-4`}>
            <div className="text-4xl mb-4">{value.icon}</div>
            <CardTitle level={5} className="mb-2" color="text-dark-text">
              {value.title}
            </CardTitle>
            <CardContent className="text-sm">
              {value.description}
            </CardContent>
          </div>
        </motion.div>
      ))}
    </div>
  </Card>
);

PersonalValues.propTypes = {
  values: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente principal About
 * Orquesta todas las sub-secciones con animaciones coordinadas
 */
const About = () => {
  // Hook personalizado para detectar visibilidad
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });

  // Memoizar datos para optimización de rendimiento
  const personalInfo = useMemo(() => ({
    name: personalData.name,
    bio: personalData.bio,
    university: personalData.university,
    location: personalData.location,
    specialization: personalData.specialization
  }), []);

  return (
    <motion.section
      id="about"
      ref={elementRef}
      className="py-20 relative"
      variants={ABOUT_ANIMATIONS.container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      aria-label="Información personal y profesional"
    >
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <SectionTitle
          title="Servicios que Ofrezco"
          subtitle="Soluciones digitales completas para hacer crecer tu negocio. Desde la idea hasta el producto final."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Información personal y estadísticas */}
          <motion.div
            variants={ABOUT_ANIMATIONS.slideLeft}
            className="space-y-8"
          >
            {/* Información personal */}
            <Card variant="glass" padding="lg" animation="hover">
              <CardHeader>
                <CardTitle level={3} color="text-neon-blue">
                  Mi Enfoque
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 leading-relaxed">
                <p>
                  Soy <strong className="text-neon-blue">{personalInfo.name}</strong>, 
                  desarrollador full-stack especializado en crear soluciones digitales que <strong>realmente funcionan</strong> para tu negocio.
                </p>

                <p>
                  A diferencia de las agencias tradicionales, trabajo <strong className="text-neon-blue">directo contigo</strong>. 
                  Esto significa comunicación fluida, tiempos de respuesta rápidos y <strong>precios justos sin intermediarios</strong>.
                </p>

                <p>
                  Mi metodología combina <strong className="text-neon-blue">desarrollo ágil</strong> con herramientas de 
                  <strong> Inteligencia Artificial</strong> para entregar proyectos de alta calidad en tiempo récord.
                </p>

                <div className="pt-4 border-t border-dark-border">
                  <div className="flex items-center gap-2 text-sm text-dark-text/70">
                    <span>📍</span>
                    <span>{personalInfo.location}</span>
                    <span>•</span>
                    <span className="text-neon-blue">Trabajo Remoto & Presencial</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas personales */}
            <PersonalStats stats={PERSONAL_STATS} isVisible={isVisible} />
          </motion.div>

          {/* Timeline de experiencia */}
          <motion.div
            variants={ABOUT_ANIMATIONS.slideRight}
            className="space-y-8"
          >
            <CardTitle level={3} color="text-neon-blue">
              Soluciones que Desarrollo
            </CardTitle>
            
            <ExperienceTimeline 
              experiences={EXPERIENCE_TIMELINE} 
              isVisible={isVisible} 
            />
          </motion.div>
        </div>

        {/* Valores personales */}
        <motion.div
          variants={ABOUT_ANIMATIONS.section}
          className="mt-20"
        >
          <PersonalValues values={PERSONAL_VALUES} isVisible={isVisible} />
        </motion.div>

        {/* Call to action */}
        <motion.div
          variants={ABOUT_ANIMATIONS.section}
          className="mt-16 text-center"
        >
          <Card variant="gradient" padding="lg" animation="glow">
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <div className="text-neon-blue text-4xl mb-4">🚀</div>
                <CardTitle level={4} className="mb-4" color="text-dark-text">
                  ¿Listo para Impulsar tu Negocio?
                </CardTitle>
                <p className="text-dark-text/70 mb-6">
                  Cuéntame tu idea y te doy una cotización sin compromiso en menos de 24 horas. 
                  Sin letra chica, sin sorpresas.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-full">
                    Cotización gratuita
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full">
                    Respuesta en 24hs
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full">
                    Sin compromiso
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Asignar displayName para debugging
About.displayName = 'About';

export default About; 