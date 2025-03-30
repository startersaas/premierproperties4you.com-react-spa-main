import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Paper,
  Divider,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useMlsFormSubmission from './use-mls-form-submission';
import { LogViewer } from 'utils/use-server';

// States array for dropdown
const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 
  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 
  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const MLSFormComponent = ({ 
  useBorder = true, 
  useColor = '#ffffff', 
  useSize = 'small', 
  useButtonSize = 'medium',
  useMiddle = false,
  showLogViewer = false
}) => {
  const [formData, setFormData] = useState({
    cBillFname: '',
    cBillLname: '',
    cBillAddress1: '',
    cBillCity: '',
    cBillState: '',
    cBillZip: '',
    cBillCountry: 'USA',
    cPhone: '',
    billEqualShip: 'Y',
    cShipAddress1: '',
    cShipCity: '',
    cShipState: '',
    cShipZip: '',
    cShipCountry: 'USA',
    cEmail: ''
  });

  const [errors, setErrors] = useState({});
  const { submitForm, submitting, submitSuccess, resetSubmission } = useMlsFormSubmission({
    dbHost: 'localhost',
    dbName: 'dbName',
    dbTable: 'dbTable',
    dbUsername: 'dbUsername',
    dbPassword: 'dbPassword'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? 'Y' : 'N') : value
    }));

    // If shipping address is same as billing, update shipping fields
    if (name === 'billEqualShip' && checked) {
      setFormData(prevData => ({
        ...prevData,
        cShipAddress1: prevData.cBillAddress1,
        cShipCity: prevData.cBillCity,
        cShipState: prevData.cBillState,
        cShipZip: prevData.cBillZip,
        cShipCountry: prevData.cBillCountry
      }));
    }

    // Clear error for this field if any
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    // Required fields validation
    if (!formData.cBillFname) newErrors.cBillFname = 'First name is required';
    if (!formData.cBillLname) newErrors.cBillLname = 'Last name is required';
    if (!formData.cBillAddress1) newErrors.cBillAddress1 = 'Address is required';
    if (!formData.cBillCity) newErrors.cBillCity = 'City is required';
    if (!formData.cBillState) newErrors.cBillState = 'State is required';
    if (!formData.cBillZip) newErrors.cBillZip = 'ZIP code is required';
    if (!formData.cPhone) newErrors.cPhone = 'Phone number is required';
    if (!formData.cEmail) {
      newErrors.cEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.cEmail)) {
      newErrors.cEmail = 'Email is invalid';
    }
    
    // If not using same address for property, validate property address fields
    if (formData.billEqualShip === 'N') {
      if (!formData.cShipAddress1) newErrors.cShipAddress1 = 'Property address is required';
      if (!formData.cShipCity) newErrors.cShipCity = 'Property city is required';
      if (!formData.cShipState) newErrors.cShipState = 'Property state is required';
      if (!formData.cShipZip) newErrors.cShipZip = 'Property ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      console.log('Form data submitted:', formData);
      
      // Submit the form using our hook
      submitForm(formData).then(success => {
        if (success) {
          // Reset form after submission
          setFormData({
            cBillFname: '',
            cBillLname: '',
            cBillAddress1: '',
            cBillCity: '',
            cBillState: '',
            cBillZip: '',
            cBillCountry: 'USA',
            cPhone: '',
            billEqualShip: 'Y',
            cShipAddress1: '',
            cShipCity: '',
            cShipState: '',
            cShipZip: '',
            cShipCountry: 'USA',
            cEmail: ''
          });
        }
      });
    } else {
      console.log('Form has errors:', errors);
    }
  };

  // Style configurations based on props
  const textFieldStyle = {
    backgroundColor: useColor,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: useBorder ? 'rgba(0, 0, 0, 0.23)' : 'transparent',
      },
    },
    marginBottom: '8px',
  };

  const formContainerStyle = {
    textAlign: useMiddle ? 'center' : 'left',
    padding: 3,
    borderRadius: 2,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  };

  const sectionHeaderStyle = {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    marginTop: '16px',
    color: 'primary.main',
  };

  return (
    <Paper sx={formContainerStyle} elevation={3}>
      {showLogViewer && (
        <Box sx={{ mb: 3 }}>
          <LogViewer 
            maxHeight="200px" 
            showTimestamp={true}
            showLevel={true}
            showData={true}
            maxItems={50}
          />
        </Box>
      )}
      
      {!submitSuccess ? (
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold', mb: 2, textAlign: 'center', color: 'primary.main' }}>
            Kickstart Your Commission-Free Home Sale
          </Typography>
          
          <Divider sx={{ mb: 2 }} />
          
          {/* Contact Information */}
          <Typography sx={sectionHeaderStyle}>
            <PersonIcon sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: 'primary.main' }} />
            Contact Information
          </Typography>
          
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="cBillFname"
                value={formData.cBillFname}
                onChange={handleChange}
                error={!!errors.cBillFname}
                helperText={errors.cBillFname}
                size={useSize}
                sx={textFieldStyle}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="cBillLname"
                value={formData.cBillLname}
                onChange={handleChange}
                error={!!errors.cBillLname}
                helperText={errors.cBillLname}
                size={useSize}
                sx={textFieldStyle}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="cEmail"
                value={formData.cEmail}
                onChange={handleChange}
                error={!!errors.cEmail}
                helperText={errors.cEmail}
                size={useSize}
                sx={textFieldStyle}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="cPhone"
                value={formData.cPhone}
                onChange={handleChange}
                error={!!errors.cPhone}
                helperText={errors.cPhone}
                size={useSize}
                sx={textFieldStyle}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          
          {/* Owner Address */}
          <Typography sx={sectionHeaderStyle}>
            <LocationOnIcon sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: 'primary.main' }} />
            Owner Address
          </Typography>
          
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="cBillAddress1"
                value={formData.cBillAddress1}
                onChange={handleChange}
                error={!!errors.cBillAddress1}
                helperText={errors.cBillAddress1}
                size={useSize}
                sx={textFieldStyle}
                required
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="City"
                name="cBillCity"
                value={formData.cBillCity}
                onChange={handleChange}
                error={!!errors.cBillCity}
                helperText={errors.cBillCity}
                size={useSize}
                sx={textFieldStyle}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="State"
                name="cBillState"
                value={formData.cBillState}
                onChange={handleChange}
                error={!!errors.cBillState}
                helperText={errors.cBillState}
                size={useSize}
                sx={textFieldStyle}
                required
              >
                {STATES.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="ZIP Code"
                name="cBillZip"
                value={formData.cBillZip}
                onChange={handleChange}
                error={!!errors.cBillZip}
                helperText={errors.cBillZip}
                size={useSize}
                sx={textFieldStyle}
                required
              />
            </Grid>
          </Grid>
          
          {/* Property Information */}
          <Typography sx={sectionHeaderStyle}>
            <HomeWorkIcon sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: 'primary.main' }} />
            Property Information
          </Typography>
          
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.billEqualShip === 'Y'}
                    onChange={handleChange}
                    name="billEqualShip"
                    color="primary"
                    size={useSize}
                  />
                }
                label={<Typography sx={{ fontSize: '0.8rem' }}>Property address is the same as owner address</Typography>}
              />
            </Grid>
            
            {formData.billEqualShip === 'N' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Property Street Address"
                    name="cShipAddress1"
                    value={formData.cShipAddress1}
                    onChange={handleChange}
                    error={!!errors.cShipAddress1}
                    helperText={errors.cShipAddress1}
                    size={useSize}
                    sx={textFieldStyle}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Property City"
                    name="cShipCity"
                    value={formData.cShipCity}
                    onChange={handleChange}
                    error={!!errors.cShipCity}
                    helperText={errors.cShipCity}
                    size={useSize}
                    sx={textFieldStyle}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="Property State"
                    name="cShipState"
                    value={formData.cShipState}
                    onChange={handleChange}
                    error={!!errors.cShipState}
                    helperText={errors.cShipState}
                    size={useSize}
                    sx={textFieldStyle}
                    required
                  >
                    {STATES.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Property ZIP"
                    name="cShipZip"
                    value={formData.cShipZip}
                    onChange={handleChange}
                    error={!!errors.cShipZip}
                    helperText={errors.cShipZip}
                    size={useSize}
                    sx={textFieldStyle}
                    required
                  />
                </Grid>
              </>
            )}
          </Grid>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size={useButtonSize}
              disabled={submitting}
              sx={{ 
                fontWeight: 'bold', 
                px: 4,
                py: 1.5,
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
            >
              {submitting ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  SUBMITTING...
                </>
              ) : (
                'MAXIMIZE MY LISTING PROFIT NOW'
              )}
            </Button>
            <Typography sx={{ fontSize: '0.7rem', mt: 1, color: '#666' }}>
              By submitting, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </Box>
        </form>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" sx={{ color: '#2e7d32', mb: 2 }}>
            Thank You for Your Submission!
          </Typography>
          <Typography variant="body2">
            We've received your information and a member of our team will contact you shortly to discuss your flat-fee MLS listing.
          </Typography>
          <Button 
            variant="outlined" 
            color="primary"
            size={useButtonSize}
            sx={{ mt: 3 }}
            onClick={() => resetSubmission()}
          >
            Submit Another Property
          </Button>
        </Box>
      )}
    </Paper>
  );
};

// Server-side code for form submission has been moved to use-mls-form-submission.js

export default MLSFormComponent;