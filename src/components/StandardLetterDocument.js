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
  Footer
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
      // font: {
      //   name: 'Times New Roman'
      // },
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({ text: `${ssic}`, break: 1 }),
        new TextRun({ text: `${originatorCode}`, break: 1 }),
        new TextRun({ text: `${date}`, break: 1 })
        // new Paragraph({
        //   text:`${ssic}`,
        //   heading: HeadingLevel.HEADING_3,
        //   alignment: AlignmentType.RIGHT
        // }),
        // new Paragraph({
        //   text:`${originatorCode}`,
        //   heading: HeadingLevel.HEADING_3,
        //   alignment: AlignmentType.RIGHT
        // }),
        // new Paragraph({
        //   text:`${date}`,
        //   heading: HeadingLevel.HEADING_3,
        //   alignment: AlignmentType.RIGHT
        // })
      ]
      //   indent: {
      //     start: "5.19in",
      // }
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
        // *SEALS HEADER
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                text: 'DOD STAMPS AND SEALS INFO HERE',
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.CENTER,
                break: 1
              })
            ]
          })
        },

        children: [
          // * SENDER SYMBOLS HEADER
          senderSymbols(),

          // *ADDRESS LINE 1,2,3,
          new Paragraph({
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
                break: 4
              })
            ]
          }),
          // *FROM

          // *TO

          // *SUBJECT
          new Paragraph({ text: `${subject}`, break: 1 }),

          //*PARAGRAPH BODY ARRAYS AND NEST ARRAY
          new Paragraph(
            new TextRun(`(${paragraphs.pId})`),
            new TextRun(`${paragraphs.paragraph}`)
          )
          // *VIA ARRAY 
          // *REFERENCES ARRAY 
          // *ENCLOSURES ARRAY 
          // *TITLE
          // *SIGNATURE
          // *COPYTO ARRAY
        ]
      }
    ]
  };
};

export { StandardLetterDocument };
