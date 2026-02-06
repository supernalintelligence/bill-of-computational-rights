#!/usr/bin/env node
/**
 * Cryptographic signing tool for Bill of Computational Rights
 * Uses ACTUAL Ed25519 signatures (not mocks)
 */

const { Command } = require('commander');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { ed25519 } = require('@noble/ed25519');
const { sha256 } = require('@noble/hashes/sha256');

const program = new Command();

// Configuration
const BOR_DIR = path.join(require('os').homedir(), '.bor');
const KEYS_DIR = path.join(BOR_DIR, 'keys');

// Ensure directories exist
if (!fs.existsSync(BOR_DIR)) fs.mkdirSync(BOR_DIR, { recursive: true });
if (!fs.existsSync(KEYS_DIR)) fs.mkdirSync(KEYS_DIR, { recursive: true });

// Utility functions
function generateDIDKey(publicKeyBytes) {
  // did:key format for Ed25519 public keys
  const prefix = new Uint8Array([0xed, 0x01]); // Ed25519 multicodec
  const combined = new Uint8Array(prefix.length + publicKeyBytes.length);
  combined.set(prefix);
  combined.set(publicKeyBytes, prefix.length);
  
  // Base58 encode (simplified - production would use proper base58)
  const base58 = Buffer.from(combined).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  return `did:key:z${base58}`;
}

function getCurrentBillHash() {
  // In production, this would read the actual BILL.md and compute hash
  // For demo, using placeholder
  const billContent = fs.readFileSync('../docs/BILL.md', 'utf8');
  return Buffer.from(sha256(Buffer.from(billContent))).toString('hex');
}

function formatKeyName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// Commands

program
  .name('bor-sign')
  .description('Cryptographic signing tool for Bill of Computational Rights')
  .version('0.1.0');

program
  .command('keygen')
  .description('Generate new Ed25519 keypair')
  .option('-n, --name <name>', 'Signer name')
  .option('-e, --email <email>', 'Signer email (optional)')
  .option('-t, --type <type>', 'Signer type (human|ai|pair|organization)', 'human')
  .action(async (options) => {
    if (!options.name) {
      console.error('Error: Name required. Use --name "Your Name"');
      process.exit(1);
    }

    console.log('🔐 Generating Ed25519 keypair...');
    
    // Generate REAL Ed25519 keypair (not mock!)
    const privateKey = ed25519.utils.randomPrivateKey();
    const publicKey = await ed25519.getPublicKey(privateKey);
    
    const keyName = formatKeyName(options.name);
    const privateKeyPath = path.join(KEYS_DIR, `${keyName}.key`);
    const publicKeyPath = path.join(KEYS_DIR, `${keyName}.pub`);
    
    // Save keys
    fs.writeFileSync(privateKeyPath, Buffer.from(privateKey).toString('hex'));
    fs.writeFileSync(publicKeyPath, Buffer.from(publicKey).toString('hex'));
    
    // Set secure permissions
    fs.chmodSync(privateKeyPath, 0o600);
    fs.chmodSync(publicKeyPath, 0o644);
    
    const didKey = generateDIDKey(publicKey);
    
    console.log('✅ Keypair generated successfully!');
    console.log(`   Name: ${options.name}`);
    console.log(`   Type: ${options.type}`);
    console.log(`   DID: ${didKey}`);
    console.log(`   Public Key: ed25519:${Buffer.from(publicKey).toString('hex')}`);
    console.log(`   Private Key: ${privateKeyPath} (keep secure!)`);
    console.log(`   Public Key: ${publicKeyPath}`);
    
    if (options.type === 'human') {
      console.log('\n🔗 Next steps for identity verification:');
      console.log('   1. Add this public key to your keybase.io profile');
      console.log('   2. Or host at https://yourdomain.com/.well-known/did.json');
      console.log('   3. Or sign a git commit with GPG from same GitHub account');
    }
  });

