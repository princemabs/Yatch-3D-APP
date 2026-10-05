"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const fleetLinks = ["Motor Yachts", "Sailing Yachts", "Luxury Catamarans", "Mega Yachts", "New Additions"];
const destLinks = ["Newport & New England", "The Bahamas", "French Riviera", "Amalfi Coast", "Greek Cyclades"];

export function Footer() {
  const [sent, setSent] = useState(false);

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <a className="brand" href="#top" aria-label="Aventis Yacht Charters">
              <Image className="brand__mark" src="/images/logo.svg" alt="" width={40} height={40} />
              <span className="brand__text">
                <span className="brand__name">AVENTIS</span>
                <span className="brand__sub">Yacht Charters</span>
              </span>
            </a>
            <p className="footer__bio">
              Crafting extraordinary maritime journeys with bespoke itineraries and world-class
              hospitality since 1988.
            </p>
          </div>

          <div className="footer__col">
            <h4>Fleet</h4>
            <ul>
              {fleetLinks.map((l) => (
                <li key={l}>
                  <a href="#fleet">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Destinations</h4>
            <ul>
              {destLinks.map((l) => (
                <li key={l}>
                  <a href="#destinations">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Charter Concierge</h4>
            <p className="footer__bio" style={{ marginTop: 0 }}>
              Receive curated seasonal itineraries.
            </p>
            <form
              className="footer__news"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                type="email"
                required
                placeholder={sent ? "Subscribed — thank you" : "Your email address"}
                aria-label="Email address"
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                <ArrowRight size={18} />
              </button>
            </form>
            <div className="footer__contact">
              <span>
                <Phone size={15} /> +1 (800) 555-YACHT
              </span>
              <span>
                <Mail size={15} /> charter@aventisyachts.com
              </span>
              <span>
                <MapPin size={15} /> Commercial Wharf, Newport, RI
              </span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Aventis Yacht Charters. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Charter</a>
            <a href="#">Maritime Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
