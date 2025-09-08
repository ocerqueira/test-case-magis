<?php
namespace app\controllers;

use app\models\Historico;
use Flight;

class HistoricoController
{
    // GET /historico
    public function listar()
    {
        try {
            $params = Flight::request()->query->getData();
            $dados = Historico::listar($params);
            Flight::json($dados);
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 500);
        }
    }

    // POST /historico
    public function registrar()
    {
        try {
            $dados = Flight::request()->data->getData();
            $id = Historico::registrar($dados);
            Flight::json(['mensagem' => 'Movimento registrado com sucesso!', 'id' => $id], 201);
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 400);
        }
    }
}
