import { useState, useEffect } from 'react';
import { Eye, Download, Save, ChevronLeft, ChevronRight, Loader2, SearchX, AlertCircle, RefreshCw, Search, X, Check } from 'lucide-react';
import { getSDRSearchResults } from './sdrService';

const ResultsHeader = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Subscriber Current Active Mobile Number Record</h1>
      <p className="text-base text-slate-500 mt-2 max-w-4xl mx-auto">
        View and manage all mobile number and SIM records associated with the selected subscriber. The page displays the subscriber’s complete mobile connection records, including the mobile number, SIM details, operator information, activation status, deactivation status ,mnp status and other relevant connection details. If the subscriber has a single mobile connection, one record is displayed; if multiple connections are associated with the subscriber, all corresponding records are displayed separately.
      </p>
    </div>
  );
};

const ResultSummary = ({ 
  searchCriteria, 
  totalCount, 
  searchQuery, 
  onSearchChange, 
  filteredCount,
  onSaveAll,
  isSavedAll
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl p-4 mb-6 shadow-sm gap-4">
      {/* Search Input Box */}
      <div className="relative flex-1 max-w-lg">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search records by Mobile, Operator, Name, SIM, Address..."
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Criteria, Count Badges & Save All Button */}
      <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="text-xs sm:text-sm font-medium text-slate-500">Search:</span>
          <span className="text-xs sm:text-sm font-semibold text-slate-900 px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200">
            {searchCriteria}
          </span>
        </div>
        <div>
          <span className="inline-flex items-center justify-center px-3 py-1 text-xs sm:text-sm font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-200">
            {searchQuery 
              ? `${filteredCount} of ${totalCount} Records Found` 
              : `${totalCount} ${totalCount === 1 ? 'Record' : 'Records'} Found`}
          </span>
        </div>

        {/* Save All Button with Icon & Name */}
        <button
          onClick={onSaveAll}
          className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer ${
            isSavedAll
              ? 'bg-emerald-700 text-white focus:ring-emerald-600'
              : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white focus:ring-emerald-500 hover:shadow'
          }`}
          title="Save all records"
        >
          {isSavedAll ? (
            <>
              <Check className="w-4 h-4 text-emerald-200" />
              <span>Saved All!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save All</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const RowActions = ({ record, onViewInfo }) => {
  const handleViewDetails = () => {
    if (onViewInfo) {
      onViewInfo(record);
    } else {
      console.log(`Navigating to view full information for record ID: ${record?.recordId}`);
      alert(`Action: View Full Information\nNavigating to detailed view for SDR ID: ${record?.recordId}`);
    }
  };

  const handleDownload = () => {
    console.log(`Downloading record ID: ${record?.recordId}`);
    alert(`Action: Download\nInitiating download for SDR ID: ${record?.recordId}`);
  };

  const handleSave = () => {
    console.log(`Saving record ID: ${record?.recordId}`);
    alert(`Action: Save\nSaving SDR ID: ${record?.recordId}`);
  };

  return (
    <div className="flex items-center justify-end space-x-3">
      <button 
        onClick={handleViewDetails} 
        className="text-slate-500 hover:text-blue-600 transition-colors p-1.5 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer" 
        title="View Details"
        aria-label="View Details"
      >
        <Eye className="w-5 h-5" />
      </button>
      <button onClick={handleDownload} className="text-slate-500 hover:text-green-600 transition-colors p-1.5 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 cursor-pointer" title="Download SDR Record">
        <Download className="w-5 h-5" />
      </button>
      <button onClick={handleSave} className="text-slate-500 hover:text-purple-600 transition-colors p-1.5 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 cursor-pointer" title="Save SDR Record">
        <Save className="w-5 h-5" />
      </button>
    </div>
  );
};

const SDRResultRow = ({ record, index, onViewInfo }) => {
  const maskAadhaar = (aadhaar) => {
    if (!aadhaar || aadhaar.length < 12) return aadhaar;
    return `XXXX-XXXX-${aadhaar.slice(-4)}`;
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 text-center font-medium border border-slate-300">
        {index + 1}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 border border-slate-300">
        {record.telecomOperator}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700 border border-slate-300">
        {record.subscriberName}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 border border-slate-300">
        {record.parentSpouseName}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 border border-slate-300">
        {record.dateOfBirth}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 border border-slate-300">
        {record.gender}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 border border-slate-300" title={record.address}>
        {record.address}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 border border-slate-300">
        {record.mobileNumber}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 font-mono text-xs border border-slate-300">
        {record.simNumber}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 border border-slate-300">
        {record.simActivationDate}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-slate-600 text-xs border border-slate-300">
        {maskAadhaar(record.aadhaarNumber)}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 border border-slate-300">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${record.connectionType.toLowerCase() === 'prepaid' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'}`}>
          {record.connectionType}
        </span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 border border-slate-300">
        {record.alternateMobileNumber}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium bg-white group-hover:bg-slate-50 border border-slate-300">
        <RowActions record={record} onViewInfo={onViewInfo} />
      </td>
    </tr>
  );
};

