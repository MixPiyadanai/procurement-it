import pdfMake from "pdfmake";
import pdfFonts from "~/assets/fonts.js";
import THBText from "thai-baht-text";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Sarabun: {
    normal: "THSarabun.ttf",
    bold: "THSarabun Bold.ttf",
    italics: "THSarabun Italic.ttf",
    bolditalics: "THSarabun BoldItalic.ttf",
  },
};

export function standardPDF(data, type) {
  const tableBody = [];

  data.items.forEach((item, index) => {
    tableBody.push([
      { text: index + 1, style: "alignCenter" },
      { text: item.name === "" ? "-" : item.name },
      {
        text:
          isNaN(item.quantity) || item.quantity === ""
            ? 0
            : Number(item.quantity).toFixed(0),
        style: "alignCenter",
      },
      { text: item.unit === "" ? "-" : item.unit, style: "alignCenter" },
      {
        text:
          isNaN(item.price) || item.price === ""
            ? 0.0
            : Number(item.price).toFixed(2),
        style: "alignCenter",
        colSpan: 2,
      },
      {},
      {
        text:
          isNaN(item.quantity) || isNaN(item.price)
            ? Math.floor(0).toFixed(2)
            : (item.price * Math.floor(item.quantity)).toFixed(2),
        style: "alignCenterTotal",
        colSpan: 2,
      },
      {},
      {},
    ]);
  });

  const totalSum = data.items.reduce(
    (sum, item) => sum + (Math.floor(item.quantity) * item.price || 0),
    0
  );

  let thaiSum = THBText(totalSum);
  if (thaiSum === "") {
    thaiSum = "ศูนย์บาทถ้วน";
  }

  const docDefinition = {
    pageOrientation: "portrait",
    pageSize: "A4",
    // pageMargin: [0, 0],
    content: [
      {
        layout: {},
        table: {
          headerRows: 4,
          widths: [20, 150, 45, 50, 60, 5, 60, 5, "*"],
          body: [
            [
              {
                text: "วิทยาลัยเทคนิคเชียงใหม่",
                style: "header",
                colSpan: 9,
                border: [false, false, false, false],
              },
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
            ],
            [
              {
                text: "รายละเอียดวัสดุที่จะซื้อหรือจ้าง",
                style: "header",
                colSpan: 9,
                border: [false, false, false, false],
              },
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
            ],
            [
              {
                text:
                  type == "single"
                    ? "วัสดุฝึก รายวิชา " + data.subject
                    : type == "office"
                    ? "วัสดุฝึกสำนักงาน"
                    : "วัสดุฝึก",
                style: "subjectHeader",
                colSpan: 8,
                border: [false, false, false, false],
              },
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              {
                text: "แผ่นที่ 1",
                style: "pageNumberHeader",
                border: [false, false, false, false],
              },
            ],
            [
              {
                text: "ที่",
                style: "header",
              },
              {
                text: "รายการ",
                style: "header",
              },
              {
                text: "จำนวน",
                style: "header",
              },
              {
                text: "หน่วยนับ",
                style: "header",
              },
              {
                text: "ราคา/หน่วย",
                style: "header",
                colSpan: 2,
              },
              {},
              {
                text: "รวมเงิน",
                style: "header",
                colSpan: 2,
              },
              {},
              {
                text: "หมายเหตุ",
                style: "header",
              },
            ],
            ...tableBody,
            [
              {
                text: "รวมเป็นเงินทั้งสิ้น",
                style: "header",
                colSpan: 2,
              },
              "",
              {
                text: thaiSum,
                style: "header",
                colSpan: 4,
              },
              "",
              "",
              "",
              {
                text: totalSum.toFixed(2),
                style: "header",
                colSpan: 2,
              },
              "",
              "",
            ],
            [
              { text: "", colSpan: 9, border: [false, false, false, false] },
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
            ],
            [
              { text: "", colSpan: 4, border: [false, false, false, false] },
              "",
              "",
              "",
              {
                text: "......................................................",
                style: "alignCenterTotal",
                colSpan: 5,
                margin: [0, 40, 0, 0],
                border: [false, false, false, false],
              },
              "",
              "",
              "",
              "",
            ],
            [
              { text: "", colSpan: 4, border: [false, false, false, false] },
              "",
              "",
              "",
              {
                text: `( ${
                  type == "single"
                    ? data.teacher_name
                    : "นางสาวขวัญดารินทร์ จิตหาญ"
                } )`,
                style: "alignCenterTotal",
                colSpan: 5,
                border: [false, false, false, false],
              },
              "",
              "",
              "",
              "",
            ],
          ],
        },
      },
    ],
    defaultStyle: {
      font: "Sarabun",
      fontSize: 16,
      lineHeight: 1.1,
    },
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        alignment: "center",
      },
      subjectHeader: {
        fontSize: 16,
        bold: true,
        alignment: "left",
      },
      pageNumberHeader: {
        fontSize: 16,
        bold: true,
        alignment: "right",
      },
      alignCenter: {
        alignment: "center",
      },
      alignCenterTotal: {
        alignment: "center",
        fontSize: 16,
      },
    },
  };

  const filename = `รายละเอียดวัสดุที่จะซื้อหรือจ้าง_${data.subject}.pdf`;

  pdfMake.createPdf(docDefinition).open();
}

export function multiTeacher() {
  const docDefinition = {
    content: ["Multi"],
    defaultStyle: {
      font: "Sarabun",
    },
  };

  pdfMake.createPdf(docDefinition).open();
}
