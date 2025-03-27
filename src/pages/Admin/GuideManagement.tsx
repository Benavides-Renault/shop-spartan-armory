
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, ArrowUpDown, Save, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button-custom';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

type Guide = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: GuideCategory;
  tags: string[];
  coverImage: string;
  publishDate: string;
  author: string;
  status: 'draft' | 'published';
};

type GuideCategory = 'nutrition' | 'training' | 'recovery' | 'lifestyle' | 'supplements' | 'beginner' | 'advanced';

// Datos de ejemplo
const mockGuides: Guide[] = [
  {
    id: '1',
    title: 'Guía de Nutrición para Principiantes',
    description: 'Todo lo que necesitas saber para comenzar una alimentación saludable y orientada al fitness.',
    content: '# Guía de Nutrición para Principiantes\n\nLa nutrición es uno de los pilares fundamentales para alcanzar cualquier objetivo físico, ya sea pérdida de grasa, ganancia muscular o mejora del rendimiento. En esta guía, aprenderás los conceptos básicos que necesitas conocer para establecer una buena base nutricional.\n\n## Macronutrientes: Los Bloques Fundamentales\n\nLos macronutrientes son los componentes de los alimentos que consumimos en grandes cantidades y proporcionan energía:\n\n- **Proteínas:** Fundamentales para la construcción y reparación muscular. Fuentes: carnes, pescados, huevos, lácteos, legumbres.\n- **Carbohidratos:** Principal fuente de energía. Fuentes: cereales, frutas, verduras, legumbres.\n- **Grasas:** Importantes para funciones hormonales y salud general. Fuentes: aceites, frutos secos, aguacate, pescados grasos.\n\n## Calorías y Balance Energético\n\nEl balance energético determina si ganarás, mantendrás o perderás peso:\n\n- **Balance positivo:** Consumes más calorías de las que gastas = aumento de peso\n- **Balance neutro:** Consumes las mismas calorías que gastas = mantenimiento de peso\n- **Balance negativo:** Consumes menos calorías de las que gastas = pérdida de peso\n\n## Distribución de Comidas\n\nLa frecuencia de comidas puede adaptarse a tu estilo de vida, pero algunas recomendaciones generales incluyen:\n\n- Consumir entre 3-5 comidas al día\n- Incluir proteína en cada comida\n- Ajustar los carbohidratos según el nivel de actividad\n- Consumir frutas y verduras en al menos dos comidas diarias\n\n## Hidratación\n\nEl agua es esencial para todas las funciones corporales y el rendimiento físico:\n\n- Beber entre 2-3 litros diarios como mínimo\n- Aumentar el consumo en días de entrenamiento\n- Monitorear el color de la orina (debe ser clara o amarillo claro)\n\n## Suplementos Básicos\n\nLos suplementos no son indispensables, pero pueden complementar una dieta equilibrada:\n\n- **Proteína en polvo:** Conveniente para alcanzar las necesidades proteicas diarias\n- **Creatina:** Mejora el rendimiento en entrenamientos de fuerza\n- **Multivitamínico:** Como seguro nutricional para posibles deficiencias\n\n## Planificación y Preparación\n\nLa clave del éxito a largo plazo es la consistencia, y para ello es útil:\n\n- Planificar las comidas semanalmente\n- Hacer una compra organizada con lista previa\n- Preparar comidas por lotes para varios días\n- Tener opciones de emergencia saludables\n\n## Conclusión\n\nRecuerda que la nutrición es altamente individual y debe adaptarse a tus objetivos, preferencias y necesidades específicas. Utiliza esta guía como punto de partida y ajusta según tus resultados y sensaciones.\n\nSi quieres profundizar más, no dudes en consultar con un profesional de la nutrición deportiva que pueda ofrecerte un plan personalizado.',
    category: 'nutrition',
    tags: ['principiantes', 'nutrición', 'alimentación', 'macros'],
    coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    publishDate: '2023-03-15',
    author: 'Dra. María López',
    status: 'published'
  },
  {
    id: '2',
    title: 'Rutina de Entrenamiento para Hipertrofia',
    description: 'Maximiza tu ganancia muscular con esta guía de entrenamiento basada en evidencia científica.',
    content: '# Rutina de Entrenamiento para Hipertrofia\n\nLa hipertrofia muscular, o el crecimiento de los músculos, es un objetivo común para muchos entusiastas del fitness. Esta guía te proporcionará los principios fundamentales y una rutina práctica para maximizar tu desarrollo muscular.\n\n## Principios de la Hipertrofia\n\nLa hipertrofia muscular se basa en tres mecanismos principales:\n\n1. **Tensión Mecánica:** El estrés directo sobre el músculo durante el levantamiento\n2. **Daño Muscular:** Microroturas en las fibras musculares que luego se reparan y crecen\n3. **Estrés Metabólico:** Acumulación de metabolitos durante el ejercicio\n\n## Variables de Entrenamiento\n\nPara optimizar la hipertrofia, debes considerar:\n\n- **Volumen:** Total de series y repeticiones (generalmente 10-20 series por grupo muscular a la semana)\n- **Frecuencia:** Veces que entrenas cada grupo muscular (2-3 veces por semana es óptimo)\n- **Intensidad:** Peso utilizado en relación a tu máximo (65-85% de 1RM es ideal para hipertrofia)\n- **Selección de Ejercicios:** Combinación de ejercicios compuestos y de aislamiento\n- **Descanso:** 1-3 minutos entre series para ejercicios compuestos, 30-90 segundos para aislamiento\n\n## Rutina de Hipertrofia de 4 Días\n\n### Día 1: Pecho y Tríceps\n\n1. **Press de Banca:** 4 series de 8-10 repeticiones\n2. **Press Inclinado con Mancuernas:** 3 series de 10-12 repeticiones\n3. **Aperturas en Polea:** 3 series de 12-15 repeticiones\n4. **Fondos en Paralelas:** 3 series de 10-12 repeticiones\n5. **Extensiones de Tríceps en Polea:** 4 series de 12-15 repeticiones\n6. **Extensión de Tríceps sobre la Cabeza:** 3 series de 10-12 repeticiones\n\n### Día 2: Espalda y Bíceps\n\n1. **Dominadas o Jalones al Pecho:** 4 series de 8-10 repeticiones\n2. **Remo con Barra:** 4 series de 10-12 repeticiones\n3. **Remo con Mancuerna a Una Mano:** 3 series de 10-12 repeticiones\n4. **Pullover con Mancuerna:** 3 series de 12-15 repeticiones\n5. **Curl de Bíceps con Barra:** 4 series de 10-12 repeticiones\n6. **Curl Martillo:** 3 series de 12-15 repeticiones\n\n### Día 3: Piernas\n\n1. **Sentadillas:** 4 series de 8-10 repeticiones\n2. **Prensa de Piernas:** 4 series de 10-12 repeticiones\n3. **Extensiones de Cuádriceps:** 3 series de 12-15 repeticiones\n4. **Curl Femoral:** 4 series de 10-12 repeticiones\n5. **Elevaciones de Pantorrilla de Pie:** 4 series de 15-20 repeticiones\n6. **Elevaciones de Pantorrilla Sentado:** 3 series de 15-20 repeticiones\n\n### Día 4: Hombros y Abdominales\n\n1. **Press Militar:** 4 series de 8-10 repeticiones\n2. **Elevaciones Laterales:** 4 series de 12-15 repeticiones\n3. **Elevaciones Frontales:** 3 series de 12-15 repeticiones\n4. **Remo al Mentón:** 3 series de 10-12 repeticiones\n5. **Crunch Abdominal:** 4 series de 15-20 repeticiones\n6. **Plancha:** 3 series de 30-60 segundos\n\n## Progresión y Sobrecarga\n\nPara continuar progresando, debes implementar sobrecarga progresiva:\n\n- Aumentar el peso cuando puedas completar el rango superior de repeticiones\n- Incrementar gradualmente el volumen (añadir series o repeticiones)\n- Reducir los tiempos de descanso para aumentar la intensidad\n- Variar las técnicas (series descendentes, supersets, etc.)\n\n## Nutrición y Recuperación\n\nLa hipertrofia no ocurre solo en el gimnasio; requiere:\n\n- **Superávit calórico:** Consumir más calorías de las que gastas (200-500 calorías extra)\n- **Proteína adecuada:** 1.6-2.2g por kg de peso corporal\n- **Descanso:** 7-9 horas de sueño de calidad\n- **Recuperación activa:** Movilidad y actividades de baja intensidad en días de descanso\n\n## Conclusión\n\nLa hipertrofia requiere un enfoque sistemático y paciente. Utiliza esta guía como marco y personaliza según tus respuestas individuales. Recuerda que la consistencia a largo plazo es más importante que la intensidad a corto plazo.\n\nSi experimentas dolor (no confundir con molestia muscular), ajusta o busca orientación profesional. ¡Buena suerte en tu viaje hacia un físico más musculoso!',
    category: 'training',
    tags: ['hipertrofia', 'musculación', 'entrenamiento', 'rutina'],
    coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    publishDate: '2023-04-22',
    author: 'Carlos Martínez',
    status: 'published'
  },
  {
    id: '3',
    title: 'Guía Completa de Suplementación',
    description: 'Aprende a elegir los suplementos adecuados según tus objetivos y necesidades específicas.',
    content: '# Contenido de la guía...',
    category: 'supplements',
    tags: ['suplementos', 'proteínas', 'creatina', 'pre-entreno'],
    coverImage: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    publishDate: '2023-05-10',
    author: 'Dr. Alejandro Ruiz',
    status: 'published'
  },
  {
    id: '4',
    title: 'Recuperación y Prevención de Lesiones',
    description: 'Estrategias efectivas para optimizar tu recuperación y prevenir lesiones comunes.',
    content: '# Contenido de la guía...',
    category: 'recovery',
    tags: ['recuperación', 'lesiones', 'movilidad', 'estiramientos'],
    coverImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    publishDate: '2023-06-18',
    author: 'Dra. Laura González',
    status: 'draft'
  },
];

