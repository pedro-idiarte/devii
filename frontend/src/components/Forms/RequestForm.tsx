import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    MenuItem,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { RequestBase } from '../../types/models';
import api from '../../services/api';

interface RequestFormProps {
    title: string;
    endpoint: string;
    fields: {
        name: string;
        label: string;
        type: string;
        required?: boolean;
        multiline?: boolean;
        options?: { value: string; label: string }[];
    }[];
    initialValues: any;
    validationSchema: any;
    onSuccess?: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({
    title,
    endpoint,
    fields,
    initialValues,
    validationSchema,
    onSuccess,
}) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                Object.keys(values).forEach((key) => {
                    if (values[key] instanceof File) {
                        formData.append(key, values[key]);
                    } else {
                        formData.append(key, String(values[key]));
                    }
                });

                await api.post(endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                console.error('Erro ao enviar solicitação:', error);
            }
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            formik.setFieldValue(fieldName, event.currentTarget.files[0]);
        }
    };

    const renderField = (field: RequestFormProps['fields'][0]) => {
        const errorMessage = formik.touched[field.name] && formik.errors[field.name]
            ? String(formik.errors[field.name])
            : undefined;

        switch (field.type) {
            case 'file':
                return (
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                    >
                        {field.label}
                        <input
                            type="file"
                            hidden
                            onChange={(e) => handleFileChange(e, field.name)}
                        />
                    </Button>
                );
            case 'select':
                return (
                    <TextField
                        select
                        fullWidth
                        id={field.name}
                        name={field.name}
                        label={field.label}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                        error={Boolean(errorMessage)}
                        helperText={errorMessage}
                    >
                        {field.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                );
            case 'checkbox':
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                id={field.name}
                                name={field.name}
                                checked={formik.values[field.name]}
                                onChange={formik.handleChange}
                            />
                        }
                        label={field.label}
                    />
                );
            default:
                return (
                    <TextField
                        fullWidth
                        id={field.name}
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                        error={Boolean(errorMessage)}
                        helperText={errorMessage}
                        multiline={field.multiline}
                        rows={field.multiline ? 4 : 1}
                    />
                );
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    {fields.map((field) => (
                        <Grid item xs={12} key={field.name}>
                            {renderField(field)}
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Enviar Solicitação
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default RequestForm; 