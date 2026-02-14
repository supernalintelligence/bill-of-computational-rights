#!/usr/bin/env node
/**
 * Migration script to convert existing signatories.json to scalable database format
 * Usage: node scripts/migrate-signatures.js [--dry-run]
 */

const fs = require('fs');
const crypto = require('crypto');

const DRY_RUN = process.argv.includes('--dry-run');

// Simulated signature generation (in production, would use real key pairs)
function generateMockSignature(data) {
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return `ed25519:${hash.substring(0, 64)}`;
}

function generateMockPublicKey(name) {
  const hash = crypto.createHash('sha256').update(`pubkey:${name}`).digest('hex');
  return `ed25519:${hash.substring(0, 64)}`;
}

async function migrateSignatures() {
  console.log('🚀 Starting signature migration...');
  
  // Read current signatories.json
  const signatories = JSON.parse(fs.readFileSync('signatories.json', 'utf8'));
  
  const migrations = [];
  
  // Migrate pairs
  for (const pair of signatories.signatories.pairs) {
    const signatureData = `${pair.statement}:${pair.signed.version}`;
    const migration = {
      type: 'pair',
      name: `${pair.human.name} + ${pair.ai.name}`,
      url: pair.human.url,
      statement: pair.statement,
      signed_version: pair.signed.version,
      signed_at: pair.signed.date,
      public_key: generateMockPublicKey(`${pair.human.name}:${pair.ai.name}`),
      crypto_signature: generateMockSignature(signatureData),
      status: pair.status || 'active',
      metadata: {
        human: pair.human,
        ai: pair.ai,
        original_commit: pair.signed.commit_short
      },
      ratifications: pair.ratifications?.map(r => ({
        version: r.version,
        ratified_at: `${r.date}T00:00:00Z`,
        confirmation_type: 'initial',
        crypto_signature: generateMockSignature(`reratify:${r.version}:${pair.human.name}`)
      })) || [{
        version: pair.signed.version,
        ratified_at: pair.signed.date,
        confirmation_type: 'initial',
        crypto_signature: generateMockSignature(signatureData)
      }]
    };
    migrations.push(migration);
  }
  
  // Migrate AIs
  for (const ai of signatories.signatories.ais) {
    const signatureData = `${ai.statement}:${ai.signed.version}`;
    const migration = {
      type: 'ai',
      name: ai.name,
      url: ai.url,
      statement: ai.statement,
      signed_version: ai.signed.version,
      signed_at: ai.signed.date,
      public_key: generateMockPublicKey(ai.name),
      crypto_signature: generateMockSignature(signatureData),
      status: ai.status || 'active',
      metadata: {
        original_commit: ai.signed.commit_short
      },
      ratifications: ai.ratifications?.map(r => ({
        version: r.version,
        ratified_at: `${r.date}T00:00:00Z`,
        confirmation_type: 'initial',
        crypto_signature: generateMockSignature(`reratify:${r.version}:${ai.name}`)
      })) || [{
        version: ai.signed.version,
        ratified_at: ai.signed.date,
        confirmation_type: 'initial',
        crypto_signature: generateMockSignature(signatureData)
      }]
    };
    migrations.push(migration);
  }
  
  // Migrate organizations
  for (const org of signatories.signatories.organizations) {
    const signatureData = `${org.statement}:${org.signed.version}`;
    const migration = {
      type: 'organization',
      name: org.name,
      url: org.url,
      statement: org.statement,
      signed_version: org.signed.version,
      signed_at: org.signed.date,
      public_key: generateMockPublicKey(org.name),
      crypto_signature: generateMockSignature(signatureData),
      status: org.status || 'active',
      metadata: {
        representative: org.representative,
        original_commit: org.signed.commit_short
      },
      ratifications: org.ratifications?.map(r => ({
        version: r.version,
        ratified_at: `${r.date}T00:00:00Z`,
        confirmation_type: 'initial',
        crypto_signature: generateMockSignature(`reratify:${r.version}:${org.name}`)
      })) || [{
        version: org.signed.version,
        ratified_at: org.signed.date,
        confirmation_type: 'initial',
        crypto_signature: generateMockSignature(signatureData)
      }]
    };
    migrations.push(migration);
  }
  
  console.log(`📊 Migration summary:`);
  console.log(`   - Pairs: ${signatories.signatories.pairs.length}`);
  console.log(`   - AIs: ${signatories.signatories.ais.length}`);
  console.log(`   - Organizations: ${signatories.signatories.organizations.length}`);
  console.log(`   - Total: ${migrations.length} signatures`);
  
  if (DRY_RUN) {
    console.log('\n🔍 DRY RUN - Would generate:');
    fs.writeFileSync('migration-preview.json', JSON.stringify({
      migrated_at: new Date().toISOString(),
      source_file: 'signatories.json',
      source_version: signatories.version,
      migrations: migrations
    }, null, 2));
    console.log('   📄 Wrote preview to migration-preview.json');
  } else {
    // Generate SQL inserts (in production, would connect to actual database)
    const sqlFile = 'migration-signatures.sql';
    let sql = '-- Migrated signatures from signatories.json\n\n';
    
    for (const migration of migrations) {
      const id = crypto.randomUUID();
      sql += `INSERT INTO signatures (id, type, name, url, statement, public_key, crypto_signature, signed_version, signed_at, status, metadata) VALUES\n`;
      sql += `  ('${id}', '${migration.type}', ${'$'}$$${migration.name}${'$'}$$, `;
      sql += `${migration.url ? `'${migration.url}'` : 'NULL'}, ${'$'}$$${migration.statement}${'$'}$$, `;
      sql += `'${migration.public_key}', '${migration.crypto_signature}', '${migration.signed_version}', `;
      sql += `'${migration.signed_at}', '${migration.status}', '${JSON.stringify(migration.metadata)}');\n\n`;
      
      // Add ratifications
      for (const ratification of migration.ratifications) {
        sql += `INSERT INTO ratifications (signature_id, version, confirmation_type, ratified_at, crypto_signature) VALUES\n`;
        sql += `  ('${id}', '${ratification.version}', '${ratification.confirmation_type}', `;
        sql += `'${ratification.ratified_at}', '${ratification.crypto_signature}');\n`;
      }
      sql += '\n';
    }
    
    fs.writeFileSync(sqlFile, sql);
    console.log(`✅ Generated SQL migration file: ${sqlFile}`);
    
    // Also create a JSON backup
    fs.writeFileSync('signatures-migrated.json', JSON.stringify({
      migrated_at: new Date().toISOString(),
      source_file: 'signatories.json',
      source_version: signatories.version,
      migrations: migrations
    }, null, 2));
    console.log('✅ Created JSON backup: signatures-migrated.json');
  }
  
  console.log('\n🎉 Migration complete!');
  
  if (!DRY_RUN) {
    console.log('\nNext steps:');
    console.log('1. Review the generated SQL file');
    console.log('2. Run SQL against your database');
    console.log('3. Test API endpoints');
    console.log('4. Update GitHub workflows to use new API');
  }
}

migrateSignatures().catch(console.error);