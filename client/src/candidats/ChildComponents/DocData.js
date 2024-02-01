const FileSaver = require("file-saver");
import { Document, Header, ImageRun, Packer, Paragraph } from "docx";
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
}
export default DocData;