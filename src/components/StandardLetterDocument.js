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
  convertInchesToTwip,
  ImageRun,
  LevelFormat
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
    via
  } = data;

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

  //*------------------ALL CALLBACK ARGS GET PASSED TO SECTION MAKERS------------
  const topHeader = new Paragraph({
    heading: HeadingLevel.HEADING_3,
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'UNITED STATES MARINE CORPS',
        bold: true,
        font: 'Times New Roman'
      }),

      new TextRun({
        text: `${line1UnitName}`,
        font: 'Times New Roman',
        break: 1
      }),

      new TextRun({
        text: `${line2Address}`,
        break: 1,
        font: 'Times New Roman'
      }),

      new TextRun({
        text: `${line3Address}`,
        break: 1,
        font: 'Times New Roman'
      })
    ]
  });
  // * 2nd HEADER SENDER SYMBOLS
  const senderSymbols = new Paragraph({
    heading: HeadingLevel.HEADING_3,
    alignment: AlignmentType.RIGHT,
    children: [
      new TextRun({
        text: `${ssic}`,
        font: 'Times New Roman',
        break: 2
      }),

      new TextRun({
        text: `${originatorCode}`,
        font: 'Times New Roman',
        break: 1
      }),
      new TextRun({
        text: `${date}`,
        break: 1,
        font: 'Times New Roman'
      })
    ]
  });

  const footerParagraphs = new Paragraph({
    heading: HeadingLevel.HEADING_3,
    alignment: AlignmentType.CENTER,
    children: [
      // text: `${signature}`,
      new TextRun({
        text: `${signature}`,
        // bold: true,
        font: 'Times New Roman',
        break: 1
      }),

      new TextRun({
        text: `${sigTitle}`,
        font: 'Times New Roman',
        break: 1
      })
    ]
  });

  const fromToSection = new Paragraph({
    children: [
      new TextRun({ text: `FROM: ${fromBilletUnitName}`, break: 1 }),
      new TextRun({ text: `TO:      ${toBilletUnitName}`, break: 1 })
    ]
  });

  const viaSection = new Paragraph({
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
  });

  const subjectSection = new Paragraph({
    children: [
      // new TextRun({ text: '', break: 1 }),
      new TextRun({ text: `Subj:  ${subject}`, break: 1 }),
      new TextRun({ text: '', break: 1 })
    ]
    // spacing: {
    //   before: 5000,
    //   after:5000
    // },
  });

  const refSection = new Paragraph({
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
  });

  const enclosureSection = new Paragraph({
    children: enclosures.map((enclItem) =>
      enclItem.id === 1
        ? new TextRun({
            text: `Encl:  (${enclItem.id}) ${enclItem.title}`,
            break: 1
          })
        : new TextRun({
            text: `          (${enclItem.id}) ${enclItem.title}`,
            break: 1
          })
    )
  });


  const copyToSection = new Paragraph({
    children: copyTo.map((copyItem) =>
      copyItem.cId === 1
        ? new TextRun({
            text: `Copy to:  ${copyItem.copy}`,
            break: 1
          })
        : new TextRun({
            text: `Copy to:  ${copyItem.copy}`,
            break: 1
          })
    )
  });

  //*------------------------------------------------------------------------------

  // * SECTION MAKERS
  const headerSectionMaker = (topHeader, senderSymbols, footerParagraphs) => {
    const sectionObj = {
      properties: { type: SectionType.CONTINUOUS },
      margins: {
        top: '1in',
        bottom: '1in',
        right: '1in',
        left: '1in'
      },

      headers: {
        default: new Header({
          children: [topHeader, senderSymbols]
        })
      },
      footers: {
        default: new Footer({ children: [footerParagraphs] })
      },
      children: []
    };

    return sectionObj;
  };


  const sectionMaker = (paragraphSection) => {
    const sectionObj = {
      properties: { type: SectionType.CONTINUOUS },
      margins: {
        top: '1in',
        bottom: '1in',
        right: '1in',
        left: '1in'
      },
      children: [paragraphSection]
    };
    return sectionObj;
  };
  

  const paragraphsAndSubs = () => {
  
    const docParentParagraph = (paraItem) =>
      new Paragraph({
        text: paraItem.paragraph,
        numbering: {
          reference: 'my-number-numbering-reference',
          level: 0
        }
      });

    const docSubParagraph = (subItem) =>
      new Paragraph({
        text: subItem.text,
        numbering: {
          reference: 'my-sub-paragraph-reference',
          level: 1
        }
      });

    // !MAIN ISSUE WITH ITERATION OF NEW PARAGRAPHS WITH CHILDREN SUB PARAGRAPHS
    const paragraphsArr= paragraphs.map(paraItem=>
      paraItem.subParagraph.length>0? paraItem.subParagraph.map(subItem=> docSubParagraph(subItem))
    :docParentParagraph(paraItem)).flat()

    const sectionObj = {
      properties: { type: SectionType.CONTINUOUS },
      margins: {
        top: '1in',
        bottom: '1in',
        right: '1in',
        left: '1in'
      },

      children: paragraphsArr
    };
    return sectionObj;
  };

  return {
    numbering: {
      config: [
        {
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: '%1',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: {
                    left: convertInchesToTwip(0.5),
                    hanging: convertInchesToTwip(0.18)
                  }
                }
              }
            }
          ],
          reference: 'my-number-numbering-reference'
        },
        {
          levels: [
            {
              level: 0,
              format: LevelFormat.LOWER_LETTER,
              text: '%1',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: {
                    left: convertInchesToTwip(1),
                    hanging: convertInchesToTwip(0.18)
                  }
                }
              }
            }
          ],
          reference: 'my-sub-paragraph-reference'
        },
        {
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL_ZERO,
              text: '[%1]',
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: {
                    left: convertInchesToTwip(0.5),
                    hanging: convertInchesToTwip(0.18)
                  }
                }
              }
            }
          ],
          reference: 'padded-numbering-reference'
        }
      ]
    },

    sections: [
      // *SECTION1 HEADERS FOOTERS SEAL
      // *1ST HEADER DOD SEALS, Address and SSIC,ORIGINATORSCODE, AND DATE
      headerSectionMaker(topHeader, senderSymbols, footerParagraphs),

      // *SECTION2 FROM AND TO
      sectionMaker(fromToSection),

      // *SECTION3 VIA ARRAY,SPACED TEMPLITERALS FOR FORMATTING
      sectionMaker(viaSection),

      // *SECTION4 SUBJECT LINE
      sectionMaker(subjectSection),

      // *SECTION5 REFERENCES ARRAY
      sectionMaker(refSection),

      // *SECTION6 ENCLOSURES ARRAY
      sectionMaker(enclosureSection),
      
      // *SECTION7 COPYTO ARRAY
      sectionMaker(copyToSection),
      
      //*SECTION8 PARAGRAPH BODY ARRAYS AND SUBPARAGRAPH NESTED ARRAY
      //!ONGOING ISSUE WITH DOCX RECOGNIZING SUB PARAGRAPHS OF A PARAGRAPH
      paragraphsAndSubs()

      // *  SIGNATURE AND TITLE ARE BAKED IN FOOTER
     
    ]
  };
};

export { StandardLetterDocument };
