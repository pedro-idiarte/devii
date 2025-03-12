import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import RequestList from './pages/requests/RequestList';
import RequestDetail from './pages/requests/RequestDetail';
import NewRequest from './pages/requests/NewRequest';
import RegistrationSuspension from './pages/requests/RegistrationSuspension';
import CurricularComponentSuspension from './pages/requests/CurricularComponentSuspension';
import WithdrawalTerm from './pages/requests/WithdrawalTerm';
import AbsenceExemption from './pages/requests/AbsenceExemption';
import PhysicalEducationExemption from './pages/requests/PhysicalEducationExemption';
import HomeExercise from './pages/requests/HomeExercise';
import ComplementaryActivity from './pages/requests/ComplementaryActivity';
import HighSchoolCertification from './pages/requests/HighSchoolCertification';

declare global {
    interface Window {
        env: {
            REACT_APP_GOOGLE_CLIENT_ID: string;
        };
    }
}

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user || user.role !== 'STUDENT') {
        return <Navigate to="/requests" />;
    }

    return <>{children}</>;
};

const App: React.FC = () => {
    const googleClientId = window.env?.REACT_APP_GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        
                        <Route
                            path="/requests"
                            element={
                                <PrivateRoute>
                                    <RequestList />
                                </PrivateRoute>
                            }
                        />
                        
                        <Route
                            path="/requests/new"
                            element={
                                <StudentRoute>
                                    <NewRequest />
                                </StudentRoute>
                            }
                        />
                        
                        <Route
                            path="/requests/:id"
                            element={
                                <PrivateRoute>
                                    <RequestDetail />
                                </PrivateRoute>
                            }
                        />
                        
                        <Route
                            path="/requests/registration-suspension"
                            element={
                                <StudentRoute>
                                    <RegistrationSuspension />
                                </StudentRoute>
                            }
                        />

                        <Route
                            path="/requests/curricular-component-suspension"
                            element={
                                <StudentRoute>
                                    <CurricularComponentSuspension />
                                </StudentRoute>
                            }
                        />

                        <Route
                            path="/requests/withdrawal-term"
                            element={
                                <StudentRoute>
                                    <WithdrawalTerm />
                                </StudentRoute>
                            }
                        />

                        <Route
                            path="/requests/absence-exemption"
                            element={
                                <StudentRoute>
                                    <AbsenceExemption />
                                </StudentRoute>
                            }
                        />

                        <Route
                            path="/requests/physical-education-exemption"
                            element={
                                <StudentRoute>
                                    <PhysicalEducationExemption />
                                </StudentRoute>
                            }
                        />

                        <Route
                            path="/requests/home-exercise"
                            element={
                                <StudentRoute>
                                    <HomeExercise />
                                </StudentRoute>
                            }
                        />

                        <Route
                            path="/requests/complementary-activity"
                            element={
                                <StudentRoute>
                                    <ComplementaryActivity />
                                </StudentRoute>
                            }
                        />

                        <Route
                            path="/requests/high-school-certification"
                            element={
                                <StudentRoute>
                                    <HighSchoolCertification />
                                </StudentRoute>
                            }
                        />
                        
                        <Route
                            path="/"
                            element={<Navigate to="/requests" replace />}
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
};

export default App; 