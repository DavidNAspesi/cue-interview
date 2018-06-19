import React from "react";
import Link from 'react-router-dom/Link';
import * as Helpers from "helpers";
import Settings from 'Settings';

export default class Footer extends React.Component {
  render() {
    const partnerSettings = Helpers.getPartnerSettings();

    return (
      <div class="footer">
        <div class="footer-wrap">
          <div class="footer-selections">
            <div class="footer-section">
              <div class="footer-image">
                { partnerSettings ?
                  <img src={Settings.assetsServer + "/img/powered_by.svg"} />
                  :
                  <img src={Settings.assetsServer + "/img/cue_logo_white.svg"} />
                }
              </div>
              <div class="footer-text">
                Discover, purchase and manage the best software and services for your business. All in one place.
              </div>
              Call us at <a href={"tel:" + Settings.supportPhone}>{Settings.supportPhone} <small>({Settings.supportHours})</small></a> and we'll help you get started.
            </div>
            <div class="footer-section">
              <div class="footer-header">
                Navigation
              </div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/why">Why CUE?</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><a href="https://cuemarketplace.applytojob.com/" target="_blank">Careers</a></li>
                <li><Link to="/marketplace">Visit Marketplace</Link></li>
              </ul>
            </div>
            <div class="footer-section">
              <div class="footer-header">
                Follow Us
              </div>
              <ul>
                <li><a href="/blog" target="_blank">Small Business Blog</a></li>
                <li><a href="https://www.linkedin.com/company/10806125" target="_blank">LinkedIn</a></li>
                <li><a href="https://twitter.com/cuemarketplace" target="_blank">Twitter</a></li>
                <li><a href="https://www.facebook.com/cuemarketplace/" target="_blank">Facebook</a></li>
                <li><a href="https://www.youtube.com/channel/UCUdVvWVMvdFrAx-e55Q46Ew" target="_blank">YouTube</a></li>
                <li><Link to="/news">CUE News</Link></li>
              </ul>
            </div>
          </div>
          <div class='copyright-line'>
            <span class='copyright'>
              Copyright &copy; 2018
            </span>
            |
            <Link to="/">CUE</Link>
            |
            <Link to="/privacy" target="_blank">Privacy Policy</Link>
            |
            <Link to="/terms" target="_blank">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    );
  }
}
