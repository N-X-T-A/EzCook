import React from "react";
import "../css/components/footer.css";
export default function Footer() {
  return (
    <footer className="w-full h-40 blue mt-5">
      <div className="h-1/2"></div>
      <div className="line bg-white"></div>
      <div className="flex justify-center items-center h-1/2 text-white text-xs">
        <span>© 2024 EzCook. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
