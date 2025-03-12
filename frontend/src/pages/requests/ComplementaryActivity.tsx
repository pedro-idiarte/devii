import React from 'react';
import * as yup from 'yup';
import RequestForm from '../../components/Forms/RequestForm';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';

const validationSchema = yup.object({
    activity_type: yup.string().required('O tipo de atividade é obrigatório'),
    hours: yup
        .number()
        .required('A carga horária é obrigatória')
        .positive('A carga horária deve ser positiva')
        .integer('A carga horária deve ser um número inteiro'),
    certificate: yup
        .mixed()
        .required('O certificado é obrigatório'),
    activity_date: yup.date().required('A data da atividade é obrigatória'),
});

const ComplementaryActivity: React.FC = () => {
    const navigate = useNavigate();

    const fields = [
        {
            name: 'activity_type',
            label: 'Tipo de Atividade',
            type: 'select',
            options: [
                { value: 'COURSE', label: 'Curso' },
                { value: 'WORKSHOP', label: 'Oficina' },
                { value: 'SEMINAR', label: 'Seminário' },
                { value: 'CONGRESS', label: 'Congresso' },
                { value: 'VOLUNTEER', label: 'Trabalho Voluntário' },
                { value: 'INTERNSHIP', label: 'Estágio' },
                { value: 'RESEARCH', label: 'Pesquisa' },
                { value: 'EXTENSION', label: 'Extensão' },
                { value: 'OTHER', label: 'Outro' },
            ],
            required: true,
        },
        {
            name: 'hours',
            label: 'Carga Horária',
            type: 'number',
            required: true,
        },
        {
            name: 'activity_date',
            label: 'Data da Atividade',
            type: 'date',
            required: true,
        },
        {
            name: 'certificate',
            label: 'Certificado',
            type: 'file',
            required: true,
        },
    ];

    const initialValues = {
        activity_type: '',
        hours: '',
        activity_date: '',
        certificate: null,
    };

    return (
        <MainLayout>
            <RequestForm
                title="Solicitação de Atividade Complementar"
                endpoint="/complementary-activities/"
                fields={fields}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSuccess={() => navigate('/requests')}
            />
        </MainLayout>
    );
};

export default ComplementaryActivity; 