# Инструкция по настройке проекта

## 1. GitHub Pages

### Автоматический деплой настроен через GitHub Actions

После каждого push в `main` сайт автоматически деплоится на:
**https://illiagoncharov.github.io/appyland/**

### Включение GitHub Pages (один раз)

1. Зайди в настройки репозитория: https://github.com/illiaGoncharov/appyland/settings/pages
2. В разделе **Source** выбери: `GitHub Actions`
3. Сохрани

После первого push с workflow файлом деплой запустится автоматически.

---

## 2. Видео файлы

Видео файлы не хранятся в git из-за размера. Есть два варианта:

### Вариант A: GitHub Releases (рекомендуется)

1. **Создать Release:**
   ```bash
   # Перейди на https://github.com/illiaGoncharov/appyland/releases/new
   # Или используй команду:
   gh release create v1.0-videos --title "Видео файлы v1.0" --notes "Видео для сайта"
   ```

2. **Загрузить видео:**
   - Через веб-интерфейс: перетащи все файлы из папки `video/` в Release
   - Или через CLI: `gh release upload v1.0-videos video/*.mp4`

3. **Обновить ссылки в HTML:**
   ```html
   <!-- Вместо: -->
   <video src="video/video-name.mp4"></video>
   
   <!-- Использовать: -->
   <video src="https://github.com/illiaGoncharov/appyland/releases/download/v1.0-videos/video-name.mp4"></video>
   ```

### Вариант Б: Внешний хостинг

Можно использовать:
- **Cloudflare R2** (бесплатно до 10GB)
- **Bunny CDN** (дешево, быстро)
- **YouTube** (встроить через iframe)

---

## 3. Разработка с ветками

Для работы над задачами используем feature-ветки:

```bash
# Создать ветку для задачи
git checkout -b feature/desktop-improvements

# Работать, коммитить
git add .
git commit -m "fix: исправлена адаптация хедера"

# Запушить ветку
git push origin feature/desktop-improvements

# Создать Pull Request на GitHub
# После ревью - смержить в main
```

### Основные ветки:

- `main` - основная ветка, деплоится на Pages
- `feature/*` - новые функции
- `fix/*` - исправления багов
- `docs/*` - обновления документации

---

## 4. Следующие шаги

- [ ] Включить GitHub Pages в настройках
- [ ] Загрузить видео через Release
- [ ] Обновить ссылки на видео в HTML
- [ ] Начать доработки по списку
- [ ] Добавить английскую версию

