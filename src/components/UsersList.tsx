import { User } from '../types/User';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import './UsersList.css';

interface UsersListViewProps {
  users: User[];
  expandedUsers: number[];
  onToggleExpand: (userId: number) => void;
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const UsersList = ({ users, expandedUsers, onToggleExpand }: UsersListViewProps) => {
  return (
    <div className="users-list-view">
      {users.map((user) => {
        const isExpanded = expandedUsers.includes(user.id);

        return (
          <div key={user.id} className="user-row">
            <div className="user-avatar">{getInitials(user.name)}</div>
            <div className="user-row-content">
              <div className="user-row-name">{user.name}</div>
              <div className="user-row-details">
                <span className="user-row-item">{user.email}</span>
                <span className="user-row-separator">•</span>
                <span className="user-row-item">{user.address.city}</span>
                <span className="user-row-separator">•</span>
                <span className="user-row-item">{user.company.name}</span>
              </div>

              {isExpanded && (
                <div className="user-expanded-info">
                  <div className="expanded-row">
                    <span><strong>Username:</strong> @{user.username}</span>
                    <span><strong>Phone:</strong> {user.phone}</span>
                    <span><strong>Website:</strong> {user.website}</span>
                  </div>
                  <div className="expanded-row">
                    <span><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.zipcode}</span>
                  </div>
                  <div className="expanded-row">
                    <span><strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</span>
                  </div>
                  <div className="expanded-row">
                    <span className="catchphrase">"{user.company.catchPhrase}"</span>
                    <span>{user.company.bs}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              className="expand-button"
              onClick={() => onToggleExpand(user.id)}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
            </button>
          </div>
        );
      })}
    </div>
  );
};
