<?php
namespace app\models;

use app\database\Conexao;
use PDO;
use PDOException;

class Bebida
{
    // Lista todas as bebidas (ativas por padrão)
    public static function listar($apenasAtivas = true)
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "SELECT * FROM bebidas";
            if ($apenasAtivas) {
                $sql .= " WHERE ativa = 1";
            }
            $stmt = $pdo->query($sql);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao listar bebidas: " . $e->getMessage());
        }
    }

    // Busca bebida por ID
    public static function buscarPorId($id)
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "SELECT * FROM bebidas WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id]);
            return $stmt->fetch(\PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao buscar bebida: " . $e->getMessage());
        }
    }

    // Cria uma nova bebida
    public static function criar($dados)
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "INSERT INTO bebidas (nome, marca, tipo_bebida, secao_id, volume_ml, ativa)
                    VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $dados['nome'],
                $dados['marca'],
                $dados['tipo_bebida'],
                $dados['secao_id'],
                $dados['volume_ml'],
                $dados['ativa'] ?? true
            ]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            throw new \Exception("Erro ao criar bebida: " . $e->getMessage());
        }
    }

    // Atualiza bebida existente
    public static function atualizar($id, $dados)
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "UPDATE bebidas SET nome = ?, marca = ?, tipo_bebida = ?, secao_id = ?, volume_ml = ?, ativa = ? WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([
                $dados['nome'],
                $dados['marca'],
                $dados['tipo_bebida'],
                $dados['secao_id'],
                $dados['volume_ml'],
                $dados['ativa'],
                $id
            ]);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao atualizar bebida: " . $e->getMessage());
        }
    }

    // Remove (desativa) uma bebida
    public static function desativar($id)
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "UPDATE bebidas SET ativa = 0 WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao desativar bebida: " . $e->getMessage());
        }
    }
}
