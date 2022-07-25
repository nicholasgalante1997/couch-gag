import { Container, _heller_base } from '@nickgdev/hellerui';
import { useNavigate } from 'react-router';
import { forwardVarText } from '../../utils';
import { Hoverable } from '../Hoverable';
import navJson from './data/nav.json';

export function LinkBar() {
  const navigate = useNavigate();
  const forwardNavEventDest = (d: string) => navigate(d);
  return (
    <Container customStyles={{ display: 'flex', flexDirection: 'row' }}>
      {navJson.links.map((l) => (
        <Hoverable>
          {forwardVarText('Poppins - v20', l.plainText, 'b', {
            onClick: () => forwardNavEventDest(l.localHref),
            customStyles: {
              color: 'inherit',
              marginLeft: '0.25rem',
              paddingRight: '0.25rem',
              fontSize: 'inherit'
            }
          })}
        </Hoverable>
      ))}
    </Container>
  );
}
