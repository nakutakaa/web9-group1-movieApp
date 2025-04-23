import { useState } from "react";
// AddMovie Component that handles the form for adding new movies with admin password protection
function AddMovie({ onAddMovie }) {
  //form data state with initial empty values
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    origin: "",
  });
  //password input
  const [password, setPassword] = useState("");
  //state for error message
  const [error, setError] = useState("");

  // Handles input changes for all form fields
  const handleChange = (e) => {
    // Extract name and value from the input field that triggered the change
    const { name, value } = e.target;
    // Update formData state while preserving other fields
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Password verification - only "admin123" is accepted
    if (password !== "admin123") {
      // desired password
      setError("Incorrect password");
      return; // Stop code execution if password is incorrect
    }

    const newMovie = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      reviews: [],
      likes: 0,
      dislikes: 0,
    };
    // Pass the new movie up to parent component (App.jsx)
    onAddMovie(newMovie);
    // Reset form after successful submission
    setFormData({
      title: "",
      image: "",
      description: "",
      origin: "",
    });
    setPassword(""); // Clear password field
    setError(""); // Clear any previous errors
  };
  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <h2>Add New Movie</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required // Makes field mandatory
        />
      </div>
      {/* Image URL Input */}
      <div>
        <label>Image URL:</label>
        <input
          type="url" // Special input type for URLs
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description Textarea */}
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Origin Input */}
      <div>
        <label>Origin:</label>
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password Protection */}
      <div>
        <label>Password:</label>
        <input
          type="password" // Hides input characters
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Displays error message if password is wrong */}
        {error && <p className="error">{error}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit">Add Movie</button>
    </form>
  );
}
export default AddMovie;  