export default function Toast({ message }) {
  return (
    <div className="toast">
      <span className="check">✓</span>
      {message}
    </div>
  );
}