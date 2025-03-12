import React from 'react';
import * as yup from 'yup';
import RequestForm from '../../components/Forms/RequestForm';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';

const validationSchema = yup.object({
    reason: yup.string().required('O motivo é obrigatório'),
    start_date: yup.date().required('A data de início é obrigatória'),
    end_date: yup
        .date()
        .required('A data de término é obrigatória')
        .min(yup.ref('start_date'), 'A data de término deve ser posterior à data de início'),
    supporting_documents: yup
        .mixed()
        .required('O documento comprobatório é obrigatório'),
});

const RegistrationSuspension: React.FC = () => {
    const navigate = useNavigate();

    const fields = [
        {
            name: 'reason',
            label: 'Motivo da Suspensão',
            type: 'text',
            multiline: true,
            required: true,
        },
        {
            name: 'start_date',
            label: 'Data de Início',
            type: 'date',
            required: true,
        },
        {
            name: 'end_date',
            label: 'Data de Término',
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
        start_date: '',
        end_date: '',
        supporting_documents: null,
    };

    return (
        <MainLayout>
            <RequestForm
                title="Solicitação de Suspensão de Matrícula"
                endpoint="/registration-suspensions/"
                fields={fields}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSuccess={() => navigate('/requests')}
            />
        </MainLayout>
    );
};

export default RegistrationSuspension; 