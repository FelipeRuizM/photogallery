import React, { useEffect, useState } from 'react';
import '../styles/PhotoForm.css';

function PhotoForm({ onSubmit, editingPhoto }) {
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [tags, setTags] = useState('');

	useEffect(() => {
		setTitle(editingPhoto?.title || '');
		setUrl(editingPhoto?.url || '');
		setTags(editingPhoto?.tags?.join(', ') || '');
  }, [editingPhoto]);

	const handleSubmit = async (e) => {
		e.preventDefault();
    const tagsArray = tags.split(',').map(tag => tag.trim());

    const photoObject = {
      title,
      url,
      tags: tagsArray, // Send tags as an array
      _id: editingPhoto?._id
    };

    const success = await onSubmit(photoObject);
    if (success) {
      // Reset the form only when adding (not editing)
      setTitle('');
      setUrl('');
      setTags('');
    }
	};

	return (
		<div className="photo-form-container">
			<form onSubmit={handleSubmit} className="photo-form">
				<div className="form-group">
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						id="title"
						className="form-input"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="url">URL:</label>
					<input
						type="text"
						id="url"
						className="form-input"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="tags">Tags (comma-separated):</label>
					<input
						type="text"
						id="tags"
						className="form-input"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
					/>
				</div>
				<button type="submit" className="submit-button">
					{editingPhoto ? 'Update Photo' : 'Add Photo'}
				</button>
			</form>
		</div>
	);
}

export default PhotoForm;
