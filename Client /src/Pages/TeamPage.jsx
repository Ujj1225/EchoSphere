import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../Components/Header";
import Layout from "../Layout/Layout";
import Footer from "../Components/Footer";

const AboutPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Header />
      <Layout>
        <div className="flex justify-center items-center my-24 mb-32">
          <section className="flex flex-col gap-20 justify-center items-center">
            {/* Top section */}
            <div className="flex flex-col items-center">
              <h1 className="text-6xl font-bold text-center">
                <span className="relative inline-block">
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-black"></span>
                  <span className="text-black font-bold font-sans">
                    Developer
                  </span>
                </span>
              </h1>
            </div>
            <div className="flex justify-center items-center">
              <TeamMember
                imageSrc="https://avatars.githubusercontent.com/u/97169735?v=4"
                name="Ujjwal Jha"
                role="Computer Engineering Student"
                description="Pulchowk Campus student in computer engineering, committed to pushing boundaries, breaking barriers, and leaving a mark of excellence in the world of technology"
                FacebookLink="#"
                InstagramLink="#"
                TwitterLink="#"
                GitHubLink="https://github.com/Ujj1225"
              />
            </div>
          </section>
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

const TeamMember = ({
  imageSrc,
  name,
  role,
  description,
  FacebookLink,
  GitHubLink,
  TwitterLink,
  InstagramLink,
}) => {
  return (
    <div className="rounded-2xl shadow-md p-6 bg-stone-50 hover:shadow-lg transition duration-300 transform hover:scale-105 hover:bg-blue-400 flex flex-col items-center justify-center">
      <img
        src={imageSrc}
        className="team-img h-40 w-40 mb-4 rounded-full object-cover"
        alt={`${name}'s Photo`}
      />
      <h3 className="text-xl font-bold mb-2 text-center uppercase">{name}</h3>
      <div className="team-info mb-4 text-center">
        <p className="text-gray-600 text-sm italic">{role}</p>
      </div>
      <p className="text-gray-600 text-center">{description}</p>

      {/* Adding icons */}
      <ul className="team-icon flex justify-center mt-4 space-x-4">
        {FacebookLink && (
          <a href={FacebookLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook text-blue-500 hover:text-blue-700"></i>
          </a>
        )}
        {TwitterLink && (
          <a href={TwitterLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter text-blue-400 hover:text-blue-600"></i>
          </a>
        )}
        {GitHubLink && (
          <a href={GitHubLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github text-gray-700 hover:text-gray-900"></i>
          </a>
        )}
        {InstagramLink && (
          <a href={InstagramLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram text-pink-500 hover:text-pink-700"></i>
          </a>
        )}
      </ul>
    </div>
  );
};

TeamMember.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  FacebookLink: PropTypes.string.isRequired,
  GitHubLink: PropTypes.string.isRequired,
  InstagramLink: PropTypes.string.isRequired,
  TwitterLink: PropTypes.string.isRequired,
};

export default AboutPage;
