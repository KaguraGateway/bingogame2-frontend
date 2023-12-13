"use client";

import { Header } from "@/ui/Header";
import { Alert, AlertIcon, Box, Center, Container, Text } from "@chakra-ui/react";
import { BingoRegisterModal } from "./_components/BingoRegisterModal";
import { useUserUseCase } from "./usecase";
import { BingoCard } from "@/app/room/[roomId]/_components/BingoCard";
import { BingoModal } from "@/app/room/[roomId]/_components/BingoModal";

export default function Page() {
    const { bingoCard, Register, isAccountModalOpen, bingoModalType, activePrizeResult, setBingoModalType, isBingoModalOpen, onBingoModalClose, RequestPrizeSpin } = useUserUseCase();

    return (
        <>
            <Header />
            <Box as="main">
                <Container>
                    <Center flexDirection="column">
                        <Box p="24px">
                            <Text fontSize="lg" fontWeight="bold">ビンゴカード</Text>
                        </Box>
                        <BingoCard bingoCard={bingoCard} />
                        <Box w="full" mt="12px">
                            <Alert status="info" bg="#E2E8F0" w="full" borderRadius="6px">
                                <AlertIcon color="#718096" />
                                参加中：*人
                            </Alert>
                        </Box>
                        <BingoModal type={bingoModalType} requestPrizeSpin={RequestPrizeSpin} prizeResult={activePrizeResult} isOpen={isBingoModalOpen} onClose={onBingoModalClose} setBingoModalType={setBingoModalType} />
                    </Center>
                </Container>
            </Box>
            <BingoRegisterModal isOpen={isAccountModalOpen} submit={Register} />
        </>
    );
}