import React, { useEffect, useState } from 'react';
import {
    Paper,
    Typography,
    Box,
    Grid,
    Chip,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { RequestBase } from '../../types/models';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const statusTranslations = {
    PENDING: 'Pendente',
    COORDINATOR_ANALYSIS: 'Análise do Coordenador',
    CRE_ANALYSIS: 'Análise do CRE',
    APPROVED: 'Aprovado',
    REJECTED: 'Rejeitado',
};

const statusColors = {
    PENDING: 'warning',
    COORDINATOR_ANALYSIS: 'info',
    CRE_ANALYSIS: 'info',
    APPROVED: 'success',
    REJECTED: 'error',
};

const RequestDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [request, setRequest] = useState<RequestBase | null>(null);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [notes, setNotes] = useState('');
    const [action, setAction] = useState<'approve' | 'reject' | null>(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchRequest = async () => {
        try {
            const response = await api.get(`/requests/${id}/`);
            setRequest(response.data);
        } catch (error) {
            console.error('Erro ao buscar solicitação:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, [id]);

    const handleAction = async () => {
        if (!action) return;

        try {
            const endpoint = `/requests/${id}/${action}/`;
            const data = {
                notes: notes,
            };

            await api.post(endpoint, data);
            await fetchRequest();
            setOpenDialog(false);
            setNotes('');
            setAction(null);
        } catch (error) {
            console.error('Erro ao processar solicitação:', error);
        }
    };

    const canAnalyze = () => {
        if (!user || !request) return false;

        if (user.role === 'COORDINATOR' && request.status === 'PENDING') {
            return true;
        }

        if (user.role === 'CRE' && request.status === 'COORDINATOR_ANALYSIS') {
            return true;
        }

        return false;
    };

    if (loading) {
        return (
            <MainLayout>
                <Box sx={{ p: 3 }}>
                    <Typography>Carregando...</Typography>
                </Box>
            </MainLayout>
        );
    }

    if (!request) {
        return (
            <MainLayout>
                <Box sx={{ p: 3 }}>
                    <Typography>Solicitação não encontrada</Typography>
                </Box>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4">
                        Detalhes da Solicitação #{request.id}
                    </Typography>
                    <Button variant="outlined" onClick={() => navigate('/requests')}>
                        Voltar
                    </Button>
                </Box>

                <Paper sx={{ p: 3, mb: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2">Status</Typography>
                            <Chip
                                label={statusTranslations[request.status]}
                                color={statusColors[request.status] as any}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2">Data de Criação</Typography>
                            <Typography>
                                {new Date(request.created_at).toLocaleDateString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2">Estudante</Typography>
                            <Typography>
                                {request.student.first_name} {request.student.last_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2">Matrícula</Typography>
                            <Typography>{request.student.registration_number}</Typography>
                        </Grid>

                        {Object.entries(request).map(([key, value]) => {
                            if (['id', 'student', 'status', 'created_at', 'updated_at', 'coordinator_notes', 'cre_notes'].includes(key)) {
                                return null;
                            }

                            return (
                                <Grid item xs={12} key={key}>
                                    <Typography variant="subtitle2">
                                        {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
                                    </Typography>
                                    <Typography>
                                        {value instanceof File ? (
                                            <Button
                                                variant="text"
                                                onClick={() => window.open(URL.createObjectURL(value))}
                                            >
                                                Visualizar Documento
                                            </Button>
                                        ) : (
                                            String(value)
                                        )}
                                    </Typography>
                                </Grid>
                            );
                        })}

                        {request.coordinator_notes && (
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Observações do Coordenador</Typography>
                                <Typography>{request.coordinator_notes}</Typography>
                            </Grid>
                        )}

                        {request.cre_notes && (
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">Observações do CRE</Typography>
                                <Typography>{request.cre_notes}</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Paper>

                {canAnalyze() && (
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setAction('reject');
                                setOpenDialog(true);
                            }}
                        >
                            Rejeitar
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                                setAction('approve');
                                setOpenDialog(true);
                            }}
                        >
                            Aprovar
                        </Button>
                    </Box>
                )}

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>
                        {action === 'approve' ? 'Aprovar Solicitação' : 'Rejeitar Solicitação'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Observações"
                            fullWidth
                            multiline
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                        <Button onClick={handleAction} variant="contained" color="primary">
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </MainLayout>
    );
};

export default RequestDetail; 