// Categorías de guías
const guideCategories = [
  { value: '', label: 'Todas las categorías' },
  { value: 'nutrition', label: 'Nutrición' },
  { value: 'training', label: 'Entrenamiento' },
  { value: 'recovery', label: 'Recuperación' },
  { value: 'lifestyle', label: 'Estilo de vida' },
  { value: 'supplements', label: 'Suplementación' },
  { value: 'beginner', label: 'Principiantes' },
  { value: 'advanced', label: 'Avanzado' },
];

// Estados de publicación
const publishStatuses = [
  { value: '', label: 'Todos los estados' },
  { value: 'published', label: 'Publicado' },
  { value: 'draft', label: 'Borrador' },
];

const GuideManagement = () => {
  const [guides, setGuides] = useState<Guide[]>(mockGuides);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<'published' | 'draft' | ''>('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentGuide, setCurrentGuide] = useState<Guide | null>(null);
  const [newGuide, setNewGuide] = useState<Partial<Guide>>({
    title: '',
    description: '',
    content: '',
    category: 'nutrition',
    tags: [],
    coverImage: '',
    author: '',
    status: 'draft'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [tagsInput, setTagsInput] = useState('');
  const guidesPerPage = 5;
  
  const handleCreateGuide = () => {
    setNewGuide({
      title: '',
      description: '',
      content: '',
      category: 'nutrition',
      tags: [],
      coverImage: '',
      author: '',
      status: 'draft'
    });
    setTagsInput('');
    setShowCreateForm(true);
  };
  
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guide.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || guide.category === selectedCategory;
    const matchesStatus = !selectedStatus || guide.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = filteredGuides.slice(indexOfFirstGuide, indexOfLastGuide);
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);
  
  const handleEditGuide = (guide: Guide) => {
    setCurrentGuide(guide);
    setNewGuide({...guide});
    setTagsInput(guide.tags.join(', '));
    setShowEditForm(true);
  };
  
  const handlePreviewGuide = (guide: Guide) => {
    setCurrentGuide(guide);
    setShowPreview(true);
  };
  
  const handleDeleteGuide = (guideId: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta guía?')) {
      setGuides(guides.filter(guide => guide.id !== guideId));
    }
  };
  
  const handleSubmitGuide = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Procesamos los tags desde el input de texto
    const processedTags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    if (showCreateForm) {
      // Crear nueva guía
      const newGuideData: Guide = {
        ...newGuide as Omit<Guide, 'id' | 'publishDate' | 'tags'>,
        id: (guides.length + 1).toString(),
        publishDate: new Date().toISOString().split('T')[0],
        tags: processedTags
      };
      
      setGuides([...guides, newGuideData]);
      setShowCreateForm(false);
    } else if (showEditForm && currentGuide) {
      // Actualizar guía existente
      const updatedGuides = guides.map(guide => 
        guide.id === currentGuide.id 
          ? { 
              ...guide, 
              ...newGuide,
              tags: processedTags
            } 
          : guide
      );
      
      setGuides(updatedGuides);
      setShowEditForm(false);
    }
  };
  
  // Si estamos en modo de vista previa, mostramos el contenido de la guía
  if (showPreview && currentGuide) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{currentGuide.title}</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowPreview(false)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
        
        <div className="mb-6">
          <img 
            src={currentGuide.coverImage} 
            alt={currentGuide.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-spartan-primary/10 text-spartan-primary text-xs rounded">
            {guideCategories.find(cat => cat.value === currentGuide.category)?.label || currentGuide.category}
          </span>
          
          {currentGuide.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-spartan-gray-100 text-spartan-gray-700 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mb-6">
          <p className="text-spartan-gray-700 italic">{currentGuide.description}</p>
          <div className="flex items-center text-sm text-spartan-gray-500 mt-2">
            <span>Por {currentGuide.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(currentGuide.publishDate).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span className={`px-2 py-1 rounded text-xs ${
              currentGuide.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {currentGuide.status === 'published' ? 'Publicado' : 'Borrador'}
            </span>
          </div>
        </div>
        
        <div className="prose max-w-none">
          {/* En una aplicación real, aquí se renderizaría el Markdown como HTML */}
          <pre className="whitespace-pre-wrap">{currentGuide.content}</pre>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button 
            size="sm"
            variant="ghost"
            className="mr-3"
            onClick={() => setShowPreview(false)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <Button 
            onClick={() => {
              setShowPreview(false);
              handleEditGuide(currentGuide);
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar guía
          </Button>
        </div>
      </div>
    );
  }
  
  // Si estamos en modo de creación o edición, mostramos el formulario
  if (showCreateForm || showEditForm) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">
          {showCreateForm ? 'Crear nueva guía' : 'Editar guía'}
        </h1>
        
        <form onSubmit={handleSubmitGuide}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title"
                  value={newGuide.title}
                  onChange={e => setNewGuide({...newGuide, title: e.target.value})}
                  placeholder="Título de la guía"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="author">Autor</Label>
                <Input 
                  id="author"
                  value={newGuide.author}
                  onChange={e => setNewGuide({...newGuide, author: e.target.value})}
                  placeholder="Nombre del autor"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea 
                id="description"
                value={newGuide.description}
                onChange={e => setNewGuide({...newGuide, description: e.target.value})}
                placeholder="Breve descripción de la guía"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Categoría</Label>
                <select
                  id="category"
                  value={newGuide.category}
                  onChange={e => setNewGuide({...newGuide, category: e.target.value as GuideCategory})}
                  className="w-full px-3 py-2 border border-spartan-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spartan-primary"
                  required
                >
                  {guideCategories.filter(cat => cat.value !== '').map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="status">Estado</Label>
                <select
                  id="status"
                  value={newGuide.status}
                  onChange={e => setNewGuide({...newGuide, status: e.target.value as 'draft' | 'published'})}
                  className="w-full px-3 py-2 border border-spartan-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spartan-primary"
                  required
                >
                  <option value="draft">Borrador</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="tags">Etiquetas (separadas por comas)</Label>
              <Input 
                id="tags"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="nutrición, proteínas, principiantes, etc."
              />
            </div>
            
            <div>
              <Label htmlFor="coverImage">URL de imagen de portada</Label>
              <Input 
                id="coverImage"
                value={newGuide.coverImage}
                onChange={e => setNewGuide({...newGuide, coverImage: e.target.value})}
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
              {newGuide.coverImage && (
                <div className="mt-2 w-full h-40 bg-spartan-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={newGuide.coverImage} 
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Vista+previa+no+disponible';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="content">Contenido (Markdown)</Label>
              <Textarea 
                id="content"
                value={newGuide.content}
                onChange={e => setNewGuide({...newGuide, content: e.target.value})}
                placeholder="Contenido en formato Markdown"
                className="min-h-[300px] font-mono"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline"
                onClick={() => showCreateForm ? setShowCreateForm(false) : setShowEditForm(false)}
                type="button"
              >
                Cancelar
              </Button>
              
              <Button 
                type="submit"
              >
                <Save className="w-4 h-4 mr-2" />
                {showCreateForm ? 'Crear guía' : 'Guardar cambios'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  // Vista principal de gestión de guías
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Guías y Contenido</h1>
        <Button 
          onClick={handleCreateGuide}
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear Nueva Guía
        </Button>
      </div>
      
      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
            <input 
              type="text"
              placeholder="Buscar guías por título, descripción o autor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-spartan-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spartan-primary"
            />
          </div>
          
          <div className="md:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as GuideCategory | '')}
                className="w-full pl-10 pr-4 py-2 border border-spartan-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spartan-primary appearance-none"
              >
                {guideCategories.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="md:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spartan-gray-400" />
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value as 'published' | 'draft' | '')}
                className="w-full pl-10 pr-4 py-2 border border-spartan-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-spartan-primary appearance-none"
              >
                {publishStatuses.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de guías */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {currentGuides.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-spartan-gray-500">No se encontraron guías que coincidan con los criterios de búsqueda.</p>
          </div>
        ) : (
          <div className="divide-y divide-spartan-gray-100">
            {currentGuides.map(guide => (
              <div key={guide.id} className="p-6">
                <div className="sm:flex">
                  <div className="w-full sm:w-40 h-32 bg-spartan-gray-100 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <img 
                      src={guide.coverImage} 
                      alt={guide.title}
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Imagen+no+disponible';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-spartan-primary/10 text-spartan-primary text-xs rounded">
                        {guideCategories.find(cat => cat.value === guide.category)?.label || guide.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        guide.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {guide.status === 'published' ? 'Publicado' : 'Borrador'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                    <p className="text-spartan-gray-700 text-sm mb-3 line-clamp-2">{guide.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guide.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-spartan-gray-100 text-spartan-gray-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-spartan-gray-500">
                        <span>Por {guide.author}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(guide.publishDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePreviewGuide(guide)}
                          disabled={false}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Vista previa
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditGuide(guide)}
                          disabled={false}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => handleDeleteGuide(guide.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <span className="px-3 py-1">
              Página {currentPage} de {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideManagement;
