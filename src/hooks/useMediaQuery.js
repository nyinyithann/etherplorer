import { useEffect, useState } from 'react';

const matchMedia = (query) => window.matchMedia(query).matches;

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState((_) => matchMedia(query));
  const handleChange = (_) => setMatches((__) => matchMedia(query));
  useEffect(() => {
    setMatches((_) => matchMedia(query));
    window.addEventListener('resize', handleChange);
    return () => window.removeEventListener('resize', handleChange);
  }, [query]);
  return matches;
}
