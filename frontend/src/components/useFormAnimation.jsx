import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useFormAnimation(ref) {
  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, { scope: ref });
}
