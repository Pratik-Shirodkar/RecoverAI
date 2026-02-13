# RecoverAI 🛡️
**The Autonomous Parametric Insurance Agent for Agentic Commerce**

Built for the **San Francisco Agentic Commerce x402 Hackathon**.

RecoverAI demonstrates a complete agentic commerce lifecycle: **Discovery → Paid Data Procurement (x402) → AI Risk Reasoning → Encrypted Policy Lifecycle (BITE v2) → Human-in-the-loop Authorization (AP2) → Settlement.**

## 🏗️ Architecture & SKALE Integration
- **Unified Backend**: Node.js/TypeScript (`backend/server.ts`) - Unified API for x402 Oracle, BITE v2, and AP2.
- **SKALE BITE v2 Integration**: 
  - **Encryption**: Uses SKALE Committee BLS keys (Chain ID: `103698795`) to encrypt sensitive policy data.
  - **Decryption**: Relies on SKALE Committee threshold decryption to release funds *only* when disaster conditions are met.
  - **Zero Gas**: Leverages SKALE's zero-gas architecture for seamless agent transactions.
- **Frontend**: React/Vite (`frontend/`) - High-fidelity glassmorphism dashboard.
- **Agent Logic**: Integrated into the frontend workflow (simulating an autonomous agent's decision loop).

## 🚀 Quickstart

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start Services
**Terminal 1: Unified Backend (Port 4000)**
```bash
cd backend
npx tsx server.ts
```

**Terminal 2: Frontend (Port 5174)**
```bash
cd frontend
npm run dev
```

### 3. Run the Demo
1. Open `http://localhost:5174`.
2. Observe the **Budget Manager** ($10.00 USDC cap).
3. Click **"⚡ Simulate Hurricane"**.
4. Execution Flow:
   - **Phase 1 (x402)**: Agent hits 402 paywall on Weather Oracle, pays 0.01 USDC (Compatible with SKALE/Base).
   - **Phase 2 (x402)**: Agent hits 402 paywall on Risk Analysis, pays 0.02 USDC.
   - **Phase 3 (BITE)**: Policy data is **encrypted on SKALE Chain (BITE v2 Sandbox)**.
   - **Phase 4 (AP2)**: Agent creates a Payment Mandate; UI triggers **Human Authorization**.
   - **Phase 5 (Settlement)**: Payout settled on-chain after user approval.

## 🛠️ Key Technologies & Track Alignments
- **SKALE BITE v2 (Encrypted Agents)**: **CORE INTEGRATION.** We actively use the BITE v2 Sandbox (Chain 103698795) for:
  - **Threshold Encryption**: Securing the payout transaction so it *cannot* be executed until the Oracle verifies the storm.
  - **Committee Decryption**: The SKALE nodes themselves hold the decryption keys, enforcing the insurance logic trustlessly.
- **x402 (Agentic Tool Usage)**: Implements real 402 → pay → retry flow for two distinct tool calls (Weather & Risk).
- **Google AP2 (Best Integration)**: Follows the Intent → Authorization → Settlement pattern with verifiable receipts.
- **Coinbase CDP**: Simulated wallet signing for all x402 and AP2 transactions.
- **Budget Manager**: Autonomous guardrails preventing overspend or unauthorized tool usage.

## 🧾 Audit Trail
The system maintains a structured JSON audit log of every step, including cost reasoning, TX hashes, and mandate statuses, meeting the "Receipts/Logs" requirement for all tracks.

