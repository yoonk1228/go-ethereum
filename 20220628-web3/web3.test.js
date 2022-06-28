const Web3 = require('web3')
const ethTx = require('ethereumjs-tx').Transaction

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
  it('트랜잭션 횟수 구해오기', async ()=>{
    const txCount = await web3.eth.getTransactionCount(sender)
    console.log(txCount)
    console.log(web3.utils.toHex(txCount))
  })
  it('트랜잭션 실행하기', async ()=>{
    // 보내는사람의 tx 를 counting 한다.
    // Nonce : tx 에 계정이 가지고 있는 고유한 값
    const txCount = await web3.eth.getTransactionCount(sender)
    // sender : 0x751e8e1755aa1f7046d96896517a04750605871d67ba94a515f8bd578f5fb56b
    const privateKey = Buffer.from('751e8e1755aa1f7046d96896517a04750605871d67ba94a515f8bd578f5fb56b','hex')
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      from: sender,
      to: received,
      value: web3.utils.toHex(web3.utils.toWei('1','ether')), // 보낼 금액 -> 10**18 => toHex
      gasLimit: web3.utils.toHex(6721975), // todo: ganache 에 evm_snapshot 적용하기
      gasPrice: web3.utils.toHex(web3.utils.toWei('1','gwei')),
      data: web3.utils.toHex('')
    }
    const tx = new ethTx(txObject)
    // console.log('sign 이전',tx)
    tx.sign(privateKey)
    // console.log('sign 이후',tx)
    const serializedTx = tx.serialize()
    // console.log(serializedTx.toString('hex'))
    const transactionObject = await web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'))
    console.log(transactionObject)
  })
  it('Balance 확인', async ()=>{
    const senderBalance = await web3.eth.getBalance(sender)
    const receivedBalance = await web3.eth.getBalance(received)

    console.log('sender balance : ', senderBalance / 10 ** 18)
    console.log('received balance : ', receivedBalance / 10 ** 18)
  })
  it('가스 사용량 확인하기',()=>{
    //  가스 사용량 21004
    //  21000 + 4

    //  가스 사용량 21004
    //  가스 가격 1 = 1gwei
    //  가스최대치 6721975

    //  1 트랜잭션 당 얼마의 값이 나가는지
    //  1 - 총 사용량( 총 사용량 * 가스 가격 ) === 수수료 값
  })
})
