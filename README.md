# ⚡ Flashcards App (Offline-First)

Um aplicativo moderno de estudos focado em performance e funcionamento offline. Crie, edite e revise seus flashcards onde estiver, com sincronização de autenticação via Google.

[Sem Título.webm](https://github.com/user-attachments/assets/5dd8b829-b80e-4f8a-999b-cc0c81e5af7a)

<!-- Substitua o link acima por um print ou GIF do seu app rodando -->

## 🚀 Tecnologias

Este projeto utiliza a stack mais moderna do ecossistema React Native / Expo:

-   **Core:** [React Native](https://reactnative.dev/) com [Expo SDK 54+](https://expo.dev/)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Banco de Dados:** [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) (Persistência local)
-   **Gerenciamento de Estado:** [TanStack Query](https://tanstack.com/query/latest) (Cache e Sincronização)
-   **Estilização:** [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS para Mobile)
-   **Autenticação:** [Supabase](https://supabase.com/) (Google OAuth e E-mail/Password)
-   **Animações:** [Reanimated](https://docs.swmansion.com/react-native-reanimated/) & [RN Carousel](https://rn-carousel.dev/)

## ✨ Funcionalidades

-   ✅ **Offline-First:** O app funciona 100% sem internet (exceto login inicial).
-   ✅ **CRUD Completo:** Adicionar, Editar e Excluir cartões.
-   ✅ **Modo Revisão:** Carrossel estilo "Parallax" para navegar entre os cards.
-   ✅ **Grid Layout:** Visualização otimizada em grade.
-   ✅ **Login Social:** Autenticação segura com Google via Supabase.
-   ✅ **UI Moderna:** Interface limpa inspirada em design systems atuais.

## 🛠️ Instalação e Configuração

### Pré-requisitos
-   Node.js instalado.
-   Aplicativo **Expo Go** no celular ou emulador (Android Studio/Xcode).

### Passo a Passo

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/murilo-alvesmelo/app-flashcards-offline.git
    cd app-flashcards-offline
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Configuração de Ambiente**
    Crie um arquivo `.env` na raiz (se necessário) ou configure suas chaves do Supabase no arquivo `lib/supabase.ts`.

4.  **Rodar o projeto**
    Recomendamos rodar limpando o cache na primeira vez para garantir que o NativeWind carregue os estilos corretamente:
    ```bash
    npx expo start -c
    ```

## 📁 Estrutura do Projeto

```text
/app             # Rotas do Expo Router (Telas)
/assets          # Fontes e Imagens
/components      # Componentes reutilizáveis (UI)
  /flashcards    # Componentes específicos de Flashcards (Cards, Modais)
/constants       # Contantes utilizadas no projeto
/context         # Gerenciamento de estado global (ex: AuthProvider, ThemeProvider)
/database        # Configuração e funções do SQLite
/hooks           # Custom Hooks (Lógica do React Query)
/lib             # Configurações de terceiros (Supabase)
/utils           # Funções utilitarias
