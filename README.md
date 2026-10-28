# Clyvo PetCare — Sprint 4

**Mobile Application Development — FIAP Challenge 2026**

## Integrantes

| Integrante | RM |
| --- | --- |
| Caio Kenzo Tayra | 562979 |
| Enzo Vieira Bernardini | 563000 |
| Nícolas Mota Cândido | 561857 |

## Apresentação

O Clyvo PetCare reúne cadastros de tutores e animais, orientações de cuidados, triagem de sintomas e consulta a registros. O objetivo é apoiar a organização do acompanhamento dos pets. Avaliações de risco e orientações gerais não substituem atendimento veterinário.

O aplicativo é desenvolvido em **React Native + Expo SDK 54 + TypeScript**, com **React Navigation**, **Axios**, **TanStack Query**, **Yup**, **AsyncStorage** e **expo-notifications**. A autenticação e os cadastros são realizados na API Java Spring Boot do projeto, sem dados fictícios para as operações de CRUD.

**API utilizada:** NO AGUARDO

## Funcionalidades

| Tela | Funcionamento |
| --- | --- |
| Login | Validação com Yup e autenticação HTTP Basic na API Java |
| Criar conta | Cadastro de usuário pela API e entrada na sessão |
| Início | Identificação da sessão e acesso rápido às ações |
| Tutores | Consulta e CRUD HTTP completo (edição restrita a ADMIN) |
| Pets | Consulta e CRUD HTTP completo, associado ao tutor (edição restrita a ADMIN) |
| Painel Veterinário | Indicadores da API e navegação para cadastros, triagem e histórico |
| Jornada de Cuidados | Recomendações a partir de idade e cadastro do pet na API |
| Triagem de Risco | Avaliação de sintomas, gravação de resultado e emissão de notificação quando necessário |
| Assistente IA | Consulta contextual de informações reais dos pets e de triagens registradas, com motor de regras local |
| Histórico | Triagens persistidas neste dispositivo, além da visão cadastral da API |
| Meu Perfil | Dados da sessão, alteração do tema e logout |
| Sobre o App | Versão instalada e hash do commit do código de referência |

### Autenticação e integração com a API

O app usa os endpoints disponibilizados pela API Java:

- `POST /api/auth/register` — cadastro de usuário
- `GET /api/auth/me` — autenticação e dados da sessão
- `GET /api/responsaveis` — listar tutores
- `POST /api/responsaveis` — criar tutor
- `PUT /api/responsaveis/{id}` — editar tutor
- `DELETE /api/responsaveis/{id}` — excluir tutor
- `GET /api/animais` — listar pets
- `POST /api/animais` — criar pet
- `PUT /api/animais/{id}` — editar pet
- `DELETE /api/animais/{id}` — excluir pet

O perfil `ADMIN` pode gerenciar cadastros; o perfil `USER` pode consultá-los. As permissões são verificadas no backend. As telas privadas exigem autenticação, e o logout impede o acesso posterior a essas rotas. O TanStack Query atualiza as listagens após alterações.

A implementação segue o esquema HTTP Basic do backend da Sprint 3. As credenciais utilizadas para recuperar a sessão são persistidas localmente como na versão anterior; para disponibilização pública a usuários reais, o backend deverá adotar tokens e armazenamento seguro. O APK final precisa apontar para **API HTTPS acessível externamente**.

### Notificação local

1. Selecione um pet real, carregado pela API, na tela Triagem.
2. Informe sinais observados; a avaliação é executada pelo serviço `triagemService`.
3. O resultado é gravado no histórico local do usuário autenticado.
4. Se o risco for `ALTO` ou `EMERGÊNCIA`, uma notificação local é agendada automaticamente por `expo-notifications`.
5. Ao tocar na notificação, o app abre a tela Triagem. Se necessário, o usuário realiza o login antes de acessá-la.

O sistema solicita a permissão de notificações conforme exigido pelo aparelho. Não existe botão de envio artificial ou notificação genérica para fins de demonstração.

### Tema claro e escuro

O modo de aparência é alterado em **Meu Perfil** entre `Seguir o sistema`, `Modo claro` e `Modo escuro`. A preferência fica salva em AsyncStorage e é reaplicada ao reiniciar o aplicativo.

### Assistente de Cuidados

A rota da Sprint 3 foi preservada. O assistente consulta informações do pet retornadas pela API e resultados reais de triagens armazenados neste dispositivo. As respostas são determinadas por regras do próprio aplicativo, **não** por uma integração externa com modelo generativo. A interface não apresenta respostas como se fossem consultas realizadas em um serviço de IA.

## Estrutura do código

```text
App.tsx
app.json
app.config.js
package.json
eas.json
src/
  assets/
  components/
  context/
  control/
  model/
  navigation/
  notifications/
  screen/
  services/
  theme/
  validation/
```

