// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Hooks (Ciclo de Vida)
 * 
 * Este arquivo demonstra o uso de hooks para controlar
 * o ciclo de vida dos testes em Playwright.
 * 
 * Fase do Roadmap: Fase 2 - Fundamentos da Automação
 * 
 * Conceitos abordados:
 * - beforeAll: Executa antes de todos os testes do describe
 * - afterAll: Executa após todos os testes do describe
 * - beforeEach: Executa antes de cada teste
 * - afterEach: Executa após cada teste
 * 
 * CICLO DE EXECUÇÃO:
 * 1. beforeAll (uma vez antes de todos os testes)
 * 2. beforeEach (antes de cada teste)
 * 3. teste
 * 4. afterEach (após cada teste)
 * 5. beforeEach (antes do próximo teste)
 * 6. próximo teste
 * 7. afterEach (após o próximo teste)
 * 8. ... (repete para cada teste)
 * 9. afterAll (uma vez após todos os testes)
 * 
 * POR QUE USAR HOOKS:
 * - Configuração compartilhada (setup)
 * - Limpeza compartilhada (teardown)
 * - Reduz código duplicado
 * - Isolamento entre testes
 * - Gerenciamento de recursos
 */

test.describe('Hooks - beforeAll e afterAll', () => {
  
  /**
   * beforeAll: Executa uma vez antes de todos os testes
   * 
   * Quando usar:
   * - Configuração que precisa ser feita uma vez
   * - Inicialização de recursos pesados
   * - Setup de banco de dados
   * - Criação de usuários/dados de teste
   * 
   * Características:
   * - Executa uma única vez
   * - Compartilhado entre todos os testes
   * - Se falhar, nenhum teste executa
   * 
   * Cuidados:
   * - Não deve deixar estado que afete outros testes
   - Se um teste modificar o estado, pode afetar outros
   */
  test.beforeAll(async () => {
    console.log('beforeAll: Executando configuração inicial');
    // Exemplos de uso:
    // - Criar banco de dados de teste
    // - Iniciar servidor local
    // - Criar usuários de teste
    // - Configurar variáveis de ambiente
  });

  /**
   * afterAll: Executa uma vez após todos os testes
   * 
   * Quando usar:
   * - Limpeza de recursos criados no beforeAll
   * - Fechar conexões
   * - Remover dados de teste
   * - Gerar relatórios
   * 
   * Características:
   * - Executa uma única vez
   * - Executa mesmo se testes falharem
   * - Útil para cleanup
   */
  test.afterAll(async () => {
    console.log('afterAll: Executando limpeza final');
    // Exemplos de uso:
    // - Remover banco de dados de teste
    // - Fechar servidor local
    // - Remover usuários de teste
    // - Limpar arquivos temporários
  });

  test('teste 1', async ({ page }) => {
    console.log('Executando teste 1');
    await page.goto('https://demoqa.com');
    await expect(page.locator('.banner-image')).toBeVisible();
  });

  test('teste 2', async ({ page }) => {
    console.log('Executando teste 2');
    await page.goto('https://demoqa.com');
    await expect(page.locator('.banner-image')).toBeVisible();
  });

  test('teste 3', async ({ page }) => {
    console.log('Executando teste 3');
    await page.goto('https://demoqa.com');
    await expect(page.locator('.banner-image')).toBeVisible();
  });
});

test.describe('Hooks - beforeEach e afterEach', () => {
  
  /**
   * beforeEach: Executa antes de cada teste
   * 
   * Quando usar:
   * - Configuração que precisa ser repetida
   * - Navegação para página inicial
   * - Reset de estado
   * - Login antes de cada teste
   * - Limpar cookies/localStorage
   * 
   * Características:
   * - Executa antes de CADA teste
   * - Garante estado limpo
   * - Isolamento entre testes
   * - Se falhar, o teste não executa
   * 
   * Vantagens:
   * + Cada teste começa com estado conhecido
   * + Isolamento entre testes
   * + Testes mais confiáveis
   */
  test.beforeEach(async ({ page }) => {
    console.log('beforeEach: Configurando antes do teste');
    // Exemplos de uso:
    // - Navegar para página inicial
    // - Fazer login
    // - Limpar cookies
    // - Limpar localStorage
    // - Resetar estado da aplicação
    
    await page.goto('https://demoqa.com');
  });

  /**
   * afterEach: Executa após cada teste
   * 
   * Quando usar:
   * - Limpeza após cada teste
   * - Capturar screenshot em caso de falha
   * - Limpar dados criados durante teste
   * - Logout após teste
   * - Coletar métricas
   * 
   * Características:
   * - Executa após CADA teste
   * - Executa mesmo se teste falhar
   * - Útil para cleanup e debugging
   */
  test.afterEach(async ({ page }) => {
    console.log('afterEach: Limpando após o teste');
    // Exemplos de uso:
    // - Capturar screenshot se falhou
    // - Limpar dados criados
    // - Fazer logout
    // - Limpar cookies
    // - Salvar logs
    
    // Exemplo: Capturar screenshot se teste falhou
    // if (test.info().status === 'failed') {
    //   await page.screenshot({ path: 'failure.png' });
    // }
  });

  test('teste com beforeEach', async ({ page }) => {
    console.log('Executando teste - já navegou para demoqa.com');
    // Já navegou para a página no beforeEach
    await expect(page.locator('.banner-image')).toBeVisible();
  });

  test('outro teste com beforeEach', async ({ page }) => {
    console.log('Executando outro teste - também navegou para demoqa.com');
    // Cada teste começa com navegação limpa
    await expect(page.locator('.banner-image')).toBeVisible();
  });
});

