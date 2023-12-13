import { BingoCard } from "@/ui/BingoCard";
import { BingoModal, BingoModalType, BingoModalTypes } from "@/ui/BingoModal";
import { Box, Center, useDisclosure, Text, Alert, AlertIcon, useControllableState } from "@chakra-ui/react";
//@ts-ignore
import useSound from 'use-sound'

export function BingoContent() {
  // const {socketio} = useContext(SocketIOContext);
  // const {name} = useContext(BingoContext);
  const bingoModal = useDisclosure();
  const [ bingoModalType, setBingoModalType ] = useControllableState<BingoModalType>({defaultValue: BingoModalTypes.Bingo});
  // const [ activePrizeResult, setActivePrizeResult ] = useControllableState<PrizeResultMessage>({defaultValue: null!});
  const [play] = useSound("../public/Decision.wav");


  return (
      <Center flexDirection="column">
          <Box p="24px">
              <Text fontSize="lg" fontWeight="bold">{"山口" /*name*/} さんのビンゴカード</Text>
          </Box>
          <BingoCard />
          <Box w="full" mt="12px">
              <Alert status="info" bg="#E2E8F0" w="full" borderRadius="6px">
                  <AlertIcon color="#718096" />
                  参加中：*人
              </Alert>
          </Box>
          <BingoModal type={bingoModalType} prizeResult={/*activePrizeResult*/"10"} isOpen={bingoModal.isOpen} onClose={bingoModal.onClose} onOpen={bingoModal.onOpen} setBingoModalType={setBingoModalType} />
      </Center>
  );
}
