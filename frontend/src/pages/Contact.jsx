import React from "react";

const Contact = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-danger">Contact Us</h2>
      <p>Have a question or suggestion? Reach out to us!</p>
      
      <h4>Contact Information:</h4>
      <ul>
        <li>Email: ashlesh@savoryshare.com</li>
        <li>Phone: +91 1122334455</li>
        <li>Address: 123 Recipe Street, Bangalore</li>
      </ul>

      <h4>Follow Us:</h4>
      <p>
        Stay updated with the latest recipes and features:
        <br />
        <a href="#" className="text-danger">Facebook</a> | <a href="#" className="text-danger">Instagram</a> | <a href="#" className="text-danger">Twitter</a>
      </p>
    </div>
  );
};

export default Contact;
