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
    // via: [{ id, title }]
    via
  } = data;

  // const senderSymbols = () => {
  //   console.log('headingformatter');

  //   return new Paragraph({
  //     children: [
  //       new TextRun({
  //         text: `${ssic}`,
  //         break: 1
  //       }),
  //       new TextRun({
  //         text: `${originatorCode}`,
  //         break: 1
  //       }),
  //       new TextRun({
  //         text: `${date}`,
  //         break: 1
  //       })
  //     ],
  //     alignment: AlignmentType.RIGHT
  //     //   indent: {
  //     //     start: "5.19in",
  //     // },
  //   });
  // };

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

  //*------------------ALL RESPECTIVE VARAIBLES BEING PASSED TP SECTION MAKER------------
  const topHeader = new Paragraph({
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
  });
  // * 2nd HEADER SENDER SYMBOLS
  const senderSymbols =
    (new Paragraph({
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
    }));
  const footerParagraphs =
    (new Paragraph({
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
    }));

  const fromToSection = new Paragraph({
    children: [
      // new TextRun({ text: `FROM: ${fromBilletUnitName}`, break: 1 }),
      new TextRun({ text: `From:  Greg Petropoulos`, break: 1 }),

      // new TextRun({ text: `TO: ${toBilletUnitName}`, break: 1 })
      new TextRun({ text: `To:      Jody Smuckatelli`, break: 1 })
      // Spacer
      // new TextRun({ text: '', break: 2 })
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
  });

  const refSection = new Paragraph({
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
  });
  const enclosureSection = new Paragraph({
    // text: `${subject}`

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

  console.log('...paragraphs', ...paragraphs);
  const handleBodyBlock = () => {
    // * PARAGRAPHS LOOP
    const allBodyParagraphs = new Paragraph({
      children: paragraphs.map(
        (paraItem) =>
          paraItem.paragraph.length > 0 &&
          new TextRun({
            text: `(${paraItem.pId}) ${paraItem.paragraph}`,
            break: 1
          })
      )
    });

    // * SUBPARAGRAPHS LOOP
    const subs = new Paragraph({
      level: 0,
      children: paragraphs
        .map((p) =>
          p.subParagraph.map(
            (sub) =>
              new TextRun({
                text: `(${
                  (sub.name === 'subA' && 'a') ||
                  (sub.name === 'subB' && 'b') ||
                  (sub.name === 'subC' && 'c')
                }) ${sub.text}`,
                break: 1
              })
          )
        )
        .flat()
    });
    console.log('subs true outside IF', subs === true);
    console.log('subs.root', subs.root);

    // If the subs have a value then produce a paragraph that has a sub paragraph else just this paragraph
    const {
      paragraphs: [{ subParagraph }]
    } = data;
    if (subParagraph.length > 0) {
      return allBodyParagraphs + subs;
    }

    // console.log("allBodyParagraphs",allBodyParagraphs.root[1].root[2].root[1])
    console.log('allBodyParagraphs', allBodyParagraphs);
    return allBodyParagraphs;
  };
  const copyToSection = new Paragraph({});
  const sigTitleSection = new Paragraph({});
  
  //*------------------------------------------------------------------------------

  // *HEADER AND GENERAL SECTION CALLBACKS
  const headerMaker = (topHeader, senderSymbols, footerParagraphs) => {
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
        }),
        footer: {
          default: new Footer({ children: [footerParagraphs] })
        },
        children: []
      }
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

  return {
    sections: [
      // *SECTION1 HEADERS FOOTERS SEAL
      // *1ST HEADER DOD SEALS, Address and SSIC,ORIGINATORSCODE, AND DATE
      headerMaker(topHeader, senderSymbols, footerParagraphs),
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

      //*SECTION7 PARAGRAPH BODY ARRAYS AND SUBPARAGRAPH NESTED ARRAY
      //* CHECK IF PARAGRAPH OR TEXT LENGTH IS>0 IF TRUE LOOP THROUGH THAT ARRAY AND PRODUCE A NEW TEXTRUN
      sectionMaker(handleBodyBlock),
      // *--------------------works good here
      // new Paragraph({
      //   children: paragraphs.map(paraItem =>
      // paraItem.paragraph.length>0&& new TextRun({
      //   text: `(${paraItem.pId})  ${paraItem.paragraph}`,
      //   break: 1
      // })
      // )}),
      // *--------------------
      // *-----WORKD
      //   new Paragraph({
      //   children: paragraphs.map(paraItem =>
      // paraItem.paragraph.length>0&& new TextRun({
      //   text: `(${paraItem.pId})  ${paraItem.paragraph}`,
      //   break: 1
      // })
      // )}),
      // console.log("type of ", typeof new TextRun({text:'hello testtststst'})),
      // ! TESTING LOOP THROUGH PARAGRAPHS THIS
      // *THIS WORKS FOR PARAGRAPH
      // * ----------------------------------------------------------
      //!  ...paragraphs.map(paraItem => paraItem.paragraph.length>0&&
      //!  new Paragraph({ text:`(${paraItem.pId}) ${paraItem.paragraph}`})),
      // * ----------------------------------------------------------
      // *THIS WORKS FOR SUB PARAGRAPHS
      //  ...paragraphs.map(paraItem => paraItem.paragraph.length>0&&
      // new Paragraph({children: [new TextRun({ text:`(${paraItem.pId}) ${paraItem.paragraph}`})]})),
      // NEED TOGET SUB P TO SHOW UP
      //! ...paragraphs.map(paraItem =>  paraItem.SubParagraph!==null && new Paragraph('yoyoyoy'))
      // !STOPPED HERE NEED TO GET SUB PARAGRAPH TO SHOW UP

      // *SECTION8 COPYTO ARRAY
      sectionMaker(copyToSection),

      // * SECTION10 SIGNATURE AND TITLE
      sectionMaker(sigTitleSection)
    ]
  };
};

export { StandardLetterDocument };
