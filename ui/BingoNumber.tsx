"use client";

import React from 'react';
import { NumberIcon, NumberIconProps } from "@/ui/NumberIcon";

type BingoNumberProps = {
    type: "normalNumber" | "hitNumber";
    bingoNumber: number;
}
type BingoCenterProps = {
    type: "center";
}
type Props = BingoNumberProps | BingoCenterProps;

const isBingoCenter = (props: Props): props is BingoCenterProps => props.type === "center";

export function BingoNumber(props: Props) {
    return (
        <NumberIcon bg={props.type === "hitNumber" ? "#319795" : props.type === "center" ? "#D69E2E" : "#EDF2F7"}
          color={props.type !== "normalNumber" ? "#fff" : "#000"}>
            {
                isBingoCenter(props) ? "＊" : props.bingoNumber
            }
        </NumberIcon>
    )
};