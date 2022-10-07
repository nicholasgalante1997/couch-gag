import { WonderBall } from './styles';
import {  WonderBallSize } from './types';
import { render } from '@testing-library/react';

describe('wonderball component', () => {
    test('component - small', () => {
        const SELECTOR = 'wonderball-sm' as const;
        const { queryByTestId } = render(<WonderBall color="purple" size={WonderBallSize.SMALL} data-testid={SELECTOR} />);
        const wbs = queryByTestId(SELECTOR);
        expect(wbs).toBeInTheDocument();
        expect(wbs).toHaveStyle({
            'min-height': '1rem',
            'height': '1rem',
            'min-width': '1rem',
            'width': '1rem',
            'border-radius': '0.5rem'
        });
    });
    test('component - md', () => {
        const SELECTOR = 'wonderball-md' as const;
        const { queryByTestId } = render(<WonderBall color="purple" size={WonderBallSize.MED} data-testid={SELECTOR} />);
        const wbs = queryByTestId(SELECTOR);
        expect(wbs).toBeInTheDocument();
        expect(wbs).toHaveStyle({
            'min-height': '2rem',
            'height': '2rem',
            'min-width': '2rem',
            'width': '2rem',
            'border-radius': '1rem'
        });
    });
    test('component - lg', () => {
        const SELECTOR = 'wonderball-lg' as const;
        const { queryByTestId } = render(<WonderBall color="purple" size={WonderBallSize.LG} data-testid={SELECTOR} />);
        const wbs = queryByTestId(SELECTOR);
        expect(wbs).toBeInTheDocument();
        expect(wbs).toHaveStyle({
            'min-height': '3rem',
            'height': '3rem',
            'min-width': '3rem',
            'width': '3rem',
            'border-radius': '1.5rem'
        });
    });
    test('component - custom color', () => {
        const SELECTOR = 'wonderball-cc' as const;
        const { queryByTestId } = render(<WonderBall color="#B4DA55" size={WonderBallSize.MED} data-testid={SELECTOR} />);
        const wbs = queryByTestId(SELECTOR);
        expect(wbs).toBeInTheDocument();
        expect(wbs).toHaveStyle({
           'background': '#B4DA55'
        });
    });
    test('component - custom color gradient', () => {
        const SELECTOR = 'wonderball-ccg' as const;
        const { queryByTestId } = render(<WonderBall color="linear-gradient(to bottom right, red, blue)" size={WonderBallSize.MED} data-testid={SELECTOR} />);
        const wbs = queryByTestId(SELECTOR);
        expect(wbs).toBeInTheDocument();
        expect(wbs).toHaveStyle({
           'background': 'linear-gradient(to bottom right, red, blue)'
        });
    });
});
