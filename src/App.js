import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./Home";
import User from "./user";
import Domain from "./Domain";
import { ethers } from "ethers";
import registryAbi from "./contracts/registry_abi.json";
import puppy from "./assets/dog.png";

function App() {
  // const [backTop, setBackTop] = useState(false);
  const [domain, setDomain] = useState();
  const [totalDomains, setTotalDomains] = useState(0);
  const [domainList, setDomainList] = useState([]);
  const registryAddress = "0xa3e95A1a797711b779d3B70aA4B8380d6b1cf5BF";

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const readRegistryContract = new ethers.Contract(
    registryAddress,
    registryAbi,
    staticProvider
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      const rawTotalSupply = await readRegistryContract.totalSupply();
      const totalSupply = ethers.utils.formatUnits(rawTotalSupply, 0);

      setTotalDomains(totalSupply);
      console.log("Total supply:", totalSupply);

      let totalData = [];
      for (let i = 0; i < totalSupply; i++) {
        const owner = await readRegistryContract.ownerOf(i);
        const domain = await readRegistryContract.tokenToDomain(i);
        totalData.push({ owner: owner, domain: domain });
      }

      setDomainList(totalData);
      console.log("app:", totalData);
    };

    // fetchInitialData();
  }, []);

  // useEffect(() => {
  //   const handleShadow = () => {
  //     if (window.scrollY >= 200) {
  //       setBackTop(true);
  //     } else {
  //       setBackTop(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleShadow);
  // }, []);

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0 });
  // };

  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <div className="bg-[#40a7bef0] text-white font-bold w-full flex justify-center gap-4 items-center p-2">
          This is a demo running on Puppynet{" "}
          <img
            src={puppy}
            alt=""
            className="w-7 h-7"
          />
        </div>
        {/* Back to top */}
        {/* {backTop && (
          <button
            onClick={scrollToTop}
            title="back to top"
            className="fixed border-2 bg-[#FFF3C6] border-[#8B6E48] right-2 bottom-24 md:right-10 md:bottom-10 p-2 rounded-xl"
          >
            <img
              src={top}
              alt="paw"
              className="w-10 md:w-12"
            />
          </button>
        )} */}

        <Routes>
          <Route
            path="/"
            element={<Home setter={setDomain} />}
          />
          <Route
            path="/:id"
            element={
              <Domain
                setter={setDomain}
                domain={domain}
              />
            }
          />

          <Route
            path="/user"
            element={<User />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
