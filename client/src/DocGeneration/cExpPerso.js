import {
  ImageRun,
  AlignmentType,
  HeadingLevel,
  Paragraph,
  Tab,
  TextRun,
  ExternalHyperlink,
} from "docx";
class cExpPerso {
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
  static getTitle(pros, ind) {
    if (pros.length > ind) {
      return new Paragraph({
        alignment: AlignmentType.CENTER,
        text: "Expérience " + ind + 1 + ":",
        heading: HeadingLevel.TITLE,
      });
    }
    return "";
  }
  static getLine2(txt) {
    return new Paragraph({
      children: [
        new TextRun({
          text: txt,
          //bold: true,
        }),
      ],
    });
  }
  static getLineBreak() {
    new Paragraph({
      children: [], // Just newline without text
    });
  }
  static LineBreak() {
    return new TextRun({
      text: "",
      break: 1,
    });
  }
  static getSubTitle(txt) {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: this.urlToBlob("https://raw.githubusercontent.com/proxydc/Templates/main/exp.png"),
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
  static getSubTitle1(txt) {
    return new TextRun({
      text: txt,
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.TITLE,
      bold: true,
      underline: true,
      size: 26,
      color: "#008cba",
    });
  }
  static getSubTitle2(txt) {
    return new TextRun({
      text: txt,
      alignment: AlignmentType.LEFT,
      heading: HeadingLevel.TITLE,
      bold: true,
      underline: true,
      size: 22,
      color: "#008cba",
    });
  }
  static getSubTitle3(txt) {
    return new TextRun({
      text: txt,
      alignment: AlignmentType.LEFT,
      heading: HeadingLevel.TITLE,
      bold: true,
      underline: true,
      size: 18,
      color: "#008cba",
    });
  }
  static getSubTitle4(txt) {
    return new TextRun({
      text: txt,
      alignment: AlignmentType.LEFT,
      heading: HeadingLevel.TITLE,
      bold: true,
      underline: true,
      size: 15,
      color: "#008cba",
    });
  }
  static getBufferExp() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: "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",
          transformation: {
            width: 30,
            height: 30,
          },
        }),
      ],
    });
  }

  static getHyperLink(txt, urllink) {
    return new Paragraph({
      children: [
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: txt,
              style: "Hyperlink",
            }),
          ],
          link: urllink,
        }),
      ],
    });
  }

  static getBulletPoint(txt, lvl) {
    return new Paragraph({
      text: txt,
      bullet: {
        level: lvl, // How deep you want the bullet to be. Maximum level is 9
      },
    });
  }
  static getExpPerso(pros) {
    if (pros.length > 0) {
      const cf = new Paragraph({
        children: [],
      });
      for (var i = 0; i < pros.length; i++) {
        cf.addChildElement(this.getSubTitle1("Expérience " + (i + 1)));
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(this.getSubTitle2("Période"));
        cf.addChildElement(
          new TextRun({
            text: pros[i].period,
            break: 1,
            //bullet: {level: 0},
          })
        );
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(this.getSubTitle2("Titre"));
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
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(this.LineBreak());      
        cf.addChildElement(this.getSubTitle2("Contexte"));
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(
          new TextRun({
            text: pros[i].context,
            break: 1,
          })
        );
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(this.getSubTitle2("Environnement technique"));
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(
          new TextRun({
            text: pros[i].technical_env,
          })
        );
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(this.getSubTitle2("Compétences/ Tâches"));
        cf.addChildElement(this.LineBreak());
        for (var j = 0; j < pros[i].tasks.length; j++) {
          cf.addChildElement(
            new TextRun({
              text: pros[i].tasks[j],
              break: 1,
            })
          );
        }
        cf.addChildElement(this.LineBreak());
        cf.addChildElement(this.LineBreak());
      }
      return cf;
    }
    return "";
  }
}

export default cExpPerso;
