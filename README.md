-Zaimplementowano pełny CRUD dla trzech modeli: Participant, Expense oraz Trip.
-Przygotowano DTO dla wszystkich modeli oraz dodano walidację danych za pomocą class-validator.
-Skonfigurowano ValidationPipe w kontrolerach, dzięki czemu dane przesyłane do API są sprawdzane.
-Dodano i skonfigurowano Swagger UI oraz opisano w nim endpointy i DTO za pomocą odpowiednich dekoratorów.
-Przetestowano działanie wszystkich endpointów oraz walidacji danych przy użyciu Swagger UI.
- Dodatkowo zaimplementowano paginację przy pobieraniu listy danych dla Expense, Trip i Participant.

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

## Pagination

Pagination was also implemented for endpoints returning lists of data: 
- GET /trip
- GET /expense
- GET /participant