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
  const [error, setError] = useState('');

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
    de:{title: "NameVetter",
      placeholder: "Namen/Ausdruck eingeben, um die Übersetzung anzuzeigen...",
      button: "Suchen",
      loading: "Wird übersetzt...",
      errorPrefix: "Error/Fehler:",
      resultTitle: "Übersetzungsergebnis",
      swapAria: "Ausgangs- und Zielsprache tauschen"},
    es:{
title: "NameVetter",
      placeholder: "Escribe un nombre/frase para ver la traducción...",
      button: "Buscar",
      loading: "Traduciendo...",
      errorPrefix: "Error:",
      resultTitle: "Resultado de la traducción",
      swapAria: "Intercambiar idiomas de origen y destino"
    },
    fr:{
      title: "NameVetter",
      placeholder: "Saisissez un nom/une phrase pour voir la traduction...",
      button: "Rechercher",
      loading: "Traduction en cours...",
      errorPrefix: "Error/	Erreur:",
      resultTitle: "Résultat de la traduction",
      swapAria: "Inverser la langue source et la langue cible"
    },
    ru:{
      title: "NameVetter",
      placeholder: "Введите имя/фразу, чтобы увидеть перевод...",
      button: "Поиск",
      loading: "Перевод...",
      errorPrefix: "Error/Ошибка:",
      resultTitle: "Результат перевода",
      swapAria: "Поменять местами исходный и целевой языки"
    },
    zh:{title: "NameVetter",
      placeholder: "输入名称/短语查看翻译...",
      button: "搜索",
      loading: "正在翻译...",
      errorPrefix: "Error/错误:",
      resultTitle: "翻译结果",
      swapAria: "切换源语言和目标语言"},
    hi:{title: "NameVetter",
      placeholder: "अनुवाद देखने के लिए कोई नाम/वाक्यांश दर्ज करें...",
      button: "खोजें",
      loading: "अनुवाद किया जा रहा है...",
      errorPrefix: "Error/त्रुटि:",
      resultTitle: "अनुवाद परिणाम",
      swapAria: "स्रोत और लक्ष्य भाषाओं को आपस में बदलें"},
    ar:{title: "NameVetter",
      placeholder: "أدخل اسمًا/عبارة لرؤية الترجمة...",
      button: "بحث",
      loading: "جاري الترجمة...",
      errorPrefix: "Error/خطأ:",
      resultTitle: "نتيجة الترجمة",
      swapAria: "تبديل لغة المصدر والهدف"},
    ja:{title: "NameVetter",
      placeholder: "名前/フレーズを入力して翻訳を表示...",
      button: "検索",
      loading: "翻訳中...",
      errorPrefix: "Error/エラー:",
      resultTitle: "翻訳結果",
      swapAria: "元の言語と翻訳先の言語を切り替える"}
  }; //const ui 

  const currentSiteTranslation = ui[uiLang] || ui['en'];

  const swapLangs = () =>{
    setFromLang(toLang);
    setToLang(fromLang);
  }

  const clearInput = () => {
    setName('');
  };

  //aws api gateway invoking url
  const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL || "";

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
    setError('');
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

    return (
    <div className={`vetter-wrapper theme-${theme} font-${fontSize}`}>
      <div className="vetter-container">
        
        {/* Settings Bar */}
        <div className="settings-bar">
          <select 
            value={uiLang} 
            onChange={(e) => setUiLang(e.target.value)}
            aria-label="Select Site Language"
          >
            {SUPPORTED_LANGS.map(lang => (
              <option key={`ui-${lang.code}`} value={lang.code}>{lang.label}</option>
            ))}
          </select>

          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            aria-label="Select Theme"
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>

          <select 
            value={fontSize} 
            onChange={(e) => setFontSize(e.target.value)}
            aria-label="Select Font Size"
          >
            <option value="small">Small Text</option>
            <option value="medium">Medium Text</option>
            <option value="large">Large Text</option>
          </select>
        </div>

        <h2>{currentSiteTranslation.title}</h2>
        
        <form onSubmit={vetName} className="vetter-form-complex">
          
          {/* Language Swap Row */}
          <div className="language-swap-row">
            <select 
              value={fromLang} 
              onChange={(e) => setFromLang(e.target.value)}
              aria-label="Origin Language"
              className="lang-select"
            >
              {SUPPORTED_LANGS.map(lang => (
                <option key={`from-${lang.code}`} value={lang.code}>{lang.label}</option>
              ))}
            </select>

            {/* SVG Swap Button */}
            <button 
              type="button" 
              onClick={swapLangs} 
              className="swap-button"
              aria-label={currentSiteTranslation.swapAria}
              title={currentSiteTranslation.swapAria}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16 3 4 4-4 4"/>
                <path d="M20 7H4"/>
                <path d="m8 21-4-4 4-4"/>
                <path d="M4 17h16"/>
              </svg>
            </button>

            <select 
              value={toLang} 
              onChange={(e) => setToLang(e.target.value)}
              aria-label="Target Language"
              className="lang-select"
            >
              {SUPPORTED_LANGS.map(lang => (
                <option key={`to-${lang.code}`} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>

          {/* Input Row with Clear Button inside it */}
          <div className="input-submit-row">
            <div className="input-wrapper">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={currentSiteTranslation.placeholder}
                className="vetter-input"
                required
                aria-label={currentSiteTranslation.placeholder}
              />
              
              {/* Only show the clear 'X' if there is text typed in */}
              {name && (
                <button
                  type="button"
                  className="clear-button"
                  onClick={clearInput}
                  aria-label={currentSiteTranslation.clearAria}
                  title={currentSiteTranslation.clearAria}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              )}
            </div>
            
            <button type="submit" disabled={loading} className="vetter-button">
              {loading ? currentSiteTranslation.loading : currentSiteTranslation.button}
            </button>
          </div>
        </form>

        {error && (
          <div className="vetter-error" role="alert">
            <strong>{currentSiteTranslation.errorPrefix}</strong> {error}
          </div>
        )}

        {/* Temporary raw JSON output until we build the SafetyCards */}
        {result && (
          <div className="vetter-result" aria-live="polite">
            <h3>{currentSiteTranslation.resultTitle}</h3>
            <pre className="vetter-pre">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} //export default function NameVetterFrontend()

