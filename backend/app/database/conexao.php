<?php
namespace app\database;

use PDO;
use PDOException;

class Conexao
{
    private static $instancia;

    public static function getConexao(): PDO
    {
        if (!self::$instancia) {
            try {
                $dsn = sprintf(
                    'mysql:host=%s;port=%s;dbname=%s;charset=%s',
                    $_ENV['DB_HOST'],
                    $_ENV['DB_PORT'] ?? '3306',
                    $_ENV['DB_DATABASE'],
                    $_ENV['DB_CHARSET'] ?? 'utf8'
                );
                self::$instancia = new PDO($dsn, $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD']);
                self::$instancia->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$instancia->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['erro' => 'Falha ao conectar ao banco de dados: ' . $e->getMessage()]);
                exit;
            }
        }
        return self::$instancia;
    }
}
