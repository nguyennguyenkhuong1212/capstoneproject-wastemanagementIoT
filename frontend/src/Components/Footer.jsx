import React, { useState } from "react";
import './footer.css';

function Footer() {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubscribe = () => {
        // Handle subscription logic here
        console.log(`Subscribed with email: ${email}`);
        // For example, you could send the email to a server or show a message to the user
    };

    return (
        <footer className="footer">
            <div className="footer-content">
            <div className="footer-column">
                <h3>Waste Management IOT</h3>
                <p>Our product is a smart sensor that detects the amount of trash within the bin and provides the shortest path for the trash truck to collect the full bin.</p>
                <p>© TechTitans</p>
            </div>

            <div className="footer-column">
                <h3>Get in Touch</h3>
                <p className="contact-info">Address: 123 Tech Street, Tech City</p>
                <p className="contact-info">Phone: +1 (123) 456-7890</p>
                <p className="contact-info">Email: contact@techtitans.com</p>
            </div>

            <div className="footer-column">
                <h3>Subscribe</h3>
                <div className="subscription-form">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                    />
                    <button onClick={handleSubscribe} className="subscribe-button">Subscribe</button>
                </div>
            </div>
            </div>
        </footer>
    );
}

export default Footer;