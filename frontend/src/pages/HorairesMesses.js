import { useEffect, useState, useMemo } from 'react';
import { Clock, MapPin, Bell, Filter, ChevronDown, ChevronUp, CalendarDays, X } from 'lucide-react';
import axios from 'axios';
import { SocialIcons } from '@/components/SocialIcons';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';
import LocationLink from '@/components/LocationLink';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const HorairesMesses = () => {
  const [massTimes, setMassTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [showBeyond30, setShowBeyond30] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDay, setFilterDay] = useState('');
  const [filterFromTime, setFilterFromTime] = useState('');

  useEffect(() => {
    fetchMassTimes();
  }, []);

  const fetchMassTimes = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/mass-times`);
      setMassTimes(response.data);
    } catch (error) {
      console.error('Error fetching mass times:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique values for filters
  const uniqueLocations = useMemo(() => {
    const locs = [...new Set(massTimes.map(m => m.location).filter(Boolean))];
    return locs.sort();
  }, [massTimes]);

  const uniqueTypes = useMemo(() => {
    const types = [...new Set(massTimes.map(m => m.mass_type).filter(Boolean))];
    return types.sort();
  }, [massTimes]);

  // Filter logic
  const filteredMasses = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const in30Days = new Date(today);
    in30Days.setDate(in30Days.getDate() + 30);

    return massTimes.filter(mass => {
      // 30-day filter
      if (!showBeyond30 && mass.date) {
        const massDate = new Date(mass.date + 'T00:00:00');
        if (massDate > in30Days) return false;
      }

      // Hide past masses
      if (mass.date) {
        const massDate = new Date(mass.date + 'T00:00:00');
        if (massDate < today) return false;
      }

      // Location filter
      if (filterLocation && mass.location !== filterLocation) return false;

      // Type filter
      if (filterType && mass.mass_type !== filterType) return false;

      // Day filter
      if (filterDay && mass.day !== filterDay) return false;

      // From time filter
      if (filterFromTime && mass.time) {
        const massMinutes = timeToMinutes(mass.time);
        const filterMinutes = timeToMinutes(filterFromTime);
        if (massMinutes < filterMinutes) return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort by date first, then by time
      if (a.date && b.date) {
        const cmp = a.date.localeCompare(b.date);
        if (cmp !== 0) return cmp;
      }
      return (a.time || '').localeCompare(b.time || '');
    });
  }, [massTimes, showBeyond30, filterLocation, filterType, filterDay, filterFromTime]);

  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    // Handle HH:MM or HHhMM formats
    const clean = timeStr.replace('h', ':');
    const parts = clean.split(':');
    return parseInt(parts[0] || 0) * 60 + parseInt(parts[1] || 0);
  };

  const activeFilterCount = [filterLocation, filterType, filterDay, filterFromTime].filter(Boolean).length;

  const clearFilters = () => {
    setFilterLocation('');
    setFilterType('');
    setFilterDay('');
    setFilterFromTime('');
  };

  // Count masses beyond 30 days
  const beyondCount = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const in30Days = new Date(today);
    in30Days.setDate(in30Days.getDate() + 30);
    return massTimes.filter(m => m.date && new Date(m.date + 'T00:00:00') > in30Days).length;
  }, [massTimes]);

  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900" data-testid="mass-times-page">
      <SEO title="Horaires des Messes" description="Horaires des messes et célébrations de la paroisse Notre Dame d'Autan - Castanet-Tolosan, Saint-Orens et environs." />
      {/* Hero Section with Image */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_5166d458-aa97-495f-97c0-2fdcfaf2d885/artifacts/dzqa5mxr_Horaires-messes.png"
            alt="Horaires des messes de la paroisse Notre Dame d'Autan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <SocialIcons />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Bell className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight mb-4" data-testid="page-title">
            Horaires des Messes
          </h1>
          <p className="text-gold-light font-medium mb-4 text-lg">Venez rejoindre notre communauté</p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Célébrer l'eucharistie ensemble dans la joie et la fraternité
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Filters Section */}
        {!loading && massTimes.length > 0 && (
          <div className="mb-8">
            {/* Filter toggle + 30 days toggle */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  filtersOpen || activeFilterCount > 0
                    ? 'bg-gold text-white border-gold'
                    : 'bg-white text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-gold/50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filtres</span>
                {activeFilterCount > 0 && (
                  <span className="bg-white dark:bg-slate-800 text-gold rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{activeFilterCount}</span>
                )}
                {filtersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Effacer les filtres
                </button>
              )}
            </div>

            {/* Filter controls */}
            {filtersOpen && (
              <FadeIn>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Location */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Lieu</label>
                      <select
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-gold bg-white"
                      >
                        <option value="">Tous les lieux</option>
                        {uniqueLocations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    {/* Type */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Type</label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-gold bg-white"
                      >
                        <option value="">Tous les types</option>
                        {uniqueTypes.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Day */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">Jour</label>
                      <select
                        value={filterDay}
                        onChange={(e) => setFilterDay(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-gold bg-white"
                      >
                        <option value="">Tous les jours</option>
                        {DAYS.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    {/* From time */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">À partir de</label>
                      <input
                        type="time"
                        value={filterFromTime}
                        onChange={(e) => setFilterFromTime(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Results count */}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {filteredMasses.length} {filteredMasses.length <= 1 ? 'célébration trouvée' : 'célébrations trouvées'}
              {!showBeyond30 && <span> — Horaires des 30 prochains jours</span>}
              {activeFilterCount > 0 && <span className="text-gold"> (filtrées)</span>}
            </p>
          </div>
        )}

        {loading ? (
          <p className="text-center text-slate-500 dark:text-slate-400">Chargement...</p>
        ) : massTimes.length === 0 ? (
          <div className="text-center bg-white rounded-xl p-12 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400" data-testid="no-mass-times">Les horaires des messes seront bientôt disponibles.</p>
          </div>
        ) : filteredMasses.length === 0 ? (
          <div className="text-center bg-white rounded-xl p-12 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400">Aucune célébration ne correspond à vos filtres.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-gold hover:text-gold-dark font-medium text-sm"
            >
              Effacer les filtres
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMasses.map((mass, idx) => {
              const prevDate = idx > 0 ? filteredMasses[idx - 1].date : null;
              const showDateHeader = mass.date && mass.date !== prevDate;
              return (
              <div key={mass.id}>
                {showDateHeader && (
                  <div className={`flex items-center gap-4 ${idx > 0 ? 'mt-8' : ''} mb-3`}>
                    <div className="h-px flex-1 bg-slate-200"></div>
                    <span className="text-base font-semibold text-gold uppercase tracking-wider">
                      {new Date(mass.date + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <div className="h-px flex-1 bg-slate-200"></div>
                  </div>
                )}
              <div
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
                data-testid={`mass-time-${mass.id}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-2 text-slate-deep dark:text-slate-100 dark:text-slate-100">
                      <Clock className="w-4 h-4 text-gold" />
                      <span className="font-serif text-xl font-medium">{mass.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end space-y-1">
                    <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 dark:text-slate-400">
                      <LocationLink location={mass.location} iconClassName="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gold font-medium">{mass.mass_type}</span>
                  </div>
                </div>
              </div>
              </div>
              );
            })}

            {/* Bouton voir au-delà de 30 jours — après la liste */}
            {beyondCount > 0 && !showBeyond30 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowBeyond30(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold text-gold hover:bg-gold hover:text-white font-medium transition-all duration-300"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Voir au-delà de 30 jours (+{beyondCount})</span>
                </button>
              </div>
            )}
            {showBeyond30 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowBeyond30(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-white font-medium transition-all duration-300 hover:bg-gold-dark"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Masquer au-delà de 30 jours</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Citation biblique */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
            "Quelle joie quand on m'a dit : Nous irons à la maison du Seigneur !"
          </blockquote>
          <p className="text-gold font-medium">Psaume 121, 1</p>
        </div>
      </div>
    </div>
  );
};

export default HorairesMesses;
