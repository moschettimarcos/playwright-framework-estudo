# Guia de Debugging do Playwright

## Fase do Roadmap: Fase 9 - Debugging

Este documento explica as ferramentas de debugging disponíveis no Playwright.

---

## 1. UI Mode (Modo Interface Gráfica)

### O que é:
Interface gráfica interativa para executar, depurar e explorar testes.

### Por que usar:
- **Visualização em tempo real**: Veja testes executando
- **Inspeção de elementos**: Selecione elementos visualmente
- **Time travel**: Navegue pela execução passo a passo
- **Network monitoring**: Veja requests e responses
- **Console logs**: Veja logs do console
- **Screenshots**: Capturas automáticas
- **Trace viewer**: Rastreamento detalhado

### Como usar:
```bash
# Abre UI Mode
npx playwright test --ui

# Abre UI Mode com modo debug
npx playwright test --ui-mode=debug

# Abre UI Mode para arquivo específico
npx playwright test 01-navegacao.spec.js --ui

# Abre UI Mode para teste específico
npx playwright test -g "navegação básica" --ui
```

### Recursos do UI Mode:

#### 1. Lista de Testes
- Mostra todos os testes disponíveis
- Filtra por arquivo, status, texto
- Executa testes individualmente ou em grupo
- Mostra status (passed, failed, skipped)

#### 2. Visualização em Tempo Real
- Veja o navegador executando
- Inspeção de elementos (click para selecionar)
- Console logs integrados
- Network requests visíveis

#### 3. Time Travel
- Navegue pela execução
- Veja cada ação passo a passo
- Screenshots de cada passo
- Timeline de eventos

#### 4. Inspect
- Clique em elementos para ver seletores
- Veja propriedades do elemento
- Teste seletores em tempo real
- Copie seletores para código

#### 5. Trace Viewer
- Abre trace de execução
- Timeline detalhada
- Network requests
- Console logs
- Screenshots

### Quando usar:
- Desenvolvimento de novos testes
- Debugging de testes falhando
- Exploração da aplicação
- Aprendizado de Playwright
- Inspeção de seletores

### Vantagens:
+ Interface visual intuitiva
+ Time travel poderoso
+ Inspeção de elementos fácil
+ Network monitoring integrado
+ Console logs visíveis

### Desvantagens:
- Requer execução interativa
- Não ideal para CI/CD
- Mais lento que execução headless

---

## 2. Debug Mode (Modo Debug)

### O que é:
Modo interativo que pausa execução em cada passo para inspeção.

### Por que usar:
- **Execução passo a passo**: Pausa em cada ação
- **Inspeção de estado**: Veja estado da página
- **Console interativo**: Execute código JavaScript
- **Breakpoints**: Pausa em pontos específicos
- **Variáveis**: Veja valores de variáveis

### Como usar:
```bash
# Executa em modo debug
npx playwright test --debug

# Debug arquivo específico
npx playwright test 01-navegacao.spec.js --debug

# Debug teste específico
npx playwright test -g "navegação básica" --debug

# Debug com linha específica
npx playwright test --debug --line=10
```

### Recursos do Debug Mode:

#### 1. Pausa Automática
- Pausa antes de cada ação
- Mostra próxima ação a executar
- Permite inspeção antes de continuar

#### 2. Console Interativo
- Execute código JavaScript
- Acesse variáveis do teste
- Teste seletores
- Manipule a página

#### 3. Inspect
- Selecione elementos visualmente
- Veja seletores
- Teste locators

#### 4. Step Over
- Executa próxima ação
- Pausa após ação
- Continua debugging

#### 5. Resume
- Continua execução sem pausas
- Útil para pular seções

### Quando usar:
- Debugging de testes complexos
- Entender fluxo de execução
- Testar seletores
- Investigar estado da página
- Aprender Playwright

### Vantagens:
+ Controle total da execução
+ Console interativo poderoso
+ Inspeção detalhada
+ Aprender conceitos

### Desvantagens:
- Execução mais lenta
- Requer interação constante
- Não ideal para muitos testes

---

## 3. PWDEBUG

### O que é:
Variável de ambiente que habilita debugging global.

