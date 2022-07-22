import matter from 'front-matter';

export function parseContent(s?: string) {
  if (typeof s === 'undefined') return null;
  return matter(s);
}
