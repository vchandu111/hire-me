const plans = [
  {
    title: "Starter Plan",
    price: "Free",
    priceColor: "text-green-500",
    description: "Per month",
    details:
      "Our Starter Plan is perfect for individuals looking to get started with basic features and access.",
    buttonColor: "text-blue-500 border-blue-500",
  },
  {
    title: "Business Plan",
    price: "$39.00",
    priceColor: "text-orange-500",
    description: "Per month",
    details:
      "Get access to additional features and support with our Business Plan, tailored for growing teams.",
    buttonColor: "text-blue-500 border-blue-500",
  },
  {
    title: "Premium Plan",
    price: "$59.00",
    priceColor: "text-blue-500",
    description: "Per month",
    details:
      "Our Premium Plan offers all the advanced features for enterprise users and top-notch support.",
    buttonColor: "text-blue-500 border-blue-500",
  },
];

const PricingPlans = () => {
  return (
    <section className="py-16 mt-20 text-center">
      <h2 className="text-4xl font-bold mb-4">
        Choose a plan that's right for your business
      </h2>
      <p className="text-gray-500 mb-12">
        We offer various plans to cater to different needs, allowing you to grow
        and succeed.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
            <p className={`text-3xl font-bold ${plan.priceColor} mb-1`}>
              {plan.price}
            </p>
            <p className="text-gray-400 mb-4">{plan.description}</p>
            <p className="text-gray-500 mb-6">{plan.details}</p>
            <button
              className={`border-2 px-6 py-2 rounded-full font-semibold ${plan.buttonColor} hover:bg-blue-500 hover:text-white transition`}
            >
              Start Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingPlans;
