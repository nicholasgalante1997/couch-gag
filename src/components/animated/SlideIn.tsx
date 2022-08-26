import { Container } from "@nickgdev/hellerui";
import { ContainerProps } from "@nickgdev/hellerui/lib/components/Container/types";

import '../css/SlideIn.css';

type SlideProps = {
    dir: 'left' | 'right';
    fast?: boolean;
    children: JSX.Element;
    id?: string;
} & ContainerProps;

function reduceSlideClassName(dir: 'left' | 'right', fast?: boolean) {
    switch(dir) {
        case 'left':
            return fast ? 'left-slide-in-fast' : 'left-slide-in';
        default:
            return fast ? 'right-slide-in-fast' : 'right-slide-in';
    }
}

export default ({dir, children, fast = false, ...rest}: SlideProps) => (
    <Container {...rest} className={reduceSlideClassName(dir, fast)}>
        {children}
    </Container>
);