export const WINDOW = window
export const HISTORY = WINDOW.history
export const LOCAL_STROAGE = WINDOW.localStorage


/** 简写：document.getElementById */
export function DOCUMENT_GETBYID (id) {
  return document.getElementById(id)
}

/** 简写：document.createElement */
export function DOCUMENT_CREAGEELEMENT (tagName) {
  return document.createElement(tagName)
}

/** 简写：document.getElementsByTagName */
export function DOCUMENT_GETELEMENTBYTAGNAME (classname) {
  return document.getElementsByTagName(classname)
}

/** 创建div */
export function DOCUMENT_CREATE_DIV () {
  return DOCUMENT_CREAGEELEMENT('div')
}

/** 创建img */
export function DOCUMENT_CREATE_IMAGE () {
  return DOCUMENT_CREAGEELEMENT('img')
}





