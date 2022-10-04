import { formatQueryParams } from './query-params';

describe('query params utils', () => {
    test('formatQueryParams happy path', () => {
        const url = 'www.stub.com/';
        const mockQPs = { foo: 'bar' };
        expect(formatQueryParams(url, mockQPs)).toBe(url+'?foo=bar');
    })
    test('formatQueryParams with empty object', () => {
        const url = 'www.stub.com/';
        expect(formatQueryParams(url, {})).toBe(url);
    })
})