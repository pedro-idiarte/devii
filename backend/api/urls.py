from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'registration-suspensions', views.RegistrationSuspensionViewSet)
router.register(r'component-suspensions', views.CurricularComponentSuspensionViewSet)
router.register(r'withdrawal-terms', views.WithdrawalTermViewSet)
router.register(r'absence-exemptions', views.AbsenceExemptionViewSet)
router.register(r'pe-exemptions', views.PhysicalEducationExemptionViewSet)
router.register(r'home-exercises', views.HomeExerciseViewSet)
router.register(r'complementary-activities', views.ComplementaryActivityViewSet)
router.register(r'high-school-certifications', views.HighSchoolCertificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 