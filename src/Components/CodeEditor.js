import React, { useState } from "react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";

//Import Languages individually
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-c";
import "prismjs/components/prism-bash";

import "prismjs/themes/prism-funky.css";
import DarkModeToggle from "react-dark-mode-toggle";
import useScreenshot from "../useScreenshot";

function CodeEditor() {
  console.log(languages.julia);
  const dict = {
    js: languages.js,
    html: languages.html,
    c: languages.c,
    markup: languages.markup,
    bash: languages.bash,
    text: languages.text,
  };
  const [code, setCode] = useState(
    `function add(a, b) {\n\n  return a + b;\n\n} \n\nfunction multiply(a, b) {\n\n  return a * b;\n\n}`
  );
  const [theme, setTheme] = useState("lilac");
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [language, setLanguage] = useState("js");

  const [selectedClient, setSelectedClient] = useState([]);

  function handleSelectChange(event) {
    setSelectedClient(event.target.value);
    console.log(selectedClient);
    setLanguage(event.target.value);
  }

  const { generateImage, captureRef } = useScreenshot();
  return (
    <div>
      <div className='page-body'>
        <div
          ref={captureRef}
          className={`holder-background ${theme}`}
          id='exportContainer'
        >
          <div
            className={
              "code-holder " +
              (isDarkMode === false ? "light" : "dark") +
              "-mode"
            }
          >
            <div className='top-bar'>
              <div className='dot' id='dot1'></div>
              <div className='dot' id='dot2'></div>
              <div className='dot' id='dot3'></div>
              <div className='title' contentEditable>
                Untitled-1
              </div>
            </div>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, dict[language])}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
              }}
            />
          </div>
        </div>
      </div>
      <div className='bottom-menu'>
        <div className='theme-chooser'>
          Theme
          <div className='themes'>
            <div
              className='theme-bubble lilac'
              onClick={() => setTheme("lilac")}
            ></div>
            <div
              className='theme-bubble astra'
              onClick={() => setTheme("astra")}
            ></div>
            <div
              className='theme-bubble essence'
              onClick={() => setTheme("essence")}
            ></div>
            <div
              className='theme-bubble neve'
              onClick={() => setTheme("neve")}
            ></div>
          </div>
        </div>
        <div className='mode-holder'>
          Mode
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={70}
          />
        </div>
        <div className='language-holder'>
          Language
          <select
            className='form-select language-select'
            onChange={handleSelectChange}
          >
            <option value='js'>Javascript</option>
            <option value='c'>C</option>
            <option value='html'>HTML</option>
            <option value='markup'>Markup</option>
            <option value='bash'>Bash</option>
            <option value='text'>Text</option>
          </select>
        </div>
        <button className='download-btn' onClick={generateImage}>
          Download <i class='fas fa-download'></i>
        </button>
      </div>
    </div>
  );
}

export default CodeEditor;
