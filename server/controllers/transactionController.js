import Transaction from '../models/transactionModel.js'


//constants:
// createTransaction
// getTransaction
// getWeeklyExpenseAndIncome
// getMonthlyExpense
// getMonthlyIncome

export const createTransaction = async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body)
        const result = await newTransaction.save()
        res.status(201).json({ message: "Transaction added successfully!", id: result._id })
    } catch (err) {
        console.error("Insert error:", err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const getTransaction = async (req, res) => {
    try {
        const result = await Transaction.find({})
        res.status(200).json(result)
    } catch (error) {
        console.error("Error fetching transactions:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getWeeklyExpenseAndIncome = async (req, res) => {
    const now = new Date()
    const firstDayOfWeek = new Date(now)
    firstDayOfWeek.setDate(now.getDate() - now.getDay()) // Sunday as start
    firstDayOfWeek.setHours(0, 0, 0, 0)

    const lastDayOfWeek = new Date(firstDayOfWeek)
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)
    lastDayOfWeek.setHours(23, 59, 59, 999)

    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    try {
        const aggregated = await Transaction.aggregate([
        {
            $match: {
            date: { $gte: firstDayOfWeek, $lte: lastDayOfWeek }
            }
        },
        {
            $addFields: { dayOfWeek: { $dayOfWeek: "$date" } }
        },
        {
            $group: {
            _id: { dayOfWeek: "$dayOfWeek", type: "$type" },
            totalAmount: { $sum: "$amount" }
            }
        },
        {
            $group: {
            _id: "$_id.dayOfWeek",
            income: {
                $sum: {
                $cond: [{ $eq: ["$_id.type", "Income"] }, "$totalAmount", 0]
                }
            },
            expense: {
                $sum: {
                $cond: [{ $eq: ["$_id.type", "Expense"] }, "$totalAmount", 0]
                }
            }
            }
        },
        {
            $addFields: {
            dayName: {
                $arrayElemAt: [daysOfWeek, { $subtract: ["$_id", 1] }]
            }
            }
        },
        {
            $project: { _id: 0, day: "$dayName", income: 1, expense: 1 }
        }
        ])

        const result = daysOfWeek.map(day => {
        const found = aggregated.find(item => item.day === day)
        return found || { day, income: 0, expense: 0 }
        })

        res.status(200).json(result)
    } catch (error) {
        console.log("Error message:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMonthlyExpense = async (req, res) => {
    const date = new Date()
    const currentMonth = date.getMonth() + 1
    const currentYear = date.getFullYear()
    
    try {
        const result = await Transaction.aggregate([
        { $match: { type: "Expense" } },
        { $addFields: { month: { $month: "$date" }, year: { $year: "$date" } } },
        { $match: { month: currentMonth, year: currentYear } },
        { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
        { $project: { _id: 0, category: "$_id", amount: "$totalAmount" } }
        ])
    
        res.status(200).json(result)
    } catch (error) {
        console.log("Error message:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMonthlyIncome = async (req, res) => {
    const date = new Date()
    const currentMonth = date.getMonth() + 1
    const currentYear = date.getFullYear()

    try {
        const result = await Transaction.aggregate([
        { $match: { type: "Income" } },
        { $addFields: { month: { $month: "$date" }, year: { $year: "$date" } } },
        { $match: { month: currentMonth, year: currentYear } },
        { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
        { $project: { _id: 0, category: "$_id", amount: "$totalAmount" } }
        ])

        res.status(200).json(result)
    } catch (error) {
        console.log("Error message:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
