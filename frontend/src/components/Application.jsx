import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';


const Application = ({ onClose }) => {
  const [formData, setFormData] = useState({
    applicant: '',
    applicant_profile: '',
    job: '',
    application_date: new Date().toISOString().substring(0, 10), // current date as default value
    stage: 1, // default value
    answers_to_ques: '',
    status: 'applied', // default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/applications', formData);
      alert('Application created successfully');
      onClose();
    } catch (error) {
      console.error('Error creating application:', error);
      alert('Failed to create application');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper style={{ padding: '40px', maxWidth: '800px', width: '100%', borderRadius: '25px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
          Create Application
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Applicant"
                name="applicant"
                value={formData.applicant}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold', // Make text inside input bold
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold', // Make label bold
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Applicant Profile"
                name="applicant_profile"
                value={formData.applicant_profile}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold', // Make text inside input bold
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold', // Make label bold
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Job"
                name="job"
                value={formData.job}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold', // Make text inside input bold
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold', // Make label bold
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Application Date"
                type="date"
                name="application_date"
                value={formData.application_date}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold', // Make text inside input bold
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold', // Make label bold
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stage"
                type="number"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold', // Make text inside input bold
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold', // Make label bold
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Answers to Questions"
                name="answers_to_ques"
                value={formData.answers_to_ques}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold', // Make text inside input bold
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold', // Make label bold
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold', // Make text inside input bold
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold', // Make label bold
                  }
                }}
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: '20px' }}>
            <Button type="submit" variant="contained" sx={{ backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}>
              Submit Application
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Application;
