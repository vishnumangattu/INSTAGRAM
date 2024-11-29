import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddPost.scss';

const AddPost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('Token');
  const [images, setImages] = useState([]); // Array to store the base64 image data
  const [postedTime, setPostedTime] = useState(new Date().toLocaleTimeString());
  const [postedDate, setPostedDate] = useState(new Date().toLocaleDateString());
  const [description, setDescription] = useState('');

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostedTime(new Date().toLocaleTimeString());
    console.log(postedDate, description, images, postedTime);
    try {
      const res = await axios.post(
        'http://localhost:3008/api/addpost',
        { description, images, postedTime, postedDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      if (res.status === 201) {
        alert(res.data.msg);
        navigate('/profile');
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.error('Error while submitting post', error);
      alert('Error while submitting the post');
    }
  };

  // Handle image change
  const handleFile = async (e) => {
    const files = Object.values(e.target.files);
    const fileArray = [];

    for (let file of files) {
      const base64 = await convertToBase64(file);
      fileArray.push(base64);
    }

    setImages(fileArray);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  }

  return (
    <div className="Post">
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="image-upload">
          <label>Upload Photos</label>
          <input
            type="file"
            className="photo-input"
            onChange={handleFile}
            accept="image/*"
            multiple
            alt="Post Image"
          />
          {/* Display the uploaded images as previews */}
          <div className="image-preview-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image Preview ${index}`}
                className="preview-image"
              />
            ))}
          </div>
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Write a caption..."
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn">
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
