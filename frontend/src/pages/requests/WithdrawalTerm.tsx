import React from 'react';
import * as yup from 'yup';
import RequestForm from '../../components/Forms/RequestForm';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';

const validationSchema = yup.object({
    reason: yup.string().required('O motivo é obrigatório'),
    withdrawal_date: yup.date().required('A data de desistência é obrigatória'),
    supporting_documents: yup
        .mixed()
        .required('O documento comprobatório é obrigatório'),
});

const WithdrawalTerm: React.FC = () => {
    const navigate = useNavigate();

    const fields = [
        {
            name: 'reason',
            label: 'Motivo da Desistência',
            type: 'text',
            multiline: true,
            required: true,
        },
        {
            name: 'withdrawal_date',
            label: 'Data da Desistência',
            type: 'date',
            required: true,
        },
        {
            name: 'supporting_documents',
            label: 'Documento Comprobatório',
            type: 'file',
            required: true,
        },
    ];

    const initialValues = {
        reason: '',
        withdrawal_date: '',
        supporting_documents: null,
    };

    return (
        <MainLayout>
            <RequestForm
                title="Solicitação de Termo de Desistência"
                endpoint="/withdrawal-terms/"
                fields={fields}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSuccess={() => navigate('/requests')}
            />
        </MainLayout>
    );
};

export default WithdrawalTerm; 