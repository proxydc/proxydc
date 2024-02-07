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
class cFooter {
  static async urlToBlob(url) {
    return (await fetch(url)).blob();
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

}

export default cFooter;
