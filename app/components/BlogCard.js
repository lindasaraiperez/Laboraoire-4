'use client';

import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img 
          src="/assets/horizontal.jpg" 
          alt={post.title}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text flex-grow-1">
            {post.content.substring(0, 100)}...
          </p>
          <Link 
            href={`/blog/${post.id}`}
            className="btn btn-primary mt-auto"
          >
            Lire la suite
          </Link>
        </div>
      </div>
    </div>
  );
}