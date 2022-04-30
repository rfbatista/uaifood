# uaifood

# Roadmap
✅ Salvar restaurantes

✅ Salvar items

➖ Listar restaurantes

  ✅ Cidade

  ✅ Prato

  ❌ Tipo de cozinha

  ❌ Distância

❌ Atualizar Item


# Variaveis de ambiente

Para executar o projeto voce precida adicionar as seguintes variaveis em seu `.env`

`POSTGRES_NAME`

`POSTGRES_PASSWORD`

`POSTGRES_USER`

`POSTGRES_HOST`

`POSTGRES_PORT`

#  Run in docker

`make start` ou `docker-compose up --build`

# Rodando na sua máquina
```
npm i
npm run dev
```

# Rotas
POST `/api/v1/restaurant`
```
{
  "name": "Japa",
  "culinary": "Japonesa",
  "city": "Piracicaba",
  "local": {
    "lat": 10.000023,
    "long": 22.4432342
  }
}
```
POST `/api/v1/item`
```
{
  "restaurantId": "ab417b62-5354-458e-9228-9694b2c5101f",
  "name": "Lanche",
  "price": 29.00
}
```
GET `/api/v1/health-check`

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
│   |   |   |   ├── /healt-controller/           
│   |   |   |   ├── /restaurant-controller/                
│   |   |   |   ├── /item-controller/
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
Infelizmente não tive tempo hábil pra descrever melhor a aplicação, mas segue alguns apontamentos.

### Money
`Money` E uma propriedade recorrente, 
### Price
`Price` e importante para aplicacao e merece cuidado na sua gestao por isso decidi torna-la um value-object.

### Culinary
`Culinary` não contem regras de negocio mas devido a sua importancia na entidade `Restaurant` podem sugir necessidade particulares na sua implementação tratando como um value object ela fica aberta para expansão e fechada para modificações.  

### UniqueIdentifier

O ID e tratado como uma value object para aplicarmos estrategias diferentes para geração dos identificadores e também não expormos detalhes de implementação (ex.: id incrementados) para serviços externos.
