import React, { useState } from 'react';
import Modal from 'react-modal';
import PhotoCard from './PhotoCard'; // Import the new PhotoCard component
import '../styles/PhotoList.css';

function PhotoList({ photos, onEdit, onDelete }) {
	const [selectedPhoto, setSelectedPhoto] = useState(null);

	const openModal = (photo) => {
		setSelectedPhoto(photo);
	};

	const closeModal = () => {
		setSelectedPhoto(null);
	};

	const tagColors = [
		'#663399', // Purple
		'#4CAF50', // Green
		'#008CBA', // Blue
		'#f44336', // Red
		'#e91e63', // Pink
		'#2980b9', // Strong Blue
		'#8e44ad', // Dark Purple
		'#2ecc71', // Emerald
		'#e67e22', // Carrot
		'#f1c40f', // Sunflower
		'#3498db', // Peter River
		'#9b59b6', // Amethyst
		'#27ae60', // Nephritis
		'#d35400', // Orange
		'#f39c12', // Sun Flower
		'#1abc9c', // Turquoise
		'#34495e', // Wet Asphalt
		'#7f8c8d', // Concrete
		'#95a5a6', // Light Grey
		'#bdc3c7', // Silver
		'#ecf0f1', // Clouds
	];

	const getTagColor = (tagName) => {
		// Create a simple hash function to assign consistent colors to tags
		let hash = 0;
		for (let i = 0; i < tagName.length; i++) {
			hash = (hash << 5) - hash + tagName.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}
		return tagColors[Math.abs(hash) % tagColors.length]; // Choose a color from the palette based on hash
	};

	return (
		<div className="photo-list">
			{photos.map((photo, index) => (
				<PhotoCard
					key={photo._id}
					photo={photo}
					onEdit={onEdit}
					onDelete={onDelete}
					openModal={openModal} // Pass openModal function
					getTagColor={getTagColor} //Pass getTagColor function
				/>
			))}

			{/* Modal remains the same */}
			<Modal
				isOpen={!!selectedPhoto}
				onRequestClose={closeModal}
				contentLabel="Photo Lightbox"
				className="photo-modal"
				overlayClassName="photo-modal-overlay"
			>
				{selectedPhoto && (
					<div>
						{<button className="close-button" onClick={closeModal}>&times;</button>}
						<img src={selectedPhoto.url} alt={selectedPhoto.title} className="lightbox-image" />
						<h2>{selectedPhoto.title}</h2>
						<div className="tags">
							{selectedPhoto.tags.map((tag) => (
								<span key={tag} style={{ backgroundColor: getTagColor(tag) }}>
									{tag}
								</span>
							))}
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}

export default PhotoList;
