import { useState } from 'react';
import { Box, Button, Input, VStack, Heading, useToast } from '@chakra-ui/react';

const MongoLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                toast({ title: "Login Successful", status: "success", duration: 5000, isClosable: true });
            } else {
                toast({ title: "Login Failed", description: data.message, status: "error", duration: 5000, isClosable: true });
            }
        } catch (error) {
            toast({ title: "Error", description: "Something went wrong", status: "error", duration: 5000, isClosable: true });
        }
    };

    return (
        <Box p={6} maxW="md" mx="auto">
            <Heading mb={6}>Login</Heading>
            <VStack spacing={4}>
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
            </VStack>
        </Box>
    );
};

export default LoginPage ;

