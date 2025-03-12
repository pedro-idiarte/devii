from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    User, RegistrationSuspension, CurricularComponentSuspension,
    WithdrawalTerm, AbsenceExemption, PhysicalEducationExemption,
    HomeExercise, ComplementaryActivity, HighSchoolCertification
)

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'registration_number', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'registration_number')
    ordering = ('username',)

@admin.register(RegistrationSuspension)
class RegistrationSuspensionAdmin(admin.ModelAdmin):
    list_display = ('student', 'status', 'start_date', 'end_date', 'created_at')
    list_filter = ('status', 'start_date')
    search_fields = ('student__username', 'reason')

@admin.register(CurricularComponentSuspension)
class CurricularComponentSuspensionAdmin(admin.ModelAdmin):
    list_display = ('student', 'component_name', 'status', 'semester', 'created_at')
    list_filter = ('status', 'semester')
    search_fields = ('student__username', 'component_name')

@admin.register(WithdrawalTerm)
class WithdrawalTermAdmin(admin.ModelAdmin):
    list_display = ('student', 'status', 'withdrawal_date', 'created_at')
    list_filter = ('status', 'withdrawal_date')
    search_fields = ('student__username',)

@admin.register(AbsenceExemption)
class AbsenceExemptionAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'status', 'absence_date', 'requires_second_call')
    list_filter = ('status', 'requires_second_call')
    search_fields = ('student__username', 'subject')

@admin.register(PhysicalEducationExemption)
class PhysicalEducationExemptionAdmin(admin.ModelAdmin):
    list_display = ('student', 'status', 'validity_period', 'created_at')
    list_filter = ('status',)
    search_fields = ('student__username',)

@admin.register(HomeExercise)
class HomeExerciseAdmin(admin.ModelAdmin):
    list_display = ('student', 'status', 'start_date', 'end_date')
    list_filter = ('status', 'start_date')
    search_fields = ('student__username',)

@admin.register(ComplementaryActivity)
class ComplementaryActivityAdmin(admin.ModelAdmin):
    list_display = ('student', 'activity_type', 'hours', 'status', 'activity_date')
    list_filter = ('status', 'activity_type')
    search_fields = ('student__username', 'activity_type')

@admin.register(HighSchoolCertification)
class HighSchoolCertificationAdmin(admin.ModelAdmin):
    list_display = ('student', 'certification_type', 'year', 'status')
    list_filter = ('status', 'certification_type', 'year')
    search_fields = ('student__username',)
