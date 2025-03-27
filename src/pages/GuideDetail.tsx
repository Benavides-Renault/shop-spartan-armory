
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button-custom';
import { ChevronLeft, Calendar, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import the guides data (this would typically come from an API)
// Using the same data as in Guides.tsx for simplicity
const guides = [
  {
    id: '1',
    title: 'Guía de nutrición para principiantes',
    category: 'nutricion',
    excerpt: 'Aprende los fundamentos de una alimentación adecuada para tus objetivos físicos.',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: '2023-12-15',
    content: '<p>Esta guía te ayudará a entender los principios básicos de la nutrición para optimizar tu rendimiento físico y alcanzar tus objetivos.</p><h2>Macronutrientes esenciales</h2><p>Los macronutrientes son los componentes principales de nuestra alimentación y se dividen en tres categorías:</p><ul><li><strong>Proteínas:</strong> Fundamentales para la recuperación y construcción muscular.</li><li><strong>Carbohidratos:</strong> Principal fuente de energía para el cuerpo.</li><li><strong>Grasas:</strong> Importantes para funciones hormonales y absorción de vitaminas.</li></ul><p>Una dieta equilibrada debe contener una proporción adecuada de estos tres macronutrientes según tus objetivos específicos.</p>'
  },
  {
    id: '2',
    title: 'Técnica correcta para sentadillas',
    category: 'tecnica',
    excerpt: 'Domina uno de los ejercicios fundamentales para desarrollo de fuerza y masa muscular.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: '2023-11-28',
    content: '<p>La sentadilla es uno de los ejercicios más completos que existen, ya que involucra múltiples grupos musculares y articulaciones.</p><h2>Posición inicial</h2><p>Colócate de pie con los pies separados a la anchura de los hombros. Mantén la espalda recta y el core activado.</p><h2>Ejecución</h2><p>Flexiona las rodillas mientras mantienes el pecho erguido, como si fueras a sentarte en una silla. Desciende hasta que tus muslos estén paralelos al suelo (o más abajo si tu movilidad lo permite).</p><p>Mantén siempre las rodillas alineadas con los pies, sin que se desvíen hacia dentro o hacia fuera.</p><h2>Errores comunes</h2><ul><li>Redondear la espalda</li><li>Levantar los talones del suelo</li><li>No descender lo suficiente</li></ul>'
  },
  {
    id: '3',
    title: 'Suplementación adecuada según tus objetivos',
    category: 'suplementacion',
    excerpt: 'Descubre qué suplementos son realmente necesarios según tu nivel y metas.',
    imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6fbd2ff873?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: '2024-01-05',
    content: '<p>En el mundo del fitness, existe una gran variedad de suplementos disponibles, pero no todos son necesarios para todos los objetivos.</p><h2>Suplementos básicos</h2><p>Estos son los suplementos que pueden beneficiar a la mayoría de las personas:</p><ul><li><strong>Proteína en polvo:</strong> Facilita alcanzar tus necesidades diarias de proteína.</li><li><strong>Creatina monohidrato:</strong> Uno de los suplementos más estudiados y efectivos para mejorar el rendimiento y la masa muscular.</li><li><strong>Multivitamínico:</strong> Para cubrir posibles deficiencias en la dieta.</li></ul><h2>Suplementos específicos</h2><p>Dependiendo de tus objetivos, podrías considerar:</p><ul><li><strong>Beta-alanina:</strong> Para deportes de alta intensidad.</li><li><strong>Cafeína:</strong> Como pre-entrenamiento para aumentar energía y rendimiento.</li><li><strong>BCAA:</strong> Para entrenamientos en ayunas o muy largos.</li></ul><p>Recuerda que los suplementos no sustituyen una dieta equilibrada, solo la complementan.</p>'
  },
  {
    id: '4',
    title: 'Rutinas para entrenar en casa',
    category: 'entrenamiento',
    excerpt: 'Mantente en forma sin necesidad de equipamiento especializado de gimnasio.',
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: '2023-12-20',
    content: '<p>No necesitas un gimnasio completo para mantenerte en forma. Con algunas rutinas efectivas puedes entrenar en casa y lograr excelentes resultados.</p><h2>Rutina de cuerpo completo</h2><p>Realiza 3-4 series de 12-15 repeticiones de cada ejercicio:</p><ul><li>Sentadillas</li><li>Flexiones (push-ups)</li><li>Zancadas (lunges)</li><li>Fondos de tríceps en una silla</li><li>Superman para espalda</li><li>Plancha abdominal (30-60 segundos)</li></ul><h2>Entrenamiento por intervalos (HIIT)</h2><p>Alterna 30 segundos de trabajo intenso con 30 segundos de descanso:</p><ul><li>Jumping jacks</li><li>Burpees</li><li>Mountain climbers</li><li>Sentadillas con salto</li><li>Elevaciones de rodillas</li></ul><p>Repite el circuito 3-4 veces para un entrenamiento completo de 20-30 minutos.</p>'
  },
  {
    id: '5',
    title: 'Prevención y recuperación de lesiones',
    category: 'recuperacion',
    excerpt: 'Estrategias efectivas para evitar lesiones y recuperarte adecuadamente de ellas.',
    imageUrl: 'https://images.unsplash.com/photo-1519311726-5cced7383240?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    date: '2024-02-03',
    content: '<p>Las lesiones pueden ser un gran obstáculo en tu progreso fitness. Aprender a prevenirlas y tratarlas correctamente es esencial.</p><h2>Prevención de lesiones</h2><ul><li><strong>Calentamiento adecuado:</strong> Dedica al menos 5-10 minutos a calentar antes de entrenar.</li><li><strong>Técnica correcta:</strong> Siempre prioriza la forma sobre el peso o las repeticiones.</li><li><strong>Progresión gradual:</strong> Aumenta la intensidad de tus entrenamientos progresivamente.</li><li><strong>Descanso:</strong> Permite que tus músculos se recuperen adecuadamente entre sesiones.</li></ul><h2>Recuperación de lesiones comunes</h2><p>Para la mayoría de las lesiones musculares leves, sigue el protocolo RICE:</p><ul><li><strong>R</strong>eposo: Evita actividades que causen dolor.</li><li><strong>I</strong>ce (Hielo): Aplica frío para reducir la inflamación.</li><li><strong>C</strong>ompresión: Usa vendas elásticas para dar soporte.</li><li><strong>E</strong>levación: Mantén la zona lesionada elevada cuando sea posible.</li></ul><p>Consulta siempre con un profesional médico ante cualquier lesión que no mejore en pocos días.</p>'
  },
  {
    id: '6',
    title: 'Guía para entender las etiquetas nutricionales',
    category: 'nutricion',
    excerpt: 'Aprende a interpretar correctamente la información nutricional de los productos.',
    imageUrl: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: '2024-01-18',
    content: '<p>Saber leer e interpretar las etiquetas nutricionales es fundamental para hacer elecciones alimenticias informadas.</p><h2>Información básica</h2><p>En una etiqueta nutricional encontrarás:</p><ul><li><strong>Calorías:</strong> Energía total que proporciona el alimento.</li><li><strong>Macronutrientes:</strong> Cantidad de proteínas, carbohidratos y grasas.</li><li><strong>Fibra:</strong> Importante para la digestión y la saciedad.</li><li><strong>Azúcares:</strong> Parte de los carbohidratos que son azúcares simples.</li><li><strong>Sodio:</strong> Importante para controlar si buscas limitar la sal.</li></ul><h2>Interpretación avanzada</h2><p>Algunos consejos para analizar etiquetas:</p><ul><li>Presta atención al tamaño de la porción.</li><li>Compara productos similares para identificar opciones más saludables.</li><li>Revisa la lista de ingredientes: están ordenados por cantidad (de mayor a menor).</li><li>Los azúcares añadidos suelen tener nombres que terminan en "-osa" (glucosa, fructosa, etc.).</li></ul><p>Desarrollar el hábito de leer etiquetas te ayudará a tomar mejores decisiones alimenticias diariamente.</p>'
  }
];

const categories = {
  'nutricion': 'Nutrición',
  'entrenamiento': 'Entrenamiento',
  'tecnica': 'Técnica',
  'suplementacion': 'Suplementación',
  'recuperacion': 'Recuperación'
};

const GuideDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [guide, setGuide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Simulating API fetch - in a real app, this would be an API call
    const fetchGuide = () => {
      setLoading(true);
      setTimeout(() => {
        const foundGuide = guides.find(g => g.id === id);
        setGuide(foundGuide || null);
        setLoading(false);
      }, 300);
    };

    fetchGuide();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Cargando...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Guía no encontrada</h1>
          <p className="mb-6">La guía que estás buscando no existe o ha sido eliminada.</p>
          <Link to="/guias">
            <Button>Volver a guías</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header con imagen de portada */}
        <div className="relative h-64 md:h-96">
          <div className="absolute inset-0 bg-black/50"></div>
          <img 
            src={guide.imageUrl} 
            alt={guide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{guide.title}</h1>
              <div className="flex flex-wrap gap-2 items-center text-white/80">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(guide.date).toLocaleDateString('es-CR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {categories[guide.category as keyof typeof categories] || guide.category}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contenido */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link to="/guias">
              <Button variant="ghost" size="sm" leftIcon={<ChevronLeft className="w-4 h-4" />}>
                Volver a guías
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {/* Introducción */}
            <p className="text-lg text-spartan-gray-700 mb-8">
              {guide.excerpt}
            </p>
            
            {/* Contenido principal */}
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            ></div>
          </div>
          
          {/* Navegación entre guías */}
          <div className="mt-12 border-t border-spartan-gray-200 pt-8">
            <h3 className="text-xl font-semibold mb-6">Más guías que podrían interesarte</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides
                .filter(g => g.id !== guide.id)
                .slice(0, 3)
                .map(relatedGuide => (
                  <Link key={relatedGuide.id} to={`/guias/${relatedGuide.id}`}>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={relatedGuide.imageUrl} 
                          alt={relatedGuide.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <span className="inline-block px-2 py-1 bg-spartan-primary/10 text-spartan-primary text-xs rounded mb-2">
                          {categories[relatedGuide.category as keyof typeof categories] || relatedGuide.category}
                        </span>
                        <h4 className="font-medium text-sm line-clamp-2">{relatedGuide.title}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GuideDetail;
