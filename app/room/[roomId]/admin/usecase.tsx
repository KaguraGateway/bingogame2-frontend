'use client';

import { SocketIOContext } from "@/context/socketio";
import { useControllableState, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { AdminBingoModalTypes } from "./_components/AdminBingoModal";
import { parse } from "valibot";
import { AdminInitSchema, BingoSpinResultSchema, UserBingoSchema, UserBingoType } from "@/schema/admin";
//@ts-ignore
import useSound from "use-sound";
import { PrizeSpinResultSchema, PrizeSpinResultType } from "@/schema/prize";

export type Prize = {
    prizeNumber: number;
    isHit: boolean;
}

export function useAdminUseCase() {
    const { client } = useContext(SocketIOContext);
    const [hitNumber, setHitNumber] = useControllableState<number>({ defaultValue: 0 });
    const adminBingoModal = useDisclosure();
    const [adminBingoModalType, setAdminBingoModalType] = useControllableState<AdminBingoModalTypes>({ defaultValue: AdminBingoModalTypes.Bingo });
    const [spinState, setSpinState] = useControllableState<boolean>({ defaultValue: false });
    const [prizeNum, setPrizeNum] = useState<number>(0);
    const [exchangedPrizes, setExchangedPrizes] = useState<number[]>([]);
    const [activeBingo, setActiveBingo] = useControllableState<UserBingoType>({ defaultValue: null! });
    const [activePrizeResult, setActivePrizeResult] = useControllableState<PrizeSpinResultType>({ defaultValue: null! });
    const [bingoNumbers, setBingoNumbers] = useState<number[]>([]);
    const [play] = useSound("/bingo_lottery.mp3");

    const prizes = useMemo(() => {
        const prizes = (new Array(prizeNum)).fill(0).map((_, index) => index + 1);
        return prizes.map(prize => {
            return {
                prizeNumber: prize,
                isHit: exchangedPrizes.includes(prize)
            }
        });
    }, [exchangedPrizes, prizeNum]);

    useEffect(() => {
        const handleConnect = () => {
            client.emit("RequestAdminInit", {});
        };
        const handleAdminInit = (obj: any) => {
            console.log(obj);
            const adminInit = parse(AdminInitSchema, obj);
            setBingoNumbers(adminInit.BingoNumbers);
            setPrizeNum(adminInit.PrizeNum);
            setExchangedPrizes(adminInit.ExchangedPrizes);
        }
        const handleBingoSpinResult = (obj: any) => {
            const spinResult = parse(BingoSpinResultSchema, obj);
            setSpinState(false);
            setHitNumber(spinResult.BingoNumber);
            setBingoNumbers([...bingoNumbers, spinResult.BingoNumber]);
        }
        const handleUserBingo = (obj: any) => {
            const userBingo = parse(UserBingoSchema, obj);
            setActiveBingo(userBingo);
            adminBingoModal.onOpen();
        }
        const handlePrizeSpingResult = (obj: any) => {
            const prizeResult = parse(PrizeSpinResultSchema, obj);
            setActivePrizeResult(prizeResult);
            setAdminBingoModalType(AdminBingoModalTypes.Result);
        }
        client.on("AdminInit", handleAdminInit);
        client.on("BingoSpinResult", handleBingoSpinResult);
        client.on("UserBingo", handleUserBingo);
        client.on("PrizeSpinResult", handlePrizeSpingResult);
        client.on("connect", handleConnect);
        return () => {
            client.off("AdminInit", handleAdminInit);
            client.off("BingoSpinResult", handleBingoSpinResult);
            client.off("UserBingo", handleUserBingo);
            client.off("PrizeSpinResult", handlePrizeSpingResult);
            client.off("connect", handleConnect);
        }
    }, [adminBingoModal, bingoNumbers, client, setActiveBingo, setActivePrizeResult, setAdminBingoModalType, setHitNumber, setSpinState]);


    const StartBingoSpin = () => {
        setSpinState(true);
        play();

        let count = 0;
        const interval = setInterval(() => {
            if (count > 20) {
                clearInterval(interval);
                client.emit("StartBingoSpin", {});
            }
            let num = Math.floor((Math.random() * 75) + 1);
            setHitNumber(num);
            count++;
        }, 100);
    }

    return {
        hitNumber,
        bingoNumbers,
        adminBingoModal,
        adminBingoModalType,
        spinState,
        prizes,
        activePrizeResult,
        activeBingo,
        StartBingoSpin,
        setAdminBingoModalType,
    }
}