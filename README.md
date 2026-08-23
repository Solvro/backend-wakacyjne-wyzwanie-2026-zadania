
## Zadanie 2: Jak i gdzie przechowywać dane?


### Co zostało zrobione:
* Utworzenie diagramu ERD dla modeli `Trip`, `Expense` i `Participant`
* Odwzorowanie modeli z ERD w `prisma/schema.prisma`
* Skonfigurowanie Prisma 7 oraz połączenia z bazą SQLite (struggle was real)
* Utworzenie i wykonanie migracji bazy danych
* Weryfikacja struktury i danych w bazie za pomocą Prisma Studio
* Utworzenie modułu i serwisu NestJS do komunikacji z bazą danych
* Utworzenie `prisma/seed.ts`
* Dodanie przykładowych danych dla modeli `Trip`, `Participant` i `Expense`
* Utworzenie endpointów API dla modelu `Trip`
* Przetestowanie endpointów za pomocą Postmana
* Weryfikacja, czy operacje API mają odzwierciedlenie w bazie danych

### Relacje między modelami

* `Trip` posiada wielu `Participant` – relacja 1:N.
* `Trip` posiada wiele `Expense` – relacja 1:N.
* `Participant` może być odpowiedzialny za wiele `Expense` – relacja 1:N.
* Każdy `Participant` należy do jednego `Trip`.
* Każdy `Expense` należy do jednego `Trip` i ma jednego `Participant`, który go opłacił.

Wizualizacja relacji i modeli znajduje się w pliku `EDR.png`

Uwaga: Zastosowałam typ `Decimal` zamiast `Float`, ponieważ pola budget i amount przechowują wartości pieniężne, dla których `Decimal` zapewnia dokładniejszą reprezentację i unika typowych błędów zaokrągleń charakterystycznych dla `Float`. 

### API Documentation 


| Method | Endpoint | Endpoint description |
|:------:|:--------:|:--------------------:|
| GET | /trips | returns all trips from the database |
| POST | /trips| creates a new trip |