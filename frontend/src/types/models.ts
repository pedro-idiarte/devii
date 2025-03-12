export interface User {
    id: number;
    username: string;
    email: string;
    role: 'STUDENT' | 'COORDINATOR' | 'CRE' | 'ADMIN';
    registration_number?: string;
    first_name: string;
    last_name: string;
}

export interface RequestBase {
    id: number;
    student: User;
    status: 'PENDING' | 'COORDINATOR_ANALYSIS' | 'CRE_ANALYSIS' | 'APPROVED' | 'REJECTED';
    created_at: string;
    updated_at: string;
    coordinator_notes?: string;
    cre_notes?: string;
}

export interface RegistrationSuspension extends RequestBase {
    reason: string;
    start_date: string;
    end_date: string;
    supporting_documents: File | null;
}

export interface CurricularComponentSuspension extends RequestBase {
    component_name: string;
    reason: string;
    semester: string;
    supporting_documents: File | null;
}

export interface WithdrawalTerm extends RequestBase {
    reason: string;
    withdrawal_date: string;
    supporting_documents: File | null;
}

export interface AbsenceExemption extends RequestBase {
    subject: string;
    absence_date: string;
    reason: string;
    requires_second_call: boolean;
    supporting_documents: File | null;
}

export interface PhysicalEducationExemption extends RequestBase {
    reason: string;
    medical_report: File | null;
    validity_period: string;
}

export interface HomeExercise extends RequestBase {
    reason: string;
    start_date: string;
    end_date: string;
    medical_report: File | null;
}

export interface ComplementaryActivity extends RequestBase {
    activity_type: string;
    hours: number;
    certificate: File | null;
    activity_date: string;
}

export interface HighSchoolCertification extends RequestBase {
    certification_type: 'ENCCEJA' | 'ENEM';
    year: number;
    proof_document: File | null;
} 