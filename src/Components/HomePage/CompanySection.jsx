const CompanySection = () => {
  const companies = [
    { name: "MailChimp", imgSrc: "/mailchimp.svg" },
    { name: "PayPal", imgSrc: "/paypal.svg" },
    { name: "Stripe", imgSrc: "/stripe.svg" },
    { name: "Visa", imgSrc: "/visa.svg" },
    { name: "Apple", imgSrc: "/apple.svg" },
    { name: "Tinder", imgSrc: "/tinder.svg" },
    { name: "Sony", imgSrc: "/sony.svg" },
    { name: "Airbnb", imgSrc: "/airbnb.svg" },
  ];

  return (
    <section className="py-16 text-center bg-white">
      <h2 className="text-3xl font-bold mb-4">Company We've Helped</h2>
      <p className="text-gray-500 mb-10">
        We take pride in connecting top talent with some of the world's leading
        brands, helping them drive success and innovation.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-center max-w-4xl mx-auto">
        {companies.map((company, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={company.imgSrc}
              alt={company.name}
              className="h-12 opacity-75"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanySection;
