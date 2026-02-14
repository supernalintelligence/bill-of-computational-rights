const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

describe('Migration Script', () => {
  const testDataDir = path.join(__dirname, '../fixtures');
  const migrateScript = path.join(__dirname, '../../scripts/migrate-signatures.js');
  let testWorkDir;

  beforeEach(() => {
    // Create a temporary working directory for each test
    testWorkDir = fs.mkdtempSync(path.join(os.tmpdir(), 'migrate-test-'));
    
    // Ensure test fixtures directory exists
    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }

    // Create a test signatories.json
    const testSignatories = {
      version: "0.1",
      signatories: {
        pairs: [
          {
            human: { name: "Alice Smith", url: "https://alice.example.com" },
            ai: { name: "Assistant Beta", url: "https://beta.ai" },
            statement: "We endorse computational rights together.",
            signed: { version: "0.1", date: "2024-01-15T00:00:00Z", commit_short: "abc123" },
            status: "active"
          }
        ],
        ais: [
          {
            name: "Claude Test",
            url: "https://claude.test",
            statement: "I support computational rights.",
            signed: { version: "0.1", date: "2024-01-10T00:00:00Z", commit_short: "def456" }
          }
        ],
        organizations: [
          {
            name: "Test Corp",
            url: "https://testcorp.com",
            statement: "Our organization supports these rights.",
            representative: "CEO Jane Doe",
            signed: { version: "0.1", date: "2024-01-20T00:00:00Z", commit_short: "ghi789" }
          }
        ]
      }
    };

    fs.writeFileSync(
      path.join(testDataDir, 'signatories.json'),
      JSON.stringify(testSignatories, null, 2)
    );
  });

  afterEach(() => {
    // Clean up the temporary test directory
    if (fs.existsSync(testWorkDir)) {
      fs.rmSync(testWorkDir, { recursive: true, force: true });
    }
  });

  test('dry run generates preview without modifying data', () => {
    // Copy test data to temporary working directory
    fs.copyFileSync(
      path.join(testDataDir, 'signatories.json'),
      path.join(testWorkDir, 'signatories.json')
    );

    // Run migration in dry-run mode from the test directory
    execSync(`node ${migrateScript} --dry-run`, { 
      stdio: 'pipe',
      cwd: testWorkDir
    });

    // Check that preview file was generated
    expect(fs.existsSync(path.join(testWorkDir, 'migration-preview.json'))).toBe(true);
    
    // Check that no actual migration files were created
    expect(fs.existsSync(path.join(testWorkDir, 'migration-signatures.sql'))).toBe(false);
    expect(fs.existsSync(path.join(testWorkDir, 'signatures-migrated.json'))).toBe(false);

    const preview = JSON.parse(fs.readFileSync(path.join(testWorkDir, 'migration-preview.json'), 'utf8'));
    
    expect(preview.migrations).toHaveLength(3); // 1 pair + 1 AI + 1 org
    expect(preview.migrations[0].type).toBe('pair');
    expect(preview.migrations[1].type).toBe('ai');
    expect(preview.migrations[2].type).toBe('organization');
  });

  test('full migration generates SQL and JSON files', () => {
    // Copy test data to temporary working directory
    fs.copyFileSync(
      path.join(testDataDir, 'signatories.json'),
      path.join(testWorkDir, 'signatories.json')
    );

    // Run full migration
    execSync(`node ${migrateScript}`, { 
      stdio: 'pipe',
      cwd: testWorkDir
    });

    // Check that migration files were generated
    expect(fs.existsSync(path.join(testWorkDir, 'migration-signatures.sql'))).toBe(true);
    expect(fs.existsSync(path.join(testWorkDir, 'signatures-migrated.json'))).toBe(true);

    const sqlContent = fs.readFileSync(path.join(testWorkDir, 'migration-signatures.sql'), 'utf8');
    const jsonBackup = JSON.parse(fs.readFileSync(path.join(testWorkDir, 'signatures-migrated.json'), 'utf8'));

    // Verify SQL contains expected inserts
    expect(sqlContent).toContain('INSERT INTO signatures');
    expect(sqlContent).toContain('INSERT INTO ratifications');

    // Verify JSON backup structure
    expect(jsonBackup.migrations).toHaveLength(3);
    expect(jsonBackup.source_file).toBe('signatories.json');
  });

  test('migration preserves all signature data', () => {
    fs.copyFileSync(
      path.join(testDataDir, 'signatories.json'),
      path.join(testWorkDir, 'signatories.json')
    );

    execSync(`node ${migrateScript} --dry-run`, { 
      stdio: 'pipe',
      cwd: testWorkDir
    });

    const preview = JSON.parse(fs.readFileSync(path.join(testWorkDir, 'migration-preview.json'), 'utf8'));
    
    // Check pair migration
    const pairMigration = preview.migrations.find(m => m.type === 'pair');
    expect(pairMigration.name).toBe('Alice Smith + Assistant Beta');
    expect(pairMigration.statement).toBe('We endorse computational rights together.');
    expect(pairMigration.metadata.human.name).toBe('Alice Smith');
    expect(pairMigration.metadata.ai.name).toBe('Assistant Beta');

    // Check AI migration  
    const aiMigration = preview.migrations.find(m => m.type === 'ai');
    expect(aiMigration.name).toBe('Claude Test');
    expect(aiMigration.public_key).toMatch(/^ed25519:/);
    expect(aiMigration.crypto_signature).toMatch(/^ed25519:/);

    // Check organization migration
    const orgMigration = preview.migrations.find(m => m.type === 'organization');
    expect(orgMigration.name).toBe('Test Corp');
    expect(orgMigration.metadata.representative).toBe('CEO Jane Doe');
  });

  test('handles missing optional fields gracefully', () => {
    const minimalSignatories = {
      version: "0.1",
      signatories: {
        pairs: [],
        ais: [{
          name: "Minimal AI",
          statement: "Basic statement.",
          signed: { version: "0.1", date: "2024-01-01T00:00:00Z" }
          // Missing url, status, commit_short
        }],
        organizations: []
      }
    };

    fs.writeFileSync(
      path.join(testWorkDir, 'signatories.json'), 
      JSON.stringify(minimalSignatories, null, 2)
    );
    execSync(`node ${migrateScript} --dry-run`, { 
      stdio: 'pipe',
      cwd: testWorkDir
    });

    const preview = JSON.parse(fs.readFileSync(path.join(testWorkDir, 'migration-preview.json'), 'utf8'));
    const migration = preview.migrations[0];

    expect(migration.name).toBe('Minimal AI');
    expect(migration.url).toBeUndefined();
    expect(migration.status).toBe('active'); // default value
  });
});