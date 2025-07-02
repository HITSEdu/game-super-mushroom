import {useMemo} from 'react';

export const useClouds = (isLoaded: boolean) => {
  return useMemo(() => {
    if (!isLoaded) return [];

    return Array.from({length: 5}).map((_, i) => ({
      id: `cloud-${i}`,
      x: Math.random() * window.innerWidth,
      y: 50 + Math.random() * 100,
      speed: 4,
      textureString: `cloud${1 + Math.floor(Math.random() * 7)}`,
    }));
  }, [isLoaded]);
};