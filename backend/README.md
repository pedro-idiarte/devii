# Sistema de Formulários - Backend

Este é o backend do sistema de formulários para uma instituição educacional. O sistema gerencia diferentes tipos de solicitações de alunos, incluindo suspensão de matrícula, suspensão de componentes curriculares, termos de desistência, e muito mais.

## Requisitos

- Python 3.8+
- Django 5.1.7
- Django REST Framework 3.14.0
- Outras dependências listadas em `requirements.txt`

## Configuração

1. Clone o repositório
2. Crie um ambiente virtual:
   ```bash
   python -m venv venv
   ```

3. Ative o ambiente virtual:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```

4. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

5. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   SECRET_KEY=sua_chave_secreta_aqui
   ```

6. Execute as migrações:
   ```bash
   python manage.py migrate
   ```

7. Crie um superusuário:
   ```bash
   python manage.py createsuperuser
   ```

8. Inicie o servidor:
   ```bash
   python manage.py runserver
   ```

## Estrutura do Projeto

O projeto possui os seguintes modelos principais:

- User: Modelo de usuário personalizado com diferentes papéis (Estudante, Coordenador, CRE)
- RegistrationSuspension: Solicitação de suspensão de matrícula
- CurricularComponentSuspension: Solicitação de suspensão de componente curricular
- WithdrawalTerm: Termo de desistência
- AbsenceExemption: Solicitação de abono de faltas
- PhysicalEducationExemption: Solicitação de dispensa de educação física
- HomeExercise: Solicitação de exercícios domiciliares
- ComplementaryActivity: Entrega de certificado de atividades complementares
- HighSchoolCertification: Certificação de ensino médio via ENCCEJA ou ENEM

## API Endpoints

- `/api/users/`: Gerenciamento de usuários
- `/api/registration-suspensions/`: Solicitações de suspensão de matrícula
- `/api/component-suspensions/`: Solicitações de suspensão de componente curricular
- `/api/withdrawal-terms/`: Termos de desistência
- `/api/absence-exemptions/`: Solicitações de abono de faltas
- `/api/pe-exemptions/`: Solicitações de dispensa de educação física
- `/api/home-exercises/`: Solicitações de exercícios domiciliares
- `/api/complementary-activities/`: Entrega de certificados de atividades complementares
- `/api/high-school-certifications/`: Certificação de ensino médio

## Autenticação

O sistema usa autenticação baseada em sessão. Para acessar os endpoints da API, é necessário estar autenticado. 