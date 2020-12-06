# Recuperação de Senha

**RF - Requisitos Funcionais (como o fluxo acontece)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF - Requisitos Não-Funcionais (como o fluxo acontece - na parte técnica)**

- Utilizar Mailtrap para testar envios de e-mail em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios de e-mail em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN - Regras de Negócio**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha no processo de reset da senha antiga;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário não pode alteração seu e-mail para outro já utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário deve confirmar a senha no processo de atualização;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não-lidas;

**RNF**

- Os agendamento do prestador no dia devem ser armazenas em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- O painel deve iniciar carregando os agendamentos do dia atual;
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlá-las;

# Agendameno de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados
- O usuário deve poder listar os dias de uma mês de um prestador com pelo menos 1 horário disponível;
- O usuário deve poder listar horários disponíveis em um dia específico do prestador;
- O usuário deve realizar um novo agendamento para um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis das 8h às 18h (Primeiro às 8h - Último às 17h);
- O usuário não pode agendar um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços para ele mesmo (para o caso em que o prestador baixe o app e faça um agendamento);
