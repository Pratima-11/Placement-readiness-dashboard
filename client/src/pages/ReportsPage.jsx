// import { useDispatch, useSelector } from "react-redux";
// import { fetchReportById, fetchReports, resetReportState, selectAllReports, selectReportError, selectReportLoading } from "../slices/reportSlice";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { FaArrowLeft } from "react-icons/fa";

// const ReportsPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const reports = useSelector(selectAllReports);
//   const loading = useSelector(selectReportLoading);
//   const error = useSelector(selectReportError);

//   const [selectedId, setSelectedId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchReports());
//     return () => {
//       dispatch(resetReportState());
//     };
//   }, [dispatch]);

//   const handleSelectReport = (id) => {
//     setSelectedId(id);
//     dispatch(fetchReportById(id));
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-7xl mx-auto">
//         <button
//           onClick={() => navigate('/admin/dashboard')}
//           className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-lg bg-[#243347] border border-white/[0.1] text-gray-300 text-sm font-medium hover:bg-white/[0.1] hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
//         >
//           <FaArrowLeft className="text-xs" /> Back
//         </button>

//         <h1 className="text-3xl font-black mb-8 text-white tracking-tight">
//           Reports & Analytics
//         </h1>

//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Reports List */}
//           <aside className="w-full md:w-1/3 bg-[#1e293b] border border-white/[0.08] rounded-2xl p-6 max-h-[600px] overflow-auto">
//             <h2 className="text-lg font-bold mb-5 text-white border-b border-white/[0.08] pb-3">Reports List</h2>
//             {loading && <p className="text-center py-8 text-gray-400 text-sm">Loading reports...</p>}
//             {error && <p className="text-center py-8 text-red-400 text-sm">{error}</p>}
//             {reports.length === 0 && !loading ? (
//               <p className="py-12 text-center text-gray-500 text-sm">No reports found.</p>
//             ) : (
//               <ul className="space-y-3">
//                 {reports.map((report) => {
//                   const successRate =
//                     report.participantCount > 0
//                       ? ((report.studentsPlaced / report.participantCount) * 100).toFixed(1)
//                       : 'N/A';

//                   const isActive = report._id === selectedId;
//                   return (
//                     <li
//                       key={report._id}
//                       className={`rounded-xl transition border cursor-pointer ${
//                         isActive
//                           ? "border-indigo-500/40 bg-indigo-500/10 ring-1 ring-indigo-500/30"
//                           : "border-white/[0.08] bg-[#172033] hover:bg-[#243347] hover:border-white/[0.14]"
//                       }`}
//                     >
//                       <Link to={`/dashboard/reports/${report._id}`}>
//                         <button
//                           className="w-full text-left p-4 rounded-xl focus:outline-none"
//                           onClick={() => handleSelectReport(report._id)}
//                           tabIndex={0}
//                         >
//                           <p className="font-bold text-white text-sm truncate">
//                             {report.placementDrive?.title || "Unnamed Placement Drive"}
//                           </p>
//                           <p className="text-xs text-indigo-400 mb-1">{report.placementDrive?.companyName || "Unknown Company"}</p>
//                           <p className="text-xs text-gray-500 mb-2">
//                             {new Date(report.startDate).toLocaleDateString()} &ndash; {new Date(report.endDate).toLocaleDateString()}
//                           </p>
//                           <div className="flex flex-wrap gap-1.5 text-xs mt-1">
//                             <span className="bg-[#243347] px-2 py-0.5 rounded text-gray-300">Participants: <span className="text-white">{report.participantCount}</span></span>
//                             <span className="bg-[#243347] px-2 py-0.5 rounded text-gray-300">Offers: <span className="text-white">{report.offersMade}</span></span>
//                             <span className="bg-[#243347] px-2 py-0.5 rounded text-gray-300">Placed: <span className="text-white">{report.studentsPlaced}</span></span>
//                             <span className="bg-green-500/10 px-2 py-0.5 rounded text-green-400">Success: {successRate}%</span>
//                           </div>
//                         </button>
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </aside>
//           <div className="flex-grow" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportsPage;





