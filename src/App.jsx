import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [showNotes, setShowNotes] = useState({});
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    companyName: "",
    position: "",
    appliedDate: "",
    status: "Pending",
    notes: "",
  });
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    appliedDate: "",
    status: "Pending",
    notes: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/job-applications`)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const toggleNotes = (id) => {
    setShowNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/job-applications/${id}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      setJobs(jobs.filter((job) => job.id !== id));
    } else {
      console.error("Failed to delete job application");
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job.id);
    setEditFormData({
      companyName: job.companyName || "",
      position: job.position || "",
      appliedDate: job.appliedDate || "",
      status: job.status || "Pending",
      notes: job.notes || "",
    });
  };
  

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/job-applications/${editingJob}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      }
    );

    if (response.ok) {
      const updatedJob = await response.json();
      setJobs(jobs.map((job) => (job.id === editingJob ? updatedJob : job)));
      setEditingJob(null);
    } else {
      console.error("Failed to update job application");
    }
  };

  const handleAddChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/job-applications`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const newJob = await response.json();
      setJobs([...jobs, newJob]);
      setFormData({
        companyName: "",
        position: "",
        appliedDate: "",
        status: "Pending",
        notes: "",
      });
    } else {
      console.error("Failed to submit job application");
    }
  };

  return (
    <div className="mx-auto p-6 font-sans bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Job Applications
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No job applications found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
            key={job.id}
            className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong className="text-xl text-gray-900">{job.companyName}</strong>{" "}
                <p className="text-lg text-gray-700">{job.position}</p>
              </div>
          
              <div className="flex items-center justify-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    job.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : job.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : job.status === "Interview Scheduled"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            </div>
          
            <div className="flex justify-between items-center mt-4">
            {job.notes && (
              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={() => toggleNotes(job.id)}
                  className="text-blue-500 hover:text-blue-600 text-sm underline"
                >
                  {showNotes[job.id] ? "Hide Notes" : "Show Notes"}
                </button>
                {showNotes[job.id] && (
                  <p className="text-sm text-gray-700 bg-gray-100 p-3 rounded-lg shadow-inner">
                    {job.notes}
                  </p>
                )}
              </div>
            )}
          
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>                  
          ))}
        </ul>
      )}

    {/* Edit Job Form - Appears when editingJob is set */}
    {editingJob && (
      <form
        onSubmit={handleEditSubmit}
        className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white w-full max-w-2xl mt-6"
      >
        <h2 className="text-xl font-semibold">Edit Job Application</h2>

        <label className="text-gray-700 font-medium">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={editFormData.companyName}
          onChange={handleEditChange}
          required
          className="border p-2 rounded-md"
        />

        <label className="text-gray-700 font-medium">Position</label>
        <input
          type="text"
          name="position"
          value={editFormData.position}
          onChange={handleEditChange}
          required
          className="border p-2 rounded-md"
        />

        <label className="text-gray-700 font-medium">Applied Date</label>
        <input
          type="date"
          name="appliedDate"
          value={editFormData.appliedDate}
          onChange={handleEditChange}
          required
          className="border p-2 rounded-md"
        />

        <label className="text-gray-700 font-medium">Status</label>
        <select
          name="status"
          value={editFormData.status}
          onChange={handleEditChange}
          className="border p-2 rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>

        <label className="text-gray-700 font-medium">Notes</label>
        <textarea
          name="notes"
          value={editFormData.notes}
          onChange={handleEditChange}
          className="border p-2 rounded-md"
          rows="3"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Job
        </button>
        <button
          onClick={() => setEditingJob(null)}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 mt-2"
        >
          Cancel
        </button>
      </form>
    )}

      {/* Add Form */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
        Add Job Application
      </h2>
      <form
      onSubmit={handleAddSubmit}
      className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-white w-full max-w-2xl"
    >
      <label className="text-gray-700 font-medium">Company Name</label>
      <input
        type="text"
        name="companyName"
        placeholder="Enter company name"
        value={formData.companyName}
        onChange={handleAddChange}
        required
        className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-500"
      />

      <label className="text-gray-700 font-medium">Position</label>
      <input
        type="text"
        name="position"
        placeholder="Enter position"
        value={formData.position}
        onChange={handleAddChange}
        required
        className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-500"
      />

      <label className="text-gray-700 font-medium">Applied Date</label>
      <input
        type="date"
        name="appliedDate"
        value={formData.appliedDate}
        onChange={handleAddChange}
        required
        className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
      />

      <label className="text-gray-700 font-medium">Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleAddChange}
        className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
      >
        <option value="Pending">Pending</option>
        <option value="Interview Scheduled">Interview Scheduled</option>
        <option value="Rejected">Rejected</option>
        <option value="Accepted">Accepted</option>
      </select>

      <label className="text-gray-700 font-medium">Notes</label>
      <textarea
        name="notes"
        placeholder="Enter notes"
        value={formData.notes}
        onChange={handleAddChange}
        className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-500"
        rows="3"
      ></textarea>

      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition w-full text-lg font-medium"
      >
        Submit
      </button>
    </form>
    </div>
  );
}

export default App;