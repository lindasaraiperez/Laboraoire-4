export default function Comment({ comment }) {
  if (!comment) return null;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <p>{comment.contenu}</p>
        <small className="text-muted">
          {new Date(comment.date).toLocaleDateString('fr-FR')}
        </small>
      </div>
    </div>
  );
}