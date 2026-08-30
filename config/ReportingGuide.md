# Guia de Configuração de Reports do Playwright

## Fase do Roadmap: Fase 8 - Reporting

Este documento explica em detalhes como configurar e usar os reports do Playwright.

---

## O que são Reports

### Definição:
Reports são saídas formatadas dos resultados dos testes que facilitam a análise e comunicação dos resultados.

### Por que usar Reports:
- **Visualização clara**: Resultados organizados e fáceis de entender
- **Evidências**: Screenshots, vídeos e traces integrados
- **Histórico**: Mantém registro das execuções
- **Compartilhamento**: Fácil de compartilhar com a equipe
- **Debugging**: Informações detalhadas para análise de falhas
- **Métricas**: Estatísticas de execução

---

## Tipos de Reporters

### 1. HTML Reporter

#### O que é:
Gera um relatório HTML interativo com informações detalhadas dos testes.

#### Características:
- Interface visual amigável
- Screenshots e vídeos integrados
- Filtros e busca
- Timeline de execução
- Detalhes de cada teste
- Estatísticas

#### Como configurar:
```javascript
// No playwright.config.js
reporter: [
  ['html', {
    outputFolder: './reports/html-report',
    open: 'never'  // 'never', 'always', 'on-failure'
  }]
]
```

#### Opções de configuração:
- `outputFolder`: Diretório onde o report será salvo
- `open`: Quando abrir o report ('never', 'always', 'on-failure')
- `host`: Host para servir o report (quando usando modo server)
- `port`: Porta para servir o report

#### Como visualizar:
```bash
# Abre o report após execução
npx playwright show-report

# Abre report específico
npx playwright show-report ./reports/html-report
```

#### Quando usar:
- Execuções locais
- Análise detalhada de falhas
- Apresentação para stakeholders
- Debugging interativo
- Revisão de testes

#### Vantagens:
+ Interface rica e interativa
+ Screenshots e vídeos integrados
+ Fácil navegação
+ Detalhes completos
+ Filtros e busca

#### Desvantagens:
- Arquivo HTML pode ser grande
- Requer navegador para visualizar
- Não ideal para CI/CD automático

---

### 2. List Reporter

#### O que é:
Mostra os resultados em formato de lista no console.

#### Características:
- Saída no terminal
- Compacto e direto
- Status de cada teste
- Tempo de execução
- Ideal para CI/CD

#### Como configurar:
```javascript
// No playwright.config.js
reporter: [
  ['list']
]
```

#### Como usar:
```bash
# Executa com list reporter (padrão)
npx playwright test

# Saída no console
✓ 01-navegacao.spec.js:3:1 › navegação básica (2.1s)
✓ 01-navegacao.spec.js:15:1 › navegação com timeout (1.8s)
✗ 01-navegacao.spec.js:27:1 › navegação com erro (0.5s)
```

#### Quando usar:
- Execuções rápidas
- CI/CD pipelines
- Desenvolvimento
- Verificação rápida

#### Vantagens:
+ Saída rápida e direta
+ Sem arquivos extras
+ Ideal para CI/CD
+ Fácil de ler

#### Desvantagens:
- Sem interface visual
- Sem screenshots integrados
- Limitado em detalhes

---

### 3. Line Reporter

#### O que é:
Mostra uma linha por teste com status compacto.

#### Como configurar:
```javascript
reporter: [
  ['line']
]
```

#### Saída:
```
Running 3 tests using 1 worker

✓  [chromium] › 01-navegacao.spec.js:3:1 (2.1s)
✓  [chromium] › 01-navegacao.spec.js:15:1 (1.8s)
✗  [chromium] › 01-navegacao.spec.js:27:1 (0.5s)

  2 passed, 1 failed
```

#### Quando usar:
- Execuções com muitos testes
- Saída compacta
- CI/CD

---

### 4. Dot Reporter

#### O que é:
Mostra apenas um ponto por teste, muito compacto.

#### Como configurar:
```javascript
reporter: [
  ['dot']
]
```

#### Saída:
```
Running 3 tests using 1 worker

..✓

  2 passed, 1 failed
```

#### Quando usar:
- Muitos testes
- Saída mínima
- CI/CD com muitos testes

---

### 5. JUnit Reporter

#### O que é:
Gera XML no formato JUnit, compatível com muitas ferramentas de CI/CD.

#### Como configurar:
```javascript
reporter: [
  ['junit', { outputFile: './reports/junit-results.xml' }]
]
```

#### Quando usar:
- Integração com CI/CD
- Ferramentas que leem JUnit XML
- Jenkins, GitLab CI, Azure DevOps
- Geração de métricas

#### Vantagens:
+ Padrão de indústria
+ Compatível com muitas ferramentas
+ Integração fácil com CI/CD

---

### 6. JSON Reporter

#### O que é:
Gera resultados em formato JSON para processamento programático.

