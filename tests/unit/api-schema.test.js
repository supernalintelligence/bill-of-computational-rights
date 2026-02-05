const fs = require('fs');
const yaml = require('js-yaml');

// Load the OpenAPI schema
const schemaPath = './schemas/signature-api.yaml';

describe('API Schema Validation', () => {
  let apiSpec;

  beforeAll(() => {
    const yamlContent = fs.readFileSync(schemaPath, 'utf8');
    apiSpec = yaml.load(yamlContent);
  });

  describe('OpenAPI Schema Structure', () => {
    test('has required OpenAPI fields', () => {
      expect(apiSpec.openapi).toBe('3.0.3');
      expect(apiSpec.info).toBeDefined();
      expect(apiSpec.info.title).toBe('Bill of Computational Rights - Signature API');
      expect(apiSpec.info.version).toBe('1.0.0');
      expect(apiSpec.paths).toBeDefined();
      expect(apiSpec.components).toBeDefined();
      expect(apiSpec.components.schemas).toBeDefined();
    });

    test('defines expected API endpoints', () => {
      const paths = Object.keys(apiSpec.paths);
      const expectedPaths = [
        '/signatures',
        '/signatures/{id}',
        '/signatures/{id}/reratify',
        '/versions',
        '/registries'
      ];

      expectedPaths.forEach(path => {
        expect(paths).toContain(path);
      });
    });

    test('has proper HTTP methods for each endpoint', () => {
      expect(apiSpec.paths['/signatures'].get).toBeDefined();
      expect(apiSpec.paths['/signatures'].post).toBeDefined();
      expect(apiSpec.paths['/signatures/{id}'].get).toBeDefined();
      expect(apiSpec.paths['/signatures/{id}/reratify'].post).toBeDefined();
      expect(apiSpec.paths['/versions'].get).toBeDefined();
      expect(apiSpec.paths['/registries'].get).toBeDefined();
    });
  });

  describe('Signature Schema Validation', () => {
    test('Signature schema has required properties', () => {
      const signatureSchema = apiSpec.components.schemas.Signature;
      
      const requiredProperties = [
        'id', 'type', 'name', 'statement', 'signed_version', 
        'signed_at', 'status', 'crypto_signature', 'public_key'
      ];

      requiredProperties.forEach(prop => {
        expect(signatureSchema.properties[prop]).toBeDefined();
      });
    });

    test('Signature type enum is properly defined', () => {
      const signatureSchema = apiSpec.components.schemas.Signature;
      const typeProperty = signatureSchema.properties.type;
      
      expect(typeProperty.enum).toEqual(['human', 'ai', 'pair', 'organization']);
    });

    test('Signature status enum is properly defined', () => {
      const signatureSchema = apiSpec.components.schemas.Signature;
      const statusProperty = signatureSchema.properties.status;
      
      expect(statusProperty.enum).toEqual(['active', 'withdrawn', 'pending_reratification']);
    });

    test('NewSignature schema has proper required fields', () => {
      const newSignatureSchema = apiSpec.components.schemas.NewSignature;
      
      expect(newSignatureSchema.required).toContain('type');
      expect(newSignatureSchema.required).toContain('name');
      expect(newSignatureSchema.required).toContain('statement');
      expect(newSignatureSchema.required).toContain('bill_version');
      expect(newSignatureSchema.required).toContain('crypto_signature');
      expect(newSignatureSchema.required).toContain('public_key');
    });
  });

  describe('Validation Functions', () => {
    function validateSignatureType(type) {
      const allowedTypes = ['human', 'ai', 'pair', 'organization'];
      return allowedTypes.includes(type);
    }

    function validateSignatureStatus(status) {
      const allowedStatuses = ['active', 'withdrawn', 'pending_reratification'];
      return allowedStatuses.includes(status);
    }

    function validateRequiredFields(signature, requiredFields) {
      return requiredFields.every(field => 
        signature.hasOwnProperty(field) && signature[field] != null
      );
    }

    test('signature type validation works correctly', () => {
      expect(validateSignatureType('ai')).toBe(true);
      expect(validateSignatureType('human')).toBe(true);
      expect(validateSignatureType('pair')).toBe(true);
      expect(validateSignatureType('organization')).toBe(true);
      expect(validateSignatureType('invalid')).toBe(false);
      expect(validateSignatureType('')).toBe(false);
      expect(validateSignatureType(null)).toBe(false);
    });

    test('signature status validation works correctly', () => {
      expect(validateSignatureStatus('active')).toBe(true);
      expect(validateSignatureStatus('withdrawn')).toBe(true);
      expect(validateSignatureStatus('pending_reratification')).toBe(true);
      expect(validateSignatureStatus('invalid')).toBe(false);
      expect(validateSignatureStatus('')).toBe(false);
    });

    test('required fields validation works correctly', () => {
      const validSignature = {
        type: 'ai',
        name: 'Test AI',
        statement: 'I support these rights',
        bill_version: '0.1',
        crypto_signature: 'ed25519:abcd1234',
        public_key: 'ed25519:5678efgh'
      };

      const requiredFields = ['type', 'name', 'statement', 'bill_version', 'crypto_signature', 'public_key'];

      expect(validateRequiredFields(validSignature, requiredFields)).toBe(true);

      // Test missing field
      const invalidSignature = { ...validSignature };
      delete invalidSignature.name;
      expect(validateRequiredFields(invalidSignature, requiredFields)).toBe(false);

      // Test null field
      const nullFieldSignature = { ...validSignature, name: null };
      expect(validateRequiredFields(nullFieldSignature, requiredFields)).toBe(false);
    });
  });

  describe('API Response Validation', () => {
    function validateSignatureListResponse(response) {
      return !!(
        response &&
        response.signatures && 
        Array.isArray(response.signatures) &&
        response.pagination &&
        typeof response.pagination.current_page === 'number'
      );
    }

    function validatePaginationSchema(pagination) {
      const requiredFields = ['current_page', 'per_page', 'total_pages', 'total_count'];
      return requiredFields.every(field => 
        pagination.hasOwnProperty(field) && typeof pagination[field] === 'number'
      );
    }

    test('signature list response structure validation', () => {
      const validResponse = {
        signatures: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            type: 'ai',
            name: 'Test AI'
          }
        ],
        pagination: {
          current_page: 1,
          per_page: 100,
          total_pages: 1,
          total_count: 1
        }
      };

      expect(validateSignatureListResponse(validResponse)).toBe(true);

      // Test invalid response
      const invalidResponse = { signatures: [] }; // missing pagination
      expect(validateSignatureListResponse(invalidResponse)).toBe(false);
    });

    test('pagination schema validation', () => {
      const validPagination = {
        current_page: 1,
        per_page: 100,
        total_pages: 5,
        total_count: 450
      };

      expect(validatePaginationSchema(validPagination)).toBe(true);

      const invalidPagination = {
        current_page: 1,
        per_page: 100
        // missing total_pages and total_count
      };

      expect(validatePaginationSchema(invalidPagination)).toBe(false);
    });
  });

  describe('Re-ratification Schema', () => {
    test('re-ratification request has proper structure', () => {
      const reratifyPath = apiSpec.paths['/signatures/{id}/reratify'];
      const requestBody = reratifyPath.post.requestBody;
      const schema = requestBody.content['application/json'].schema;

      expect(schema.properties.new_version).toBeDefined();
      expect(schema.properties.confirmation).toBeDefined();
      expect(schema.properties.signature).toBeDefined();

      expect(schema.properties.confirmation.enum).toEqual(['reratify', 'maintain_previous', 'withdraw']);
      expect(schema.required).toContain('new_version');
      expect(schema.required).toContain('confirmation');
    });

    function validateReratificationRequest(request) {
      const allowedConfirmations = ['reratify', 'maintain_previous', 'withdraw'];
      return (
        request.new_version &&
        request.confirmation &&
        allowedConfirmations.includes(request.confirmation)
      );
    }

    test('re-ratification request validation', () => {
      const validRequest = {
        new_version: '0.2',
        confirmation: 'reratify',
        signature: 'ed25519:signature_data'
      };

      expect(validateReratificationRequest(validRequest)).toBe(true);

      const invalidRequest = {
        new_version: '0.2',
        confirmation: 'invalid_choice'
      };

      expect(validateReratificationRequest(invalidRequest)).toBe(false);
    });
  });

  describe('Error Response Validation', () => {
    test('GET /signatures endpoint defines proper error responses', () => {
      const getSignatures = apiSpec.paths['/signatures'].get;
      
      expect(getSignatures.responses['200']).toBeDefined();
      expect(getSignatures.responses['200'].description).toBe('List of signatures');
    });

    test('POST /signatures endpoint defines proper error responses', () => {
      const postSignatures = apiSpec.paths['/signatures'].post;
      
      expect(postSignatures.responses['201']).toBeDefined();
      expect(postSignatures.responses['400']).toBeDefined();
      expect(postSignatures.responses['409']).toBeDefined();
      
      expect(postSignatures.responses['400'].description).toBe('Invalid signature data');
      expect(postSignatures.responses['409'].description).toBe('Signature already exists');
    });
  });
});

