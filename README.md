# OneClickDrive

## Steps to run this

#### 1. Clone this repo
#### 2. Change directory to root folder of the repo.
#### 3. Run the following command: npm install. This will install the dependencies.
#### 4. Now run the following command: npx prisma generate && npx prisma db push. This will map the data models to the tables in the database. SQLite is used in the project.
#### 5. Now run the following command: npx auth secret. This will generate the auth key which is required for next-auth to work. It will be stored in .env.local file.
#### 6. Now add the following in your .env file: DATABASE_URL="file:./data/dev.db". This is the path to the databse which is SQLite in this project.
#### 7. Now run the following command to run local development: npm run dev

## Login Credentials
I have added a dummy user which can be used to login. 
username: admin100
password: dev-assessment

One can also add another user through db-user-setup.ts script in the scripts folder.
Functions are provided to add user as well vehicle data. Please check that out and modifiy the data
that suits your purpose.
You can run the script with the following command: npx tsx scripts/db-user-setup.ts