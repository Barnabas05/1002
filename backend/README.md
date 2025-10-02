# 🚀 Energy Drinks API Backend

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**🔥 Modern RESTful API for Energy Drinks Management 🔥**

</div>

## 📋 Tartalomjegyzék

- [📖 Leírás](#-leírás)
- [✨ Funkciók](#-funkciók)
- [🛠️ Technológiai Stack](#️-technológiai-stack)
- [📦 Telepítés](#-telepítés)
- [🔧 Konfigurálás](#-konfigurálás)
- [🚀 Futtatás](#-futtatás)
- [📡 API Endpoints](#-api-endpoints)
- [💾 Adatbázis Struktúra](#-adatbázis-struktúra)
- [📝 Példák](#-példák)
- [🐛 Hibakezelés](#-hibakezelés)
- [🤝 Közreműködés](#-közreműködés)

## 📖 Leírás

Ez a projekt egy modern, RESTful API backend alkalmazás energiaitalok kezelésére. Az alkalmazás Express.js keretrendszert használ Node.js környezetben, MySQL adatbázissal a háttérben.

### 🎯 Célok
- ⚡ Gyors és hatékony API végpontok
- 🔒 Biztonságos adatkezelés
- 📊 Energiaitalok teljes körű menedzselése
- 🎨 Tiszta és karbantartható kód

## ✨ Funkciók

| Funkció | Státusz | Leírás |
|---------|---------|--------|
| 📋 **GET** `/energy_drinks` | ✅ | Összes energiaital lekérdezése |
| ➕ **POST** `/energy_drinks` | ✅ | Új energiaital hozzáadása |
| 🗑️ **DELETE** `/energy_drinks/:id` | ✅ | Energiaital törlése ID alapján |
| ✏️ **PUT** `/energy_drinks/:id` | ✅ | Energiaital módosítása ID alapján |

## 🛠️ Technológiai Stack

<div align="center">

| Technológia | Verzió | Szerepe |
|-------------|--------|---------|
| **Node.js** | Latest | JavaScript runtime |
| **Express.js** | ^5.1.0 | Web framework |
| **MySQL2** | ^3.15.1 | Adatbázis driver |
| **Nodemon** | ^3.1.10 | Development tool |

</div>

## 📦 Telepítés

### Előfeltételek
- 📦 [Node.js](https://nodejs.org/) (v14 vagy újabb)
- 🐬 [MySQL](https://www.mysql.com/) szerver
- 💻 Git

### Lépések

1. **Repository klónozása**
   ```bash
   git clone https://github.com/Barnabas05/1002
   cd backend
   ```

2. **Függőségek telepítése**
   ```bash
   npm install
   ```

## 🔧 Konfigurálás

### Adatbázis beállítás
1. Hozz létre egy MySQL adatbázist `energy_drinks` néven
2. Állítsd be a kapcsolat paramétereket a `server.js` fájlban:

```javascript
const connection = await mysql.createConnection({
    host: "localhost",     // MySQL szerver címe
    user: "root",          // Felhasználónév
    database: "energy_drinks", // Adatbázis neve
    password: "your_password"  // Jelszó (ha szükséges)
});
```

### Adatbázis táblák
Hozd létre a következő táblát:

```sql
CREATE TABLE drinks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    caffeine INT NOT NULL,
    sugar_free BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🚀 Futtatás

### Development mód
```bash
npm start
```

### Production mód
```bash
node server.js
```

A szerver elindul a `http://localhost:3000` címen 🌐

## 📡 API Endpoints

<div align="center">

### 🔗 Base URL: `http://localhost:3000`

</div>

### 📋 **GET** `/energy_drinks`
Összes energiaital lekérdezése

**Válasz:**
```json
[
    {
        "id": 1,
        "name": "Red Bull",
        "brand": "Red Bull GmbH",
        "caffeine": 80,
        "sugar_free": false,
        "created_at": "2025-10-02T10:00:00.000Z",
        "updated_at": "2025-10-02T10:00:00.000Z"
    }
]
```

### ➕ **POST** `/energy_drinks`
Új energiaital hozzáadása

**Kérés:**
```json
{
    "name": "Monster Energy",
    "brand": "Monster Beverage",
    "caffeine": 160,
    "sugar_free": false
}
```

**Válasz:**
```json
{
    "message": "Drink added",
    "drinkId": 2
}
```

### ✏️ **PUT** `/energy_drinks/:id`
Energiaital módosítása

**Kérés:**
```json
{
    "name": "Red Bull Sugar Free",
    "brand": "Red Bull GmbH",
    "caffeine": 80,
    "sugar_free": true
}
```

**Válasz:**
```json
{
    "message": "Drink updated"
}
```

### 🗑️ **DELETE** `/energy_drinks/:id`
Energiaital törlése

**Válasz:**
```json
{
    "message": "Drink deleted"
}
```

## 💾 Adatbázis Struktúra

```
┌─────────────────┐
│     drinks      │
├─────────────────┤
│ id (PK)         │ INT AUTO_INCREMENT
│ name            │ VARCHAR(255) NOT NULL
│ brand           │ VARCHAR(255) NOT NULL
│ caffeine        │ INT NOT NULL
│ sugar_free      │ BOOLEAN NOT NULL
│ created_at      │ TIMESTAMP
│ updated_at      │ TIMESTAMP
└─────────────────┘
```

## 📝 Példák

### 🌩️ Thunder Client Tesztek

> **💡 Tipp:** Telepítsd a Thunder Client extensiont a VS Code-ban a könnyű API teszteléshez!

#### 📋 **GET** - Összes ital lekérdezése
```
Method: GET
URL: http://localhost:3000/energy_drinks
Headers: (nincs szükség külön header-re)
Body: (nincs)
```

#### ➕ **POST** - Új ital hozzáadása
```
Method: POST
URL: http://localhost:3000/energy_drinks
Headers:
    Content-Type: application/json
Body (JSON):
{
    "name": "Monster Energy",
    "brand": "Monster Beverage",
    "caffeine": 160,
    "sugar_free": false
}
```

#### ✏️ **PUT** - Ital módosítása
```
Method: PUT
URL: http://localhost:3000/energy_drinks/1
Headers:
    Content-Type: application/json
Body (JSON):
{
    "name": "Red Bull Zero",
    "brand": "Red Bull GmbH",
    "caffeine": 80,
    "sugar_free": true
}
```

#### 🗑️ **DELETE** - Ital törlése
```
Method: DELETE
URL: http://localhost:3000/energy_drinks/1
Headers: (nincs szükség külön header-re)
Body: (nincs)
```

### 🔧 Thunder Client Collection Import

Hozz létre egy új Thunder Client Collection-t és add hozzá a következő request-eket:

1. **Collection név:** `Energy Drinks API`
2. **Base URL:** `http://localhost:3000`
3. **Requests:**
   - `GET All Drinks` → `/energy_drinks`
   - `POST New Drink` → `/energy_drinks`
   - `PUT Update Drink` → `/energy_drinks/{{id}}`
   - `DELETE Remove Drink` → `/energy_drinks/{{id}}`

### 📋 Thunder Client Environment Variables
```json
{
    "base_url": "http://localhost:3000",
    "drink_id": "1"
}
```

## 🐛 Hibakezelés

Az API a következő HTTP státuszkódokat használja:

| Kód | Jelentés | Leírás |
|-----|----------|--------|
| 🟢 **200** | OK | Sikeres művelet |
| 🟢 **201** | Created | Új erőforrás létrehozva |
| 🟡 **400** | Bad Request | Hibás kérés |
| 🔴 **404** | Not Found | Erőforrás nem található |
| 🔴 **500** | Internal Server Error | Szerver hiba |

### Példa hibaüzenet:
```json
{
    "error": "Hiányzó mezők"
}
```

## 🤝 Közreműködés

1. 🍴 Fork a projektet
2. 🌿 Hozz létre egy feature branchet (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit a változtatásaidat (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push a branchre (`git push origin feature/AmazingFeature`)
5. 🔃 Nyiss egy Pull Requestet

---

<div align="center">

Készítette: Kálmán Barnabás 



</div>