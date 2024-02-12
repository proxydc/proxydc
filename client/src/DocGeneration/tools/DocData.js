const FileSaver = require("file-saver");
import enumImg from "../../_helpers/enum-Img.js";
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
  HorizontalPositionAlign,
  VerticalPositionAlign,
  ExternalHyperlink,
  PageNumber,
  FrameAnchorType,
  ShadingType,
} from "docx";

class DocData {
  static getHeader(nom, prenom) {
    return new Paragraph({
      children: [
        new TextRun({
          text: nom + " " + prenom,
          bold: true,
          alignment: AlignmentType.CENTER,
        }),
      ],
      floating: {
        horizontalPosition: {
          align: HorizontalPositionAlign.CENTER,
        },
        verticalPosition: {
          align: VerticalPositionAlign.TOP,
        },
      },
    });
  }
  static getBufferLogo1stPage() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: this.urlToBlob(enumImg.Logo2),
          transformation: {
            width: 120,
            height: 54,
            /*position: absolute,
            top: 0,
            right: 0,*/
          },
          floating: {
            horizontalPosition: {
              align: HorizontalPositionAlign.RIGHT,
            },
            verticalPosition: {
              align: VerticalPositionAlign.TOP,
            },
          },
        }),
      ],
    });
  }
  static getBufferLogo() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: this.urlToBlob(enumImg.Logo1),
          transformation: {
            width: 100,
            height: 80,
            /*position: absolute,
            top: 0,
            right: 0,*/
          },
          floating: {
            horizontalPosition: {
              align: HorizontalPositionAlign.LEFT,
            },
            verticalPosition: {
              align: VerticalPositionAlign.TOP,
            },
          },
        }),
      ],
    });
  }
  static getHL() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: "iVBORw0KGgoAAAANSUhEUgAABAAAAAAFCAYAAADbn54jAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAAGYktHRAD+AP4A/usY1IIAAAAJdnBBZwAABAAAAAJAABJgAnEAAAAldEVYdGNyZWF0ZS1kYXRlADIwMTEtMDEtMDNUMTY6MDE6NTYrMDA6MDAJWHqrAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDExLTAxLTAzVDE2OjAxOjU2KzAwOjAwVukMnwAAAD9JREFUeF7t2DEBADAIxEBaS/jXRpeqeO6WeMjpnikAAAAg2v0FAAAAghkAAAAAsIABAAAAAAsYAAAAABCv6gEvzwJuN2SghwAAAABJRU5ErkJggg==",
          transformation: {
            width: 600,
            height: 2,
          },
        }),
      ],
    });
  }  
  static getPageNumber() {
    return new Paragraph({
      children: [
        new TextRun({
          children: [
            "Page ",
            PageNumber.CURRENT,
            " of ",
            PageNumber.TOTAL_PAGES,
          ],
        }),
      ],
      alignment: AlignmentType.RIGHT,
      /*floating: {
        horizontalPosition: {
          align: HorizontalPositionAlign.RIGHT,
        },
        verticalPosition: {
          align: VerticalPositionAlign.BOTTOM,
        },
      },*/
    });
  }
  static getFooterC(nom, prenom) {
    return new Paragraph({
      /* frame: {
        position: {
            x: -100,
            y: 20000,
        },
        width: 4000,
        height: 10,
        anchor: {
            horizontal: FrameAnchorType.MARGIN,
            vertical: FrameAnchorType.MARGIN,
        },
        alignment: {
            x: HorizontalPositionAlign.CENTER,
            y: VerticalPositionAlign.BOTTOM,
        },
    },
    border: {
        top: {
            color: "auto",
            space: 1,
            value: "single",
            size: 6,
        },
        bottom: {
            color: "auto",
            space: 1,
            value: "single",
            size: 6,
        },
        left: {
            color: "auto",
            space: 1,
            value: "single",
            size: 6,
        },
        right: {
            color: "auto",
            space: 1,
            value: "single",
            size: 6,
        },
    },*/
      children: [
        new TextRun({
          text: "M : " + nom + " " + prenom,
          bold: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      shading: {
        type: ShadingType.REVERSE_DIAGONAL_STRIPE,
        color: "00FFFF",
        fill: "FF0000",
      },
    });
  }
  static getFooterL() {
    return new Paragraph({
      children: [
        new TextRun({
          text: "Proxiad Est",
          bold: true,
        }),
      ],
      alignment: AlignmentType.LEFT,
    });
  }
  static getFooterR() {
    return new Paragraph({
      children: [
        new TextRun({
          text: "E : (commercial (e)",
          bold: true,
          break: 1,
        }),
        new TextRun({
          text: "www.proxiad.com",
          bold: true,
        }),
      ],
      alignment: AlignmentType.RIGHT,
    });
  }


  static getBulletImg(url) {
    return new ImageRun({
      type: "png",
      data: this.urlToBlob(url),
      transformation: {
        width: 8,
        height: 8,
      },
    });
  }
  static async urlToBlob(url) {
    return (await fetch(url)).blob();
  }
  static pageBreak(docjs) {
    var lines =
      docjs.functionalAbilities.length +
      docjs.technicalAbilities.length +
      docjs.certifications.length +
      docjs.languages.length;
    alert("nblines: " + lines);
    if (lines < 14 && lines > 8) {
      return new Paragraph({
        text: "",
        pageBreakBefore: true,
      });
    }
    return "";
  }


  static getLine(col, text) {
    return new Paragraph({
      children: [
        new TextRun({
          text: col,
          bold: true,
          size: 30,
        }),
        new TextRun({
          children: [new Tab(), text],
          size: 28,
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
 static getLine2(txt) {
    return new Paragraph({
      children: [
        new TextRun({
          text: txt,
          size: 22,
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
  static LineBreakTR() {
    return new TextRun({
      text: "",
      break: 1,
    });
  } 
  static LineBreak() {
    return new Paragraph({
      children: [
        new TextRun({
          text: "",
          //break: 1,
        }),
      ],
    });
  }
  static getSubTitle(txt) {
    return new Paragraph({
      children: [
        new TextRun({
          text: txt,
          alignment: AlignmentType.LEFT,
          heading: HeadingLevel.TITLE,
          bold: true,
          underline: true,
          size: 30,
          color: "#008cba",
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
  /*static getBulletPoint(txt, lvl) {
    return new Paragraph({
      text: txt,
      bullet: {
        level: lvl, // How deep you want the bullet to be. Maximum level is 9
      },
    });
  }*/
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

}

export default DocData;
