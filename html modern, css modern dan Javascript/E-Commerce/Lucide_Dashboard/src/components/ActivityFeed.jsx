import { initials } from '../utils/format';

export default function ActivityFeed({ items }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.id} className="feed-item">
          <div className="feed-avatar" style={{ background: item.color }}>
            {initials(item.user)}
          </div>
          <div className="feed-body">
            <div className="feed-text">
              <b>{item.user}</b> {item.action} <b>{item.target}</b>
            </div>
            <div className="feed-time">{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}