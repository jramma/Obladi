'use client'

import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

interface AvatarProps {
  userImage?: string; // Imagen subida por el usuario, si existe
  seed?: string;      // Semilla para generar el avatar con Dicebear
}

const Avatar: React.FC<AvatarProps> = ({ userImage, seed = 'default' }) => {
  // Opciones posibles para el fondo
  const bgOptions = ['bg-primary', 'bg-secondary', 'bg-tertiary'];
  
  // Elegir una clase de fondo aleatoria
  const randomBg = bgOptions[Math.floor(Math.random() * bgOptions.length)];

  // Si el usuario tiene una imagen, la mostramos
  if (userImage) {
    return <img src={userImage} alt="User Avatar" className={`w-10 h-10 ${randomBg} rounded-full`} />;
  }

  // Si no tiene imagen, generamos el avatar usando Dicebear
  const avatar = createAvatar(lorelei, {
    seed: seed, // Se puede personalizar con el nombre del usuario o cualquier otro identificador
  });

  const svg = avatar.toString();

  return <div className={`w-10 h-10 ${randomBg} rounded-full aspect-square`} dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default Avatar;
