import React from 'react';
import styled from 'styled-components';
import { getSafeFontKey } from '../../../utils';
import { useThemeContext } from '../../../contexts';
import { Font } from '../../../components';

const Wrapper = styled.div<{ themeMode?: 'light' | 'dark' }>`
  width: 90px;
  height: 30px;
  border: 1px solid ${props => props.themeMode === 'dark' ? 'white' : 'black'};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px;
  background-color: ${(props) =>
    props.themeMode === 'dark' ? 'white' : 'none'};
`;

const LightTab = styled.div<{ active: boolean }>`
  height: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: ${(props) => (props.active ? '#fff' : '#000')};
  background-color: ${(props) => (props.active ? 'black' : 'white')};
  font-size: 10px;
  line-height: 1.15;
  cursor: pointer;
`;

const DarkTab = styled.div<{ active: boolean }>`
  height: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: ${(props) => (props.active ? '#fff' : '#000')};
  background-color: ${(props) => (props.active ? 'rgb(242, 7, 117)' : 'white')};
  font-size: 10px;
  line-height: 1.15;
  cursor: pointer;
`;

export type ToggleSwitchProps = {
  themeMode?: 'light' | 'dark';
  onSelect: (mode: 'light' | 'dark') => void;
};

export function ToggleSwitch(props: ToggleSwitchProps) {
  const { font } = useThemeContext();
  return (
    <Wrapper themeMode={props.themeMode}>
      <LightTab
        onClick={() => props.onSelect('light')}
        active={props.themeMode === 'light'}
      >
        <Font family={getSafeFontKey(font.google.family)} impl="span">
          ☼
        </Font>
      </LightTab>
      <DarkTab
        onClick={() => props.onSelect('dark')}
        active={props.themeMode === 'dark'}
      >
        <Font family={getSafeFontKey(font.google.family)} impl="span">
          ☽
        </Font>
      </DarkTab>
    </Wrapper>
  );
}
