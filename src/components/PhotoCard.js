// PhotoCard.js

import React from 'react';
import '../styles/PhotoList.css';

function PhotoCard({ photo, onEdit, onDelete, openModal, getTagColor }) {

  return (
    <div className="photo-card" onClick={() => openModal(photo)}>
      <img src={photo.url} alt={photo.title} />
      <div className="photo-details">
        <h3>{photo.title}</h3>
        <div className="tags">
          {photo.tags?.map((tag) => (
            <span key={tag} style={{ backgroundColor: getTagColor(tag) }}>
              {tag}
            </span>
          ))}
        </div>
        <div className="photo-actions">
          <button className="edit-button" onClick={(e) => { e.stopPropagation(); onEdit(photo); }}>Edit</button>
          <button className="delete-button" onClick={(e) => { e.stopPropagation(); onDelete(photo._id); }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
