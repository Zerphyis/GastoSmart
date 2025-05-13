import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePDF(transactions, pieData, timeSeriesData) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text("Expense Tracker Report", 105, 15, { align: "center" });

  // Date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, { align: "center" });

  // Summary Title
  doc.setFontSize(16);
  doc.text("Financial Summary", 14, 35);

  // Calculations
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpense;

  // Summary Table
  autoTable(doc, {
    startY: 40,
    head: [["Category", "Amount ($)"]],
    body: [
      ["Total Income", totalIncome.toFixed(2)],
      ["Total Expenses", totalExpense.toFixed(2)],
      ["Balance", balance.toFixed(2)]
    ],
    theme: "grid",
    headStyles: { fillColor: [66, 66, 66] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });

  // Transactions Table
  const transactionRows = transactions.map(t => [
    t.text,
    t.date ? new Date(t.date).toLocaleDateString() : "-",
    t.amount < 0 ? `-$${Math.abs(t.amount).toFixed(2)}` : `$${t.amount.toFixed(2)}`,
    t.amount < 0 ? "Expense" : "Income"
  ]);

  autoTable(doc, {
    head: [["Description", "Date", "Amount", "Type"]],
    body: transactionRows,
    theme: "striped",
    headStyles: { fillColor: [66, 66, 66] },
  });

  // Monthly Breakdown Table
  if (timeSeriesData.length > 0) {
    const monthlyRows = timeSeriesData.map(d => [
      d.month,
      `$${d.income.toFixed(2)}`,
      `$${d.expense.toFixed(2)}`,
      `$${(d.income - d.expense).toFixed(2)}`
    ]);

    autoTable(doc, {
      head: [["Month", "Income", "Expense", "Net"]],
      body: monthlyRows,
      theme: "grid",
      headStyles: { fillColor: [66, 66, 66] },
    });
  }

  doc.save("GastoSmart.pdf");
}
