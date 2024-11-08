// src/Components/Common/SidebarAds.js

export default function SidebarAds() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-100 rounded-md shadow-md">
        <h3 className="text-gray-900 font-semibold mb-2">Test Engineer</h3>
        <p className="text-gray-600">Andhra Pradesh, India (On-site)</p>
        <p className="text-gray-500">Saved as Draft</p>
      </div>

      <div className="p-4 bg-gray-100 rounded-md shadow-md">
        <h3 className="text-green-600 font-semibold mb-2">
          Target your job to the right people
        </h3>
        <p className="text-gray-600">
          Include a job description and add required skills to target job
          seekers who match your criteria.
        </p>
      </div>
    </div>
  );
}
