import { Spinner } from './index';
import { render } from '@testing-library/react';

describe('components/animated/spinner', () => {
    test('spinner/default', () => {
        const { queryByTestId } = render(<Spinner data-testid="spinner-test" />);
        const spinner = queryByTestId('spinner-test');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toMatchSnapshot();
    });
});