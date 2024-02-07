import { Paragraph, TextRun } from "docx";
class cLang {
  static getLangues(langs) {
    const cf = new Paragraph({
      children: [],
      /*bullet: {
        level: 0, // How deep you want the bullet to be. Maximum level is 9
      },*/
    });
    for (var i = 0; i < langs.length; i++) {
      cf.addChildElement(
        new TextRun({
          text: i + 1 + ")  " + langs[i],
          break: 1,
          //bullet: {level: 0},
        })
      );
    }
    return cf;
  }
}
export default cLang;
