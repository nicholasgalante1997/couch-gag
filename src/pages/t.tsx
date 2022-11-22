import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { _coolors_extension_pack_} from '@nickgdev/couch-gag-common-lib';
import { useThemeContext } from '../contexts';
import { forwardVarText } from '../utils';

function ThemeSelectionPage () {
    return (
        <Container asGridParent>
            <Container asGridChild colSpan={5}>
                theme selection half
            </Container>
            <Container asGridChild colSpan={7}>
                theme mockup half
            </Container>
        </Container>
    );
}

export default ThemeSelectionPage;