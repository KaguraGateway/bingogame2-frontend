"use client";

import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import LogoSvg from "@/public/logo2.svg";

export function Header() {
    return (
        <Box as="header" bg="#fff" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)" w="full" h="56px">
            <Container maxW="container.lg" h="full">
                <Flex justifyContent="center" alignItems="center" h="full">
                    <Box h="2em">
                        <LogoSvg width="150"/>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
};