"use client";

import React from 'react';
import { NumberIcon, NumberIconProps } from "@/ui/NumberIcon";
import { NumberButton } from './NumberButton';

type BingoNumberProps = {
    type: "normalNumber" | "hitNumber" | "tapNumber";
    bingoNumber: number;
}
type BingoCenterProps = {
    type: "center";
}
type Props = BingoNumberProps | BingoCenterProps;

const isBingoCenter = (props: Props): props is BingoCenterProps => props.type === "center";

export function BingoNumber(props: Props) {
  let bgColor: string = "";
  if(props.type === "tapNumber") {
    bgColor = "#319795";
  }
  else if(props.type === "normalNumber") {
    bgColor = "#EDF2F7"
  }
  else if(props.type === "center") {
    bgColor = "#D69E2E"
  }

    return (
      <>
        {
          props.type !== "hitNumber" ? 
          <NumberIcon bg={bgColor}
            color={props.type !== "normalNumber" ? "#fff" : "#000"}>
              {
                  isBingoCenter(props) ? "＊" : props.bingoNumber
              }
          </NumberIcon>
          :
          <NumberButton>          
              {props.bingoNumber}
          </NumberButton>
        }
      </>
    )
};