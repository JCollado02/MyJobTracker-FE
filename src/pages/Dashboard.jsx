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

  // Delete jobs!
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/job-applications/${id}`, {
        headers: { "X-API-KEY": import.meta.env.VITE_API_KEY }, // DEF WANT API KEY 
        withCredentials: true
      });

      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("❌ Failed to delete job application:", error);  //ERROR LOGS WOOP
    }
  };

  return (
    //lOGOUT BUTTON WORKS NOW! thanks gpt...
    <div className="mx-auto p-6 font-sans bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="flex justify-between w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-blue-600">Job Applications</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="flex gap-6 w-full max-w-6xl mt-6">
        {/* Add/Edit Job Form */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{editingJob ? "Edit Job Application" : "Add Job Application"}</h2>
          <form onSubmit={editingJob ? handleEditSubmit : handleSubmit} className="flex flex-col gap-4">
            <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} required className="border p-2 rounded-md" />
            <input type="text" name="position" placeholder="Position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required className="border p-2 rounded-md" />
            <input type="date" name="appliedDate" value={formData.appliedDate} onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })} required className="border p-2 rounded-md" />
            
            {/*Status Dropdown Menu*/}
            <select name="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="border p-2 rounded-md">
              <option value="Pending">Pending</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>

            {/* Notes Text Area, add limit to text?? */}
            <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="border p-2 rounded-md" rows="2"></textarea>

            {editingJob ? (
              <>
                <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Update Job</button>
                <button type="button" onClick={() => setEditingJob(null)} className="bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500">Cancel</button>
              </>
            ) : (
              <button type="submit" className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Add Job</button>
            )}
          </form>
        </div>

        {/* Job Applications Table, ADD LIMIT TO NOTES AND ALL TEXT */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Job Applications</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading job applications...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2">Company</th>
                  <th className="border border-gray-300 p-2">Position</th>
                  <th className="border border-gray-300 p-2">Applied Date</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Notes</th>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
