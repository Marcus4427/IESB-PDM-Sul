# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Estrutura do projeto

- `package.json`: é o arquivo de configuração do projeto Expo/React Native, onde ficam as dependências, scripts e informações do aplicativo.
- `package-lock.json`: é o arquivo gerado pelo npm que registra a versão exata dos pacotes instalados para manter o ambiente consistente.
- `App.js` / `App.tsx` ou a pasta `app/`: é o arquivo principal da interface, onde a tela do app é montada e renderizada.
- `app.json`: é o arquivo de configuração do Expo que define o nome do app, o slug, o ícone e outras propriedades da aplicação.
- `assets/`: é a pasta que guarda imagens, ícones e outros recursos visuais usados pelo aplicativo.
- `node_modules/`: é a pasta que contém todas as bibliotecas e dependências necessárias para o projeto funcionar localmente.
- `.gitignore`: é o arquivo que diz ao Git quais arquivos e pastas não devem ser enviados para o repositório, como `node_modules` e `.expo`.
- `.expo/`: é a pasta criada pelo Expo para armazenar cache e arquivos temporários gerados durante a execução do app.
