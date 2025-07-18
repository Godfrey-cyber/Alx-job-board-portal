import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from "../utilities/utilities.js"

const ResetPassword = () => {
	const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      description,
      responsibilities,
      qualifications,
      skills,
      // other fields like title, location...
    };
    console.log(jobData);
    // send to backend
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title, Location, etc. */}

      <label>Job Description</label>
      <ReactQuill value={description} onChange={setDescription} />

      <label>Responsibilities</label>
      <ReactQuill value={responsibilities} onChange={setResponsibilities} />

      <label>Qualifications</label>
      <ReactQuill value={qualifications} onChange={setQualifications} />

      <label>Skills</label>
      <ReactQuill value={skills} onChange={setSkills} />

      <button type="submit">Submit Job</button>
    </form>
	)
}

export default ResetPassword