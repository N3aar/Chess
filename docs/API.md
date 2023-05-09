# API routes

## (get) /
Returns app page

## (post) /room
Creates a new room

Request:
```json
{
  "roomName": "Room",
  "maxPlayers": 2
}
```

Response:
```json
{
  "id": "88f41b0d79880b30bd632a254431bf87",
  "name": "Room",
  "status": "WAITING",
  "turn": 0,
  "board": [],
  "maxPlayers": 2
}
```

## (post) /room/join
Joins a room

Request:
```json
{
  "roomId": "88f41b0d79880b30bd632a254431bf87",
  "playerId": "..."
}
```

Response:
```json
{
  "id": "88f41b0d79880b30bd632a254431bf87",
  "name": "Room",
  "status": "WAITING",
  "turn": 0,
  "board": [],
  "maxPlayers": 2,
  "players": [{
    ...
  }]
}
```


## (get) /rooms/:id
Returns room with id

```json
{
  "id": "88f41b0d79880b30bd632a254431bf87",
  "name": "Room",
  "status": "WAITING",
  "turn": 0,
  "board": [],
  "maxPlayers": 2,
  "players": []
}
```

## (get) /rooms
Returns all rooms

```json
[
  {
    "id": "88f41b0d79880b30bd632a254431bf87",
    "name": "Room",
    "status": "WAITING",
    "turn": 0,
    "board": [],
    "maxPlayers": 2,
    "players": []
  },
  {
    "id": "2fef920723f17c1a9aeea13cfa594d34",
    "name": "Room",
    "status": "PLAYING",
    "turn": 0,
    "board": [],
    "maxPlayers": 2,
    "players": [{
      ...
    }]
  }
]
```

