
### Installation & Setup

1. **Clone and install dependencies:**
```bash
git clone https://github.com/carloshuayamares/app-nodejs-codechallenge.git
cd app-nodejs-codechallenge
npm install
```

2. **Set up environment:**
```bash
cp .env.example .env
# Edit .env if needed (defaults should work)
```

3. **Start the application and services:**
  - **Script Pre-Population**: An initial query is executed to create the transaction types and transaction states.

```bash
npm run build
npm run docker:up
```


The application will be available at:
- **GraphQL Playground**: http://localhost:3000/graphql
- **Kafka UI**: http://localhost:8080

### Examples via GraphQL Playground:

#### 1. Create a Transaction 

**GraphQL Mutation:** 
```graphql
mutation {
  createTransaction(input: {
    accountExternalIdDebit: "550e8400-e29b-41d4-a716-446655440000"
    accountExternalIdCredit: "550e8400-e29b-41d4-a716-446655440001"
    tranferTypeId: 1
    value: 500
  }) {
    transactionExternalId
    transactionType {
      name
    }
    transactionStatus {
      name
    }
    value
    createdAt
  }
}
```

**Expected Response:**
```json
{
  "data": {
    "createTransaction": {
      "transactionExternalId": "generated-uuid",
      "transactionType": {
        "name": "Transfer"
      },
      "transactionStatus": {
        "name": "pending"
      },
      "value": 500,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### 2. Retrieve a Transaction

**GraphQL Query:**
```graphql
query {
  getTransaction(transactionExternalId: "c98c1180-0dc8-4240-a9be-e5649ca14a43") {
    transactionExternalId
    transactionType {
      name
    }
    transactionStatus {
      name
    }
    value
    createdAt
  }
}
```
