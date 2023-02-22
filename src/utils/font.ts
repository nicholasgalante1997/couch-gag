import fontJson from '@nickgdev/hellerui/lib/fontBlob.json';

export function getSafeFontKey(s: string): keyof typeof fontJson {
  return (
    (Object.keys(fontJson).filter((k) =>
      k.includes(s)
    )[0] as keyof typeof fontJson) ?? 'Poppins - v20'
  );
}

export function parseVisualJsonString(str: string): 'p' | `h${1 | 2 | 3 | 4 | 5 | 6}` {
  if (str.includes('#')) {
    let count = 0;
    for (const char of str) {
      if (char === "#") {
        count++;
      }
    }
    if (count > 6) {
      return 'h6';
    } else if (count > 0 && count <= 6) {
      return `h${count as 1 | 2 | 3 | 4 | 5 | 6}`;
    }
  }
  return 'p';
}

export function parseBoldOrItalicVisualJson(str: string) {
  const firstChar = str.charAt(0);
  const lastChar = str.charAt(str.length - 1);
  if (firstChar === '_' && lastChar == '_') {
    return {
      fontStyle: 'italic'
    };
  } else if (firstChar === '*' && lastChar === '*') {
    return {
      fontWeight: 'bold'
    };
  }
  return { fontStyle: 'normal' };
}


export function purgeMarkdownFromJson(str: string){
  return str.replace(/(#|_|\*)/g, '');
}