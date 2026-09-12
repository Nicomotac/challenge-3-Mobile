# Clyvo PetCare — Sprint 3 Mobile Application Development

**GRUPO**
Caio Kenzo Tayra - RM562979 Enzo Vieira Bernardini - RMRM563000 Nícolas Mota Cândido - RM561857

Aplicativo **React Native + Expo + TypeScript**, evoluído a partir da estrutura dos exemplos das Sprints anteriores (`model`, `control`, `services`, `screen`, `navigation`).

## Tecnologias
- React Native + Expo
- TypeScript
- React Navigation (Native Stack + Drawer)
- TanStack Query
- Axios
- Yup
- AsyncStorage
- API Java Spring Boot

## Requisitos atendidos
- 6+ telas reais com React Navigation
- autenticação real pela API Java
- cadastro de usuário
- persistência da sessão
- proteção das rotas e logout
- perfis ADMIN e USER retornados pela API
- CRUD completo de Tutores
- CRUD completo de Pets
- TanStack Query (`useQuery`, `useMutation`, `invalidateQueries`)
- estados de loading/erro
- camada `model` como nos exemplos do projeto
- validação simples dos formulários com Yup
- tela Assistente IA simulada usando pet real da API como contexto

## Perfis de demonstração
- ADMIN: `admin` / `123`
- USER: `user` / `123`

ADMIN pode cadastrar, editar e excluir. USER pode consultar.

## Executar Mobile no Android Emulator
Na pasta `mobile`:

```cmd
npm install
npx expo start
```

## LINK DA API JAVA

https://github.com/Nicomotac/API-JAVA-SPRINT-3



