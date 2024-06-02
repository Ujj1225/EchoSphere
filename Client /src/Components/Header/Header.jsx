

const Header = ({startTour}) => {
  return (
    <div className="header-section">
      <header className="w-screen h-32 border-b-2 border-gray-300 flex justify-between items-center px-8 py-4">
        {/* Logo Section */}

        <img
          src="../src/assets/images/Analysis Logo.png"
          alt="Logo"
          className="mx-32 h-60 mt-4"
        />
        {/* Navigation section */}
        <div className="flex">
          <div class="flex justify-end items-end mb-2">
            <ul class="flex gap-10">
              <li class="text-gray-600 hover:text-purple-700 cursor-pointer">
                <a href="/Hero-section" class="block">
                  About
                </a>
              </li>
              <li class="text-gray-600 hover:text-purple-700 cursor-pointer">
                Report
              </li>
              <li class="text-gray-600 hover:text-purple-700 cursor-pointer">
                <a href="/our-team" class="block">
                  Our Team
                </a>
              </li>
            </ul>
          </div>

          <button
            onClick={startTour}
            className="mx-28 bg-indigo-700 text-white  text-xl px-3 py-2 rounded-2xl hover:bg-violet-400"
          >
            Take A Tour
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
