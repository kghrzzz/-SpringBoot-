//封装token存取删方法

const TOKENKEY = 'token_key'
function setToken(token){
    window.localStorage.setItem(TOKENKEY, token)
}

function getToken(){
    return window.localStorage.getItem(TOKENKEY)
}

function removeToken(){
    window.localStorage.removeItem(TOKENKEY)
}

//封装班级名存取
const ClassName = 'classname'
function setClassName(classname){
    window.localStorage.setItem(ClassName, classname)
}

function getClassName(){
    return window.localStorage.getItem(ClassName)
}

function removeClassName(){
    window.localStorage.removeItem(ClassName)
}


export {
    setToken,
    getToken,
    removeToken,
    setClassName,
    getClassName,
    removeClassName
}