import { Paragraph, TextRun, ImageRun, AlignmentType, HeadingLevel } from "docx";
class cComps {
  static getComp(funcs) {
    const cf = new Paragraph({
      children: [],
    });
    for (var i = 0; i < funcs.length; i++) {
      cf.addChildElement(
        new TextRun({
          text: funcs[i],
          break: 1,
        })
      );
    }
    return cf;
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
export default cComps;
