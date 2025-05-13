import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePDF(transactions, pieData, timeSeriesData) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Gasto$mart relátorio", 105, 15, { align: "center" });

  doc.setFontSize(10);
  doc.text(`Gerado dia: ${new Date().toLocaleDateString()}`, 105, 22, { align: "center" });

  doc.setFontSize(16);
  doc.text("Sumário Finanças", 14, 35);

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpense;

  autoTable(doc, {
    startY: 40,
    head: [["Categoria", "Quantia ($)"]],
    body: [
      ["Total Receitas", totalIncome.toFixed(2)],
      ["Total Despesas", totalExpense.toFixed(2)],
      ["Equilíbrio", balance.toFixed(2)]
    ],
    theme: "grid",
    headStyles: { fillColor: [66, 66, 66] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });

  const transactionRows = transactions.map(t => [
    t.text,
    t.date ? new Date(t.date).toLocaleDateString() : "-",
    t.amount < 0 ? `-$${Math.abs(t.amount).toFixed(2)}` : `$${t.amount.toFixed(2)}`,
    t.amount < 0 ? "Despesas" : "Receitas"
  ]);

  autoTable(doc, {
    head: [["Descrição", "Data", "Media", "Tipo"]],
    body: transactionRows,
    theme: "striped",
    headStyles: { fillColor: [66, 66, 66] },
  });

  if (timeSeriesData.length > 0) {
    const monthlyRows = timeSeriesData.map(d => [
      d.month,
      `$${d.income.toFixed(2)}`,
      `$${d.expense.toFixed(2)}`,
      `$${(d.income - d.expense).toFixed(2)}`
    ]);

    autoTable(doc, {
      head: [["Mês", "Recita", "Despesas", "Liquído"]],
      body: monthlyRows,
      theme: "grid",
      headStyles: { fillColor: [66, 66, 66] },
    });
  }

  doc.save("GastoSmart.pdf");
}
