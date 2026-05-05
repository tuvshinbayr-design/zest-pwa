# ZEST PWA - Суулгах заавар

## Файлуудын жагсаалт
```
zest-pwa/
├── index.html        ← Үндсэн хуудас (PWA код багтсан)
├── app.jsx           ← Системийн код (zest-system.jsx-ийг хуулна)
├── manifest.json     ← Аппын мэдээлэл
├── sw.js             ← Offline ажиллуулах
├── icon-192.png      ← Апп icon (192x192)
└── icon-512.png      ← Апп icon (512x512)
```

---

## 1-р алхам: Icon хийх
- https://favicon.io/favicon-generator/ сайтаар Z үсэг, цэнхэр дэвсгэртэй icon хийгээрэй
- 192x192 болон 512x512 хэмжээтэй PNG татаж аваарай

---

## 2-р алхам: Railway дээр байршуулах (ҮНЭГҮЙ)

1. https://railway.app бүртгэл нээнэ
2. "New Project" → "Deploy from GitHub" сонгоно
3. Эдгээр файлуудыг GitHub repo-д оруулна
4. Railway автоматаар байршуулна
5. Домайн нэр авна (жишээ: zest-app.railway.app)

---

## 3-р алхам: iPhone дээр суулгах
1. Safari-аар zest-app.railway.app нээнэ
2. Доорх ⬆️ Share товч дарна
3. "Add to Home Screen" сонгоно
4. "Add" дарна → Дэлгэц дээр апп icon гарна! ✅

---

## 4-р алхам: Android дээр суулгах
1. Chrome-аар нээнэ
2. "Суулгах" banner гарч ирнэ → дарна
3. Эсвэл menu → "Add to Home Screen" ✅

---

## Тусламж хэрэгтэй бол
Claude.ai дээр асуугаарай 😊
