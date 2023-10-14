import Header from "../Header";
import '../index.css'
import './Home.css'
// import { Link } from "react-router-dom";
import { WagmiConfig, createConfig, configureChains, sepolia, mainnet } from 'wagmi'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
// import CreateCase from "../CreateCase/CreateCase";
import { useNavigate } from "react-router-dom";

const style = {
    font16: "16px",
    font54: "54px",
    justifyRight: "right",
    marginRight: "10rem",
    weight100: "100",
    weight200: "200",
    underline: "underline",
    marginTop6: "6rem"
};

function NavigateCreateCase() {
    const [navigate,] = useNavigate();
    navigate('/CreateCase');
}

const { chains, publicClient } = configureChains(
    [sepolia, mainnet],
    [
      jsonRpcProvider({
        rpc: () => ({
          http: "https://eth-mainnet.g.alchemy.com/v2/dcvfPitBtlvRSIYRW6upYLZnPBPv_nHY"
        }),
      })
    ]
);

const config = createConfig({
    autoConnect: true,
    publicClient,
    connectors: [
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      })
    ]
})

function Profile() {
    const { address } = useAccount()
    const { connect, isConnecting } = useConnect({
      connector: new InjectedConnector(),
    })
    // const { disconnect } = useDisconnect()
    // const { data } = useBalance({
    //   address: address,
    // })
  
    if (address) {
        NavigateCreateCase();
    //   return (
    //     <div className="d-flex justify-content-center align-items-center vh-100">
    //       <div className="text-center">
    //         <p>Connected to {address}</p>
    //         <p>Balance: {data ? data.formatted : "Loading..."} ETH</p>
    //         <p>Chain ID: {config ? config.lastUsedChainId : ""}</p>
    //         <button className="btn btn-primary mt-3" onClick={disconnect}>Disconnect</button>
    //         <Link to={CreateCase}> Create a case </Link>
    //       </div>
    //     </div>
    //   )
    }
  
    if (isConnecting) {
      return (
        <div className="row">
          <p className="header-text">Connecting...</p>
        </div>
      )
    }
  
    return ( 
    <>
        <Header></Header>
        <div className="row" style={{marginTop: style.marginTop6}}>
            <p> hey officer, <br/> <span style={{ fontSize: style.font54 }}> worried of <span className="traitors"> traitors</span>?</span> <br/> <span style={{ fontWeight: style.weight200 }}> <span className="secure"> secure </span> your investigation on ethereum </span> </p> 
        </div>

        <div className="row" style={{ justifyContent: style.justifyRight, marginRight: style.marginRight }}>
            <div> 
                <button type="button" className="create-case-button" onClick={() => connect()}> create a case   ↝ </button> 
                <p style={{ fontSize: style.font16, fontWeight: style.weight100}}> <a href="www.google.com"> <span style={{ textDecoration: style.underline }}> upd</span>ate a case </a> </p>
            </div>
        </div>  
    </>
    )
}

function Home() { 
    return (
        <WagmiConfig config={config}>
            <Profile/>
        </WagmiConfig>    
      );
} 
export default Home; 