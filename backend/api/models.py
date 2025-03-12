from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    ROLE_CHOICES = [
        ('STUDENT', 'Estudante'),
        ('COORDINATOR', 'Coordenador'),
        ('CRE', 'CRE'),
        ('ADMIN', 'Administrador'),
    ]
    
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    registration_number = models.CharField(max_length=20, blank=True, null=True)
    google_id = models.CharField(max_length=100, blank=True, null=True)
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

class RequestBase(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pendente'),
        ('COORDINATOR_ANALYSIS', 'Em análise pelo Coordenador'),
        ('CRE_ANALYSIS', 'Em análise pelo CRE'),
        ('APPROVED', 'Aprovado'),
        ('REJECTED', 'Rejeitado'),
    ]
    
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    coordinator_notes = models.TextField(blank=True, null=True)
    cre_notes = models.TextField(blank=True, null=True)
    
    class Meta:
        abstract = True

class RegistrationSuspension(RequestBase):
    reason = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    supporting_documents = models.FileField(upload_to='documents/suspension/')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='registration_suspensions')

class CurricularComponentSuspension(RequestBase):
    component_name = models.CharField(max_length=100)
    reason = models.TextField()
    semester = models.CharField(max_length=20)
    supporting_documents = models.FileField(upload_to='documents/component_suspension/')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='component_suspensions')

class WithdrawalTerm(RequestBase):
    reason = models.TextField()
    withdrawal_date = models.DateField()
    supporting_documents = models.FileField(upload_to='documents/withdrawal/')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='withdrawal_terms')

class AbsenceExemption(RequestBase):
    subject = models.CharField(max_length=100)
    absence_date = models.DateField()
    reason = models.TextField()
    requires_second_call = models.BooleanField(default=False)
    supporting_documents = models.FileField(upload_to='documents/absence/')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='absence_exemptions')

class PhysicalEducationExemption(RequestBase):
    reason = models.TextField()
    medical_report = models.FileField(upload_to='documents/pe_exemption/')
    validity_period = models.CharField(max_length=50)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pe_exemptions')

class HomeExercise(RequestBase):
    reason = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    medical_report = models.FileField(upload_to='documents/home_exercise/')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='home_exercises')

class ComplementaryActivity(RequestBase):
    activity_type = models.CharField(max_length=100)
    hours = models.IntegerField()
    certificate = models.FileField(upload_to='documents/complementary/')
    activity_date = models.DateField()
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='complementary_activities')

class HighSchoolCertification(RequestBase):
    certification_type = models.CharField(max_length=20, choices=[('ENCCEJA', 'ENCCEJA'), ('ENEM', 'ENEM')])
    year = models.IntegerField()
    proof_document = models.FileField(upload_to='documents/certification/')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='high_school_certifications')
