const FileSaver = require("file-saver");
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
} from "docx";
import * as fs from "fs";
class DocData {
  static async GetHeader2() {
    return new Header({
      children: [
        new Paragraph({
          children: [
            new ImageRun({
              type: "png",
              data: await urlToBlob(
                "https://raw.githubusercontent.com/proxydc/Templates/main/HLine.png"
              ),
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

  static getLine(col, text) {
    return new Paragraph({
      children: [
        new TextRun({
          text: col,
          bold: true,
        }),
        new TextRun({
          children: [new Tab(), text],
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
  static getHeader(nom, prenom) {
    return new Paragraph({
      children: [
        new TextRun({
          text: nom + " " + prenom,
          bold: true,
          alignment: AlignmentType.CENTER,
        }),
      ],
    });
  }

  static getFooterC(nom, prenom) {
    return new Paragraph({
      /* frame: {
        position: {
            x: -100,
            y: 20000,
        },
        width: 4000,
        height: 10,
        anchor: {
            horizontal: FrameAnchorType.MARGIN,
            vertical: FrameAnchorType.MARGIN,
        },
        alignment: {
            x: HorizontalPositionAlign.CENTER,
            y: VerticalPositionAlign.BOTTOM,
        },
    },
    border: {
        top: {
            color: "auto",
            space: 1,
            value: "single",
            size: 6,
        },
        bottom: {
            color: "auto",
            space: 1,
            value: "single",
            size: 6,
        },
        left: {
            color: "auto",
            space: 1,
            value: "single",
            size: 6,
        },
        right: {
            color: "auto",
            space: 1,
            value: "single",
            size: 6,
        },
    },*/
      children: [
        new TextRun({
          text: "M : " + nom + " " + prenom,
          bold: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
    });
  }

  static getFooterL() {
    return new Paragraph({
      children: [
        new TextRun({
          text: "Proxiad Est",
          bold: true,
        }),
      ],
      alignment: AlignmentType.LEFT,
    });
  }
  static getFooterR() {
    return new Paragraph({
      children: [
        new TextRun({
          text: "E : (commercial (e)",
          bold: true,
          break: 1,
        }),
        new TextRun({
          text: "www.proxiad.com",
          bold: true,
        }),
      ],
      alignment: AlignmentType.RIGHT,
    });
  }

  /* static getHeader(nom, prenom) {
    return new Header({
      children: [
        new ImageRun({
          data: Buffer.from(imagelogoBase64, "base64"),//chemin url to get from github
          transformation: {
            width: 10,
            height: 10,
          },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: nom + " " + prenom,
              bold: true,
              alignment: AlignmentType.CENTER,
            }),
          ]
        });
      ],
    });
  }*/

  static getLine2(txt) {
    return new Paragraph({
      children: [
        new TextRun({
          text: txt,
          //bold: true,
        }),
      ],
    });
  }
  static getLineBreak() {
    new Paragraph({
      children: [], // Just newline without text
    });
  }
  static LineBreak() {
    return new Paragraph({
      children: [
        new TextRun({
          text: "",
          break: 1,
        }),
      ],
    });
  }
  static getSubTitle(txt) {
    return new Paragraph({
      children: [
        new TextRun({
          text: txt,
          alignment: AlignmentType.LEFT,
          heading: HeadingLevel.TITLE,
          bold: true,
          underline: true,
          size: 30,
          color: "#008cba",
        }),
      ],
    });
  }
  static getComp(funcs) {
    const cf = new Paragraph({
      children: [],
    });
    for (var i = 0; i < funcs.length; i++) {
      cf.addChildElement(
        new TextRun({
          text: funcs[i],
          break: 1,
        })
      );
    }
    return cf;
  }

  static getCerts(funcs) {
    const cf = new Paragraph({
      children: [],
    });
    for (var i = 0; i < funcs.length; i++) {
      cf.addChildElement(
        new TextRun({
          text: funcs[i].year,
        })
      );
      cf.addChildElement(
        new TextRun({
          children: [new Tab(), funcs[i].title],
          bold: true,
        })
      );
      cf.addChildElement(
        new TextRun({
          text: "",
          break: 1,
        })
      );
    }
    return cf;
  }
  static getLangues(langs) {
    const cf = new Paragraph({
      children: [],
      /*bullet: {
        level: 0, // How deep you want the bullet to be. Maximum level is 9
      },*/
    });
    for (var i = 0; i < langs.length; i++) {
      cf.addChildElement(
        new TextRun({
          text: langs[i],
          break: 1,
         //bullet: {level: 0},
        })
      )
    }
    return cf;
  }
  /*  new Paragraph({
           /* tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
            ],
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
        }),
        );
    }*/

  static getBufferLogo1stPage() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: "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",
          transformation: {
            width: 180,
            height: 80,
            /*position: absolute,
            top: 0,
            right: 0,*/
          },
          floating: {
            horizontalPosition: {
              align: HorizontalPositionAlign.RIGHT,
            },
            verticalPosition: {
              align: VerticalPositionAlign.TOP,
            },
          },
        }),
      ],
    });
  }
  static getBufferLogo() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: "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",
          transformation: {
            width: 125,
            height: 100,
            /*position: absolute,
            top: 0,
            right: 0,*/
          },
          floating: {
            horizontalPosition: {
              align: HorizontalPositionAlign.LEFT,
            },
            verticalPosition: {
              align: VerticalPositionAlign.TOP,
            },
          },
        }),
      ],
    });
  }
  static getBufferComp() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: "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",
          transformation: {
            width: 30,
            height: 30,
          },
        }),
      ],
    });
  }
  static getBufferCert() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: "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",
          transformation: {
            width: 20,
            height: 2,
          },
        }),
      ],
    });
  }
  static getBufferBref() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: "iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAAHd1ZP4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABymSURBVHhe7V0JmFxVlW4kCSoKkvSWpLtevaVAg0QgCAGRkK27lh5UNhFxY1BAZFPU4XMwAyOj6OCoKBhARTFgQuh0VYVFhiTKYthJ0p3IlnR3YkQYTdJLgoLanv++c16/vV51d0Lkm//7bve95y7v3HO3c9eqCYNh5YpmJreLndG4f/XGIbbWmGbhT2ytsQ5uc+gOunoHg0QXPJEWLXskUeBUaq6hCEjd/1lxB9hJm7k72RrOK8PxSxvZv+hW/rOwk2T+CgP75K0rv91YLjsJIAIl/ml22tCt3G/YWuMP7Pk68mBmCi/Brhv5AUVkNGitabYSB1m7bCS2J5VKcAcWFiomYBiFd3f2DP4Bdk3Pno//iaoI8bozncl3sTMchpXdtubFv+/PznhUlVmAxPpM4+2Lh+qXLfstk6Jx9LEfc1JvXHzHUEOp9DA7w8GF9nd21lCEV/G/vlj8Kf77xe3UVKlPFPAO5UuYbMxLUXU5RWqBE6GpqcVSIRioR3V3321SwFeYpKAiuD/pRzqdbTHM/NJAGHyFrQFQIXbif2QktAd4ugMYRv6TbPUijD3qPZ5ha2UggSOOOmOIsA+TPNC0uUeEfSQWiBAngzjEfkw3c/2SMIqtoaNjo/IIYl/+H4nAh9xcU4X6V/ynGqi6joZy2el3KsGdsOcj0SKZNqGuWFRdPn1wXX2pdKa7JgumpFsPYSuqkeo1Ad3I/o4IhVfkA1EcTCqVPshWB+5eNG3mF7E1mIaeyT1Z6QMAcb+crQoHtLeb+I9wUfEc+70PPje0tnewD3bDzP2vIhLcvUIYUnpLG1sDDAWAXHRt3ZWC3R8Ybqpln2NnTcrIzvWHMaz8WrYqmJbdpD1AJHeBh3GVNltPZ6uCPwyVx4VsjYb/Q0kQxkxi0ADejwT8hr3HAtMmUIH3UE/4t3Sm8DKVxwXsMTIcNKWlGRx29gxEcgn/tJHrZ2cyIFKY7KPEQbnpO8iYdyA7o5Dd76prbgO3P2ZCVTAzeTXgheLWOx8e6uwduIqdI4JmFR5n6zDedeiHlChqly37prtPcYNG3olsjcGM8Wyx4ZcxEo/6QBSoBn2Trd6y+fWTm4fW9vQ9Dbt4VPsBzWw9lq0KDQ3z62kQzncL17o+3J8A/g/4a4ueyX+FrQpuf2XHH0k84Elwf4CGyAfx3w13HHdnR8rMj2qmHXayk7hhZM9QPgqzxrHFM2gAfnckfvVE71DnpoFBdoaiUmI0EDljcdrKtrCVEn+819MRof8grt8Mu55p+w7+yzg7ZetKz0ckHvc5L8Cum4XLnfROOvkLjlh0PTtdEX0gLcEZlAHJCalvJyMhkvVflIcf8AwrUPdEEKDCfBGJukWkW4V7SM+9l50eUPnl1dgpiVOCv1c+BMred9nqIGW0zWWrgoy7zc3zjsJ/N3OOHYl3bnllNuyGVXhREQnuwAA1DM+0BP7o59npAVXFnysLAgn3fs3dNFtm+z+CAjQy+V+yU8Edxi/SmuL9negRl8CetvIrFDEh/B+n3F/CVhtps3CbcG8ju59flwnkwMz9lnJwHzsV/GEcUGI7/MNaXd2sRkTwG6xFcBAHoLM1HKSjnPTVq386tK67/0NMSoJ9MY1he2WAi298d6mHkxDO3lSR2zjoesvRSMBvqNC+xkF2H+gjz/o/nDby506ZMvdgTcs3NjUVpqZS8+foVvYedxhU55SeL3AyewLTJsjHn3p+G0bHP7NHKBAusl9zIZ3Jb1YZsgrrmDR2QMKHzzhjCE1tTfeAZ7VnrJFOt7xHZVrP/QeTqgc10bchkUXLViumuzYPfIG99hjQD9E0cjs7kwFMn3/xtxXTa3t3qMGkrlz+EplTVYCEQDow7BwxkAbmaOyMwvT9EVBJmowsdtR1dFwlQyn+xywnjAqaXnjZtMK1ct3K/8JWVEJQX39Mg5txJiugg6XxqouY7nNnor5YfEIFGGOAj0mTjns7Ox2k0/OPCS3JKMZBP/DAWe9gp0JDqbTDUxKl0kPKwwdSaI43YiZQpAh9j60BkL7zatrMXsZOB5hle0oADHZ2DyjG13UPOGMm6Eq596E53XoS/KBbujNB7kdVAEYq9S+6W4sOA7pJ0j9Du1w0WL/gAHy7Sc8dRmKc76nn7A/986KwuS1Jc4H/Y/Wl0nZ3JsSQbruUSuUFZS+VwusrgTSeVvDATg/C6TPGKzoVQe9//2CZYnztpj7nA9UlZkMyEIV60qMpE44q7AbSpdmbZ2EGiOUDRfPAU1sU8yqBTPY5x5MBO5YzYEfjVUQChd0l4UjKD9aXy79SHgxMVRq2rPDM4iSDVHd/7P6GYRTOkLRBFz/8p9K+Wuwyh1L+xPxLNy1auUckP3H58mOiwmhW/jpSfj1tBsD3pk49IcNOB4qPlJ79KCyBOm/mHiBlqoOdDuKYB8CcTBIF1KXOBJ2qTci8YtoEdkLJ66F25tGFor7n0N3Md/b0v08RCRUjjgLoCmneqEZspKdpuZzY8R8wrOxOGpzUxosbqocyc19XDs2Yn3NnQBEZUYyirRhGbhM7Q4G42MliZwDwh6Hq8k2x19TMfAv8sP/h6c+HEZxAUIMZxP5HVAYaG4+vY6cHeqbQB/8GIzgeRAFdbYABF+BH/NzMTg8i42FD8N3TTwnNANZz4j4INDXNmUrS2o5wYcYwWsO3nhi6nl+GcOz0YeZbov0YNAOahECSgd9s/rsqRgFl8DL4U1F794JDgHBpq1BR/0G4OMaoem5177BUhGEWBt2ZYLIHup79rHxY0+0NyySQtNFumBSKhobWdFymKoJU1MeQAKZ9yETUnqAflLGzdDN/g5HJfzGVapnB5ESgNrFlVEyHAa0fibb/co1dGhUyoqRLmWdnLLDZhvA08n6MSbsPaBsodnwQ5ssLbh56+tkdn2HvSNBQP5d6kg0Sz73+/bqCJs3nUENegx4HIyV0FcrgDupOt2Ah07Kyod3t6wJNm/cuqUpi5sw7v1vTWmZjvQbrNtiT1Yzcee4wMIbVGrquudth0rAtTNz38PNDnZsHr2WvpNgHJSJphE04xhy6kV+Njx13wqdUg12zeTDLXgFYVv4shCXrm2xKFKbvL22nqclWDcYU2MhD4u858sOK6a5Nfb9jr0joemEeM58Izca8oxCexgDvqvVoQGrq95Hoikc22YzzXvjuAo0NA9VkOhI0JG9DQopp9Ot7CIaVv9bOwLCuXxWoF1FTvD3NuEAzsh+yM+DbXK0EGhXVsvXrxbiAxo35dgYSIp3OfRoRsDfiZpxm/Z6NlUowjHwJ6Yy2G9St1hsTZwABn35hu2KcJuTq0A/mn8S8szaTFOl0XmPrqEBd6Suk+/wfO8OB/vYzn/uWYtwtdTV5LpXOnNTR8cVqM1AN4iRs+0U0YJKSWsT0Mw6QeqtWiWvb20+vLRav2F0Z0K3saVEZ0MzcByMzB4/iik6b+U0DriXsGW+VSGC6rlg8eVKxeCVnIJFuXw1I9eiFvsROD8AHNj3YaQMHceERJnXQqVROUI6FC8eD6YnF4sy6UslZsx9rqG+GTDOxuIqqzU4bCPydhWXFuHvVDKcGAnNHzsBB7e3H1pZKX43LgBw9jIKzM+7DQQfZ6gg7PQjQQRCpr31uZxOTgwEFUgIdHcfUlctfDssAdt0Rf/LkWbVMCgD+cUscNCe4mJ0OqErtdI7caVp2ppt5RVSY9eZAETEQXp920qkqA+3tR1MJXBqaAaOQZ2skkFZDw/TA8WqsA8GPnR44dKgBX7zixgDzVGVeo4HmXHY6oGnbLU7kVavGqQxQG6jt6LjYnQFqE7fjnM/Ecjl2j54yeElFJn1w6LAI42t7d/5MEQnxEV27HZwBbgMXwQ5T39GxjQa2hY67VLqeYwRgpxnsw3GnIHD2ghDKfOfmne9VREIY883Ns80wes2SJW8Dg2gDNaXSW5nqgcpAuRw62cZqdFgVpR7n42HdJnig+cL3PMyzn0IYk5hcU7X5ITs9ICnfQ1UndjsfGWBrAKFCoXEkjJ4ysz80rcKzocxj7SQsEmj+Mz6COMYEXH0C7QiIYD6UThP72eqckDBf+MClajIMT90qfEvsssYCuz8huKlh/wR2P/ONW1eu8J9AQxtoKJfVtifimpm8cx1B0m5oOFb1Mo3avHe56abV9pzYU6nWyehQlCeYv/b6Dof5tJW7QuxunUL+C+DGBQrY/cxP3rriWj/z1KBXk1GqNdXlv5L0nLNlrrQ9VUXsuLwh9qZMYaraQQHBX22amua/252AALRayjU7PQDzteWy6xRjECqDCxaEaoZh3wPC6FDgqIG/5GFe9HcgLBIN57+n0W0BOz146/LljX7pu0EZu8Hvj60dfEcMdszZS6HZyKkVBXY6IB4ewxF/D/Mbend9nv1DmcdKWBhdQI3xFjDYUCw6x/MBOcfITgV7OXD49CCOyvnThopBA6VnEw5AOFLTT1WW2zsesTPQ3ecoYVFMxjEPvGP5cg2Mug2YZ28H7nSIQXV1g2ZLG937XAiD3RZ2OnDi6mb+O8fPPseRviIS7FwXAodm01bhYZKY59LSSCAM0LjxjWF74XLDzG2FHXBn0A0PHQ4/80Bc5CQT66k0O2NrAEhj6tSso8ECoDU3HzcFdsrEGhoUA7fV0unsLPRU7LQjrevuV8yv7+2/jsmKTsW4mp0uNFXc3MIWZlwY2fvCYIOLlLCnjYK69AZExQU9lZrv7BVjSe9nh8s6ZELpa0arOpUcmJa54D+y6wbiYhsU93Tsej58OAjVMmqPN5QfEIX5R7sHG5mMun9fmNIETGqeNwXxaN6pDlskQVMmf4IdJx96wKi5ORuu/BGoumynbwUPzBlmoft9vHQdJn1SGVayMwAUPcKgqrgvpg5j2gRq/LciDEzcUjb8Dzzw+IPY6QH82BoEPNds3KGYd6vHAPwoA5HHqgBZIA0zalCpABXO9N56EKAqxaaBiEggTPoA/KhP9pypGSsgbWq4oRMWzWzJwp+d0UD9njP/fM5Av9P6BUjE01VFADvfST5II+3XVJohp5wE8J848egD2BkPBL6twz7Jura7PzA865n8eoQhBSmyHeAuXDzzllIHOEzk9U74U3X8L3YmglJLVz7arTKwrrsv7CiuCgMT2gNEgKrmNRKPukN1xiYKqAVq0jES4APX3XyXnYGeAc91IzfQkIShSkZNIkjqHDUSCEvM72DnyIBEjjnu4yoDnT0DiS7bplK595HOcjlNJ6+Pq8vhsLVL6lofYcLogAaKBNduslUIJo850mbh6/iOZuYjt0hHBGqcZyPhmcd/QmVgQ++Ao/uHgWb3jyM8O2Ohaa3HImySXmxUIH3kBXzo0OmnDK2jkoi6tSJb9uwMBRaUEAZmqjEvcPxwtwHzAPnwnNbzhxbe/uunliwZqnCjfdY4nMqTeGYm+7cDtT2wdR8HkqBaKklicDI2lWo9kqO+MZAyCzMwGKUNewd8LA0m+qQ0Ltb1wvvpU2O+m/NPAbXYlcnfECag2fPOHfq3BTcP3Xnv0+vX9+68uKtraGS79y5oWvaItJW/Whb+/EazCjc107SEg79x0GS2WNS5KjVOzPtnnzN04633444EDXuDf+rqHjiTgycGNvbNTP4rcRPNCtiH+r0PY7HFzRv1f517tNMeS1DT/gINlc7Bs9a2C0k95cM6SsPrX7BgaKjC8adokLZ2n1tYWIZgr1EhnW49BFeSJF3kQdfzl7L33gnSyz/lFvaV1yxy1oGU2bzzgpqaZCdhkwAHMjQrO7PqsziJMWucez6OvJGG/AH2fP2BLSph7qRTLvMKu7v/caraI67Zew9mjaOxYJ3k0zBax2aaMRK4tY/b5MKpYwau4WBvOOCQveSbxpjRTVCrAemy6nIIzApXv63MpsEvc7A3PBob8xqWNSAH6madzYQxB3Up6qAEzELSSNwC7+wZ+DUH20OYMR4LvuCF5tQfZeLrgpSePVXkopu5wHMfI4b7iYnjTjjbK/DuvteeeGKbc0e3tlTa5ds/S/yWWjVImwV15BOGBr3tIz6tO4ag2t8DfnBAJW6fJRFoonOVZPCOu570CL2rp+92DqZQ39HxIIRNwlfvRdaWy+rgIkx9uRx4EmhvB+4VUQ3+STWF2pTOznIqhJkPXPxOhHQm/zwSOPSwk4eeft4+kytm/cZtmHoHQDV8owi7rlg8DTT6/yWhNVR6CHMvQkrPtYkQsZfK5IqwLLx0k1N3UarefZFLVsfyWqTbbNj454M5mAc0NVdn3GEmL7qtX4SNc8fwry0WL3HRgi+Y7aVw7yHQ3CGxHo9n4FQcmpAxKR7yrt/hM4b3kR2h/64vdIZI02x18AgqpjOhWbBgHG5Qi7Bx4A9k96E/6Zb2fqj3ml5BHk3X21mVIDdVjEqbRUYm/3MEPGLGRzwCh3lmy0DYM2P7yD1iHChkmherVo2TqwKqAEoluwBcLQBdlAq7l0PPtK1SFcx+piLRxBBnZZTwjcIPmOQFXo1DABjP7BOmZ/CrHMwDCW8YWefoayQWLhxPBeB0QerEKGFSqXSZ0CYlLABNt7dlYKhW7SRS1bNjiY+xjEmJoBnZ6yQukypBveUBM0XPBbtpWWdZ9Zi91ypmXfdg6MUSuWUfWZIhwANT5iFtQ41L25WgVQG0tx8NP+p2viK0hmLxWRUhAum0/ZAJjG7k/sjkqkGtdLGkU82mHWk7/4M4GESZFIsUXy2keN7HuHQ9txAeJ8471yN0W/D97+RgDvRMTjU504IOnQj7IjyMs85hd0EDTgEUizNBrlu2TF0/gSE19Cki7daNi4kTsweQANXOLFUi9c5nEsgMPqnGg1OcCE/j4L8zabjZLb37KY/QOzf1B0q0qWnuYRKeSRVgP5sDgz1wJg4DXVC57BSADMJyfQaG/FfTPOFucUcZKsinau+8M/R8bSU4g2fC6/WA5EtOOcdBDrHBMCH/SSG4ha4E3zMYuLNPteIRhDXN3G1MioWkTWrVXUwKhz0GvCpClBZAAleXT1A41AVFXvWpbW/PUfw/SHxqLeooeTUQ4VMFSXT9n5SROxCeav0DTIqFyEIzW2arg5ZwnHX2lQHBu0/0CSQyrlswKRKkRl2NsIG+LQYHLF48kWr7X5SwOzpeQ4GwV2JQYf1MCuAtixcHju5GAQ8dS/7QBTE5EpqWP1zCMykWNJCrYw40sVpNk6XcH+HwdzNre4MvN+Kt4mo+JGFpEKvqeT8RWm1Hx9lMqhpoMZJO1PH8MJhWq1pzMaz895kUC8mj/xRxGGRJmcaHLdimU0ft5eEvMZ/49Ndfg17PcRTSpv2KDQyTBPsYVuEmmq39yH1bajhs8LgnHsAzMoWl/mNuuAYGYdUvWxb5cBIweeuqS2DYGQpM0FQB+u5L45v4thZytgSX98AzdTueA/KG0XY80cqex5oJkkfdKqgfQRFAdv6Xp+RSllKBRY3E690i9OlHnq4SU4Fcx+jQ9wmdSQpC8/mpQ2HQGNjtgTs8+lYmq1fbIKy4lc3Jm+9/GbdmYGBncgDU5VyvCrFUcn7Fg/hRzweIYbIDEqCzzMukmmbLPsgsBuMiew0L3sw7mz/Si8C4X5vACQvQlEwogtpJuufBZxzBwzz6zMuvTp7c5rkSp+stZ0qCTHKAQ8z+g8z2R8JPegP28ql3z5S6iJMhLBgmheJtW1fVHrD53tjH5yUdUlF9K4Uzxkct3VLluoD59j/uuU/YM5UiDyowtSgogOyoRamXygWNqew0FZZkjsF1ExxXfO0Wj+CV6RoKMCcfYmcsJGxKb53HpEQg7eVpVVPL5ep+NcGFunK5F2lQywncqXFD17OXogai5aOSwIBn6ooqz8apMKqRhxyPhsyxqbBIIvsFv7ZnIPDurMOYkTuPSZGgklUHl0ayNUbdg+omYGqLxXYmVwSFVVfGYOqKxV8w2QNdby1InnEIWLdyt09Jz1bX2NA3oyDEHw/UqEghIK1NHaBEoTEpFpImqeS3knPWm4XgX6Pp7B28344yDFKFLkJYmoEFDtCHQdKm8BcxqSqQ8G4UQYrBr2JRq/ghDGk+nX5/ikODfDg0o02dSFXCitkpmjLlverKEExKz53DZA+QhspbgifzampOc2bvTEATsJeCL/7S9z2Ch+EgHqCWIDz1h//JpBgMF2yCl5vjsWTJBNJ6LiOzsrZcxlvIa0jIq6hLugJ+HCoWosXhugaTcHB1ifBIFcsZOElLuxA0ErD6+TY3SDO6CX6QBZNigVPrKn0zP3zmX94hgQnU+u7QjexxEr7ZbD2UaZGQ0RyGGA69dbqnIMdScHuKSQo0E/9gs56bz04FeQPRPzOVx6dhmFQREh43YZlkgz6iFnGOOuajHsHDPPn8jsC1dGpeHx/+ePy7zgz8LMIfEB4ZYtqIQCquui0IY1q5xP2/QNQ9Gq9eCQiCQGOSetgVhiY76vdQBJMOOentjl/Ck2WiOVK64Q+/SoLypIrbcBAP0vzoNgbcdHp2ojeO3LNf3BRgclXArFLSILtzTTQpcB9b4kcZe53ee/MGjxGKPx5BYXIsqHBUdwXDpCAaG2drEujBNVu9wu8Z3MDBPJBfBYShEg082RKFZsq8aEgYpGiWdxZ77TZgl2xYKysMTp48I/TpjjBggiT5lOcQKkHT5qu1HHyz4pKC+xxNeeV6j/DXdg9E7Nacti9+0tT+SILfDXXDyu5Hg5taHxFD0/KHaZKTWChRQM2mtF90p53Ss56JThLIgMyDbKLdLtNsOU6+mficDU0q3iuR7rjbd56mty9y4T9tFD4h8UjjqXpZFmhqyjnr/W6DzGNswGqqaeXvgiH7oxibQMcKqNRmTzwrt8o/g0wKivsbSUfTWk9kckXQXOAjEs/58eDk0NSDTYh84WXf9Qk//vFhI5O7Vz5MLeFGJo8KdVq+kbqy82jCtxzv3NnCzg9Ql7EBqpqmDauHowUKVPivdgxJW213IR66T/8YURVI+OqRV1yVW7upzyP8dd1/DmwLuuHe0zQz2e2juL3hAWow6dg/hhmr43v4xQ50k8IvtaBvsFdCZPeTLonijngf2AMseQpDn7/8Bo/wu7oHK/5CEl6kk2MgMHgCYTT3jiitlyUt2JlcNXQ9dzDFd04/m5m2bWE/mVIJeORO0tAylZ9lqxqygwLzi9JjngJY37vzSg4WC+y4+38MlWaLJU3LV9y3HC2gysrWpRgcUKJuKrblRgG/MSbp6Jk8NuZ3H7D06xbcT+94yFMAXd0DH+GgiYAXpKjPDvwqra1iFu6hZntBysTd0sr9JX7iCJoMDoyaVuEhf5p2uqRB+ZZwq4VGEyzwh/TQYvbwaeUZ46FRSIbO41/0EtPZM3ADB6wa2Hig/vJzmKpLBqsxNJ781cgUyqRdfLK+fk4DJztqUGu5Wb6B86X+vYQ9DqphzuTindM+4PxaAZvtG3oGR3TkYm8AuicZNGGwgc9eew+wQ0NNT/3+BAwecr/7gd86hdDZ21/x5ZqkoAFtKQw7xxSYx1BLc37CBWssSU4d7CWYNkGz8uopieGCOH3o3oeetQthU9+uzo3eJ4mSQndpNbAzecQgQU93CxoGj7C97l3J2GD6/jQmqMeo3ObIo8+0f0iiB7e8dwwfb9tNwBV7bOC7ecBEkcxLY7FM8U8BmuW1YJ2m0gB6Yst5z5Im8SlcdcHLqZgD6PqcBhjY8fMkqVRujqZnP2tYw7PmMEP99Wu60bqxKT3ffnX7/xGEZmTPwOTENNsexXsINI/YjMP+VFC7yGCDGmYXajD97yX/LujpupW7Bb/CwMnshaip+Qe5dLFW5/vFjgAAAABJRU5ErkJggg==",
          transformation: {
            width: 30,
            height: 30,
          },
        }),
      ],
    });
  }
  static getBufferExp() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: "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",
          transformation: {
            width: 30,
            height: 30,
          },
        }),
      ],
    });
  }

  static getHL() {
    return new Paragraph({
      children: [
        new ImageRun({
          type: "png",
          data: "iVBORw0KGgoAAAANSUhEUgAABAAAAAAFCAYAAADbn54jAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxEAAAsRAX9kX5EAAAAGYktHRAD+AP4A/usY1IIAAAAJdnBBZwAABAAAAAJAABJgAnEAAAAldEVYdGNyZWF0ZS1kYXRlADIwMTEtMDEtMDNUMTY6MDE6NTYrMDA6MDAJWHqrAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDExLTAxLTAzVDE2OjAxOjU2KzAwOjAwVukMnwAAAD9JREFUeF7t2DEBADAIxEBaS/jXRpeqeO6WeMjpnikAAAAg2v0FAAAAghkAAAAAsIABAAAAAAsYAAAAABCv6gEvzwJuN2SghwAAAABJRU5ErkJggg==",
          transformation: {
            width: 600,
            height: 2,
          },
        }),
      ],
    });
  }

  static getHyperLink(txt, urllink) {
    return new Paragraph({
      children: [
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: txt,
              style: "Hyperlink",
            }),
          ],
          link: urllink,
        }),
      ],
    });
  }

  static getBulletPoint(txt, lvl) {
    return new Paragraph({
      text: txt,
      bullet: {
        level: lvl, // How deep you want the bullet to be. Maximum level is 9
      },
    });
  }

  static getPageNumber() {
    return new Paragraph({
      children: [
        new TextRun({
          children: [
            "Page ",
            PageNumber.CURRENT,
            " of ",
            PageNumber.TOTAL_PAGES,
          ],
        }),
      ],
      alignment: AlignmentType.RIGHT,
      /*floating: {
        horizontalPosition: {
          align: HorizontalPositionAlign.RIGHT,
        },
        verticalPosition: {
          align: VerticalPositionAlign.BOTTOM,
        },
      },*/
    });
  }
}

export default DocData;