### Por que usar:
- **Debugging em CI**: Habilita debug em ambientes de CI
- **Configuração global**: Afeta toda execução
- **Integração com IDE**: Funciona com debuggers de IDE

### Como usar:
```bash
# Habilita PWDEBUG
PWDEBUG=1 npx playwright test

# No Windows (PowerShell)
$env:PWDEBUG=1; npx playwright test

# No Windows (CMD)
set PWDEBUG=1
npx playwright test

# No Linux/Mac
export PWDEBUG=1
npx playwright test
```

### Níveis de PWDEBUG:

#### PWDEBUG=0 (Desabilitado)
- Execução normal
- Sem debugging
- Padrão

#### PWDEBUG=1 (Habilitado)
- Modo debug habilitado
- Pausa em cada passo
- Similar a --debug

#### PWDEBUG=console (Console Only)
- Logs detalhados no console
- Sem pausas
- Útil para CI

### Quando usar:
- Debugging em CI/CD
- Execução com logs detalhados
- Integração com IDE
- Troubleshooting

---

## 4. Trace Viewer

### O que é:
Ferramenta para visualizar traces detalhados de execução de testes.

### Por que usar:
- **Rastreamento completo**: Timeline de toda execução
- **Network requests**: Veja todas as requisições
- **Console logs**: Logs do navegador
- **Screenshots**: Capturas de cada passo
- **Timeline**: Visualização temporal
- **Debugging offline**: Analisa traces sem executar

### Como configurar:
```javascript
// No playwright.config.js
use: {
  trace: 'on'  // 'on', 'off', 'retain-on-failure', 'retain-on-first-failure'
}
```

### Como usar:
```bash
# Abre trace viewer
npx playwright show-trace trace.zip

# Abre trace específico
npx playwright show-trace traces/trace.zip

# Abre último trace
npx playwright show-trace
```

### Recursos do Trace Viewer:

#### 1. Timeline
- Visualização temporal da execução
- Cada ação como evento na timeline
- Sobreposição de eventos
- Duração de cada ação

#### 2. Network
- Lista de todas as requisições
- Status codes
- Headers
- Response body
- Timing

#### 3. Console
- Console logs do navegador
- Errors
- Warnings
- Info logs

#### 4. Screenshots
- Capturas de cada passo
- Antes e depois de ações
- Screenshots de falha
- Full page ou viewport

#### 5. Before/After
- Estado antes da ação
- Estado após a ação
- DOM diff
- Mudanças visuais

#### 6. Call Stack
- Stack trace de ações
- Origem de cada ação
- Navegação pelo código

### Quando usar:
- Debugging de falhas
- Análise de performance
- Investigação de network
- Análise offline
- Compartilhamento de problemas

### Vantagens:
+ Informação completa
+ Análise offline
+ Compartilhável
+ Timeline detalhada
+ Network completo

### Desvantagens:
- Arquivos podem ser grandes
- Requer configuração
- Mais overhead na execução

---

## 5. VS Code Debugger

### O que é:
Integração nativa com o debugger do VS Code.

### Por que usar:
- **Debugging no IDE**: Use ferramentas do VS Code
- **Breakpoints**: Defina breakpoints no código
- **Variáveis**: Veja valores de variáveis
- **Call Stack**: Navegue pela stack
- **Watch**: Monitore expressões

