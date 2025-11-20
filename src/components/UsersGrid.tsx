import { motion, AnimatePresence } from 'framer-motion';
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
      {users.map((user, index) => {
        const isExpanded = expandedUserId === user.id;

        return (
          <motion.div
            key={user.id}
            className="user-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: index * 0.05
            }}
          >
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

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="user-expanded-info"
                  initial={{ opacity: 0, maxHeight: 0, marginTop: 0, paddingTop: 0 }}
                  animate={{
                    opacity: 1,
                    maxHeight: 500,
                    marginTop: 20,
                    paddingTop: 20
                  }}
                  exit={{ opacity: 0, maxHeight: 0, marginTop: 0, paddingTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
