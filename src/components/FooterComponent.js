import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <div className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4 offset-1 col-sm-2">
            <h4>Links</h4>
            <ul className="list-unstyled offset-1 text-uppercase">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/favorites">My favorites</Link>
              </li>
              <li>
                <Link to="/contactus">Contact us</Link>
              </li>
            </ul>
          </div>
          <div className="col-7 col-sm-5">
            <h4>Our Address</h4>
            <address className="offset-1">
              Fake Street 123
              <br />
              Fake City
              <br />
              Germany
              <br />
              <i className="fa fa-phone fa-lg"></i> : + (0) 123 456 789
              <br />
              <i className="fa fa-fax fa-lg"></i> : ++ (0) 123 456 789
              <br />
              <i className="fa fa-envelope fa-lg"></i> :{" "}
              <a href="mailto:treatUrHunger@food.net">treatUrHunger@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-4 align-self-center">
            <div className="text-center">
              <a
                className="btn btn-social-icon btn-google"
                href="http://google.com/+"
              >
                <i className="fa fa-google-plus"> </i>
              </a>

              <a
                className="btn btn-social-icon btn-facebook"
                href="http://www.facebook.com/"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                className="btn btn-social-icon btn-linkedin"
                href="http://www.linkedin.com/"
              >
                <i className="fa fa-linkedin"></i>
              </a>
              <a
                className="btn btn-social-icon btn-twitter"
                href="http://twitter.com/"
              >
                <i className="fa fa-twitter"></i>
              </a>
              <a
                className="btn btn-social-icon btn-google"
                href="http://youtube.com/"
              >
                <i className="fa fa-youtube"></i>
              </a>
              <a
                className="btn btn-social-icon btn-yahoo"
                href="mailto: treatUrHunger@food.net"
              >
                <i className="fa fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        <br />
        <div className="row justify-content-center">
          <div className="col-auto">
            <p>&copy; Copyright 2019 Treat Ur Hunger</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
