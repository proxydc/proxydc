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
