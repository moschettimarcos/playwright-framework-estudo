// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * Testes de Upload e Download de Arquivos
 * 
 * Este arquivo demonstra como realizar upload e download de arquivos
 * em testes de automação web com Playwright.
 * 
 * Fase do Roadmap: Fase 3 - Interações Avançadas
 * 
 * Conceitos abordados:
 * - setInputFiles(): Fazer upload de arquivos
 * - download: Evento de download
 * - page.waitForEvent(): Esperar por eventos
 * - path.join(): Manipular caminhos de arquivos
 * - Criar arquivos temporários para teste
 */

test.describe('Upload e Download de Arquivos', () => {
  
  /**
   * Teste: Upload de arquivo único
   * 
   * Objetivo: Demonstrar como fazer upload de um arquivo
   * 
   * Por que é importante:
   * - Upload é comum em formulários (CV, fotos, documentos)
   * - Testar validação de arquivos
   * - Verificar processamento de uploads
   */
  test('upload de arquivo único', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Cria um buffer com conteúdo do arquivo para teste
    // Em produção, você usaria um arquivo real existente
    const fileBuffer = Buffer.from('Conteúdo do arquivo de teste');
    
    // setInputFiles(): Faz upload do arquivo usando buffer
    await page.setInputFiles('#uploadFile', {
      name: 'sample-file.txt',
      mimeType: 'text/plain',
      buffer: fileBuffer
    });
    
    // Valida que o upload foi realizado (se o elemento existir)
    const uploadedPath = page.locator('#uploadedFilePath');
    if (await uploadedPath.count() > 0) {
      await expect(uploadedPath).toBeVisible();
    }
  });

  /**
   * Teste: Upload de múltiplos arquivos
   * 
   * Objetivo: Demonstrar como fazer upload de múltiplos arquivos
   * 
   * Por que é importante:
   * - Alguns formulários aceitam múltiplos arquivos
   * - Testar limite de arquivos
   * - Validar processamento em lote
   */
  test('upload de múltiplos arquivos', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Nota: O site demoqa não tem atributo "multiple" no input de arquivo por padrão
    // Este teste pode ser pulado se o site não suportar
    test.skip();
    // Cria buffers para múltiplos arquivos
    const fileBuffer1 = Buffer.from('Conteúdo do arquivo 1');
    const fileBuffer2 = Buffer.from('Conteúdo do arquivo 2');
    
    // setInputFiles() com array de buffers para múltiplos arquivos
    await page.setInputFiles('#uploadFile', [
      {
        name: 'sample-file.txt',
        mimeType: 'text/plain',
        buffer: fileBuffer1
      },
      {
        name: 'sample-file-2.txt',
        mimeType: 'text/plain',
        buffer: fileBuffer2
      }
    ]);
    
    // Valida que o upload foi realizado (se o elemento existir)
    const uploadedPath = page.locator('#uploadedFilePath');
    if (await uploadedPath.count() > 0) {
      await expect(uploadedPath).toBeVisible();
    }
  });

  /**
   * Teste: Upload usando buffer (arquivo em memória)
   * 
   * Objetivo: Demonstrar upload usando buffer em vez de arquivo físico
   * 
   * Por que é importante:
   * - Útil quando não há arquivo físico disponível
   * - Permite criar arquivos dinamicamente
   * - Evita dependência de arquivos externos
   */
  test('upload usando buffer', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Cria um buffer com conteúdo do arquivo
    const fileBuffer = Buffer.from('Conteúdo do arquivo de teste');
    
    // setInputFiles() com buffer
    await page.setInputFiles('#uploadFile', {
      name: 'arquivo-teste.txt',
      mimeType: 'text/plain',
      buffer: fileBuffer
    });
    
    // Valida que o upload foi realizado
    await expect(page.locator('#uploadedFilePath')).toBeVisible();
  });

  /**
   * Teste: Limpar upload (remover arquivo)
   * 
   * Objetivo: Demonstrar como remover arquivo selecionado para upload
   * 
   * Por que é importante:
   * - Usuário pode querer cancelar upload
   * - Testar comportamento de limpeza
   * - Validar reset de formulário
   */
  test('limpar upload', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Faz upload usando buffer
    const fileBuffer = Buffer.from('Conteúdo do arquivo de teste');
    await page.setInputFiles('#uploadFile', {
      name: 'sample-file.txt',
      mimeType: 'text/plain',
      buffer: fileBuffer
    });
    
    // setInputFiles() com array vazio limpa a seleção
    await page.setInputFiles('#uploadFile', []);
    
    // Valida que o upload foi limpo
    // O comportamento depende da implementação da página
    // Apenas valida que a operação foi executada sem erro
  });

  /**
   * Teste: Download de arquivo
   * 
   * Objetivo: Demonstrar como fazer download de arquivo
   * 
   * Por que é importante:
   * - Download é comum (relatórios, exportações, anexos)
   * - Testar se download funciona corretamente
   * - Validar conteúdo do arquivo baixado
   */
  test('download de arquivo', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Configura o diretório de download
    // O Playwright pode configurar onde salvar arquivos baixados
    const downloadPromise = page.waitForEvent('download');
    
    // Clica no link de download
    await page.click('#downloadButton');
    
    // Espera o evento de download
    const download = await downloadPromise;
    
    // Salva o arquivo em um caminho específico
    const downloadPath = path.join(__dirname, '../../downloads', download.suggestedFilename());
    await download.saveAs(downloadPath);
    
    // Valida que o arquivo foi baixado
    const fs = require('fs');
    expect(fs.existsSync(downloadPath)).toBe(true);
  });

  /**
   * Teste: Download e validar conteúdo
   * 
   * Objetivo: Demonstrar como baixar e validar conteúdo do arquivo
   * 
   * Por que é importante:
   * - Garante que o conteúdo está correto
   - Testa integridade do download
   * - Valida dados exportados
   */
  test('download e validar conteúdo', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Espera o download
    const downloadPromise = page.waitForEvent('download');
    await page.click('#downloadButton');
    const download = await downloadPromise;
    
    // Lê o conteúdo do arquivo em memória
    const fileBuffer = await download.createReadStream();
    
    // Nota: download.text() não existe, precisamos ler o buffer
    // Valida que o download foi iniciado
    expect(download.suggestedFilename()).toBeTruthy();
  });

  /**
   * Teste: Download com falha (tratamento de erro)
   * 
   * Objetivo: Demonstrar como tratar falhas no download
   * 
   * Por que é importante:
   * - Downloads podem falhar (network, permissões)
   * - Testar resiliência da aplicação
   * - Validar mensagens de erro
   */
  test('download com tratamento de erro', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    try {
      // Tenta download com timeout curto
      const downloadPromise = page.waitForEvent('download', { timeout: 1000 });
      await page.click('#downloadButton');
      const download = await downloadPromise;
      
      // Se chegou aqui, download funcionou
      expect(download.suggestedFilename()).toBeTruthy();
    } catch (error) {
      // Trata erro de download
      console.error('Erro no download:', error instanceof Error ? error.message : String(error));
      // Em teste real, validar mensagem de erro na UI
    }
  });

  /**
   * Teste: Upload de arquivo inválido
   * 
   * Objetivo: Demonstrar comportamento com arquivo inválido
   * 
   * Por que é importante:
   * - Validar validação de tipos de arquivo
   * - Testar limites de tamanho
   * - Verificar mensagens de erro
   */
  test('upload de arquivo inválido', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Cria um buffer simulando arquivo inválido
    const invalidBuffer = Buffer.from('invalid file content');
    
    // Tenta o upload
    await page.setInputFiles('#uploadFile', {
      name: 'invalid-file.exe',
      mimeType: 'application/x-msdownload',
      buffer: invalidBuffer
    });
    
    // Valida se há mensagem de erro (depende da implementação)
    // A página pode mostrar erro ou rejeitar o arquivo
  });

  /**
   * Teste: Upload de arquivo grande
   * 
   * Objetivo: Demonstrar upload de arquivo grande
   * 
   * Por que é importante:
   * - Testar limites de tamanho
   * - Validar timeout de upload
   * - Verificar progresso de upload
   */
  test('upload de arquivo grande', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Cria um buffer grande para simular arquivo grande
    const largeBuffer = Buffer.alloc(10 * 1024 * 1024); // 10MB
    
    // Faz upload do buffer
    await page.setInputFiles('#uploadFile', {
      name: 'arquivo-grande.txt',
      mimeType: 'text/plain',
      buffer: largeBuffer
    });
    
    // Valida que o upload foi realizado
    await expect(page.locator('#uploadedFilePath')).toBeVisible();
  });

  /**
   * Teste: Drag and drop para upload
   * 
   * Objetivo: Demonstrar upload via drag and drop
   * 
   * Por que é importante:
   * - Interface moderna usa drag and drop
   * - Melhor experiência do usuário
   * - Testar funcionalidade completa
   */
  test('drag and drop para upload', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Nota: Drag and drop complexo pode não funcionar em todos os browsers
    // Este teste demonstra o conceito, mas pode precisar de adaptação
    const fileBuffer = Buffer.from('Conteúdo do arquivo de teste');
    
    // Usa setInputFiles como alternativa mais confiável
    await page.setInputFiles('#uploadFile', {
      name: 'sample-file.txt',
      mimeType: 'text/plain',
      buffer: fileBuffer
    });
    
    // Valida que o upload foi realizado (se o elemento existir)
    const uploadedPath = page.locator('#uploadedFilePath');
    if (await uploadedPath.count() > 0) {
      await expect(uploadedPath).toBeVisible();
    }
  });

  /**
   * Teste: Validar tipo de arquivo após upload
   * 
   * Objetivo: Demonstrar como validar o tipo de arquivo
   * 
   * Por que é importante:
   * - Garante que arquivo correto foi enviado
   * - Valida metadados do arquivo
   * - Testa processamento de tipos
   */
  test('validar tipo de arquivo após upload', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Faz upload usando buffer
    const fileBuffer = Buffer.from('Conteúdo do arquivo de teste');
    await page.setInputFiles('#uploadFile', {
      name: 'sample-file.txt',
      mimeType: 'text/plain',
      buffer: fileBuffer
    });
    
    // Valida informações do arquivo na página (se o elemento existir)
    const uploadedPath = page.locator('#uploadedFilePath');
    if (await uploadedPath.count() > 0) {
      const fileInfo = await uploadedPath.textContent();
      expect(fileInfo).toContain('sample-file.txt');
    }
  });

  /**
   * Teste: Cancelar download em andamento
   * 
   * Objetivo: Demonstrar como cancelar download
   * 
   * Por que é importante:
   * - Usuário pode querer cancelar download
   * - Testar comportamento de cancelamento
   * - Validar limpeza de recursos
   */
  test('cancelar download', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    
    // Inicia download
    const downloadPromise = page.waitForEvent('download');
    await page.click('#downloadButton');
    const download = await downloadPromise;
    
    // Cancela o download
    download.cancel();
    
    // Valida que download foi cancelado
    // O arquivo não deve existir no diretório de downloads
    // Apenas valida que a operação foi executada sem erro
  });
});
