import {
  Paragraph,
  TextRun,
  ImageRun,
  AlignmentType,
  HeadingLevel,
  Tab,
} from "docx";
import enumImg from "../_helpers/enum-Img";
import docData from "./tools/DocData";
class cLang {
  static getLangues(funcs) {
    const cf = new Paragraph({
      children: [],
    });
    cf.addChildElement(docData.LineBreakTR());
    for (var i = 0; i < funcs.length; i++) {
      cf.addChildElement(docData.getBulletImg(enumImg.Langues));//bullet
      cf.addChildElement(
        new TextRun({
          text: "       " + funcs[i], //7 spaces
          alignment: AlignmentType.LEFT,
          size: 22,
        })
      );
      cf.addChildElement(docData.LineBreakTR());
    }
    return cf;
  }
}
export default cLang;
