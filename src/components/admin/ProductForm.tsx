
import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { Button } from '../ui/button-custom';
import { Product, ProductCategory } from '../../types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const categoryOptions: { value: ProductCategory; label: string }[] = [
  { value: 'proteina', label: 'Proteínas' },
  { value: 'creatina', label: 'Creatina' },
  { value: 'pre-entreno', label: 'Pre-entreno' },
  { value: 'aminoacidos', label: 'Aminoácidos' },
  { value: 'vitaminas', label: 'Vitaminas' },
  { value: 'energia', label: 'Energía' },
  { value: 'recuperacion', label: 'Recuperación' },
  { value: 'otros', label: 'Otros' },
];

const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: 'otros',
      imageUrl: '',
      featured: false,
      benefits: [],
    }
  );
  
  const [benefit, setBenefit] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.imageUrl || null
  );
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Para los inputs de tipo number, convertimos el valor a número
    if (type === 'number') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? '' : Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Limpiar el error cuando el usuario cambia el valor
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // En una implementación real, aquí subiríamos la imagen a un servidor
      // Por ahora, solo mostraremos una vista previa
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData((prev) => ({
          ...prev,
          imageUrl: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddBenefit = () => {
    if (benefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...(prev.benefits || []), benefit.trim()],
      }));
      setBenefit('');
    }
  };
  
  const handleRemoveBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: (prev.benefits || []).filter((_, i) => i !== index),
    }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (formData.price === undefined || formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor que 0';
    }
    
    if (formData.stock === undefined || formData.stock < 0) {
      newErrors.stock = 'El stock debe ser un número positivo';
    }
    
    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }
    
    if (!formData.imageUrl) {
      newErrors.imageUrl = 'La imagen es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-6">
          {/* Nombre del producto */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-spartan-gray-700 mb-1">
              Nombre del producto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.name ? 'border-red-500' : 'border-spartan-gray-300'
              } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spartan-primary`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-spartan-gray-700 mb-1">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full rounded-md border ${
                errors.description ? 'border-red-500' : 'border-spartan-gray-300'
              } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spartan-primary`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          
          {/* Precio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                Precio <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-spartan-gray-500">
                  ₡
                </span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="100"
                  className={`w-full rounded-md border ${
                    errors.price ? 'border-red-500' : 'border-spartan-gray-300'
                  } pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-spartan-primary`}
                />
              </div>
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            
            <div>
              <label htmlFor="discountPrice" className="block text-sm font-medium text-spartan-gray-700 mb-1">
                Precio de oferta (opcional)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-spartan-gray-500">
                  ₡
                </span>
                <input
                  type="number"
                  id="discountPrice"
                  name="discountPrice"
                  value={formData.discountPrice ?? ''}
                  onChange={handleChange}
                  min="0"
                  step="100"
                  className="w-full rounded-md border border-spartan-gray-300 pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-spartan-primary"
                />
              </div>
            </div>
          </div>
          
          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-spartan-gray-700 mb-1">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              step="1"
              className={`w-full rounded-md border ${
                errors.stock ? 'border-red-500' : 'border-spartan-gray-300'
              } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spartan-primary`}
            />
            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
          </div>
          
          {/* Categoría */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-spartan-gray-700 mb-1">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.category ? 'border-red-500' : 'border-spartan-gray-300'
              } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spartan-primary`}
            >
              <option value="">Seleccionar categoría</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
          
          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured || false}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-spartan-primary border-spartan-gray-300 rounded focus:ring-spartan-primary"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-spartan-gray-700">
              Destacar en la página principal
            </label>
          </div>
        </div>
        
        {/* Columna derecha */}
        <div className="space-y-6">
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-spartan-gray-700 mb-1">
              Imagen del producto <span className="text-red-500">*</span>
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                errors.imageUrl
                  ? 'border-red-500'
                  : imagePreview
                  ? 'border-spartan-primary/50'
                  : 'border-spartan-gray-300'
              }`}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="mx-auto max-h-48 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, imageUrl: '' }));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <Upload className="mx-auto h-12 w-12 text-spartan-gray-400" />
                  <p className="mt-2 text-sm text-spartan-gray-500">
                    Haz clic para subir o arrastra una imagen aquí
                  </p>
                  <p className="text-xs text-spartan-gray-400">PNG, JPG, GIF hasta 5MB</p>
                </div>
              )}
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={!!imagePreview}
              />
              <label
                htmlFor="imageUrl"
                className={`block mt-4 cursor-pointer ${imagePreview ? 'hidden' : ''}`}
              >
                <Button type="button" variant="outline" size="sm">
                  Seleccionar imagen
                </Button>
              </label>
              {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
            </div>
          </div>
          
          {/* Beneficios */}
          <div>
            <label className="block text-sm font-medium text-spartan-gray-700 mb-1">
              Beneficios
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={benefit}
                onChange={(e) => setBenefit(e.target.value)}
                placeholder="Agregar un beneficio"
                className="flex-1 rounded-md border border-spartan-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spartan-primary"
              />
              <Button
                type="button"
                onClick={handleAddBenefit}
                variant="outline"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Agregar
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.benefits?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-spartan-light rounded-md px-3 py-2"
                >
                  <span className="text-sm">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Modo de uso */}
          <div>
            <label htmlFor="howToUse" className="block text-sm font-medium text-spartan-gray-700 mb-1">
              Modo de uso
            </label>
            <textarea
              id="howToUse"
              name="howToUse"
              value={formData.howToUse || ''}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-spartan-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spartan-primary"
              placeholder="Instrucciones para el uso adecuado del producto"
            />
          </div>
          
          {/* Ingredientes */}
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-spartan-gray-700 mb-1">
              Ingredientes
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients || ''}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-spartan-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-spartan-primary"
              placeholder="Lista de ingredientes del producto"
            />
          </div>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-spartan-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {product ? 'Actualizar producto' : 'Crear producto'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
