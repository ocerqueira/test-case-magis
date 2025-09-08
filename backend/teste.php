<?php
require 'vendor/autoload.php';

// Carrega o .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use app\database\Conexao;

try {
    $pdo = Conexao::getConexao();
    echo "Conexão OK! Banco conectado com sucesso.";
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
