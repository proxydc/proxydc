import { Paragraph, TextRun, ImageRun, AlignmentType, HeadingLevel } from "docx";
import enumImg from "../_helpers/enum-Img.js";
import docData from "./tools/DocData";
class cBref {
  static async urlToBlob(url) {
    return (await fetch(url)).blob();
  }
  static getSubTitle(txt) {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: docData.urlToBlob(enumImg.Bref),
          transformation: {
            width: 35,
            height: 35,
          },
        }),
        new TextRun({
          text: "                        "+txt,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.TITLE,
          bold: true,
          //underline: true,
          size: 30,
          color: "#008cba",
        }),       
      ],
    });
  }
}

export default cBref;
