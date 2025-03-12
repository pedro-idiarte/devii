import React from 'react';
import * as yup from 'yup';
import RequestForm from '../../components/Forms/RequestForm';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';

const validationSchema = yup.object({
    reason: yup.string().required('O motivo é obrigatório'),
    medical_report: yup
        .mixed()
        .required('O atestado médico é obrigatório'),
    validity_period: yup.string().required('O período de validade é obrigatório'),
});

const PhysicalEducationExemption: React.FC = () => {
    const navigate = useNavigate();

    const fields = [
        {
            name: 'reason',
            label: 'Motivo da Dispensa',
            type: 'text',
            multiline: true,
            required: true,
        },
        {
            name: 'medical_report',
            label: 'Atestado Médico',
            type: 'file',
            required: true,
        },
        {
            name: 'validity_period',
            label: 'Período de Validade',
            type: 'text',
            required: true,
        },
    ];

    const initialValues = {
        reason: '',
        medical_report: null,
        validity_period: '',
    };

    return (
        <MainLayout>
            <RequestForm
                title="Solicitação de Dispensa de Educação Física"
                endpoint="/physical-education-exemptions/"
                fields={fields}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSuccess={() => navigate('/requests')}
            />
        </MainLayout>
    );
};

export default PhysicalEducationExemption; 