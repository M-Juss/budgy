import express from 'express'
import {
  createTransaction,
  getTransaction,
  getWeeklyExpenseAndIncome,
  getMonthlyExpense,
  getMonthlyIncome
} from "../controllers/transactionController.js"

const router = express.Router()

router.post("/transaction", createTransaction)

router.get("/transaction", getTransaction)

router.get("/transaction/weekly_expense&income", getWeeklyExpenseAndIncome)

router.get("/transaction/monthly_expense", getMonthlyExpense)

router.get("/transaction/monthly_income", getMonthlyIncome)

export default router;