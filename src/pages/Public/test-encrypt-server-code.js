#!/usr/bin/env node
const crypto = require('crypto');

// Database values to encrypt
const values = {
  dbHost: 'localhost',
  dbName: 'dbName',
  dbTable: 'dbTable',
  dbUsername: 'dbUsername',
  dbPassword: 'dbPassword'
};

// Use a proper 32-byte key (example key - generate your own with test-generate-key.js)
// This key needs to be exactly 32 bytes (64 hex characters)
const SECRET_KEY = 'localhost';

// Encryption function using AES-256-GCM
function encrypt(text) {
  // Make sure we're using the key correctly - it must be a Buffer of exactly 32 bytes
  const keyBuffer = Buffer.from(SECRET_KEY, 'hex');
  
  // Generate a random IV
  const iv = crypto.randomBytes(16);
  
  // Create cipher with proper key and iv
  const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);
  
  // Encrypt the data
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Get the authentication tag
  const authTag = cipher.getAuthTag().toString('hex');
  
  // Return iv, encrypted data, and auth tag as a single string
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

// Decrypt function for verification
function decrypt(encryptedText) {
  const keyBuffer = Buffer.from(SECRET_KEY, 'hex');
  const parts = encryptedText.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encryptedData = parts[2];
  
  const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Encrypt all database values
const encryptedValues = {
  dbHost: encrypt(values.dbHost),
  dbName: encrypt(values.dbName),
  dbTable: encrypt(values.dbTable),
  dbUsername: encrypt(values.dbUsername),
  dbPassword: encrypt(values.dbPassword)
};

// Output results
console.log('===== ENCRYPTION RESULTS =====');
console.log('SECRET_KEY:', SECRET_KEY);
console.log('\nENCRYPTED VALUES:');
console.log('dbHost:', encryptedValues.dbHost);
console.log('dbName:', encryptedValues.dbName);
console.log('dbTable:', encryptedValues.dbTable);
console.log('dbUsername:', encryptedValues.dbUsername);
console.log('dbPassword:', encryptedValues.dbPassword);

console.log('\nVERIFICATION (DECRYPTION TEST):');
console.log('dbHost:', decrypt(encryptedValues.dbHost));
console.log('dbName:', decrypt(encryptedValues.dbName));
console.log('dbTable:', decrypt(encryptedValues.dbTable));
console.log('dbUsername:', decrypt(encryptedValues.dbUsername));
console.log('dbPassword:', decrypt(encryptedValues.dbPassword));

// Example React component with encrypted values
console.log('\nEXAMPLE REACT COMPONENT USAGE:');
console.log(`
const MySecureComponent = () => {
  const { submitForm, submitting, submitSuccess, resetSubmission } = useMlsFormSubmission({
    dbHost: '${encryptedValues.dbHost}',
    dbName: '${encryptedValues.dbName}',
    dbTable: '${encryptedValues.dbTable}',
    dbUsername: '${encryptedValues.dbUsername}',
    dbPassword: '${encryptedValues.dbPassword}'
  });
  
  // Rest of your component
};
`);

// Update security-helpers.js example
console.log('\nUPDATE YOUR security-helpers.js WITH THESE VALUES:');
console.log(`
const SECRET_KEY = '${SECRET_KEY}';

const encryptedValues = {
  dbHost: '${encryptedValues.dbHost}',
  dbName: '${encryptedValues.dbName}',
  dbTable: '${encryptedValues.dbTable}',
  dbUsername: '${encryptedValues.dbUsername}',
  dbPassword: '${encryptedValues.dbPassword}'
};
`);