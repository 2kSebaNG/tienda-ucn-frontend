# Tienda UCN Frontend

This project consists of the simplified implementation of the frontend of the “Tienda UCN” e-commerce platform using Next.js. This includes the creation of views, user session and shopping cart management, proper use of rendering strategies and global states.

The website is created with a mobile-first approach, so that it is responsive to different screen sizes and maintains a pleasant and fluid user experience.

In addition, the system is designed to be used in conjunction with a Rest API created with ASP .NET Core, which allows for the management of user and product data.

## Installation

The following technologies are required to execute the project

- [Visual Studio Code 1.89.1+](https://code.visualstudio.com/)
- [Node 22+](https://nodejs.org/es/download)
- [Git 2.45.1+](https://git-scm.com/downloads)

Once everything is installed, run the project by following the steps in the next section.

## Quick Start

1. Clone the repository on your computer using CMD.

   ```bash
   git clone https://github.com/2kSebaNG/tienda-ucn-frontend.git
   ```

2. Navigate to the project folder.

   ```bash
   cd tienda-ucn-frontend
   ```

3. Open the project using Visual Studio Code.

   ```bash
   code .
   ```

4. Copy the `.env.example` content on the `.env.local` file.

   ```bash
   cp .env.example .env.local
   ```

5. In the `.env.local` file, replace `your-api-url-here` on the `NEXT_PUBLIC_API_URL` field with the base URL of your API. Be sure to enclose the URL in double quotes (“ ”) to avoid errors when reading the `.env.local` file. If you don't know the URL of your backend, go to the [API Repository](#backend-repository) section and check the port on which the API is running.

   ```bash
   NEXT_PUBLIC_API_URL=your-api-url-here
   ```

6. Create your NextAuth secret using the command:

   ```bash
   npx auth secret
   ```

   This command will notice that you already have a variable for `AUTH_SECRET` (in this case, that variable is `NEXTAUTH_SECRET`) in your `.env.local file`, so you should enter `y` when it asks **`Overwrite existing AUTH_SECRET? (y/N)`**.

   If it is not written directly to your `.env.local`, check if the secret was written on the console and then copy it and replace `your-auth-secret-here` in the `NEXTAUTH_SECRET` field. As in the previous step, enclose the secret in double quotes (“ ”) to avoid problems when loading that value.

   ```bash
   NEXTAUTH_SECRET=your-auth-secret-here
   ```

7. Restore the dependencies on a Visual Studio Code terminal.

   ```bash
   npm i
   ```

8. Execute the project in development mode using the same terminal.

   ```bash
   npm run dev
   ```

   Once you have followed these steps, you will see that the project is running on `http://localhost:3000`. To see the website, press `ctrl` and click that address.

## Backend Repository

To test the full functionality of the website, access the [Backend repository](https://github.com/NachoXx25/Tienda-UCN-API) and follow the instructions in the README file to run it.

## Author

- [Sebastián Núñez](https://github.com/2kSebaNG)
