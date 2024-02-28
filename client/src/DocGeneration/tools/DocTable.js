const FileSaver = require("file-saver");
import enumImg from "../../_helpers/enum-Img.js";
import exppro from "../../DocGeneration/cExpPro";
import expperso from "../../DocGeneration/cExpPerso";
import comp from "../../DocGeneration/cComps";
import certs from "../../DocGeneration/cCerts";
import bref from "../../DocGeneration/cBref";
import lang from "../../DocGeneration/cLang";
import tbrow from "./tableRow";
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
    Hyperlink,
    Table,
    TableRow,
    TableCell,
    BorderStyle,
} from "docx";
import docData from "./DocData";

class DocTable {
    static getTable(docjs) {
        const table = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                this.getTitle(),
                                docData.LineBreak(),
                                /*docData.getLine("Nom:     ", docjs.familyname),
                                                                                            docData.getLineBreak(),
                                                                                            docData.getLine("Prénom: ", docjs.firstname),
                                                                                            docData.getLineBreak(),
                                                                                            docData.getLine("Email:   ", docjs.email),*/

                                docData.LineBreak(),
                                comp.getSubTitle("Compétences fonctionnelles"),
                                comp.getComp(docjs.functionalAbilities),
                                docData.getHL(),
                                docData.LineBreak(),
                                comp.getSubTitle("Compétences techniques"),
                                comp.getComp(docjs.technicalAbilities),
                                docData.getHL(),

                                docData.LineBreak(),
                                certs.getSubTitle("Diplômes / Certifications"),
                                docData.LineBreak(),
                                certs.getCerts(docjs.certifications),
                                docData.getHL(),

                                docData.LineBreak(),
                                docData.getSubTitle("Langues"),
                                lang.getLangues(docjs.languages),
                                docData.getHL(),
                                docData.LineBreak(),
                                docData.getSubTitle("Environnement"),
                                docData.LineBreak(),
                                docData.getLine2(docjs.skills.environments),
                                docData.getHL(),

                                docData.LineBreak(),
                                docData.getSubTitle("Languages"),
                                docData.LineBreak(),
                                docData.getLine2(docjs.skills.languages),
                                docData.getHL(),

                                docData.LineBreak(),
                                docData.getSubTitle("SGBD"),
                                docData.LineBreak(),
                                docData.getLine2(docjs.skills.databases),
                                docData.getHL(),

                                docData.LineBreak(),
                                docData.getSubTitle("Outils"),
                                docData.LineBreak(),
                                docData.getLine2(docjs.skills.tools),
                                docData.getHL(),

                                docData.LineBreak(),
                                docData.getSubTitle("Systèmes"),
                                docData.LineBreak(),
                                docData.getLine2(docjs.skills.systems),
                                docData.getHL(),

                                docData.LineBreak(),
                                bref.getSubTitle("En bref"),
                                docData.LineBreak(),
                                docData.getLine2(docjs.bref),
                                docData.getHL(),
                                docData.LineBreak(),
                                docData.pageBreak(),
                            ],
                            columnSpan: 2,
                            borders: {
                                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            },
                        }),
                    ],
                }),
            ],
        });
        table.addChildElement(tbrow.getBlankTableRowPageBreak());

        table.addChildElement(tbrow.getExpTitle("Expériences professionnelles"));
        table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
        let counterexp = 1;
        let nbtasks = 0;
        docjs.experiencesPro.forEach((element) => {
            if (counterexp % 2 == 0 && docjs.experiencesPro.length - 1 != counterexp) {
                let count = nbtasks + element.tasks.length;
                let nbRowBreaks = this.getNbRowBreak(count);
                alert(
                    "nbtasks: " +
                    nbtasks +
                    " **** count: " +
                    count +
                    " **** nbRowBreaks: " +
                    nbRowBreaks +
                    " ***** counterexp: " +
                    counterexp
                );
                for (let index = 0; index < nbRowBreaks; index++) {
                    table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                }
            }

            table.addChildElement(tbrow.getExpTableRow(element));
            table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
            if (counterexp % 2 == 0 && docjs.experiencesPro.length - 1 != counterexp) {
                /*let count = nbtasks + element.tasks.length;
                        let nbRowBreaks = this.getNbRowBreak(count);
                        for (let index = 0; index < nbRowBreaks; index++) {
                            table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                        }*/
                table.addChildElement(tbrow.getBlankTableRowPageBreak());
                nbtasks = 0;
            } else {
                //if (!counterexp % 2 && docjs.experiencesPro.length - 1 != counterexp) {
                nbtasks = element.tasks.length;
                //}
            }
            counterexp++;
        });
        if (docjs.experiencesPro != "" && docjs.experiencesPro.length % 2 != 0) {
            table.addChildElement(tbrow.getBlankTableRowPageBreak());
        }
        counterexp = 0;
        if (docjs.projectsPerso != "" && docjs.projectsPerso != null) {
            for (let index = 0; index < docjs.projectsPerso.length; index++) {
                const element = docjs.projectsPerso[index];
                if (index == 0) {
                    //table.addChildElement(tbrow.getBlankTableRowPageBreak());
                    table.addChildElement(tbrow.getExpTitle("Expériences personnelles"));
                    table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                }
                table.addChildElement(tbrow.getProjectsTableRow(element));
                table.addChildElement(tbrow.getBlankTableRowDoubleLineBreak());
                if (counterexp % 2 && docjs.experiencesPro.length - 1 != counterexp) {
                    table.addChildElement(tbrow.getBlankTableRowPageBreak());
                }
                counterexp++;
            }
        }
        return table;
    }
    static getNbRowBreak(nb) {
        if (nb > 15) return 0;
        if (nb < 10) return 4;
        switch (nb) {
            case 15:
                return 1;
            case 14:
                return 2;
            case 13:
                return 3;
            case 12:
                return 3;
            case 11:
                return 3;
            case 10:
                return 3;
        }
    }
    static getTitleRow() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [this.getTitle(), docData.LineBreak()],
                    columnSpan: 2,
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                }),
            ],
        });
    }
    static getTitle() {
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            text: "Dossier de compétences",
            heading: HeadingLevel.TITLE,
        });
    }
}

export default DocTable;