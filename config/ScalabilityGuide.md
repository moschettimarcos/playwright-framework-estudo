# Guia de Escalabilidade do Playwright

## Fase do Roadmap: Fase 10 - Scalability

Este documento explica como escalar testes Playwright para grandes projetos.

---

## 1. Paralelismo (Parallelism)

### O que é:
Execução simultânea de múltiplos testes em paralelo usando workers.

### Por que usar:
- **Redução de tempo**: Testes executam muito mais rápido
- **Aproveitamento de recursos**: Usa múltiplos núcleos da CPU
- **Escalabilidade**: Mais testes não significa muito mais tempo
- **CI/CD eficiente**: Pipelines mais rápidos

### Como configurar:
```javascript
// No playwright.config.js
module.exports = defineConfig({
  workers: 4,  // Número fixo de workers
  // ou
  workers: '50%',  // 50% dos núcleos disponíveis
  // ou
  workers: process.env.CI ? 2 : 4,  // Diferente por ambiente
});
```

### Estratégias de Workers:

#### 1. Número Fixo
```javascript
workers: 4
```
- **Quando usar**: Máquinas com recursos conhecidos
- **Vantagens**: Previsível, controlado
- **Desvantagens**: Não se adapta a diferentes máquinas

#### 2. Porcentagem de Núcleos
```javascript
workers: '50%'
```
- **Quando usar**: Máquinas variáveis
- **Vantagens**: Adapta-se à máquina
- **Desvantagens**: Pode variar muito

#### 3. Ambiente-aware
```javascript
workers: process.env.CI ? '50%' : 1
```
- **Quando usar**: Diferentes estratégias por ambiente
- **Vantagens**: Otimizado para cada ambiente
- **Desvantagens**: Mais complexo

#### 4. Sem Limite
```javascript
workers: undefined  // Usa todos os núcleos
```
- **Quando usar**: Máquina dedicada
- **Vantagens**: Máximo performance
- **Desvantagens**: Pode sobrecarregar

### Como executar:
```bash
# Usa configuração do config
npx playwright test

# Override workers na linha de comando
npx playwright test --workers=4

# Executa sem paralelismo
npx playwright test --workers=1
```

### Boas Práticas:
- Use 1 worker para debugging
- Use múltiplos workers para CI/CD
- Monitore uso de recursos
- Ajuste conforme necessário
- Teste diferentes configurações

---

## 2. Retries (Tentativas)

### O que é:
Reexecução automática de testes que falharam.

### Por que usar:
- **Testes flaky**: Testes que falham intermitentemente
- **Instabilidade de rede**: Conexões que às vezes falham
- **Timing issues**: Race conditions ocasionais
- **CI/CD confiável**: Elimina falhas intermitentes em pipelines

### Como configurar:
```javascript
// No playwright.config.js
module.exports = defineConfig({
  retries: 2,  // Número de retries
  // ou
  retries: process.env.CI ? 2 : 0,  // Diferente por ambiente
});
```

### Estratégias de Retries:

#### 1. Sem Retries (Desenvolvimento)
```javascript
retries: 0
```
- **Quando usar**: Desenvolvimento local
- **Por que**: Falhas são imediatamente visíveis
- **Vantagens**: Debugging rápido
- **Desvantagens**: Não lida com flaky tests

#### 2. Com Retries (CI/CD)
```javascript
retries: 2
```
- **Quando usar**: Ambiente de CI/CD
- **Por que**: Elimina falhas intermitentes
- **Vantagens**: Pipelines mais estáveis
- **Desvantagens**: Pode mascarar problemas

#### 3. Retries Condicionais
```javascript
retries: process.env.CI ? 2 : 0
```
- **Quando usar**: Diferentes estratégias por ambiente
- **Por que**: Debugging rápido em dev, estabilidade em CI
- **Vantagens**: Melhor de ambos os mundos
- **Desvantagens**: Comportamento diferente entre ambientes

