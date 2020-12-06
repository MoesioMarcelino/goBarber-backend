## GoBarber Backend (⚠️ Development in progress ⚠️)

:rocket: **An application to manager appointments from a barber shop**

## Routes

- /users
  - `[POST]`  Create a new user
    ```js script
    {
      name: string,
      email: string,
      password: string
    }
    ```
  - `[PATCH]`  Create a new user
    ```js script
    {
      avatar: file
    }
    ```

- /session
  - `[POST]`  Create a new session
    ```js script
    {
      email: string,
      password: string
    }
    ```

- /appointments
  - `[POST]`  Create a new appointment
    ```js script
    {
    provider_id: string,
	  date: Date
    }
    ```

- /profile
  - /forgot
    - `[GET]`  Able to show informations to profile

  - /reset
    - `[PUT]`  Able to change informações about profile
    ```js script
    {
      name: string,
      email: string,
      password: string,
      oldPassword: string,
    }
    ```

- /password
  - /forgot
    - `[POST]`  Able to recover the password
    ```js script
    {
      email: string
    }
    ```

  - /reset
    - `[POST]`  Able to reset the password
    ```js script
    {
      password: string,
      token: string,
    }
    ```
