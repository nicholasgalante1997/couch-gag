import { LinkBar } from './LinkBar';
import { Title } from './MainTitle';
import { NavContainer } from './NavContainer';

export function Nav() {
  return (
    <NavContainer>
      <Title />
      <LinkBar />
    </NavContainer>
  );
}