#### 4. Retries por Projeto
```javascript
projects: [
  {
    name: 'stable-tests',
    use: { retries: 0 },
  },
  {
    name: 'flaky-tests',
    use: { retries: 3 },
  }
]
```
- **Quando usar**: Testes com diferentes níveis de estabilidade
- **Por que**: Ajusta retries por tipo de teste
- **Vantagens**: Configuração granular
- **Desvantagens**: Mais complexo

### Como executar:
```bash
# Usa configuração do config
npx playwright test

# Override retries na linha de comando
npx playwright test --retries=3

# Executa sem retries
npx playwright test --retries=0
```

### Boas Práticas:
- Use retries apenas quando necessário
- Investigue causa de flaky tests
- Não use retries como solução permanente
- Documente por que um teste precisa de retries
- Monitore taxa de sucesso com retries

---

## 3. Sharding (Fragmentação)

### O que é:
Divisão de testes em grupos (shards) para execução distribuída.

### Por que usar:
- **Distribuição de carga**: Executa testes em múltiplas máquinas
- **Redução de tempo**: Testes distribuídos executam mais rápido
- **Escalabilidade horizontal**: Adicione mais máquinas para mais velocidade
- **CI/CD eficiente**: Pipelines paralelos

### Como configurar:
```bash
# Executa shard específico
npx playwright test --shard=1/3

# Executa todos os shards em paralelo
npx playwright test --shard=1/3 &
npx playwright test --shard=2/3 &
npx playwright test --shard=3/3 &
```

### Como funciona:
- `--shard=1/3`: Primeiro terço dos testes
- `--shard=2/3`: Segundo terço dos testes
- `--shard=3/3`: Terceiro terço dos testes

### Exemplo com GitHub Actions:
```yaml
jobs:
  test:
    strategy:
      matrix:
        shard: [1/3, 2/3, 3/3]
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test --shard=${{ matrix.shard }}
```

### Boas Práticas:
- Balanceie shards igualmente
- Use sharding para grandes suítes de testes
- Combine com paralelismo
- Monitore tempo de cada shard
- Ajuste número de shards conforme necessário

---

## 4. Projetos Paralelos

### O que é:
Execução de diferentes projetos (navegadores, dispositivos) em paralelo.

### Como configurar:
```javascript
// No playwright.config.js
module.exports = defineConfig({
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
  ],
  fullyParallel: true,  // Executa projetos em paralelo
});
```

### Como executar:
```bash
# Executa todos os projetos em paralelo
npx playwright test

# Executa projeto específico
npx playwright test --project=chromium

# Executa múltiplos projetos
npx playwright test --project=chromium --project=firefox
```

### Boas Práticas:
- Use fullyParallel para máxima performance
- Execute projetos críticos em todos os navegadores
- Execute smoke tests em todos os projetos
- Use workers paralelos com projetos

---

## 5. Otimização de Performance

### 1. Reduza Overhead

#### Desabilite Recursos Pesados
```javascript
use: {
  // Desabilite em produção
  trace: 'off',
  video: 'off',
  screenshot: 'off',
  
  // Habilite apenas em falha
  // trace: 'retain-on-failure',
  // video: 'retain-on-failure',
  // screenshot: 'only-on-failure',
}
```

#### Use Headless Mode
```javascript
use: {
  headless: true,  // Mais rápido que headed
}
```

### 2. Otimize Testes

#### Evite Waits Desnecessários
```javascript
// RUIM: waitForTimeout
await page.waitForTimeout(5000);

// BOM: Use waits específicos
await page.waitForSelector('.element');
await page.waitForURL('**/success');
```

#### Reutilize Contextos
```javascript
// RUIM: Cria novo contexto para cada teste
test('teste 1', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // ...
});

// BOM: Usa contexto compartilhado
test.describe('com contexto compartilhado', () => {
  let context;
  let page;
  
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });
  
  test.afterAll(async () => {
    await context.close();
  });
});
```

