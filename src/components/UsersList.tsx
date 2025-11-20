import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types/User';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { Avatar } from './Avatar';
import './UsersList.css';

interface UsersListViewProps {
  users: User[];
  expandedUserId: number | null;
  onToggleExpand: (userId: number) => void;
}

export const UsersList = ({ users, expandedUserId, onToggleExpand }: UsersListViewProps) => {
  return (
    <div className="users-list-view">
      {users.map((user, index) => {
        const isExpanded = expandedUserId === user.id;

        return (
          <motion.div
            key={user.id}
            className="user-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: index * 0.05
            }}
          >
            <Avatar name={user.name} size="medium" />
            <div className="user-row-content">
              <div className="user-row-name">{user.name}</div>
              <div className="user-row-details">
                <span className="user-row-item">{user.email}</span>
                <span className="user-row-separator">•</span>
                <span className="user-row-item">{user.address.city}</span>
                <span className="user-row-separator">•</span>
                <span className="user-row-item">{user.company.name}</span>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="user-expanded-info"
                    initial={{ opacity: 0, maxHeight: 0, marginTop: 0, paddingTop: 0 }}
                    animate={{
                      opacity: 1,
                      maxHeight: 400,
                      marginTop: 16,
                      paddingTop: 16
                    }}
                    exit={{ opacity: 0, maxHeight: 0, marginTop: 0, paddingTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="expand-button"
              onClick={() => onToggleExpand(user.id)}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};
