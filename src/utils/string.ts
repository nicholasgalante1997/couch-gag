import { log } from '@nickgdev/couch-gag-common-lib';

export function replaceStringVariables(
  str: string,
  dict: Record<string, string>
): string {
  let mutStr = str;
  try {
    for (const key in dict) {
      mutStr = mutStr.replace(`{{ ${key} }}`, dict[key]);
    }
    if (mutStr.includes('{{') && mutStr.includes('}}')) {
      throw new Error(
        'STRING_EXCEPTION#replaceStringVariables(), unsatisfied variable critera. string still contains unparsed variables.'
      );
    } else {
      return mutStr;
    }
  } catch (e: any) {
    log('error', (e as Error).message);
    return '';
  }
}
