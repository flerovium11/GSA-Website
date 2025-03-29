<?php
if (!getenv('POSTGRES_URL') && file_exists(__DIR__ . '/../.env.local')) {
    $envFile = file(__DIR__ . '/../.env.local', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($envFile as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value, " \t\n\r\0\x0B\"'");
        putenv("$name=$value");
    }
}

$postgres_url = getenv('POSTGRES_URL_NON_POOLING') ?: getenv('POSTGRES_URL');
$frontend_url = getenv('FRONTEND_URL') ?: 'http://localhost:5173/';

if ($postgres_url) {
    $url = parse_url($postgres_url);
    $dsn = "pgsql:";
    
    if (isset($url['host'])) {
        $dsn .= "host=" . $url['host'] . ";";
    }
    
    if (isset($url['port'])) {
        $dsn .= "port=" . $url['port'] . ";";
    }
    
    if (isset($url['path'])) {
        $dsn .= "dbname=" . ltrim($url['path'], '/') . ";";
    }
    
    if (isset($url['query'])) {
        parse_str($url['query'], $query);
        if (isset($query['sslmode'])) {
            $dsn .= "sslmode=" . $query['sslmode'] . ";";
        }
    }
    
    $user = isset($url['user']) ? $url['user'] : '';
    $password = isset($url['pass']) ? $url['pass'] : '';
} else {
    $host = getenv('POSTGRES_HOST');
    $database = getenv('POSTGRES_DATABASE');
    $user = getenv('POSTGRES_USER');
    $password = getenv('POSTGRES_PASSWORD');
    
    $dsn = "pgsql:host=$host;dbname=$database;sslmode=require";
}
?>