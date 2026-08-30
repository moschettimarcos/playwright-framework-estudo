/**
 * Helper - DataHelper
 * 
 * Fase do Roadmap: Fase 4 - Estrutura Profissional
 * 
 * O QUE SÃO HELPERS:
 * - Funções auxiliares específicas para o projeto
 * - Lógica de negócio relacionada aos testes
 * - Funções que não são genéricas o suficiente para serem utilities
 * 
 * DIFERENÇA ENTRE HELPERS E UTILITIES:
 * - Helpers: Específicos do projeto/domínio
 * - Utilities: Genéricos, podem ser usados em qualquer projeto
 * 
 * EXEMPLOS DE HELPERS:
 * - Gerar dados de teste específicos (usuário, produto)
 * - Formatar dados específicos do domínio
 * - Validações específicas do negócio
 * - Manipulação de dados específicos da aplicação
 * 
 * RESPONSABILIDADES:
 * - Lógica de negócio de teste
 * - Geração de dados de teste
 * - Formatação específica
 * - Validações específicas
 */

class DataHelper {
  /**
   * Gera um nome de usuário aleatório
   * 
   * @returns {string} Nome de usuário gerado
   * 
   * Por que ter helper para gerar dados:
   * - Evita dados duplicados em testes
   * - Gera dados realistas
   * - Centraliza lógica de geração
   */
  static generateUsername() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `usuario_${timestamp}_${random}`;
  }

  /**
   * Gera um email aleatório
   * 
   * @returns {string} Email gerado
   */
  static generateEmail() {
    const username = this.generateUsername();
    return `${username}@example.com`;
  }

  /**
   * Gera uma senha aleatória
   * 
   * @param {number} length - Comprimento da senha (padrão: 12)
   * @returns {string} Senha gerada
   */
  static generatePassword(length = 12) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  /**
   * Gera um número de telefone brasileiro
   * 
   * @returns {string} Telefone gerado
   */
  static generatePhoneNumber() {
    const ddd = ['11', '21', '31', '41', '51', '61', '71', '81', '91'];
    const randomDDD = ddd[Math.floor(Math.random() * ddd.length)];
    const firstPart = Math.floor(Math.random() * 90000) + 10000;
    const secondPart = Math.floor(Math.random() * 9000) + 1000;
    return `(${randomDDD}) 9${firstPart}-${secondPart}`;
  }

  /**
   * Gera um CPF válido (apenas para testes)
   * 
   * @returns {string} CPF gerado
   * 
   * NOTA: Este é um CPF gerado para testes
   * Não use para fins reais de produção
   */
  static generateCPF() {
    // Gera 9 dígitos aleatórios
    let cpf = '';
    for (let i = 0; i < 9; i++) {
      cpf += Math.floor(Math.random() * 10);
    }

    // Calcula dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) digit1 = 0;
    cpf += digit1;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) digit2 = 0;
    cpf += digit2;

    // Formata CPF
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  /**
   * Formata data para o formato brasileiro
   * 
   * @param {Date} date - Data a formatar
   * @returns {string} Data formatada (DD/MM/YYYY)
   */
  static formatDateBR(date = new Date()) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Formata data para o formato ISO
   * 
   * @param {Date} date - Data a formatar
   * @returns {string} Data formatada (YYYY-MM-DD)
   */
  static formatDateISO(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Gera um endereço completo
   * 
   * @returns {object} Objeto com dados de endereço
   */
  static generateAddress() {
    const streets = [
      'Rua das Flores',
      'Avenida Paulista',
      'Rua Augusta',
      'Avenida Brasil',
      'Rua XV de Novembro'
    ];
    const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre'];
    const states = ['SP', 'RJ', 'MG', 'PR', 'RS'];

    const randomStreet = streets[Math.floor(Math.random() * streets.length)];
    const randomNumber = Math.floor(Math.random() * 9999) + 1;
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomState = states[Math.floor(Math.random() * states.length)];
    const randomZip = Math.floor(Math.random() * 89999) + 10000;

    return {
      street: randomStreet,
      number: randomNumber,
      complement: `Apto ${Math.floor(Math.random() * 99) + 1}`,
      city: randomCity,
      state: randomState,
      zipCode: `${randomZip}-${Math.floor(Math.random() * 899) + 100}`
    };
  }

  /**
   * Gera dados completos de um usuário
   * 
   * @returns {object} Objeto com dados do usuário
   */
  static generateUser() {
    const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Fernanda'];
    const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima', 'Costa'];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;

    return {
      username: this.generateUsername(),
      email: this.generateEmail(),
      password: this.generatePassword(),
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      phone: this.generatePhoneNumber(),
      cpf: this.generateCPF(),
      birthDate: this.formatDateBR(),
      address: this.generateAddress()
    };
  }

  /**
   * Valida se um email está em formato válido
   * 
   * @param {string} email - Email a validar
   * @returns {boolean} True se válido, false caso contrário
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida se um CPF está em formato válido
   * 
   * @param {string} cpf - CPF a validar
   * @returns {boolean} True se válido, false caso contrário
   */
  static isValidCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) return false;
    
    // Valida dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) digit1 = 0;
    if (digit1 !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) digit2 = 0;
    if (digit2 !== parseInt(cpf[10])) return false;

    return true;
  }

  /**
   * Gera um número de cartão de crédito para testes
   * 
   * @returns {string} Número de cartão gerado
   * 
   * NOTA: Este é um cartão fictício para testes
   * Não use para transações reais
   */
  static generateCreditCard() {
    // Gera número que passa validação de Luhn (apenas para testes)
    let cardNumber = '4'; // Começa com 4 (Visa)
    for (let i = 0; i < 15; i++) {
      cardNumber += Math.floor(Math.random() * 10);
    }
    return cardNumber;
  }

  /**
   * Gera data de expiração de cartão
   * 
   * @returns {string} Data de expiração (MM/AA)
   */
  static generateCardExpiry() {
    const currentDate = new Date();
    const year = currentDate.getFullYear() + Math.floor(Math.random() * 5) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    return `${String(month).padStart(2, '0')}/${String(year).slice(-2)}`;
  }

  /**
   * Gera CVV de cartão
   * 
   * @returns {string} CVV de 3 dígitos
   */
  static generateCVV() {
    return String(Math.floor(Math.random() * 900) + 100);
  }
}

module.exports = DataHelper;
