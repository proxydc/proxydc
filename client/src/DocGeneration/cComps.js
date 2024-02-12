import { Paragraph, TextRun, ImageRun, AlignmentType, HeadingLevel, Tab, } from "docx";
class cComps {
  static getComp(funcs) {
    const cf = new Paragraph({
      children: [],
    });
    cf.addChildElement(this.LineBreak());
    for (var i = 0; i < funcs.length; i++) {
      cf.addChildElement(this.getBulletImg());
        cf.addChildElement(
          new TextRun({
            text: "       " + funcs[i],//7 spaces
            alignment: AlignmentType.LEFT,
            size: 22,
          }));
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
          data: this.urlToBlob("https://raw.githubusercontent.com/proxydc/Templates/main/comp.png"),
          transformation: {
            width: 35,
            height: 35,
          },
        }),
        new TextRun({
          children: [new Tab(), new Tab(),new Tab(),new Tab(),""],
        }),
        new TextRun({
         // children: [new Tab(), new Tab(),new Tab(),new Tab(), txt],
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
  static getBulletImg() {
    return new ImageRun({
      type: "png",
      data: this.urlToBlob("https://raw.githubusercontent.com/proxydc/Templates/main/bullet.png"),
      transformation: {
        width: 5,
        height: 5,
      },
    });
  }
}
export default cComps;
