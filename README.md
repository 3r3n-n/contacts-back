# API for contacts app
This repo contains an API for a simple contacts app (there are not different users) implemented in node.js , using the mongoose library.

## API Reference

#### Get all contacts 
(pagination with a 10 contacts limit)

```http
  GET /api/contacts
```
No parameters are needed for this request.

#### Get a contact

```http
  GET /api/contacts/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of contact to fetch |

#### Create a new contact
```http
  POST /api/contacts/
```

| body. | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `firstName`      | `string` | **Required**. Contact's first name. Only letter non-international characters. |
| `lastName`      | `string` | **Required**. Contact's last name. Only letter non-international characters. |
| `phoneNumber`      | `string` | **Optional**. Contact's phone number. Only numeric digits.|
| `company`      | `string` | **Optional**. Contact's company. Only alphanumeric characters. |
| `email`      | `string` | **Required**. Contact's email. Only valid email addresses. |

The new contact's ID is automatically generated.

#### Update an existing contact

```http
  PUT /api/contacts/${id}
```
| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of contact to fetch |

| body. | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `firstName`      | `string` | **Optional**. Contact's first name. Only letter non-international characters. |
| `lastName`      | `string` | **Optional**. Contact's last name. Only letter non-international characters. |
| `phoneNumber`      | `string` | **Optional**. Contact's phone number. Only numeric digits.|
| `company`      | `string` | **Optional**. Contact's company. Only alphanumeric characters. |
| `email`      | `string` | **Optional**. Contact's email. Only valid email addresses. |

#### Delete a contact

```http
  DELETE /api/contacts/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of contact to delete. |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DB`

## Acknowledgements

This implementation would not have been possible without the patience and help from my mentors and fellow-academies, I don't write their specific names here because I have not asked for their consent.
