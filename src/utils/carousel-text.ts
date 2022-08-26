import fbjson from '@nickgdev/hellerui/lib/fontBlob.json';

export const carouselReviews = [
  ['Neil Degrasse Tyson', '"I don\'t get it."'],
  ['Matt Groening', '"I will not make any comment on this. Stop emailing me."'],
  ['Nick Galante (Creator)', '"I also don\'t fully get it."'],
  ["Mark Twain's Ghost", '"A portrait of non-canonical satire."']
] as const;

export type CarouselTextOptions = 'Caveat' | 'Pacifico';
