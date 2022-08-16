import fontJson from '@nickgdev/hellerui/lib/fontBlob.json';

export function getSafeFontKey(s: string): keyof typeof fontJson {
  return (
    (Object.keys(fontJson).filter((k) =>
      k.includes(s)
    )[0] as keyof typeof fontJson) ?? 'Poppins - v20'
  );
}
