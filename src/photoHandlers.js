export const handleCreatePhoto = async (API_URL, setPhotos, photos, newPhoto) => {
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
export const handleUpdatePhoto = async (updatedPhoto) => {
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
export const handleDeletePhoto = async (photoId) => {
  try {
    await fetch(`${API_URL}/api/photos/${photoId}`, { method: 'DELETE' });
    setPhotos(photos.filter(photo => photo._id !== photoId));
  } catch (error) {
    console.error('Error deleting photo:', error);
  }
};
