# OneClickDrive

## Steps to run this

### 1. Clone this repo
### 2. Change directory to root folder of the repo.
### 3. Run the following command: npm install. This will install the dependencies.
### 4. Now run the following command: npx prisma generate. This will map the data models to the tables in the database. SQLlite is used in the project.
### 5. Now run the following command: npx auth secret. This will generate the auth key which is required for next-auth to work. It will be stored in .env.local file.
### 6. Now add the following in your .env file: DATABASE_URL="file:./data/dev.db". This is the path to the databse which is SQLlite in this project.
### 7. Now run the following command to run local development: npm run dev