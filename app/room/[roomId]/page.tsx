"use client";

import { Header } from "@/ui/Header";
import { BingoAccountModal } from "@/ui/BingoAccountModal";
import { Box, Container } from "@chakra-ui/react";
import { BingoContent } from "./_components/BingoContent";

export default function Page() {
    return (
        <>
        {/*<SocketIOProvider>*/}
            {/* <BingoProvider> */}
                <Header />
                <Box as="main">
                    <Container>
                        <BingoContent />
                    </Container>
                </Box>
                <BingoAccountModal />
            {/* </BingoProvider> */}
        {/*</SocketIOProvider> */}
        </>
    );
}