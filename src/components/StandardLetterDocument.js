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
  const generateImgUrl = async () => {
    return await fetch(
      'https://github.com/GregPetropoulos/Naval-Letter-Generator/blob/main/src/assets/images/dod-header-seal.png?raw=true' // => my server
    ).then((r) => r.blob());
  };

  const imageUrl = "https://github.com/GregPetropoulos/Naval-Letter-Generator/blob/main/src/assets/images/dod-header-seal.png?raw=true";

  const imgUrl='https://raw.githubusercontent.com/GregPetropoulos/Naval-Letter-Generator/blob/main/src/assets/images/dod-header-seal.png'
  

  const genImageUrl= async () => {
    const response = await fetch(imgUrl)
    const imageBlob = await response.blob()
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log(base64data);
    }
  }

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
              //   alignment: AlignmentType.LEFT,

              //   // spacing: {
              //   //   before: 200
              //   // },
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
              // text: 'SEAL HERE',
              // heading: HeadingLevel.HEADING_3,
              // alignment: AlignmentType.LEFT
              // break: 1
              // }),
              // new Paragraph({
              //   // spacing: {
              //   //   before: 250
              //   // },
              //   text: 'DEPT OF THE NAVY',
              //   heading: HeadingLevel.HEADING_3,
              //   alignment: AlignmentType.CENTER
              //   // break: 1
              // }),
              new Paragraph({
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
                ],
                heading: HeadingLevel.HEADING_3,

                alignment: AlignmentType.CENTER
              }),

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
          // * 2nd HEADER SENDER SYMBOLS

          // *FROM AND TO
          new Paragraph({
            spacing: {
              before: 200
            },
            children: [
              // new TextRun({ text: `FROM: ${fromBilletUnitName}`, break: 1 }),
              new TextRun({ text: `FROM: Greg Petropoulos`, break: 1 }),


              // new TextRun({ text: `TO: ${toBilletUnitName}`, break: 1 })
              new TextRun({ text: `TO: Jody Smuckatelli`, break: 1 })
            ]
          }),


          // *VIA ARRAY
          // *REFERENCES ARRAY
          // *ENCLOSURES ARRAY


          // *SUBJECT
          new Paragraph({
            spacing: {
              before: 200
            },
            // text: `${subject}`
            text: `PROMOTION`
          }),

          //*PARAGRAPH BODY ARRAYS AND NEST ARRAY WILL NEED TO DOUBLE LOOP
          // new Paragraph({text:`${paragraphs.paragraph}`})
          new Paragraph({
            spacing: {
              before: 200
            },
            text: '(1) pargraphs lorem lorem lorem'
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
                text: "CPL",

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
