import Footer from "@/Components/Common/Footer";
import Navbar from "@/Components/Common/Navbar";
import ApplyProcess from "@/Components/HomePage/ApplyProcess";
import Banner from "@/Components/HomePage/Banner";
import CategoryGrid from "@/Components/HomePage/Categories";
import CompanySection from "@/Components/HomePage/CompanySection";
import FeatureSection from "@/Components/HomePage/FeatureSection";
import JobPosts from "@/Components/HomePage/JobPosts";
import NewsletterSection from "@/Components/HomePage/NewsLetter";
import PricingPlans from "@/Components/HomePage/PricingPlans";
import WhyChooseUs from "@/Components/HomePage/WhyChooseUs";
import WhyWeAreDifferent from "@/Components/HomePage/WhyWeAreDifferent";
import React from "react";

const index = () => {
  return (
    <>
      <Banner />
      <CategoryGrid />
      <FeatureSection />
      <JobPosts />
      <ApplyProcess />
      {/* <CompanySection/> */}
      <PricingPlans/>
      <WhyWeAreDifferent />
      <WhyChooseUs />
      <NewsletterSection/>
      <Footer />
      
    </>
  );
};

export default index;
