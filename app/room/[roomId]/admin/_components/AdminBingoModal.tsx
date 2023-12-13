import React from "react";
import { Button, Flex, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { Modal } from "@chakra-ui/react";
import { ModalOverlay } from "@chakra-ui/react";
import { ModalContent } from "@chakra-ui/react";
import { ModalBody } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ReactIcon } from "@chakra-ui/icons";
import { NumberIcon } from "@/ui/NumberIcon";
import { Prize } from "../usecase";
import { PrizeSpinResultType } from "@/schema/prize";
import { UserBingoType } from "@/schema/admin";

export const AdminBingoModalTypes = {
    Bingo: 1,
    Result: 2
} as const;
export type AdminBingoModalTypes = typeof AdminBingoModalTypes[keyof typeof AdminBingoModalTypes];

type AdminBingoModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    type: AdminBingoModalTypes;
    setBingoModalType: (type: AdminBingoModalTypes) => void;
    adminBingoMessage: UserBingoType | null;
    prizeResult: PrizeSpinResultType | null;
    prizes: Array<Prize>;
}

function AdminBingoModalBingo(props: AdminBingoModalProps) {
    const handleClickBingoDraw = () => {
        props.setBingoModalType(AdminBingoModalTypes.Result)
    };

    return (
        <VStack>
            <Text fontSize="4xl" fontWeight="bold">{props.adminBingoMessage?.UserName}さん、BINGO!!</Text>
            <Text fontSize="4xl" fontWeight="bold">おめでとうございます！！</Text>
            <Text color="gray.500" fontSize="xl">景品抽選を待機しています</Text>
            <Grid w="full" templateColumns="repeat(12, 1fr)">
                <GridItem>
                    <Flex flexDir="column" alignItems="center" gap="2em">
                        <Text fontSize="10.5em" fontWeight="bold" lineHeight={1} color="orange.500">00</Text>
                        <Button rightIcon={<ReactIcon />} w="128px" size="lg" bg="orange.500" color="white" onClick={handleClickBingoDraw}>Spin</Button>
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} />
                <GridItem colSpan={10}>
                    <Flex maxW="full" flexWrap="wrap" minH="full" p="1.5em" flexDir="row" gap="10px" bgColor="white" borderRadius="12px">
                        {
                            props.prizes.map((prize, index) =>
                                <NumberIcon key={index} bg={prize.isHit ? "orange.500" : "gray.100"} color={prize.isHit ? "white" : "gray.700"} w="3em" h="3em">{prize.prizeNumber}</NumberIcon>
                            )
                        }
                    </Flex>
                </GridItem>
            </Grid>
        </VStack>
    )
}

function AdminBingoModalResult(props: AdminBingoModalProps) {
    const handleClickClose = () => {
        props.onClose();
    };

    return (
        <VStack>
            <Text fontSize="4xl" fontWeight="bold">{props.adminBingoMessage?.UserName}さん、おめでとうございます!!</Text>
            <NumberIcon bg="orange.500" color="gray.200" fontSize="6em">{props.prizeResult?.PrizeNumber}</NumberIcon>
            <Text fontSize="4xl" fontWeight="bold">表示されている番号の景品と引き換えてください</Text>
            <Text color="gray.500" fontSize="xl">手元のビンゴカードにも景品番号が表示されています</Text>
            <Box mt="8rem">
                <Button size="lg" bgColor="orange.500" color="white" fontWeight="600" onClick={handleClickClose}>閉じる</Button>
            </Box>
        </VStack>
    )
}

function AdminBingoModalRouter(props: AdminBingoModalProps) {
    switch (props.type) {
        case AdminBingoModalTypes.Bingo:
            return <AdminBingoModalBingo {...props} />
        case AdminBingoModalTypes.Result:
            return <AdminBingoModalResult {...props} />
    }
}

export function AdminBingoModal(props: AdminBingoModalProps) {
    return (
        <Modal isOpen={props.isOpen} onClose={() => { }} size="6xl">
            <ModalOverlay />
            <ModalContent mx="1rem" bgColor="gray.100">
                <ModalBody p="2em 0">
                    <Flex justifyContent="center">
                        <VStack w="85%" >
                            <AdminBingoModalRouter {...props} />
                        </VStack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}