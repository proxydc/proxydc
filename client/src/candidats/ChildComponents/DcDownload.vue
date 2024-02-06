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
  Header,
  HeadingLevel,
  Packer,
  Paragraph,
  Tab,
  TabStopPosition,
  TabStopType,
  TextRun,
  ImageRun,
  Footer,
  addParagraph,
  ShadingType,
  HorizontalPositionAlign,
  VerticalPositionAlign,
  TextWrappingType,
  TextWrappingSide,
} from "docx";
import docData from "./DocData.js";
const FileSaver = require("file-saver");
import urldc from "../../_helpers/urllist.js";
import axios from "axios";
//import * as fs from 'fs';
const fs = require("fs");
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
        const url = urldc.getDcDocUrl(this.documentId);
        alert("urldc: " + url);
        axios.get(url).then((res) => {
          console.log("docdata: " + res);
          this.dbDoc = res.data;
        });
      } catch (err) {
        this.errormsg = err;
      }
      console.log("docdata: " + this.dbDoc);
      let docjs = this.dbDoc.document;
      // Create a new Document an save it in a variable${this.form[0].familyname}
      /*let doc = new Document({
          sections: []});*/
      const doc = new Document({
        sections: [
          {
            properties: {
              titlePage: true,
            },
            headers: {
              first: new Header({
                // The header on first page when the 'Different First Page' option is activated
                children: [                
                  new Paragraph({
                    children: [
                      new ImageRun({
                        type: "png",
                        data: "iVBORw0KGgoAAAANSUhEUgAABAAAAAAFCAYAAADbn54jAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAAGYktHRAD+AP4A/usY1IIAAAAJdnBBZwAABAAAAAJAABJgAnEAAAAldEVYdGNyZWF0ZS1kYXRlADIwMTEtMDEtMDNUMTY6MDE6NTYrMDA6MDAJWHqrAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDExLTAxLTAzVDE2OjAxOjU2KzAwOjAwVukMnwAAAD9JREFUeF7t2DEBADAIxEBaS/jXRpeqeO6WeMjpnikAAAAg2v0FAAAAghkAAAAAsIABAAAAAAsYAAAAABCv6gEvzwJuN2SghwAAAABJRU5ErkJggg==",
                        transformation: {
                          width: 800,
                          height: 100,
                        },
                        floating: {
                          horizontalPosition: {
                            align: HorizontalPositionAlign.LEFT,
                          },
                          verticalPosition: {
                            align: VerticalPositionAlign.TOP,
                          },
                          wrap: {
                            type: TextWrappingType.SQUARE,
                            side: TextWrappingSide.BOTH_SIDES,
                          },
                        },
                      }),
                    ],
                  }),
                  docData.getHeader(docjs.familyname, docjs.firstname),
                  docData.getBufferLogo1stPage(),
                  docData.getBufferLogo(),
                ],
              }),
              default: new Header({
                // The standard default header on every page or header on odd pages when the 'Different Odd & Even Pages' option is activated
                children: [
                  docData.getHeader(docjs.familyname, docjs.firstname),
                  docData.getBufferLogo1stPage(),
                  docData.getHL(),
                ],
              }),
              /* even: new Header({ // The header on even pages when the 'Different Odd & Even Pages' option is activated
                children: [],
            }),*/
            },
            footers: {
              default: new Footer({
                // The standard default footer on every page or footer on odd pages when the 'Different Odd & Even Pages' option is activated
                children: [
                  docData.getFooterC(docjs.familyname, docjs.firstname),
                  docData.getFooterL(),
                  docData.getPageNumber(),
                ],
              }),
              first: new Footer({
                // The footer on first page when the 'Different First Page' option is activated
                children: [
                  docData.getFooterC(docjs.familyname, docjs.firstname),
                  docData.getFooterL(),
                  docData.getFooterR(),
                  docData.getPageNumber(),
                ],

              }),
              /* even: new Footer({ // The footer on even pages when the 'Different Odd & Even Pages' option is activated
                children: [],
            }),*/
            },
            children: [
              docData.getTitle(),
              docData.LineBreak(),
              docData.getLine("Nom:     ", docjs.familyname),
              docData.getLineBreak(),
              docData.getLine("Prénom: ", docjs.firstname),
              docData.getLineBreak(),
              docData.getLine("Email:   ", docjs.email),
              docData.LineBreak(),
              docData.getSubTitle("Compétences fonctionnelles"),
              docData.getComp(docjs.functionalAbilities),
              docData.getHL(),
              docData.LineBreak(),
              docData.getSubTitle("Compétences techniques"),
              docData.getComp(docjs.technicalAbilities),
              docData.getHL(),
              docData.LineBreak(),
              docData.getSubTitle("Diplômes / Certifications"),
              docData.LineBreak(),
              docData.getCerts(docjs.certifications),
              docData.getHL(),
              docData.getSubTitle("Langues"),
              //docData.LineBreak(),
              docData.getLangues(docjs.languages),
              docData.getHL(),

               docData.getSubTitle("Expériences professionnelles"),
                docData.LineBreak(),
                docData.getExpPro(docjs.experiences),
                docData.getHL(),

                docData.getSubTitle("Expériences personnelles"),
                docData.LineBreak(),
                docData.getExpPerso(docjs.projects),
                docData.getHL(),

              docData.getSubTitle("Environnement"),
              docData.LineBreak(),
              docData.getLine2(docjs.skills.environments),
              docData.getHL(),

              docData.getSubTitle("Languages"),
              docData.LineBreak(),
              docData.getLine2(docjs.skills.languages),
              docData.getHL(),

              docData.getSubTitle("SGBD"),
              docData.LineBreak(),
              docData.getLine2(docjs.skills.databases),
              docData.getHL(),

              docData.getSubTitle("Outils"),
              docData.LineBreak(),
              docData.getLine2(docjs.skills.tools),
              docData.getHL(),

              docData.getSubTitle("Systèmes"),
              docData.LineBreak(),
              docData.getLine2(docjs.skills.systems),
              docData.getHL(),

              docData.getSubTitle("En bref"),
              docData.LineBreak(),
              docData.getLine2(docjs.bref),
              docData.getHL(),
            ],
          },
        ],
      });
      //doc.add(docData.getSubTitle("Outils"));
      doc.addSection({
        children: [
          new Paragraph({
            children: [
              new TextRun("New Section added"),
              new TextRun("Hello New Section"),
            ],
          }),
        ],
      });
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
  },
};
</script>