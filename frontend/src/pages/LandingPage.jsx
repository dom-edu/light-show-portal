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
              <h1>Welcome to Our Project</h1>
              <p className="lead">
                A student project enabling interactive control of a hardware device through a web interface.
              </p>
            </div>
            <div className="col-md-6">
            <div className="hardware-image-placeholder">
                <img 
                    src="images/temporaryCube.jpg" 
                    alt="Hardware Control Interface"
                />
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
              <p>See the results of your actions.</p>
            </div>
            <div className="col-md-4 feature-card">
              <div className="feature-icon mb-3">🔒</div>
              <h3>Secure Access</h3>
              <p>Protected connection ensuring only authorized users can control the hardware.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;