'use client';

import { useState } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';

export default function BlogDetails({ post, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments);

  const handleNewComment = async (contenu) => {
    const newComment = {
      idPost: post.id,
      contenu,
      date: new Date().toISOString().split('T')[0]
    };

    const response = await fetch('http://localhost:3001/comentarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment)
    });

    if (response.ok) {
      setComments([...comments, await response.json()]);
    }
  };

  return (
    <article className="container mt-4">
      <img 
        src="/assets/horizontal.jpg" 
        alt={post.title}
        className="img-fluid rounded mb-4"
      />
      <h1 className="mb-3">{post.title}</h1>
      <p className="text-muted mb-4">
        Par {post.author}, le {new Date(post.date).toLocaleDateString('fr-FR')}
      </p>
      <div className="mb-5">
        <p className="lead">{post.content}</p>
      </div>

      <section className="mt-5 border-top pt-4">
        <h2>Commentaires ({comments.length})</h2>
        <CommentList comments={comments} />
        <AddComment onCommentSubmit={handleNewComment} />
      </section>
    </article>
  );
}