/**
 * Utility - StringUtility
 * 
 * Fase do Roadmap: Fase 4 - Estrutura Profissional
 * 
 * O QUE SÃO UTILITIES:
 * - Funções genéricas e reutilizáveis
 * - Não específicas do projeto/domínio
 * - Podem ser usadas em qualquer projeto
 * - Operações comuns e genéricas
 * 
 * DIFERENÇA ENTRE UTILITIES E HELPERS:
 * - Utilities: Genéricas, podem ser usadas em qualquer projeto
 * - Helpers: Específicos do projeto/domínio
 * 
 * EXEMPLOS DE UTILITIES:
 * - Manipulação de strings
 * - Manipulação de arrays
 * - Manipulação de datas
 * - Validações genéricas
 * - Formatação genérica
 * 
 * RESPONSABILIDADES:
 * - Funções genéricas e reutilizáveis
 * - Sem dependência de lógica de negócio
 * - Sem dependência de estrutura do projeto
 * - Pode ser movida para outro projeto sem alterações
 */

class StringUtility {
  /**
   * Remove acentos de uma string
   * 
   * @param {string} str - String para remover acentos
   * @returns {string} String sem acentos
   * 
   * Por que ter esta utility:
   * - Útil para comparações de strings
   * - Normalização de dados
   * - Busca case-insensitive e accent-insensitive
   */
  static removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Converte string para snake_case
   * 
   * @param {string} str - String para converter
   * @returns {string} String em snake_case
   * 
   * Exemplo: "Meu Nome" -> "meu_nome"
   */
  static toSnakeCase(str) {
    return str
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^\w_]/g, '');
  }

  /**
   * Converte string para camelCase
   * 
   * @param {string} str - String para converter
   * @returns {string} String em camelCase
   * 
   * Exemplo: "meu_nome" -> "meuNome"
   */
  static toCamelCase(str) {
    return str
      .toLowerCase()
      .replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
      .replace(/-/g, '');
  }

  /**
   * Converte string para PascalCase
   * 
   * @param {string} str - String para converter
   * @returns {string} String em PascalCase
   * 
   * Exemplo: "meu_nome" -> "MeuNome"
   */
  static toPascalCase(str) {
    const camelCase = this.toCamelCase(str);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  }

  /**
   * Converte string para kebab-case
   * 
   * @param {string} str - String para converter
   * @returns {string} String em kebab-case
   * 
   * Exemplo: "Meu Nome" -> "meu-nome"
   */
  static toKebabCase(str) {
    return str
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/_/g, '-')
      .replace(/[^\w-]/g, '');
  }

  /**
   * Capitaliza a primeira letra de cada palavra
   * 
   * @param {string} str - String para capitalizar
   * @returns {string} String capitalizada
   * 
   * Exemplo: "meu nome" -> "Meu Nome"
   */
  static capitalize(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Capitaliza apenas a primeira letra
   * 
   * @param {string} str - String para capitalizar
   * @returns {string} String com primeira letra maiúscula
   * 
   * Exemplo: "meu nome" -> "Meu nome"
   */
  static capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Trunca string para um tamanho máximo
   * 
   * @param {string} str - String para truncar
   * @param {number} maxLength - Tamanho máximo
   * @param {string} suffix - Sufixo para adicionar (padrão: '...')
   * @returns {string} String truncada
   * 
   * Exemplo: "Texto muito longo", 10 -> "Texto muito..."
   */
  static truncate(str, maxLength, suffix = '...') {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - suffix.length) + suffix;
  }

  /**
   * Remove espaços em branco extras
   * 
   * @param {string} str - String para limpar
   * @returns {string} String sem espaços extras
   * 
   * Exemplo: "  texto  com  espaços  " -> "texto com espaços"
   */
  static trimExtraSpaces(str) {
    return str.replace(/\s+/g, ' ').trim();
  }

  /**
   * Gera uma string aleatória
   * 
   * @param {number} length - Comprimento da string
   * @param {string} charset - Caracteres permitidos
   * @returns {string} String aleatória
   */
  static randomString(length = 10, charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  /**
   * Gera um slug a partir de uma string
   * 
   * @param {string} str - String para converter em slug
   * @returns {string} Slug gerado
   * 
   * Exemplo: "Meu Título Aqui!" -> "meu-titulo-aqui"
   */
  static slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Inverte uma string
   * 
   * @param {string} str - String para inverter
   * @returns {string} String invertida
   * 
   * Exemplo: "texto" -> "otxet"
   */
  static reverse(str) {
    return str.split('').reverse().join('');
  }

  /**
   * Conta o número de ocorrências de uma substring
   * 
   * @param {string} str - String para buscar
   * @param {string} substring - Substring para contar
   * @returns {number} Número de ocorrências
   */
  static countOccurrences(str, substring) {
    return str.split(substring).length - 1;
  }

  /**
   * Remove caracteres especiais de uma string
   * 
   * @param {string} str - String para limpar
   * @returns {string} String sem caracteres especiais
   * 
   * Exemplo: "Texto@#$123" -> "Texto123"
   */
  static removeSpecialChars(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '');
  }

  /**
   * Remove números de uma string
   * 
   * @param {string} str - String para limpar
   * @returns {string} String sem números
   * 
   * Exemplo: "Texto123" -> "Texto"
   */
  static removeNumbers(str) {
    return str.replace(/[0-9]/g, '');
  }

  /**
   * Remove letras de uma string
   * 
   * @param {string} str - String para limpar
   * @returns {string} String sem letras
   * 
   * Exemplo: "Texto123" -> "123"
   */
  static removeLetters(str) {
    return str.replace(/[a-zA-Z]/g, '');
  }

  /**
   * Verifica se string é palíndromo
   * 
   * @param {string} str - String para verificar
   * @returns {boolean} True se é palíndromo
   * 
   * Exemplo: "ana" -> true
   */
  static isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === this.reverse(cleaned);
  }

  /**
   * Mascara uma string (útil para dados sensíveis)
   * 
   * @param {string} str - String para mascarar
   * @param {number} visibleChars - Número de caracteres visíveis no início
   * @param {number} visibleEndChars - Número de caracteres visíveis no final
   * @param {string} maskChar - Caractere usado para máscara
   * @returns {string} String mascarada
   * 
   * Exemplo: "joao@example.com", 2, 0, "*" -> "jo***************"
   */
  static mask(str, visibleChars = 2, visibleEndChars = 0, maskChar = '*') {
    if (str.length <= visibleChars + visibleEndChars) return str;
    
    const start = str.substring(0, visibleChars);
    const end = visibleEndChars > 0 ? str.substring(str.length - visibleEndChars) : '';
    const maskLength = str.length - visibleChars - visibleEndChars;
    const mask = maskChar.repeat(maskLength);
    
    return start + mask + end;
  }

  /**
   * Formata string como moeda brasileira
   * 
   * @param {number} value - Valor para formatar
   * @returns {string} Valor formatado
   * 
   * Exemplo: 1234.56 -> "R$ 1.234,56"
   */
  static formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  /**
   * Formata string como porcentagem
   * 
   * @param {number} value - Valor para formatar
   * @param {number} decimals - Número de casas decimais
   * @returns {string} Valor formatado
   * 
   * Exemplo: 0.1234 -> "12,34%"
   */
  static formatPercentage(value, decimals = 2) {
    return (value * 100).toFixed(decimals) + '%';
  }

  /**
   * Converte string para base64
   * 
   * @param {string} str - String para converter
   * @returns {string} String em base64
   */
  static toBase64(str) {
    return Buffer.from(str).toString('base64');
  }

  /**
   * Converte string de base64
   * 
   * @param {string} str - String em base64
   * @returns {string} String decodificada
   */
  static fromBase64(str) {
    return Buffer.from(str, 'base64').toString();
  }

  /**
   * Gera um hash simples da string
   * 
   * @param {string} str - String para hashear
   * @returns {string} Hash da string
   * 
   * NOTA: Este não é um hash criptográfico seguro
   * Use apenas para fins de teste
   */
  static simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Divide string em chunks de tamanho específico
   * 
   * @param {string} str - String para dividir
   * @param {number} chunkSize - Tamanho de cada chunk
   * @returns {string[]} Array de chunks
   * 
   * Exemplo: "abcdef", 2 -> ["ab", "cd", "ef"]
   */
  static chunk(str, chunkSize) {
    const chunks = [];
    for (let i = 0; i < str.length; i += chunkSize) {
      chunks.push(str.substring(i, i + chunkSize));
    }
    return chunks;
  }

  /**
   * Remove duplicatas de caracteres em uma string
   * 
   * @param {string} str - String para processar
   * @returns {string} String sem caracteres duplicados
   * 
   * Exemplo: "aabbc" -> "abc"
   */
  static removeDuplicateChars(str) {
    return [...new Set(str)].join('');
  }

  /**
   * Verifica se string contém apenas números
   * 
   * @param {string} str - String para verificar
   * @returns {boolean} True se contém apenas números
   */
  static isNumeric(str) {
    return /^\d+$/.test(str);
  }

  /**
   * Verifica se string contém apenas letras
   * 
   * @param {string} str - String para verificar
   * @returns {boolean} True se contém apenas letras
   */
  static isAlpha(str) {
    return /^[a-zA-Z]+$/.test(str);
  }

  /**
   * Verifica se string contém apenas letras e números
   * 
   * @param {string} str - String para verificar
   * @returns {boolean} True se contém apenas letras e números
   */
  static isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
  }

  /**
   * Verifica se string está vazia ou contém apenas espaços
   * 
   * @param {string} str - String para verificar
   * @returns {boolean} True se está vazia ou apenas espaços
   */
  static isEmpty(str) {
    return !str || str.trim().length === 0;
  }

  /**
   * Preenche string com caracteres à esquerda
   * 
   * @param {string} str - String para preencher
   * @param {number} length - Comprimento desejado
   * @param {string} char - Caractere para preenchimento
   * @returns {string} String preenchida
   * 
   * Exemplo: "123", 5, "0" -> "00123"
   */
  static padLeft(str, length, char = '0') {
    return str.padStart(length, char);
  }

  /**
   * Preenche string com caracteres à direita
   * 
   * @param {string} str - String para preencher
   * @param {number} length - Comprimento desejado
   * @param {string} char - Caractere para preenchimento
   * @returns {string} String preenchida
   * 
   * Exemplo: "123", 5, "0" -> "12300"
   */
  static padRight(str, length, char = '0') {
    return str.padEnd(length, char);
  }
}

module.exports = StringUtility;
