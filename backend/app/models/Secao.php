<?php
namespace app\models;

use app\database\Conexao;
use PDO;
use PDOException;

class Secao
{
    
    public static function listar($apenasAtivas = true)
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "SELECT * FROM secoes";
            if ($apenasAtivas) {
                $sql .= " WHERE ativa = 1";
            }
            $stmt = $pdo->query($sql);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao listar seções: " . $e->getMessage());
        }
    }

    // Busca seção por ID
    public static function buscarPorId($id)
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "SELECT * FROM secoes WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao buscar seção: " . $e->getMessage());
        }
    }

    // Cria uma nova seção
    public static function criar($dados)
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "INSERT INTO secoes (secao, tipo_secao, capacidade_ml, volume_ocupado, ativa)
                    VALUES (?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $dados['secao'],
                $dados['tipo_secao'],
                $dados['capacidade_ml'],
                $dados['volume_ocupado'] ?? 0,
                $dados['ativa'] ?? true
            ]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            throw new \Exception("Erro ao criar seção: " . $e->getMessage());
        }
    }

    // Atualiza uma seção existente
    public static function atualizar($id, $dados)
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "UPDATE secoes SET secao = ?, tipo_secao = ?, capacidade_ml = ?, volume_ocupado = ?, ativa = ? WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([
                $dados['secao'],
                $dados['tipo_secao'],
                $dados['capacidade_ml'],
                $dados['volume_ocupado'],
                $dados['ativa'],
                $id
            ]);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao atualizar seção: " . $e->getMessage());
        }
    }

    // Remove (desativa) uma seção
    public static function desativar($id)
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "UPDATE secoes SET ativa = 0 WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao desativar seção: " . $e->getMessage());
        }
    }
}
