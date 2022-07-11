# Naval Letter Generator

## Intro

I discovered the [Naval Letter Generator](https://marines.dev/projects/#naval-letter-format-generator-application) project on the [Marine Coders](https://marines.dev/) website that could be improved. The form is here
[Naval Letter Form](https://marines.dev/_pages/naval_letter_js_test.html)

Purpose of the letter is to reduce the time and effort to create a naval letter via web application and produce a correclty formatted word docx. Use the standard letter format or one of its variations to correspond officially within or 
outside the DoD.

## Naval Letter Types

- Memorandom
- Business Letter
- Executive Correspondence

## Sprints

- ~~Skeleton the React app, configure TailwindUI, point git to github repo~~
- ~~Build out the basic components (input fields, buttons, etc..)~~
- ~~Bring all the components together and styles~~
- ~~Once UI finished, Work through the UX (Dynamic Radio buttons etc)~~
- Submit all state values into a form or into a word docx
- Validate from fields
- Handle the letter editing with js
- Deploy Github/Vercel

## State Management

- Initially built out each parent component with handling it's own state

- After confirming all of the parent ccomponents are handling state correctly, I will move all of the state to the App.js top level.

- Permitting all the state can be handled at the top level in App.js and prop drilling does not present an opportunity for the Context API or Redux.

## Features

- Tool tips for clarity
- FAQ page
- Reset button
- Add paragraphs and sub paragraphs
- Delete paragraphs and sub paragraphs
- Edit in realtime
- Produce a Naval Lettter in correct format with content added by user

## Input Fields

- File Name

**Header**
- SSIC
- Originator Code
- Date

**Address**
- Unit Name
- Address

**Reply Block**
- From 
- To
- Subject

## Radio Buttons
**Optional items**
- VIA
- References
- Enclosures

- Controlled components
- Validation
- Required if selected
- Limited entries

## Body Block

- Limited to 10 paragraphs (can be changed later)
- Each paragraph item consist of `pId`, `paragraph`, and can have a a total of three sub paragraphs added `subA`,`subB`,`subC` to one parent paragraph
- The first prargraph will always remain available with delete functionality for the content but the UI will remain an empty paragragh text box
- To delete a paragraph click delete on any paragraph except the first one
- To delete a sub paragraph it must be deleted in reverse order it was added

## Closing Block
- Signature
- Copy To

## Submitting The Form

- State--> into JSON body

## Word Docx

## The Expected Outcome

## The Actual Outcome

## Test

**Paragraph Test**

**Create**

- Create a paragraph
- Create 2 paragraphs
- Create 1 paragraph with 3 sub paragraphs
- Create 1 paragraph with 3 sub paragraphs and a 2nd paragraph
- Create 1 paragraph and a 2nd paragraph with 3 sub paragraphs
- Create 1 paragraph with 3 sub paragraphs and a 2nd paragraph with 3 sub paragraphs

**Delete**

- Delete a paragraph
- Delete 2 paragraphs
- Delete sub paragraphs in reverse order of created order in 1 paragraph
- Delete sub paragraphs in reverse order of created order in 2nd paragraph, and 1st paragraph exists
- Delete the whole paragraph item including it's sub paragraphs
- Delete paragraphs out of order

**Edit**

Live edit on all paragraphs and sub paragraphs

**Input Field Test**

**Radio Button Test**

**Mobile test**

**Word Doc Test**


## Naval Letter Format Examples (Referencing the Naval Letter SECNAV M-5216.5 June 2015)
To better help what each line should appear and an example use case to delinieate any validation or required fields

- **From**
   - Notes: 

  - Ex: 

| SNDL Entry| From Line|
| :--------|----------:|
| COMMANDING OFFICER, Norfolk NAVAL STATION NORFOLK VA 23511-6000|Commanding Officer, Naval Station, Norfolk|
| COMMANDING OFFICER VP 45 UNIT 60172 FPO AA 34099-5918 | Commanding Officer, Patrol Squadron 45|
 ------------
 
 - **VIA**
    - Notes: 
        - Use a “Via:” line when one or more activities outside of your activity should review a letter before it reaches the action addressee.  The format for the “Via:” line is the same as for the “From:” line and “To:” line discussed in paragraphs 5 and 6 above
    - Example: Via:     Commander, U.S. Pacific Fleet

 - **References**
    - Notes: List references in the order they appear in the text and always mention cited references in the text. When citing a reference it is not necessary to include the subject of the reference.
    - Example: 

- **Enclosure** 
    - Notes: 
        - Try to keep letters short, down to one page whenever possible, and use enclosures for lengthy explanations that cannot be avoided. 
        - An enclosure may include such things as manuals, publications, photocopies of correspondence, charts, etc. belonging to the specific DON organization only.
        -  List enclosures in the enclosure line in the order they appear in the text. Identify an enclosure using the same format as you would when identifying a reference. Never list an item in both the enclosure line and reference line of the same letter. 
        
    - Ex: Encl:   (1) List of Reserve Officers Selected for Promotion to Colonel
               

- **Subject**
  - Notes
    - Must be upper case
    - The subject line consists of a sentence fragment that tells readers what the letter is about.  Use normal word order and capitalize every letter after the colon.  In correspondence, do not use acronyms in the subject line.
  - Ex: Subj:   PROGRAM ACQUISITION PROCESS FOR THE ADVANCED SEA-BASED TARGET PROFILING RADAR

## **Standard Naval Letter**
![Standard](./src/assets/images/standard-naval-letter.png)
## Acronyms
- SNDL - Standard Navy Distribution List 