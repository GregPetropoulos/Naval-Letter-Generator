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
import dodSeal from '../assets/images/dod-header-seal.png'

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
  const blob_signature =  fetch(
    "../assets/images/dod-header-seal.png"        // => my server
).then(r => r.blob());
 const base64=`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`


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
              // new Paragraph({
              //   // spacing: {
              //   //   before: 200
              //   // },
              //   children:[
                
              //     new ImageRun({data: Buffer.from(base64,'base64'
              //   ),
              //   transformation: {
              //     width: 200,
              //     height: 100
              //   }
              //     })
              //   ]
              // }),
                // text: 'SEAL HERE',
                // heading: HeadingLevel.HEADING_3,
                // alignment: AlignmentType.LEFT
                // break: 1
              // }),
              new Paragraph({
                // spacing: {
                //   before: 250
                // },
                text: 'DEPT OF THE NAVY',
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.CENTER
                // break: 1
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'NAVY PERSONNEL COMMAND' ,bold:true,  font: "Times New Roman",
                  size: 20, }),
                  // line1UnitName
                  new TextRun({ text: '5720 INTEGRITY DRIVE' ,bold:true,  font: "Times New Roman",
                  size: 16, }),

                  // line2Address,

                  new TextRun({ text: '5720 INTEGRITY DRIVE', break: 1, font: "Times New Roman",
                  size: 16,
                  alignment: AlignmentType.CENTER, }),
                  // line3Address,

                  new TextRun({ text: 'MILLINGTON TN 38055-0130', break: 1, font: "Times New Roman",
                  size: 16,
                  alignment: AlignmentType.CENTER, })
                ],
                alignment: AlignmentType.CENTER
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
              })
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
