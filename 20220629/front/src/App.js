import useWeb3 from './hooks/useWeb3'
import { useState, useEffect } from 'react'

function App() {
    const [account, web3] = useWeb3()
    const [isLogin, setIsLogin] = useState(false)
    const [balance, setBalance] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        await web3.eth.sendTransaction({
            from: account,
            to: e.target.received.value,
            value: web3.utils.toWei(e.target.amount.value, 'ether'),
        })
    }

    useEffect(() => {
        const init = async () => {
            const balance = await web3?.eth.getBalance(account)
            console.log(balance / 10 ** 18)
            setBalance(balance / 10 ** 18)
        }
        console.log(account)
        if (!account) setIsLogin(true)
        init().then()
    }, [account])

    if (!isLogin) return <div>메타마스크 로그인을 해주세요.</div>
    return (
        <div>
            <p>
                <h2>{account}님 환영합니다.</h2>
                <div>Balance: {balance} ETH</div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" id="received" placeholder="받을 계정" />
                        <input type="number" id="amount" placeholder="보낼 금액" />
                        <input type="submit" id="value" />
                    </form>
                </div>
            </p>
        </div>
    )
}

export default App
