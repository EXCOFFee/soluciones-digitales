/**
 * Componente Skills - Sección de tecnologías y habilidades técnicas
 * 
 * PRINCIPIO SOLID: Single Responsibility Principle (SRP)
 * - Responsabilidad única: mostrar las tecnologías, frameworks y herramientas dominadas
 * 
 * PRINCIPIO SOLID: Open/Closed Principle (OCP)
 * - Abierto para extensión: se pueden agregar nuevas categorías de tecnologías sin modificar el código base
 * - Cerrado para modificación: la estructura central no cambia
 * 
 * PRINCIPIO SOLID: Dependency Inversion Principle (DIP)
 * - Depende de abstracciones (hooks personalizados, datos centralizados) en lugar de implementaciones concretas
 * 
 * BUENAS PRÁCTICAS:
 * - Datos centralizados en constantes
 * - Componentes especializados para cada tipo de skill
 * - Animaciones configurables
 * - Responsive design
 * - Accesibilidad completa
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaJs, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPhp, FaJava, FaPython, 
  FaGitAlt, FaGithub, FaServer, FaWordpress, FaBrain, FaBug, FaLightbulb, 
  FaChartLine, FaComments, FaRandom, FaProjectDiagram, FaGraduationCap, 
  FaCode, FaLaptopCode, FaBookOpen, FaTrello, FaJira, FaCertificate, 
  FaClock, FaStar, FaUniversity
} from 'react-icons/fa';
import { 
  SiMysql, SiExpress, SiTailwindcss, SiNextdotjs, SiVuedotjs, SiAngular, 
  SiCsharp, SiOpenai, SiDotnet
} from 'react-icons/si';
import PropTypes from 'prop-types';

// Importar hooks personalizados y componentes
import useScrollAnimation from '../hooks/useScrollAnimation';
import Card, { CardHeader, CardTitle, CardContent } from './UI/Card';

/**
 * Configuración de animaciones para la sección Skills
 * Centralizada para facilitar mantenimiento
 */
const SKILLS_ANIMATIONS = {
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

  skillCard: {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  },

  skillIcon: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  },

  progressBar: {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        delay: 0.3
      }
    })
  }
};

/**
 * Configuración de tecnologías principales
 * Organizadas por categorías para mejor presentación
 */
const TECH_CATEGORIES = {
  web: {
    title: 'Desarrollo Web Moderno',
    description: 'Tecnologías para crear webs rápidas y modernas',
    color: 'text-blue-400',
    bgColor: 'from-blue-500/10 to-blue-600/5',
    technologies: [
      { name: 'React.js', icon: FaReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
      { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' }
    ]
  },

  backend: {
    title: 'Backend & Sistemas',
    description: 'Lógica de negocio, APIs y bases de datos',
    color: 'text-green-400',
    bgColor: 'from-green-500/10 to-green-600/5',
    technologies: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'Java', icon: FaJava, color: '#ED8B00' },
      { name: 'PHP', icon: FaPhp, color: '#777BB4' },
      { name: 'Python', icon: FaPython, color: '#3776AB' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'API REST', icon: FaServer, color: '#FF6B35' }
    ]
  },

  tools: {
    title: 'Herramientas & DevOps',
    description: 'Control de versiones, hosting y productividad',
    color: 'text-orange-400',
    bgColor: 'from-orange-500/10 to-orange-600/5',
    technologies: [
      { name: 'Git', icon: FaGitAlt, color: '#F05032' },
      { name: 'GitHub', icon: FaGithub, color: '#181717' },
      { name: 'VS Code', icon: FaCode, color: '#007ACC' },
      { name: 'WordPress', icon: FaWordpress, color: '#21759B' },
      { name: 'Trello', icon: FaTrello, color: '#0052CC' },
      { name: 'Jira', icon: FaJira, color: '#0052CC' }
    ]
  }
};

/**
 * Configuración de niveles de experiencia
 * Para mostrar badges y descripciones
 */