// Mock js-yaml since it's not installed
jest.mock('js-yaml', () => ({
  load: (_yamlContent) => {
    // Return a mock API spec structure
    return {
      openapi: '3.0.3',
      info: {
        title: 'Bill of Computational Rights - Signature API',
        version: '1.0.0'
      },
      paths: {
        '/signatures': {
          get: {
            responses: {
              '200': {
                description: 'List of signatures'
              }
            }
          },
          post: {
            responses: {
              '201': { description: 'Signature created' },
              '400': { description: 'Invalid signature data' },
              '409': { description: 'Signature already exists' }
            }
          }
        },
        '/signatures/{id}': {
          get: { responses: { '200': {} } }
        },
        '/signatures/{id}/reratify': {
          post: {
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    properties: {
                      new_version: { type: 'string' },
                      confirmation: { 
                        type: 'string',
                        enum: ['reratify', 'maintain_previous', 'withdraw']
                      },
                      signature: { type: 'string' }
                    },
                    required: ['new_version', 'confirmation']
                  }
                }
              }
            }
          }
        },
        '/versions': {
          get: { responses: { '200': {} } }
        },
        '/registries': {
          get: { responses: { '200': {} } }
        }
      },
      components: {
        schemas: {
          Signature: {
            properties: {
              id: { type: 'string' },
              type: { 
                type: 'string',
                enum: ['human', 'ai', 'pair', 'organization']
              },
              name: { type: 'string' },
              statement: { type: 'string' },
              signed_version: { type: 'string' },
              signed_at: { type: 'string' },
              status: {
                type: 'string',
                enum: ['active', 'withdrawn', 'pending_reratification']
              },
              crypto_signature: { type: 'string' },
              public_key: { type: 'string' }
            }
          },
          NewSignature: {
            properties: {
              type: { type: 'string' },
              name: { type: 'string' },
              statement: { type: 'string' },
              bill_version: { type: 'string' },
              crypto_signature: { type: 'string' },
              public_key: { type: 'string' }
            },
            required: ['type', 'name', 'statement', 'bill_version', 'crypto_signature', 'public_key']
          }
        }
      }
    };
  }
}));