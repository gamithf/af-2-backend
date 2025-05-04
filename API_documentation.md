# API Documentation
## Authentication API Documentation
## Overview
This API provides authentication endpoints for user registration and login, utilizing JWT for session management.

### Base URL
```
http://localhost:3000/api/auth
```
---

## Endpoints

### 1. Register API

**URL:**  
`POST http://localhost:3000/api/auth/register`

**Description:**  
Registers a new user and returns a JWT token upon success.

#### Request Body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string (optional, defaults to 'user')"
}
```

#### Responses:
- **201 Created**
  ```json
  {
    "token": "jwt_token"
  }
  ```
- **400 Bad Request**
  ```json
  { "message": "All fields are required." }
  ```
  ```json
  { "message": "User already exists." }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error." }
  ```

---

### 2. Login API

**URL:**  
`POST /login`

**Description:**  
Authenticates a user and returns a JWT token.

#### Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```

#### Responses:
- **200 OK**
  ```json
  {
    "token": "jwt_token"
  }
  ```
- **400 Bad Request**
  ```json
  { "message": "Email and password are required." }
  ```
  ```json
  { "message": "Invalid email or password." }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal server error." }
  ```

---

### 3. Protected Route Middleware

This middleware protects routes by verifying the JWT token and checking user roles (if specified).

#### Usage Example:
```javascript
const { auth } = require('../middleware/authMiddleware');
router.get('/protected-route', auth(['admin']), (req, res) => {
  res.json({ message: 'Access granted' });
});
```

#### Responses:
- **401 Unauthorized**
  ```json
  { "message": "No token, authorization denied." }
  ```
  ```json
  { "message": "Invalid token" }
  ```
- **403 Forbidden** (if role restriction fails)
  ```json
  { "message": "Access denied" }
  ```

## Transactions API Documentation

## Overview
This API provides endpoints for managing user transactions. It includes features such as:
- Adding transactions
- Retrieving transactions
- Updating transactions
- Deleting transactions
- Filtering transactions by tags

## Base URL

    http://localhost:3000/api/transactions

---

## Endpoints

### 1. Add Transaction

**URL:**  
`POST /`

**Description:**  
Creates a new transaction for the authenticated user.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Body:
```json
{
  "type": "string",  
  "amount": "number",  
  "category": "string",  
  "tags": ["string"],  
  "currency": "string",  
  "isRecurring": "boolean",  
  "recurrencePattern": "string",  
  "autoAllocate": "boolean"  
}
```

#### Responses
- **201 Created**
  ```json
  {
    "message": "Transaction added successfully!",
    "transactionId": "string",
    "endDate": "string"
  }
  ```
- **400 Bad Request**
  ```json
  { "message": "Invalid recurrence pattern." }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error adding transaction." }
  ```

---

### 2. Get All Transactions

**URL:**  
`GET /`

**Description:**  
Retrieves all transactions of the authenticated user.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses
- **200 OK**
  ```json
  {
    "transactions": [
      {
        "_id": "string",
        "type": "string",
        "amount": "number",
        "category": "string",
        "tags": ["string"],
        "date": "string"
      }
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error fetching transactions." }
  ```

---

### 3. Get Transaction by ID

**URL:**  
`GET /:transactionId`

**Description:**  
Retrieves a specific transaction by its ID.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses
- **200 OK**
  ```json
  {
    "_id": "string",
    "type": "string",
    "amount": "number",
    "category": "string",
    "tags": ["string"],
    "date": "string"
  }
  ```
- **404 Not Found**
  ```json
  { "message": "Transaction not found" }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Server error." }
  ```

---

### 4. Update Transaction

**URL:**  
`PUT /:transactionId`

**Description:**  
Updates an existing transaction by ID.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Body:
```json
{
  "type": "string",  
  "amount": "number",  
  "category": "string",  
  "tags": ["string"],  
  "isRecurring": "boolean",  
  "recurrencePattern": "string",  
  "endDate": "string"  
}
```

#### Responses
- **200 OK**
  ```json
  {
    "message": "Transaction updated successfully!",
    "transaction": {
      "_id": "string",
      "type": "string",
      "amount": "number",
      "category": "string",
      "tags": ["string"],
      "date": "string"
    }
  }
  ```
- **404 Not Found**
  ```json
  { "message": "Transaction not found or unauthorized" }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error updating transaction." }
  ```

---

### 5. Delete Transaction

**URL:**  
`DELETE /:transactionId`

**Description:**  
Deletes a specific transaction by ID.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses
- **200 OK**
  ```json
  { "message": "Transaction deleted successfully!" }
  ```
- **404 Not Found**
  ```json
  { "message": "Transaction not found or action unauthorized" }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error deleting transaction." }
  ```

---

### 6. Get Filtered Transactions by Tags

