import { createContext, useContext } from 'react';
import { Breakpoint, BREAKPOINT_DESKTOP_SMALL } from '../../styles/breakpoints';

const BreakpointContext = createContext<Breakpoint>(BREAKPOINT_DESKTOP_SMALL);
export const useBpContext = () => useContext(BreakpointContext);
export const BreakpointProvider = BreakpointContext.Provider;
