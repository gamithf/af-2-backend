# Personal Finance Tracker API

This is a **Node.js Express API** for managing personal finances. It includes features like user authentication, transaction tracking, budget management, goal setting, and more.

1. First clone the project `git clone https://github.com/gamithf/personal-finance-tracker.git`
2. Open the terminal and type `cd personal-finance-tracker`
3. Then run `npm install`
4. Create a `.env` file in the root directory and add the following:
```
PORT=3000
MONGO_URI=''
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=gamifernan113@gmail.com
EMAIL_PASS=aaaa aaaa aaaa aaaa
```
5. Open the terminal in the root directory and run `npm start`
6. The API will be running at `http://localhost:3000`
7. To run test cases, open the terminal in the root directory and run `npx jest`