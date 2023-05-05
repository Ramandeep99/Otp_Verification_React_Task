
import './OTP.css';
import React, { useState } from "react";

const Otp = () => {
    const [values, setValues] = useState([
        { id: 1, value: "" },
        { id: 2, value: "" },
        { id: 3, value: "" },
        { id: 4, value: "" },
        { id: 5, value: "" },
        { id: 6, value: "" },
    ]);

    const inputChangeHandler = (event, idx) => {
        // if (isNaN(event.target.val)) return;
        // console.log("hi");
        let value = event.target.value;

        const regesx = /^(?:\d+(\.\d+)?|\.)?$/;
        if (!value.match(regesx)) return;

        if (value.length === 6) {
            setValues((prevValues) => {
                for (let i = 0; i < value.length; i++) {
                    prevValues[i].value = value[i];
                }
                return [...prevValues];
            });
            return;
        }

        if (value.length > 1) {
            value = value[1];
        }
        setValues((prvValues) => {
            // console.log("hi");
            prvValues[idx].value = value;
            return [...prvValues];
        });
        let element = event.target;
        if (element.nextSibling && event.target.value !== "" && idx < 5) {
            element.nextSibling.focus();
        }
        if (value === "" && element.previousSibling) {
            element.previousSibling.focus();
        }
    };

    const handleKeyPress = (event, idx) => {
        // console.log("hi");
        if (event.key === "ArrowRight" && event.target.nextSibling) {
            event.preventDefault();
            event.target.nextSibling.focus();
        }
        if (event.key === "ArrowLeft" && event.target.previousSibling) {
            event.preventDefault();
            let element = event.target.previousSibling;
            element.focus();
            element.setSelectionRange(1, 1);
        }
    };

    const verifyOtp = () => {
        let otp = "";
        for (let i = 0; i < values.length; i++) {
            otp = otp + values[i].value;
        }
        console.log(otp);
    };

    return (
        <div>
          <h1 id='heading'>Phone Verification</h1>
          <hr />
          <p id='text1'>Enter the OTP received on 8930X-XXXXX</p>
          <div id='input_parent'>
            {values.map((val, idx) => {
                return (
                  
                    <input 
                        type="text"
                        value={val.value}
                        onChange={(e) => {
                            inputChangeHandler(e, idx);
                        }}
                        key={val.id}
                        onKeyDown={(event) => {
                            handleKeyPress(event, idx);
                        }}
                    />
                    
                );
            })}
            </div>
            <div id="btns">
              <a href='' id="changeNum">Change Number</a>
              <a href='' id="resend">Resend OTP</a>
            </div>
            <div id="verify_btn">
              <button
                  onClick={() => {
                      verifyOtp();
                  }}
              >
                  Verify Phone Number
              </button>
            </div>
        </div>
    );
};

export default Otp;