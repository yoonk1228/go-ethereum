curl -x -h --data [url]

curl -x POST -h "content-type:application/json" --data '{name:"ingoo"}' http://localhost:3000

### 이더리움의 Request body 모양

```
// method POST
application/json
{
    "id": 1337, // 선택, 체인 아이디 ( 1337 : ganache 가 제공 )
    "jsonrpc": "2.0", // 필수
    "method": "eth_account", // 필수. 실제 이더리움 클라이언트에서 작동된 메서드 이름
    "params": []
}
```
**RPC : 특정 함수만 실행시키고 그 리턴값을 받겠다.**
`https://ethereum.github.io/execution-apis/api-documentation/`

curl -X POST \
    -H "Content-type: application/json" \
    --data '{ "jsonrpc":"2.0","method":"eth_accounts","params":[] }' \
    http://localhost:8545
### rpc 로 getBalance 실행해보기
curl -X POST \
    -H "Content-type: application/json" \
    --data '{ "jsonrpc":"2.0","method":"eth_getBalance","params":["0x80566e37bD8dCa9590EDC8759220074a5460FB44","latest"] }' \
    http://localhost:8545

**대부분 리턴값이 16진수로 온다.**

###  ganache 메소드
evm_snapshot [] // number

evm_revert ["0x1"] // evm_snapshot 시점으로 돌아감

evm_ mine ["_timestamp"]

### 위에 RPC 통신을 쉽게 만들어 주는 녀석이 있다?
**Web3**

`npm i web3`
