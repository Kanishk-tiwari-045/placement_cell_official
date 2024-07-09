import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

const Applicant = ({ onClose }) => {
  const [formData, setFormData] = useState({
    highest_qualification: '',
    stream: '',
    year: '',
    education_status: 'Finished',
    passing_year: '',
    cgpa: '',
    skills: [],
    address: 'NA',
    city: 'NA',
    state: 'NA',
    pincode: 'NA',
    resume: null,
    certificates: [],
  });

  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchTokenAndUserId = () => {
      const authToken = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
       setToken(authToken);
      setUserId(userId);
    };
    fetchTokenAndUserId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Assuming single file selection for resume
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('applicant', userId);
      formDataToSend.append('highest_qualification', formData.highest_qualification);
      formDataToSend.append('stream', formData.stream);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('education_status', formData.education_status);
      formDataToSend.append('passing_year', formData.passing_year);
      formDataToSend.append('cgpa', formData.cgpa);
      formData.skills.forEach(skill => {
        formDataToSend.append('skills', skill.id); // Assuming skill has an id field
      });
      formDataToSend.append('address', formData.address);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('pincode', formData.pincode);
      formDataToSend.append('resume', formData.resume);
      for (let i = 0; i < formData.certificates.length; i++) {
        formDataToSend.append('certificates', formData.certificates[i]);
      }
      
      await axios.post('http://localhost:8000/api/v1/applicantprofile/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`,
        },
      });
      alert('Applicant created successfully');
      onClose();
    } catch (error) {
      console.error('Error creating applicant:', error);
      alert('Failed to create applicant');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper style={{ padding: '40px', maxWidth: '1200px', width: '100%', borderRadius: '25px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
          Create Applicant Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Highest Qualification"
                name="highest_qualification"
                value={formData.highest_qualification}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stream"
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                fullWidth
                required
                SelectProps={{
                  native: true,
                }}
              >
                {["First", "Second", "Third", "Fourth"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Education Status"
                name="education_status"
                value={formData.education_status}
                onChange={handleChange}
                fullWidth
                required
                SelectProps={{
                  native: true,
                }}
              >
                {["Finished", "Pursuing"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Passing Year"
                type="number"
                name="passing_year"
                value={formData.passing_year}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CGPA"
                type="number"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                fullWidth
                // For displaying skills, you might use Chip or another component for better UI/UX
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="file"
                label="Resume"
                name="resume"
                onChange={handleFileChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="file"
                label="Certificates"
                name="certificates"
                onChange={handleFileChange}
                multiple
                fullWidth
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: '20px' }}>
            <Button type="submit" variant="contained" color="primary">
              Submit Details
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Applicant;