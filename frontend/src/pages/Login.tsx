import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { Container, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login: React.FC = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const response = await api.post('/auth/google/', {
                token: credentialResponse.credential,
            });
            await signIn(response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Sistema de Formulários
                    </Typography>
                    <Typography component="h2" variant="h6" align="center" gutterBottom>
                        Login Institucional
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login; 