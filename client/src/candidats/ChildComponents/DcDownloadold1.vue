<template>
  <div class="btn btn-link float-right" @click="exportDocx">
    <i class="far fa-file-word"></i>
    Generate .docx file
  </div>
</template>
  <script>
import {
  WidthType,
  BorderStyle,
  Document,
  Paragraph,
  Packer,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";
export default {
  components: {
    Document,
    Paragraph,
    Packer,
    TextRun,
    saveAs,
    BorderStyle,
    WidthType,
  },
  data: () => ({
    state: {
      name: "San Luis Potosi",
      map: "data:image/png;base64",
      municipalities: [
        { name: "San Luis Potosi", population: 824000 },
        { name: "Rio Verde", population: 160000 },
        { name: "Cd Valles", population: 176000 },
        { name: "Matehuala", population: 82726 },
      ],
      tourist_attractions: [
        "Tamtoc",
        "Sótano de las Golondrinas",
        "Cascada de Tamul",
      ],
    },
  }),
  methods: {
    exportDocx() {
      // Create a new Document an save it in a variable
      let doc = new Document({
        sections: []});

      // Add paragraph in the document
      doc.addParagraph(
        new Paragraph(`Detailed Report for ${this.state.name}`)//.title().center()
      );

      // Add heading for map
      doc.addParagraph(
        new Paragraph(`State Map`).heading1().thematicBreak().center()
      );

      // Add map image
      doc.createImage(this.state.map, 600, 250, {});

      // Add heading for attractions
      doc.addParagraph(
        new Paragraph(`Tourist Attractions`).heading1().thematicBreak().center()
      );

      // Bullet points
      for (let attraction of this.state.tourist_attractions) {
        doc.addParagraph(new Paragraph(attraction).bullet());
      }

      // Add heading for municipalities
      doc.addParagraph(
        new Paragraph(`Municipalities`).heading1().thematicBreak().center()
      );

      // Create table
      let municipalities_table = doc.createTable({
        rows: this.state.municipalities.length + 1,
        columns: 2,
        width: 100,
        widthUnitType: WidthType.AUTO,
        columnWidths: [2934, 2934],
      });
      municipalities_table.getCell(0, 0).addParagraph(new Paragraph("Name"));
      municipalities_table
        .getCell(0, 1)
        .addParagraph(new Paragraph("Population"));

      for (let [index, municipality] of this.state.municipalities.entries()) {
        municipalities_table
          .getCell(index + 1, 0)
          .addParagraph(new Paragraph(municipality.name));
        municipalities_table
          .getCell(index + 1, 1)
          .addParagraph(new Paragraph(municipality.population));
      }

      // To export into a .docx file
      let packer = new Packer();

      packer.toBlob(doc).then((blob) => {
        saveAs(blob, "detailed_report.docx");

        // using sweet alert for notification
        toast({
          type: "success",
          title: "Document created!",
        });
      });
    },
    created() {},
  },
};
</script>