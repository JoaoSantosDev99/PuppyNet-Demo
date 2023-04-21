import discord from "../../assets/icons/discordia.png";
import telegram from "../../assets/icons/telegram.png";
import twitter from "../../assets/icons/twitter.png";
import medium from "../../assets/icons/medium.png";

const Footer = () => {
  return (
    <footer className="w-full flex text-[#ffffff] text-2xl font-bold px-1 justify-center">
      <div className="max-w-screen-2xl rounded-xl mb-2 bg-[#1e1e1e] w-full py-8 flex flex-col items-center">
        {/* <h2 className="font-bold text-[#a2e41d] text-2xl sm:text-4xl">
          Shibarium Name Service
        </h2>
        <p className="text-[#a2e41d]">Every dog needs a name.</p>
        <ul className="flex justify-center gap-2 mb-10 mt-3">
          <li>
            <a href="https://t.me/dogtag_id" target="_blank" rel="noreferrer">
              <img src={telegram} alt="telegram" className="w-10" />
            </a>
          </li>
          <li>
            <a title="Coming Soon!">
              <img src={discord} alt="discord" className="w-10" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/dogtag_id"
              rel="noreferrer"
              target="_blank"
            >
              <img src={twitter} alt="twitter" className="w-10" />
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/dogtag-id"
              rel="noreferrer"
              target="_blank"
            >
              <img src={medium} alt="medium" className="w-10" />
            </a>
          </li>
        </ul>
        <span className="font-medium italic text-[#4776fa]">
          &trade; Shibarium 2023, All Rights Reserved
        </span> */}
        Footer
      </div>
    </footer>
  );
};
export default Footer;
