import ExcelJS from "exceljs";

export async function getWorkSheet(buffer, sheetName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const workSheet = workbook.getWorksheet(sheetName);

  return workSheet;
}

export function generateDataFromWorkSheet(workSheet) {
  const result = [];

  workSheet.eachRow((row) => {
    const [_, scope, inCharge, content, process, dep, level] = row.values;

    result.push({ inCharge, content, dep, scope, level, process });
  });

  return result.slice(1);
}
