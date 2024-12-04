import "dotenv/config";
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}


if (!("SOLANA_URL" in process.env) || process.env.SOLANA_URL == null) {
	throw new Error("SOLANA_URL not found in env");
}

const address = TryGetAddress(suppliedPublicKey);
if (address != null) {
	const connection = new Connection(process.env.SOLANA_URL);
	const balance = await connection.getBalance(address) / LAMPORTS_PER_SOL;

	console.log(`The connection at address "${address}" is ${balance} SOL`);
}

// Try converting the supplied string into a proper PublicKey
// Log an Error and return null if it fails
function TryGetAddress(publicKey: string): PublicKey | null {
	let pk: PublicKey = null;
	try {
		pk = new PublicKey(publicKey);
	}
	catch (err) {
		console.log(`invalid public key`);
	}
	return pk;
}
