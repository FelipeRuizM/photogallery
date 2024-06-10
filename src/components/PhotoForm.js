import React, { useState } from 'react';
import '../styles/PhotoForm.css';

function PhotoForm({ onSubmit, initialPhoto }) {
	const [title, setTitle] = useState(initialPhoto?.title || '');
	const [url, setUrl] = useState(initialPhoto?.url || '');
	const [tags, setTags] = useState(initialPhoto?.tags?.join(', ') || '');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ title, url, tags, _id: initialPhoto?._id });
		setTitle('');
		setUrl('');
		setTags('');
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
					{initialPhoto ? 'Update Photo' : 'Add Photo'}
				</button>
			</form>
		</div>
	);
}

export default PhotoForm;