### 3. Organize Testes

#### Separe Testes por Tipo
```javascript
// Smoke tests (rápidos, críticos)
tests/smoke/

// Regression tests (completos)
tests/regression/

// E2E tests (lentos, completos)
tests/e2e/
```

#### Execute Testes por Prioridade
```bash
# Smoke tests primeiro
npx playwright test tests/smoke/

# Depois regression
npx playwright test tests/regression/

# E2E apenas quando necessário
npx playwright test tests/e2e/
```

### 4. Use Caching

#### Cache de Dependências
```yaml
# GitHub Actions
- uses: actions/setup-node@v4
  with:
    cache: 'npm'
```

#### Cache de Navegadores
```bash
# Playwright já cacheia navegadores
# Não precisa configurar
```

---

## 6. Estratégias de Escalabilidade

### 1. Pequenos Projetos (< 100 testes)
- **Workers**: 2-4
- **Retries**: 0 (dev), 1 (CI)
- **Sharding**: Não necessário
- **Projetos**: 1-2 navegadores

### 2. Médios Projetos (100-500 testes)
- **Workers**: 4-8
- **Retries**: 1 (dev), 2 (CI)
- **Sharding**: Opcional
- **Projetos**: 2-3 navegadores

### 3. Grandes Projetos (500-1000 testes)
- **Workers**: 8-16
- **Retries**: 1 (dev), 2 (CI)
- **Sharding**: Recomendado (3-5 shards)
- **Projetos**: 3-5 navegadores/dispositivos

### 4. Projetos Massivos (> 1000 testes)
- **Workers**: 16+ ou sharding
- **Retries**: 2 (dev), 3 (CI)
- **Sharding**: Necessário (5+ shards)
- **Projetos**: 5+ configurações
- **Distribuição**: Múltiplas máquinas

---

## 7. Monitoramento e Métricas

### 1. Tempo de Execução
```bash
# Mede tempo de execução
time npx playwright test
```

### 2. Taxa de Sucesso
```javascript
// Use reporter para coletar métricas
reporter: [
  ['json', { outputFile: './reports/results.json' }]
]
```

### 3. Flaky Test Detection
```bash
# Identifica testes que falham intermitentemente
npx playwright test --reporter=github
```

### 4. Resource Usage
```javascript
// Monitora uso de CPU e memória
// Use ferramentas do sistema ou CI/CD
```

---

## 8. Troubleshooting

### Testes Muito Lentos
- Aumente workers
- Verifique waits desnecessários
- Desabilite traces/videos
- Use headless mode
- Otimize código de teste

### Falhas de Memória
- Reduza workers
- Limpe contextos após uso
- Desabilite recursos pesados
- Use sharding para distribuir

### Testes Flaky
- Adicione retries temporariamente
- Investigue causa raiz
- Use waits específicos
- Verifique race conditions
- Melhore seletores

### Workers Não Funcionam
- Verifique se testes são independentes
- Remova dependência entre testes
- Use beforeAll/afterAll para setup compartilhado
- Verifique uso de recursos globais

---

## Resumo

| Técnica | Uso Principal | Configuração | Quando Usar |
|----------|---------------|--------------|-------------|
| Workers | Paralelismo | `workers: 4` | Sempre para performance |
| Retries | Estabilidade | `retries: 2` | Testes flaky, CI/CD |
| Sharding | Distribuição | `--shard=1/3` | Grandes suítes, múltiplas máquinas |
| Projetos | Multi-config | `projects: [...]` | Cross-browser, cross-device |
| Headless | Performance | `headless: true` | CI/CD, execução rápida |
| Caching | Velocidade | `cache: 'npm'` | CI/CD, instalação |

**Regra de ouro**: "Use paralelismo (workers) sempre que possível. Adicione retries apenas para testes flaky. Use sharding para distribuir carga em múltiplas máquinas. Otimize testes para reduzir overhead. Monitore métricas para identificar gargalos."
