
'use client';

import BlogCard from './BlogCard';

export default function BlogList({ posts = [] }) {
  if (!Array.isArray(posts)) {
    console.error("BlogList: posts no es un array", posts);
    return <div className="alert alert-danger">Format des articles invalide</div>;
  }

  return (
    <div className="row">
      {posts.length === 0 ? (
        <div className="col-12">
          <p className="text-muted">Aucun article disponible</p>
        </div>
      ) : (
        posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
}