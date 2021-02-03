/*
 * 利用js-xlsx解析xlsx文件
 *
 * Excel名词：js-xlsx中的抽象类型
 * 工作簿：workBook
 * 工作表：Sheets
 * Excel引用样式(单元格地址)： cellAddress
 * 单元格：cell
 */
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

/**
 * 从xls文件里读取数据, 包装好数据返回给render使用
 * @param file
 */
function readXlsx(file) {
  if (!file) {
    throw new Error(`elsx file is null!`);
  }

  const buf = fs.readFileSync(file);
  const workbook = XLSX.read(buf, { type: 'buffer' });

  const result = [];
  workbook.SheetNames.forEach(sheetName => {
    const sh = workbook.Sheets[sheetName];
    const sheet = [];

    let i = 2;
    while (sh[`A${i}`] && sh[`B${i}`] && sh[`C${i}`]) {
      sheet.push({
        name: sh[`A${i}`].v,
        property: sh[`B${i}`].v,
        comment: sh[`C${i}`].v,
      });
      i++;
    }
    //console.log(`[read] ${sheet}`);
    result.push({
      sheetName,
      sheet,
    });
  });

  return result;
}

module.exports = readXlsx;
