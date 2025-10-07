#!/bin/bash

# Скрипт для деплоя сайта на основной сервер
# 
# Использование:
# 1. Настрой переменные ниже под свой сервер
# 2. Запусти: ./deploy-to-server.sh

# ================================
# НАСТРОЙКИ (заполни своими данными)
# ================================

SERVER_USER="your_user"              # Пользователь на сервере
SERVER_HOST="your-server.com"        # Адрес сервера
SERVER_PATH="/var/www/appyland"      # Путь к сайту на сервере

# ================================
# ДЕПЛОЙ
# ================================

echo "🚀 Начинаем деплой на продакшен сервер..."
echo ""

# Проверка что все файлы закоммичены
if [[ -n $(git status -s) ]]; then
  echo "⚠️  Внимание: есть незакоммиченные изменения!"
  echo "Рекомендуется закоммитить всё перед деплоем."
  read -p "Продолжить? (y/n): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo "📦 Создание архива для загрузки..."

# Создаём временную папку для сборки
BUILD_DIR="build_prod"
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR

# Копируем всё нужное (исключая .git, node_modules и т.д.)
rsync -av \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='node_modules' \
  --exclude='build_prod' \
  --exclude='*.sh' \
  --exclude='*.md' \
  --exclude='.DS_Store' \
  ./ $BUILD_DIR/

echo ""
echo "📤 Загрузка на сервер $SERVER_HOST..."
echo ""

# Загрузка на сервер
rsync -avz --delete \
  $BUILD_DIR/ \
  $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# Очистка
rm -rf $BUILD_DIR

echo ""
echo "✅ Деплой завершён!"
echo "Сайт обновлён на: $SERVER_HOST"
echo ""

