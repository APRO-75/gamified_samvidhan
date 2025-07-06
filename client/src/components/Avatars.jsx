import React from 'react';

export const SimpleAvatar1 = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FFB6C1"/>
    <circle cx="35" cy="40" r="5" fill="#333"/>
    <circle cx="65" cy="40" r="5" fill="#333"/>
    <path d="M 35 60 Q 50 70 65 60" stroke="#333" strokeWidth="3" fill="none"/>
  </svg>
);

export const SimpleAvatar2 = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#98FB98"/>
    <circle cx="35" cy="40" r="5" fill="#333"/>
    <circle cx="65" cy="40" r="5" fill="#333"/>
    <path d="M 30 55 Q 50 65 70 55" stroke="#333" strokeWidth="3" fill="none"/>
    <path d="M 25 25 Q 50 45 75 25" stroke="#333" strokeWidth="3" fill="none"/>
  </svg>
);

export const SimpleAvatar3 = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#87CEEB"/>
    <circle cx="35" cy="40" r="5" fill="#333"/>
    <circle cx="65" cy="40" r="5" fill="#333"/>
    <path d="M 35 60 Q 50 50 65 60" stroke="#333" strokeWidth="3" fill="none"/>
    <path d="M 20 20 L 40 35" stroke="#333" strokeWidth="3" fill="none"/>
    <path d="M 80 20 L 60 35" stroke="#333" strokeWidth="3" fill="none"/>
  </svg>
);

export const SimpleAvatar4 = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FFA07A"/>
    <circle cx="35" cy="40" r="5" fill="#333"/>
    <circle cx="65" cy="40" r="5" fill="#333"/>
    <path d="M 35 55 Q 50 75 65 55" stroke="#333" strokeWidth="3" fill="none"/>
    <path d="M 25 30 C 35 20 65 20 75 30" stroke="#333" strokeWidth="3" fill="none"/>
  </svg>
);

export const SimpleAvatar5 = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#DDA0DD"/>
    <circle cx="35" cy="40" r="5" fill="#333"/>
    <circle cx="65" cy="40" r="5" fill="#333"/>
    <path d="M 30 60 Q 50 65 70 60" stroke="#333" strokeWidth="3" fill="none"/>
    <path d="M 30 25 L 45 40" stroke="#333" strokeWidth="3" fill="none"/>
    <path d="M 70 25 L 55 40" stroke="#333" strokeWidth="3" fill="none"/>
    <circle cx="50" cy="35" r="5" fill="#333"/>
  </svg>
);

export const SimpleAvatar6 = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#20B2AA"/>
    <circle cx="35" cy="40" r="5" fill="#333"/>
    <circle cx="65" cy="40" r="5" fill="#333"/>
    <path d="M 35 60 Q 50 70 65 60" stroke="#333" strokeWidth="3" fill="none"/>
    <path d="M 20 30 Q 50 10 80 30" stroke="#333" strokeWidth="3" fill="none"/>
    <circle cx="50" cy="45" r="3" fill="#333"/>
  </svg>
);

export const AnimatedCatAvatar = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        {`
          @keyframes earWiggle {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(5deg); }
          }
          @keyframes blinkEyes {
            0%, 95%, 100% { transform: scaleY(1); }
            97% { transform: scaleY(0.1); }
          }
          .ear { animation: earWiggle 2s infinite; }
          .eye { animation: blinkEyes 4s infinite; }
        `}
      </style>
    </defs>
    <circle cx="50" cy="50" r="45" fill="#FFE4B5"/>
    <path className="ear" d="M30 25 L20 10 L40 20 Z" fill="#FFE4B5"/>
    <path className="ear" d="M70 25 L80 10 L60 20 Z" fill="#FFE4B5"/>
    <g className="eye">
      <circle cx="35" cy="40" r="5" fill="#333"/>
      <circle cx="65" cy="40" r="5" fill="#333"/>
      <circle cx="33" cy="38" r="2" fill="white"/>
      <circle cx="63" cy="38" r="2" fill="white"/>
    </g>
    <path d="M25 50 L10 45" stroke="#333" strokeWidth="1"/>
    <path d="M25 55 L10 55" stroke="#333" strokeWidth="1"/>
    <path d="M25 60 L10 65" stroke="#333" strokeWidth="1"/>
    <path d="M75 50 L90 45" stroke="#333" strokeWidth="1"/>
    <path d="M75 55 L90 55" stroke="#333" strokeWidth="1"/>
    <path d="M75 60 L90 65" stroke="#333" strokeWidth="1"/>
    <path d="M47 50 L53 50 L50 53 Z" fill="#FF9999"/>
    <path d="M50 53 Q50 60 45 58" stroke="#333" strokeWidth="1" fill="none"/>
    <path d="M50 53 Q50 60 55 58" stroke="#333" strokeWidth="1" fill="none"/>
  </svg>
);

