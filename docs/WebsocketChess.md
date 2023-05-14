# WebsocketChess protocol

## Table of Contents

- [WebsocketChess protocol](#websocketchess-protocol)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Protocol](#protocol)
    - [Message format](#message-format)
    - [Message types](#message-types)
    - [Data types and operations](#data-types-and-operations)
      - [Room](#room)
      - [Lobby](#lobby)
      - [Game](#game)


## Introduction

This document describes the WebSocket protocol used by the chess server. The protocol is used to communicate between the client and the server. The server is responsible for the game logic and the client is responsible for the user interface.

## Protocol

The protocol is based on JSON messages. The client and server can send messages to each other at any time. The server will always respond to a message with a message of its own. The server will never send a message without receiving one first.

### Message format

All messages are JSON objects. The object must contain a `type` field. The value of the `type` field determines the packet type. The object must also contain a `data` field.

| Field | Type | Description |
| --- | --- | --- |
| `type` | string | The type of the message. |
| `data` | object | The data of the message. |
| `op` | string | The operation to perform. |

If a data is invalid or missing, the server will respond with an error message. The error message will contain a `error` field with a description of the error. In case of an invalid message `type` or `op`, the server will respond terminate the connection.

Packet example:
```json
{
  "type": "room",
  "op": "create",
  "data": {
    "name": "My room"
    ...
  }
}
```

### Message types

There are several message types. The type of a message is determined by the `type` field. The following table describes the different message types.

| Type | Description |
| --- | --- |
| `connection` | Sent by the client when it connects to the server. |
| `success` | Sent by the server when a connection is established. |
| `error` | Sent by the server when an error occurs. |
| `room` | Used to events related to a room. |
| `lobby` | Used to events related to the lobby. |
| `game` | Used to events related to a game. |

### Data types and operations

For each message type there is a corresponding data type. The data type is determined by the `type` field. The following sections describe the different data types.

**Observation:** The `?` symbol indicates that the field is optional.

#### Room

Rooms are used to group players together. A room can be public or private. A public room can be joined by anyone. A private room can only be joined by players who know the password.

**Room objects are represented as follows:**
```json
{
  "id": "room-id",
  "name": "My room",
  "password": "password",
  "maxPlayers": 2,
  "players": [
    ...
  ],
  "status": "...",
  "board": {
    ...
  }
}
```

**Room operations:**
| Type | Description |
| --- | --- |
| `create` | This operation is used to create a new room. |
| `join` | This operation is used to join a room. |
| `leave` | This type is used to leave a room. |
| `info` | This type is used to get information about a room. |
| `start` | This type is used to start a game in a room. |
| `stop` | This type is used to stop a game in a room. |
| `message` | This type is used to send a message to a room. |

**Create room data:**
| Field | Type | Description |
| --- | --- | --- |
| `name` | string | The name of the room. |
| `password?` | string | The password of the room. |
| `maxPlayers?` | int | The maximum number of players in the room. |

When a room is created, the client will automatically join the room. The client will also be the owner of the room. The client receives a `room` message with the `create` operation. The `room` message contains the room object.

**Join room data:**
| Field | Type | Description |
| --- | --- | --- |
| `id` | string | The id of the room. |
| `password?` | string | The password of the room. |

When a client joins a room, the client receives a `room` message with the `join` operation. The `room` message contains the room object.

#### Lobby

| Type | Description |
| --- | --- |
| `list` | This operation is used to get a list of rooms. |
| `info` | This operation is used to get information about the lobby. |

**Lobby info data:**
| Field | Type | Description |
| --- | --- | --- |
| `rooms` | array | A list of rooms in the lobby. |

#### Game

| Type | Description |
| --- | --- |
| `move` | This operation is used to make a move in a game. |

