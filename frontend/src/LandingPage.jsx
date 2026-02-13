import React, { useState, useEffect } from 'react';
import './LandingPage.css';

const LandingPage = ({ onLaunch }) => {
    const [terminalLogs, setTerminalLogs] = useState([
        { id: 1, text: 'AGENT_INIT: RecoverAI Autonomous Protocol v2.0.4', type: 'system' },
        { id: 2, text: 'NET_STATUS: SKALE_CHAIN_103698795_CONNECTED', type: 'success' },
        { id: 3, text: 'WALLET_INIT: CDP_AGENT_WALLET_AUTHORIZED', type: 'info' },
    ]);

    useEffect(() => {
        const lines = [
            'ACP_SDK: Initializing Agent Commerce Protocol v0.3.0...',
            'NET_STATUS: VIRTUALS_PROTOCOL_PRIMARY_HUB_CONNECTED',
            'SCANNING: Risk Oracles (NOAA, Ground Sensors, Doppler)...',
            'X402_NEGOTIATION: ACP Job generated for Weather_API...',
            'BITE_V2: Threshold encryption keys rotated.',
            'AP2_MANDATE: Human guardrail listeners established.',
            'MONITORING: Waiting for parametric trigger...',
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < lines.length) {
                setTerminalLogs(prev => [...prev, { id: Date.now(), text: lines[i], type: 'action' }]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="landing-page">
            {/* Background Layer */}
            <div className="lp-background">
                <div className="lp-grid" />
                <div className="lp-grid-major" />
                <div className="lp-vignette" />
                <div className="lp-scanline" />
            </div>

            {/* Header */}
            <header className="lp-header">
                <div className="lp-logo">
                    <div className="lp-logo-box">R</div>
                    <div className="lp-logo-text">
                        <span>RecoverAI</span>
                        <small>PRO_VERSION</small>
                    </div>
                </div>
                <div className="lp-nav">
                    <span className="lp-virtuals-badge">Launched on VIRTUALS</span>
                    <span className="lp-nav-item">NETWORK: SKALE</span>
                    <span className="lp-nav-item">STATUS: <span className="pulse-text">ACTIVE</span></span>
                    <button className="lp-top-launch" onClick={onLaunch}>LAUNCH_</button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="lp-hero">
                <div className="lp-hero-content">
                    <div className="lp-hero-tag">AGENTIC_COMMERCE_INFRASTRUCTURE</div>
                    <h1>The Protocol for <br /><span className="gradient-text">Autonomous Risk.</span></h1>
                    <p>
                        An end-to-end agentic lifecycle for parametric insurance.
                        RecoverAI automates <strong>Discovery</strong>, <strong>Procurement</strong>,
                        <strong>Reasoning</strong>, and <strong>Settlement</strong> without intermediaries.
                    </p>
                    <div className="lp-hero-actions">
                        <button className="lp-launch-btn big" onClick={onLaunch}>
                            INITIALIZE AGENT_
                        </button>
                        <div className="lp-hero-stat">
                            <span className="stat-num">100%</span>
                            <span className="stat-desc">Autonomous Payouts</span>
                        </div>
                    </div>
                </div>

                {/* Hero Terminal Mockup */}
                <div className="lp-terminal-wrap">
                    <div className="lp-terminal">
                        <div className="lp-terminal-header">
                            <div className="dots"><span></span><span></span><span></span></div>
                            <div className="title">agent_console.log</div>
                        </div>
                        <div className="lp-terminal-body">
                            {terminalLogs.map(log => (
                                <div key={log.id} className={`log-line type-${log.type}`}>
                                    <span className="log-prompt">$</span>
                                    <span className="log-text">{log.text}</span>
                                </div>
                            ))}
                            <div className="log-cursor">▋</div>
                        </div>
                    </div>
                    <div className="lp-terminal-shadow"></div>
                </div>
            </section>

            {/* Lifecycle Timeline */}
            <section className="lp-section">
                <div className="section-header">
                    <h2>Lifecycle of an Agentic Claim</h2>
                    <p>The complete journey from event detection to instant payout.</p>
                </div>

                <div className="lp-lifecycle">
                    <div className="lifecycle-step">
                        <div className="step-num">01</div>
                        <div className="step-content">
                            <h3>Autonomous Discovery</h3>
                            <p>Agent continuously monitors decentralised oracles for parametric triggers (e.g. Wind Speed &gt; 100mph).</p>
                            <div className="step-badge">PROTOCOL: CDL</div>
                        </div>
                    </div>
                    <div className="lifecycle-step">
                        <div className="step-num">02</div>
                        <div className="step-content">
                            <h3>ACP Data Procurement</h3>
                            <p>Agent utilizes the Agent Commerce Protocol (ACP) to negotiate paywalls and procure data using CDP wallets.</p>
                            <div className="step-badge">TRACK: AGENT COMMERCE PROTOCOL</div>
                        </div>
                    </div>
                    <div className="lifecycle-step">
                        <div className="step-num">03</div>
                        <div className="step-content">
                            <h3>BITE v2 Encryption</h3>
                            <p>Sensitive policy data is sealed via SKALE BLS Threshold Encryption, unlocking only when conditions are verified.</p>
                            <div className="step-badge">TRACK: ENCRYPTED AGENTS</div>
                        </div>
                    </div>
                    <div className="lifecycle-step">
                        <div className="step-num">04</div>
                        <div className="step-content">
                            <h3>AP2 Settlement</h3>
                            <p>Google AP2 mandates ensure human-in-the-loop auditability for final settlement on Skale's gasless chain.</p>
                            <div className="step-badge">TRACK: BEST AP2 INTEGRATION</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive */}
            <section className="lp-section dark">
                <div className="section-header">
                    <h2>Core Infrastructure Specs</h2>
                    <p>Built on the bleeding edge of agentic commerce.</p>
                </div>

                <div className="lp-specs-grid">
                    <div className="spec-card">
                        <div className="spec-icon">🛡️</div>
                        <h3>SKALE BITE v2</h3>
                        <div className="spec-divider"></div>
                        <ul>
                            <li>Threshold Decryption (12/16)</li>
                            <li>Gasless Agent Settlements</li>
                            <li>BLS Verifiable Keys</li>
                        </ul>
                    </div>
                    <div className="spec-card">
                        <div className="spec-icon">💳</div>
                        <h3>Google AP2</h3>
                        <div className="spec-divider"></div>
                        <ul>
                            <li>Payment Mandate Flow</li>
                            <li>Verifiable Credentials</li>
                            <li>Human-loop Guardrails</li>
                        </ul>
                    </div>
                    <div className="spec-card">
                        <div className="spec-icon">🔄</div>
                        <h3>x402 Protocol</h3>
                        <div className="spec-divider"></div>
                        <ul>
                            <li>Pay-per-Tool Negotiator</li>
                            <li>Coinbase CDP Integration</li>
                            <li>Autonomous Receipt Audit</li>
                        </ul>
                    </div>
                </div>
            </section>


            {/* Core Infrastructure Partners Section */}
            <section className="lp-section tracks">
                <div className="section-header">
                    <h2>Core Infrastructure Partners</h2>
                    <p>RecoverAI is powered by a foundation of industry-leading agentic and commerce protocols.</p>
                </div>

                <div className="lp-tracks-grid">
                    <div className="track-card">
                        <div className="track-icon">⚡</div>
                        <h4>x402 Protocol</h4>
                        <p>Leveraging HTTP 402 for autonomous, internet-native micropayments.</p>
                    </div>
                    <div className="track-card">
                        <div className="track-icon">💎</div>
                        <h4>SKALE Network</h4>
                        <p>Utilizing BITE v2 for zero-gas threshold encryption and private settlements.</p>
                    </div>
                    <div className="track-card">
                        <div className="track-icon">☁️</div>
                        <h4>Google AP2</h4>
                        <p>Implementing Payment Mandates and Human-in-the-loop verification guardrails.</p>
                    </div>
                    <div className="track-card">
                        <div className="track-icon">🤖</div>
                        <h4>Virtuals Protocol</h4>
                        <p>ACP-Compliant commerce for cross-agent interoperability in the agentic economy.</p>
                    </div>
                    <div className="track-card">
                        <div className="track-icon">🛡️</div>
                        <h4>Coinbase CDP</h4>
                        <p>Autonomous on-chain wallet management and tool-based data procurement.</p>
                    </div>
                    <div className="track-card">
                        <div className="track-icon">⭕</div>
                        <h4>Circle USDC</h4>
                        <p>The global standard for stable, programmable value exchange and settlement.</p>
                    </div>
                </div>
            </section>

            <footer className="lp-footer">
                <div className="lp-footer-top">
                    <div className="lp-logo">
                        <div className="lp-logo-box">R</div>
                        <span>RecoverAI</span>
                    </div>
                    <button className="lp-launch-btn" onClick={onLaunch}>INITIALIZE_AGENT</button>
                </div>
                <div className="lp-footer-bottom">
                    <p>© 2026 RecoverAI | Built for San Francisco Agentic Commerce x402 Hackathon</p>
                    <div className="lp-footer-links">
                        <span>DOCS</span>
                        <span>AUDIT_LOG</span>
                        <span>GITHUB</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