test.describe('Hooks - Combinação de Hooks', () => {
  
  /**
   * Exemplo: Usando todos os hooks juntos
   * 
   * Este exemplo demonstra o ciclo completo
   */
  test.beforeAll(async () => {
    console.log('beforeAll: Setup inicial (cria banco de teste)');
    // Cria banco de dados de teste
    // Inicia servidor
  });

  test.afterAll(async () => {
    console.log('afterAll: Cleanup final (remove banco de teste)');
    // Remove banco de dados de teste
    // Para servidor
  });

  test.beforeEach(async ({ page }) => {
    console.log('beforeEach: Navega para página e faz login');
    await page.goto('https://demoqa.com');
    // Faz login
  });

  test.afterEach(async ({ page }) => {
    console.log('afterEach: Faz logout e limpa dados');
    // Faz logout
    // Limpa dados criados durante teste
  });

  test('teste 1 - fluxo completo', async ({ page }) => {
    console.log('Teste 1: Executa com setup e cleanup');
    await expect(page.locator('.banner-image')).toBeVisible();
  });

  test('teste 2 - fluxo completo', async ({ page }) => {
    console.log('Teste 2: Executa com setup e cleanup');
    await expect(page.locator('.banner-image')).toBeVisible();
  });
});

test.describe('Hooks - Escopo Aninhado', () => {
  
  /**
   * Hooks aninhados: Hooks em describes aninhados
   * 
   * Quando usar:
   * - Configuração específica para grupo de testes
   * - Diferentes níveis de setup
   * - Organização lógica de testes
   * 
   * Ordem de execução:
   * 1. beforeAll do describe pai
   * 2. beforeAll do describe filho
   * 3. beforeEach do describe pai
   * 4. beforeEach do describe filho
   * 5. teste
   * 6. afterEach do describe filho
   * 7. afterEach do describe pai
   * 8. afterAll do describe filho
   * 9. afterAll do describe pai
   */
  test.beforeAll(async () => {
    console.log('beforeAll do describe pai');
  });

  test.afterAll(async () => {
    console.log('afterAll do describe pai');
  });

  test.beforeEach(async () => {
    console.log('beforeEach do describe pai');
  });

  test.afterEach(async () => {
    console.log('afterEach do describe pai');
  });

  test.describe('Grupo de testes filhos', () => {
    test.beforeAll(async () => {
      console.log('beforeAll do describe filho');
    });

    test.afterAll(async () => {
      console.log('afterAll do describe filho');
    });

    test.beforeEach(async () => {
      console.log('beforeEach do describe filho');
    });

    test.afterEach(async () => {
      console.log('afterEach do describe filho');
    });

    test('teste no grupo filho', async ({ page }) => {
      console.log('Teste no grupo filho');
      await page.goto('https://demoqa.com');
    });
  });
});

