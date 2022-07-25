import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun
  } from "docx";
// Pass props from the form and use template literals for strings
  const StandardLetterDocument=(data)=>{
      const {filename}=data
     return  {
    sections:[
        {
          properties:{},
          children:[
            new Paragraph({
              children:[
                new TextRun(`${filename}`),
                new TextRun({
                  text:"Foo Bar",
                  bold:true,
                }),
                new TextRun({
                  text:"\tGithub is the best",
                  bold:true
                })
              ]
            })
          ]
        }
      ]
    }
  }

  export {StandardLetterDocument}