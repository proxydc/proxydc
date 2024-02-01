const FileSaver = require("file-saver");
import { Document, Header, ImageRun, Packer, Paragraph, TabStopType, TabStopPosition, TextRun, Tab,  } from "docx";
import * as fs from 'fs';
class DocData{
    static async GetHeader()
    {
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

      static createInstitutionHeader(institutionName, dateText) {
        return new Paragraph({
            /*tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
            ],*/
            children: [
                new TextRun({
                    text: institutionName,
                    bold: true,
                }),
                new TextRun({
                    children: [new Tab(), dateText],
                    bold: true,
                }),
            ],
        });
    }
    static createCertificationsList(certifications) {
        return certifications.forEach(certification => {
            alert(certification.year)
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