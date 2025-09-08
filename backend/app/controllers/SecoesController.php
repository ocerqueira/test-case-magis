<?php
namespace app\controllers;

use app\models\Secao;
use Flight;

class SecoesController
{
    // GET /secoes
    public function listar()
    {
        try {
            $dados = Secao::listar();
            Flight::json($dados);
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 500);
        }
    }

    // GET /secoes/@id
    public function buscar($id)
    {
        try {
            $dado = Secao::buscarPorId($id);
            if ($dado) {
                Flight::json($dado);
            } else {
                Flight::json(['erro' => 'Seção não encontrada'], 404);
            }
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 500);
        }
    }

    // POST /secoes
    public function criar()
{
    try {
        $dados = Flight::request()->data->getData();

        // Defina a capacidade conforme o tipo da seção
        if ($dados['tipo_secao'] === 'ALCOOLICA') {
            $dados['capacidade_ml'] = 500000;
        } elseif ($dados['tipo_secao'] === 'NAO_ALCOOLICA') {
            $dados['capacidade_ml'] = 400000;
        } else {
            throw new \Exception("Tipo de seção inválido.");
        }

        // Garanta volume_ocupado inicial = 0
        $dados['volume_ocupado'] = 0;

        // Agora chama o Model
        $id = Secao::criar($dados);
        Flight::json(['mensagem' => 'Seção criada com sucesso!', 'id' => $id], 201);
    } catch (\Exception $e) {
        // Captura erro de UNIQUE e retorna mensagem clara
        if (str_contains($e->getMessage(), 'UNIQUE')) {
            Flight::json(['erro' => 'Já existe uma seção deste tipo.'], 400);
        } else {
            Flight::json(['erro' => $e->getMessage()], 400);
        }
    }
}


    // PUT /secoes/@id
    public function atualizar($id)
    {
        try {
            $dados = Flight::request()->data->getData();
            $ok = Secao::atualizar($id, $dados);
            if ($ok) {
                Flight::json(['mensagem' => 'Seção atualizada com sucesso!']);
            } else {
                Flight::json(['erro' => 'Seção não encontrada ou dados não alterados.'], 404);
            }
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 400);
        }
    }

    // DELETE /secoes/@id
    public function desativar($id)
    {
        try {
            $ok = Secao::desativar($id);
            if ($ok) {
                Flight::json(['mensagem' => 'Seção desativada com sucesso!']);
            } else {
                Flight::json(['erro' => 'Seção não encontrada.'], 404);
            }
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 400);
        }
    }
}
