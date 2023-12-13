'use client';

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "rgb(237, 237, 237)",
            },
            html: {
                height: "100%"
            }
        }
    }
})

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
    );
}
