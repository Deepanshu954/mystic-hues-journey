import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface Place {
  name: string;
  image: string;
  description: string;
}

interface Cuisine {
  name: string;
  description: string;
  image: string;
}

interface AddStateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (state: any) => void;
}

const AddStateModal = ({ isOpen, onClose, onAdd }: AddStateModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    path: '',
    description: '',
    image: '',
    thumbnail: '',
    famous: '',
    tags: [''],
    places: [{ name: '', image: '', description: '' }],
    cuisine: [{ name: '', description: '', image: '' }],
    history: {
      ancient: '',
      medieval: '',
      modern: '',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleHistoryChange = (era: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      history: {
        ...prev.history,
        [era]: value,
      },
    }));
  };

  const handlePlaceChange = (index: number, field: keyof Place, value: string) => {
    setFormData((prev) => {
      const newPlaces = [...prev.places];
      newPlaces[index] = { ...newPlaces[index], [field]: value };
      return { ...prev, places: newPlaces };
    });
  };

  const handleCuisineChange = (index: number, field: keyof Cuisine, value: string) => {
    setFormData((prev) => {
      const newCuisine = [...prev.cuisine];
      newCuisine[index] = { ...newCuisine[index], [field]: value };
      return { ...prev, cuisine: newCuisine };
    });
  };

  const addPlace = () => {
    setFormData((prev) => ({
      ...prev,
      places: [...prev.places, { name: '', image: '', description: '' }],
    }));
  };

  const removePlace = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      places: prev.places.filter((_, i) => i !== index),
    }));
  };

  const addCuisine = () => {
    setFormData((prev) => ({
      ...prev,
      cuisine: [...prev.cuisine, { name: '', description: '', image: '' }],
    }));
  };

  const removeCuisine = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      cuisine: prev.cuisine.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      image: formData.image,
      description: formData.description,
      tags: formData.tags.filter(tag => tag !== ''),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 my-8">
        <div className="bg-gray-800 rounded-xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Add New State</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-violet-400 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="State Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Main Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma-separated)"
                  value={formData.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <textarea
                name="description"
                placeholder="State Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 h-24"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition-colors"
              >
                Add State
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStateModal;