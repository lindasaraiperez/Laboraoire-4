'use client';

import { useState } from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';

export default function AddCommentWrapper({ postId, initialComments }) {
  const [comments, setComments] = useState(initialComments);

  const handleNewComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <section className="mt-5">
      <h2>Commentaires ({comments.length})</h2>
      <CommentList comments={comments} />
      <AddComment 
        postId={postId}
        onCommentAdded={handleNewComment}
      />
    </section>
  );
}