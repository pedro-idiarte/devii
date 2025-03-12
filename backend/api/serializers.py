from rest_framework import serializers
from .models import (
    User, RegistrationSuspension, CurricularComponentSuspension,
    WithdrawalTerm, AbsenceExemption, PhysicalEducationExemption,
    HomeExercise, ComplementaryActivity, HighSchoolCertification
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'registration_number', 'first_name', 'last_name')
        read_only_fields = ('id',)

class RegistrationSuspensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationSuspension
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class CurricularComponentSuspensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurricularComponentSuspension
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class WithdrawalTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = WithdrawalTerm
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class AbsenceExemptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AbsenceExemption
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class PhysicalEducationExemptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhysicalEducationExemption
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class HomeExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeExercise
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class ComplementaryActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplementaryActivity
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class HighSchoolCertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = HighSchoolCertification
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at') 