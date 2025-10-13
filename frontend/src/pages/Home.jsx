import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Suggestions from "../components/Suggestions";
import DriverSection from "../components/DriverSection";
import BusinessSection from "../components/BusinessSection";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <Suggestions />
      <DriverSection />
      <BusinessSection />
      <AppDownload />
      <Footer />
    </div>
  );
}
