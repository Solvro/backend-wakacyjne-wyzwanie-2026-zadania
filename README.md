
# Zadanie 2: Jak i gdzie przechowywać dane?




## Relacje między modelami - Zad 2 

* `Trip` posiada wielu `Participant` – relacja 1:N.
* `Trip` posiada wiele `Expense` – relacja 1:N.
* `Participant` może być odpowiedzialny za wiele `Expense` – relacja 1:N.
* Każdy `Participant` należy do jednego `Trip`.
* Każdy `Expense` należy do jednego `Trip` i ma jednego `Participant`, który go opłacił.

Wizualizacja relacji i modeli znajduje się w pliku `EDR.png`

Uwaga: Zastosowałam typ `Decimal` zamiast `Float`, ponieważ pola budget i amount przechowują wartości pieniężne, dla których `Decimal` zapewnia dokładniejszą reprezentację i unika typowych błędów zaokrągleń charakterystycznych dla `Float`. 

### Co zostało zrobione:
-Zaimplementowano pełny CRUD dla trzech modeli: Participant, Expense oraz Trip.
-Przygotowano DTO dla wszystkich modeli oraz dodano walidację danych za pomocą class-validator.
-Skonfigurowano ValidationPipe w kontrolerach, dzięki czemu dane przesyłane do API są sprawdzane.
-Dodano i skonfigurowano Swagger UI oraz opisano w nim endpointy i DTO za pomocą odpowiednich dekoratorów.
-Przetestowano działanie wszystkich endpointów oraz walidacji danych przy użyciu Swagger UI.
- Dodatkowo zaimplementowano paginację przy pobieraniu listy danych dla Expense.

## API Documentation 

### Expenses Endpoints

| Method | Endpoint | Endpoint description |
|:------:|:--------:|:--------------------:|
| POST | /expense | creates a new expense |
| GET | /expense | returns all expenses from the database |
| GET | /expense/{id} | returns an expense by ID |
| GET | /expense/trip/{tripId} | returns expenses belonging to a specific trip |
| GET | /expense/participant/{paidById} | returns expenses paid by a specific participant |
| PATCH | /expense/{id} | updates an expense by ID |
| DELETE | /expense/{id} | deletes an expense by ID |

### Participant Endpoints:
| Method | Endpoint | Endpoint description |
|:------:|:--------:|:--------------------:|
| POST | /participant | creates a new participant |
| GET | /participant | returns all participants from the database |
| GET | /participant/{id} | returns a participant by ID |
| PATCH | /participant/{id} | updates a participant by ID |
| DELETE | /participant/{id}| deletes a participant by ID|

### Trip Endpoints:
| Method | Endpoint | Endpoint description |
|:------:|:--------:|:--------------------:|
| POST | /trip | creates a new trip |
| GET | /trip | returns all trips from the database |
| GET | /trip/{id} | returns a trip by ID |
| PATCH | /trip/{id} |updates a trip by ID |
| DELETE | /trip/{id} | deletes a trip by ID |
