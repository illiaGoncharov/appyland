#!/bin/bash

# Деплой через FTP
# Использование:
# 1. Установи lftp: brew install lftp
# 2. Заполни переменные ниже
# 3. Запусти: chmod +x deploy-ftp.sh && ./deploy-ftp.sh

# ========================================
# ЗАПОЛНИ ЭТИ ПЕРЕМЕННЫЕ ИЗ АДМИНКИ
# ========================================

FTP_HOST="appyland.ru"  # или 217.18.62.34
FTP_USER=""  # FTP логин
FTP_PASS=""  # FTP пароль
FTP_PATH="/var/www/appyland"  # Путь к папке сайта

# ========================================
# ДЕПЛОЙ
# ========================================

if [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
  echo "❌ Заполни FTP_USER и FTP_PASS в скрипте!"
  exit 1
fi

echo "🚀 Деплой через FTP"
echo "================================"
echo "Сервер: $FTP_HOST"
echo "Путь: $FTP_PATH"
echo ""

# Проверяем что dist собран
if [ ! -d "dist" ]; then
  echo "📦 Собираем проект..."
  npm run build:hosting
fi

# Проверяем наличие lftp
if ! command -v lftp &> /dev/null; then
  echo "❌ lftp не установлен!"
  echo "Установи: brew install lftp"
  exit 1
fi

echo "📤 Загружаем файлы через FTP..."
echo ""

lftp -c "
set ftp:list-options -a;
open ftp://$FTP_USER:$FTP_PASS@$FTP_HOST;
lcd dist;
cd $FTP_PATH;
mirror --reverse --delete --verbose --parallel=10;
bye;
"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Деплой завершён!"
  echo "Сайт обновлён: https://appyland.ru"
else
  echo ""
  echo "❌ Ошибка при деплое!"
fi

