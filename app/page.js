import BlogList from './components/BlogList';

async function getPosts() {
  const res = await fetch('http://localhost:3001/posts', { next: { revalidate: 0 } });
  if (!res.ok) {
    console.error("Error fetching posts:", res.status);
    return [];
  }
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  
  console.log("Posts cargados:", posts);

  return (
    <div className="container">
      <h1 className="my-4">CEPI Blog</h1>
      <BlogList posts={posts} />
    </div>
  );
}