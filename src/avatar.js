import React, { useState } from 'react';
import axios from 'axios';

function Avatar() {
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('profileImage', profileImage);

    try {
      const response = await axios.post('http://localhost:3005/api/v1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('User created successfully!');
      console.log(response);
      setImageUrl(response.data.ImageUrl);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  return (
    <div>
      <h1>Profile Image Upload</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Profile Image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {imageUrl && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={`http://localhost:3005/${imageUrl}`} alt="Profile" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}

export default Avatar;
