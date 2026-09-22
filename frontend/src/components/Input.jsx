import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Input = React.forwardRef(
  ({ type, value, setValue, placeHolder, className, ...props }, ref) => {
    const pRef = useRef(null);
    const [textFlow, setTextFlow] = useState(false);

    const focusHandler = () => {
      setTextFlow(true);
    };

    const blurHandler = () => {
      if (!value) setTextFlow(false);
    };

    useGSAP(() => {
      if (textFlow) {
        gsap.to(pRef.current, {
          top: -10,
          duration: 0.1,
        });
      } else {
        gsap.to(pRef.current, {
          top: 12,
          duration: 0.1,
        });
      }
    }, [textFlow]);

    return (
      <div
        onFocus={focusHandler}
        onBlur={blurHandler}
        className="relative font-outfit"
      >
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeHolder}
          className={`py-2 px-4 rounded-md font-poppins text-dark border-[1px] border-gray-300 w-full outline-none z-10`}
          {...props}
        />
      </div>
    );
  },
);

export default Input;
