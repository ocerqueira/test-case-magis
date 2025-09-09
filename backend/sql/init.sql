CREATE DATABASE sistema_estoque_bebidas;
USE sistema_estoque_bebidas;

CREATE TABLE IF NOT EXISTS secoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    secao VARCHAR(40) NOT NULL,
    tipo_secao ENUM('ALCOOLICA', 'NAO_ALCOOLICA') NOT NULL UNIQUE,
    capacidade_ml INT NOT NULL,
    volume_ocupado INT DEFAULT 0,
    ativa BOOLEAN DEFAULT TRUE,
    criada_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bebidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    tipo_bebida ENUM('ALCOOLICA', 'NAO_ALCOOLICA') NOT NULL,
    secao_id INT NOT NULL,
    volume_ml INT NOT NULL,
    ativa BOOLEAN DEFAULT TRUE,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (secao_id) REFERENCES secoes(id)
);

CREATE TABLE IF NOT EXISTS movimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    operacao ENUM('ENTRADA', 'SAIDA') NOT NULL,
    bebida_id INT NOT NULL,
    volume INT NOT NULL,
    tipo_bebida ENUM('ALCOOLICA', 'NAO_ALCOOLICA') NOT NULL,
    secao_id INT NOT NULL,
    responsavel VARCHAR(100) NOT NULL,
    observacao VARCHAR(200),
    FOREIGN KEY (secao_id) REFERENCES secoes(id),
    FOREIGN KEY (bebida_id) REFERENCES bebidas(id)
);