"use client";

import React, { useContext } from 'react';
import { Flex } from "@chakra-ui/react";
import { BingoNumber } from '@/ui/BingoNumber';
import { BingoCardType } from '@/schema/bingo';

type BingoCardProps = {
    bingoCard: BingoCardType;
}

export function BingoCard(props: BingoCardProps) {
    const bingoItems = props.bingoCard.map((bingoRecord, index1) => {
        return (
            <Flex justifyContent="space-between" gap="8px" key={index1}>
                {bingoRecord.map((bingoRow, index2) => {
                    if (index1 === 2 && index2 === 2) {
                        return <BingoNumber type="center" key={index2} />
                    }
                    return <BingoNumber type={bingoRow.IsMarked ? "hitNumber" : "normalNumber"} key={index2} bingoNumber={bingoRow.BingoNumber} />
                })}
            </Flex>
        )
    });

    return (
        <Flex w="full" bg="#fff" borderRadius="10px" p="21px" gap="8px" flexDirection="column">{/* bingoItems */}</Flex>
    )
}