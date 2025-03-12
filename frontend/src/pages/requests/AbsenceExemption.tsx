import React from 'react';
import * as yup from 'yup';
import RequestForm from '../../components/Forms/RequestForm';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';

const validationSchema = yup.object({
    subject: yup.string().required('A disciplina é obrigatória'),
    absence_date: yup.date().required('A data da falta é obrigatória'),
    reason: yup.string().required('O motivo é obrigatório'),
    requires_second_call: yup.boolean().required('Informe se necessita de segunda chamada'),
    supporting_documents: yup
        .mixed()
        .required('O documento comprobatório é obrigatório'),
});

const AbsenceExemption: React.FC = () => {
    const navigate = useNavigate();

    const fields = [
        {
            name: 'subject',
            label: 'Disciplina',
            type: 'text',
            required: true,
        },
        {
            name: 'absence_date',
            label: 'Data da Falta',
            type: 'date',
            required: true,
        },
        {
            name: 'reason',
            label: 'Motivo da Falta',
            type: 'text',
            multiline: true,
            required: true,
        },
        {
            name: 'requires_second_call',
            label: 'Necessita de Segunda Chamada',
            type: 'checkbox',
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
        subject: '',
        absence_date: '',
        reason: '',
        requires_second_call: false,
        supporting_documents: null,
    };

    return (
        <MainLayout>
            <RequestForm
                title="Solicitação de Abono de Faltas"
                endpoint="/absence-exemptions/"
                fields={fields}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSuccess={() => navigate('/requests')}
            />
        </MainLayout>
    );
};

export default AbsenceExemption; 