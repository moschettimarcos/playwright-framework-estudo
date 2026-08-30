// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de Network - Interception e Mock
 * 
 * Este arquivo demonstra como trabalhar com network requests no Playwright.
 * 
 * Fase do Roadmap: Fase 6 - Network Testing
 * 
 * Conceitos abordados:
 * - page.route(): Intercepta e modifica requisições
 * - page.on(): Monitora eventos de rede
 * - Mocking: Simula respostas de API
 * - Blocking: Bloqueia requisições
 * - Monitoring: Monitora requests/responses
 * - Request interception: Intercepta requisições
 * - Response modification: Modifica respostas
 * 
 * POR QUE USAR NETWORK INTERCEPTION:
 * + Testa cenários sem depender de APIs reais
 * + Simula erros e edge cases
 * + Acelera testes (mock respostas)
 * + Bloqueia recursos desnecessários
 * + Valida comportamento da aplicação
 * 
 * QUANDO USAR:
 * - APIs instáveis ou lentas
 * - Testar cenários de erro
 * - Simular diferentes respostas
 * - Bloquear recursos (analytics, ads)
 * - Validar chamadas de API
 */

test.describe('Network - Request Monitoring', () => {
  
  /**
   * Teste: Monitorar requests
   * 
   * Objetivo: Demonstrar como monitorar requisições de rede
   * 
   * Por que usar page.on('request'):
   * - Rastreia todas as requisições
   - Valida que requests são feitas
   - Debugging de chamadas de API
   - Performance analysis
   */
  test('monitorar requests com page.on', async ({ page }) => {
    const requests = [];
    
    // Adiciona listener para requests
    page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType()
      });
    });
    
    await page.goto('https://demoqa.com');
    
    // Valida que requests foram feitas
    expect(requests.length).toBeGreaterThan(0);
    
    // Verifica tipos de recursos
    const documentRequests = requests.filter(r => r.resourceType === 'document');
    expect(documentRequests.length).toBeGreaterThan(0);
  });

  /**
   * Teste: Monitorar responses
   * 
   * Objetivo: Demonstrar como monitorar respostas de rede
   */
  test('monitorar responses com page.on', async ({ page }) => {
    const responses = [];
    
    // Adiciona listener para responses
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        ok: response.ok()
      });
    });
    
    await page.goto('https://demoqa.com');
    
    // Valida que responses foram recebidas
    expect(responses.length).toBeGreaterThan(0);
    
    // Verifica status codes
    const successfulResponses = responses.filter(r => r.ok);
    expect(successfulResponses.length).toBeGreaterThan(0);
  });

  /**
   * Teste: Monitorar falhas de requisição
   * 
   * Objetivo: Demonstrar como capturar falhas de rede
   */
  test('monitorar falhas de requisição', async ({ page }) => {
    const failedRequests = [];
    
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        failure: request.failure()
      });
    });
    
    await page.goto('https://demoqa.com');
    
    // Pode haver falhas de recursos bloqueados ou indisponíveis
    console.log('Requests falhadas:', failedRequests.length);
  });
});

test.describe('Network - Request Interception', () => {
  
  /**
   * Teste: Interceptar e modificar request
   * 
   * Objetivo: Demonstrar como interceptar e modificar requisições
   * 
   * Por que usar page.route():
   * - Modifica headers de requisição
   * - Adiciona parâmetros
   * - Altera método HTTP
   * - Bloqueia requisições
   */
  test('interceptar e modificar request', async ({ page }) => {
    // Intercepta todas as requisições
    await page.route('**/*', async route => {
      // Modifica headers
      const headers = route.request().headers();
      headers['X-Custom-Header'] = 'CustomValue';
      
      // Continua com a requisição modificada
      await route.continue({ headers });
    });
    
    await page.goto('https://demoqa.com');
  });

  /**
   * Teste: Interceptar requests específicas
   * 
   * Objetivo: Demonstrar como interceptar requests por padrão
   */
  test('interceptar requests por padrão', async ({ page }) => {
    let intercepted = false;
    
    // Intercepta apenas requests de API
    await page.route('**/api/**', async route => {
      intercepted = true;
      await route.continue();
    });
    
    await page.goto('https://demoqa.com');
    
    // Valida que requests foram interceptadas
    // Nota: demoqa.com pode não ter API, então pode ser false
    console.log('Requests de API interceptadas:', intercepted);
  });

  /**
   * Teste: Bloquear requisições
   * 
   * Objetivo: Demonstrar como bloquear recursos
   * 
   * Por que bloquear requests:
   * - Acelera testes (bloqueia imagens pesadas)
   * - Evita recursos não essenciais (analytics)
   * - Testa comportamento sem certos recursos
   * - Reduz uso de banda
   */
  test('bloquear imagens', async ({ page }) => {
    // Bloqueia todas as imagens
    await page.route('**/*.{png,jpg,jpeg,webp,gif}', route => route.abort());
    
    await page.goto('https://demoqa.com');
    
    // Página carrega sem imagens
    // Útil para testes que não dependem de imagens
  });

  /**
   * Teste: Bloquear analytics
   * 
   * Objetivo: Demonstrar como bloquear scripts de tracking
   */
  test('bloquear analytics e tracking', async ({ page }) => {
    // Bloqueia domínios de analytics
    await page.route('**/*google-analytics.com/**', route => route.abort());
    await page.route('**/*googletagmanager.com/**', route => route.abort());
    await page.route('**/*facebook.com/**', route => route.abort());
    
    await page.goto('https://demoqa.com');
  });
});

