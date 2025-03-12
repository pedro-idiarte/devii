import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';

const requestTypes = [
    {
        title: 'Suspensão de Matrícula',
        description: 'Solicite a suspensão temporária de sua matrícula',
        path: '/requests/registration-suspension',
    },
    {
        title: 'Suspensão de Componente Curricular',
        description: 'Solicite a suspensão de um componente curricular específico',
        path: '/requests/curricular-component-suspension',
    },
    {
        title: 'Termo de Desistência',
        description: 'Solicite o cancelamento definitivo de sua matrícula',
        path: '/requests/withdrawal-term',
    },
    {
        title: 'Abono de Faltas',
        description: 'Solicite o abono de faltas por motivos justificados',
        path: '/requests/absence-exemption',
    },
    {
        title: 'Dispensa de Educação Física',
        description: 'Solicite dispensa das aulas de educação física',
        path: '/requests/physical-education-exemption',
    },
    {
        title: 'Exercício Domiciliar',
        description: 'Solicite a realização de atividades em domicílio',
        path: '/requests/home-exercise',
    },
    {
        title: 'Atividade Complementar',
        description: 'Registre suas atividades complementares',
        path: '/requests/complementary-activity',
    },
    {
        title: 'Certificação do Ensino Médio',
        description: 'Solicite a certificação do ensino médio por ENEM/ENCCEJA',
        path: '/requests/high-school-certification',
    },
];

const NewRequest: React.FC = () => {
    const navigate = useNavigate();

    return (
        <MainLayout>
            <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4">Nova Solicitação</Typography>
                    <Button variant="outlined" onClick={() => navigate('/requests')}>
                        Voltar
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {requestTypes.map((type) => (
                        <Grid item xs={12} sm={6} md={4} key={type.path}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {type.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {type.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => navigate(type.path)}
                                    >
                                        Criar Solicitação
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </MainLayout>
    );
};

export default NewRequest; 