import { useDispatch, useSelector } from "react-redux";
import {
  fetchReportById,
  fetchReports,
  resetReportState,
  selectAllReports,
  selectReportError,
  selectReportLoading,
} from "../slices/reportSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaArrowLeft, FaUsers, FaBriefcase, FaCheckCircle, FaChartLine } from "react-icons/fa";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reports = useSelector(selectAllReports);
  const loading = useSelector(selectReportLoading);
  const error = useSelector(selectReportError);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchReports());

    return () => {
      dispatch(resetReportState());
    };
  }, [dispatch]);

  const handleSelectReport = (id) => {
    setSelectedId(id);
    dispatch(fetchReportById(id));
  };

  const totalParticipants = reports.reduce(
    (sum, report) => sum + (report.participantCount || 0),
    0
  );

  const totalOffers = reports.reduce(
    (sum, report) => sum + (report.offersMade || 0),
    0
  );

  const totalPlaced = reports.reduce(
    (sum, report) => sum + (report.studentsPlaced || 0),
    0
  );

  return (
    <div className="min-h-screen p-6 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-lg bg-[#243347] border border-white/[0.1] text-gray-300 text-sm font-medium hover:bg-white/[0.1] hover:text-white transition"
        >
          <FaArrowLeft className="text-xs" />
          Back
        </button>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-400">
            Track placement performance and hiring statistics
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Total Reports</p>
                <h2 className="text-3xl font-black text-white mt-1">
                  {reports.length}
                </h2>
              </div>
              <FaChartLine className="text-indigo-400 text-2xl" />
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Participants</p>
                <h2 className="text-3xl font-black text-blue-400 mt-1">
                  {totalParticipants}
                </h2>
              </div>
              <FaUsers className="text-blue-400 text-2xl" />
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Offers Made</p>
                <h2 className="text-3xl font-black text-yellow-400 mt-1">
                  {totalOffers}
                </h2>
              </div>
              <FaBriefcase className="text-yellow-400 text-2xl" />
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">Students Placed</p>
                <h2 className="text-3xl font-black text-green-400 mt-1">
                  {totalPlaced}
                </h2>
              </div>
              <FaCheckCircle className="text-green-400 text-2xl" />
            </div>
          </div>

        </div>

        {/* Reports Section */}
        <div className="bg-[#1e293b] border border-white/[0.08] rounded-2xl p-6">

          <h2 className="text-xl font-bold text-white mb-6">
            Placement Reports
          </h2>

          {loading && (
            <p className="text-center py-8 text-gray-400">
              Loading reports...
            </p>
          )}

          {error && (
            <p className="text-center py-8 text-red-400">
              {error}
            </p>
          )}

          {!loading && reports.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No reports found.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {reports.map((report) => {

              const successRate =
                report.participantCount > 0
                  ? (
                      (report.studentsPlaced /
                        report.participantCount) *
                      100
                    ).toFixed(1)
                  : 0;

              const isActive = selectedId === report._id;

              return (
                <Link
                  key={report._id}
                  to={`/dashboard/reports/${report._id}`}
                  onClick={() => handleSelectReport(report._id)}
                >
                  <div
                    className={`rounded-2xl border p-5 transition-all cursor-pointer ${
                      isActive
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-white/10 bg-[#172033] hover:bg-[#243347]"
                    }`}
                  >
                    <h3 className="text-lg font-bold text-white mb-1">
                      {report.placementDrive?.title ||
                        "Placement Drive"}
                    </h3>

                    <p className="text-indigo-400 text-sm mb-4">
                      {report.placementDrive?.companyName ||
                        "Company"}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">

                      <div className="bg-white/5 rounded-xl p-3">
                        <p className="text-xs text-gray-400">
                          Participants
                        </p>
                        <p className="text-xl font-bold text-white">
                          {report.participantCount}
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-xl p-3">
                        <p className="text-xs text-gray-400">
                          Interviews
                        </p>
                        <p className="text-xl font-bold text-yellow-400">
                          {report.interviewCount}
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-xl p-3">
                        <p className="text-xs text-gray-400">
                          Offers
                        </p>
                        <p className="text-xl font-bold text-blue-400">
                          {report.offersMade}
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-xl p-3">
                        <p className="text-xs text-gray-400">
                          Placed
                        </p>
                        <p className="text-xl font-bold text-green-400">
                          {report.studentsPlaced}
                        </p>
                      </div>

                    </div>

                    {/* Success Rate */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Success Rate</span>
                        <span>{successRate}%</span>
                      </div>

                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${successRate}%`,
                          }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">
                      {new Date(
                        report.startDate
                      ).toLocaleDateString()}
                      {"  -  "}
                      {new Date(
                        report.endDate
                      ).toLocaleDateString()}
                    </p>

                    {report.summary && (
                      <p className="text-sm text-gray-400 mt-3 line-clamp-2">
                        {report.summary}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;