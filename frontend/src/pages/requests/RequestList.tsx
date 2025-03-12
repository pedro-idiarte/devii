import React, { useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
    Box,
    Chip,
    TablePagination,
    TextField,
    MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

const RequestList: React.FC = () => {
    const [requests, setRequests] = useState<RequestBase[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchRequests = async () => {
        try {
            let endpoint = '/requests/';
            if (user?.role === 'COORDINATOR') {
                endpoint = '/requests/coordinator/';
            } else if (user?.role === 'CRE') {
                endpoint = '/requests/cre/';
            }
            const response = await api.get(endpoint);
            setRequests(response.data);
        } catch (error) {
            console.error('Erro ao buscar solicitações:', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredRequests = requests.filter((request) => {
        if (statusFilter && request.status !== statusFilter) return false;
        if (typeFilter) {
            const requestType = request.constructor.name;
            if (requestType !== typeFilter) return false;
        }
        return true;
    });

    const getRequestType = (request: RequestBase) => {
        const typeMap: { [key: string]: string } = {
            RegistrationSuspension: 'Suspensão de Matrícula',
            CurricularComponentSuspension: 'Suspensão de Componente Curricular',
            WithdrawalTerm: 'Termo de Desistência',
            AbsenceExemption: 'Abono de Faltas',
            PhysicalEducationExemption: 'Dispensa de Educação Física',
            HomeExercise: 'Exercício Domiciliar',
            ComplementaryActivity: 'Atividade Complementar',
            HighSchoolCertification: 'Certificação do Ensino Médio',
        };

        return typeMap[request.constructor.name] || 'Desconhecido';
    };

    return (
        <MainLayout>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Solicitações
                </Typography>

                {user?.role === 'STUDENT' && (
                    <Box sx={{ mb: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/requests/new')}
                        >
                            Nova Solicitação
                        </Button>
                    </Box>
                )}

                <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                    <TextField
                        select
                        label="Status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        {Object.entries(statusTranslations).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Tipo de Solicitação"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="RegistrationSuspension">Suspensão de Matrícula</MenuItem>
                        <MenuItem value="CurricularComponentSuspension">Suspensão de Componente</MenuItem>
                        <MenuItem value="WithdrawalTerm">Termo de Desistência</MenuItem>
                        <MenuItem value="AbsenceExemption">Abono de Faltas</MenuItem>
                        <MenuItem value="PhysicalEducationExemption">Dispensa de Ed. Física</MenuItem>
                        <MenuItem value="HomeExercise">Exercício Domiciliar</MenuItem>
                        <MenuItem value="ComplementaryActivity">Atividade Complementar</MenuItem>
                        <MenuItem value="HighSchoolCertification">Certificação Ensino Médio</MenuItem>
                    </TextField>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Estudante</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Data de Criação</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRequests
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell>{request.id}</TableCell>
                                        <TableCell>{getRequestType(request)}</TableCell>
                                        <TableCell>
                                            {request.student.first_name} {request.student.last_name}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={statusTranslations[request.status]}
                                                color={statusColors[request.status] as any}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(request.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => navigate(`/requests/${request.id}`)}
                                            >
                                                Detalhes
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredRequests.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Itens por página"
                    />
                </TableContainer>
            </Box>
        </MainLayout>
    );
};

export default RequestList; 