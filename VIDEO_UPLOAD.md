# Инструкция: Загрузка видео через GitHub Releases

## Шаг 1: Создать Release

1. Зайди на https://github.com/illiaGoncharov/appyland/releases/new

2. Заполни форму:
   - **Tag version:** `v1.0-videos`
   - **Release title:** `Видео файлы для сайта v1.0`
   - **Description:** 
     ```
     Видео файлы для сайта Appyland.
     Используются на главной странице.
     ```

3. Перетащи все файлы из папки `video/` в область "Attach binaries"

4. Нажми **Publish release**

---

## Шаг 2: Обновить ссылки в HTML

После загрузки видео нужно обновить ссылки в `index.html`.

### Найди все теги с видео, например:

```html
<video src="video/PUBG_Showreel.mp4"></video>
```

### Замени на:

```html
<video src="https://github.com/illiaGoncharov/appyland/releases/download/v1.0-videos/PUBG_Showreel.mp4"></video>
```

### Список файлов для замены:

Файлы в папке `video/`:
- 1920x1080_pizza.mp4
- A-Club PRO 02.mp4
- APD.mp4
- APPYLAND_TENDER_SMARTCAMERA_2024.mp4
- Final_4.mp4
- InDrive_Car.mp4
- MAIN_Alfa_only_TSUM_20_cashback_8 1 (1).mp4
- MAIN_Alfa_only_TSUM_20_cashback_8 1.mp4
- PROFI_Map.mp4
- PUBG_Kreed.mp4
- PUBG_Showreel.mp4
- SBP_14.03_final 1.mp4
- Апподил-Акселератор -2 (9х16)_1.mp4
- ЯндексИгры_Ферма.mp4

---

## Шаг 3: Закоммитить изменения

После обновления ссылок:

```bash
git add index.html
git commit -m "fix: обновлены ссылки на видео (GitHub Releases)"
git push
```

---

## Альтернатива: Использовать относительные пути

Если не хочешь заливать видео в Releases, можешь:
1. Хранить видео локально при разработке
2. На продакшене использовать внешний CDN или хостинг
3. Или вообще заменить видео на GIF/WebM (они легче)

В папке `assets/img/video-gif/` уже есть GIF-версии некоторых видео!

