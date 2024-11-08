const NewsletterSection = () => {
    return (
      <section className="bg-blue-900 text-white py-12 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Subscribe to our Newsletter</h2>
          <p className="text-gray-300 mb-6">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in.
          </p>
          <div className="flex justify-center">
            <form className="flex w-full max-w-lg">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-2 rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-r-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  };
  
  export default NewsletterSection;
  