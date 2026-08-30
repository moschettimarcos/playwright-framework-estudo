// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Testes de API - Básicos
 * 
 * Este arquivo demonstra como testar APIs com Playwright.
 * 
 * Fase do Roadmap: Fase 6 - API Testing
 * 
 * Conceitos abordados:
 * - request: Contexto de requisição API
 * - GET: Obter dados
 * - POST: Criar dados
 * - PUT: Atualizar dados
 * - DELETE: Remover dados
 * - Headers: Cabeçalhos HTTP
 * - Authentication: Autenticação
 * - Response validation: Validação de resposta
 * 
 * POR QUE TESTAR API:
 * + Mais rápido que testes UI
 * + Mais estável (não depende de UI)
 * + Testa contrato da API
 * + Pode testar cenários edge cases
 * + Útil para integração contínua
 * 
 * QUANDO TESTAR API:
 * - Validar endpoints REST
 * - Testar integrações
 * - Validar dados
 * - Testar autenticação
 * - Smoke tests rápidos
 */

test.describe('API Testing - GET Requests', () => {
  
  /**
   * Teste: Requisição GET simples
   * 
   * Objetivo: Demonstrar como fazer uma requisição GET
   * 
   * Por que usar request.get():
   * - Obtém dados de um endpoint
   * - Valida que endpoint está funcionando
   * - Verifica estrutura de resposta
   */
  test('requisição GET simples', async ({ request }) => {
    // request.get(): Faz requisição GET
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Valida status code
    expect(response.status()).toBe(200);
    
    // Obtém corpo da resposta como JSON
    const data = await response.json();
    
    // Valida dados
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('body');
  });

  /**
   * Teste: Requisição GET com query parameters
   * 
   * Objetivo: Demonstrar como passar parâmetros na URL
   */
  test('requisição GET com query parameters', async ({ request }) => {
    // Adiciona query parameters na URL
    const response = await request.get('https://jsonplaceholder.typicode.com/posts?userId=1');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    // Valida que retornou múltiplos posts
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  /**
   * Teste: Requisição GET com headers
   * 
   * Objetivo: Demonstrar como adicionar headers customizados
   */
  test('requisição GET com headers', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Playwright-API-Test'
      }
    });
    
    expect(response.status()).toBe(200);
  });
});

test.describe('API Testing - POST Requests', () => {
  
  /**
   * Teste: Requisição POST simples
   * 
   * Objetivo: Demonstrar como criar dados via POST
   * 
   * Por que usar request.post():
   * - Cria novos recursos
   * - Envia dados para o servidor
   * - Valida criação de recursos
   */
  test('requisição POST simples', async ({ request }) => {
    const newPost = {
      title: 'Teste Post',
      body: 'Corpo do teste',
      userId: 1
    };
    
    // request.post(): Faz requisição POST
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: newPost
    });
    
    // Valida status code (201 = Created)
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    
    // Valida que o post foi criado com os dados enviados
    expect(data.title).toBe(newPost.title);
    expect(data.body).toBe(newPost.body);
    expect(data.userId).toBe(newPost.userId);
    expect(data).toHaveProperty('id'); // ID gerado pelo servidor
  });

  /**
   * Teste: Requisição POST com JSON
   * 
   * Objetivo: Demonstrar envio de JSON
   */
  test('requisição POST com JSON', async ({ request }) => {
    const userData = {
      name: 'João Silva',
      email: 'joao@example.com',
      username: 'joaosilva'
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: userData
    });
    
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data.name).toBe(userData.name);
  });
});

test.describe('API Testing - PUT Requests', () => {
  
  /**
   * Teste: Requisição PUT simples
   * 
   * Objetivo: Demonstrar como atualizar dados via PUT
   * 
   * Por que usar request.put():
   * - Atualiza recursos existentes
   * - Substitui recurso inteiro
   * - Valida atualização de dados
   */
  test('requisição PUT simples', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: 'Título Atualizado',
      body: 'Corpo atualizado',
      userId: 1
    };
    
    // request.put(): Faz requisição PUT
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: updatedPost
    });
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.title).toBe(updatedPost.title);
  });
});

test.describe('API Testing - DELETE Requests', () => {
  
  /**
   * Teste: Requisição DELETE simples
   * 
   * Objetivo: Demonstrar como remover dados via DELETE
   * 
   * Por que usar request.delete():
   * - Remove recursos
   * - Valida exclusão
   * - Limpa dados de teste
   */
  test('requisição DELETE simples', async ({ request }) => {
    // request.delete(): Faz requisição DELETE
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    
    // Valida status code (200 ou 204 = No Content)
    expect(response.status()).toBe(200);
  });
});

test.describe('API Testing - Authentication', () => {
  
  /**
   * Teste: Autenticação Bearer Token
   * 
   * Objetivo: Demonstrar autenticação com token
   * 
   * Por que usar autenticação:
   * - APIs geralmente requerem autenticação
   - Testar endpoints protegidos
   - Validar mecanismos de segurança
   */
  test('autenticação com Bearer Token', async ({ request }) => {
    const token = 'seu-token-aqui';
    
    // Nota: jsonplaceholder.typicode.com não requer autenticação real
    // Este teste demonstra como adicionar headers de autenticação
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Valida que a requisição foi feita (mesmo que o token seja ignorado)
    expect(response.status()).toBe(200);
  });

  /**
   * Teste: Autenticação Basic Auth
   * 
   * Objetivo: Demonstrar autenticação básica
   */
  test('autenticação Basic Auth', async ({ request }) => {
    const username = 'admin';
    const password = 'password';
    
    // Credenciais codificadas em base64
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    
    // Nota: jsonplaceholder.typicode.com não requer autenticação real
    // Este teste demonstra como adicionar headers de Basic Auth
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1', {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });
    
    expect(response.status()).toBe(200);
  });

  /**
   * Teste: Autenticação via API Key
   * 
   * Objetivo: Demonstrar autenticação com API Key
   */
  test('autenticação com API Key', async ({ request }) => {
    const apiKey = 'sua-api-key-aqui';
    
    // Nota: jsonplaceholder.typicode.com não requer autenticação real
    // Este teste demonstra como adicionar headers de API Key
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1', {
      headers: {
        'X-API-Key': apiKey
      }
    });
    
    expect(response.status()).toBe(200);
  });
});