#### Como configurar:
```javascript
reporter: [
  ['json', { outputFile: './reports/results.json' }]
]
```

#### Quando usar:
- Processamento de dados
- Integração customizada
- Análise de métricas
- Geração de relatórios customizados

---

## Múltiplos Reporters

### Por que usar múltiplos reporters:
- **HTML**: Para análise detalhada local
- **List**: Para saída no console
- **JUnit**: Para integração CI/CD
- **JSON**: Para processamento de dados

### Como configurar:
```javascript
reporter: [
  ['html', { outputFolder: './reports/html-report', open: 'never' }],
  ['list'],
  ['junit', { outputFile: './reports/junit-results.xml' }]
]
```

### Execução:
```bash
# Todos os reporters são gerados automaticamente
npx playwright test

# HTML report em ./reports/html-report
# List report no console
# JUnit report em ./reports/junit-results.xml
```

---

## Configuração Avançada

### Reporter Customizado

#### Por que criar reporter customizado:
- Formato específico da empresa
- Integração com sistema interno
- Formatação especial
- Envio automático de resultados

#### Como criar:
```javascript
// custom-reporter.js
class CustomReporter {
  onBegin(config, suite) {
    console.log(`Iniciando execução: ${suite.allTests().length} testes`);
  }

  onTestBegin(test) {
    console.log(`Iniciando: ${test.title}`);
  }

  onTestEnd(test, result) {
    console.log(`Finalizado: ${test.title} - ${result.status}`);
  }

  onEnd(result) {
    console.log(`Execução finalizada: ${result.status}`);
  }
}

module.exports = CustomReporter;
```

#### Como usar:
```javascript
// No playwright.config.js
const CustomReporter = require('./custom-reporter');

reporter: [
  [new CustomReporter()]
]
```

---

## Análise de Reports

### HTML Reporter Features

#### 1. Visão Geral
- Status dos testes (passed, failed, skipped)
- Tempo total de execução
- Número de workers
- Estatísticas por navegador/dispositivo

#### 2. Detalhes do Teste
- Passo a passo da execução
- Screenshots de falha
- Vídeo da execução
- Trace viewer
- Console logs
- Network requests

#### 3. Filtros
- Filtrar por status
- Filtrar por navegador
- Filtrar por projeto
- Busca por texto

#### 4. Timeline
- Visualização temporal
- Sobreposição de testes
- Identificação de gargalos

---

## Integração com CI/CD

### GitHub Actions

#### Configurar JUnit reporter:
```javascript
reporter: [
  ['html'],
  ['junit', { outputFile: './reports/junit-results.xml' }]
]
```

#### Publicar HTML report:
```yaml
- name: Upload HTML Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

#### Publicar test results:
```yaml
- name: Publish Test Results
  if: always()
  uses: EnricoMi/publish-unit-test-result-action@v2
  with:
    files: reports/junit-results.xml
```

---

## Boas Práticas

### 1. Escolha do Reporter
- **Desenvolvimento**: HTML + List
- **CI/CD**: JUnit + List
- **Análise**: HTML
- **Integração**: JSON ou customizado

### 2. Configuração de Output
- Use diretórios separados para cada tipo de report
- Limpe reports antigos periodicamente
- Versione apenas configuração, não os reports

### 3. Performance
- HTML reporter pode ser pesado para muitos testes
- Use Dot reporter para execuções massivas
- Considere desabilitar screenshots em CI

### 4. Compartilhamento
- HTML reports podem ser compartilhados via link
- Use serviços de hosting para reports
- Configure permissões apropriadas

### 5. Manutenção
- Atualize reporters com versões do Playwright
- Teste configuração de reporters
- Documente reporters customizados

---

## Troubleshooting

### Report não é gerado
- Verifique configuração no playwright.config.js
- Confirme permissões de escrita no diretório
- Verifique se há erros na execução

### HTML report não abre
- Verifique se o arquivo existe
- Confirme que o navegador está instalado
- Use `npx playwright show-report` para abrir

### JUnit XML vazio
- Verifique se testes foram executados
- Confirme caminho do outputFile
- Valide permissões de escrita

---

## Resumo

| Reporter | Uso Principal | Vantagens | Desvantagens |
|----------|---------------|-----------|--------------|
| HTML | Análise detalhada | Interface rica, screenshots integrados | Arquivo grande |
| List | Console/CI/CD | Rápido, direto | Sem interface visual |
| Line | Muitos testes | Compacto | Poucos detalhes |
| Dot | Execução massiva | Mínimo | Muito resumido |
| JUnit | CI/CD | Padrão, integração | Requer ferramenta compatível |
| JSON | Processamento | Flexível | Requer processamento |

**Regra de ouro**: "Use múltiplos reporters para diferentes propósitos. HTML para análise detalhada, JUnit para CI/CD, List para console. Configure de acordo com seu ambiente e necessidades."
