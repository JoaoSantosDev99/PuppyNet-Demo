import { longAddressCrop } from "../../../utils/index";
import copy from "../../../assets/icons/copy.png";
import check from "../../../assets/icons/check.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

const SubdomainInfo = ({
  setVisibility,
  Name,
  Owner,
  Desc,
  Email,
  Avatar,
  Webs,
}) => {
  const [copied, setCopied] = useState(false);

  const changeCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <section
        onClick={() => setVisibility(false)}
        className="fixed w-full bottom-0 right-0 left-0 top-0 bg-[#000000e0] z-50 flex items-center justify-center"
      ></section>
      <div className="bg-white w-[400px] px-3 fixed -translate-y-[50%] z-[51] -translate-x-[50%] left-[50%] top-[50%] py-10 flex flex-col items-center rounded-lg">
        <h2 className="text-xl font-bold">Subdomain Info:</h2>

        <img
          src={Avatar}
          alt="prof-pic"
          className="w-32 flex justify-center mt-2 items-center h-32 border border-black rounded-md"
        />
        <h2 className="text-xl font-bold mt-5">{Name}</h2>
        <ul className="flex mt-4 flex-col items-center text-center">
          <li className="flex items-center justify-center gap-2">
            <span className="font-bold">Owner:</span> {longAddressCrop(Owner)}{" "}
            <CopyToClipboard text={Owner}>
              <button
                onClick={changeCopy}
                className="flex justify-center items-center"
              >
                <img
                  src={copied ? check : copy}
                  alt=""
                  className="w-5 h-5 flex justify-center items-center"
                />
              </button>
            </CopyToClipboard>
          </li>
          <li>
            <span className="font-bold">Description:</span> {Desc}
          </li>
          <li>
            <span className="font-bold">Email:</span> {Email}
          </li>
          <li>
            <span className="font-bold">Website:</span>
            {Webs}
          </li>
        </ul>
      </div>
    </>
  );
};

export default SubdomainInfo;
