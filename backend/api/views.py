from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import (
    User, RegistrationSuspension, CurricularComponentSuspension,
    WithdrawalTerm, AbsenceExemption, PhysicalEducationExemption,
    HomeExercise, ComplementaryActivity, HighSchoolCertification
)
from .serializers import (
    UserSerializer, RegistrationSuspensionSerializer,
    CurricularComponentSuspensionSerializer, WithdrawalTermSerializer,
    AbsenceExemptionSerializer, PhysicalEducationExemptionSerializer,
    HomeExerciseSerializer, ComplementaryActivitySerializer,
    HighSchoolCertificationSerializer
)

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'CRE' or self.request.user.role == 'ADMIN':
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

class RequestBaseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'STUDENT':
            return self.queryset.filter(student=user)
        elif user.role == 'COORDINATOR':
            return self.queryset.filter(status='PENDING')
        elif user.role in ['CRE', 'ADMIN']:
            return self.queryset.all()
        return self.queryset.none()

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        instance = self.get_object()
        instance.status = 'APPROVED'
        instance.save()
        return Response({'status': 'request approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        instance = self.get_object()
        instance.status = 'REJECTED'
        instance.save()
        return Response({'status': 'request rejected'})

class RegistrationSuspensionViewSet(RequestBaseViewSet):
    queryset = RegistrationSuspension.objects.all()
    serializer_class = RegistrationSuspensionSerializer

class CurricularComponentSuspensionViewSet(RequestBaseViewSet):
    queryset = CurricularComponentSuspension.objects.all()
    serializer_class = CurricularComponentSuspensionSerializer

class WithdrawalTermViewSet(RequestBaseViewSet):
    queryset = WithdrawalTerm.objects.all()
    serializer_class = WithdrawalTermSerializer

class AbsenceExemptionViewSet(RequestBaseViewSet):
    queryset = AbsenceExemption.objects.all()
    serializer_class = AbsenceExemptionSerializer

class PhysicalEducationExemptionViewSet(RequestBaseViewSet):
    queryset = PhysicalEducationExemption.objects.all()
    serializer_class = PhysicalEducationExemptionSerializer

class HomeExerciseViewSet(RequestBaseViewSet):
    queryset = HomeExercise.objects.all()
    serializer_class = HomeExerciseSerializer

class ComplementaryActivityViewSet(RequestBaseViewSet):
    queryset = ComplementaryActivity.objects.all()
    serializer_class = ComplementaryActivitySerializer

class HighSchoolCertificationViewSet(RequestBaseViewSet):
    queryset = HighSchoolCertification.objects.all()
    serializer_class = HighSchoolCertificationSerializer
