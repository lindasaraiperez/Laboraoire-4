'use client';

import Comment from './Comment';

export default function CommentList({ comments = [] }) {
  if (!Array.isArray(comments)) {
    return <p className="text-muted">Chargement des commentaires...</p>;
  }

  return (
    <div className="mt-3">
      {comments.length === 0 ? (
        <p className="text-muted">Aucun commentaire</p>
      ) : (
        comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
}