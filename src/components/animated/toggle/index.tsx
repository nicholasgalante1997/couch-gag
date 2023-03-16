import React from 'react';
import styled from 'styled-components';
import { forwardVarText, getSafeFontKey } from '../../../utils';
import { useThemeContext } from '../../../contexts';

const Wrapper = styled.div<{ themeMode?: 'light' | 'dark' }>`
    width: 110px; 
    height: 40px;
    border: 1px solid rgba(0,0,0,0.8);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px;
    background-color: ${props => props.themeMode === "dark" ? "white" : "none"};
`

const LightTab = styled.div<{ active: boolean }>`
    height: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    color: ${props => props.active ? '#fff' : '#000'};
    background-color: ${props => props.active ? 'black' : 'white'};
    font-size: 14px;
    line-height: 1.15;
    cursor: pointer;
`

const DarkTab = styled.div<{ active: boolean; }>`
    height: 100%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    color: ${props => props.active ? '#fff' : '#000'};
    background-color: ${props => props.active ? 'rgb(242, 7, 117)' : 'white'};
    font-size: 18px;
    line-height: 1.15;
    cursor: pointer;
`;

export function ToggleSwitch(props: { themeMode?: 'light' | 'dark', onSelect: (mode: "light" | "dark") => void }) {
    const { font } = useThemeContext();
    return (
        <Wrapper themeMode={props.themeMode}>
            <LightTab onClick={() => props.onSelect('light')} active={props.themeMode === "light"}>
                {forwardVarText(
                    getSafeFontKey(
                        font.google.family,
                    ),
                    '☼',
                    'span'
                )}
            </LightTab>
            <DarkTab onClick={() => props.onSelect('dark')} active={props.themeMode === "dark"}>
                {forwardVarText(
                    getSafeFontKey(
                        font.google.family,
                    ),
                    '☽',
                    'span'
                )}
            </DarkTab>
        </Wrapper>
    );
}