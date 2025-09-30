import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaSearch, FaFilter } from 'react-icons/fa';
import { templatesAPI } from '../../services/api';

const emptyTemplate = {
  name: '',
  category: 'Professional',
  description: '',
  preview: '',
  html: '<div class="template"><h1>{{firstName}} {{lastName}}</h1></div>',
  accentColor: '#0ea5e9',
  secondaryColor: '#0f172a',
  tertiaryColor: '#64748b',
  layout: 'executive',
  focus: 'general'
};

const AdminTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTemplate);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const { data } = await templatesAPI.list({ q: query || undefined, category: category || undefined });
      if (data.success) setTemplates(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyTemplate);
    setShowForm(true);
  };

  const openEdit = (tpl) => {
    setEditing(tpl);
    setForm({ ...tpl });
    setShowForm(true);
  };

  const onSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await templatesAPI.update(editing._id, form);
      } else {
        await templatesAPI.create(form);
      }
      setShowForm(false);
      setEditing(null);
      await fetchTemplates();
    } catch (e) {
      console.error(e);
    }
  };

  const onDelete = async (tpl) => {
    if (!window.confirm('Delete this template?')) return;
    try {
      await templatesAPI.remove(tpl._id);
      await fetchTemplates();
    } catch (e) {
      console.error(e);
    }
  };

  const onFilter = async () => {
    await fetchTemplates();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Resume Templates ({templates.length})</h1>
            <div className="flex items-center space-x-3">
              <button 
                onClick={async () => {
                  try {
                    await templatesAPI.seed();
                    await fetchTemplates();
                  } catch (e) {
                    console.error(e);
                  }
                }} 
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FaPlus className="h-4 w-4" />
                <span>Seed 220 Templates</span>
              </button>
              <button onClick={openCreate} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FaPlus className="h-4 w-4" />
                <span>Add Template</span>
              </button>
            </div>
          </div>

          <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input className="w-full pl-10 pr-3 py-2 border rounded-lg" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="w-full pl-10 pr-3 py-2 border rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Professional">Professional</option>
                <option value="Creative">Creative</option>
                <option value="Technical">Technical</option>
                <option value="Academic">Academic</option>
              </select>
            </div>
            <div>
              <button onClick={onFilter} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg">Apply</button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((tpl) => (
                  <div key={tpl._id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{tpl.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{tpl.category}</span>
                          {tpl.layout && <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">{tpl.layout}</span>}
                        </div>
                        {tpl.usageCount > 0 && (
                          <p className="text-xs text-gray-500 mt-1">Used {tpl.usageCount} times</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => openEdit(tpl)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                        <button onClick={() => onDelete(tpl)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3">{tpl.description}</p>
                    {tpl.accentColor && (
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex space-x-1">
                          <div className="w-4 h-4 rounded-full border" style={{backgroundColor: tpl.accentColor}}></div>
                          <div className="w-4 h-4 rounded-full border" style={{backgroundColor: tpl.secondaryColor}}></div>
                          {tpl.tertiaryColor && <div className="w-4 h-4 rounded-full border" style={{backgroundColor: tpl.tertiaryColor}}></div>}
                        </div>
                        <span className="text-xs text-gray-500">Color scheme</span>
                      </div>
                    )}
                  </div>
                ))}
                {templates.length === 0 && (
                  <div className="col-span-full text-center text-gray-500">No templates found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editing ? 'Edit Template' : 'Add Template'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={onSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input required className="w-full px-3 py-2 border rounded-lg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select required className="w-full px-3 py-2 border rounded-lg" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option>Professional</option>
                    <option>Creative</option>
                    <option>Technical</option>
                    <option>Academic</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea rows={2} className="w-full px-3 py-2 border rounded-lg" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Preview URL</label>
                  <input className="w-full px-3 py-2 border rounded-lg" value={form.preview} onChange={(e) => setForm({ ...form, preview: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Accent Color</label>
                  <input type="color" className="w-full px-3 py-2 border rounded-lg" value={form.accentColor || '#0ea5e9'} onChange={(e) => setForm({ ...form, accentColor: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Secondary Color</label>
                  <input type="color" className="w-full px-3 py-2 border rounded-lg" value={form.secondaryColor || '#0f172a'} onChange={(e) => setForm({ ...form, secondaryColor: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tertiary Color</label>
                  <input type="color" className="w-full px-3 py-2 border rounded-lg" value={form.tertiaryColor || '#64748b'} onChange={(e) => setForm({ ...form, tertiaryColor: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Layout</label>
                  <select className="w-full px-3 py-2 border rounded-lg" value={form.layout || 'executive'} onChange={(e) => setForm({ ...form, layout: e.target.value })}>
                    <option value="executive">Executive</option>
                    <option value="creative">Creative</option>
                    <option value="technical">Technical</option>
                    <option value="academic">Academic</option>
                    <option value="financial">Financial</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Focus</label>
                  <input className="w-full px-3 py-2 border rounded-lg" value={form.focus || 'general'} onChange={(e) => setForm({ ...form, focus: e.target.value })} placeholder="e.g., leadership, technical, creative" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Template HTML</label>
                  <textarea required rows={8} className="w-full px-3 py-2 border rounded-lg font-mono" value={form.html} onChange={(e) => setForm({ ...form, html: e.target.value })} />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2"><FaSave /><span>Save</span></button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTemplates;


