import { _heller_base } from '@nickgdev/hellerui';
import { useNavigate } from 'react-router';
import { forwardVarText } from '../../utils';
import { Hoverable } from '../Hoverable';

export function Title() {
  const navigate = useNavigate();
  return (
    <Hoverable
      from={{ fontSize: '1.15rem' }}
      to={{ color: _heller_base.colors.dunbar.lightCyan, fontSize: '1.25rem' }}
    >
      {forwardVarText('Poppins - v20', 'couch gag v0', 'h5', {
        onClick: () => navigate('/')
      })}
    </Hoverable>
  );
}
