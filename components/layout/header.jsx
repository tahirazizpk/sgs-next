"use client";
import React from "react";
import { TopBar } from "./topBar";

const Header = () => {
  return (
    <div className="w-100 text-white text-xs">
      <div className="container-fluid w-100  m-auto">
        <div className="row d-flex w-100 text-center">
          <TopBar />
        </div>
      </div>
    </div>
  );
};

export default Header;
