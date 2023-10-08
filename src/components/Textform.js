import { useState } from "react";

export default function Textform(props) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState("Copy to Clipboard");

  const handleTextTransformation = (transformationFunction) => {
    if (text) {
      const transformedText = transformationFunction(text);
      setText(transformedText);
    }
  };

  const handleInverseClick = () => {
    const transformedText = text
      .split("")
      .map((letter) =>
        letter === letter.toLowerCase() ? letter.toUpperCase() : letter.toLowerCase()
      )
      .join("");
    setText(transformedText);
  };

  const handleReverse = () => {
    const reversedText = text.split("").reverse().join("");
    setText(reversedText);
  };

  const handleClearClick = () => {
    setText("");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };
//   const speak = () => {
//     let msg = new SpeechSynthesisUtterance();
//     msg.text = text;
//     window.speechSynthesis.speak(msg);
//   }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied("Copied");
        setTimeout(() => {
          setCopied("Copy to Clipboard");
        }, 1500);
      },
      (err) => {
        console.log(`Failed to Copy: ${err.message}`);
      }
    );
  };

  const transformationButtons = [
    { label: "UPPERCASE", onClick: () => handleTextTransformation((str) => str.toUpperCase()) },
    { label: "lowercase", onClick: () => handleTextTransformation((str) => str.toLowerCase()) },
    { label: "Capitalize", onClick: () => handleTextTransformation(capitalizeText) },
    { label: "Sentence case", onClick: () => handleTextTransformation(sentenceCaseText) },
    { label: "iNVERSE", onClick: handleInverseClick },
    { label: "Reverse", onClick: handleReverse },
    { label: "Remove Special Characters", onClick: () => handleTextTransformation(removeSpecialCharacters) },
    { label: "Remove Extra Spaces", onClick: () => handleTextTransformation(removeExtraSpaces) },
    { label: "Remove Duplicate Words", onClick: () => handleTextTransformation(removeDuplicateWords) },
    // { label: "Pronounce", onClick: () => handleTextTransformation(speak) }
  ];

  const transformationButtonClasses = "border border-primary bg-tertiary text-white px-2 py-1 rounded";

  return (
    <div className="container mx-auto">
      <h2 className="text-center py-4 font-bold">{props.heading}</h2>
      <div className="p-6">
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded"
          value={text}
          onChange={handleOnChange}
          placeholder="Enter your text and choose the transformation"
        ></textarea>
        <div className="flex flex-wrap gap-4">
        <div className="flex flex-wrap gap-4 mt-4">
          {transformationButtons.map((button, index) => (
            <button
              key={index}
              className={transformationButtonClasses}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
        <div className="flex  gap-4 justify-between mt-4">
          <button className={transformationButtonClasses} onClick={handleCopyClick}>
            {copied}
          </button>
          <button className={transformationButtonClasses} onClick={handleClearClick}>
            <i className="fa-solid fa-trash-can"></i> Clear
          </button>
        </div>
        </div>
        
        <div className="my-4 text-center">
          Words: <strong>{text?.split(/\s+/).filter((element) => element.length !== 0).length}</strong> |
          Characters: <strong>{text?.length}</strong> |
          Space Counter: <strong>{text?.split(" ").length - 1}</strong> |
          Sentences: <strong>{text?.split(/[.?!]\s/).filter((element) => element.length !== 0).length}</strong> |
          Paragraphs: <strong>{text?.split(/\r\n|\r|\n/).filter((element) => element.length !== 0).length}</strong> |
          Time to Read: <strong>{0.008 * text?.split(/\s+/).filter((element) => element.length !== 0).length}</strong> |
          Characters per Word (Average): <strong>{text?.replace(/\s+/g, "").length / text.split(/\s+/).filter((element) => element.length !== 0).length}</strong>
        </div>
      </div>
      <div className="bg-white h-56 overflow-auto mx-6 p-4">
        <h2 className="text-center font-bold">Preview</h2>
        <p>{text.length > 0 ? text : "Enter text above to preview"}</p>
      </div>
    </div>
  );
}

const capitalizeText =(str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const sentenceCaseText = (str) => {
  const arr = str.split(". ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(". ");
}

function removeSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z ]/g, "");
}

function removeExtraSpaces(str) {
  return str.replace(/\s+/g, " ").trim();
}

function removeDuplicateWords(str) {
  return str
    .split(" ")
    .filter((item, i, allItems) => i === allItems.indexOf(item))
    .join(" ");
}
