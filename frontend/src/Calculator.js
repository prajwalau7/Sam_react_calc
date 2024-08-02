import React, { useState } from "react";
import axios from "axios";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("0");
  const [isInputActive, setIsInputActive] = useState(false);

  const handleButtonClick = (value) => {
    console.log(`Button clicked: ${value}`);

    if (value === "AC") {
      setInput("");
      setResult("0");
      setIsInputActive(false);
      return;
    }

    if (value === "C") {
      setInput((prevInput) => {
        const newInput = prevInput.slice(0, -1);
        console.log("Input after C:", newInput);
        return newInput;
      });
      return;
    }

    if (value === "=") {
      calculateResult();
      return;
    }

    setInput((prevInput) => {
      const newInput = prevInput + value;
      setIsInputActive(true);
      return newInput;
    });
  };

  const calculateResult = async () => {
    try {
      const response = await axios.post("http://localhost:5000/calculate", {
        expression: input,
      });
      console.log(response);
      setResult(response.data.result);
      setInput("");
      setIsInputActive(false);
    } catch (error) {
      console.error("Error calculating result:", error);
      setResult("Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-card rounded-lg shadow-lg p-4 w-80">
        <div className="text-3xl text-white text-right mb-4">
          {input || result}{" "}
        </div>
        <div className="bg-black p-2 rounded-lg">
          <div className="grid grid-cols-4 gap-2">
            {[
              "AC",
              "%",
              "+",
              "/",
              "7",
              "8",
              "9",
              "*",
              "4",
              "5",
              "6",
              "-",
              "1",
              "2",
              "3",
              "C",
              "0",
              ".",
              "=",
            ].map((button, index) => (
              <button
                key={index}
                className={`flex items-center justify-center text-xl font-bold ${
                  button === "AC" ||
                  button === "C" ||
                  button === "%" ||
                  button === "="
                    ? "bg-gray-600 text-white w-16 h-16 rounded-full"
                    : ["+", "-", "/", "*"].includes(button)
                    ? "bg-orange-500 text-white w-16 h-16 rounded-full"
                    : "bg-gray-800 text-white w-16 h-16 rounded-full"
                } ${
                  button === "0"
                    ? "col-span-2 h-16 bg-gray-800 text-white rounded-xl"
                    : ""
                }`}
                onClick={() => handleButtonClick(button)}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
