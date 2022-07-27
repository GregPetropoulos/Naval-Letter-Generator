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
  SectionType
} from 'docx';

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
    toBilletUnitName
    // via: [{ id, title }]
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

  return {
    // Need DOD seals here
    sections: [
      {
        properties: {},
        margins: {
          top: '1in',
          bottom: '1in',
          right: '1in',
          left: '1in'
        },
        // *1ST HEADER DOD SEALS
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                text: 'DEPT OF THE NAVY',
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.CENTER,
                break: 1
              }),
              new Paragraph({
               children:[
                 new TextRun({text:'NAVY PERSONNEL COMMAND',break:1}),
                 new TextRun({text:'5720 INTEGRITY DRIVE', break:1}),
                 new TextRun({text:'MILLINGTON TN 38055-0130', break:1}),
               ],
              }),
              new Paragraph({
                text: 'SEAL HERE',
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.LEFT,
                break: 1
              }),
              new Paragraph({
                text: `${ssic}`,
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.RIGHT,
                break: 2
              }),
              new Paragraph({
                text: `${originatorCode}`,
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.RIGHT,
                break: 1
              }),
              new Paragraph({
                text: `${date}`,
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.RIGHT,
                break: 1
              }),
            ]
          })
        },

        children: [
          // * 2nd HEADER SENDER SYMBOLS
          // TODO SPACING GOOD

          // *ADDRESS LINE 1,2,3,
          // TODO SPACING GOOD
          new Paragraph({
            spacing: {
              before: 200
            },
            children: [
              new TextRun({
                text: `${line1UnitName}`,
                font: {
                  name: 'Times New Roman'
                },
                break: 1
              }),
              new TextRun({
                text: `${line2Address}`,
                font: {
                  name: 'Times New Roman'
                },
                break: 1
              }),
              new TextRun({
                text: `${line3Address}`,
                font: {
                  name: 'Times New Roman'
                },
                break: 1
              })
            ]
          }),

          // *FROM AND TO

          new Paragraph({
            spacing: {
              before: 200
            },
            children: [
              new TextRun({ text: `${fromBilletUnitName}`, break: 1 }),

              new TextRun({ text: `${toBilletUnitName}`, break: 1 })
            ]
          }),

          // *SUBJECT
          new Paragraph({
            spacing: {
              before: 200
            },
            text: `${subject}`
          }),

          //*PARAGRAPH BODY ARRAYS AND NEST ARRAY WILL NEED TO DOUBLE LOOP
          // new Paragraph({text:`${paragraphs.paragraph}`})
          new Paragraph({
            spacing: {
              before: 200
            },
            text: 'pargraphs lorem lorem lorem'
          })

          // *VIA ARRAY
          // *REFERENCES ARRAY
          // *ENCLOSURES ARRAY
          // *COPYTO ARRAY
        ],


        // *TITLE
        // *SIGNATURE
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                text: `${signature}`,
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.CENTER,
                break: 1
              }),
              new Paragraph({
                text: `${sigTitle}`,
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
