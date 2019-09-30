## aai-setest
This project demonstrates a simple example of micro-services architecture using a messaging middleware to decouple the system components. The system processes
the image payload in the query and returns the result back to the user.

## Get started

**Clone the repository**

**Run and Build the app**

```sh
cd docker
docker-compose up
```

## Testing

Open your browser at [http://localhost:8080](http://localhost:8080) and start sending HTTP POST to `/query` or HTTP GET to `/images`.

**Request sample:**

```bash
curl -F "image=@./c1/assets/github.png" localhost:8080/query
```

The server returns the following response:

```json
{
  "status": "SUCCESS",
  "size": "6.94kb"
}
```

`HTTP GET` `/images`
  ```json
  {
    "data": [
      {
        "name": "1.png",
        "url": "http://localhost:8080/images/1.png"
      },
      {
        "name": "2.png",
        "url": "http://localhost:8080/images/2.png"
      },
      {
        "name": "3.png",
        "url": "http://localhost:8080/images/3.png"
      }
    ]
  }
  ```

**Development:**

- Navigate to `c1` or `c3`
- Install dependencies
    ```sh
    yarn install # or npm install
    ```
- Run the app
    ```sh
    yarn start   # or npm start
    ```