test.describe('Network - Mocking Responses', () => {
  
  /**
   * Teste: Mock response de API
   * 
   * Objetivo: Demonstrar como simular respostas de API
   * 
   * Por que usar mocking:
   * - Testa sem depender de API real
   - Simula diferentes cenários
   - Acelera testes (respostas instantâneas)
   - Testa edge cases
   - Isola testes de dependências externas
   */
  test('mock response de API', async ({ page }) => {
    // Mock response para endpoint específico
    await page.route('**/api/users', async route => {
      // Retorna resposta mockada
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'Usuário Mockado 1' },
          { id: 2, name: 'Usuário Mockado 2' }
        ])
      });
    });
    
    // Quando a aplicação chama essa API, recebe a resposta mockada
    await page.goto('https://demoqa.com');
  });

  /**
   * Teste: Mock response com erro
   * 
   * Objetivo: Demonstrar como simular erros de API
   */
  test('mock response com erro 500', async ({ page }) => {
    await page.route('**/api/error', async route => {
      // Simula erro de servidor
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.goto('https://demoqa.com');
  });

  /**
   * Teste: Mock response com delay
   * 
   * Objetivo: Demonstrar como simular lentidão de API
   */
  test('mock response com delay', async ({ page }) => {
    await page.route('**/api/slow', async route => {
      // Simula delay de 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: 'Resposta lenta' })
      });
    });
    
    await page.goto('https://demoqa.com');
  });

  /**
   * Teste: Mock response baseada em request
   * 
   * Objetivo: Demonstrar como mockar baseado no request
   */
  test('mock response condicional', async ({ page }) => {
    await page.route('**/api/users', async route => {
      const request = route.request();
      const method = request.method();
      
      // Mock diferente baseado no método
      if (method === 'GET') {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ users: [] })
        });
      } else if (method === 'POST') {
        await route.fulfill({
          status: 201,
          body: JSON.stringify({ id: 1, created: true })
        });
      } else {
        await route.continue();
      }
    });
    
    await page.goto('https://demoqa.com');
  });
});

test.describe('Network - Advanced Interception', () => {
  
  /**
   * Teste: Modificar response
   * 
   * Objetivo: Demonstrar como modificar resposta da API
   */
  test('modificar response da API', async ({ page }) => {
    await page.route('**/api/data', async route => {
      const response = await route.fetch();
      const body = await response.json();
      
      // Modifica dados da resposta
      body.modified = true;
      body.timestamp = Date.now();
      
      await route.fulfill({
        response,
        body: JSON.stringify(body)
      });
    });
    
    await page.goto('https://demoqa.com');
  });

  /**
   * Teste: Interceptar e logar requests
   * 
   * Objetivo: Demonstrar logging de requests
   */
  test('logar todas as requests', async ({ page }) => {
    await page.route('**/*', async route => {
      const request = route.request();
      console.log(`[${request.method()}] ${request.url()}`);
      await route.continue();
    });
    
    await page.goto('https://demoqa.com');
  });

  /**
   * Teste: Interceptar requests de arquivo
   * 
   * Objetivo: Demonstrar como interceptar carregamento de arquivos
   */
  test('interceptar requests de arquivo', async ({ page }) => {
    await page.route('**/*.css', route => route.abort());
    await page.route('**/*.js', route => route.abort());
    
    await page.goto('https://demoqa.com');
    
    // Página carrega sem CSS e JS
    // Útil para testar HTML puro ou performance
  });

  /**
   * Teste: Mock response de arquivo local
   * 
   * Objetivo: Demonstrar como servir arquivo local
   */
  test('mock response com arquivo local', async ({ page }) => {
    await page.route('**/api/config', async route => {
      // Serve arquivo local como resposta
      await route.fulfill({
        path: './testData/users.json'
      });
    });
    
    await page.goto('https://demoqa.com');
  });
});

