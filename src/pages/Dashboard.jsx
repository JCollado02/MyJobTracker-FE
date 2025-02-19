import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  // all of our fields
  const { logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true); // loading text so not empty on load
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    appliedDate: "",
    status: "Pending",
    notes: "",
  });

  // FETCHES JOBS ON LOAD
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/job-applications`, {
      headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },  // USE API KEY TO ACCESS OUR DB THAT WE MADE
      withCredentials: true
    })
    .then((res) => setJobs(res.data))
    .catch((error) => console.error("❌ Error fetching jobs:", error)) // ERROR CASE WE CANT LOAD
    .finally(() => setLoading(false)); // removes the loading
  }, []);

  // Add new job!
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/job-applications`,
        formData,
        {
          headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
          withCredentials: true
        }
      );

      setJobs([...jobs, res.data]);
      setFormData({ companyName: "", position: "", appliedDate: "", status: "Pending", notes: "" });
    } catch (error) {
      console.error("❌ Failed to submit job application:", error);  // error log stuff
    }
  };

  // Edit the job!
  const handleEdit = (job) => {
    setEditingJob(job.id);
    setFormData({
      companyName: job.companyName,
      position: job.position,
      appliedDate: job.appliedDate,
      status: job.status,
      notes: job.notes,
    });
  };

  // Update the job and submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/job-applications/${editingJob}`,
        formData,
        {
          headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
          withCredentials: true
        }
      );

      setJobs(jobs.map((job) => (job.id === editingJob ? res.data : job)));
      setEditingJob(null);
      setFormData({ companyName: "", position: "", appliedDate: "", status: "Pending", notes: "" });
    } catch (error) {
      console.error("❌ Failed to update job application:", error); // error crap
    }
  };

  // Delete jobs! Now with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/job-applications/${id}`, {
        headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
        withCredentials: true
      });
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("❌ Failed to delete job application:", error);
    }
  };

  return (
    <div className="mx-auto p-4 lg:p-6 font-sans bg-gray-50 min-h-screen flex flex-col items-center">
      
      {/* Header & Logout */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-4 lg:gap-0">
        <h1 className="text-3xl lg:text-4xl font-bold text-blue-600">Job Applications</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 text-sm lg:text-base rounded-md hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Main Layout: Stacks on Mobile, Side-by-Side on Desktop */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mt-6">
        
        {/* Add/Edit Job Form */}
        <div className="w-full lg:w-1/3 bg-white p-4 lg:p-6 rounded-lg shadow-md">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">{editingJob ? "Edit Job Application" : "Add Job Application"}</h2>
          <form onSubmit={editingJob ? handleEditSubmit : handleSubmit} className="flex flex-col gap-4">
            <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} required className="w-full p-2 border rounded-md text-sm lg:text-base" />
            <input type="text" name="position" placeholder="Position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required className="w-full p-2 border rounded-md text-sm lg:text-base" />
            <input type="date" name="appliedDate" value={formData.appliedDate} onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })} required className="w-full p-2 border rounded-md text-sm lg:text-base" />
            
            <select name="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full p-2 border rounded-md text-sm lg:text-base">
              <option value="Pending">Pending</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>

            <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full p-2 border rounded-md text-sm lg:text-base" rows="2"></textarea>

            <button type="submit" className="w-full py-2 text-sm lg:text-base bg-green-500 text-white rounded-md hover:bg-green-600">
              {editingJob ? "Update Job" : "Add Job"}
            </button>
          </form>
        </div>

        {/* Job Applications Table */}
        <div className="w-full lg:w-2/3 bg-white p-4 lg:p-6 rounded-lg shadow-md">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Job Applications</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading job applications...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-2">Company</th>
                    <th className="border border-gray-300 p-2">Position</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
              <tbody>
                {jobs.map((job) => (
                <tr key={job.id} className="text-center">
                  <td className="border border-gray-300 p-2">{job.companyName}</td>
                  <td className="border border-gray-300 p-2">{job.position}</td>
                  <td className="border border-gray-300 p-2">{job.appliedDate}</td>
                  <td className="border border-gray-300 p-2">{job.status}</td>
                  <td className="border border-gray-300 p-2">{job.notes || "—"}</td>
                  <td className="border border-gray-300 p-2">
                    <button onClick={() => handleEdit(job)} className="bg-yellow-400 text-black px-2 py-1 rounded-md hover:bg-yellow-500">Edit</button>
                    <button onClick={() => handleDelete(job.id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 ml-2">Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
