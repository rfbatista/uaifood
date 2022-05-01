# uaifood
A blazing fast uaifood api.

# Roadmap
- ✅ Salvar restaurantes

- ✅ Salvar items

- ✅ Listar restaurantes

  -  ✅ Cidade

  -  ✅ Prato

  -  ✅ Tipo de cozinha

  -  ✅ Distância

- ✅ Atualizar Item


# Variaveis de ambiente

Para executar o projeto voce precisa adicionar as seguintes variaveis em seu `.env`

`NODE_ENV`

`POSTGRES_NAME`

`POSTGRES_PASSWORD`

`POSTGRES_USER`

`POSTGRES_HOST`

`POSTGRES_PORT`

#  Executar aplicação

`make start` ou `docker-compose up --build`

# Rotas

GET Buscar restauntante `/api/v1/restaurant`
```
curl --location --request GET 'http://localhost:3000/api/v1/restaurant?city=Pir&culinary=j&distancelat=11.000023&distancelong=22.4432342&distanceradius=100'
```

POST Criar restaurante  `/api/v1/restaurant`
```
curl --location --request POST 'http://localhost:3000/api/v1/restaurant' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Italia",
  "culinary": "Italiana",
  "city": "Santa Barbara",
  "local": {
    "lat": 10.000023,
    "long": 22.4432342
  }
}'
```
POST Criar item `/api/v1/item`
```
curl --location --request POST 'http://localhost:3000/api/v1/item' \
--header 'Content-Type: application/json' \
--data-raw '{
  "restaurantId": "ab417b62-5354-458e-9228-9694b2c5101f",
  "name": "Lanche",
  "price": 29.00
}'
```
PUT Atualizar item `api/v1/item`
```
curl --location --request PUT 'http://localhost:3000/api/v1/item' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id": "ac4bdd42-094d-47bb-a08d-8d087a34994a",
  "name": "Hamburguer",
  "price": 32.3
}'
```

GET `/api/v1/health-check`
```
curl --location --request GET 'http://localhost:3000/api/v1/health-check'`
```

## Estrutura

```bash
├── /src/                                           
│   ├── /infrastructure/ 
│   |   ├── /config/                   
│   |   ├── /data-source/                  
│   |   |   ├── /schemas/               
│   |   |   ├── /postgres/
│   |   |   |   ├── /repositories/
│   |   ├── /error/                    
│   |   ├── /logger/                    
│   |   ├── /middlewares/  
│   ├── /presentation/                     
│   |   |   ├── /controllers/
│   |   |   |   ├── /health-controller.ts           
│   |   |   |   ├── /restaurant-controller.ts                
│   |   |   |   ├── /item-controller.ts
│   |   |   ├── /input/
│   |   |   |   ├── /item/
│   |   |   |   ├── /restaurant/
│   ├── /core/
│   |   ├── /application/             
│   |   |   ├── /usecases/        
│   |   ├── /domain/             
│   |   |   ├── /entities/                
│   |   |   ├── /value-object/ 
│   |   ├── /Ports.ts 
│   |   ├── /Result.ts 
│   |   ├── /UseCase.ts 
│   ├── /di/                        
│   |   ├── /startup.ts                 
│   |   ├── /container.ts                 
│   /index.ts
```
