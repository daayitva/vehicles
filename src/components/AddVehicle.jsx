import React, { useState, useEffect } from "react";
import axios from "axios";

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    fuelType: "",
    pricePerDay: "",
    seatingCapacity: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]); // 🚗 Existing vehicles

  // 🔁 Fetch vehicles on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehicles");
      setVehicles(res.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (!formData.fuelType.trim()) newErrors.fuelType = "Fuel Type is required";
    if (!formData.pricePerDay || Number(formData.pricePerDay) <= 0)
      newErrors.pricePerDay = "Valid Price per Day is required";
    if (!formData.seatingCapacity || Number(formData.seatingCapacity) <= 0)
      newErrors.seatingCapacity = "Valid Seating Capacity is required";
    if (!imageFile) newErrors.image = "Image is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("type", formData.type);
      data.append("fuelType", formData.fuelType);
      data.append("pricePerDay", formData.pricePerDay);
      data.append("seatingCapacity", formData.seatingCapacity);
      data.append("image", imageFile);

      await axios.post("http://localhost:5000/api/vehicles", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Vehicle added successfully!");
      setFormData({
        name: "",
        type: "",
        fuelType: "",
        pricePerDay: "",
        seatingCapacity: "",
      });
      removeImage();
      setErrors({});
      fetchVehicles(); // 🔄 Refresh list
    } catch (error) {
      alert("Error adding vehicle");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this vehicle?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
      alert("Vehicle deleted!");
      fetchVehicles(); // 🔄 Refresh list
    } catch (error) {
      alert("Error deleting vehicle");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">

      <div className="p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add New Vehicle
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange}
            className={`border rounded-lg p-3 w-full ${errors.name ? "border-red-500" : "border-gray-300"}`} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input name="type" placeholder="Type" value={formData.type} onChange={handleChange}
            className={`border rounded-lg p-3 w-full ${errors.type ? "border-red-500" : "border-gray-300"}`} />
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

          <input name="fuelType" placeholder="Fuel Type" value={formData.fuelType} onChange={handleChange}
            className={`border rounded-lg p-3 w-full ${errors.fuelType ? "border-red-500" : "border-gray-300"}`} />
          {errors.fuelType && <p className="text-red-500 text-sm">{errors.fuelType}</p>}

          <input type="number" name="pricePerDay" placeholder="Price per Day" value={formData.pricePerDay} onChange={handleChange}
            className={`border rounded-lg p-3 w-full ${errors.pricePerDay ? "border-red-500" : "border-gray-300"}`} />
          {errors.pricePerDay && <p className="text-red-500 text-sm">{errors.pricePerDay}</p>}

          <input type="number" name="seatingCapacity" placeholder="Seating Capacity" value={formData.seatingCapacity} onChange={handleChange}
            className={`border rounded-lg p-3 w-full ${errors.seatingCapacity ? "border-red-500" : "border-gray-300"}`} />
          {errors.seatingCapacity && <p className="text-red-500 text-sm">{errors.seatingCapacity}</p>}

          <div>
            <label className="block mb-1 font-semibold">Vehicle Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange}
              className={`border rounded-lg p-2 w-full ${errors.image ? "border-red-500" : "border-gray-300"}`} />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

            {imagePreview && (
              <div className="mt-3 relative h-48 w-full rounded-lg overflow-hidden">
                <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                <button type="button" onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                  Remove
                </button>
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}
            className={`w-full py-3 rounded-lg text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
            {loading ? "Adding..." : "Add Vehicle"}
          </button>
        </form>
      </div>

      {/* Vehicle List with delete */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Added Vehicles</h2>
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {vehicles.length === 0 && <p className="text-gray-500 text-center">No vehicles added yet.</p>}
          {vehicles.map((v) => (
            <div key={v._id} className="bg-gray-50 border rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <img src={v.imageUrl} alt={v.name} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <p className="font-semibold">{v.name}</p>
                  <p className="text-sm text-gray-600">{v.type} | {v.fuelType}</p>
                  <p className="text-sm text-gray-600">₹{v.pricePerDay} / day | Seats: {v.seatingCapacity}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(v._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
