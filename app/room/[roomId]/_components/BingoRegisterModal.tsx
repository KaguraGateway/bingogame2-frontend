"use client"

import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalContent, ModalOverlay, Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";

import LogoSvg2 from "@/public/logo2.svg";

type BingoAccountModalBaseProps = {
    isOpen: boolean
    submit: (name: string) => void
}

export function BingoRegisterModal(props: BingoAccountModalBaseProps) {
    const [name, setName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        props.submit(name);
    };

    return (
        <Modal isOpen={props.isOpen} onClose={() => { }}>
            <ModalOverlay />
            <ModalContent mx="1rem">
                <ModalBody>
                    <Stack m="1rem 0" spacing={8}>
                        <Center h="5em" >
                            <svg width="300" viewBox="0 0 1035 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1016.66 96.0476C1012.84 116.831 1005.5 134.364 994.658 148.645C983.825 162.865 970.75 173.652 955.434 181.005C940.128 188.298 923.887 191.944 906.709 191.944C889.408 191.944 874.451 188.267 861.839 180.914C849.3 173.5 840.228 162.683 834.625 148.462C829.095 134.181 828.23 116.71 832.03 96.0476C835.852 75.264 843.149 57.7621 853.92 43.5417C864.764 29.2606 877.808 18.4737 893.052 11.1813C908.369 3.828 924.678 0.151367 941.979 0.151367C959.156 0.151367 974.051 3.828 986.663 11.1813C999.287 18.4737 1008.39 29.2606 1013.99 43.5417C1019.59 57.7621 1020.48 75.264 1016.66 96.0476ZM963.642 96.0476C965.698 84.8658 965.917 75.4463 964.297 67.7892C962.751 60.0713 959.405 54.2373 954.262 50.2872C949.191 46.2764 942.392 44.2709 933.865 44.2709C925.338 44.2709 917.771 46.2764 911.163 50.2872C904.629 54.2373 899.138 60.0713 894.691 67.7892C890.317 75.4463 887.102 84.8658 885.046 96.0476C882.989 107.229 882.734 116.679 884.281 124.397C885.901 132.054 889.246 137.888 894.316 141.899C899.46 145.849 906.295 147.824 914.822 147.824C923.349 147.824 930.88 145.849 937.415 141.899C944.022 137.888 949.513 132.054 953.887 124.397C958.334 116.679 961.586 107.229 963.642 96.0476Z" fill="#00ACD7" />
                                <path d="M683.978 2.7041L649.647 189.392H606.642L556.092 91.3079H554.98L536.943 189.392H485.41L519.741 2.7041H563.488L612.993 100.424H614.476L632.446 2.7041H683.978Z" fill="#2C7A7B" />
                                <path d="M503.149 2.7041L468.818 189.392H417.285L451.616 2.7041H503.149Z" fill="#2C7A7B" />
                                <path d="M261.215 189.392L295.546 2.7041H377.85C392.309 2.7041 404.099 4.61838 413.219 8.44695C422.402 12.2755 428.853 17.6841 432.573 24.6727C436.354 31.6614 437.373 39.8958 435.63 49.376C434.367 56.2431 431.671 62.5025 427.542 68.1542C423.475 73.8059 418.34 78.546 412.137 82.3746C405.945 86.1424 399.038 88.7555 391.417 90.214L391.082 92.0371C399.182 92.341 406.222 94.3768 412.203 98.1446C418.194 101.852 422.564 106.987 425.312 113.55C428.07 120.052 428.639 127.71 427.019 136.521C425.142 146.731 420.752 155.816 413.851 163.777C407.011 171.738 398.198 177.997 387.412 182.555C376.625 187.113 364.343 189.392 350.563 189.392H261.215ZM320.191 148.919H344.289C352.939 148.919 359.718 147.339 364.624 144.178C369.542 140.958 372.576 136.217 373.727 129.958C374.532 125.583 374.194 121.876 372.714 118.837C371.234 115.798 368.754 113.489 365.276 111.909C361.859 110.329 357.524 109.539 352.272 109.539H327.433L320.191 148.919ZM333.199 78.1814H354.331C358.842 78.1814 362.956 77.4825 366.673 76.0848C370.39 74.6871 373.447 72.6816 375.843 70.0685C378.312 67.3946 379.899 64.1433 380.603 60.3148C381.664 54.5416 380.374 50.1357 376.731 47.0972C373.099 43.9978 368.07 42.4482 361.644 42.4482H339.77L333.199 78.1814Z" fill="#2C7A7B" />
                                <path d="M794.193 64.3253C793.982 61.1044 793.235 58.2786 791.952 55.8478C790.68 53.3562 788.903 51.2596 786.621 49.558C784.412 47.7956 781.686 46.4891 778.444 45.6383C775.275 44.7267 771.682 44.2709 767.666 44.2709C759.015 44.2709 751.257 46.3068 744.391 50.3784C737.587 54.45 731.874 60.3144 727.253 67.9715C722.694 75.6287 719.419 84.8658 717.43 95.683C715.419 106.622 715.211 115.98 716.809 123.759C718.406 131.538 721.821 137.493 727.055 141.626C732.289 145.758 739.354 147.824 748.252 147.824C756.1 147.824 762.825 146.7 768.429 144.452C774.095 142.203 778.605 139.013 781.96 134.88C785.315 130.748 787.507 125.886 788.535 120.295L797.265 121.207H753.889L760.527 85.1089H844.684L839.924 110.997C836.795 128.013 830.442 142.568 820.865 154.661C811.361 166.694 799.59 175.931 785.553 182.373C771.589 188.753 756.328 191.944 739.768 191.944C721.293 191.944 705.783 188.085 693.238 180.367C680.692 172.649 671.809 161.65 666.588 147.369C661.429 133.087 660.66 116.102 664.281 96.4123C667.119 80.9765 672.012 67.3031 678.961 55.392C685.971 43.4809 694.493 33.4234 704.529 25.2193C714.576 16.9545 725.577 10.7255 737.532 6.53229C749.498 2.27834 761.877 0.151367 774.667 0.151367C785.913 0.151367 796.065 1.73141 805.123 4.89149C814.254 7.99079 821.996 12.4271 828.349 18.2003C834.775 23.9127 839.554 30.6887 842.684 38.5281C845.815 46.3675 847.014 54.9666 846.282 64.3253H794.193Z" fill="#00ACD7" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.083 27.9307C85.477 30.5437 82.799 34.8517 81.132 37.5047C75.435 46.5717 65.6541 45.6477 170.438 45.9357C239.03 46.1247 263.69 45.8917 264.708 45.0467C266.246 43.7707 275.047 26.1367 275.047 24.3317C275.047 23.4717 251.62 23.1807 182.525 23.1807H90.003L87.083 27.9307ZM14.692 84.0507C13.672 84.4517 10.015 89.4827 6.56404 95.2307L0.290039 105.681L121.379 105.935C227.492 106.158 242.652 106.005 243.956 104.701C246.091 102.565 250.037 86.0137 248.788 84.4307C248.009 83.4427 223.552 83.1957 132.175 83.2507C68.579 83.2897 15.712 83.6497 14.692 84.0507ZM132.797 145.431C130.647 147.077 122.721 165.278 123.75 166.206C124.188 166.602 149.385 167.2 179.743 167.536C226.667 168.054 235.153 167.933 236.36 166.726C237.93 165.155 239.609 148.808 238.497 145.911C237.879 144.302 234.226 144.181 186.131 144.181C146.307 144.181 134.054 144.468 132.797 145.431Z" fill="#2C7A7B" />
                            </svg>
                        </Center>
                        <Box>
                            <form onSubmit={handleSubmit}>
                                <VStack>
                                    <FormControl>
                                        <FormLabel>ユーザー名</FormLabel>
                                        <Input placeholder="ビンゴ太郎" value={name} onChange={handleChangeName} />
                                        <FormHelperText>みんなにわかりやすい名前を入力してください</FormHelperText>
                                        <FormHelperText>本名である必要はありません</FormHelperText>
                                    </FormControl>
                                    <Button color="blackAlpha.900" bg="gray.100" size="lg" minW="9em" type="submit" isLoading={isLoading}>登録</Button>
                                </VStack>
                            </form>
                        </Box>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
