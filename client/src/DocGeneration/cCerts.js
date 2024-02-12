import {
  Paragraph,
  TextRun,
  ImageRun,
  AlignmentType,
  HeadingLevel,
  Tab,
} from "docx";
class cCerts {
  static getCerts(funcs) {
    const cf = new Paragraph({
      children: [],
    });
    for (var i = 0; i < funcs.length; i++) {
      cf.addChildElement(
        new TextRun({
          text: funcs[i].year + ": ",
          size: 24,
          bold: true,
        })
      );
      cf.addChildElement(
        new TextRun({
          children: [new Tab(), new Tab(), funcs[i].title],
          alignment: AlignmentType.LEFT,
          size: 22,
        })
      );
      cf.addChildElement(this.LineBreak());
    }
    return cf;
  }
  static LineBreak() {
    return new TextRun({
      text: "",
      break: 1,
    });
  }
  static async urlToBlob(url) {
    return (await fetch(url)).blob();
  }
  static getSubTitle(txt) {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: this.urlToBlob("https://raw.githubusercontent.com/proxydc/Templates/main/cert.png"),
          transformation: {
            width: 35,
            height: 35,
          },
        }),
        new TextRun({
          children: [new Tab(), new Tab(),new Tab(),new Tab(),""],
        }),
        new TextRun({
          text: txt,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.TITLE,
          bold: true,
          underline: true,
          size: 36,
          color: "#008cba",
        }),
      ],
    });
  }
 /* static getSubTitle(txt) {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: this.urlToBlob(
            "https://raw.githubusercontent.com/proxydc/Templates/main/cert.png"
          ),
          transformation: {
            width: 40,
            height: 40,
          },
        }),
        new TextRun({
          text: "                        " + txt,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.TITLE,
          bold: true,
          //underline: true,
          size: 30,
          color: "#008cba",
        }),
      ],
    });
  }*/
}
export default cCerts;
