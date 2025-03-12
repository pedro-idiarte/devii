import React from 'react';
import * as yup from 'yup';
import RequestForm from '../../components/Forms/RequestForm';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';

const validationSchema = yup.object({
    component_name: yup.string().required('O nome do componente é obrigatório'),
    reason: yup.string().required('O motivo é obrigatório'),
    semester: yup.string().required('O semestre é obrigatório'),
    supporting_documents: yup
        .mixed()
        .required('O documento comprobatório é obrigatório'),
});

const CurricularComponentSuspension: React.FC = () => {
    const navigate = useNavigate();

    const fields = [
        {
            name: 'component_name',
            label: 'Nome do Componente Curricular',
            type: 'text',
            required: true,
        },
        {
            name: 'reason',
            label: 'Motivo da Suspensão',
            type: 'text',
            multiline: true,
            required: true,
        },
        {
            name: 'semester',
            label: 'Semestre',
            type: 'text',
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
        component_name: '',
        reason: '',
        semester: '',
        supporting_documents: null,
    };

    return (
        <MainLayout>
            <RequestForm
                title="Solicitação de Suspensão de Componente Curricular"
                endpoint="/curricular-component-suspensions/"
                fields={fields}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSuccess={() => navigate('/requests')}
            />
        </MainLayout>
    );
};

export default CurricularComponentSuspension; 