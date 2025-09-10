<?php
namespace app\models;

use app\database\Conexao;
use PDO;
use PDOException;

class Historico
{
    // Lista histórico, permite ordenar por data e seção
    public static function listar($params = [])
    {
        try {
            $pdo = Conexao::getConexao();
            $sql = "SELECT m.*, (b.volume_ml * m.quantidade) as volume_ml, 
                       b.nome as bebida, 
                       s.secao as secao
                FROM movimentos m 
                LEFT JOIN bebidas b ON m.bebida_id = b.id 
                LEFT JOIN secoes s ON m.secao_id = s.id";
            $conds = [];
            $order = " ORDER BY data_hora DESC";
            $binds = [];

            // Filtros opcionais
            if (!empty($params['secao_id'])) {
                $conds[] = "secao_id = ?";
                $binds[] = $params['secao_id'];
            }
            if (!empty($params['tipo_bebida'])) {
                $conds[] = "tipo_bebida = ?";
                $binds[] = $params['tipo_bebida'];
            }
            if (!empty($params['operacao'])) {
                $conds[] = "operacao = ?";
                $binds[] = $params['operacao'];
            }

            if ($conds) {
                $sql .= " WHERE " . implode(" AND ", $conds);
            }

            // Ordenação dinâmica
            if (!empty($params['order_by'])) {
                $order_col = in_array($params['order_by'], ['data_hora', 'secao_id']) ? $params['order_by'] : 'data_hora';
                $order_dir = (!empty($params['order']) && strtoupper($params['order']) === 'ASC') ? 'ASC' : 'DESC';
                $order = " ORDER BY $order_col $order_dir";
            }
            $sql .= $order;

            $stmt = $pdo->prepare($sql);
            $stmt->execute($binds);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new \Exception("Erro ao listar histórico: " . $e->getMessage());
        }
    }

    // Registrar novo movimento (entrada ou saída)
    public static function registrar($dados)
{
    try {
        $pdo = Conexao::getConexao();
        $pdo->beginTransaction();

        // 1. Busca seção
        $stmt = $pdo->prepare("SELECT tipo_secao, volume_ocupado, capacidade_ml FROM secoes WHERE id = ?");
        $stmt->execute([$dados['secao_id']]);
        $secao = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$secao) throw new \Exception("Seção não encontrada.");
        if ($secao['tipo_secao'] !== $dados['tipo_bebida']) throw new \Exception("Tipo de bebida não compatível com a seção.");

        // Busca o volume_ml da bebida
        $stmt = $pdo->prepare("SELECT volume_ml FROM bebidas WHERE id = ?");
        $stmt->execute([$dados['bebida_id']]);
        $bebida = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$bebida) throw new \Exception("Bebida não encontrada.");

        $volume = (int)$bebida['volume_ml'] * (int)$dados['quantidade'];

        $volume_ocupado = (int)$secao['volume_ocupado'];

        if ($dados['operacao'] === 'ENTRADA') {
            $novo_ocupado = $volume_ocupado + $volume;
            if ($novo_ocupado > $secao['capacidade_ml']) {
                throw new \Exception("Capacidade da seção excedida!");
            }
        } elseif ($dados['operacao'] === 'SAIDA') {
            $novo_ocupado = $volume_ocupado - $volume;
            if ($novo_ocupado < 0) {
                throw new \Exception("Volume insuficiente na seção para saída!");
            }
        } else {
            throw new \Exception("Operação inválida.");
        }

        // 2. Insere movimento
        $sql = "INSERT INTO movimentos (operacao, bebida_id, quantidade, tipo_bebida, secao_id, responsavel, observacao)
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $dados['operacao'],
            $dados['bebida_id'],
            $dados['quantidade'],
            $dados['tipo_bebida'],
            $dados['secao_id'],
            $dados['responsavel'],
            $dados['descricao'] ?? null
        ]);

        // 3. Atualiza volume ocupado da seção
        $stmt = $pdo->prepare("UPDATE secoes SET volume_ocupado = ? WHERE id = ?");
        $stmt->execute([$novo_ocupado, $dados['secao_id']]);

        $pdo->commit();
        return $pdo->lastInsertId();
    } catch (PDOException $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        throw new \Exception("Erro ao registrar movimento: " . $e->getMessage());
    } catch (\Exception $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        throw $e;
    }
}

}
