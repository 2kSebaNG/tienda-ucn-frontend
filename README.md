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

4. Copy the `.env.local` content on the `.env` file.

   ```bash
   cp .env.local .env
   ```

5. Replace `your-api-url-here` with the base URL of your API on the `NEXT_PUBLIC_API_URL` field. If you don't know the URL of your backend, go to the [API Repository](##backend-repository) section and check the port on which the API is running.

   ```bash
   NEXT_PUBLIC_API_URL=your-api-url-here
   ```

6. Restore the dependencies on a Visual Studio Code terminal.

   ```bash
   npm i
   ```

7. Execute the project in development mode using the same terminal.

   ```bash
   npm run dev
   ```

Once you have followed these steps, you will see that the project is running on `http://localhost:3000`. To see the website, press ctrl and click that address.

## Backend Repository

To test the full functionality of the website, access the [Backend repository](https://github.com/NachoXx25/Tienda-UCN-API) and follow the instructions in the README file to run it.

## Author

- [Sebastián Núñez](https://github.com/2kSebaNG)
