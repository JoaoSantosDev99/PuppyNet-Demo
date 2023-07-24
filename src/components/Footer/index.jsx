import discord from "../../assets/icons/discordia.png";
import telegram from "../../assets/icons/telegram.png";
import twitter from "../../assets/icons/twitter.png";
import medium from "../../assets/icons/medium.png";

const Footer = () => {
  return (
    <footer className="w-full flex text-[#ffffff] bg-[#1e1e1e] text-xl font-bold justify-center">
      <div className="max-w-screen-2xl w-full py-1 flex flex-col items-center">
        <div class="p-4 text-center text-gray-200">
          © 2023 Copyright:
          <a
            class="ml-4 text-gray-300"
            href="/"
          >
            Shibarium Name System
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
