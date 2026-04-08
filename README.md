# ⚽ Footballers

Fullstack aplikacja webowa do zarządzania bazą danych piłkarzy. Umożliwia rejestrację i logowanie użytkowników, dodawanie, edytowanie oraz usuwanie piłkarzy, a także przeglądanie statystyk w formie wykresów.

## 🛠 Stack technologiczny

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- bcryptjs (hashowanie haseł)
- express-validator (walidacja danych)
- dotenv, cors, body-parser

**Frontend**
- React 18
- React Router v6
- Axios
- Recharts (wykresy)
- Tailwind CSS + Material UI
- React Hot Toast (powiadomienia)
- React Icons

---

## ✨ Funkcjonalności

- Rejestracja i logowanie użytkowników (hasła hashowane bcryptjs)
- Chronione trasy – dostęp tylko dla zalogowanych użytkowników
- Tabela piłkarzy z możliwością dodawania, edytowania i usuwania rekordów
- Użytkownik może edytować/usuwać tylko własne rekordy (`createdBy`)
- Widok wykresów ze statystykami piłkarzy (Recharts)
- Walidacja formularzy po stronie backendu (express-validator)
- Import przykładowych danych przez seed skrypt

---



## 🚀 Instalacja i uruchomienie

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/TWOJ_USERNAME/footballers.git
cd footballers
```

### 2. Backend

```bash
cd backend
npm install
```

Utwórz plik `.env` w folderze `backend` (patrz sekcja [Zmienne środowiskowe](#-zmienne-środowiskowe)).

#### Opcjonalnie – import przykładowych piłkarzy

```bash
node seed.js
```

#### Uruchomienie serwera

```bash
npm start
```

Serwer działa na `http://localhost:8000`

---

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Aplikacja działa na `http://localhost:3000`

---

## 🔐 Zmienne środowiskowe

Utwórz plik `.env` w folderze `backend`:

```env
MONGO_URL=mongodb://localhost:27017/footballers
```

Jeśli korzystasz z MongoDB Atlas, wklej connection string z panelu Atlas:

```env
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/footballers
```

---

## 📡 API – endpointy

### Autoryzacja – `/api/auth`

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/api/auth/register` | Rejestracja nowego użytkownika |
| POST | `/api/auth/login` | Logowanie |

**Rejestracja – wymagane pola:**
```json
{
  "username": "min. 4 znaki",
  "email": "poprawny adres email",
  "password": "min. 6 znaków"
}
```

---

### Piłkarze – `/api/footballers`
s
| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/api/footballers` | Pobierz wszystkich piłkarzy |
| POST | `/api/footballers/add` | Dodaj nowego piłkarza |
| PUT | `/api/footballers/:id` | Edytuj piłkarza (tylko właściciel) |
| DELETE | `/api/footballers/:id` | Usuń piłkarza (tylko właściciel) |


---


## 🌱 Import przykładowych danych

Plik `seed.js` wypełnia bazę danych przykładowymi piłkarzami z pliku `playersData.js`.

```bash
cd backend
node seed.js
```

Po wykonaniu komendy baza jest gotowa do działania – można uruchomić backend i frontend.