test.describe('API Testing - Response Validation', () => {
  
  /**
   * Teste: Validar status code
   * 
   * Objetivo: Demonstrar validação de status HTTP
   */
  test('validar status code', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Status codes comuns:
    // 200 - OK
    // 201 - Created
    // 204 - No Content
    // 400 - Bad Request
    // 401 - Unauthorized
    // 403 - Forbidden
    // 404 - Not Found
    // 500 - Internal Server Error
    
    expect(response.status()).toBe(200);
    expect(response.ok()).toBe(true); // ok() retorna true para status 2xx-3xx
  });

  /**
   * Teste: Validar headers de resposta
   * 
   * Objetivo: Demonstrar como validar headers
   */
  test('validar headers de resposta', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Obtém headers
    const contentType = response.headers()['content-type'];
    
    // Valida headers (content-length pode variar, então não validamos)
    expect(contentType).toContain('application/json');
  });

  /**
   * Teste: Validar corpo da resposta
   * 
   * Objetivo: Demonstrar validação de dados
   */
  test('validar corpo da resposta', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    const data = await response.json();
    
    // Valida estrutura
    expect(data).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
      userId: expect.any(Number)
    });
    
    // Valida valores específicos
    expect(data.id).toBe(1);
  });

  /**
   * Teste: Validar tempo de resposta
   * 
   * Objetivo: Demonstrar validação de performance
   */
  test('validar tempo de resposta', async ({ request }) => {
    const startTime = Date.now();
    
    await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    // Valida que resposta foi rápida (menos de 1 segundo)
    expect(responseTime).toBeLessThan(1000);
  });
});

test.describe('API Testing - Error Handling', () => {
  
  /**
   * Teste: Lidar com 404 Not Found
   * 
   * Objetivo: Demonstrar tratamento de erro
   */
  test('lidar com 404 Not Found', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/999999');
    
    // JSONPlaceholder retorna 404 para recursos não encontrados
    expect(response.status()).toBe(404);
  });

  /**
   * Teste: Lidar com erro de validação
   * 
   * Objetivo: Demonstrar validação de erro
   */
  test('lidar com erro de validação', async ({ request }) => {
    // Nota: jsonplaceholder.typicode.com aceita dados vazios e retorna 201
    // Este teste demonstra como lidar com respostas que não são erro
    const invalidData = {
      // Dados vazios (jsonplaceholder aceita)
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: invalidData
    });
    
    // jsonplaceholder retorna 201 mesmo com dados vazios
    expect(response.status()).toBe(201);
  });
});

test.describe('API Testing - Advanced', () => {
  
  /**
   * Teste: Requisição em lote
   * 
   * Objetivo: Demonstrar múltiplas requisições
   */
  test('múltiplas requisições em paralelo', async ({ request }) => {
    // Faz múltiplas requisições em paralelo
    const responses = await Promise.all([
      request.get('https://jsonplaceholder.typicode.com/posts/1'),
      request.get('https://jsonplaceholder.typicode.com/posts/2'),
      request.get('https://jsonplaceholder.typicode.com/posts/3')
    ]);
    
    // Valida todas as respostas
    for (const response of responses) {
      expect(response.status()).toBe(200);
    }
  });

  /**
   * Teste: Requisição com timeout
   * 
   * Objetivo: Demonstrar configuração de timeout
   */
  test('requisição com timeout customizado', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1', {
      timeout: 5000 // 5 segundos
    });
    
    expect(response.status()).toBe(200);
  });

  /**
   * Teste: Validação de schema
   * 
   * Objetivo: Demonstrar validação estrutural
   */
  test('validação de schema', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    
    // Valida schema esperado
    const expectedSchema = {
      id: 'number',
      title: 'string',
      body: 'string',
      userId: 'number'
    };
    
    for (const [key, expectedType] of Object.entries(expectedSchema)) {
      expect(data).toHaveProperty(key);
      expect(typeof data[key]).toBe(expectedType);
    }
  });
});

/**
 * RESUMO - QUANDO USAR CADA MÉTODO:
 * 
 * GET:
 * - Obter dados
 * - Consultar recursos
 * - Listar itens
 * 
 * POST:
 * - Criar novos recursos
 * - Enviar dados
 * - Submeter formulários
 * 
 * PUT:
 * - Atualizar recursos existentes
 * - Substituir recurso inteiro
 * 
 * DELETE:
 * - Remover recursos
 * - Limpar dados
 * 
 * AUTENTICAÇÃO:
 * - Bearer Token: Token JWT
 * - Basic Auth: Username/password
 * - API Key: Chave de API
 * 
 * VALIDAÇÃO:
 * - Status code: Verifica sucesso/erro
 * - Headers: Metadados da resposta
 * - Body: Dados da resposta
 * - Schema: Estrutura dos dados
 * 
 * REGRA DE OURO:
 * "Teste API quando possível - é mais rápido e estável que UI.
 *  Valide contrato, dados e comportamento.
 *  Use testes de API como smoke tests rápidos."
 */
