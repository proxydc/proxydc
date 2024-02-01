<template>
  <div class="hello">
    <button class="btn" v-on:click="createDoc(documentId)">
      DOWNLOAD DOCUMENT
    </button>
  </div>
</template>
<script>
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Tab,
  TabStopPosition,
  TabStopType,
  TextRun,
  Header,
  ImageRun,
} from "docx";
import docData from "./DocData.js";
const FileSaver = require("file-saver");
import urldc from "../../_helpers/urllist.js";
import axios from "axios";
import * as fs from "fs";
import { Buffer } from "buffer";
export default {
  data() {
    return {
      form: [],
      documentId: "",
      dbDoc: {},
      errormsg: "",
    };
  },
  mounted() {
    try {
      this.documentId = this.$route.params.id;
      this.createDoc();
    } catch (err) {
      this.errormsg = err.message;
    }
  },
  methods: {
    createDoc() {
      try {
        const url = urldc.getDcDocUrl(this.documentId); //`dc/doc/${this.documentId}`;
        alert("urldc: " + url);
        axios.get(url).then((res) => {
          console.log("docdata: " + res);
          this.dbDoc = res.data;
        });
      } catch (err) {
        this.errormsg = err;
      }
      console.log("docdata: " + this.dbDoc);
      var docjs = this.dbDoc.document;
      // Create a new Document an save it in a variable${this.form[0].familyname}
      let doc = new Document({
        sections: [
          {
            /*headers: {
              default: docData.GetHeader() 
                       },*/
            properties: {},
            headers: {
              default: new Header({
                children: [
                  /* new ImageRun({                                    
                                     data: Buffer.from(imagelogoBase64, "base64"),
                                    transformation: {
                                        width: 10,
                                        height: 10,
                                    },
                                }),*/
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: docjs.familyname + " " + docjs.firstname,
                        bold: true,
                        alignment: AlignmentType.CENTER,
                      }),
                      new TextRun({
                        children: [new Tab(), docjs.email],
                      }),
                    ],
                  }),
                ],
              }),
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                text: docjs.familyname + " " + docjs.firstname,
                heading: HeadingLevel.TITLE,
              }),
              /* docjs.certifications.forEach(cert => {
                new Paragraph({
                alignment: AlignmentType.LEFT,
                text: cert.year,               
              })
              }),*/

              this.createCertificationsList(docjs.certifications),
            ],
          },
        ],
      });
      // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
      // This simple example will only contain one section

      // To export into a .docx file
      this.saveDocumentToFile(doc, `vuedoc.docx`);
    },
    saveDocumentToFile(doc, fileName) {
      const mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      Packer.toBlob(doc).then((blob) => {
        const docblob = blob.slice(0, blob.size, mimeType);
        FileSaver.saveAs(docblob, fileName);
      });
    },
    createCertificationsList(certifications) {
      return certifications.forEach((certification) => {
       // alert(certification.year);
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
    },
  },
};
</script>