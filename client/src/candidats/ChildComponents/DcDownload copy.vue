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
} from "docx";
import docData from "./DocData.js"
const FileSaver = require("file-saver");
import urldc from "../../_helpers/urllist.js";
import axios from "axios";
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
      alert("iam here" + this.dbDoc.document.email);
      var firstname = this.dbDoc.document.firstname;
      var lastname = "Doe";
      var message = "I just created a document using Vue.js 😲";
      // Create a new Document an save it in a variable${this.form[0].familyname}
      let doc = new Document({
        sections: [
          {
            /*headers: {
              default: docData.GetHeader() 
                       },*/
            properties: {},
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                text: docjs.familyname + " " + docjs.firstname,
                heading: HeadingLevel.TITLE,
              }),
              new Paragraph({
                children: [
                  new TextRun(`Hi! My name is 
     ${firstname} ${lastname}. Here is my ID: ${this.documentId}\n Family Name: ${docjs.familyname}`),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: message,
                    bold: true,
                  }),
                ],
              }),
            ],
          },
        ],
      });
      // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
      // This simple example will only contain one section
      alert("doc1: " + doc);
      alert("doc2: " + doc);
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