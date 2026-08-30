# Guia de Configuração Avançada do Playwright

## Fase do Roadmap: Fase 5 - Arquitetura de Framework

Este documento explica em detalhes as configurações avançadas do Playwright no arquivo `playwright.config.js`.

---

## baseURL

### O que é:
URL base que é usada como prefixo para todas as navegações.

### Por que usar:
- **Centraliza a URL**: Muda em um lugar, afeta todo o projeto
- **Facilita mudança de ambiente**: Dev, Staging, Production
- **Testes mais limpos**: Usa caminhos relativos em vez de URLs completas
- **Evita duplicação**: Não repete a URL em cada teste

### Como usar:
```javascript
// No playwright.config.js
baseURL: 'https://demoqa.com',

// Nos testes
await page.goto('/text-box');  // Navega para https://demoqa.com/text-box
await page.goto('/elements');   // Navega para https://demoqa.com/elements
```

### Quando NÃO usar:
- Quando os testes usam URLs completamente diferentes
- Quando precisa testar múltiplos domínios no mesmo teste

---

## timeout

### O que é:
Tempo máximo que o Playwright espera por uma operação completar antes de falhar.

### Tipos de timeout:

#### 1. actionTimeout
**Tempo para ações** (click, fill, type, etc.)
- **Padrão**: 30 segundos
- **Quando ajustar**: Páginas lentas, animações longas
- **Exemplo**:
```javascript
use: {
  actionTimeout: 60000  // 60 segundos para ações
}
```

#### 2. navigationTimeout
**Tempo para navegação** (page.goto)
- **Padrão**: 30 segundos
- **Quando ajustar**: Páginas pesadas, carregamento lento
- **Exemplo**:
```javascript
use: {
  navigationTimeout: 60000  // 60 segundos para navegação
}
```

#### 3. timeout geral
**Timeout padrão para testes**
- **Padrão**: 30 segundos
- **Quando ajustar**: Testes complexos que levam mais tempo
- **Exemplo**:
```javascript
timeout: 60000  // 60 segundos para cada teste
```

### Por que configurar timeouts:
- **Evita falhas prematuras**: Testes não falham por serem um pouco lentos
- **Adapta ao ambiente**: Máquinas mais lentas precisam de mais tempo
- **Balanceia**: Não muito curto (falha rápido), não muito longo (espera demais)

### Boas práticas:
- Use o valor padrão quando possível
- Ajuste apenas quando necessário
- Documente por que aumentou o timeout
- Considere se o teste está muito lento (pode ser problema de performance)

---

## retries

### O que é:
Número de vezes que um teste falho é executado novamente antes de ser considerado falha definitiva.

### Por que usar:
- **Testes flaky**: Testes que falham intermitentemente
- **Instabilidade de rede**: Conexões que às vezes falham
- **Timing issues**: Race conditions ocasionais
- **CI/CD**: Ambientes de CI podem ter variações

### Como configurar:
```javascript
// No playwright.config.js
retries: process.env.CI ? 2 : 0,
```

### Estratégias de retry:

#### 1. Sem retries (Desenvolvimento)
```javascript
retries: 0
```
- **Quando usar**: Desenvolvimento local
- **Por que**: Falhas são imediatamente visíveis, facilita debugging

#### 2. Com retries (CI/CD)
```javascript
retries: 2
```
- **Quando usar**: Ambiente de CI/CD
- **Por que**: Elimina falhas intermitentes em pipelines

#### 3. Retries condicionais
```javascript
retries: process.env.CI ? 2 : 0
```
- **Quando usar**: Diferentes estratégias por ambiente
- **Por que**: Debugging rápido em dev, estabilidade em CI

### Cuidados:
- **Não abuse**: Muitos retries mascaram problemas reais
- **Investigue flaky tests**: Retries não são solução permanente
- **Documente**: Por que um teste precisa de retries

---

## workers

### O que é:
Número de processos paralelos que executam testes simultaneamente.

### Por que usar:
- **Performance**: Executa testes em paralelo, muito mais rápido
- **Recursos**: Aproveita múltiplos núcleos da CPU
- **Escalabilidade**: Mais testes não significa muito mais tempo

### Como configurar:
```javascript
// Número fixo de workers
workers: 4,

// Porcentagem dos núcleos
workers: '50%',

// Sem limite (usa todos os núcleos)
workers: undefined,
```

### Estratégias:

#### 1. Desenvolvimento (1 worker)
```javascript
workers: 1
```
- **Quando usar**: Debugging, desenvolvimento
- **Por que**: Output mais organizado, fácil de seguir

#### 2. CI/CD (50% dos núcleos)
```javascript
workers: process.env.CI ? '50%' : undefined
```
- **Quando usar**: Ambiente de CI
- **Por que**: Balanceia performance e uso de recursos

#### 3. Máximo performance
```javascript
workers: undefined
```
- **Quando usar**: Execução rápida local
- **Por que**: Usa todos os núcleos disponíveis

