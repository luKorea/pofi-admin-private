/*
 * @Author: korealu
 * @Date: 2022-02-22 14:38:21
 * @LastEditors: korealu
 * @LastEditTime: 2022-02-28 09:40:57
 * @Description: file content
 * @FilePath: /pofi-admin/src/utils/exportExcel.ts
 */
// exportToExcel.ts
import * as XLSX from 'xlsx'
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
const EXCEL_EXTENSION = '.xlsx'
console.log(EXCEL_EXTENSION, EXCEL_TYPE)
export class ExcelService {
  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}-${new Date().getTime()}.xlsx`
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json)
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    }
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName))
  }
}