As telas ficam na camada `screen`, os formulários e ações são encapsulados nos hooks da camada `control`, os modelos ficam em `model` e as requisições HTTP e persistência estão em `services`. Hooks de operações relacionadas compartilham a instância do `useQueryClient()` e invalidam as consultas após o CRUD.

### Correções da Sprint 3

- Remoção do plugin `expo-router`: a navegação utiliza apenas React Navigation. 
- Correção dos caminhos dos recursos em `app.json` e dos nomes de arquivos importados.
- Descrição do produto, arquitetura, execução e avaliação documentadas no README.

## Como executar

### Requisitos

- Node.js LTS e npm
- Android Studio com emulador Android ou aparelho Android
- API Java Spring Boot funcional, com usuários e banco de dados acessíveis

No terminal, dentro da pasta do aplicativo:

```cmd
npm install
copy .env.example .env
npm run typecheck
npx expo start --clear
```

Configure `EXPO_PUBLIC_API_URL` no `.env`:

- Emulador Android, API no computador: `http://10.0.2.2:8082`.
- Aparelho real: # URL DA API QUANDO MEMBRO DO GRUPO SUBIR

O endereço do emulador **não** funciona no celular do avaliador. Em builds Android de distribuição, a configuração da API deve ser preenchida no ambiente EAS de build antes de gerar o APK. Sem uma URL pública válida, os fluxos HTTP não funcionarão no aplicativo publicado.

### Como testar o fluxo

1. Cadastre um usuário e faça login.
2. Use um administrador válido da API para cadastrar, editar, listar e excluir um tutor.
3. Cadastre um pet vinculado ao tutor, edite os dados e consulte a atualização da lista.
4. Acesse a Triagem, selecione o pet e marque **vômito + apatia** (nível ALTO) ou **dificuldade respiratória** (EMERGÊNCIA).
5. Permita notificações e confirme a chegada do alerta automático. Toque no alerta e valide o direcionamento para Triagem.
6. Consulte o resultado da triagem no Histórico; reinicie o app e verifique sua persistência.
7. No Perfil, alterne o modo visual, reinicie e valide a preferência mantida.
8. Efetue logout; confira a proteção das telas internas.
9. Instale o APK distribuído e confira versão e hash em **Sobre o App**.

## Geração e distribuição Android

A Sprint 4 solicita a publicação no **Firebase App Distribution** com o e-mail institucional do professor cadastrado como tester. O build de distribuição está configurado no perfil `preview` do `eas.json` para gerar APK.

1. Crie um projeto no Firebase e registre o app Android com o package `com.nicomotac.clyvopetcare`.
2. Habilite Firebase App Distribution para o app Android registrado.
3. Configure no EAS o valor de `EXPO_PUBLIC_API_URL` com o endereço HTTPS do backend. Este valor não é secreto, pois estará presente no pacote do aplicativo.
4. Faça o commit final do código no repositório oficial da entrega e verifique que a árvore de trabalho está limpa.
5. Execute:

```cmd
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform android --profile preview
```

6. Após concluir o build, baixe o APK e instale no aparelho real para testar. Confira o commit da tela **Sobre o App**. `app.config.js` utiliza `EXPO_PUBLIC_COMMIT_HASH`, depois `EAS_BUILD_GIT_COMMIT_HASH`, e por fim o hash do Git local, conforme disponibilidade.
7. Instale a CLI do Firebase e autentique:

```cmd
npm install --global firebase-tools
firebase login
```

8. Publique o APK, substituindo os dados do exemplo pelos identificadores reais:

```cmd
firebase appdistribution:distribute caminho\clyvo.apk --app ID_DO_APLICATIVO_FIREBASE --testers antonio.neto@fiap.com.br
```

9. Confirme no painel Firebase que o professor foi convidado e consegue instalar a versão correta. O mesmo commit deve estar representado no código entregue, no APK e no vídeo.

Documentação: [Expo EAS Build](https://docs.expo.dev/build/introduction/) · [Firebase App Distribution](https://firebase.google.com/docs/app-distribution/android/distribute-cli?hl=pt-br)

## Vídeo de apresentação

O vídeo final deve registrar, no aplicativo realmente instalado e disponibilizado ao professor, os fluxos completos de login, tutores, pets, triagem, notificação, histórico, tema e a tela **Sobre o App**. Demonstrar o app sem cortes que ocultem erros e confirmar a versão distribuída. As funcionalidades não demonstradas podem não ser consideradas na correção.

**Link do vídeo de entrega:** preencher após publicação.

**Link do repositório GitHub Classroom:** preencher quando disponibilizado.

**Disponibilização ao professor:** convite do Firebase App Distribution com acesso ativo.

## Verificação