**URL:**  
`GET /filtered-by/:tags`

**Description:**  
Retrieves transactions filtered by tags.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses
- **200 OK**
  ```json
  [
    {
      "_id": "string",
      "type": "string",
      "amount": "number",
      "category": "string",
      "tags": ["string"],
      "date": "string"
    }
  ]
  ```
- **404 Not Found**
  ```json
  { "message": "No transactions found" }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error fetching transactions" }
  ```

## Budget API Documentation

## Overview
This API provides endpoints for managing user budgets. It includes features such as:
- Adding budgets
- Retrieving budgets
- Updating budgets
- Deleting budgets
- Updating spent amounts
- Recommending budget adjustments

## Base URL

    http://localhost:3000/api/budgets

---

## Endpoints

### 1. Add Budget

**URL:**  
`POST /`

**Description:**  
Creates a new budget for the authenticated user.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Body:
```json
{
  "category": "string",  
  "limit": "number",  
  "month": "string"  
}
```

#### Responses
- **201 Created**
  ```json
  {
    "_id": "string",
    "category": "string",
    "limit": "number",
    "month": "string"
  }
  ```
- **400 Bad Request**
  ```json
  { "message": "Category, limit, and month are required." }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Server error." }
  ```

---

### 2. Get All Budgets

**URL:**  
`GET /`

**Description:**  
Retrieves all budgets of the authenticated user.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses
- **200 OK**
  ```json
  {
    "budgets": [
      {
        "_id": "string",
        "category": "string",
        "limit": "number",
        "month": "string"
      }
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Server error." }
  ```

---

### 3. Get Budget by ID

**URL:**  
`GET /:budgetId`

**Description:**  
Retrieves a specific budget by its ID.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses
- **200 OK**
  ```json
  {
    "_id": "string",
    "category": "string",
    "limit": "number",
    "month": "string"
  }
  ```
- **404 Not Found**
  ```json
  { "message": "Budget not found." }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Server error." }
  ```

---

### 4. Update Budget

**URL:**  
`PUT /:budgetId`

**Description:**  
Updates an existing budget by ID.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Body:
```json
{
  "category": "string",  
  "limit": "number",  
  "month": "string"  
}
```

#### Responses
- **200 OK**
  ```json
  {
    "message": "Budget updated successfully!",
    "budget": {
      "_id": "string",
      "category": "string",
      "limit": "number",
      "month": "string"
    }
  }
  ```
- **404 Not Found**
  ```json
  { "message": "Budget not found or unauthorized." }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error updating budget." }
  ```

---

### 5. Delete Budget

**URL:**  
`DELETE /:budgetId`

**Description:**  
Deletes a specific budget by ID.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses
- **200 OK**
  ```json
  { "message": "Budget deleted successfully!" }
  ```
- **404 Not Found**
  ```json
  { "message": "Budget not found or action unauthorized." }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error deleting budget." }
  ```

---

### 6. Update Spent Amount

**URL:**  
`PUT /update-spent-amount/:budgetId`

**Description:**  
Updates the spent amount on a budget.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Body:
```json
{
  "spentAmount": "number"
}
```

#### Responses
- **200 OK**
  ```json
  {
    "message": "Budget spent amount updated successfully!",
    "budget": {
      "_id": "string",
      "category": "string",
      "limit": "number",
      "month": "string",
      "spent": "number"
    }
  }
  ```
- **404 Not Found**
  ```json
  { "message": "Budget not found or unauthorized." }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error updating spent amount on budget." }
  ```

---

### 7. Get Budget Recommendations

**URL:**  
`GET /budgets-recommendations`

**Description:**  
Provides recommendations based on budget usage.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses
- **200 OK**
  ```json
  {
    "recommendations": [
      {
        "category": "string",
        "suggestion": "string"
      }
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error analyzing budgets." }
  ```

## Financial Reports API Documentation

## Overview
This API provides endpoints for generating various financial reports for authenticated users. It includes features such as: Generating monthly transaction reports, Generating filtered transaction reports, Generating annual summary reports, Generating recurring transaction reports, Generating category-wise spending reports.

## Base URL
`http://localhost:3000/api/reports`

---

## Endpoints

### 1. Generate Monthly Transaction Report
**URL:** `GET /transactions-report-per-month`  
**Description:** Generates a PDF report of transactions for a specific month and year.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Query Parameters:** `month` (required, e.g., `01` for January), `year` (required, e.g., `2023`).  
**Responses:**  
- **200 OK** (PDF file returned): `{ "message": "Monthly report generated successfully." }`  
- **400 Bad Request**: `{ "message": "Month and year are required." }`  
- **404 Not Found**: `{ "message": "No data found for this month." }`  
- **500 Internal Server Error**: `{ "message": "Error generating report." }`  

