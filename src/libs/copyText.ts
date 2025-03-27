import { $browserGlobal } from "./help/hpConsts";

function func01(text: string) {
  return navigator.clipboard.writeText(text)
}

async function func02 (text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();  
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

/**
 * 复制文本
 */
const copyText = $browserGlobal.navigator?.clipboard?.writeText! ? func01: func02

export default copyText