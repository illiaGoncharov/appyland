/*
  Скрипт вытягивает все тексты из index.html по атрибуту data-lang
  и записывает их в assets/i18n/ru.json, сохраняя всю разметку (<br>, <span>, img и т.д.).
  Также создает assets/i18n/en.json с теми же ключами и пустыми значениями.
*/

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const indexPath = path.join(ROOT, 'index.html');
const ruOutPath = path.join(ROOT, 'assets', 'i18n', 'ru.json');
const enOutPath = path.join(ROOT, 'assets', 'i18n', 'en.json');

function ensureDir(p) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function extractDataLang(html) {
  // Ищем все элементы с data-lang="key"
  const results = {};
  // Простой парсер на регулярках: ищем тег с атрибутом data-lang и ближайший закрывающий тег
  // Допущения: ключи уникальны на элемент, порядок корректен.
  const re = /<([a-zA-Z0-9\-]+)([^>]*?)data-lang=["']([a-zA-Z0-9_\-]+)["']([^>]*)>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const key = m[3];
    const inner = m[5];
    results[key] = inner.trim();
  }
  return results;
}

function main() {
  const html = fs.readFileSync(indexPath, 'utf8');
  const ru = extractDataLang(html);

  // Гарантируем наличие файлов/директории
  ensureDir(ruOutPath);
  ensureDir(enOutPath);

  // Читаем существующие json, чтобы не потерять уже внесенные правки
  let ruPrev = {};
  let enPrev = {};
  try { ruPrev = JSON.parse(fs.readFileSync(ruOutPath, 'utf8')); } catch (_) {}
  try { enPrev = JSON.parse(fs.readFileSync(enOutPath, 'utf8')); } catch (_) {}

  // Объединяем: новые ключи из index.html перезаписывают пустые, но не переписывают уже вручную отредактированные
  const ruMerged = { ...ruPrev };
  const enMerged = { ...enPrev };
  for (const key of Object.keys(ru)) {
    const value = ru[key];
    if (!ruMerged[key] || ruMerged[key] === '') ruMerged[key] = value;
    if (enMerged[key] === undefined) enMerged[key] = enMerged[key] ?? '';
  }

  fs.writeFileSync(ruOutPath, JSON.stringify(ruMerged, null, 2), 'utf8');
  fs.writeFileSync(enOutPath, JSON.stringify(enMerged, null, 2), 'utf8');

  console.log(`Extracted ${Object.keys(ru).length} keys ->`);
  console.log('RU:', ruOutPath);
  console.log('EN:', enOutPath);
}

main();
