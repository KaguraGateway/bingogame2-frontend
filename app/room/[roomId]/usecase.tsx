import { SocketIOContext } from "@/context/socketio";
import { UserAuthSuccessSchema } from "@/schema/auth";
import { BingoCardType } from "@/schema/bingo";
import { useControllableState, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { parse } from "valibot";
import { BingoModalType, BingoModalTypes } from "./_components/BingoModal";
import { PrizeSpinResultSchema, PrizeSpinResultType } from "@/schema/prize";

export function useUserUseCase() {
    const { client } = useContext(SocketIOContext);
    const [bingoCard, setBingoCard] = useState<BingoCardType>([]);
    const accountModal = useDisclosure();
    const bingoModal = useDisclosure();
    const [activePrizeResult, setActivePrizeResult] = useControllableState<PrizeSpinResultType>({ defaultValue: null! });
    const [bingoModalType, setBingoModalType] = useControllableState<BingoModalType>({ defaultValue: BingoModalTypes.Bingo });

    const Register = (userName: string) => {
        client.emit("UserRegister", JSON.stringify({ userName: userName }));
    }
    const RequestPrizeSpin = () => {
        client.emit("RequestPrizeSpin", {});
    }

    useEffect(() => {
        accountModal.onOpen();
        const Auth = () => {
            if (sessionStorage.getItem("userId") != null) {
                client.emit("UserAuth", JSON.stringify({ userId: sessionStorage.getItem("userId") }))
            }
        }
        const handleConnect = () => {
            Auth();
        }
        const handleUserAuthSuccess = (obj: any) => {
            console.log(obj);
            const userAuthSuccess = parse(UserAuthSuccessSchema, obj);
            sessionStorage.setItem("userId", userAuthSuccess.UserId);
            setBingoCard(userAuthSuccess.BingoCard);
            accountModal.onClose();
        }
        const handleUpdateBingoCard = (obj: any) => {
            console.log(obj);
            const updateBingoCard = parse(UserAuthSuccessSchema, obj);
            setBingoCard(updateBingoCard.BingoCard);
        }
        const handleBingo = () => {
            setBingoModalType(BingoModalTypes.Bingo);
            bingoModal.onOpen();
        }
        const handleYourPrizeSpinTurn = () => {
            setBingoModalType(BingoModalTypes.BingoTurn);
            bingoModal.onOpen();
        }
        const handlePrizeSpinResult = (obj: any) => {
            console.log(obj);
            const prizeSpinResult = parse(PrizeSpinResultSchema, obj);
            setActivePrizeResult(prizeSpinResult);
            setBingoModalType(BingoModalTypes.Result);
            bingoModal.onOpen();
        }

        client.on("connect", handleConnect);
        client.on("UserAuthSuccess", handleUserAuthSuccess);
        client.on("UpdateBingoCard", handleUpdateBingoCard);
        client.on("Bingo", handleBingo);
        client.on("YourPrizeSpinTurn", handleYourPrizeSpinTurn);
        client.on("PrizeSpinResult", handlePrizeSpinResult);
        return () => {
            client.off("connect", handleConnect);
            client.off("UserAuthSuccess", handleUserAuthSuccess);
            client.off("UpdateBingoCard", handleUpdateBingoCard);
            client.off("Bingo", handleBingo);
            client.off("YourPrizeSpinTurn", handleYourPrizeSpinTurn);
            client.off("PrizeSpinResult", handlePrizeSpinResult);
        }
    }, [accountModal, bingoModal, client, setActivePrizeResult, setBingoModalType]);

    return {
        bingoCard,
        Register,
        isAccountModalOpen: accountModal.isOpen,
        bingoModalType,
        activePrizeResult,
        setBingoModalType,
        isBingoModalOpen: bingoModal.isOpen,
        onBingoModalClose: bingoModal.onClose,
        RequestPrizeSpin,
    }
}