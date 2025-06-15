# Order Service API guide
Gold amount are number, not float.

## Set available resource value

```
curl  -X POST \
  'localhost:3000/add' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "amount":10
}'
```

## Submit Buy order

```
curl  -X POST \
  'localhost:3000/buy' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "amount":5
}'
```