test.describe('Network - API Validation', () => {
  
  /**
   * Teste: Validar chamada de API
   * 
   * Objetivo: Demonstrar como validar que API foi chamada
   */
  test('validar que API foi chamada', async ({ page }) => {
    let apiCalled = false;
    
    await page.route('**/api/**', async route => {
      apiCalled = true;
      await route.continue();
    });
    
    await page.goto('https://demoqa.com');
    
    // Valida que API foi chamada
    // Nota: Pode ser false se demoqa não tiver API
    console.log('API foi chamada:', apiCalled);
  });

  /**
   * Teste: Validar parâmetros de request
   * 
   * Objetivo: Demonstrar como validar parâmetros enviados
   */
  test('validar parâmetros de request', async ({ page }) => {
    const capturedRequests = [];
    
    await page.route('**/api/**', async route => {
      const request = route.request();
      capturedRequests.push({
        url: request.url(),
        method: request.method(),
        postData: request.postData(),
        headers: request.headers()
      });
      await route.continue();
    });
    
    await page.goto('https://demoqa.com');
    
    console.log('Requests capturadas:', capturedRequests);
  });

  /**
   * Teste: Validar response time
   * 
   * Objetivo: Demonstrar como medir tempo de resposta
   */
  test('validar tempo de resposta de API', async ({ page }) => {
    const responseTimes = [];
    
    page.on('response', async response => {
      if (response.url().includes('/api/')) {
        const timing = await response.timing();
        responseTimes.push({
          url: response.url(),
          responseTime: timing.responseEnd
        });
      }
    });
    
    await page.goto('https://demoqa.com');
    
    console.log('Tempos de resposta:', responseTimes);
  });
});

test.describe('Network - Real World Scenarios', () => {
  
  /**
   * Teste: Simular API offline
   * 
   * Objetivo: Demonstrar como testar comportamento offline
   */
  test('simular API offline', async ({ page }) => {
    // Bloqueia todas as requisições de API
    await page.route('**/api/**', route => route.abort());
    
    await page.goto('https://demoqa.com');
    
    // Aplicação deve tratar erro de API
    // Pode mostrar mensagem de erro ou modo offline
  });

  /**
   * Teste: Simular API lenta
   * 
   * Objetivo: Demonstrar como testar com API lenta
   */
  test('simular API lenta', async ({ page }) => {
    await page.route('**/api/**', async route => {
      // Simula delay de 5 segundos
      await new Promise(resolve => setTimeout(resolve, 5000));
      await route.continue();
    });
    
    await page.goto('https://demoqa.com');
    
    // Aplicação deve mostrar loading state
  });

  /**
   * Teste: Simular dados vazios
   * 
   * Objetivo: Demonstrar como testar com dados vazios
   */
  test('simular dados vazios da API', async ({ page }) => {
    await page.route('**/api/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });
    
    await page.goto('https://demoqa.com');
    
    // Aplicação deve tratar lista vazia
  });

  /**
   * Teste: Simular dados inválidos
   * 
   * Objetivo: Demonstrar como testar com dados inválidos
   */
  test('simular dados inválidos da API', async ({ page }) => {
    await page.route('**/api/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ invalid: 'data' })
      });
    });
    
    await page.goto('https://demoqa.com');
    
    // Aplicação deve validar dados
  });
});

/**
 * RESUMO - QUANDO USAR CADA TÉCNICA:
 * 
 * page.on('request'):
 * - Monitorar requisições
 * - Logging de requests
 * - Debugging
 * 
 * page.on('response'):
 * - Monitorar respostas
 * - Validar status codes
 * - Performance analysis
 * 
 * page.on('requestfailed'):
 * - Capturar falhas
 * - Debugging de erros
 * 
 * page.route():
 * - Interceptar requests
 * - Modificar requests
 * - Bloquear requests
 * - Mock responses
 * 
 * route.continue():
 * - Continua request original
 * - Pode modificar antes de continuar
 * 
 * route.abort():
 * - Bloqueia request
 * - Simula falha de rede
 * 
 * route.fulfill():
 * - Retorna response mockada
 * - Simula resposta de API
 * - Pode modificar response
 * 
 * BOAS PRÁTICAS:
 * - Use mocking para testes isolados
 * - Não abuse de mocking (testes reais são melhores)
 * - Limpe routes após o teste
 * - Documente por que está mockando
 * - Use blocking para acelerar testes
 * 
 * REGRA DE OURO:
 * "Mock quando necessário, teste real quando possível.
 *  Network interception é poderoso mas deve ser usado com cuidado.
 *  Use para simular cenários difíceis de reproduzir em produção."
 */
