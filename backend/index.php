<?php 

require 'vendor/autoload.php';

// Carrega as variáveis de ambiente
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use app\controllers\SecoesController;
use app\controllers\BebidasController;
use app\controllers\HistoricoController;


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


Flight::route('GET /secoes', [SecoesController::class, 'listar']);
Flight::route('GET /secoes/@id', [SecoesController::class, 'buscar']);
Flight::route('POST /secoes', [SecoesController::class, 'criar']);
Flight::route('PUT /secoes/@id', [SecoesController::class, 'atualizar']);
Flight::route('DELETE /secoes/@id', [SecoesController::class, 'desativar']);

Flight::route('GET /bebidas', [BebidasController::class, 'listar']);
Flight::route('GET /bebidas/volumes', [BebidasController::class, 'volumesTotais']);
Flight::route('GET /bebidas/@id', [BebidasController::class, 'buscar']);
Flight::route('POST /bebidas', [BebidasController::class, 'criar']);
Flight::route('PUT /bebidas/@id', [BebidasController::class, 'atualizar']);
Flight::route('DELETE /bebidas/@id', [BebidasController::class, 'desativar']);



Flight::route('GET /historico', [HistoricoController::class, 'listar']);
Flight::route('POST /historico', [HistoricoController::class, 'registrar']);



Flight::start();
