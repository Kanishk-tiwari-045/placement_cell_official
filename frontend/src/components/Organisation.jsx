// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import {
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Typography,
// } from '@mui/material';

// const Organisation = ({ onClose }) => {
//   const location = useLocation();
//   const initialData = location.state?.organisation || {
//     name: '',
//     website: '',
//     logo: '',
//     contact_details: '',
//     industry_type: '',
//     location: '',
//     email: localStorage.getItem('userEmail') || '', // Pre-fill email with the user's email from local storage
//     founded_date: '',
//     number_of_employees: '',
//     annual_revenue: '',
//     created_by: '', // Assuming this is a numeric value
//   };

//   const [formData, setFormData] = useState(initialData);

//   useEffect(() => {
//     if (location.state?.organisation) {
//       setFormData(location.state.organisation);
//     }
//   }, [location.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       logo: file,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     for (const key in formData) {
//       data.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/v1/org/create/', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Response from server:', response.data);
//       alert('Organisation created successfully');
//       onClose(); // Close the form or redirect to another page
//     } catch (error) {
//       console.error('Error creating organisation:', error.response?.data);
//       alert('Failed to create organisation');
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//       <Paper style={{ padding: '20px', maxWidth: '600px', width: '100%', borderRadius: '25px', textAlign: 'center' }}>
//         <Typography variant="h4" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
//           Create Profile
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 InputProps={{
//                   style: {
//                     borderRadius: '20px',
//                     fontWeight: 'bold',
//                   }
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontWeight: 'bold',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Website"
//                 name="website"
//                 value={formData.website}
//                 onChange={handleChange}
//                 fullWidth
//                 InputProps={{
//                   style: {
//                     borderRadius: '20px',
//                     fontWeight: 'bold',
//                   }
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontWeight: 'bold',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Logo"
//                 name="logo"
//                 type="file"
//                 onChange={handleFileChange}
//                 fullWidth
//                 InputProps={{
//                   style: {
//                     borderRadius: '20px',
//                     fontWeight: 'bold'
//                   }
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontWeight: 'bold',
//                   },
//                   shrink: true,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Contact Details"
//                 name="contact_details"
//                 value={formData.contact_details}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 InputProps={{
//                   style: {
//                     borderRadius: '20px',
//                     fontWeight: 'bold',
//                   }
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontWeight: 'bold',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Industry Type"
//                 name="industry_type"
//                 value={formData.industry_type}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 InputProps={{
//                   style: {
//                     borderRadius: '20px',
//                     fontWeight: 'bold',
//                   }
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontWeight: 'bold',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Location"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 InputProps={{
//                   style: {
//                     borderRadius: '20px',
//                     fontWeight: 'bold',
//                   }
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontWeight: 'bold',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 fullWidth
//                 required
//                 InputProps={{
//                   style: {
//                     borderRadius: '20px',
//                     fontWeight: 'bold',
//                     readOnly: true,
//                   },
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontWeight: 'bold',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Founded Date"
//                 type="date"
//                 name="founded_date"
//                 value={formData.founded_date}
//                 onChange={handleChange}
//                 fullWidth
//                 InputLabelProps={{
//                   shrink: true,
//                   style: {
//                     fontWeight: 'bold',
//                   }
//                 }}
//                 InputProps={{
//                   style: {
//                     borderRadius: '20px',
//                     fontWeight: 'bold',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Number of Employees"
//                 type="number"
//                 name="number_of_employees"
//                 value={formData.number_of_employees}
//                 onChange={handleChange}
//                 fullWidth
//                 InputProps={{
//                   style: {
//                     borderRadius: '20px',
//                     fontWeight: 'bold',
//                   }
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontWeight: 'bold',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Annual Revenue"
//                 type="number"
//                 name="annual_revenue"
//                 value={formData.annual_revenue}
//                 onChange={handleChange}
//                 fullWidth
//                 InputProps={{
//                   style: {
//                     borderRadius: '20px',
//                     fontWeight: 'bold',
//                   }
//                 }}
//                 InputLabelProps={{
//                   style: {
//                     fontWeight: 'bold',
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" sx={{ backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}>
//                 Register
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </div>
//   );
// };

// export default Organisation;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

const Organisation = ({ onClose }) => {
  const location = useLocation();
  const initialData = location.state?.organisation || {
    name: '',
    website: '',
    logo: '',
    contact_details: '',
    industry_type: '',
    location: '',
    email: localStorage.getItem('userEmail') || '', // Pre-fill email with the user's email from local storage
    founded_date: '',
    number_of_employees: '',
    annual_revenue: '',
    created_by: '', // Assuming this is a numeric value
  };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (location.state?.organisation) {
      setFormData(location.state.organisation);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      logo: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/org/create/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
      // localStorage.setItem('userEmail', email);
      localStorage.setItem('organisationId', response.data.id); // Save the organisation ID to local storage
      alert('Organisation created successfully');
      onClose(); // Close the form or redirect to another page
    } catch (error) {
      console.error('Error creating organisation:', error.response?.data);
      alert('Failed to create organisation');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper style={{ padding: '20px', maxWidth: '600px', width: '100%', borderRadius: '25px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 700 }}>
          Create Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold',
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold',
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Logo"
                name="logo"
                type="file"
                onChange={handleFileChange}
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold'
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold',
                  },
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Details"
                name="contact_details"
                value={formData.contact_details}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold',
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Industry Type"
                name="industry_type"
                value={formData.industry_type}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold',
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold',
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                fullWidth
                required
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    readOnly: true,
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Founded Date"
                type="date"
                name="founded_date"
                value={formData.founded_date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  style: {
                    fontWeight: 'bold',
                  }
                }}
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Employees"
                type="number"
                name="number_of_employees"
                value={formData.number_of_employees}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold',
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Annual Revenue"
                type="number"
                name="annual_revenue"
                value={formData.annual_revenue}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: '20px',
                    fontWeight: 'bold',
                  }
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: 'bold',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" sx={{ backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default Organisation;
