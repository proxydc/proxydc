import {
  Paragraph,
  TextRun,
  ImageRun,
  AlignmentType,
  HeadingLevel,
  Tab,
} from "docx";
class cLang {
  /*static getLangues(langs) {
    const cf = new Paragraph({
      children: [],
    });
    for (var i = 0; i < langs.length; i++) {
      cf.addChildElement(
        new TextRun({
          text: i + 1 + ")  " + langs[i],
          break: 1,
        })
      );
    }
    return cf;
  }*/
  static getLangues(funcs) {
    const cf = new Paragraph({
      children: [],
    });
    cf.addChildElement(this.LineBreak());
    for (var i = 0; i < funcs.length; i++) {
      cf.addChildElement(this.getBulletImg());
      cf.addChildElement(
        new TextRun({
          text: "       " + funcs[i], //7 spaces
          alignment: AlignmentType.LEFT,
          size: 22,
        })
      );
      cf.addChildElement(this.LineBreak());
    }
    return cf;
  }
  static async urlToBlob(url) {
    return (await fetch(url)).blob();
  }
  static getBulletImg() {
    return new ImageRun({
      type: "png",
      data: this.urlToBlob(
        "https://raw.githubusercontent.com/proxydc/Templates/main/bullet.png"
      ),
      transformation: {
        width: 5,
        height: 5,
      },
    });
  }
  static LineBreak() {
    return new TextRun({
      text: "",
      break: 1,
    });
  }
}
export default cLang;
