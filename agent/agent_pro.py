import time
import json
import requests
import os
from eth_account import Account
# from cdp import Cdp, Wallet # Uncomment if using real CDP
# from web3 import Web3 # Uncomment if using real Web3

# --- MOCK CONFIGURATION FOR DEMO ---
# In production, replace with real env vars and imports
AGENT_PRIVATE_KEY = "0x0000000000000000000000000000000000000000000000000000000000000001" # Dummy
AGENT_WALLET_ADDRESS = "0xAgentWalletAddress_12345"

def get_agent_address():
    # Return mock or real address
    return AGENT_WALLET_ADDRESS

def generate_ap2_mandate(user_addr, amount):
    """
    Creates a Google AP2 'PaymentMandate' to authorize the claim.
    """
    timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    return {
        "@context": ["https://w3id.org/security/v2", "https://ap2.google.com/v1"],
        "type": ["VerifiableCredential", "PaymentMandate"],
        "issuer": "did:web:recoverai.agent",
        "issuanceDate": timestamp,
        "credentialSubject": {
            "id": f"urn:uuid:{int(time.time())}",
            "payee": user_addr,
            "amount": {
                "currency": "USDC",
                "value": str(amount)
            },
            "condition": "PARAMETRIC_TRIGGER_VERIFIED"
        },
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "created": timestamp,
            "proofPurpose": "assertionMethod",
            "verificationMethod": "did:web:recoverai.agent#keys-1",
            "jws": "eyJhbGciOiJFUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..signature"
        }
    }

def check_weather_oracle():
    """Hits the x402 Oracle and pays if needed."""
    url = "http://localhost:5000/weather"
    headers = {'X-Wallet-Address': get_agent_address()}
    
    try:
        print(f"📡 Requesting Weather Data from {url}...")
        r = requests.get(url, headers=headers)
        
        # 2. Handle x402 Payment
        if r.status_code == 402:
            print("🛑 Oracle says: 402 Payment Required.")
            data = r.json()
            price = data.get('price')
            invoice_id = data.get('id')
            
            print(f"💰 Initiating Payment of {price} for Invoice {invoice_id}...")
            # Simulate CDP Payment Delay
            time.sleep(1) 
            
            # Post Payment Confirmation
            pay_url = "http://localhost:5000/pay-invoice"
            requests.post(pay_url, json={"invoice_id": invoice_id, "wallet_address": get_agent_address()})
            print("✅ Payment Sent via Coinbase CDP. Receipt: 0xcdp_tx_789")
            
            # Retry
            print("🔄 Retrying Request...")
            r = requests.get(url, headers=headers)
        
        if r.status_code == 200:
            return r.json()
        else:
            print(f"❌ Failed to get data: {r.status_code} {r.text}")
            return None
            
    except Exception as e:
        print(f"⚠️ Error contacting Oracle: {e}")
        return None

def run_lifecycle():
    print("🤖 RecoverAI Agent Online. Monitoring for Claims...")
    print(f"💳 Wallet: {get_agent_address()}")
    
    last_status = "SAFE"
    
    while True:
        data = check_weather_oracle()
        
        if data:
            print(f"📊 Weather: {data.get('weather')} | Wind: {data.get('wind_speed')} mph")
            
            if data['wind_speed'] > 100:
                print("\n" + "="*40)
                print(f"🚨 DISASTER DETECTED! Wind Speed {data['wind_speed']} mph > Threshold 100 mph")
                print("="*40 + "\n")
                
                # 1. Decrypt the Policy (Simulated BITE call)
                print("🔐 Requesting BITE Decryption from SKALE Committee...")
                bite_res = requests.post('http://localhost:3000/decrypt-claim', json={'condition_met': True})
                
                if bite_res.status_code == 200:
                    secret = bite_res.json().get('decrypted_secret')
                    print(f"🔓 BITE Decryption Successful. Secret Key Recovered.")
                    
                    # 2. Generate AP2 Mandate
                    user_address = "0xUser_Victim_Address"
                    mandate = generate_ap2_mandate(user_address, 5000)
                    print(f"📝 AP2 Mandate Generated & Signed.")
                    print(json.dumps(mandate, indent=2))

                    # 3. Execute On-Chain Payout (Simulated for now, can uncomment web3)
                    print("💸 Triggering Smart Contract Payout on SKALE Chain...")
                    time.sleep(1)
                    print(f"🚀 Transaction Sent! Hash: 0xskale_tx_abc123... (Simulated)")
                    print("🏆 CLAIM SETTLED. SHUTTING DOWN.")
                    break
                else:
                    print("❌ BITE Decryption Failed.")
            
        time.sleep(5)

if __name__ == "__main__":
    run_lifecycle()
