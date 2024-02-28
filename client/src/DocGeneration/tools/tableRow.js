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
    TableRow,
    TableCell,
    BorderStyle,
    WidthType,
} from "docx";
import docData from "./DocData";
import exppro from "../../DocGeneration/cExpPro";
import enumImg from "../../_helpers/enum-Img.js";

class tableRow {
    static getBlankTableRow() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [docData.LineBreak()],
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                }),
                new TableCell({
                    children: [docData.LineBreak()],
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
    static getBlankTableRowDoubleLineBreak() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [docData.LineBreak(), docData.LineBreak(), ],
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
    static getBlankTableRowSingleLineBreak() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [docData.LineBreak()],
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

    static getBlankTableRowPageBreak() {
        return new TableRow({
            children: [
                new TableCell({
                    children: [docData.pageBreak()],
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
    static getBlankTableRowPageBreakReq(ind, exps) {
        if (exps != "" && exps.length > ind) {
            return new TableRow({
                children: [
                    new TableCell({
                        children: [docData.pageBreak()],
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
        return new TableRow({
            children: [
                new TableCell({
                    children: [],
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
    static getExpTitle(txt) {
        return new TableRow({
            children: [
                new TableCell({
                    children: [exppro.getSubTitle(txt)],
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

    static getTwoExpTableRow(i, pros) {
        alert("length: " + pros.length);
        if (pros != "" && pros.length > i) {
            //alert('length: ' + pros.length);
            return new TableRow({
                children: [
                    new TableCell({
                        children: [
                            exppro.getExpEnt(pros[i].company),
                            exppro.getExpPost(pros[i].title),
                            exppro.getExpPeriode(pros[i].start, pros[i].end),
                            exppro.getExpEnvTechTitle("Environnement technique : "),
                            exppro.getExpEnvTech(pros[i].technical_env),
                        ],
                        borders: {
                            top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            right: {
                                style: BorderStyle.DASH_DOT_STROKED,
                                size: 5,
                                color: "889900",
                            },
                        },
                        width: { size: 30, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                        children: [
                            exppro.getExpTask(0, pros[i].tasks),
                            exppro.getExpTask(1, pros[i].tasks),
                            exppro.getExpTask(2, pros[i].tasks),
                            exppro.getExpTask(3, pros[i].tasks),
                            exppro.getExpTask(4, pros[i].tasks),
                            exppro.getExpTask(5, pros[i].tasks),
                            exppro.getExpTask(6, pros[i].tasks),
                            exppro.getExpTask(7, pros[i].tasks),
                            exppro.getExpTask(8, pros[i].tasks),
                            exppro.getExpTask(9, pros[i].tasks),
                        ],
                        borders: {
                            top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                            right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        },
                        width: { size: 70, type: WidthType.PERCENTAGE },
                    }),
                ],
            });
        }
        return new TableRow({
            children: [
                new TableCell({
                    children: [],
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

    static getExpTasksTableCell(tasks) {
        const tablecell = new TableCell({
            children: [],
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            width: { size: 68, type: WidthType.PERCENTAGE },
        });
        tasks.forEach(element => {
            tablecell.addChildElement(exppro.getExpTask(element))
                //tablecell.addChildElement(docData.LineBreak())
        });
        return tablecell;
    }

    static getExpTableRow(pros) {
        let tablerow = new TableRow({
            children: [
                new TableCell({
                    children: [
                        exppro.getExpEnt(pros.company),
                        docData.LineBreak(),
                        exppro.getExpPost(pros.title),
                        docData.LineBreak(),
                        exppro.getExpPeriode(pros.start, pros.end),
                        docData.LineBreak(),
                        exppro.getExpEnvTechTitle("Environnement technique : "),
                        docData.LineBreak(),
                        exppro.getExpEnvTech(pros.technical_env),
                        docData.LineBreak(),
                        docData.LineBreak(),
                    ],
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: {
                            space: 10,
                            style: BorderStyle.THREE_D_EMBOSS,
                            size: 5,
                            color: "#206643",
                        },
                    },
                    width: { size: 32, type: WidthType.PERCENTAGE },
                }),
            ],
        });
        tablerow.addChildElement(this.getExpTasksTableCell(pros.tasks));
        return tablerow;
    }

    static getProjectsTableRow(pros) {
        let tablerow = new TableRow({
            children: [
                new TableCell({
                    children: [
                        exppro.getExpPost(pros.title),
                        docData.LineBreak(),
                        exppro.getExpPeriode(pros.period, ''),
                        docData.LineBreak(),
                        exppro.getExpEnvTechTitle("Environnement technique : "),
                        docData.LineBreak(),
                        exppro.getExpEnvTech(pros.technical_env),
                        docData.LineBreak(),
                        docData.LineBreak(),
                    ],
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: {
                            space: 10,
                            style: BorderStyle.THREE_D_EMBOSS,
                            size: 5,
                            color: "#2c6a5b",
                        },
                    },
                    width: { size: 32, type: WidthType.PERCENTAGE },
                }),
            ],
        });
        tablerow.addChildElement(this.getExpTasksTableCell(pros.tasks));
        return tablerow;
    }
}
export default tableRow;