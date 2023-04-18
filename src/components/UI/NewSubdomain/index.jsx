const NewSubdomainModal = ({ setVisibility }) => {
  return (
    <>
      <section
        onClick={() => setVisibility(false)}
        className="fixed w-full bottom-0 right-0 left-0 top-0 bg-[#000000e0] z-50 flex items-center justify-center"
      ></section>
      <div
        onClick={() => console.log("inside")}
        className="bg-white w-[400px] fixed -translate-y-[50%] z-[51] -translate-x-[50%] left-[50%] top-[50%] py-10 flex flex-col items-center rounded-lg"
      >
        <h2 className="text-xl font-bold">Subdomain Name</h2>
        <input
          type="text"
          className="bg-[#212121] text-center mt-3 mb-5 rounded-lg p-2 text-white"
        />

        <div className="flex gap-2">
          <button
            onClick={() => setVisibility(false)}
            className="p-2 bg-[#656565] rounded-lg text-white"
          >
            Cancel
          </button>
          <button className="p-2 bg-[#474747] rounded-lg text-white">
            Create Sudomain
          </button>
        </div>
      </div>
    </>
  );
};

export default NewSubdomainModal;
