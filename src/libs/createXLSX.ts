import { cloneEasy, isNull, parseTreeToTableHeader } from "@bestime/utils_base"
import libraryFile from './libraryFile'


export default async function createXLSX (options: {
  pluginUrl: string
  header: any[],
  body: any[]
}) {
  const oTable = document.createElement('table')
  const header = parseTreeToTableHeader(options.header)

  const oHeadList = header.data.map(function (row) {
    const oTdList = row.map(function (item) {
      if(!item || item.colSpan===0) return ;
      
      // const colSpan
      return `<td rowSpan="${item.rowSpan}" colSpan="${item.colSpan}">${item?.title}</td>`
    }).join('')
    return `<tr>${oTdList}</tr>`
  }).join('')

  
  const oBodyList = options.body.map(function (item) {
    const oTdList = header.columns.map(function (fd) {
      const colSpan = item.$colField?.[fd] ?? 1
      const rowSpan = item.$rowSpan?.[fd] ?? 1
      if(colSpan === 0 || rowSpan === 0) return void 0
      return `<td colSpan="${colSpan}" rowSpan="${rowSpan}">${item[fd]}</td>`
    }).filter(function (c) {
      return  !isNull(c)
    }).join('')
    return `<tr>${oTdList}</tr>`
  }).join('')


  oTable.innerHTML = `<thead>${oHeadList}</thead><tbody>${oBodyList}</tbody>`
  oTable.setAttribute('border', '1')


  libraryFile({
    type: 'js',
    url: options.pluginUrl,
    module: 'XLSX',
    attribute: {
      type: 'module'
    }
  }, function (XLSX) {
    console.log("headFeilds", header, options.body)
    var workbook = XLSX.utils.table_to_book(oTable);
  XLSX.utils.book_append_sheet(workbook, workbook.Sheets['Sheet1'], "Sheet2", true); 
    console.log("workbook", workbook)
    XLSX.writeFile(workbook, "Report.xlsx");
  })

  
  return oTable
}