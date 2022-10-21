import React from "react";

function ButtonSubmitLogin({email, password, label}) {
  return (
    <div className="grid justify-items-center">
      {!email && !password ? (
        <button
          type="submit"
          className="text-white bg-gray-500 font-medium rounded-lg 
                                        text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-not-allowed"
          disabled
        >
          {label}
        </button>
      ) : email && !password ? (
        <button
          type="submit"
          className="text-white bg-gray-500 font-medium rounded-lg 
                                        text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-not-allowed"
          disabled
        >
          {label}
        </button>
      ) : !email && password ? (
        <button
          type="submit"
          className="text-white bg-gray-500 font-medium rounded-lg 
                                        text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-not-allowed"
          disabled
        >
          {label}
        </button>
      ) : (
        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-gray-800  
                                        font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          {label}
        </button>
      )}
    </div>
  );
}

export default ButtonSubmitLogin;
