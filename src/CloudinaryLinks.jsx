/**
 * @file CloudinaryLinks.jsx
 * @description Central registry for all Cloudinary-hosted media assets across Nexora Platform.
 */

export const CloudinaryLinks = {
  /* ==========================================================================
     WATERMARKS
     ========================================================================== */
  watermark: 'https://res.cloudinary.com/dlhmkbijh/image/upload/v1789538903/WaterMark_hjxmru.png',
  laptopWatermark: 'https://res.cloudinary.com/dlhmkbijh/image/upload/v1789538903/WaterMark_hjxmru.png',
  phoneWatermark: 'https://res.cloudinary.com/dlhmkbijh/image/upload/v1789538903/PhoneWaterMark_fkgqon.png',

  /* ==========================================================================
     BRAND LOGOS & BADGES
     ========================================================================== */
  nexoraLogo: 'https://res.cloudinary.com/dlhmkbijh/image/upload/v1789539213/nexora_logo_slwe5l.png',
  cyberCrimeLogo: 'https://res.cloudinary.com/dlhmkbijh/image/upload/v1785473583/Logo_mswjel.png',

  /* ==========================================================================
     VIDEOS & ANIMATIONS
     ========================================================================== */
  runningAnimation: 'https://res.cloudinary.com/dlhmkbijh/video/upload/v1789539210/running_animation_prebra.mp4',

  /* ==========================================================================
     SOUNDS & AUDIOS
     ========================================================================== */
  chimeSound: 'https://res.cloudinary.com/dlhmkbijh/video/upload/v1789538911/chime_crofgx.mp3',
  bellSound: 'https://res.cloudinary.com/dlhmkbijh/video/upload/v1789538911/bell_gamrur.mp3',
  pingSound: 'https://res.cloudinary.com/dlhmkbijh/video/upload/v1789538912/ping_esvrdj.mp3',
  subtleSound: 'https://res.cloudinary.com/dlhmkbijh/video/upload/v1789538912/subtle_n6kw4u.mp3',
};

// Named exports for convenient direct destructuring
export const {
  watermark,
  laptopWatermark,
  phoneWatermark,
  nexoraLogo,
  cyberCrimeLogo,
  runningAnimation,
  chimeSound,
  bellSound,
  pingSound,
  subtleSound,
} = CloudinaryLinks;

export default CloudinaryLinks;
