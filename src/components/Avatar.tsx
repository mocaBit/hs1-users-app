import { useState } from 'react';
import './Avatar.css';

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'small' | 'medium' | 'large';
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const Avatar = ({ name, imageUrl, size = 'medium' }: AvatarProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const shouldShowInitials = !imageUrl || imageError;

  return (
    <div className={`avatar avatar-${size}`}>
      {shouldShowInitials ? (
        <span className="avatar-initials">{getInitials(name)}</span>
      ) : (
        <img
          src={imageUrl}
          alt={name}
          className="avatar-image"
          onError={handleImageError}
        />
      )}
    </div>
  );
};
