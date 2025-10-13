# Деплой на Production сервер через GitHub Actions

## Как это работает

При пуше в ветку `production` автоматически:
1. Собирается проект (`npm run build:hosting`)
2. Содержимое папки `dist/` загружается на сервер через SSH
3. Сайт обновляется на production сервере

---

## Настройка (один раз)

### Шаг 1: Добавь GitHub Secrets

Переходи в свой GitHub репозиторий:
```
Settings → Secrets and variables → Actions → New repository secret
```

Добавь 4 секрета:

#### 1. `PROD_SERVER_HOST`
Адрес твоего сервера, например:
```
appyland.ru
```
или IP:
```
123.45.67.89
```

#### 2. `PROD_SERVER_USER`
Имя пользователя на сервере для SSH подключения:
```
root
```
или
```
appyland
```

#### 3. `PROD_SERVER_SSH_KEY`
Приватный SSH ключ для подключения к серверу.

**Как получить:**
- Если у тебя уже есть доступ к серверу, это файл `~/.ssh/id_rsa` (или `id_ed25519`)
- Открой его: `cat ~/.ssh/id_rsa`
- Скопируй **весь** содержимое (включая `-----BEGIN...` и `-----END...`)
- Вставь в секрет

**Если ключа нет:**
```bash
# Создай новый SSH ключ
ssh-keygen -t ed25519 -C "github-actions"

# Скопируй публичный ключ на сервер
ssh-copy-id user@your-server.com

# Скопируй приватный ключ в GitHub Secret
cat ~/.ssh/id_ed25519
```

#### 4. `PROD_SERVER_PATH`
Путь к папке сайта на сервере, например:
```
/var/www/appyland
```
или
```
/home/appyland/public_html
```

---

## Использование

### Вариант 1: Автоматический деплой через ветку `production`

1. Создай ветку `production`:
```bash
git checkout -b production
git push -u origin production
```

2. Теперь при любом пуше в `production` будет автоматический деплой:
```bash
git checkout production
git merge main
git push
```

### Вариант 2: Ручной запуск

Переходи в GitHub:
```
Actions → Deploy to Production Server → Run workflow
```

---

## Проверка

После пуша:
1. Открой вкладку **Actions** в GitHub
2. Увидишь запущенный workflow
3. Дождись зелёной галочки ✅
4. Открой сайт и проверь изменения

---

## Если что-то пошло не так

### Ошибка подключения к серверу
- Проверь правильность `PROD_SERVER_HOST` и `PROD_SERVER_USER`
- Убедись, что SSH ключ правильный (должен быть **приватный** ключ)
- Проверь, что публичный ключ добавлен на сервер в `~/.ssh/authorized_keys`

### Ошибка прав доступа
- Убедись, что пользователь имеет права на запись в `PROD_SERVER_PATH`
```bash
# На сервере
chown -R your-user:your-user /var/www/appyland
chmod -R 755 /var/www/appyland
```

### Нужна помощь разработчика
Если у тебя нет доступа к серверу, попроси разработчика:
1. Предоставить SSH доступ (публичный ключ)
2. Или самому добавить GitHub Secrets в настройках репозитория

---

## Workflow для разработки

```bash
# Работаешь в main
git checkout main
git add .
git commit -m "feat: новая фича"
git push

# Когда готов к деплою на production
git checkout production
git merge main
git push  # ← автоматический деплой!
```

---

## Альтернатива: Деплой из любой ветки

Если хочешь деплоить из `main` вместо `production`, измени в файле:
```
.github/workflows/deploy-production.yml
```

Строку:
```yaml
branches:
  - production
```

На:
```yaml
branches:
  - main
```

Тогда каждый пуш в `main` будет деплоиться на production.

---

## Контакты

Если нужна помощь — пиши разработчику или в issues репозитория.

