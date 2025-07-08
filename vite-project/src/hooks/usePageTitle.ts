// src/hooks/usePageTitle.ts
import { useEffect } from 'react';

export default function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Max Bikers`;
  }, [title]);
}
