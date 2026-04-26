import incomeModel from "../models/incomeModel.js";
import XLSX from "xlsx";
import getDateRange from "../utils/getDateRange.js";


// ================= ADD INCOME =================
export async function addIncome(req, res) {
    const userId = req.user._id;
    const { description, amount, category, date } = req.body;

    try {
        if (!description || !amount || !category || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newIncome = new incomeModel({
            description,
            amount,
            category,
            userId,
            date: new Date(date)
        });

        await newIncome.save();

        res.json({
            success: true,
            message: "Income added successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// ================= GET ALL INCOME =================
export async function getAllIncome(req, res) {
    const userId = req.user.id;

    try {
        const income = await incomeModel
            .find({ userId })
            .sort({ date: -1 });

        res.json(income);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// ================= UPDATE INCOME =================
export async function updateIncome(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { description, amount } = req.body;

    try {
        const updatedIncome = await incomeModel.findOneAndUpdate(
            { _id: id, userId },
            { description, amount },
            { new: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({
                success: false,
                message: "Income not found"
            });
        }

        res.json({
            success: true,
            message: "Income updated successfully",
            data: updatedIncome
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// ================= DELETE INCOME =================
export async function deleteIncome(req, res) {
    try {
        const income = await incomeModel.findByIdAndDelete(req.params.id);

        if (!income) {
            return res.status(404).json({
                success: false,
                message: "Income not found"
            });
        }

        res.json({
            success: true,
            message: "Income deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// ================= DOWNLOAD EXCEL =================
export async function downloadIncomeExcel(req, res) {
    const userId = req.user.id;

    try {
        const income = await incomeModel
            .find({ userId })
            .sort({ date: -1 });

        const formattedData = income.map((inc) => ({
            Description: inc.description,
            Amount: inc.amount,
            Category: inc.category,
            Date: new Date(inc.date).toLocaleDateString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Income");

        XLSX.writeFile(workbook, "income.xlsx");

        res.download("income.xlsx");

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// ================= INCOME OVERVIEW =================
export async function getIncomeOverview(req, res) {
    const userId = req.user.id;

    try {
        const { range = "monthly" } = req.query;

        const { start, end } = getDateRange(range);

        const incomes = await incomeModel.find({
            userId,
            date: { $gte: start, $lte: end }
        }).sort({ date: -1 });

        const totalIncome = incomes.reduce(
            (acc, curr) => acc + curr.amount,
            0
        );

        const averageIncome =
            incomes.length > 0 ? totalIncome / incomes.length : 0;

        res.json({
            success: true,
            data: {
                totalIncome,
                averageIncome,
                numberOfTransactions: incomes.length,
                recentTransactions: incomes.slice(0, 9),
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