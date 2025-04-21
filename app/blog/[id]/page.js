
import { notFound } from 'next/navigation';
import AddCommentWrapper from '../../components/AddCommentWrapper';

async function getPost(id) {
  const res = await fetch(`http://localhost:3001/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
}

async function getComments(postId) {
  const res = await fetch(`http://localhost:3001/comentaires?idPost=${postId}`);
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogDetailPage({ params }) {
  
  const postId = await Promise.resolve(params.id);
  
  const [post, initialComments] = await Promise.all([
    getPost(postId),
    getComments(postId)
  ]);

  if (!post) return notFound();

  return (
    <div className="container">
      <article className="mb-5">
        <img 
          src="/assets/img/horizontal.jpg" 
          alt={post.title}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
        />
        <h1 className="mb-3">{post.title}</h1>
        <p className="text-muted mb-4">
          Par {post.author}, le {new Date(post.date).toLocaleDateString('fr-FR')}
        </p>
        <div className="blog-text">
          <p>{post.content}</p>
        </div>
      </article>

      <AddCommentWrapper 
        postId={postId} 
        initialComments={initialComments} 
      />
    </div>
  );
}