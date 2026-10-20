# Football Player Stats (MERN Stack Application)

Kompletna aplikacja internetowa klasy Fullstack (MERN: MongoDB, Express.js, React, Node.js) służąca do rejestrowania statystyk piłkarzy, ich wizualizacji za pomocą interaktywnych wykresów słupkowych oraz zarządzania bazą w oparciu o uwierzytelnianie użytkowników i autoryzację na poziomie zasobów.

---

## Spis treści
1. [Funkcjonalności](#funkcjonalności)
2. [Architektura systemu i stos technologiczny](#architektura-systemu-i-stos-technologiczny)
3. [Struktura projektu](#struktura-projektu)
4. [Interfejs API (REST Endpoints)](#interfejs-api-rest-endpoints)
5. [Model danych](#model-danych)
6. [Instalacja, konfiguracja i uruchomienie](#instalacja-konfiguracja-i-uruchomienie)
7. [Instrukcja użytkowania](#instrukcja-użytkowania)
8. [Stan implementacji i ograniczenia](#stan-implementacji-i-ograniczenia)

---

## Funkcjonalności

### 1. Panel użytkownika i uwierzytelnianie (`auth`)
* **Rejestracja użytkownika (`/register`)**: Walidacja po stronie serwera (`express-validator`) sprawdzająca minimalną długość loginu (min. 4 znaki), poprawność składni adresu e-mail oraz długość hasła (min. 6 znaków). Bezpieczne haszowanie haseł w bazie za pomocą `bcryptjs` (salt rounds = 10).
* **Logowanie (`/login`)**: Weryfikacja poświadczeń i autoryzacja w oparciu o React Context (`UserContext`).
* **Trasy chronione (`ProtectedRoute`)**: Automatyczne przekierowywanie nieuwierzytelnionych użytkowników do formularza logowania przy próbie dostępu do panelu głównego (`/`) lub statystyk (`/charts`).

### 2. Zarządzanie bazą piłkarzy (CRUD)
* **Katalog zawodników**: Pobieranie i prezentacja listy piłkarzy z MongoDB w tabeli z responsywnym przewijaniem horyzontalnym.
* **Sortowanie wielokolumnowe**: Możliwość dynamicznego sortowania rosnąco/malejąco według każdego atrybutu (nazwisko, wiek, pozycja, klub, gole, asysty, wzrost).
* **Filtrowanie i wyszukiwarka**: Filtrowanie rekordów w czasie rzeczywistym na podstawie wprowadzonego nazwiska.
* **Dodawanie i edycja rekordu**: Formularz modalny z pełną walidacją atrybutów (ograniczenia numeryczne: wiek 10–120 lat, wzrost 120–250 cm, nieujemne wartości goli i asyst).
* **Autoryzacja zasobów (Ownership Control)**: Przyciski edycji i usunięcia są widoczne i aktywne wyłącznie dla zawodników utworzonych przez aktualnie zalogowanego użytkownika (`createdBy === user.username`).

### 3. Analityka i wizualizacja danych (`FootballerCharts`)
* **Interaktywne wykresy słupkowe (`Recharts`)**:
  * Zestawienie liczby strzelonych bramek (*Goals*).
  * Zestawienie asyst (*Assists*).
  * Porównanie parametrów fizycznych (*Height*).
* **Filtrowanie pozycji**: Dedykowany selektor pozwalający zawęzić wykresy do konkretnych formacji (*Forward*, *Midfielder*, *Defender* lub wszystkie).

---

## Architektura systemu i stos technologiczny

### Backend
* **Środowisko uruchomieniowe**: Node.js + Express.js
* **Baza danych**: MongoDB (Object Data Modeling: Mongoose)
* **Bezpieczeństwo i walidacja**: `bcryptjs`, `express-validator`, `cors`, `dotenv`

### Frontend
* **Biblioteka UI**: React 18
* **Routing**: React Router v6 (`BrowserRouter`, `Routes`, `Route`, `Navigate`)
* **Zarządzanie stanem**: React Context API (`UserContext`)
* **Komunikacja HTTP**: Axios
* **Wykresy i wizualizacja**: Recharts
* **Powiadomienia i ikony**: React Hot Toast, React Icons (`FaSortUp`, `FaSortDown`, `FaEdit`, `FaTrash`)
* **Stylowanie**: Tailwind CSS + dedykowane pliki CSS

---

## Struktura projektu

```text
├── backend/
│   ├── models/
│   │   ├── Footballer.js     # Schemat Mongoose dla zawodnika
│   │   └── User.js           # Schemat Mongoose dla użytkownika (hook pre-save bcrypt)
│   ├── routes/
│   │   ├── auth.js           # Punkty końcowe rejestracji i logowania
│   │   └── footballers.js    # Punkty końcowe CRUD dla piłkarzy
│   ├── app.js                # Konfiguracja Express, middleware CORS i połączenie z MongoDB
│   ├── playersData.js        # Zestaw danych początkowych (seed data)
│   └── seed.js               # Skrypt czyszczący i inicjalizujący bazę danych
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FootballerCharts.js   # Komponent analityczny z wykresami Recharts
    │   │   ├── FootballerCharts.css  # Style dedykowane wykresom
    │   │   ├── FootballerTable.js    # Główna tabela danych z sortowaniem i akcjami CRUD
    │   │   ├── FootballerTable.css   # Style dedykowane tabeli i formularzom
    │   │   ├── LoginForm.js          # Widok logowania
    │   │   ├── Navbar.js             # Górny pasek nawigacyjny
    │   │   └── RegisterForm.js       # Widok rejestracji
    │   ├── App.js                    # Główny routing i definicja ProtectedRoute
    │   ├── UserContext.js            # Kontekst stanu sesji użytkownika
    │   ├── index.js                  # Punkt startowy aplikacji React
    │   └── index.css                 # Dyrektywy Tailwind CSS i style bazowe
    ├── tailwind.config.js            # Konfiguracja Tailwind CSS
    └── postcss.config.js             # Konfiguracja PostCSS
```

---

## Interfejs API (REST Endpoints)

| Metoda | Endpoint | Wymagane Body | Opis |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | `username`, `email`, `password` | Rejestracja nowego użytkownika |
| `POST` | `/api/auth/login` | `username`, `password` | Logowanie i weryfikacja hasła |
| `GET` | `/api/footballers` | *Brak* | Pobranie listy wszystkich zawodników |
| `POST` | `/api/footballers/add` | Pełny obiekt piłkarza + `createdBy` | Utworzenie nowego wpisu w bazie |
| `PUT` | `/api/footballers/:id` | Zaktualizowany obiekt + `createdBy` | Modyfikacja danych własnego zawodnika |
| `DELETE` | `/api/footballers/:id` | `{ createdBy: username }` | Usunięcie własnego zawodnika |

---

## Model danych

### Kolekcja `Footballer`
* `Surname` (String, wymagane) – nazwisko zawodnika
* `Age` (Number, wymagane, min: 10, max: 120) – wiek
* `Position` (String, wymagane) – pozycja na boisku
* `Club` (String, wymagane) – klub
* `Goals` (Number, wymagane, min: 0) – bramki
* `Assists` (Number, wymagane, min: 0) – asysty
* `Height` (Number, wymagane, min: 120, max: 250) – wzrost w cm
* `createdBy` (String, opcjonalne) – login użytkownika tworzącego wpis

### Kolekcja `User`
* `username` (String, wymagane, unikalne) – login użytkownika
* `email` (String, wymagane, unikalne) – adres e-mail
* `password` (String, wymagane) – zahashowane hasło (Bcrypt)

---

## Instalacja, konfiguracja i uruchomienie

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/TomaszMarek/Footballers
```

### 2. Konfiguracja zmiennych środowiskowych
Utwórz plik `.env` w katalogu backendu:
```env
MONGO_URL=mongodb://localhost:27017/football_db
PORT=8000
```

### 3. Uruchomienie backendu
```bash
cd backend
npm install
node seed.js    # (Opcjonalnie: zasilenie bazy przykładowymi danymi)
node app.js     # Start serwera na porcie 8000
```

### 4. Uruchomienie frontendu
```bash
cd ../frontend
npm install
npm start       # Start aplikacji na http://localhost:3000
```

---

## Instrukcja użytkowania

1. Po uruchomieniu aplikacji wejdź na `http://localhost:3000`.
2. Zostaniesz automatycznie przekierowany na ekran `/login`. Jeśli nie masz konta, przejdź do `/register` i utwórz profil.
3. Po poprawnym zalogowaniu system przeniesie Cię do widoku głównego (`/`):
   * Możesz przeglądać listę piłkarzy, wyszukiwać po nazwisku oraz sortować klikając nagłówki kolumn.
   * Kliknij **Add Player**, aby dodać nowego zawodnika.
   * Zawodnicy dodani przez Ciebie będą posiadać żółtą ikonę edycji oraz czerwoną ikonę usunięcia.
4. Kliknij zakładkę **Charts** na pasku nawigacji, aby analizować wykresy goli, asyst i wzrostu z opcją filtrowania pozycji.

---

## Stan implementacji i ograniczenia

* **Uwierzytelnianie**: Aplikacja wykorzystuje stan pamięci React Context (`UserContext`). Odświeżenie strony w przeglądarce (`F5`) powoduje zresetowanie stanu sesji i konieczność ponownego logowania (brak tokenów JWT w `localStorage`/ciasteczkach).
* **Autoryzacja backendowa**: Weryfikacja właściciela rekordu opiera się na porównaniu ciągu tekstowego `createdBy` przesyłanego jawnie w ciele żądania HTTP (wymaga zabezpieczenia podpisem kryptograficznym JWT).
* **Sztywny port API**: Wywołania `axios` posiadają wpisany adres `http://localhost:8000` (w środowisku produkcyjnym zalecane sparametryzowanie przez zmienne środowiskowe `process.env.REACT_APP_API_URL`).
