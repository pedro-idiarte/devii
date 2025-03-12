import React from 'react';
import * as yup from 'yup';
import RequestForm from '../../components/Forms/RequestForm';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';

const validationSchema = yup.object({
    certification_type: yup
        .string()
        .oneOf(['ENCCEJA', 'ENEM'], 'O tipo de certificação deve ser ENCCEJA ou ENEM')
        .required('O tipo de certificação é obrigatório'),
    year: yup
        .number()
        .required('O ano é obrigatório')
        .min(2010, 'O ano deve ser maior ou igual a 2010')
        .max(new Date().getFullYear(), 'O ano não pode ser maior que o ano atual')
        .integer('O ano deve ser um número inteiro'),
    proof_document: yup
        .mixed()
        .required('O documento comprobatório é obrigatório'),
});

const HighSchoolCertification: React.FC = () => {
    const navigate = useNavigate();

    const fields = [
        {
            name: 'certification_type',
            label: 'Tipo de Certificação',
            type: 'select',
            options: [
                { value: 'ENCCEJA', label: 'ENCCEJA' },
                { value: 'ENEM', label: 'ENEM' },
            ],
            required: true,
        },
        {
            name: 'year',
            label: 'Ano',
            type: 'number',
            required: true,
        },
        {
            name: 'proof_document',
            label: 'Documento Comprobatório',
            type: 'file',
            required: true,
        },
    ];

    const initialValues = {
        certification_type: '',
        year: '',
        proof_document: null,
    };

    return (
        <MainLayout>
            <RequestForm
                title="Solicitação de Certificação do Ensino Médio"
                endpoint="/high-school-certifications/"
                fields={fields}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSuccess={() => navigate('/requests')}
            />
        </MainLayout>
    );
};

export default HighSchoolCertification; 