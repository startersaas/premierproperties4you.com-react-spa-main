/* eslint-disable */
import { useState, useCallback } from 'react';
import { useServerLogs } from 'utils/use-server';

// @eserver-register-next-line
const testMarker = "This is a test marker in use-mls-form-submission.js"; return { success: true, message: "Hook test marker executed" };

/**
 * Custom hook for MLS form submission
 * 
 * @param {Object} config - Configuration options
 * @param {string} config.dbHost - Database host
 * @param {string} config.dbName - Database name
 * @param {string} config.dbTable - Database table
 * @param {string} config.dbUsername - Database username
 * @param {string} config.dbPassword - Database password
 * @param {boolean} config.useAlert - Whether to show alerts on success/failure
 */
const useMlsFormSubmission = ({
  dbHost = 'localhost',
  dbName = 'dbName',
  dbTable = 'dbTable',
  dbUsername = 'dbUsername',
  dbPassword = 'dbPassword',
  useAlert = false
} = {}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { addLog } = useServerLogs();

  // Server function for form submission using multiline marker
  // @eserver-begin
  // Database insertion function
  try {
    // Get form data from arguments
    const formData = args[0];
    
    if (!formData) {
      return {
        success: false,
        error: 'No form data provided'
      };
    }
    
    // Required modules
    const mysql = require('mysql2/promise');
    
    // Current timestamp
    const now = new Date();
    const mysqlDatetime = now.toISOString().slice(0, 19).replace('T', ' ');
    
    // Generate a unique customer string
    const cString = `cs_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`;
    
    // Connect to database and insert record
    let connection;
    try {
      connection = await mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'premierproperties'
      });
      
      // Build insert data from form
      const insertData = {
        cString,
        cBillFname: formData.cBillFname,
        cBillLname: formData.cBillLname,
        cBillAddress1: formData.cBillAddress1,
        cBillCity: formData.cBillCity,
        cBillState: formData.cBillState,
        cBillZip: formData.cBillZip,
        cPhone: formData.cPhone,
        cEmail: formData.cEmail,
        cDateSince: mysqlDatetime,
        cUpdateDate: mysqlDatetime
      };
      
      // Build and execute insert query
      const fields = Object.keys(insertData).join(', ');
      const placeholders = Object.keys(insertData).map(() => '?').join(', ');
      const values = Object.values(insertData);
      
      const query = `INSERT INTO ds_customers (${fields}) VALUES (${placeholders})`;
      const [result] = await connection.execute(query, values);
      
      return {
        success: true,
        insertId: result.insertId,
        message: 'Customer record created successfully'
      };
    } catch (dbError) {
      console.error('Database error:', dbError);
      return {
        success: false,
        error: dbError.message
      };
    } finally {
      if (connection) await connection.end();
    }
  } catch (error) {
    console.error('Server function error:', error);
    return {
      success: false,
      error: error.message
    };
  }
  // @eserver-end

  /**
   * Submit form data to server
   */
  const submitForm = useCallback(async (formData) => {
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      // Debug info
      console.log('Available markers:', Object.keys(window.__serverMarkers || {}));
      addLog('info', 'Submitting form data');
      
      // Find our multiline block
      const blockId = Object.keys(window.__serverMarkers || {}).find(id => 
        id.includes('use_mls_form_submission') && 
        id.includes('_block_')
      );
      
      if (!blockId) {
        console.error('Insert block not found');
        throw new Error('Server functionality not available');
      }
      
      // Execute the server function
      addLog('info', `Executing server block: ${blockId}`);
      const result = await window.__executeServerMarker(blockId, [formData]);
      addLog('info', 'Server function response:', result);
      
      if (result && result.success) {
        setSubmitSuccess(true);
        if (useAlert) {
          alert('Sent');
        }
        return true;
      } else {
        const errorMessage = result ? (result.error || 'Unknown error') : 'No response from server';
        setSubmitError(errorMessage);
        if (useAlert) {
          alert('Fail: ' + errorMessage);
        }
        return false;
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      addLog('error', `Form submission error: ${err.message}`);
      setSubmitError(err.message);
      if (useAlert) {
        alert('Fail: ' + err.message);
      }
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [addLog, useAlert]);

  /**
   * Reset submission state
   */
  const resetSubmission = useCallback(() => {
    setSubmitSuccess(false);
    setSubmitError(null);
  }, []);

  return {
    submitForm,
    submitting,
    submitSuccess,
    submitError,
    resetSubmission
  };
};

export default useMlsFormSubmission;
/* eslint-enable */