export const AnimatedRobotAvatar = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        {`
          @keyframes antennaBeep {
            0%, 100% { transform: scale(1); fill: #FF0000; }
            50% { transform: scale(1.2); fill: #FF6666; }
          }
          @keyframes screenGlow {
            0%, 100% { fill: #4CAF50; }
            50% { fill: #81C784; }
          }
          .antenna-light { animation: antennaBeep 1.5s infinite; }
          .screen { animation: screenGlow 3s infinite; }
        `}
      </style>
    </defs>
    <rect x="25" y="20" width="50" height="60" rx="5" fill="#A9A9A9"/>
    <rect x="20" y="30" width="60" height="45" rx="3" fill="#808080"/>
    <line x1="50" y1="20" x2="50" y2="10" stroke="#666" strokeWidth="3"/>
    <circle className="antenna-light" cx="50" cy="8" r="3"/>
    <rect className="screen" x="30" y="35" width="40" height="25" rx="2"/>
    <rect x="25" y="65" width="15" height="8" rx="1" fill="#666"/>
    <rect x="60" y="65" width="15" height="8" rx="1" fill="#666"/>
    <circle cx="30" cy="69" r="2" fill="#FF0000"/>
    <circle cx="38" cy="69" r="2" fill="#00FF00"/>
    <circle cx="65" cy="69" r="2" fill="#0000FF"/>
    <circle cx="73" cy="69" r="2" fill="#FFFF00"/>
    <text x="35" y="50" fontFamily="monospace" fontSize="8" fill="#111">HELLO</text>
  </svg>
);

export const AnimatedAlienAvatar = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes glow {
            0%, 100% { fill: #98FB98; }
            50% { fill: #7CCD7C; }
          }
          @keyframes antennaWave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-15deg); }
            75% { transform: rotate(15deg); }
          }
          .alien-head { animation: float 3s ease-in-out infinite; }
          .alien-eye { animation: glow 2s infinite; }
          .antenna { animation: antennaWave 4s infinite; }
        `}
      </style>
    </defs>
    <g className="alien-head">
      <path d="M50 15 C20 15 10 40 10 60 C10 80 30 90 50 90 C70 90 90 80 90 60 C90 40 80 15 50 15" fill="#90EE90"/>
      <ellipse className="alien-eye" cx="35" cy="45" rx="15" ry="10"/>
      <ellipse className="alien-eye" cx="65" cy="45" rx="15" ry="10"/>
      <circle cx="35" cy="45" r="5" fill="black"/>
      <circle cx="65" cy="45" r="5" fill="black"/>
      <circle cx="37" cy="43" r="2" fill="white"/>
      <circle cx="67" cy="43" r="2" fill="white"/>
      <path className="antenna" d="M40 20 C30 10 20 15 15 5" stroke="#90EE90" strokeWidth="3" fill="none"/>
      <path className="antenna" d="M60 20 C70 10 80 15 85 5" stroke="#90EE90" strokeWidth="3" fill="none"/>
      <circle cx="15" cy="5" r="3" fill="#98FB98"/>
      <circle cx="85" cy="5" r="3" fill="#98FB98"/>
      <path d="M45 65 C50 70 55 70 60 65" stroke="black" strokeWidth="2" fill="none"/>
    </g>
  </svg>
);

export const avatarComponents = {
  1: SimpleAvatar1,
  2: SimpleAvatar2,
  3: SimpleAvatar3,
  4: SimpleAvatar4,
  5: SimpleAvatar5,
  6: SimpleAvatar6,
  7: AnimatedCatAvatar,
  8: AnimatedRobotAvatar,
  9: AnimatedAlienAvatar
};

export const avatarsList = [
  { id: 1, name: 'Happy Face', style: 'simple', component: SimpleAvatar1 },
  { id: 2, name: 'Cool Dude', style: 'simple', component: SimpleAvatar2 },
  { id: 3, name: 'Star Eyes', style: 'simple', component: SimpleAvatar3 },
  { id: 4, name: 'Sunshine', style: 'simple', component: SimpleAvatar4 },
  { id: 5, name: 'Crown', style: 'simple', component: SimpleAvatar5 },
  { id: 6, name: 'Wave', style: 'simple', component: SimpleAvatar6 },
  { id: 7, name: 'Kitty', style: 'animated', component: AnimatedCatAvatar },
  { id: 8, name: 'Robot', style: 'animated', component: AnimatedRobotAvatar },
  { id: 9, name: 'Alien', style: 'animated', component: AnimatedAlienAvatar }
]; 