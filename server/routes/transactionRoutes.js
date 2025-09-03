import express from 'express'
import {
  createTransaction,
  getTransaction,
  getWeeklyExpenseAndIncome,
  getMonthlyExpense,
  getMonthlyIncome
} from "../controllers/transactionController.js"
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/transaction", protect, createTransaction)

router.get("/transaction", protect, getTransaction)

router.get("/transaction/weekly_expense_income", protect, getWeeklyExpenseAndIncome)

router.get("/transaction/monthly_expense", protect, getMonthlyExpense)

router.get("/transaction/monthly_income",  protect, getMonthlyIncome)

export default router;