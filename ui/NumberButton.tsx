"use client";

import React from 'react';
import { Button, Flex, FlexProps } from "@chakra-ui/react";
import styles from './NumberIcon.module.scss';

export type NumberIconProps = {
    children: React.ReactNode;
} & FlexProps;

export function NumberButton(props: NumberIconProps) {
    return (
      <button onClick={OnClick} className={styles.kirakira__shiny}>
        {props.children}
      </button>
    )
};

function OnClick() {
  console.log("OnClick")
}