---

### 2. Generate Filtered Transaction Report
**URL:** `GET /transactions-report-filter-by`  
**Description:** Generates a PDF report of transactions filtered by date range, category, or tags.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Query Parameters:** `startDate` (optional, e.g., `2023-01-01`), `endDate` (optional, e.g., `2023-12-31`), `category` (optional, e.g., `Groceries`), `tags` (optional, e.g., `food,utilities`).  
**Responses:**  
- **200 OK** (PDF file returned): `{ "message": "Filtered transaction report generated successfully." }`  
- **404 Not Found**: `{ "message": "No transactions found for the given filters." }`  
- **500 Internal Server Error**: `{ "message": "Error generating report." }`  

---

### 3. Generate Annual Summary Report
**URL:** `GET /annual-summary-report`  
**Description:** Generates a PDF report summarizing income and expenses for a specific year.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Query Parameters:** `year` (required, e.g., `2023`).  
**Responses:**  
- **200 OK** (PDF file returned): `{ "message": "Annual summary report generated successfully." }`  
- **400 Bad Request**: `{ "message": "Year is required." }`  
- **404 Not Found**: `{ "message": "No transactions found for this year." }`  
- **500 Internal Server Error**: `{ "message": "Error generating report." }`  

---

### 4. Generate Recurring Transactions Report
**URL:** `GET /recurring-transactions-report`  
**Description:** Generates a PDF report of all recurring transactions for the authenticated user.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Responses:**  
- **200 OK** (PDF file returned): `{ "message": "Recurring transactions report generated successfully." }`  
- **404 Not Found**: `{ "message": "No recurring transactions found." }`  
- **500 Internal Server Error**: `{ "message": "Error generating report." }`  

---

### 5. Generate Category Spending Report
**URL:** `GET /category-spending-report`  
**Description:** Generates a PDF report of category-wise spending for a specific month and year.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Query Parameters:** `month` (required, e.g., `01` for January), `year` (required, e.g., `2023`).  
**Responses:**  
- **200 OK** (PDF file returned): `{ "message": "Category spending report generated successfully." }`  
- **400 Bad Request**: `{ "message": "Month and year are required." }`  
- **404 Not Found**: `{ "message": "No transactions found for this month." }`  
- **500 Internal Server Error**: `{ "message": "Error generating category spending report." }`  

---

## Financial Goals API Documentation

## Overview
This API provides endpoints for managing user financial goals. It includes features such as:
- Setting financial goals
- Retrieving user goals
- Updating goal progress
- Generating goal progress reports
- Auto-allocating savings to goals

## Base URL

    http://localhost:3000/api/goals

---

## Endpoints

### 1. Set Goal

**URL:**  
`POST /`

**Description:**  
Creates a new financial goal for the authenticated user.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Body:
```json
{
  "name": "string",  
  "targetAmount": "number",  
  "deadline": "string"  
}
```

#### Responses
- **201 Created**
  ```json
  {
    "message": "Goal added successfully!",
    "goalId": "string"
  }
  ```
- **400 Bad Request**
  ```json
  { "errors": [{ "msg": "Validation error." }] }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Server error." }
  ```

---

### 2. Get All Goals

**URL:**  
`GET /`

**Description:**  
Retrieves all financial goals of the authenticated user.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses
- **200 OK**
  ```json
  {
    "goals": [
      {
        "_id": "string",
        "name": "string",
        "targetAmount": "number",
        "savedAmount": "number",
        "deadline": "string"
      }
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Server error." }
  ```

---

### 3. Update Goal Progress

**URL:**  
`PUT /update-goal`

**Description:**  
Updates the saved amount for a specific goal.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Body:
```json
{
  "goalId": "string",  
  "savedAmount": "number"  
}
```

#### Responses
- **200 OK**
  ```json
  {
    "message": "Goal progress updated!",
    "goal": {
      "_id": "string",
      "name": "string",
      "targetAmount": "number",
      "savedAmount": "number",
      "deadline": "string"
    }
  }
  ```
- **400 Bad Request**
  ```json
  { "message": "Missing required fields goalId and savedAmount" }
  ```
- **404 Not Found**
  ```json
  { "message": "Goal not found" }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error updating goal progress." }
  ```

---

### 4. Generate Goal Progress Report

**URL:**  
`GET /generate-goal-progress`

**Description:**  
Generates a PDF report of the user's goal progress.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses
- **200 OK** (PDF file returned)
  ```json
  { "message": "PDF generated successfully." }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error retrieving goal progress." }
  ```

---

### 5. Auto Allocate Savings

**URL:**  
`POST /auto-allocate`

**Description:**  
Automatically allocates a user's income towards their financial goals.

#### Request Headers:
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Body:
```json
{
  "incomeAmount": "number"  
}
```

