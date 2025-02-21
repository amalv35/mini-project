// Firebase Authentication Login Page
import { useState } from 'react';
import { auth } from '../firebase'; // Ensure firebase is initialized in a separate file
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Box, Button, Input, VStack, Heading, useToast } from '@chakra-ui/react';

const FirebaseLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({ title: "Login Successful", status: "success", duration: 5000, isClosable: true });
        } catch (error) {
            toast({ title: "Login Failed", description: error.message, status: "error", duration: 5000, isClosable: true });
        }
    };

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            toast({ title: "Reset Email Sent", status: "info", duration: 5000, isClosable: true });
        } catch (error) {
            toast({ title: "Error", description: error.message, status: "error", duration: 5000, isClosable: true });
        }
    };

    return (
        <Box p={6} maxW="md" mx="auto">
            <Heading mb={6}>Login</Heading>
            <VStack spacing={4}>
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
                <Button variant="link" onClick={handleForgotPassword}>Forgot Password?</Button>
            </VStack>
        </Box>
    );
};

export default FirebaseLogin;