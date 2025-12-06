import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import Card, { CardHeader, CardTitle, CardContent } from './UI/Card';

const PROJECTS = [
  {
    name: 'EXCOFF CRM',
    url: 'https://github.com/EXCOFFee/EXCOFER_CRM',
    description: 'Sistema CRM multiplataforma (PC y Mobile) que automatiza la entrada de datos y ofrece visualización en tiempo real mediante WebSockets.',
    tags: ['CRM', 'WebSockets', 'Tiempo Real', 'Multiplataforma'],
    isGitHub: true,
  },
  {
    name: 'ERP EXCOFF',
    url: 'https://github.com/EXCOFFee/ERP_EXCOFF',
    description: 'Sistema ERP Universal multiplataforma para gestionar inventario, ventas, recursos humanos y finanzas de una organización.',
    tags: ['ERP', 'Gestión Empresarial', 'RRHH', 'Finanzas'],
    isGitHub: true,
  },
  {
    name: 'Inventory EXCOFFee',
    url: 'https://github.com/EXCOFFee/Inventory-EXCOFFee',
    description: 'Sistema gestor de inventarios multiplataforma (PC y Mobile) para control de stock, movimientos y reportes en tiempo real.',
    tags: ['Inventario', 'Gestión de Stock', 'Reportes', 'Multiplataforma'],
    isGitHub: true,
  },
  {
    name: 'Wunder Coaching',
    url: 'https://wundercoaching.com.ar',
    description: 'Landing page profesional con diseño moderno y optimizada para conversión de clientes.',
    tags: ['Landing Page', 'Diseño Responsive', 'SEO']
  },
  {
    name: 'Marketing MLB',
    url: 'https://marketingmlb.com.ar',
    description: 'Sitio web corporativo para agencia de marketing con formularios de contacto y portfolio integrado.',
    tags: ['Web Corporativa', 'CMS', 'Integración Email']
  },
  {
    name: 'Capacitaciones MLB',
    url: 'https://navajowhite-bat-858967.hostingersite.com',
    description: 'Plataforma educativa con catálogo de cursos, sistema de inscripción y gestión de contenido.',
    tags: ['Plataforma Educativa', 'Gestión de Usuarios', 'Panel Admin']
  },
  {
    name: 'Plataforma E-commerce',
    url: 'https://github.com/IJSagnella/TP1_PaginaWeb',
    description: 'Tienda online completa con carrito de compras, gestión de productos y pasarela de pagos.',
    tags: ['E-commerce', 'Carrito', 'Gestión de Stock'],
    isGitHub: true,
  },
];

const PORTFOLIO_ANIMATIONS = {
  container: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  },
};

const Portfolio = () => (
  <motion.section
    id="portfolio"
    className="py-20 relative"
    variants={PORTFOLIO_ANIMATIONS.container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    aria-label="Proyectos realizados"
  >
    <div className="container mx-auto px-4">
      {/* Título de sección */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">
          Proyectos <span className="text-neon-blue">Realizados</span>
        </h2>
        <div className="w-20 h-1 bg-neon-blue mx-auto mb-6"></div>
        <p className="text-lg text-dark-text/70 max-w-2xl mx-auto">
          Algunos ejemplos de soluciones que he desarrollado para clientes reales
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {PROJECTS.map((project) => (
          <Card key={project.url || project.name} variant="glass" padding="lg" animation="hover">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-xl text-neon-blue">
                  {project.name}
                </span>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={`Ver ${project.name}`} 
                  className="p-2 rounded-lg bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 transition-colors"
                >
                  {project.isGitHub ? <FaGithub className="text-lg" /> : <FaExternalLinkAlt className="text-lg" />}
                </a>
              </div>
              <p className="text-dark-text/70 text-sm mb-4 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags && project.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-neon-blue/10 text-neon-blue rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <Card variant="gradient" padding="lg" animation="glow">
        <CardContent>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-4xl mb-4">💼</div>
            <CardTitle level={4} className="mb-4" color="text-dark-text">
              ¿Tu proyecto podría ser el próximo?
            </CardTitle>
            <p className="text-dark-text/70 mb-6">
              Cada negocio es único. Cuéntame qué necesitas y diseñemos juntos la solución perfecta para ti.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/EXCOFFee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border text-dark-text rounded-full hover:border-neon-blue/50 transition-colors"
              >
                <FaGithub />
                Ver más en GitHub
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </motion.section>
);

export default Portfolio;
