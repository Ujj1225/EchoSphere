import React, { useState, useEffect } from "react";
import Choose from "../Components/Choose";
import Features from "../Components/Features";
import FeedbackForm from "../Components/FeedbackForm/FeedbackForm";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Hero from "../Components/Hero";

import Layout from "../Layout/Layout";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

const LandingPage = () => {
  const [tourActivated, setTourActivated] = useState(false);

  useEffect(() => {
    if (tourActivated) {
      const tour = new Shepherd.Tour({
        defaultStepOptions: {
          cancelIcon: {
            enabled: true,
          },
          classes: "shadow-md bg-purple-dark",
          scrollTo: { behavior: "smooth", block: "center" },
        },
      });

      tour.addStep({
        title: "Welcome to EchoSphere",
        text: 'This is our landing page! Let\'s take a tour to explore what we have to offer. Click "Next" to begin.',
        attachTo: {
          element: ".hero-section",
          on: "bottom",
        },
        buttons: [
          {
            action() {
              return this.next();
            },
            text: "Next",
          },
          {
            action() {
              return this.cancel();
            },
            text: "Exit",
          },
        ],
      });

      tour.addStep({
        title: "Discover Our Features",
        text: "Explore our key features that make us unique. Scroll down to learn more.",
        attachTo: {
          element: ".features-section",
          on: "bottom",
        },
        buttons: [
          {
            action() {
              return this.next();
            },
            text: "Next",
          },
          {
            action() {
              return this.cancel(); // Exit the tour
            },
            text: "Exit",
          },
        ],
      });

      tour.addStep({
        title: "Why Choose Us?",
        text: "Explore why choosing us is the right decision for you.",
        attachTo: {
          element: ".choose-section",
          on: "bottom",
        },
        buttons: [
          {
            action() {
              return this.next();
            },
            text: "Next",
          },
          {
            action() {
              return this.cancel(); // Exit the tour
            },
            text: "Exit",
          },
        ],
      });

      tour.addStep({
        title: "Share Your Thoughts",
        text: "We value your feedback! Share your thoughts, suggestions, or issues with us.",
        attachTo: {
          element: ".feedback-section",
          on: "bottom",
        },
        buttons: [
          {
            action() {
              return this.next();
            },
            text: "Next",
          },
          {
            action() {
              return this.cancel();
            },
            text: "Exit",
          },
        ],
      });

      tour.addStep({
        title: "Stay Connected",
        text: "Stay connected with us through our social media channels.",
        attachTo: {
          element: ".footer-section",
          on: "bottom",
        },
        buttons: [
          {
            action() {
              return this.cancel(); // Exit the tour
            },
            text: "Exit",
          },
        ],
      });

      tour.start();

      return () => {
        tour.complete();
      };
    }
  }, [tourActivated]);

  return (
    <>
      <Layout>
        <Header startTour={() => setTourActivated(true)} />
        <Hero />
        <Features />
        <Choose />
        <FeedbackForm />
        <Footer />
      </Layout>
    </>
  );
};

export default LandingPage;
