//importing useState Hook from React Library
import { useState } from "react";
import "./NameVetterFrontend.css";

const SUPPORTED_LANGS = [
  { code: "en", label: "English" },
  { code: "kr", label: "Korean" },
  { code: "de", label: "German" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "ru", label: "Russian" },
  { code: "zh-CN", label: "Chinese (Mandarin)" },
  { code: "hi", label: "Hindi" },
  { code: "ar", label: "Arabic" },
  { code: 'ja', label: 'Japanese' }
];

export default function NameVetterFrontend() {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [uiLang, setUiLang] = useState("en");

  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("kr");

  const ui = {
    en: {
      title: "NameVetter",
      placeholder: "Enter a name/phrase to see the translation...",
      button: "Translate",
      loading: "Translating...",
      errorPrefix: "Error:",
      resultTitle: "Translation Result",
      swapAria: "Swap source and target languages"
    },
    kr:{
     title: "NameVetter",
      placeholder: "번역을 보려면 이름/문구를 입력하세요...",
      button: "검색",
      loading: "번역 중...",
      errorPrefix: "Error/오류:",
      resultTitle: "번역 결과",
      swapAria: "출발 언어와 도착 언어 바꾸기"
    },
    de:{},
    es:{},
    fr:{},
    ru:{},
    zh-CN:{},
    hi:{},
    ar:{},
    ja:{}
  }; //const ui 

  //aws api gateway invoking url
  const API_GATEWAY_URL = "";

  const vetName = async (e) => {
    e.preventDefault();
    //sanitizing and validating first before anything

    const cleanName = name.trim();
    //removes sneaky spaces at the beginning/end
    if (!cleanName) {
      setError("Please enter a name to vet.");
      return;
    } //if(!cleanName)

    //too long of a word?
    if (cleanName.length > 50) {
      setError("Name is too long. Keep it under 50 characters.");
      return;
    } //if(cleanName.length > 50)

    //filter out the weird characters
    //let the input only get the letters, spaces, hyphens and apostrophes
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(cleanName)) {
      setError(
        "Invalid characters have been detected Please use only letters, spaces, hyphens and apostrophes.",
      );
      return;
    } //nameRegex

    //this resets the stage by turning on the loading spinner/text
    //clears previous results (or previous errors) before reaching out to AWS
    setLoading(true);
    setError(null);
    setResult(null);

    //Sending a request to API Gatewat using the browser's built-in FETCH tool
    try {
      const response = await fetch(API_GATEWAY_URL, {
        method: "POST", // post request bc sending data
        headers: { "Content-Type": "application/json" }, // tells AWS that this is sending JSON data
        body: JSON.stringify({ targetName: name }), //body is taking the "name" the user typed and packaging it into an object and turns it into text string to let it travel thru the internet.
      }); //fetch
      if (!response.ok) {
        throw new Error("HTTP error! status: ${response.status}");
      } // if (!response.ok)
      const data = await response.json();
      setResult(data); // converts the response from text to repoense.json() ... JS object... and saves it into result memory only AFTER checking that it takes in a successful response
    } catch (err) {
      //try
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }; //const vetName = async(e)=>
} //export default function NameVetterFrontend()
