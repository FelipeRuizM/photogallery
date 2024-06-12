// App.js
import React, { useState, useEffect } from 'react';
import PhotoList from './components/PhotoList';
import PhotoForm from './components/PhotoForm';
import FilterBar from './components/FilterBar';
import './styles/App.css';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

function App() {
  // ... (your existing state variables: photos, editingPhoto, titleFilter, filterTags) ...
  const [photos, setPhotos] = useState([]);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [titleFilter, setTitleFilter] = useState('');
  const [filterTags, setFilterTags] = useState('');

  // Fetch photos on initial render and when filters change
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        let q = query(collection(db, "photos"));

        if (titleFilter) {
          q = query(q, where("title", ">=", titleFilter), where("title", "<=", titleFilter + '\uf8ff')); // Filter by title
        }

        if (filterTags) {
          const tagPrefix = filterTags.toLowerCase().trim(); // Normalize to lowercase
          q = query(q, where("tags", "array-contains-any", 
              [tagPrefix, tagPrefix + "\uf8ff"]  // Match tags starting with the prefix
          )); 
      }

        const querySnapshot = await getDocs(q);
        const fetchedPhotos = querySnapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id }));
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [filterTags, titleFilter]); // Include titleFilter in dependencies

  // Handle creating a new photo
  const handleCreatePhoto = async (newPhoto) => {
    try {
      // 1. Add photo data directly to Firestore
      delete newPhoto._id;
      console.log(`photo: ${JSON.stringify(newPhoto)}`);
      const docRef = await addDoc(collection(db, "photos"), newPhoto);
      setPhotos([...photos, { ...newPhoto, _id: docRef.id }]); // Add _id from Firestore
      return true; // Indicate success
    } catch (error) {
      console.error('Error creating photo:', error);
      return false;
    }
  };

  // Handle updating a photo
  const handleUpdatePhoto = async (updatedPhoto) => {
    try {
      // 1. Update photo data in Firestore
      const photoRef = doc(db, "photos", updatedPhoto._id);
      await updateDoc(photoRef, updatedPhoto);

      // 2. Update photos state
      setPhotos(photos.map(photo => photo._id === updatedPhoto._id ? updatedPhoto : photo));
      setEditingPhoto(null);
      return true;
    } catch (error) {
      console.error('Error updating photo:', error);
      return false;
    }
  };



  // Handle deleting a photo
  const handleDeletePhoto = async (photoId) => {
    try {
      // 1. Delete photo from Firestore
      await deleteDoc(doc(db, "photos", photoId));

      // 2. Update photos state
      setPhotos(photos.filter(photo => photo._id !== photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <>
      <PhotoForm
        onSubmit={editingPhoto ? handleUpdatePhoto : handleCreatePhoto}
        editingPhoto={editingPhoto}
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
};

export default App;
