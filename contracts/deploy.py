import os
import json
from web3 import Web3
from solcx import compile_standard, install_solc

# Ensure Solc is installed
install_solc('0.8.0')

def deploy():
    # 1. Connect to SKALE Testnet (Nebula)
    # Replace with your RPC URL
    rpc_url = "https://testnet.skalenodes.com/v1/giant-half-dual-testnet"
    w3 = Web3(Web3.HTTPProvider(rpc_url))
    
    chain_id = w3.eth.chain_id
    print(f"Connected to Chain ID: {chain_id}")

    # 2. Setup Wallet (Private Key)
    # WARNING: NEVER COMMIT PRIVATE KEYS. Use Env Var or Input.
    private_key = os.getenv("PRIVATE_KEY")
    if not private_key:
        print("Please set PRIVATE_KEY environment variable.")
        return

    account = w3.eth.account.from_key(private_key)
    print(f"Deploying from: {account.address}")

    # 3. Compile Contract
    with open('contracts/RecoverVault.sol', 'r') as file:
        contract_source_code = file.read()

    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"RecoverVault.sol": {"content": contract_source_code}},
            "settings": {
                "outputSelection": {
                    "*": {
                        "*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]
                    }
                }
            },
        },
        solc_version="0.8.0",
    )

    bytecode = compiled_sol["contracts"]["RecoverVault.sol"]["RecoverVault"]["evm"]["bytecode"]["object"]
    abi = compiled_sol["contracts"]["RecoverVault.sol"]["RecoverVault"]["abi"]

    # 4. Deploy
    RecoverVault = w3.eth.contract(abi=abi, bytecode=bytecode)
    
    # Constructor Args: Agent Address
    # We use the deployer as the agent for simplicity, or hardcode/pass another
    agent_address = account.address 
    
    print(f"Deploying... Agent set to {agent_address}")
    
    # Build Transaction
    nonce = w3.eth.get_transaction_count(account.address)
    transaction = RecoverVault.constructor(agent_address).build_transaction({
        "chainId": chain_id,
        "gasPrice": w3.eth.gas_price,
        "from": account.address,
        "nonce": nonce,
    })

    # Sign & Send
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    
    print(f"Transaction sent: {w3.to_hex(tx_hash)}")
    
    # Wait for receipt
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"Contract deployed at: {tx_receipt.contractAddress}")
    
    # Save ABI/Address for Frontend/Agent
    with open('contracts/deployment.json', 'w') as f:
        json.dump({
            "address": tx_receipt.contractAddress,
            "abi": abi
        }, f, indent=2)
    print("Deployment saved to contracts/deployment.json")

if __name__ == "__main__":
    deploy()
