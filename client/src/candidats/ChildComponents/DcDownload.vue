<template>
  <div class="hello">
    <button class="btn" v-on:click="createDoc(documentId)">
      DOWNLOAD DOCUMENT
    </button>
  </div>
</template>
<script>
import { Document, Packer } from "docx";
import docData from "../../DocGeneration/tools/DocData";
import docTable from "../../DocGeneration/tools/DocTable";
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
        const url = urldc.getDcDocUrl(this.documentId);
        axios.get(url).then((res) => {
          console.log("docdata: " + res.data.document.projectsPerso[0].technical_env);
          this.dbDoc = res.data;
        });
      } catch (err) {
        this.errormsg = err;
      }
      console.log("docdata: " + this.dbDoc);
      let docjs = this.dbDoc.document;
      const doc = new Document({
        sections: [
          {
            properties: {
              titlePage: true,
            },
            headers: {
              first: docData.getFirstPageHeader(docjs),
              default: docData.getDefaultPageHeader(docjs),
            },
            footers: {
              default: docData.getDefaultPageFooter(docjs),
              first: docData.getFirstPageFooter(docjs),
            },
            children: [docTable.getTable(docjs)],
          },
        ],
      });
      // To export into a .docx file
      var filen =
        "DossierCompetences-" +
        docjs.familyname +
        "-" +
        docjs.firstname +
        "-" +
        new Date().toLocaleString() +
        ".docx";
      this.saveDocumentToFile(doc, filen); 
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