### Como configurar:
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Playwright",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/playwright",
      "args": ["test", "--debug"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Como usar:
1. Abra arquivo de teste no VS Code
2. Clique na margem para adicionar breakpoint
3. Pressione F5 ou clique em "Run and Debug"
4. Use controles de debugging (step over, step into, continue)

### Recursos:
- Breakpoints no código
- Inspeção de variáveis
- Watch expressions
- Call stack
- Console integrado
- Debugging passo a passo

### Quando usar:
- Desenvolvimento no VS Code
- Debugging complexo
- Análise de variáveis
- Debugging de código customizado

---

## 6. Headless vs Headed

### Headless (Sem Interface)
```bash
# Executa sem interface (padrão)
npx playwright test

# Explicitamente headless
npx playwright test --headed=false
```

**Quando usar:**
- CI/CD
- Execução rápida
- Múltiplos testes
- Servidores sem display

**Vantagens:**
+ Mais rápido
+ Menos recursos
+ Ideal para CI/CD

**Desvantagens:**
- Não veja execução
- Dificulta debugging

### Headed (Com Interface)
```bash
# Executa com interface
npx playwright test --headed

# Executa com navegador visível
npx playwright test --headed
```

**Quando usar:**
- Debugging
- Desenvolvimento
- Visualização
- Aprendizado

**Vantagens:**
+ Veja execução
+ Facilita debugging
+ Visualização real

**Desvantagens:**
- Mais lento
- Requer display
- Mais recursos

---

## 7. Screenshots e Videos

### Screenshots
```javascript
// No playwright.config.js
use: {
  screenshot: 'only-on-failure'  // 'on', 'off', 'only-on-failure'
}
```

### Videos
```javascript
// No playwright.config.js
use: {
  video: 'retain-on-failure'  // 'on', 'off', 'retain-on-failure'
}
```

### Quando usar:
- Evidência de falhas
- Debugging visual
- Documentação
- Análise de comportamento

---

## Estratégias de Debugging

### 1. Debugging de Testes Falhando

#### Passo 1: Reproduzir localmente
```bash
# Execute o teste específico
npx playwright test -g "nome do teste"
```

#### Passo 2: Use UI Mode
```bash
# Abre UI Mode para visualizar
npx playwright test -g "nome do teste" --ui
```

#### Passo 3: Use Debug Mode
```bash
# Executa em modo debug
npx playwright test -g "nome do teste" --debug
```

#### Passo 4: Analise Trace
```bash
# Abre trace da falha
npx playwright show-trace traces/trace.zip
```

### 2. Debugging de Seletores

#### Use UI Mode Inspect
```bash
npx playwright test --ui
```
- Clique em "Inspect"
- Selecione elemento na página
- Veja seletores sugeridos
- Copie para código

#### Use Debug Mode
```bash
npx playwright test --debug
```
- Use console interativo
- Teste seletores
- Veja resultados

### 3. Debugging de Network

#### Use Trace Viewer
```bash
npx playwright show-trace trace.zip
```
- Aba "Network"
- Veja todas as requests
- Analise responses
- Verifique timing

#### Use UI Mode
```bash
npx playwright test --ui
```
- Aba "Network"
- Veja requests em tempo real
- Analise headers e responses

### 4. Debugging de Performance

#### Use Trace Viewer
```bash
npx playwright show-trace trace.zip
```
- Timeline de eventos
- Duração de ações
- Network timing
- Identifique gargalos

---

## Boas Práticas

### 1. Desenvolvimento
- Use UI Mode para desenvolvimento
- Use Debug Mode para problemas complexos
- Use headed mode para visualização
- Configure trace: 'on' para debugging

### 2. CI/CD
- Use headless mode
- Configure trace: 'retain-on-failure'
- Configure screenshot: 'only-on-failure'
- Configure video: 'retain-on-failure'
- Use PWDEBUG=console para logs

### 3. Debugging
- Comece com UI Mode
- Use Debug Mode para detalhes
- Analise traces de falhas
- Use VS Code debugger para código customizado
- Compartilhe traces com equipe

### 4. Performance
- Use headless para execução rápida
- Desabilite traces em produção
- Limpe traces antigos
- Use workers paralelos

---

## Resumo

| Ferramenta | Uso Principal | Quando Usar |
|------------|---------------|-------------|
| UI Mode | Desenvolvimento visual | Criar testes, debugging inicial |
| Debug Mode | Execução passo a passo | Debugging complexo |
| PWDEBUG | Debugging global | CI/CD, IDE integration |
| Trace Viewer | Análise detalhada | Debugging de falhas, performance |
| VS Code Debugger | Debugging no IDE | Código customizado |
| Headless | Execução rápida | CI/CD, múltiplos testes |
| Headed | Visualização | Debugging, desenvolvimento |

**Regra de ouro**: "Use UI Mode para desenvolvimento e debugging inicial. Use Debug Mode para problemas complexos. Use Trace Viewer para análise de falhas. Configure apropriadamente para CI/CD (headless, traces apenas em falha)."
