const Web3 = require('web3')

describe('web3 테스트 코드',()=>{
  let web3
  let accounts

  let sender
  let received
  it('web3 연결 테스트',()=>{
    // web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
    web3 = new Web3('http://127.0.0.1:8545') // 예전 문법
    console.log(web3)
  })

  // web3 반환값은 Promise 이기 때문에 await 사용
  // 최신블럭의 높이(number) 가져오기
  it('Latest Block 높이 가져오기',async ()=>{
    const latestBlock = await web3.eth.getBlockNumber()
    console.log(latestBlock)

    /*
    * web3-eth
    * web3-shh -> webSocket
    * web3-bzz
    * web3-utils
    * */
  })
  it('전체 accounts 가져오기',async ()=>{
    accounts = await web3.eth.getAccounts() // arr
    sender = accounts[0]
    received = accounts[1]
    console.log(accounts)
  })
  // result 내용을 16진수에서 10진수로 변환
  it('첫 번째 계정 밸런스 가져오기',async ()=>{
    const balance = await web3.eth.getBalance(accounts[0]) // 10^18
    console.log(balance) // wei 단위로 ether 를 료편했다.
    console.log('ETH: ',balance / 10**18) // 100

    // 이더리움의 단위 ETH 10**18 (10^18)
  })
  it('ETH 단위 변경해보기',async ()=>{
    // eth
    // gwei
    // wei
    console.log(web3.utils.toWei('1','gwei'))
    console.log(web3.utils.toWei('1','ether'))
  })
})
