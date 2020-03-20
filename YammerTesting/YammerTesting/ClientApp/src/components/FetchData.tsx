import React, { TextareaHTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import hljs from 'highlight.js';

import '../custom.css';

//import javascript from 'highlight.js/lib/languages/javascript';
//hljs.registerLanguage('javascript', javascript);

//<figure class="video_container">
//<iframe src="https://www.youtube.com/embed/enMumwvLAug" frameborder="0" allowfullscreen="true"> </iframe>
//</figure >

const initialMarkdown = `
### Headers

### iFrame testing

  <iframe src="https://www.youtube.com/embed/enMumwvLAug" frameborder="0" allowfullscreen="true"> </iframe>


# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

### List

- list item one
- list item two
- list item three

### Links

[FreeCodeCamp](https://learn.freecodecamp.org)
[chocolate](https://learn.freecodecamp.org)

[Google](https://www.google.com "World's Most Popular Search Engine")

### Text Decorations

*italic*

**bold**

***bold and italic***

### Images 
![alt text](https://image.shutterstock.com/image-photo/pitbull-dog-alway-smile-260nw-629627696.jpg 'Cute Pitbull')                \`\`\` \n testtesttesttesttesttest tes \n ttest testtest testtest testtest   \`\`\`

### Blockquote

> To be, or not to be. That is a stupid question.


### Code

\`npm install create-react-app -g\`

\`\`\`
function addTwoNumbers(a, b) {
  return a + b
}
const name = 'Benjamin'
const age = 37
const number = Math.random() * 10
\`\`\`
`


interface State {
    markdown: string
}

var renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
    return `<a href=${href} target="_blank">${text}</a>`
}

marked.setOptions({
    renderer,
    // whatever that is inside the three \`
    highlight: function (code) {
        console.log('what is code in highlight.js', code)
        return hljs.highlightAuto(code).value
    },
    breaks: true
})

export default class MyEditor extends React.Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            markdown: initialMarkdown
        };
        
    }

    handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ markdown: e.target.value })

    render() {
        return (
            <div>
                <div id='preview' dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }} />
                <textarea id='editor' value={this.state.markdown} onChange={this.handleChange} />

                <h1>Hello</h1>

                <iframe src="https://www.youtube.com/embed/enMumwvLAug"></iframe>

            </div>

        );
    }
}