test.describe('Hooks - Casos de Uso Reais', () => {
  
  /**
   * Caso de uso 1: Login antes de cada teste
   */
  test.describe('Testes que requerem login', () => {
    test.beforeEach(async ({ page }) => {
      console.log('beforeEach: Fazendo login');
      await page.goto('https://demoqa.com/login');
      // await page.fill('#username', 'usuario');
      // await page.fill('#password', 'senha');
      // await page.click('#login-button');
    });

    test.afterEach(async ({ page }) => {
      console.log('afterEach: Fazendo logout');
      // await page.click('#logout-button');
    });

    test('teste após login', async ({ page }) => {
      // Já está logado
      await expect(page).toHaveURL(/demoqa/);
    });
  });

  /**
   * Caso de uso 2: Limpeza de dados após teste
   */
  test.describe('Testes que criam dados', () => {
    test.afterEach(async ({ page }) => {
      console.log('afterEach: Limpando dados criados');
      // Remove usuário criado durante teste
      // Limpa registros no banco
      // Deleta arquivos criados
    });

    test('cria usuário', async ({ page }) => {
      await page.goto('https://demoqa.com/text-box');
      await page.fill('#userName', 'João Silva');
      // Cria usuário...
    });
  });

  /**
   * Caso de uso 3: Screenshot em caso de falha
   */
  test.describe.skip('Testes com screenshot em falha', () => {
    test.afterEach(async ({ page }) => {
      // Captura screenshot se teste falhou
      if (test.info().status === 'failed') {
        const timestamp = new Date().toISOString();
        await page.screenshot({ 
          path: `screenshots/failure-${timestamp}.png` 
        });
      }
    });

    test('teste que pode falhar', async ({ page }) => {
      await page.goto('https://demoqa.com');
      // Se falhar, screenshot será capturado
      await expect(page.locator('#elemento-inexistente')).toBeVisible();
    });
  });

  /**
   * Caso de uso 4: Limpeza de cookies/storage
   */
  test.describe('Testes com limpeza de estado', () => {
    test.beforeEach(async ({ context }) => {
      console.log('beforeEach: Limpando cookies e storage');
      // Limpa cookies
      await context.clearCookies();
      
      // Limpa localStorage (navega para página primeiro)
      // await page.goto('https://demoqa.com');
      // await page.evaluate(() => localStorage.clear());
    });

    test('teste com estado limpo', async ({ page }) => {
      await page.goto('https://demoqa.com');
      // Estado está limpo
    });
  });
});

test.describe('Hooks - Boas Práticas', () => {
  
  /**
   * Boa prática 1: Manter hooks simples
   */
  test.beforeEach(async ({ page }) => {
    // ✅ BOM: Hook simples e claro
    await page.goto('https://demoqa.com');
    
    // ❌ RUIM: Hook complexo com muita lógica
    // await page.goto('https://demoqa.com');
    // await page.fill('#username', 'usuario');
    // await page.fill('#password', 'senha');
    // await page.click('#login');
    // await page.waitForSelector('#dashboard');
    // await page.click('#settings');
    // await page.selectOption('#theme', 'dark');
    // ...
  });

  /**
   * Boa prática 2: Usar hooks para isolamento
   */
  test.beforeEach(async ({ page }) => {
    // ✅ BOM: Cada teste começa com estado limpo
    await page.goto('https://demoqa.com');
    // Limpa cookies, localStorage, etc.
  });

  /**
   * Boa prática 3: Não depender de ordem de testes
   */
  test('teste independente 1', async ({ page }) => {
    // ✅ BOM: Não depende de outros testes
    await page.goto('https://demoqa.com');
  });

  test('teste independente 2', async ({ page }) => {
    // ✅ BOM: Pode executar em qualquer ordem
    await page.goto('https://demoqa.com');
  });

  /**
   * Boa prática 4: Usar afterAll para cleanup pesado
   */
  test.beforeAll(async () => {
    // ✅ BOM: Setup pesado uma vez só
    // Criar banco de dados, iniciar servidor, etc.
  });

  test.afterAll(async () => {
    // ✅ BOM: Cleanup pesado uma vez só
    // Remover banco de dados, parar servidor, etc.
  });
});

/**
 * RESUMO - QUANDO USAR CADA HOOK:
 * 
 * beforeAll:
 * - Setup que precisa ser feito uma vez
 * - Inicialização de recursos pesados
 * - Configuração compartilhada
 * - CUIDADO: Estado compartilhado pode causar problemas
 * 
 * afterAll:
 * - Cleanup de recursos do beforeAll
 * - Fechar conexões
 * - Remover dados de teste
 * - Executa mesmo se testes falharem
 * 
 * beforeEach:
 * - Setup que precisa ser repetido
 * - Garante estado limpo
 * - Isolamento entre testes
 * - Navegação, login, reset
 * 
 * afterEach:
 * - Cleanup após cada teste
 * - Screenshot em falha
 * - Limpeza de dados
 * - Coleta de métricas
 * 
 * REGRA DE OURO:
 * "Use beforeEach/afterEach para isolamento entre testes.
 *  Use beforeAll/afterAll apenas para recursos pesados.
 *  Nunca dependa da ordem de execução dos testes."
 * 
 * CICLO DE EXECUÇÃO COMPLETO:
 * 1. beforeAll (describe pai)
 * 2. beforeAll (describe filho, se houver)
 * 3. beforeEach (describe pai)
 * 4. beforeEach (describe filho, se houver)
 * 5. teste
 * 6. afterEach (describe filho, se houver)
 * 7. afterEach (describe pai)
 * 8. ... (repete 3-7 para cada teste)
 * 9. afterAll (describe filho, se houver)
 * 10. afterAll (describe pai)
 */
