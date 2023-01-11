import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import theme from './theme';

interface Props {
    children: React.ReactNode;
};

const ThemeProviderComponent: React.FC<Props> = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeProviderComponent;