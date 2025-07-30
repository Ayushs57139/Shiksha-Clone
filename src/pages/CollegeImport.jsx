import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, CheckCircle, AlertCircle, X, Eye, Edit } from 'lucide-react';

const CollegeImport = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [importHistory, setImportHistory] = useState([]);
  const fileInputRef = useRef(null);

  // Sample CSV template
  const csvTemplate = `name,location,category,rating,fees,established,students,courses,image,highlights
"Indian Institute of Technology Delhi","New Delhi","engineering",4.8,"₹2.5 Lakhs",1961,8000,45,"https://example.com/image.jpg","NIRF Ranking #2,Top Placements,Research Excellence"
"Indian Institute of Management Ahmedabad","Ahmedabad","mba",4.9,"₹25 Lakhs",1961,1200,8,"https://example.com/image.jpg","NIRF Ranking #1,Global Recognition,Industry Connect"`;

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      parseCSV(selectedFile);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        return row;
      }).filter(row => Object.values(row).some(val => val !== ''));
      
      setPreviewData(data);
      validateData(data);
    };
    reader.readAsText(file);
  };

  const validateData = (data) => {
    const errors = [];
    data.forEach((row, index) => {
      if (!row.name) {
        errors.push({ row: index + 2, field: 'name', message: 'College name is required' });
      }
      if (!row.location) {
        errors.push({ row: index + 2, field: 'location', message: 'Location is required' });
      }
      if (!row.category) {
        errors.push({ row: index + 2, field: 'category', message: 'Category is required' });
      }
      if (row.rating && (isNaN(row.rating) || row.rating < 0 || row.rating > 5)) {
        errors.push({ row: index + 2, field: 'rating', message: 'Rating must be between 0 and 5' });
      }
      if (row.established && (isNaN(row.established) || row.established < 1800 || row.established > new Date().getFullYear())) {
        errors.push({ row: index + 2, field: 'established', message: 'Invalid establishment year' });
      }
      if (row.students && (isNaN(row.students) || row.students < 0)) {
        errors.push({ row: index + 2, field: 'students', message: 'Students count must be a positive number' });
      }
      if (row.courses && (isNaN(row.courses) || row.courses < 0)) {
        errors.push({ row: index + 2, field: 'courses', message: 'Courses count must be a positive number' });
      }
    });
    setValidationErrors(errors);
  };

  const handleUpload = async () => {
    if (validationErrors.length > 0) {
      alert('Please fix validation errors before uploading');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);
      
      // Add to import history
      const importRecord = {
        id: Date.now(),
        filename: file.name,
        records: previewData.length,
        status: 'success',
        timestamp: new Date().toISOString(),
        errors: validationErrors.length
      };
      setImportHistory(prev => [importRecord, ...prev]);
      
      // Clear form
      setFile(null);
      setPreviewData([]);
      setValidationErrors([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      alert(`Successfully imported ${previewData.length} colleges!`);
    }, 2000);
  };

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'college_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getValidationError = (rowIndex, field) => {
    return validationErrors.find(error => error.row === rowIndex + 2 && error.field === field);
  };

  const getFieldClass = (rowIndex, field) => {
    const error = getValidationError(rowIndex, field);
    return error ? 'border-red-500 bg-red-50' : 'border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Import Colleges</h1>
          <p className="text-gray-600">Bulk import college data using CSV files</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Import Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload CSV File</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="mb-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">
                      Choose a CSV file
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  CSV files only, max 10MB
                </p>
              </div>

              {file && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-900">{file.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        setFile(null);
                        setPreviewData([]);
                        setValidationErrors([]);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    {previewData.length} records found
                  </p>
                </div>
              )}
            </div>

            {/* Data Preview */}
            {previewData.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Data Preview</h2>
                  <div className="flex items-center gap-2">
                    {validationErrors.length > 0 ? (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{validationErrors.length} errors</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">All valid</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium text-gray-900">Name</th>
                        <th className="text-left py-2 font-medium text-gray-900">Location</th>
                        <th className="text-left py-2 font-medium text-gray-900">Category</th>
                        <th className="text-left py-2 font-medium text-gray-900">Rating</th>
                        <th className="text-left py-2 font-medium text-gray-900">Fees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.slice(0, 5).map((row, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className={`py-2 pr-2 ${getFieldClass(index, 'name')}`}>
                            {row.name}
                          </td>
                          <td className={`py-2 pr-2 ${getFieldClass(index, 'location')}`}>
                            {row.location}
                          </td>
                          <td className={`py-2 pr-2 ${getFieldClass(index, 'category')}`}>
                            {row.category}
                          </td>
                          <td className={`py-2 pr-2 ${getFieldClass(index, 'rating')}`}>
                            {row.rating}
                          </td>
                          <td className="py-2 pr-2">
                            {row.fees}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {previewData.length > 5 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Showing first 5 rows of {previewData.length} total rows
                    </p>
                  )}
                </div>

                {/* Upload Button */}
                <div className="mt-6">
                  <button
                    onClick={handleUpload}
                    disabled={isUploading || validationErrors.length > 0}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Uploading... {uploadProgress}%
                      </div>
                    ) : (
                      `Import ${previewData.length} Colleges`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Template Download */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Started</h3>
              <div className="space-y-4">
                <button
                  onClick={downloadTemplate}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </button>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Required fields:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• name (required)</li>
                    <li>• location (required)</li>
                    <li>• category (required)</li>
                    <li>• rating (0-5)</li>
                    <li>• fees</li>
                    <li>• established (year)</li>
                    <li>• students (number)</li>
                    <li>• courses (number)</li>
                    <li>• image (URL)</li>
                    <li>• highlights (comma-separated)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Import History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Import History</h3>
              <div className="space-y-3">
                {importHistory.length === 0 ? (
                  <p className="text-sm text-gray-500">No imports yet</p>
                ) : (
                  importHistory.slice(0, 5).map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{record.filename}</p>
                        <p className="text-xs text-gray-500">
                          {record.records} records • {new Date(record.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        record.status === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeImport; 