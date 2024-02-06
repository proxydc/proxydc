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
} from "docx";
import docData from "./DocData.js";
const FileSaver = require("file-saver");
import urldc from "../../_helpers/urllist.js";
import axios from "axios";
//import * as fs from 'fs';
const fs = require('fs');
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
      alert("iam here" + this.dbDoc.document.email);
      var firstname = this.dbDoc.document.firstname;
      var lastname = "Doe";
      var message = "I just created a document using Vue.js 😲";
      const image1 = new ImageRun({
        type: 'png',
       /* data: fs.readFile(new URL('https://raw.githubusercontent.com/proxydc/Templates/main/HLine.png'), 'utf8', function (err, data) {
          if (err) {
            console.log(err);
          } else {
            return data;
          }}),*/
         // data:fs.readFileSync(new URL("https://raw.githubusercontent.com/proxydc/Templates/main/HLine.png"), 'utf8'),
          transformation: {
            width: 100,
              height: 100,
        },
        });
        const image = new ImageRun({
    type: 'png',
    data: docData.getBufferHL(),
    transformation: {
        width: 903,
        height: 1149,
    },
    floating: {
        horizontalPosition: {
            offset: 1014400, // relative: HorizontalPositionRelativeFrom.PAGE by default
        },
        verticalPosition: {
            offset: 1014400, // relative: VerticalPositionRelativeFrom.PAGE by default
        },
    },
});
        // Create a new Document an save it in a variable${this.form[0].familyname}
        /*let doc = new Document({
          sections: []});*/
        let doc = new Document({
          sections: [
            {
              headers: {
              //  default: docData.GetHeader2(),
                default: docData.getHeader(docjs.familyname, docjs.firstname),
              },
              properties: {},
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
                new Paragraph({
                  children: [image],
                }),
                docData.getComp(docjs.functionalAbilities),
                docData.LineBreak(),
                docData.getSubTitle("Compétences techniques"),
                docData.getComp(docjs.technicalAbilities),
                docData.LineBreak(),
                docData.getSubTitle("Diplômes / Certifications"),
                docData.LineBreak(),
                docData.getCerts(docjs.certifications),

              ],
            },
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