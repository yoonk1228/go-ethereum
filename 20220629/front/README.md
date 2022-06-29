### webpack 의 기능 제외시키기 

1. ejest 로 react 를 풀어서 사용

2. override 해서 사용 <-- 일반적인 방법

```sh
npm i react-app-rewired

# root 에 config-overrides.js 생성

npm i custmomize-cra
```

```js
// config-overrides.js
const {override} = require('scustomize-cra')

module.exports = override(config =>{
    // config : webpack 의 모든 설정
    return config
})
```

```js
// config-overrides.js
const {override} = require('scustomize-cra')

module.exports = override(config =>{
    // 못 쓰는 기능에 대한 Error
    // cli 가 시키는 대로 해당 기능 제외
    config.resolve = {
        fallback: {
            ...config.resolve.fallback,
            https:require.resolve('https-browserify'),
        }
    }
    return config
})
```
