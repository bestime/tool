import { trim, variableHasValue } from "@bestime/utils_base";


var synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance();
let voidList:SpeechSynthesisVoice[] = []

function oVoidListChange (ev: any) {
  voidList = synth.getVoices()
  
}

synth.addEventListener('voiceschanged', oVoidListChange)

window.addEventListener('beforeunload', function(event) {
  synth.cancel()
  // event.returnValue = '您确定要离开此页面吗？';
  synth.removeEventListener('voiceschanged', oVoidListChange)
  return false;
});


async function readyLanguage (item: SpeechSynthesisVoice) {
  function errorHandler (error: SpeechSynthesisErrorEvent) {
    console.log("朗读错误", error)
  }

  utterance.addEventListener('error', errorHandler)
  let timer: any;
  let count = 1

  
  
  
  
  

  return new Promise(function (resolve: (data?: any) => void) {
    function onStart () {
      clearTimeout(timer)
      synth.cancel()
      utterance.removeEventListener('error', errorHandler)
      utterance.removeEventListener('start', onStart)
      resolve()
    }

    function tryOnce () {
      console.log("v3尝试次数：", count++)
      utterance.voice = item; // 获取第一个声音
      utterance.text = count.toString();  
      synth.speak(utterance);
      clearTimeout(timer)      
      utterance.removeEventListener('start', onStart)      
      utterance.addEventListener('start', onStart)
  
      timer = setTimeout(tryOnce, 1000)
    }

    tryOnce()
    
  })
}


type Tlanguage = 'Microsoft Huihui - Chinese (Simplified, PRC)'
  | 'Microsoft Kangkang - Chinese (Simplified, PRC)'
  | 'Microsoft Kangkang - Chinese (Simplified, PRC)'
  | 'Microsoft Yaoyao - Chinese (Simplified, PRC)'
  | 'Google 한국의'
  | 'Google 日本語'
  | 'Google 粤語（香港）'

export default async function speakText (message: string, options: {
  language?: Tlanguage,
}) {
  synth.cancel()
  

  // 可选：设置朗读速度和音调
  utterance.rate = 1; // 正常速度
  utterance.pitch = 1; // 正常音调

  
  



  

  

  
  await variableHasValue.async(function () {
    return voidList.length > 0
  })

  const vod = voidList.find(c => trim(c.name, '*') === trim(options.language, '*')) || voidList[0]
  utterance.lang = vod.lang
  // 可选：设置朗读声音
  
  console.log("语言加载", options.language, vod)
  await readyLanguage(vod)
  console.log("开始播放", message)
  // 开始朗读
  // 设置要朗读的文本
  utterance.text = message;  
  synth.speak(utterance);

  
  
}