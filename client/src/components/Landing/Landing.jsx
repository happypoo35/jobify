import heroImg from "assets/images/main-alternative.svg";
import { Logo } from "components/Common";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <header className="header-landing container fixed">
        <Logo />
      </header>
      <main className="main-landing container fixed">
        <section className="content" aria-label="Welcome to jobify">
          <div className="info">
            <h1 className="h1">
              Job <span>Tracking</span> App
            </h1>
            <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings brunch
              narwhal.
            </p>
            <Link to="/login" className="btn btn-hero">
              Get started
            </Link>
          </div>
          <img src={heroImg} alt="job hunt" className="image" />
        </section>
      </main>
    </>
  );
};

export default Landing;
