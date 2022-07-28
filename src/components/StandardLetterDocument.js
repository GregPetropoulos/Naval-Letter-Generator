import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  Header,
  Footer,
  SectionType,
  ImageRun
} from 'docx';
import dodSeal from '../assets/images/dod-header-seal.png';

// Pass props from the form and use template literals for strings
const StandardLetterDocument = (data) => {
  // Destructure
  const {
    copyTo,
    date,
    enclosures,
    filename,
    fromBilletUnitName,
    line1UnitName,
    line2Address,
    line3Address,
    originatorCode,
    paragraphs,
    references,
    sigTitle,
    signature,
    ssic,
    subject,
    toBilletUnitName,
    // via: [{ id, title }]
    via
  } = data;

  const senderSymbols = () => {
    console.log('headingformatter');

    return new Paragraph({
      children: [
        new TextRun({
          text: `${ssic}`,
          break: 1
        }),
        new TextRun({
          text: `${originatorCode}`,
          break: 1
        }),
        new TextRun({
          text: `${date}`,
          break: 1
        })
      ],
      alignment: AlignmentType.RIGHT
      //   indent: {
      //     start: "5.19in",
      // },
    });
  };

  //
  const imgUrl =
    'https://raw.githubusercontent.com/GregPetropoulos/Naval-Letter-Generator/blob/main/src/assets/images/dod-header-seal.png';

  const genImageUrl = async () => {
    const response = await fetch(dodSeal);
    const imageBlob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log(base64data);
    };
  };

  return {
    sections: [
      {
        properties: {},
        margins: {
          top: '1in',
          bottom: '1in',
          right: '1in',
          left: '1in'
        },

        // *1ST HEADER DOD SEALS, Address and SSIC,ORIGINATORSCODE, AND DATE
        headers: {
          default: new Header({
            children: [
              //  !THE IMAGE FOR THE SEAL NEEDS WORK
              // new Paragraph({
              //   alignment: AlignmentType.LEFT,

              //   children: [
              //     new ImageRun({
              //       data: genImageUrl(),
              //       transformation: {
              //         width: 50,
              //         height: 50
              //       }
              //     })
              //   ]
              // }),

              new Paragraph({
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'UNITED STATES MARINE CORPS',
                    bold: true,
                    font: 'Times New Roman'
                    // size: 20
                  }),

                  // line1UnitName
                  new TextRun({
                    text: '3d Bn 8th Mar 2d MarDiv',
                    font: 'Times New Roman',
                    // size: 16,
                    break: 1
                  }),

                  // line2Address,
                  new TextRun({
                    text: 'PSC BOX 20104',
                    break: 1,
                    font: 'Times New Roman'
                    // size: 16
                  }),

                  // line3Address,
                  new TextRun({
                    text: 'Camp Lejeune, NC 28542',
                    break: 1,
                    font: 'Times New Roman'
                    // size: 16
                  })
                ]
              }),

              // * 2nd HEADER SENDER SYMBOLS
              new Paragraph({
                // text: `${ssic}`,
                text: '12345',
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.RIGHT,
                break: 2
              }),
              new Paragraph({
                // text: `${originatorCode}`,
                text: 'Ser 310/403',
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.RIGHT,
                break: 1
              }),
              new Paragraph({
                // text: `${date}`,
                text: '10 Nov 75',
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.RIGHT,
                break: 1
              })
            ]
          })
        },

        children: [
          // *FROM AND TO
          new Paragraph({
            // spacing: {
            //   after: 200
            // },
            children: [
              // new TextRun({ text: `FROM: ${fromBilletUnitName}`, break: 1 }),
              new TextRun({ text: `From:  Greg Petropoulos`, break: 1 }),

              // new TextRun({ text: `TO: ${toBilletUnitName}`, break: 1 })
              new TextRun({ text: `To:      Jody Smuckatelli`, break: 1 })

              // Spacer
              // new TextRun({ text: '', break: 2 })
            ]
          }),

          // *VIA ARRAY,SPACED TEMPLITERALS FOR FORMATTING
          new Paragraph({
            children: via.map((viaItem) =>
              viaItem.id === 1
                ? new TextRun({
                    text: `Via:    (${viaItem.id}) ${viaItem.title}`
                  })
                : new TextRun({
                    text: `          (${viaItem.id}) ${viaItem.title}`,
                    break: 1
                  })
            )
          }),

          // *SUBJECT
          new Paragraph({
            // text: `${subject}`
            children: [
              // new TextRun({ text: '', break: 1 }),
              new TextRun({ text: `Subj:  PROMOTION`, break: 1 }),
              new TextRun({ text: '', break: 1 })
            ]
            // spacing: {
            //   before: 5000,
            //   after:5000
            // },
          }),

          // *REFERENCES ARRAY
          new Paragraph({
            // text: `${subject}`

            children: references.map((refItem) =>
              refItem.id === 1
                ? new TextRun({
                    text: `Ref:   (${refItem.id}) ${refItem.title}`
                  })
                : new TextRun({
                    text: `          (${refItem.id}) ${refItem.title}`,
                    break: 1
                  })
            )
          }),
          // *ENCLOSURES ARRAY
          new Paragraph({
            // text: `${subject}`

            children: enclosures.map((enclItem) =>
              enclItem.id === 1
                ? new TextRun({
                    text: `Encl:  (${enclItem.id}) ${enclItem.title}`,break: 1
                  })
                : new TextRun({
                    text: `          (${enclItem.id}) ${enclItem.title}`,
                    break: 1
                  })
            )
          }),


          //*PARAGRAPH BODY ARRAYS AND NEST ARRAY WILL NEED TO DOUBLE LOOP
          new Paragraph({
            children: paragraphs.map((paraItem) =>
          paraItem.paragraph.length>0
              ? new TextRun({
                  text: `(${paraItem.pId}) ${paraItem.paragraph}`,break: 1
                })
              :paraItem.paragraph.length>0&& paraItem.subParagraph.length>0&&paraItem.subParagraph.name===paragraphs.subParagraph.name? new TextRun({
                  text: `        (${(paraItem.subParagraph.name==='subA'&& 'a') ||(paraItem.subParagraph.name==='subB'&& 'b')||(paraItem.subParagraph.name==='subC'&& 'c')})  ${paraItem.text}`,
                  break: 1
                }):null
          )
            // spacing: {
            //   before: 200
            // },
            // text: '(1) pargraphs lorem lorem lorem'
          }),
          new Paragraph({
            spacing: {
              before: 200
            },
            text: '(a) Sub pargraphs lorem lorem lorem'
          })

          // *COPYTO ARRAY
        ],

        // *TITLE
        // *SIGNATURE
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                // text: `${signature}`,
                text: 'G.N. PETROPOULOS',

                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.CENTER,
                break: 1
              }),
              new Paragraph({
                // text: `${sigTitle}`,
                text: 'CPL',

                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.CENTER,
                break: 1
              })
            ]
          })
        }
      }
    ]
  };
};

export { StandardLetterDocument };