const EXPERIENCE_LEVELS = {
  expert: { label: 'Experto', color: 'text-green-400', bgColor: 'bg-green-500/20', min: 100 },
  advanced: { label: 'Avanzado', color: 'text-blue-400', bgColor: 'bg-blue-500/20', min: 85 },
  advancedSpecial: { label: 'Avanzado', color: 'text-purple-400', bgColor: 'bg-purple-500/20', min: 85 },
  intermediate: { label: 'Intermedio', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', min: 75 },
  beginner: { label: 'Principiante', color: 'text-red-400', bgColor: 'bg-red-500/20', min: 0 }
};

/**
 * Función para obtener el nivel de experiencia basado en el porcentaje
 * @param {number} level - Nivel de habilidad (0-100)
 * @returns {Object} Información del nivel de experiencia
 */
const getExperienceLevel = (level) => {
  // Ordenar niveles de mayor a menor para encontrar el nivel más alto que coincida
  const levels = Object.entries(EXPERIENCE_LEVELS).sort(([, a], [, b]) => b.min - a.min);
  const foundLevel = levels.find(([, config]) => level >= config.min);
  return foundLevel ? foundLevel[1] : EXPERIENCE_LEVELS.beginner;
};

/**
 * Componente para el título de sección
 * Reutilizable con animaciones consistentes
 */
const SectionTitle = ({ title, subtitle, className = '' }) => (
  <motion.div
    variants={SKILLS_ANIMATIONS.section}
    className={`text-center mb-16 ${className}`}
  >
    <CardTitle level={2} className="mb-6" color="text-dark-text">
      {title.split(' ').map((word, index) => 
        word === 'Tecnologías' ? (
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
 * Componente para mostrar una tecnología individual
 * Tarjeta con información detallada de cada skill
 */
const TechnologyCard = ({ tech, index, isVisible }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={SKILLS_ANIMATIONS.skillCard}
      whileHover={{ 
        scale: 1.08,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <div className="flex flex-col items-center p-4 rounded-xl bg-dark-card/30 backdrop-blur-sm border border-dark-border hover:border-neon-blue/50 transition-all duration-300">
        {/* Icono de la tecnología */}
        <div 
          className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110 mb-3"
          style={{ backgroundColor: `${tech.color}15` }}
        >
          {tech.icon ? (
            <tech.icon 
              className="text-3xl transition-colors duration-300"
              style={{ color: tech.color }}
            />
          ) : (
            <div className="text-3xl text-red-500">⚠️</div>
          )}
        </div>
        
        {/* Nombre de la tecnología */}
        <span className="text-sm font-medium text-dark-text text-center">
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
};

TechnologyCard.propTypes = {
  tech: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para una categoría de tecnologías
 * Organiza las tecnologías por categorías
 */
const TechnologyCategory = ({ category, technologies, isVisible }) => (
  <motion.div
    variants={SKILLS_ANIMATIONS.section}
    className="mb-12"
  >
    <Card
      variant="glass"
      padding="lg"
      animation="hover"
      className={`bg-gradient-to-br ${category.bgColor} border-dark-border`}
    >
      <CardHeader className="text-center mb-6">
        <CardTitle level={3} color={category.color}>
          {category.title}
        </CardTitle>
        <p className="text-dark-text/70 mt-2 text-sm">{category.description}</p>
      </CardHeader>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {technologies.map((tech, index) => (
          <TechnologyCard
            key={tech.name}
            tech={tech}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </Card>
  </motion.div>
);

TechnologyCategory.propTypes = {
  category: PropTypes.object.isRequired,
  technologies: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente para tecnologías en aprendizaje
 * Muestra frameworks y librerías adicionales
 */
const AdditionalFrameworks = ({ frameworks, isVisible }) => (
  <motion.div
    variants={SKILLS_ANIMATIONS.section}
    className="mb-16"
  >
    <Card variant="gradient" padding="lg" animation="glow">
      <CardHeader className="text-center mb-8">
        <CardTitle level={3} color="text-neon-blue">
          En Aprendizaje
        </CardTitle>
        <p className="text-dark-text/70 mt-2">
          Tecnologías que estoy explorando y aprendiendo actualmente
        </p>
      </CardHeader>

      <div className="flex flex-wrap justify-center gap-6">
        {frameworks.map((framework, index) => (
          <motion.div
            key={framework.name}
            custom={index}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={SKILLS_ANIMATIONS.skillCard}
            whileHover={{ scale: 1.1 }}
            className="group"
          >
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-dark-card/30 backdrop-blur-sm border border-dark-border">
              <div 
                className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${framework.color}20` }}
              >
                <framework.icon 
                  className="text-3xl transition-colors duration-300"
                  style={{ color: framework.color }}
                />
              </div>
              <span className="text-sm font-medium text-dark-text">{framework.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                framework.status === 'learning' 
                  ? 'bg-yellow-500/20 text-yellow-400' 
                  : framework.status === 'beginner'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {framework.status === 'learning' ? 'Aprendiendo' : 
                 framework.status === 'beginner' ? 'Principiante' : 'Básico'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  </motion.div>
);

AdditionalFrameworks.propTypes = {
  frameworks: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente de resumen de habilidades
 * Estadísticas y métricas generales
 */
const SkillsSummary = ({ isVisible }) => {
  const stats = [
    { label: 'total Certificates', value: '3', icon: FaCertificate },
    { label: 'total Hours', value: '1600+', icon: FaClock },
    { label: 'average Grade', value: 'A+', icon: FaStar },
    { label: 'years Learning', value: '3', icon: FaGraduationCap },
    { label: 'institutions', value: '2', icon: FaUniversity }
  ];

  return (
    <motion.div
      variants={SKILLS_ANIMATIONS.section}
      className="mb-16"
    >
      <Card variant="glass" padding="lg" animation="hover">
        <CardHeader className="text-center mb-8">
          <CardTitle level={3} color="text-neon-blue">
            Resumen de Habilidades
          </CardTitle>
          <p className="text-dark-text/70 mt-2">
            Métricas generales de mi stack tecnológico
          </p>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={SKILLS_ANIMATIONS.skillCard}
              className="text-center"
            >
              <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <div className="text-3xl font-bold text-blue-400 mb-2 font-jetbrains">
                  {stat.value}
                </div>
                <div className="text-dark-text/70 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

SkillsSummary.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

/**
 * Componente principal Skills
 * Orquesta todas las sub-secciones de tecnologías
 */
const Skills = () => {
  // Hook personalizado para detectar visibilidad
  const { elementRef } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });

  // Memoizar categorías para optimización
  const categories = useMemo(() => Object.entries(TECH_CATEGORIES), []);

  // Debug: forzar visibilidad para testing
  const debugIsVisible = true;

  return (
    <motion.section
      id="skills"
      ref={elementRef}
      className="py-20 relative"
      variants={SKILLS_ANIMATIONS.container}
      initial="hidden"
      animate={debugIsVisible ? "visible" : "hidden"}
      aria-label="Tecnologías y habilidades técnicas"
    >
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <SectionTitle
          title="Tecnologías"
          subtitle="Las herramientas que uso para construir tus soluciones digitales"
        />

        {/* Categorías de tecnologías */}
        <div className="space-y-8">
          {categories.map(([categoryKey, category]) => (
            <TechnologyCategory
              key={categoryKey}
              category={category}
              technologies={category.technologies}
              isVisible={debugIsVisible}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          variants={SKILLS_ANIMATIONS.section}
          className="text-center mt-12"
        >
          <Card variant="gradient" padding="lg" animation="glow">
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <div className="text-neon-blue text-4xl mb-4">🛠️</div>
                <CardTitle level={4} className="mb-4" color="text-dark-text">
                  La Tecnología Correcta para tu Proyecto
                </CardTitle>
                <p className="text-dark-text/70 mb-6">
                  Cada proyecto es único. Selecciono las herramientas ideales para tu caso específico, 
                  garantizando rendimiento, escalabilidad y fácil mantenimiento.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-full">
                    Código limpio
                  </span>
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full">
                    Alto rendimiento
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full">
                    Fácil mantenimiento
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
Skills.displayName = 'Skills';

export default Skills; 