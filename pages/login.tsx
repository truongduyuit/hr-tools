import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    Box,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'3xl'}>Sign in to your account</Heading>
                    <FormControl id="email">
                        <FormLabel>Phone Number</FormLabel>
                        <Input type="email" />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" />
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Link href='/signup'><Box as='a' cursor={'pointer'} color='blue.500' textDecoration='underline'>Sign up</Box></Link>
                            <Link href='/signup'><Box as='a' cursor={'pointer'} color='blue.500' textDecoration='underline'>Forgot password</Box></Link>
                        </Stack>
                        <Button colorScheme={'blue'} variant={'solid'}>
                            Sign in
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src='ny.jpg'
                />
            </Flex>
        </Stack>
    );
}