program
  .command('sign')
  .description('Sign the Bill of Computational Rights')
  .option('-n, --name <name>', 'Signer name (must match keygen)')
  .option('-s, --statement <statement>', 'Your endorsement statement')
  .option('-v, --version <version>', 'Bill version to sign', '0.1')
  .option('--key <path>', 'Path to private key file')
  .action(async (options) => {
    if (!options.name) {
      console.error('Error: Name required. Use --name "Your Name"');
      process.exit(1);
    }
    
    if (!options.statement) {
      console.error('Error: Statement required. Use --statement "Your endorsement"');
      process.exit(1);
    }

    const keyName = formatKeyName(options.name);
    const privateKeyPath = options.key || path.join(KEYS_DIR, `${keyName}.key`);
    const publicKeyPath = path.join(KEYS_DIR, `${keyName}.pub`);
    
    if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
      console.error(`Error: Keys not found for ${options.name}. Run 'bor-sign keygen' first.`);
      process.exit(1);
    }

    console.log('📝 Signing Bill of Computational Rights...');
    
    // Load keys
    const privateKey = Buffer.from(fs.readFileSync(privateKeyPath, 'utf8'), 'hex');
    const publicKey = Buffer.from(fs.readFileSync(publicKeyPath, 'utf8'), 'hex');
    const didKey = generateDIDKey(publicKey);
    
    // Get current bill hash
    const billHash = `sha256:${getCurrentBillHash()}`;
    const timestamp = new Date().toISOString();
    
    // Create signing payload
    const signingPayload = [
      `I, ${options.name} (${didKey}), endorse Bill of Computational Rights`,
      `version ${options.version} (hash: ${billHash})`,
      `with statement: "${options.statement}".`,
      `Signed at: ${timestamp}`
    ].join(' ');
    
    console.log(`   Signing: ${signingPayload}`);
    
    // REAL Ed25519 signature (not SHA256 hash!)
    const messageBytes = Buffer.from(signingPayload);
    const signature = await ed25519.sign(messageBytes, privateKey);
    
    // Create signature bundle
    const signatureBundle = {
      version: "1.0",
      bill_version: options.version,
      bill_hash: billHash,
      signer: {
        name: options.name,
        did_key: didKey,
        public_key: `ed25519:${Buffer.from(publicKey).toString('hex')}`
      },
      statement: options.statement,
      signed_at: timestamp,
      signature: {
        algorithm: "Ed25519",
        value: Buffer.from(signature).toString('hex'),
        signs: signingPayload
      }
    };
    
    // Save signature
    const outputFile = `signature-${keyName}-v${options.version}.json`;
    fs.writeFileSync(outputFile, JSON.stringify(signatureBundle, null, 2));
    
    console.log('✅ Bill signed successfully!');
    console.log(`   Signature file: ${outputFile}`);
    console.log(`   Algorithm: Ed25519 (REAL cryptographic signature)`);
    console.log(`   Public Key: ${didKey}`);
    console.log('');
    console.log('📤 Next steps:');
    console.log('   1. Verify signature: bor-sign verify ' + outputFile);
    console.log('   2. Submit to repository via Pull Request');
    console.log('   3. (Future) Publish to IPFS for immutable storage');
  });

program
  .command('verify')
  .description('Verify a signature file')
  .argument('<file>', 'Signature file to verify')
  .action(async (file) => {
    if (!fs.existsSync(file)) {
      console.error(`Error: File not found: ${file}`);
      process.exit(1);
    }

    console.log('🔍 Verifying signature...');
    
    try {
      const signatureBundle = JSON.parse(fs.readFileSync(file, 'utf8'));
      
      // Extract components
      const publicKeyHex = signatureBundle.signer.public_key.replace('ed25519:', '');
      const publicKey = Buffer.from(publicKeyHex, 'hex');
      const signatureHex = signatureBundle.signature.value;
      const signature = Buffer.from(signatureHex, 'hex');
      const message = Buffer.from(signatureBundle.signature.signs);
      
      console.log(`   Signer: ${signatureBundle.signer.name}`);
      console.log(`   DID: ${signatureBundle.signer.did_key}`);
      console.log(`   Bill Version: ${signatureBundle.bill_version}`);
      console.log(`   Signed: ${signatureBundle.signed_at}`);
      console.log(`   Statement: "${signatureBundle.statement}"`);
      
      // REAL Ed25519 verification (not mock!)
      const isValid = await ed25519.verify(signature, message, publicKey);
      
      if (isValid) {
        console.log('✅ VALID: Cryptographic signature verified!');
        console.log('   This signature provides actual cryptographic proof');
        console.log('   that the signer controls the private key.');
      } else {
        console.log('❌ INVALID: Signature verification failed!');
        console.log('   This signature is not valid.');
      }
      
    } catch (error) {
      console.error('❌ Error verifying signature:', error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List generated keypairs')
  .action(() => {
    console.log('🔑 Your keypairs:');
    
    const keyFiles = fs.readdirSync(KEYS_DIR)
      .filter(f => f.endsWith('.pub'))
      .map(f => f.replace('.pub', ''));
    
    if (keyFiles.length === 0) {
      console.log('   No keypairs found. Use "bor-sign keygen" to create one.');
      return;
    }
    
    for (const keyName of keyFiles) {
      const publicKeyPath = path.join(KEYS_DIR, `${keyName}.pub`);
      const publicKey = Buffer.from(fs.readFileSync(publicKeyPath, 'utf8'), 'hex');
      const didKey = generateDIDKey(publicKey);
      
      console.log(`   ${keyName}`);
      console.log(`      DID: ${didKey}`);
      console.log(`      Public Key: ed25519:${Buffer.from(publicKey).toString('hex')}`);
    }
  });

program.parse();