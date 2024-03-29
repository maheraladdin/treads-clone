import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {mode} from "@chakra-ui/theme-tools"
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const styles = {
    global: (props: any) => ({
        body: {
            color: mode("gray.800", "whiteAlpha.900")(props),
            bg: mode("gray.100", "#101010")(props),
        },
    }),
};

const config = {
    initialColorMode: "system",
    useSystemColorMode: true,
};

const colors = {
    gray: {
        light: "#616161",
        dark: "#1e1e1e",
    },
};

const theme = extendTheme({config, styles, colors});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <App/>
            </DevSupport>
        </ChakraProvider>
    </React.StrictMode>,
)