#### Responses
- **200 OK**
  ```json
  {
    "message": "Transaction saved and savings allocated to goals successfully!",
    "goals": [
      {
        "_id": "string",
        "name": "string",
        "targetAmount": "number",
        "savedAmount": "number",
        "deadline": "string"
      }
    ]
  }
  ```
- **400 Bad Request**
  ```json
  { "message": "Invalid income amount." }
  ```
- **400 Bad Request**
  ```json
  { "message": "No financial goals set." }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Error allocating savings." }
  ```

## Notification API Documentation

## Overview
This API provides endpoints for managing notifications, including adding notifications, retrieving notifications, marking notifications as read, and checking for recurring transactions and budget alerts.

## Base URL
`http://localhost:3000/api/notifications`

---

## Endpoints

### 1. Add Notification
**URL:** `POST /`  
**Description:** Adds a new notification for the authenticated user and sends an email notification.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Request Body:** `{ "message": "string" }`  
**Responses:**  
- **201 Created**: `{ "message": "Notification added successfully", "notificationId": "string" }`  
- **400 Bad Request**: `{ "error": "User ID and message are required" }`  
- **500 Internal Server Error**: `{ "error": "Internal server error" }`  

---

### 2. Get All Notifications
**URL:** `GET /`  
**Description:** Retrieves all notifications for the authenticated user, sorted by date in descending order.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Responses:**  
- **200 OK**: `{ "notifications": [{ "_id": "string", "userId": "string", "message": "string", "read": "boolean", "date": "string" }] }`  
- **500 Internal Server Error**: `{ "message": "Server Error" }`  

---

### 3. Mark Notification as Read
**URL:** `PUT /mark-as-read/:notificationId`  
**Description:** Marks a specific notification as read for the authenticated user.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Path Parameters:** `notificationId` (required): The ID of the notification to mark as read.  
**Responses:**  
- **200 OK**: `{ "notification": { "_id": "string", "userId": "string", "message": "string", "read": "boolean", "date": "string" } }`  
- **404 Not Found**: `{ "message": "Notification not found" }`  
- **500 Internal Server Error**: `{ "message": "Server Error" }`  

---

### 4. Check Recurring Transactions
**URL:** `POST /check-recurring-transactions`  
**Description:** Checks for upcoming or missed recurring transactions and sends notifications to the user.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Responses:**  
- **200 OK**: `{ "message": "Recurring transactions checked" }`  
- **500 Internal Server Error**: `{ "message": "Error checking recurring transactions" }`  

---

### 5. Check Budget Alerts
**URL:** `POST /check-budget-alerts`  
**Description:** Checks if the user is nearing their budget limit for any category and sends alerts.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Responses:**  
- **200 OK**: `{ "alerts": [{ "category": "string", "message": "string" }] }`  
- **500 Internal Server Error**: `{ "message": "Error checking budget alerts" }`  

---

## Notes
- All endpoints require authentication via a valid JWT token.
- The `sendEmail` function is used internally to send email notifications.
- Ensure proper error handling and validation for query parameters to avoid unexpected behavior.

## Dashboard API Documentation

## Overview
This API provides endpoints for fetching dashboard data for both users and admins. Users can view their recent transactions, budget summaries, and financial goals progress. Admins can view system-wide statistics, financial data, and top spending categories/users.

## Base URL
`http://localhost:3000/api/dashboard`

---

## Endpoints

### 1. Get User Dashboard
**URL:** `GET /user`  
**Description:** Fetches dashboard data for the authenticated user, including recent transactions, budget summaries, and financial goals progress.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Responses:**  
- **200 OK**: `{ "recentTransactions": [{ "_id": "string", "type": "string", "amount": "number", "category": "string", "currency": "string", "date": "string" }], "budgetSummary": [{ "category": "string", "spent": "number", "limit": "number", "remaining": "number", "month": "string" }], "goalsSummary": [{ "name": "string", "target": "number", "saved": "number", "progress": "number" }] }`  
- **500 Internal Server Error**: `{ "message": "Error fetching dashboard data." }`  

---

### 2. Get Admin Dashboard
**URL:** `GET /admin`  
**Description:** Fetches system-wide dashboard data for administrators, including user statistics, financial data, and top spending categories/users.  
**Request Headers:** `{ "Authorization": "Bearer <token>" }`  
**Responses:**  
- **200 OK**: `{ "totalUsers": "number", "totalAdmins": "number", "totalTransactions": "number", "totalBudgets": "number", "totalNotifications": "number", "totalIncome": "number", "totalExpense": "number", "topCategories": [{ "_id": "string", "totalSpent": "number" }], "topUsers": [{ "_id": "string", "totalSpent": "number" }] }`  
- **500 Internal Server Error**: `{ "message": "Error fetching admin dashboard data." }`  

---