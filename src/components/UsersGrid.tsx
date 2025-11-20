import { User } from '../types/User';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { Avatar } from './Avatar';
import './UsersGrid.css';

interface UsersGridProps {
  users: User[];
  expandedUserId: number | null;
  onToggleExpand: (userId: number) => void;
}

export const UsersGrid = ({ users, expandedUserId, onToggleExpand }: UsersGridProps) => {
  return (
    <div className="users-grid-view">
      {users.map((user) => {
        const isExpanded = expandedUserId === user.id;

        return (
          <div key={user.id} className="user-card">
            <button
              className="expand-button"
              onClick={() => onToggleExpand(user.id)}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
            </button>

            <Avatar name={user.name} size="large" />
            <h3>{user.name}</h3>
            <p className="user-email">{user.email}</p>
            <p className="user-company">{user.company.name}</p>

            {isExpanded && (
              <div className="user-expanded-info">
                <div className="info-section">
                  <p><strong>Username:</strong> @{user.username}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Website:</strong> {user.website}</p>
                </div>

                <div className="info-section">
                  <p><strong>Address:</strong></p>
                  <p>{user.address.street}, {user.address.suite}</p>
                  <p>{user.address.city} - {user.address.zipcode}</p>
                  <p className="geo">Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p>
                </div>

                <div className="info-section">
                  <p><strong>Company:</strong></p>
                  <p className="catchphrase">"{user.company.catchPhrase}"</p>
                  <p>{user.company.bs}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