### Cuidados:
- **Recursos limitados**: Muitos workers podem sobrecar a máquina
- **Testes dependentes**: Não use paralelismo se testes dependem uns dos outros
- **Race conditions**: Paralelismo pode expor problemas de concorrência

---

## projects

### O que é:
Configurações para diferentes projetos (navegadores, dispositivos, ambientes).

### Por que usar:
- **Cross-browser**: Testa em múltiplos navegadores
- **Cross-device**: Testa em diferentes dispositivos
- **Ambientes diferentes**: Testa em dev, staging, production
- **Configurações específicas**: Cada projeto com suas configurações

### Como configurar:
```javascript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  }
]
```

### Tipos de projetos:

#### 1. Por navegador
```javascript
{
  name: 'chromium',
  use: { browserName: 'chromium' },
}
```

#### 2. Por dispositivo
```javascript
{
  name: 'Mobile Chrome',
  use: { ...devices['Pixel 5'] },
}
```

#### 3. Por viewport
```javascript
{
  name: 'Desktop HD',
  use: { viewport: { width: 1280, height: 720 } },
}
```

#### 4. Por locale
```javascript
{
  name: 'Português',
  use: { locale: 'pt-BR' },
}
```

#### 5. Por ambiente
```javascript
{
  name: 'Staging',
  use: { baseURL: 'https://staging.example.com' },
}
```

### Executar projeto específico:
```bash
npx playwright test --project=chromium
npx playwright test --project="Mobile Chrome"
```

---

## browserName

### O que é:
Define qual navegador usar para o projeto.

### Navegadores suportados:
- **chromium**: Base do Chrome, Edge, Opera
- **firefox**: Mozilla Firefox
- **webkit**: Base do Safari

### Como configurar:
```javascript
{
  name: 'firefox',
  use: { browserName: 'firefox' },
}
```

### Quando usar cada navegador:

#### Chromium
- **Mais popular**: Representa maioria dos usuários
- **Mais rápido**: Engine mais otimizada
- **Mais features**: Suporta mais APIs modernas

#### Firefox
- **Segunda maior base**: Importante para compatibilidade
- **Diferente engine**: Pode expor bugs específicos
- **Comunidade forte**: Ativo desenvolvimento

#### WebKit
- **Safari**: Necessário para compatibilidade Apple
- **iOS**: Base do Safari mobile
- **Mac**: Navegador padrão em Mac

### Estratégia de cross-browser:
- **Testes críticos**: Todos os navegadores
- **Testes rápidos**: Apenas Chromium
- **Smoke tests**: Todos os navegadores
- **Regression**: Todos os navegadores

---

## Configuração Combinada

### Exemplo completo:
```javascript
module.exports = defineConfig({
  // Configurações gerais
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? '50%' : undefined,
  
  // Configurações padrão
  use: {
    baseURL: 'https://demoqa.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 0,
    navigationTimeout: 0,
    viewport: { width: 1280, height: 720 },
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
  },
  
  // Projetos por navegador
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  
  // Relatórios
  reporter: [
    ['html', { outputFolder: './reports/html-report', open: 'never' }],
    ['list']
  ],
  
  // Output
  outputDir: './test-results',
});
```

---

## Boas Práticas de Configuração

### 1. Ambiente-aware
```javascript
// Use variáveis de ambiente para diferentes ambientes
baseURL: process.env.BASE_URL || 'https://demoqa.com',
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? '50%' : undefined,
```

### 2. Documentação
```javascript
// Documente configurações não óbvias
// Por que este timeout é maior?
// Por que este projeto tem configuração especial?
```

### 3. Valores padrão
```javascript
// Use valores padrão quando possível
// Não configure se não for necessário
```

### 4. Consistência
```javascript
// Mantenha configurações consistentes entre projetos
// Mesmos timeouts, mesmas estratégias
```

### 5. Versionamento
```javascript
// Documente versões importantes
// Playwright 1.40 mudou comportamento de X
```

---

## Troubleshooting

### Testes muito lentos
- Aumente workers
- Verifique se há waits desnecessários
- Considere paralelismo

### Testes flaky
- Adicione retries temporariamente
- Investigue causa raiz
- Use trace viewer para debugging

### Falhas em CI apenas
- Ajuste timeouts para CI
- Adicione retries para CI
- Verifique recursos da máquina CI

### Memory issues
- Reduza workers
- Execute projetos separadamente
- Limite testes por execução

---

## Resumo

| Configuração | Propósito | Valor Recomendado |
|--------------|-----------|-------------------|
| baseURL | Centraliza URL | URL do ambiente atual |
| timeout | Tempo máximo | Padrão (30s) ou ajustado conforme necessidade |
| retries | Testes flaky | 0 (dev), 2 (CI) |
| workers | Paralelismo | 1 (dev), 50% (CI) |
| projects | Multi-browser/dispositivo | Configurar conforme necessidade |
| browserName | Navegador específico | chromium, firefox, webkit |

**Regra de ouro**: Configure apenas o que é necessário. Valores padrão do Playwright são geralmente bons.
