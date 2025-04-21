'use client'; 

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AddBlogPost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!formData.title.trim() || !formData.content.trim()) {
        throw new Error('Le titre et le contenu sont obligatoires');
      }

      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString().split('T')[0] 
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      router.push('/');
      router.refresh(); 

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>

      <main className="container my-5">
        <h1 className="mb-4">Créer un nouvel article</h1>
        
        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Titre *</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="author" className="form-label">Auteur</label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Contenu *</label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              rows="10"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="d-flex gap-2">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Publication...
                </>
              ) : 'Publier'}
            </button>
            
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => router.push('/')}
            >
              Annuler
            </button>
          </div>
        </form>
      </main>
    </>
  );
}