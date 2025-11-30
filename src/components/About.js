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
import { FaGraduationCap, FaCode, FaUsers, FaRocket, FaCalendar, FaBriefcase } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Importar hooks personalizados y datos
import useScrollAnimation from '../hooks/useScrollAnimation';
import { personalData } from '../constants/personalData';
import Card, { CardHeader, CardTitle, CardContent, StatCard } from './UI/Card';

// Importar imágenes
import promedioImg from '../assets/images/promedio.png';
import davinciImg from '../assets/images/davinci.jpg';

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
    icon: () => (
      <img src={davinciImg} alt="Escuela Da Vinci" className="w-6 h-6 rounded-full inline-block align-middle" />
    ),
    value: personalData.graduationYear, 
    label: 'Graduación esperada',
    color: 'text-blue-400'
  },
  { 
    icon: FaCode, 
    value: personalData.experienceYears, 
    label: 'Años de experiencia',
    color: 'text-green-400'
  },
  { 
    icon: FaUsers, 
    value: personalData.projectsCompleted, 
    label: 'Proyectos completados',
    color: 'text-purple-400'
  },
  { 
    icon: FaRocket, 
    value: '100%', 
    label: 'Dedicación',
    color: 'text-orange-400'
  },
];

/**
 * Configuración de experiencia profesional y académica
 * Datos estructurados para timeline de experiencia
 */
const EXPERIENCE_TIMELINE = [
  {
    id: 'devweb',
    title: 'Desarrollador de Software',
    period: '2022 - Presente',
    type: 'trabajo',
    icon: FaBriefcase,
    description: 'Desarrollo de aplicaciones web, móviles y software en general utilizando React, Node.js, Java y bases de datos SQL. Colaboración con equipos remotos y presenciales.',
    achievements: ['15+ proyectos completados', 'Web, Móvil & Software', 'Full-stack development', 'Metodologías ágiles']
  },
  {
    id: 'university',
    title: 'Graduado - Escuela Da Vinci',
    period: '2023 - 2025',
    type: 'educacion',
    icon: () => (
      <img src={davinciImg} alt="Escuela Da Vinci" className="w-6 h-6 rounded-full inline-block align-middle" />
    ),
    description: 'Carrera de Análisis de Sistemas con enfoque en desarrollo web y software. Graduado en diciembre 2025.',
    achievements: ['Análisis de Sistemas', 'Desarrollo de Software', 'Bases de Datos', 'Arquitectura de Software']
  },
  {
    id: 'courses',
    title: 'Formación Complementaria',
    period: '2022 - 2023',
    type: 'educacion',
    icon: FaCode,
    description: 'Cursos especializados en CoderHouse: JavaScript, React, Node.js, y tecnologías de frontend y backend.',
    achievements: ['JavaScript ES6+', 'React.js', 'Node.js', 'Desarrollo Frontend/Backend']
  }
];

/**
 * Configuración de valores personales
 * Definición de principios y valores del desarrollador
 */
const PERSONAL_VALUES = [
  {
    icon: '🎯',
    title: 'Orientado a Resultados',
    description: 'Enfoque en soluciones eficientes y de calidad',
    color: 'from-blue-500/20 to-blue-600/10'
  },
  {
    icon: '🚀',
    title: 'Aprendizaje Continuo',
    description: 'Siempre actualizado con las últimas tecnologías',
    color: 'from-green-500/20 to-green-600/10'
  },
  {
    icon: '🤝',
    title: 'Trabajo en Equipo',
    description: 'Comunicación clara y colaboración efectiva',
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
        word === 'mí' ? (
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
                    experience.type === 'trabajo' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {experience.type === 'trabajo' ? 'Experiencia Laboral' : 'Formación Académica'}
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
        Mis Valores
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
          title="Sobre mí"
          subtitle="Mi trayectoria profesional, formación y valores que me definen como desarrollador"
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
                  Mi Historia
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 leading-relaxed">
                <p>
                  Soy <strong className="text-neon-blue">{personalInfo.name}</strong>, 
                  un desarrollador apasionado por la tecnología y la innovación. 
                  Graduado de la carrera de <strong>{personalInfo.university}</strong> (finalizada en diciembre 2025).
                </p>

                {/* Imagen de comprobante de plan de estudio y promedio */}
                <div className="flex flex-col items-center my-4">
                  <img
                    src={promedioImg}
                    alt="Comprobante de inscripción y promedio Escuela Da Vinci"
                    className="rounded-lg shadow-lg max-w-xs border border-dark-border"
                  />
                  <span className="text-xs text-dark-text/60 mt-2">Comprobante de inscripción y promedio (8,42) - Escuela Da Vinci</span>
                </div>

                <p>
                  Durante los últimos <strong className="text-neon-blue">{personalData.experienceYears}</strong> he 
                  trabajado en desarrollo web, aplicaciones móviles y software en general, creando soluciones tanto para proyectos individuales como colaborativos. Mi experiencia incluye trabajo en modalidad remota y presencial, lo que me ha permitido desarrollar excelentes habilidades de comunicación y adaptación.
                </p>

                <p>
                  Mi especialidad está en el <strong className="text-neon-blue">desarrollo full-stack con JavaScript</strong>, 
                  pero lo que realmente me diferencia es mi enfoque en el uso de herramientas de IA para optimizar 
                  el proceso de desarrollo, aumentar la productividad y crear código de mayor calidad.
                </p>

                <div className="pt-4 border-t border-dark-border">
                  <div className="flex items-center gap-2 text-sm text-dark-text/70">
                    <span>📍</span>
                    <span>{personalInfo.location}</span>
                    <span>•</span>
                    <span className="text-neon-blue">{personalInfo.specialization}</span>
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
              Experiencia & Formación
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
                <div className="text-neon-blue text-4xl mb-4">💡</div>
                <CardTitle level={4} className="mb-4" color="text-dark-text">
                  ¿Interesado en contratarme?
                </CardTitle>
                <p className="text-dark-text/70 mb-6">
                  Estoy siempre abierto a nuevos proyectos y oportunidades. 
                  Si tienes una idea o necesitas ayuda con desarrollo web, apps móviles o software, ¡hablemos!
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-full">
                    Disponible para proyectos
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full">
                    Trabajo remoto
                  </span>
                  <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full">
                    Colaboración en equipo
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