import { useState } from "react";

function AddMovie({ onAddMovie }) {
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        origin: "",
    });
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== "admin123") {
            // Change this to your desired password
            setError("Incorrect password");
            return;
        }

        const newMovie = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData,
            reviews: [],
            likes: 0,
            dislikes: 0,
        };

        onAddMovie(newMovie);
        setFormData({
            title: "",
            image: "",
            description: "",
            origin: "",
        });
        setPassword("");
        setError("");
    };
    return (
        <form>
            
        </form>
    )
    
}
export default AddMovie;  