-- ============================================
-- Schema e tabela para a atividade (MySQL)
-- ============================================

CREATE SCHEMA IF NOT EXISTS SISTEMA DEFAULT CHARACTER SET utf8mb4;

USE SISTEMA;

CREATE TABLE IF NOT EXISTS usuarios (
    codigo       INT          NOT NULL AUTO_INCREMENT,
    nome_usuario VARCHAR(150) NOT NULL,
    nome_login   VARCHAR(80)  NOT NULL UNIQUE,
    senha        VARCHAR(255) NOT NULL,
    ativado      TINYINT(1)   NOT NULL DEFAULT 1,
    PRIMARY KEY (codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
