#!/bin/bash

# Скрипт для обновления ссылок на видео в index.html
# После загрузки видео в GitHub Releases запусти этот скрипт

RELEASE_TAG="v1.0-videos"
REPO="illiaGoncharov/appyland"

echo "Обновление ссылок на видео в index.html..."

# Список видео файлов для замены
videos=(
  "A-Club PRO 02.mp4"
  "Final_4.mp4"
  "APD.mp4"
  "PUBG_Showreel.mp4"
  "PUBG_Kreed.mp4"
  "SBP_14.03_final 1.mp4"
  "APPYLAND_TENDER_SMARTCAMERA_2024.mp4"
  "PROFI_Map.mp4"
  "Апподил-Акселератор -2 (9х16)_1.mp4"
  "ЯндексИгры_Ферма.mp4"
  "InDrive_Car.mp4"
  "MAIN_Alfa_only_TSUM_20_cashback_8 1.mp4"
)

for video in "${videos[@]}"; do
  # URL-encode имени файла для ссылок
  encoded_video=$(echo "$video" | sed 's/ /%20/g')
  
  echo "Обновление: $video"
  
  # Замена в index.html
  sed -i '' "s|./video/$video|https://github.com/$REPO/releases/download/$RELEASE_TAG/$encoded_video|g" index.html
done

echo "✅ Готово! Ссылки обновлены."
echo ""
echo "Теперь выполни:"
echo "git add index.html"
echo "git commit -m 'fix: обновлены ссылки на видео (GitHub Releases)'"
echo "git push"

