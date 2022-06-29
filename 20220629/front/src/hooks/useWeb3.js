import { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min";

const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const getChainId = async () => {
    return await window.ethereum.request({
      method: "eth_chainId",
    }); // Promise
  };

  const getRequestAccounts = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("requestMethod", account);
    return account; // Promise
  };

  const addNetwork = async (chainId) => {
    const network = {
      chainId: chainId,
      chainName: "ingGanache",
      rpcUrls: ["http://127.0.0.1:8545"],
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
    };
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [network],
    });
  };

  useEffect(() => {
    console.log(window.ethereum); // undefined 가 아니면 메타마스크가 설치된 사람

    const init = async () => {
      try {
        const targetChainId = "0x1e2a";
        const chainId = await getChainId();
        // 너의 메타마스크 chainId 가 이게 맞니? // 1: 메인, 2~5: test // 0x1e2a
        console.log(Web3.utils.toHex("7722"));
        console.log(chainId);
        if (targetChainId !== chainId) {
          // network 를 추가하는 코드를 작성
          await addNetwork(targetChainId);
        }
        const account = await getRequestAccounts();
        console.log(account);

        const web3 = new Web3(window.ethereum);
        setAccount(...account);
        setWeb3(web3);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (window.ethereum) {
      init().then();
    }
  }, []);

  return [account, web3];
};

export default useWeb3;
