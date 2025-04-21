
'use client'; 

import { useState } from 'react'; 

export default function AddComment({ postId, onCommentAdded }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData(e.target);
      const contenu = formData.get('contenu');
      
      if (!contenu.trim()) {
        throw new Error('Le commentaire ne peut pas être vide');
      }

      const response = await fetch('http://localhost:3001/comentaires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idPost: postId,
          contenu,
          date: new Date().toISOString().split('T')[0]
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du commentaire');
      }

      const newComment = await response.json();
      onCommentAdded(newComment);
      e.target.reset();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      <h3>Ajouter un commentaire</h3>
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <textarea
          name="contenu"
          className="form-control mb-2"
          rows="4"
          required
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
}