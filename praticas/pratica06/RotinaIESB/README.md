
ATIVIDADE INTEGRADORA 03 — RotinaIESB
Disciplina: Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB


1. COMO CRIAR E EXECUTAR O PROJETO

Comando utilizado para a criação inicial do ambiente:

  npx create-expo-app@latest RotinaIESB --template blank
  cd RotinaIESB
  npx expo install @react-native-async-storage/async-storage react-native-safe-area-context

Para rodar a aplicação com limpeza de cache:

  npx expo start -c


2. SCREENSHOTS DA APLICAÇÃO




3. MAPA DE PERSISTÊNCIA (AsyncStorage e useEffect)

A lógica de armazenamento utiliza a chave '@rotina_iesb_compromissos' e está 
localizada diretamente no arquivo App.js:

1) useEffect de Carga Inicial (Montagem []): 
   Dispara a função carregarDados() assim que o app inicia. Ela realiza o 
   getItem, converte o JSON salvo via JSON.parse para o estado de compromissos 
   e ativa a flag 'carregouInicial'.

2) useEffect de Salvamento Automático ([compromissos, carregouInicial]): 
   Monitora qualquer alteração no array de dados (adição, remoção ou marcação 
   como concluído). Converte o array atualizado para string via JSON.stringify 
   e grava no AsyncStorage. A flag 'carregouInicial' impede a sobrescrita do 
   banco local no momento exato em que o app é aberto.


4. ESTRUTURA DOS ARQUIVOS E COMPONENTES
--------------------------------------------------------------------------------
- labels.js: Centraliza todos os textos e rótulos da interface utilizando 
  exportações nomeadas (tituloApp, placeholderCompromisso, botaoAdicionar, 
  tituloLista, listaVazia).

- components/CompromissoInput.js: Isola o formulário de cadastro utilizando 
  TextInput e Pressable dispostos em linha (flexDirection: 'row') com 
  dimensões percentuais (70% e 27%).

- components/CompromissoList.js: Gerencia a exibição dos itens utilizando 
  FlatList, controlando a exclusão (.filter) e a alteração de status de 
  conclusão.


5. DESAFIOS OPCIONAIS IMPLEMENTADOS
--------------------------------------------------------------------------------
- O2: Marcar compromisso como concluído com feedback visual de texto riscado 
  (line-through) no próprio item.
- O3: Contador dinâmico no cabeçalho exibindo a quantidade exata de itens 
  pendentes.
- O4: Utilização do FlatList nativo com tratamento visual e estrutural para 
  o estado vazio (ListEmptyComponent).
