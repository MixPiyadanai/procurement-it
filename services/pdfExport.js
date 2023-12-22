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

export function standardPDF(data, type, startIndex) {
  const tableBody = [];

  data.items.forEach((item, index) => {
    tableBody.push([
      { text: startIndex + (index + 1), style: "alignCenter" },
      { text: item.name === "" ? "-" : item.name },
      {
        text: formatNumberWithCommas(
          isNaN(item.quantity) || item.quantity === ""
            ? 0
            : Number(item.quantity).toFixed(0)
        ),
        style: "alignCenter",
      },
      { text: item.unit === "" ? "-" : item.unit, style: "alignCenter" },
      {
        text: formatNumberWithCommas(
          isNaN(item.price) || item.price === ""
            ? 0.0
            : Number(item.price).toFixed(2)
        ),
        style: "alignCenter",
        colSpan: 2,
      },
      {},
      {
        text: formatNumberWithCommas(
          isNaN(item.quantity) || isNaN(item.price)
            ? Math.floor(0).toFixed(2)
            : (item.price * Math.floor(item.quantity)).toFixed(2)
        ),
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

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // let currentPageValue = "";
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
                  type === "single" && data.subject
                    ? "วัสดุฝึก รายวิชา " + data.subject
                    : type === "office"
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
                text: `แผ่นที่ ${startIndex == 0 ? "1" : "2"}`,
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
                text: formatNumberWithCommas(totalSum.toFixed(2)),
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
                  type == "single" && data.teacher_name
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
    // footer: function (currentPage, pageCount, pageSize) {
    //   currentPageValue = currentPage;

    //   return {
    //     text: currentPage.toString() + " of " + pageCount,
    //     style: "pageNumberFooter",
    //     alignment: "right",
    //     margin: [0, 10, 20, 0],
    //   };
    // },
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

export function summaryPDF(data) {
  const tableBody = [];

  data.forEach((item, index) => {
    tableBody.push([
      { text: index + 1, style: "alignCenter" },
      { text: item.name === "" ? "-" : item.name },
      { text: item.subject === "" ? "-" : item.subject },
      {
        text: formatNumberWithCommas(
          isNaN(item.total) || item.total === ""
            ? 0.0
            : Number(item.total).toFixed(2)
        ),
        style: "alignCenter",
      },
      {
        text: formatNumberWithCommas(
          isNaN(item.opBudget) || item.opBudget === ""
            ? 0.0
            : Number(item.opBudget).toFixed(2)
        ),
        style: "alignCenter",
      },
      {
        text: formatNumberWithCommas(
          isNaN(item.subBudget) || item.subBudget === ""
            ? 0.0
            : Number(item.subBudget).toFixed(2)
        ),
        style: "alignCenter",
      },
      {
        text: formatNumberWithCommas(
          isNaN(item.total * (item.productivity / 100)) ||
            item.total * (item.productivity / 100) === ""
            ? 0.0
            : item.subject != "วัสดุสำนักงานสาขาเทคโนโลยีสารสนเทศ"
            ? Number(item.total * (item.productivity / 100)).toFixed(2)
            : "-"
        ),
        style: "alignCenter",
      },
    ]);
  });

  const productivityPercentage =
    data.length > 0 && data[0].hasOwnProperty("productivity")
      ? data[0].productivity
      : 0;

  const totalSum = data.reduce(
    (sum, item) => sum + parseFloat(item.total) || 0,
    0
  );

  const opSum = data.reduce(
    (sum, item) => sum + parseFloat(item.opBudget) || 0,
    0
  );

  const subSum = data.reduce(
    (sum, item) => sum + parseFloat(item.subBudget) || 0,
    0
  );

  const productivitySum = data.reduce((sum, item) => {
    if (item.subject !== "วัสดุสำนักงานสาขาเทคโนโลยีสารสนเทศ") {
      return (
        sum +
        (parseFloat(item.total) * (parseFloat(item.productivity) / 100) || 0)
      );
    }
    return sum;
  }, 0);

  let thaiTotalSum = THBText(totalSum);
  if (thaiTotalSum === "") {
    thaiTotalSum = "ศูนย์บาทถ้วน";
  }

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const docDefinition = {
    pageOrientation: "landscape",
    pageSize: "A4",
    // pageMargin: [0, 0],
    content: [
      {
        layout: {},
        table: {
          headerRows: 6,
          widths: [20, 140, 240, 75, 75, 75, "*"],
          body: [
            [
              {
                text: "รายละเอียด สผ.1 ประจำภาคเรียนที่ 1 ปีการศึกษา 2566",
                style: "header",
                colSpan: 7,
                border: [false, false, false, false],
              },
              "",
              "",
              "",
              "",
              "",
              "",
            ],
            [
              {
                text: "สาขาเทคโนโลยีสารสนเทศ วิทยาลัยเทคนิคเชียงใหม่",
                style: "header",
                colSpan: 7,
                border: [false, false, false, false],
              },
              "",
              "",
              "",
              "",
              "",
              "",
            ],
            [
              {
                text: "",
                style: "header",
                colSpan: 7,
                border: [false, false, false, false],
                margin: [0, 12, 0, 0],
              },
              "",
              "",
              "",
              "",
              "",
              "",
            ],
            [
              {
                text: "",
                colSpan: 7,
                border: [false, false, false, false],
              },
              "",
              "",
              "",
              "",
              "",
              "",
            ],
            [
              {
                text: "ที่",
                style: "header",
                rowSpan: 2,
                margin: [0, 12, 0, 0],
              },
              {
                text: "ชื่อ สกุล ",
                style: "header",
                rowSpan: 2,
                margin: [0, 12, 0, 0],
              },
              {
                text: "รายวิชา",
                style: "header",
                rowSpan: 2,
                margin: [0, 12, 0, 0],
              },
              {
                text: "จำนวนเงิน",
                style: "header",
                rowSpan: 2,
                margin: [0, 12, 0, 0],
              },
              {
                text: "งบประมาณ",
                style: "header",
                colSpan: 2,
              },
              {},
              {
                text: `ผลผลิต ${productivityPercentage}%`,
                style: "header",
              },
            ],
            [
              {
                text: "",
              },
              {
                text: "",
              },
              {
                text: "",
              },
              {
                text: "",
              },
              {
                text: "งบดำเนินงาน",
                style: "header",
              },
              {
                text: "งบอุดหนุน",
                style: "header",
              },
              {
                text: "จัดทำ สผ.2",
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
                text: thaiTotalSum,
                style: "header",
              },
              {
                text: formatNumberWithCommas(totalSum.toFixed(2)),
                style: "header",
              },
              {
                text: formatNumberWithCommas(opSum.toFixed(2)),
                style: "header",
              },
              {
                text: formatNumberWithCommas(subSum.toFixed(2)),
                style: "header",
              },
              {
                text: formatNumberWithCommas(productivitySum.toFixed(2)),
                style: "header",
              },
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
