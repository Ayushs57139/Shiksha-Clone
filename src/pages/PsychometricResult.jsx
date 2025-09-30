import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const PsychometricResult = () => {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/psychometrics/result/${resultId}`);
        if (data.success) setResult(data.data);
      } catch (e) {
        console.error(e);
        // Local fallback sample
        setResult({
          summary: 'Local preview result. This is a mocked summary because API is unavailable.',
          scores: [
            { dimensionKey: 'O', percentile: 64 },
            { dimensionKey: 'C', percentile: 58 },
            { dimensionKey: 'E', percentile: 47 },
            { dimensionKey: 'A', percentile: 71 },
            { dimensionKey: 'N', percentile: 42 }
          ]
        });
      }
      finally { setLoading(false); }
    };
    load();
  }, [resultId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!result) return <div className="p-6">Result not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Results</h1>
        <div className="bg-white border rounded-lg p-6">
          <div className="text-gray-700 mb-4">{result.summary}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.scores.map(s => (
              <div key={s.dimensionKey} className="p-4 border rounded-lg">
                <div className="font-semibold mb-1">{s.dimensionKey}</div>
                <div className="h-2 bg-gray-200 rounded">
                  <div className="h-2 bg-teal-600 rounded" style={{ width: `${s.percentile}%` }} />
                </div>
                <div className="text-sm text-gray-600 mt-1">{s.percentile}th percentile</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychometricResult;


