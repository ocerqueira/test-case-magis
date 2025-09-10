<?php
namespace app\controllers;
use app\models\Bebida;
use Flight;
use app\database\Conexao;

use PDO;



class BebidasController
{
    // GET /bebidas
    public function listar()
    {
        try {
            $dados = Bebida::listar();
            Flight::json($dados);
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 500);
        }
    }

    // GET /bebidas/@id
    public function buscar($id)
    {
        try {
            $dado = Bebida::buscarPorId($id);
            if ($dado) {
                Flight::json($dado);
            } else {
                Flight::json(['erro' => 'Bebida não encontrada'], 404);
            }
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 500);
        }
    }

    // GET /bebidas/volumes
    public function volumesTotais()
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "SELECT tipo_secao as tipo_bebida, volume_ocupado as volume_total
                    FROM secoes
                    WHERE ativa = 1";
            $stmt = $pdo->query($sql);
            $dados = [];
            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                $dados[$row['tipo_bebida']] = (int)$row['volume_total'];
            }
            Flight::json($dados);
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 500);
        }
    }

     // POST /bebidas
    public function criar()
    {
        try {
            $dados = Flight::request()->data->getData();
            $pdo = Conexao::getConexao();

            // 1️⃣ Buscar tipo da seção e capacidade
            $stmt = $pdo->prepare("SELECT tipo_secao, capacidade_ml FROM secoes WHERE id = ?");
            $stmt->execute([$dados['secao_id']]);
            $secao = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$secao) {
                throw new \Exception("Seção não encontrada.");
            }

            // 2️⃣ Não pode misturar tipos
            if ($secao['tipo_secao'] !== $dados['tipo_bebida']) {
                throw new \Exception("Tipo de bebida não compatível com a seção.");
            }

            // 3️⃣ Não pode ultrapassar capacidade
            $stmt = $pdo->prepare("SELECT COALESCE(SUM(volume_ml), 0) as ocupado FROM bebidas WHERE secao_id = ? AND ativa = 1");
            $stmt->execute([$dados['secao_id']]);
            $ocupado = (int) $stmt->fetchColumn();

            $novo_total = $ocupado + $dados['volume_ml'];
            if ($novo_total > $secao['capacidade_ml']) {
                throw new \Exception("Capacidade da seção excedida! Total após cadastro: {$novo_total}ml / Limite: {$secao['capacidade_ml']}ml");
            }

            // 4️⃣ Se tudo OK, cria a bebida
            $id = Bebida::criar($dados);

            Flight::json(['mensagem' => 'Bebida criada com sucesso!', 'id' => $id], 201);

        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 400);
        }
    }

    // PUT /bebidas/@id
    public function atualizar($id)
    {
        try {
            $dados = Flight::request()->data->getData();
            $ok = Bebida::atualizar($id, $dados);
            if ($ok) {
                Flight::json(['mensagem' => 'Bebida atualizada com sucesso!']);
            } else {
                Flight::json(['erro' => 'Bebida não encontrada ou dados não alterados.'], 404);
            }
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 400);
        }
    }

    // DELETE /bebidas/@id
    public function desativar($id)
    {
        try {
            $ok = Bebida::desativar($id);
            if ($ok) {
                Flight::json(['mensagem' => 'Bebida desativada com sucesso!']);
            } else {
                Flight::json(['erro' => 'Bebida não encontrada.'], 404);
            }
        } catch (\Exception $e) {
            Flight::json(['erro' => $e->getMessage()], 400);
        }
    }
}
