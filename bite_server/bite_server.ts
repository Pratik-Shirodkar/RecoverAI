import express from 'express';
// import { BITE } from '@skalenetwork/bite-ts'; // Uncomment when installed
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// MOCK: In production, this connects to SKALE chain.
// For the demo, we simulate the "Encryption/Decryption" flow.

// The "Secret" Payout Key that we want to hide until the disaster happens
// In a real world, this would be a Private Key or a Seed Phrase that allows the contract interaction
const PAYOUT_PRIVATE_KEY = "0xSECRET_KEY_THAT_UNLOCKS_MILLIONS";

app.post('/encrypt-policy', async (req, res) => {
    // 1. We pretend to encrypt this secret condition
    console.log("🔒 Encrypting Policy with SKALE BITE...");

    res.json({
        encrypted_blob: "0xEncryptedBlob_BITE_v2_Signature_" + Date.now(),
        condition: "Weather == HURRICANE"
    });
});

app.post('/decrypt-claim', async (req, res) => {
    const { condition_met } = req.body;

    if (condition_met) {
        console.log("⚡ Condition Met! Decrypting via SKALE Committee...");
        // Simulate network delay
        setTimeout(() => {
            res.json({
                decrypted_secret: PAYOUT_PRIVATE_KEY,
                status: "CLAIM_APPROVED"
            });
        }, 1000);

    } else {
        res.status(403).json({ error: "Condition not met. Secret remains encrypted." });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🔐 BITE Server running on port ${PORT}`));
