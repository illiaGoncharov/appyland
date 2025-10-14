#!/bin/bash

# Скрипт для деплоя на production сервер
# Инструкция: 
# 1. Заполни переменные ниже значениями из GitLab CI/CD Variables
# 2. Запусти: chmod +x deploy-now.sh && ./deploy-now.sh

# ========================================
# ЗАПОЛНИ ЭТИ ПЕРЕМЕННЫЕ ИЗ GITLAB
# ========================================

# Из переменной HOST_PROD (например: appyland.ru или 123.45.67.89)
SERVER_HOST=""

# Из переменной PORT_PROD (обычно 22)
SERVER_PORT=""

# Имя пользователя на сервере (может быть в HOST_GGPA_PROD или отдельно)
SERVER_USER=""

# Путь к папке сайта на сервере (например: /var/www/appyland)
SERVER_PATH=""

# ========================================
# ПРОВЕРКА
# ========================================

if [ -z "$SERVER_HOST" ] || [ -z "$SERVER_USER" ] || [ -z "$SERVER_PATH" ]; then
  echo "❌ Ошибка: заполни все переменные в начале скрипта!"
  echo ""
  echo "Нужно заполнить:"
  echo "  SERVER_HOST - адрес сервера"
  echo "  SERVER_USER - пользователь SSH"
  echo "  SERVER_PATH - путь к папке сайта"
  exit 1
fi

if [ -z "$SERVER_PORT" ]; then
  SERVER_PORT=22
fi

echo "🚀 Деплой на production сервер"
echo "================================"
echo "Сервер: $SERVER_USER@$SERVER_HOST:$SERVER_PORT"
echo "Путь: $SERVER_PATH"
echo ""

# ========================================
# ДЕПЛОЙ
# ========================================

# Проверяем что dist собран
if [ ! -d "dist" ]; then
  echo "📦 Собираем проект..."
  npm run build:hosting
fi

echo "📤 Загружаем файлы на сервер..."
echo ""

# Загружаем через rsync
rsync -avz --delete \
  -e "ssh -p $SERVER_PORT" \
  dist/ \
  $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Деплой завершён успешно!"
  echo "Сайт обновлён: https://appyland.ru"
else
  echo ""
  echo "❌ Ошибка при деплое!"
  echo "Проверь SSH доступ к серверу."
fi

