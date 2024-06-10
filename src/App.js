import React, { useState, useEffect } from 'react';
import PhotoList from './components/PhotoList';
import PhotoForm from './components/PhotoForm';
import FilterBar from './components/FilterBar';
import './styles/App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [titleFilter, setTitleFilter] = useState(''); // Add state for title filter
  const [filterTags, setFilterTags] = useState(''); // Add state for filter tags

  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch photos when filters change
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const url = `${API_URL}/api/photos?tags=${filterTags}&title=${titleFilter}`; // Update URL to include title filter
        const response = await fetch(url);
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, [API_URL, filterTags, titleFilter]); // Include titleFilter in dependencies

  // Handle creating a new photo
  const handleCreatePhoto = async (newPhoto) => {
    try {
      const res = await fetch(`${API_URL}/api/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPhoto)
      });
      const createdPhoto = await res.json();
      setPhotos([...photos, createdPhoto]);
    } catch (error) {
      console.error('Error creating photo:', error);
    }
  };

  // Handle updating a photo
  const handleUpdatePhoto = async (updatedPhoto) => {
    try {
      const res = await fetch(`${API_URL}/api/photos/${updatedPhoto._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPhoto)
      });
      const data = await res.json();
      setPhotos(photos.map(photo => photo._id === data._id ? data : photo));
      setEditingPhoto(null);
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  // Handle deleting a photo
  const handleDeletePhoto = async (photoId) => {
    try {
      await fetch(`${API_URL}/api/photos/${photoId}`, { method: 'DELETE' });
      setPhotos(photos.filter(photo => photo._id !== photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <>
      <PhotoForm
        onSubmit={editingPhoto ? handleUpdatePhoto : handleCreatePhoto}
        initialPhoto={editingPhoto}
      />
      <FilterBar 
        titleFilter={titleFilter} 
        setTitleFilter={setTitleFilter}
        filterTags={filterTags} 
        setFilterTags={setFilterTags} 
      />
      <PhotoList
        photos={photos}
        onEdit={setEditingPhoto}
        onDelete={handleDeletePhoto}
      />
    </>
  );
}

export default App;
