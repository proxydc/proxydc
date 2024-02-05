const FileSaver = require("file-saver");
import {
  Header,
  ImageRun,
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Tab,
  TabStopPosition,
  TabStopType,
  TextRun,
} from "docx";
import * as fs from "fs";
class DocData {
  static async GetHeader2() {
    return new Header({
      children: [
        new Paragraph({
          children: [
            new ImageRun({
              type: "png",
              data: await urlToBlob("../../assets/log.png"),
              transformation: {
                width: 100,
                height: 100,
              },
            }),
          ],
        }),
        /*  new Paragraph({
                        children: [
                            new ImageRun({
                                data: FileSaver.readFileSync("../../assets/log.png"),
                                transformation: {
                                    width: 100,
                                    height: 100,
                                },
                            }),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: FileSaver.readFileSync("../../assets/log.png"),
                                transformation: {
                                    width: 100,
                                    height: 100,
                                },
                            }),
                        ],
                    }),*/
      ],
    });
  }

  static async urlToBlob(url) {
    return (await fetch(url)).blob();
  }

  static getLine(col, text) {
    return new Paragraph({
      children: [
        new TextRun({
          text: col,
          bold: true,
        }),
        new TextRun({
          children: [new Tab(), text],
        }),
      ],
    });
  }
  static getTitle() {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      text: "Dossier de compétences",
      heading: HeadingLevel.TITLE,
    });
  }
  static getHeader(nom, prenom) {
    return new Header({
      children: [
        /*new ImageRun({
          data: Buffer.from(imagelogoBase64, "base64"),//chemin url to get from github
          transformation: {
            width: 10,
            height: 10,
          },
        }),*/
        new Paragraph({
          children: [
            new TextRun({
              text: nom + " " + prenom,
              bold: true,
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
      ],
    });
  }

  static getLine2(txt) {
    return new TextRun({
      text: txt,
      //bold: true,
    });
  }
  static getLineBreak() {
    new Paragraph({
      children: [], // Just newline without text
    });
  }
  static LineBreak()
  {
    return new Paragraph({
      children: [
        new TextRun({
          text: "",
          break: 1,
        }),
      ],
    });
  }
  static getTitleComp(txt) {
    return new Paragraph({
      children: [
        new TextRun({
          text: txt,
          alignment: AlignmentType.LEFT,
          heading: HeadingLevel.TITLE,
          bold: true,
          underline: true,
          weight: 18,
          color: '#008cba',
        }),
      ],
    });
  }
  static getComp(funcs) {
    const cf = new Paragraph({
      children: [],
    });
    alert(funcs.length);
    for (var i = 0; i < funcs.length; i++) {
      cf.addChildElement(new TextRun({
        text:funcs[i], break:1
      }));
    }
    return cf;
  } 
 
  static createCertificationsList(certifications) {
    return certifications.forEach((certification) => {
      alert(certification.year);
      new Paragraph({
        children: [
          new TextRun({
            text: certification.year,
            bold: true,
          }),
          new TextRun({
            children: [new Tab(), certification.title],
            bold: true,
          }),
        ],
      });
    });
  }
  /*  new Paragraph({
           /* tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
            ],
            children: [
                new TextRun({
                    text: certification.year,
                    bold: true,
                }),
                new TextRun({
                    children: [new Tab(), certification.title],
                    bold: true,
                }),
            ],
        }),
        );
    }*/
}

export default DocData;
