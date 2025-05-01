import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>Control Your Hardware Remotely</h1>
              <p className="lead">
                A student project enabling interactive control of hardware devices through a web interface.
              </p>
            </div>
            <div className="col-md-6">
              <div className="hardware-image-placeholder">
                {/* Replace with your hardware image */}
                <div className="placeholder-box">Hardware Image</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Key Features</h2>
          <div className="row">
            <div className="col-md-4 feature-card">
              <div className="feature-icon mb-3">⚙️</div>
              <h3>Real-time Control</h3>
              <p>Interact with hardware components instantly through our responsive interface.</p>
            </div>
            <div className="col-md-4 feature-card">
              <div className="feature-icon mb-3">📊</div>
              <h3>Visual Feedback</h3>
              <p>See the results of your actions with live data visualization.</p>
            </div>
            <div className="col-md-4 feature-card">
              <div className="feature-icon mb-3">🔒</div>
              <h3>Secure Access</h3>
              <p>Protected connection ensuring only authorized users can control the hardware.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 bg-light">
        <div className="container text-center">
          <h2>Ready to Control Your Hardware?</h2>
          <p className="lead mb-4">Sign up now to get access to the hardware control panel.</p>
          <button className="btn btn-primary btn-lg">
            Start Controlling
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;