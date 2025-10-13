# 🚀 Инструкция по деплою

Проект использует Vite и поддерживает деплой на любой хостинг.

## 📦 Билд команды

### Для GitHub Pages
```bash
npm run build:gh
```
- Создаёт `/dist/` с базовым путём `/appyland/`
- Автоматически деплоится через GitHub Actions при пуше в `main`

### Для обычного хостинга (Nginx, Apache, Vercel, Netlify и т.д.)
```bash
npm run build:hosting
```
- Создаёт `/dist/` с базовым путём `/` (корень)
- Просто загрузи содержимое `/dist/` на сервер

### Универсальная команда (для GitHub Pages по умолчанию)
```bash
npm run build
```
- То же самое, что `build:gh`

---

## 🌍 Деплой на разные хостинги

### 1️⃣ **GitHub Pages** (текущий)
✅ **Уже настроено!** Автоматический деплой при пуше в `main`.

**Как это работает:**
- GitHub Actions запускает `npm run build:gh`
- Билд публикуется на `https://username.github.io/appyland/`

**Если нужно изменить:**
- Настройки в `.github/workflows/deploy.yml`

---

### 2️⃣ **Обычный хостинг (VPS, хостинг-провайдер)**

**Шаги:**

1. Собери проект:
   ```bash
   npm run build:hosting
   ```

2. Загрузи **содержимое** папки `/dist/` на сервер:
   ```bash
   # Пример с rsync
   rsync -avz --delete dist/ user@yourserver.com:/var/www/appyland/
   
   # Или через FTP/SFTP клиент
   ```

3. Настрой веб-сервер:

   **Nginx:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/appyland;
       index index.html;
       
       # SPA fallback
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Кэширование ассетов
       location ~* \.(js|css|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|mp4)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

   **Apache (.htaccess):**
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   
   # Кэширование
   <FilesMatch "\.(js|css|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|mp4)$">
       Header set Cache-Control "max-age=31536000, public"
   </FilesMatch>
   ```

---

### 3️⃣ **Vercel**

1. Собери проект:
   ```bash
   npm run build:hosting
   ```

2. Деплой через CLI:
   ```bash
   vercel --prod
   ```

Или через веб-интерфейс Vercel:
- Подключи GitHub репозиторий
- Build Command: `npm run build:hosting`
- Output Directory: `dist`

---

### 4️⃣ **Netlify**

1. Собери проект:
   ```bash
   npm run build:hosting
   ```

2. Деплой через CLI:
   ```bash
   netlify deploy --prod --dir=dist
   ```

Или через веб-интерфейс:
- Build Command: `npm run build:hosting`
- Publish Directory: `dist`

**netlify.toml:**
```toml
[build]
  command = "npm run build:hosting"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 5️⃣ **Docker**

**Dockerfile:**
```dockerfile
# Сборка
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:hosting

# Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Запуск:**
```bash
docker build -t appyland .
docker run -p 80:80 appyland
```

---

## ✅ Проверка работы

После деплоя проверь:
1. **Главная страница** загружается
2. **Видео** воспроизводятся (верхний и нижний слайдеры)
3. **Анимации Lottie** работают
4. **Переключение языка** (EN/RU) работает
5. **Консоль браузера** чистая (нет ошибок 404)

---

## 🔧 Технические детали

### Как работают ассеты

**В dev-режиме:**
```
/video/Final_4.mp4 → http://localhost:3000/video/Final_4.mp4
```

**В prod-билде (Vite автоматически):**
```
/video/Final_4.mp4 → /assets/Final_4-a1b2c3d4.mp4
```

Все пути автоматически обновляются через:
- `js/assets.js` — импорт через `import.meta.glob`
- `js/init.js` — перехват fetch и замена src

### Почему два билда?

- **GitHub Pages:** хостит в подпапке → нужен базовый путь `/appyland/`
- **Обычный хостинг:** хостит в корне → нужен базовый путь `/`

---

## 📝 Дополнительно

### Проверка локально

После билда можно протестировать локально:

```bash
npm run build:hosting
npm run preview
```

Откроет сервер на `http://localhost:4173` с продакшн-версией.

### Оптимизация

Vite автоматически:
- ✅ Минифицирует JS/CSS
- ✅ Хэширует имена файлов (кэширование)
- ✅ Удаляет `console.log` в проде
- ✅ Оптимизирует импорты
- ✅ Code splitting

---

**Вопросы?** Проверь консоль браузера (F12) — там будут видны ошибки если что-то не так.
