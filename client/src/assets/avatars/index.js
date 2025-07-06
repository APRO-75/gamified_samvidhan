// Avatar images with metadata
const avatars = [
  {
    id: 1,
    name: 'Happy Face',
    path: '/images/avatars/avatar1.svg',
    style: 'simple',
    color: '#FFB6C1'
  },
  {
    id: 2,
    name: 'Cool Dude',
    path: '/images/avatars/avatar2.svg',
    style: 'simple',
    color: '#98FB98'
  },
  {
    id: 3,
    name: 'Star Eyes',
    path: '/images/avatars/avatar3.svg',
    style: 'simple',
    color: '#87CEEB'
  },
  {
    id: 4,
    name: 'Sunshine',
    path: '/images/avatars/avatar4.svg',
    style: 'simple',
    color: '#FFA07A'
  },
  {
    id: 5,
    name: 'Crown',
    path: '/images/avatars/avatar5.svg',
    style: 'simple',
    color: '#DDA0DD'
  },
  {
    id: 6,
    name: 'Wave',
    path: '/images/avatars/avatar6.svg',
    style: 'simple',
    color: '#20B2AA'
  },
  {
    id: 7,
    name: 'Kitty',
    path: '/images/avatars/avatar7.svg',
    style: 'animated',
    color: '#FFE4B5',
    animation: 'ear wiggle, eye blink'
  },
  {
    id: 8,
    name: 'Robot',
    path: '/images/avatars/avatar8.svg',
    style: 'animated',
    color: '#A9A9A9',
    animation: 'antenna beep, screen glow'
  },
  {
    id: 9,
    name: 'Alien',
    path: '/images/avatars/avatar9.svg',
    style: 'animated',
    color: '#90EE90',
    animation: 'float, glow, antenna wave'
  }
];

// Helper function to get the correct public path
const getPublicPath = (relativePath) => {
  // Remove leading slash if present
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${process.env.PUBLIC_URL}/${cleanPath}`;
};

export const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return getPublicPath(avatars[randomIndex].path);
};

export const getAvatarById = (id) => {
  const avatar = avatars.find(avatar => avatar.id === id);
  return getPublicPath(avatar?.path || avatars[0].path);
};

export const getAvatarsByStyle = (style) => {
  return avatars.filter(avatar => avatar.style === style)
    .map(avatar => ({
      ...avatar,
      path: getPublicPath(avatar.path)
    }));
};

export const getAllAvatars = () => avatars.map(avatar => ({
  ...avatar,
  path: getPublicPath(avatar.path)
}));

export default avatars; 