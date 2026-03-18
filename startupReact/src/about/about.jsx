import React from 'react';
import './about.css';

export function About() {
  return (
    <div className="about-container fade-in">
      <div className="about-hero">
        <h1 className="about-title">The Initiative <span>Origin</span></h1>
        <div className="accent-line"></div>
      </div>

      <div className="about-content grid-layout">
        <div className="glass-panel text-card">
          <h3>The Quest</h3>
          <p>
            <strong>5e Dice Tools</strong> is an enchanted grimoire crafted to empower your tabletop journeys. Built for grizzled veterans and fresh-faced heroes alike, it guarantees your critical strikes and tragic fumbles are recorded with honor in real
            time for all your friends to see.
          </p>
        </div>

        <div className="glass-panel text-card">
          <h3>The Arsenal</h3>
          <p>
            Featuring a mystical scrying orb, dynamic polyhedron casting, and real-time multiplayer tavern tables, it connects your party across the realm without the need for mundane travel.
          </p>
        </div>

        <div className="glass-panel text-card">
          <h3>The Archmage</h3>
          <p>
            A labor of love forged by <strong>Kirk McMasters</strong>—software artificer and avid Dungeon Master. Created to streamline the rolling of dice and elevate the narrative flow at his own table, now presented to all the realm.
          </p>
        </div>
      </div>
    </div>
  );
}