const ResultsTable = ({ records, onViewInfo }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md border border-slate-300 rounded-lg shadow-sm flex flex-col">
      <div className="overflow-x-auto overflow-y-auto max-h-[600px] relative">
        <table className="min-w-full divide-y divide-slate-300 border-collapse">
          <thead className="bg-slate-100 border-b border-slate-300">
            <tr>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  S.No.
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  Telecom Operator
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  Subscriber Name
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  Father / S.O. / Spouse
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  DOB
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  Gender
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '220px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  Address
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  Mobile Number
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  SIM Number
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  SIM Activation
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  Aadhaar Number
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  Connection Type
                </div>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-slate-100 p-0 border border-slate-300">
                <div style={{ resize: 'horizontal', overflow: 'hidden', minWidth: '180px' }} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_#e2e8f0]">
                  Alternate Mobile
                </div>
              </th>
              <th scope="col" className="bg-slate-100 px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap border border-slate-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-300">
            {records.map((record, index) => (
              <SDRResultRow key={record.recordId} record={record} index={index} onViewInfo={onViewInfo} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Pagination = ({ totalCount, currentPage, itemsPerPage }) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  if (totalCount <= itemsPerPage) return null;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <div className="flex items-center justify-between px-4 py-3 mt-4 bg-white border border-slate-200 rounded-lg shadow-sm sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-700">
            Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of <span className="font-medium">{totalCount}</span> records
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed" disabled={currentPage === 1}>
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button aria-current="page" className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0">
              2
            </button>
            <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0" disabled={currentPage === totalPages}>
              <span className="sr-only">Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border border-slate-200 rounded-lg shadow-sm min-h-[400px]">
    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
    <h3 className="text-lg font-medium text-slate-900">Searching SDR Database</h3>
    <p className="text-sm text-slate-500 mt-2 max-w-sm text-center">
      Please wait while we securely retrieve the matching subscriber records...
    </p>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border border-slate-200 rounded-lg shadow-sm min-h-[400px]">
    <div className="bg-slate-100 p-4 rounded-full mb-4">
      <SearchX className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-lg font-medium text-slate-900">No SDR Records Found</h3>
    <p className="text-sm text-slate-500 mt-2 max-w-sm text-center">
      There are no subscriber records matching the provided search criteria. Please verify the identifier and try searching again.
    </p>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border border-red-200 rounded-lg shadow-sm min-h-[400px]">
    <div className="bg-red-50 p-4 rounded-full mb-4">
      <AlertCircle className="w-8 h-8 text-red-500" />
    </div>
    <h3 className="text-lg font-medium text-slate-900">Unable to load SDR records</h3>
    <p className="text-sm text-slate-500 mt-2 max-w-sm text-center mb-6">
      A secure connection to the backend could not be established or the request timed out. Please try again.
    </p>
    <button onClick={onRetry} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
      <RefreshCw className="w-4 h-4 mr-2" />
      Retry Connection
    </button>
  </div>
);

export const SDRSearchResultsPage = ({ 
  searchedParameter = "Aadhaar Number", 
  searchedValue = "XXXX-XXXX-1234",
  onSelectRecord
}) => {
  const [records, setRecords] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageState, setPageState] = useState('loading'); 
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchCriteriaText = `${searchedParameter}: ${searchedValue}`;

  const fetchResults = async () => {
    setPageState('loading');
    try {
      const response = await getSDRSearchResults({ identifier: searchedParameter, value: searchedValue });
      if (response.records.length > 0) {
        setRecords(response.records);
        setTotalCount(response.totalCount);
        setPageState('success');
      } else {
        setPageState('empty');
      }
    } catch (error) {
      console.error('Failed to fetch SDR records:', error);
      setPageState('error');
    }
  };

  useEffect(() => {
    fetchResults();
  }, [searchedParameter, searchedValue]);

  // Filter records based on the search box input
  const filteredRecords = records.filter((record) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (record.subscriberName && record.subscriberName.toLowerCase().includes(q)) ||
      (record.mobileNumber && record.mobileNumber.toLowerCase().includes(q)) ||
      (record.telecomOperator && record.telecomOperator.toLowerCase().includes(q)) ||
      (record.parentSpouseName && record.parentSpouseName.toLowerCase().includes(q)) ||
      (record.dateOfBirth && record.dateOfBirth.toLowerCase().includes(q)) ||
      (record.gender && record.gender.toLowerCase().includes(q)) ||
      (record.address && record.address.toLowerCase().includes(q)) ||
      (record.simNumber && record.simNumber.toLowerCase().includes(q)) ||
      (record.aadhaarNumber && record.aadhaarNumber.toLowerCase().includes(q)) ||
      (record.connectionType && record.connectionType.toLowerCase().includes(q)) ||
      (record.alternateMobileNumber && record.alternateMobileNumber.toLowerCase().includes(q))
    );
  });

  const [isSavedAll, setIsSavedAll] = useState(false);

  const handleSaveAll = () => {
    setIsSavedAll(true);
    const countToSave = filteredRecords.length;
    console.log(`Saving all ${countToSave} records`);
    alert(`Action: Save All\nSuccessfully saved all ${countToSave} subscriber mobile number records.`);
    setTimeout(() => {
      setIsSavedAll(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <ResultsHeader />
        
        {pageState === 'loading' && <LoadingState />}
        {pageState === 'error' && <ErrorState onRetry={fetchResults} />}
        
        {pageState === 'empty' && (
          <>
            <ResultSummary 
              searchCriteria={searchCriteriaText} 
              totalCount={0} 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredCount={0}
              onSaveAll={handleSaveAll}
              isSavedAll={isSavedAll}
            />
            <EmptyState />
          </>
        )}
        
        {pageState === 'success' && (
          <>
            <ResultSummary 
              searchCriteria={searchCriteriaText} 
              totalCount={totalCount} 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredCount={filteredRecords.length}
              onSaveAll={handleSaveAll}
              isSavedAll={isSavedAll}
            />

            {filteredRecords.length > 0 ? (
              <>
                <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                  <ResultsTable records={filteredRecords} onViewInfo={onSelectRecord} />
                </div>
                {filteredRecords.length > 0 && (
                  <Pagination totalCount={filteredRecords.length} currentPage={1} itemsPerPage={10} />
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="bg-slate-100 p-4 rounded-full mb-3 text-slate-400">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">No matching records found</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm text-center">
                  No records match "{searchQuery}". Try searching with a different mobile number, operator, or name.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                >
                  Clear Search Filter
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
