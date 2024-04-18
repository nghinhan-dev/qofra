import ExcelJS from "exceljs";

export async function readExcelFile(buffer) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const workSheet = workbook.worksheets[1];

  return workSheet;
}
