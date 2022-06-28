nodejs web3

tx 까지 구현

test - jest

```sh
$ npm init -y
$ npm install -D jest
```

**package.json**
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

**jest.config.js**
```js
const config = {
  verbose: true,
  testMatch:['<rrotDir>/**/*.test.js']
}
```

**web3.test.js**
```js
describe('web3 테스트 코드',()=>{
  it('테스트',()=>{
    console.log('hello World')
  })
})
```

```sh
npm i web3
npm i ethereumjs-tx
# Transaction 객체를 이더리움 클라이언트가 이해할 수 있게 만들어 준다.
```
**web3 문서**
`https://ethereum.github.io/execution-apis/api-documentation/`
