'use client';

import { Box, Button, Center, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { HeaderAdmin } from "./_components/HeaderAdmin";
import { BingoNumber } from "@/ui/BingoNumber";
import { ReactIcon } from "@chakra-ui/icons";
import { AdminBingoModal } from "./_components/AdminBingoModal";
import { useAdminUseCase } from "./usecase";

export default function Page() {
    const { hitNumber, bingoNumbers, adminBingoModal, adminBingoModalType, spinState, prizes, activePrizeResult, activeBingo, StartBingoSpin, setAdminBingoModalType } = useAdminUseCase();

    return (
        <>
            <HeaderAdmin />
            <Box as="main" mt="24px">
                <Container maxW="container.xl">
                    <Center flexDirection="column">
                        <Text fontSize="10.5em" fontWeight="700" lineHeight={1} color="teal.600">{hitNumber}</Text>
                        <Grid w="full" minH="340px" mt="24px" templateColumns="repeat(12, 1fr)">
                            <GridItem colSpan={11}>
                                <Flex maxW="full" flexWrap="wrap" minH="full" p="1.5em" flexDir="row" gap="10px" bgColor="white" border="1px solid" borderColor="gray.200" borderRadius="12px">
                                    {[...bingoNumbers].reverse().map((bingoNumber, index) => <BingoNumber key={index} type="hitNumber" bingoNumber={bingoNumber} />
                                    )}
                                </Flex>
                            </GridItem>
                            <GridItem colSpan={1} ml="1em">
                                <Button rightIcon={<ReactIcon />} size="lg" w="full" bg="teal.500" color="white" onClick={StartBingoSpin} isLoading={spinState}>Spin</Button>
                            </GridItem>
                        </Grid>
                        <AdminBingoModal isOpen={adminBingoModal.isOpen} prizes={prizes} prizeResult={activePrizeResult} adminBingoMessage={activeBingo} onClose={adminBingoModal.onClose} onOpen={adminBingoModal.onOpen} type={adminBingoModalType} setBingoModalType={setAdminBingoModalType} />
                    </Center>
                </Container>
            </Box>
        </>
    );
}
