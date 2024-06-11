
type TElementFullCallback = () => void
type TFullScreenActionCallback = (isSuccess: boolean) => void
type TElement = HTMLElement & {
  webkitRequestFullScreen?: TElementFullCallback
  mozRequestFullScreen?: TElementFullCallback
  msRequestFullscreen?: TElementFullCallback
}

const defaultCallback:TFullScreenActionCallback = (isSuccess) => {}

function open (element: TElement, cb?: TFullScreenActionCallback) {
  const callback = cb || defaultCallback
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullScreen ) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }

  callback(true)
}


function close (cb?: TFullScreenActionCallback) {
  const callback = cb || defaultCallback
  const anyDoc:any = document
  if (document.exitFullscreen) {
    document.exitFullscreen().then(function () {
      callback(true)
    }).catch(function(){
      callback(false)
    })
  } else if (anyDoc.webkitCancelFullScreen) {
    anyDoc.webkitCancelFullScreen();
    callback(true)
  } else if (anyDoc.mozCancelFullScreen) {
    anyDoc.mozCancelFullScreen();
    callback(true)
  } else if (anyDoc.msExitFullscreen) {
    anyDoc.msExitFullscreen();
    callback(true)
  }
}
export default function fullScreen (element: TElement, value: boolean, callabck?: TFullScreenActionCallback) {
  if(value) {
    open(element, callabck)
  } else {
    close(callabck)
  }
}