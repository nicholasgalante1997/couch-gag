import matter from 'front-matter';

export function parseContent(s: string) {
  return matter(s);
}
