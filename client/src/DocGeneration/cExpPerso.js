import {
  ImageRun,
  AlignmentType,
  HeadingLevel,
  Paragraph,
  Tab,
  TextRun,
  ExternalHyperlink,
} from "docx";
import enumImg from "../_helpers/enum-Img.js";
import docData from "./tools/DocData";
class cExpPerso { 
  static getSubTitle(txt) {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: docData.urlToBlob(enumImg.TitleExp),
          transformation: {
            width: 45,
            height: 45,
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
  static getExpPerso(pros) {
    if (pros.length > 0) {
      const cf = new Paragraph({
        children: [],
      });
      for (var i = 0; i < pros.length; i++) {
        cf.addChildElement(docData.getSubTitle1("Expérience " + (i + 1)));
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(docData.getSubTitle2("Période"));
        cf.addChildElement(
          new TextRun({
            text: pros[i].period,
            break: 1,
            //bullet: {level: 0},
          })
        );
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(docData.getSubTitle2("Titre"));
        /*cf.addChildElement(
          new TextRun({
            text: "Poste: ",
            bold: true,
          })
        );*/
        cf.addChildElement(
          new TextRun({
            text: pros[i].title,
            break: 1,
          })
        );
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(docData.LineBreakTR());      
        cf.addChildElement(docData.getSubTitle2("Contexte"));
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(
          new TextRun({
            text: pros[i].context,
            break: 1,
          })
        );
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(docData.getSubTitle2("Environnement technique"));
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(
          new TextRun({
            text: pros[i].technical_env,
          })
        );
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(docData.getSubTitle2("Compétences/ Tâches"));
        cf.addChildElement(docData.LineBreakTR());
        for (var j = 0; j < pros[i].tasks.length; j++) {
          cf.addChildElement(docData.getBulletImg(enumImg.ExpProTask));//bullet
          cf.addChildElement(
            new TextRun({
              text: "       " + pros[i].tasks[j], //7 spaces,
              break: 1,
            })
          );
        }
        cf.addChildElement(docData.LineBreakTR());
        cf.addChildElement(docData.LineBreakTR());
      }
      return cf;
    }
    return "";
  }
}

export default cExpPerso;
