import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Website is Working!</h1>
          <p className="text-gray-600 mb-6">
            The React application is loading successfully. If you can see this page, the basic setup is working.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>✅ React is working</p>
            <p>✅ Tailwind CSS is working</p>
            <p>✅ Routing is working</p>
            <p>✅ Components are loading</p>
          </div>
          <a 
            href="/"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 