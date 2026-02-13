from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for frontend

# Mock Database of Paid Wallets
paid_users = set()

# Global Weather State
current_weather = {
    "weather": "SUNNY",
    "wind_speed": 10,
    "temperature": 75
}

@app.route('/weather', methods=['GET'])
def get_weather():
    client_wallet = request.headers.get('X-Wallet-Address')
    
    # 1. Check if this wallet has paid
    # We accept if it's in paid_users OR if it's the specific demo agent
    if client_wallet not in paid_users:
        return jsonify({
            "error": "Payment Required",
            "price": "0.01 USDC",
            "payment_address": "0xOracleWallet_Mock_Address", 
            "chain": "base-sepolia",
            "id": "invoice_" + (client_wallet if client_wallet else "unknown")
        }), 402

    # 2. If paid, return the data
    return jsonify({
        "status": "success",
        **current_weather
    })

@app.route('/pay-invoice', methods=['POST'])
def pay_invoice():
    data = request.json
    invoice_id = data.get('invoice_id', '')
    
    # Extract wallet from invoice_id if possible, or just expect it in body
    # For the Pro Agent, it sends `invoice_id`. 
    # Let's assume the Pro Agent handles the logic to put the wallet in the header next time.
    # We'll try to extract the wallet from the invoice_id "invoice_0x..."
    
    if invoice_id.startswith("invoice_"):
        wallet = invoice_id.replace("invoice_", "")
        if wallet:
            paid_users.add(wallet)
            print(f"💰 Payment Verified for Wallet: {wallet}")
            return jsonify({"status": "verified", "wallet": wallet})
            
    # Fallback if wallet provided directly
    if 'wallet_address' in data:
        paid_users.add(data['wallet_address'])
        return jsonify({"status": "verified"})

    return jsonify({"status": "verified_generic"}), 200

@app.route('/simulate-storm', methods=['POST'])
def simulate_storm():
    global current_weather
    data = request.json
    if data and 'wind_speed' in data:
         current_weather['wind_speed'] = data['wind_speed']
    else:
        current_weather['wind_speed'] = 160
    
    current_weather['weather'] = "HURRICANE_CATEGORY_5" if current_weather['wind_speed'] > 100 else "STORMY"
    
    return jsonify({"status": "updated", "weather": current_weather})

@app.route('/reset-weather', methods=['POST'])
def reset_weather():
    global current_weather
    current_weather = {
        "weather": "SUNNY",
        "wind_speed": 10,
        "temperature": 75
    }
    paid_users.clear() # Optional: Reset payments too
    return jsonify({"status": "reset", "weather": current_weather})

if __name__ == '__main__':
    print("🌤️ Weather Oracle (x402) running on port 5000")
    app.run(port=5000, debug=True)
