export default function Modal({ open, onClose, title, description, children, actions }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        {children}
        <div className="modal-actions">{actions}</div>
      </div>
    </div>
  );
}