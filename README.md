# Naval Letter Generator

## Intro

I discovered the [Naval Letter Generator](https://marines.dev/projects/#naval-letter-format-generator-application) project on the [Marine Coders](https://marines.dev/) website that could be improved. The form is here
[Naval Letter Form](https://marines.dev/_pages/naval_letter_js_test.html)

Purpose of the letter is to reduce the time and effort to create a naval letter via web application and produce a correclty formatted word docx.

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

## Radio Buttons

- Controlled components
- Validation
- Required if selected
- Limited entries

## Body Block

- Limited to 10 paragraphs (can be changed later)
- Each paragraph item consist of `pId`, `paragraph`, and can have a a total of three sub paragraphs added  `subA`,`subB`,`subC` to one parent paragraph
- The first prargraph will always remain available with delete functionality for the content but the UI will remain an empty paragragh text box 
- To delete a paragraph click delete on any paragraph except the first one 
- To delete a sub paragraph it must be deleted in reverse order it was added


## Closing Block

## Submitting The Form

- State--> into JSON body

## Word Docx

## The Expected Outcome

## The Actual Outcome
