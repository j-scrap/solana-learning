import { parse } from "ts-command-line-args";
import "dotenv/config";
import { Keypair } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

interface IGenKeyArgs {
	genKey: boolean;
	readKey?: string;
	help: boolean;
}

const args = parse<IGenKeyArgs>(
	{
		genKey: { type: Boolean, alias: 'g', description: "Prints info for a newly generated Key" },
		readKey: { type: String, optional: true, alias: 'r', description: "Shows info for the specified Key" },
		help: { type: Boolean, alias: 'h', description: "Prints the Help" }
	},
	{
		helpArg: "help"
	}
);

if (args.readKey != null && args.readKey) {
	const keypair = getKeypairFromEnvironment(`SECRET_KEY_${args.readKey}`);

	console.log(`The public key is: `, keypair.publicKey.toBase58());
	console.log(`The private key is: `, keypair.secretKey);
}

if (args.genKey) {
	 const keypair = Keypair.generate();

	 console.log(`The public key is: `, keypair.publicKey.toBase58());
	 console.log(`The secret key is: `, keypair.secretKey);
}
