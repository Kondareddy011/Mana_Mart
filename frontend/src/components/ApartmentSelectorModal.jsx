import React, { useState, useEffect } from 'react';
import { X, MapPin, Users, Building, Plus, CheckCircle, Search, Phone, ArrowRight, Compass } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

const CITIES = ['All Cities', 'Hyderabad', 'Vijayawada', 'Guntur', 'Visakhapatnam', 'Tirupati'];

export function ApartmentSelectorModal({ isOpen, onClose }) {
  const { selectedApartment, setSelectedApartment, selectedCity, setSelectedCity } = useCart();
  const { language, t } = useLanguage();
  const [apartments, setApartments] = useState([]);
  const [activeCityTab, setActiveCityTab] = useState(selectedCity || 'All Cities');
  const [search, setSearch] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newApt, setNewApt] = useState({
    name: '',
    area: '',
    city: 'Hyderabad',
    total_flats: 100,
    coordinator_name: '',
    coordinator_phone: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.getApartments()
        .then(data => {
          setApartments(data);
          if (!selectedApartment && data.length > 0) {
            setSelectedApartment(data[0]);
          }
        })
        .catch(err => console.error('Failed to load apartments', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = apartments.filter(apt => {
    const matchesCity = activeCityTab === 'All Cities' || (apt.city && apt.city.toLowerCase() === activeCityTab.toLowerCase());
    const matchesQuery = !search ||
      apt.name.toLowerCase().includes(search.toLowerCase()) ||
      apt.area.toLowerCase().includes(search.toLowerCase()) ||
      (apt.city && apt.city.toLowerCase().includes(search.toLowerCase()));
    return matchesCity && matchesQuery;
  });

  const handleSelect = (apt) => {
    setSelectedApartment(apt);
    if (apt.city) {
      setSelectedCity(apt.city);
    }
    onClose();
  };

  const handleAddNew = async (e) => {
    e.preventDefault();
    if (!newApt.name || !newApt.area) return;
    setSubmitting(true);
    try {
      const created = await api.createApartment(newApt);
      setApartments(prev => [...prev, created]);
      setSelectedApartment(created);
      setSelectedCity(created.city);
      setIsAddingNew(false);
      onClose();
    } catch (err) {
      alert('Could not submit society: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">
                {language === 'te' ? 'మీ అపార్ట్‌మెంట్ ఎంచుకోండి' : 'Select Your Apartment'}
              </h3>
              <p className="text-xs text-emerald-100">
                {language === 'te' ? 'అన్ని నగరాల గేటెడ్ కమ్యూనిటీలు & సొసైటీలు' : 'Gated Communities & Societies Across Cities'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* City Filter Pills */}
        {!isAddingNew && (
          <div className="px-6 pt-4 pb-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <Compass className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
            {CITIES.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setActiveCityTab(city);
                  if (city !== 'All Cities') setSelectedCity(city);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCityTab === city
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {city === 'All Cities' && language === 'te' ? 'అన్ని నగరాలు' : city}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {!isAddingNew ? (
            <>
              {/* Search bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder={language === 'te' ? 'అపార్ట్‌మెంట్ పేరు, ప్రాంతం లేదా నగరం వెతకండి...' : 'Search apartment by name, area or city...'}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Apartment List */}
              <div className="space-y-2.5">
                {filtered.map((apt) => {
                  const isSelected = selectedApartment?.id === apt.id;
                  return (
                    <div
                      key={apt.id}
                      onClick={() => handleSelect(apt)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{apt.name}</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[10px]">
                            {apt.city || 'City'}
                          </span>
                          {isSelected && (
                            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Active
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" /> {apt.area}, {apt.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-slate-400" /> {apt.registered_families || 25}+ families joined
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-700 italic">
                          {apt.delivery_slot_info}
                        </p>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors text-slate-400">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}

                {filtered.length === 0 && (
                  <div className="text-center py-6 text-slate-500 text-sm">
                    {language === 'te' 
                      ? 'ఈ నగరంలో అపార్ట్‌మెంట్ కనుగొనబడలేదు. మీ సొసైటీని జోడించండి!' 
                      : 'No matching apartment found in this city. Propose yours below!'}
                  </div>
                )}
              </div>

              {/* Add New Society Prompt */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" /> 
                  {language === 'te' ? '+ మీ అపార్ట్‌మెంట్ కమ్యూనిటీని నమోదు చేయండి' : '+ Propose & Add Your Apartment Community'}
                </button>
              </div>
            </>
          ) : (
            /* Add New Society Form */
            <form onSubmit={handleAddNew} className="space-y-3.5">
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs">
                ✨ Propose your apartment in any city! Once 5 families register, free clubhouse bulk delivery starts automatically.
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <select
                    value={newApt.city}
                    onChange={(e) => setNewApt({ ...newApt, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Vijayawada">Vijayawada</option>
                    <option value="Guntur">Guntur</option>
                    <option value="Visakhapatnam">Visakhapatnam</option>
                    <option value="Tirupati">Tirupati</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Apartment / Society Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., My Home Bhooja"
                    value={newApt.name}
                    onChange={(e) => setNewApt({ ...newApt, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Area / Locality *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., HITEC City, Benz Circle, MVP Colony"
                  value={newApt.area}
                  onChange={(e) => setNewApt({ ...newApt, area: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Approx Total Flats
                  </label>
                  <input
                    type="number"
                    value={newApt.total_flats}
                    onChange={(e) => setNewApt({ ...newApt, total_flats: parseInt(e.target.value) || 50 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your WhatsApp Phone
                  </label>
                  <input
                    type="text"
                    placeholder="98480..."
                    value={newApt.coordinator_phone}
                    onChange={(e) => setNewApt({ ...newApt, coordinator_phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
                >
                  {submitting ? 'Registering...' : 'Register Society'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
