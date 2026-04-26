import expenseModel from "../models/expenseModel.js";
import getDateRange from "../utils/getDateRange.js";
import XLSX from "xlsx";

//add expense
export async function addExpense(req, res) {
    const userId = req.user._id;
    const { description, amount, category, date } = req.body;

    try {
        if (!description || !amount || !category || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
    
    const newExpense = new expenseModel({
                description,
                amount,
                category,
                userId,
                date: new Date(date)
            });
    
            await newExpense
            .save();
    
            res.json({
                success: true,
                message: "expense added successfully"
            });

        }  catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//get all expense
export async function getAllExpense(req, res) {
  const userId = req.user.id;
  
      try {
          const expense = await expenseModel
              .find({ userId })
              .sort({ date: -1 });
  
          res.json(expense);
  
      } catch (error) {
          console.log(error);
          res.status(500).json({
              success: false,
              message: error.message
          });
        }
    } 

    //to update expense
export async function updateExpense(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { description, amount } = req.body;

    try {
        const updateExpense = await expenseModel .findOneAndUpdate(
            { _id: id, userId },
            { description, amount },
            { new: true }
        );

        if (!updateExpense) {
            return res.status(404).json({
                success: false,
                message: "expense not found"
            });
        }

        res.json({
            success: true,
            message: "expense updated successfully",
            data: updateExpense
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//delete expense
export async function deleteExpense(req, res) {
    try {
        const expense = await expenseModel.findByIdAndDelete(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "expense not found"
            });
        }

        res.json({
            success: true,
            message: "expense deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//download expense
export async function downloadExpenseExcel(req, res) {
     const userId = req.user.id;
    
        try {
            const expense = await expenseModel
                .find({ userId })
                .sort({ date: -1 });
    
            const formattedData = expense.map((exp) => ({
                Description: exp.description,
                Amount: exp.amount,
                Category: exp.category,
                Date: new Date(exp.date).toLocaleDateString()
            }));
    
            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();
    
            XLSX.utils.book_append_sheet(workbook, worksheet, "expenseModel");
    
            XLSX.writeFile(workbook, "expense_delete.xlsx");
    
            res.download("expense_delete.xlsx");
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
}
//overview of expense
export async function getExpenseOverview(req, res) {
 const userId = req.user.id;

    try {
        const { range = "monthly" } = req.query;

        const { start, end } = getDateRange(range);

        const expense = await expenseModel.find({
            userId,
            date: { $gte: start, $lte: end }
        }).sort({ date: -1 });

        const totalExpense = expense.reduce((acc, cur) => acc + cur.amount, 0);
    const averageExpense =
      expense.length > 0 ? totalExpense / expense.length : 0;
    const numberOfTransactions = expense.length;

    const recentTransactions = expense.length(0, 5);

        res.json({
            success: true, 
            data: {
                totalIncome,
                averageIncome,
                numberOfTransactions,
                recentTransactions,
                range
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
