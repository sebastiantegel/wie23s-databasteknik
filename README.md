# Movies api

Detta projekt visar hur ni kan bygga ett api med hjälp av nodejs, express och typescript.

## api

Detta projekt är själva api:t. Det använder express och typescript som tekniker. cors och json används som middlewares för att kunna hantera de förfrågningar som kommer in i applikationen.

Api:t implementerar CRUD-operationer för objektet Movie som vi definierar med hjälp av mongoose.

Installera beroende genom att köra

```bash
npm i
```

Starta applikationen genom att köra

```bash
npm run dev
```

OBS! api:t är konfigurerat med cors att använda localhost:5173 som betrodd anropare. Var noga med att er vite-applikation startar med denna url.

### .env

Du behöver skapa en .env-fil i rooten av projektet och lägga in vilken PORT som skall användas genom att skriva

PORT=3000

i filen. Du kan byta ut 3000 mot vilken port du vill. Undvik dock port 80 och 443.

MONGO_URL=<din connectionstring här>

Din connectionstring hittar du via webbgränssnittet när du är inloggad till mongodb.

### Endpoints

```bash
GET /
```

Kommer att visa oss en standardtext för att kontrollera att api:t lever och är igång

```bash
GET /movies
```

Ger oss en lista med de filmer som finns i databasen

```bash
GET /movies/:id
```

Ger oss tillbaka filmen med det id som står i url:en

```bash
POST /movies
```

Skapar en ny film i databasen med informationen från body i anropen. Body måste innehålla ett objekt med följande egenskaper:

- title: string
- length: number

```bash
PUT /movies/:id
```

Uppdaterar filmen med id:t från url:n i databasen. Informationen som kommer att skrivas till objektet finns i body på anropet på samma sätt som med POST ovan.

```bash
DELETE /movies/:id
```

Tar bort filmen med id:t från url:n i databasen.

## frontend

Detta projekt är en vite-applikation med vanilla typescript som på det enklaste möjliga sättet visar information från vårt api.

Installera beroenden genom:

```bash
npm i
```

Starta applikationen genom

```bash
npm run dev
```
