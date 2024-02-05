<script>
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import urldc from "../../_helpers/urllist.js";
import axios from "axios";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

export default {
  data() {
    return {
      documentId: "",
      docDC: {},
      errormsg: "",
      jsondoc: {},
    };
  },
  created() {
    try {
      this.documentId =this.$route.params.id;
      console.log("Iam here");
      this.getDCDoc(this.$route.params.id);
      console.log("data: " + this.docDC);
      
    } catch (err) {
      this.errormsg = err.message;
    }
  },
  methods: {
    getDCDoc(id) {
      try {
        const url = urldc.getDcDocUrl(id);
        axios.get(url).then((res) => {
          console.log(res.data);
          this.docDC = res.data.document;
          this.jsondoc =this.GetDocElements(res.data.document);
        });
      } catch (err) {
        this.errormsg = err;
      }
    },
    renderDoc(jsoneles) {
      alert("familyname: "+jsoneles.familyname)
      //const jsondoc= GetDocElements(docDC);
      loadFile(
       // "https://docxtemplater.com/input.docx",
        // "C:\\Users\\aseetharaman\\Desktop\\11012024\\vue-projects\\Proxiad\\31012024\\Alex3\\client\\src\\_helpers\\dctemplate.docx",
       // `../../_helpers/dctemplate.docx`,
       // "https://localhost:8080/dctemplate.docx",
       // this.getDocTemplate(),
      // path.resolve('./dctemplate.docx'),
      "https://raw.githubusercontent.com/proxydc/Templates/main/dctemplate.docx",
        function (error, content) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });

          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render( jsoneles
           /* {document:docDC}{
            first_name: "John",
            last_name: "Doe",
            phone: "0652455478",
            description: "New Website",
          }*/);
         // doc.addsection(new section)

          const blob = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // Output the document using Data-URI
          saveAs(blob, "output.docx");
        }
      );
    },
    GetDocElements(doc)
    {
      alert(doc.familyname);
      return {
        familyname: doc.familyname,
        firstname: doc.firstname,
        email: doc.email,
        bref: doc.bref,
        system: doc.skills.systems,
        sgbd: doc.skills.databases,
        languages: doc.skills.languages,
        environments: doc.skills.environments,
        tools: doc.skills.tools,

      };

    },
   /* getDocTemplate() {
      var client = new XMLHttpRequest();
      client.open("GET", "https://localhost:8080/dctemplate.docx");
      client.onreadystatechange = function () {
        alert(client.responseText);
      };
      client.send();
    },*/
  },
};
</script>
<template>
  <button @click="renderDoc(jsondoc)">Render docx template</button>
</template>