import { useEffect, useState, useCallback } from 'react';
import { Calendar, MapPin, Clock, Filter, X, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';
import LocationLink from '@/components/LocationLink';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CATEGORIES = [
  { value: '', label: 'Tous' },
  { value: 'Liturgie', label: 'Liturgie' },
  { value: 'Communauté', label: 'Communauté' },
  { value: 'Jeunesse', label: 'Jeunesse' },
  { value: 'Solidarité', label: 'Solidarité' },
  { value: 'Formation', label: 'Formation' },
];

const CATEGORY_COLORS = {
  Liturgie: 'bg-violet-100 text-violet-700',
  Communauté: 'bg-amber-100 text-amber-700',
  Jeunesse: 'bg-sky-100 text-sky-700',
  Solidarité: 'bg-rose-100 text-rose-700',
  Formation: 'bg-emerald-100 text-emerald-700',
};

const AgendaPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory) params.append('category', activeCategory);
      const res = await axios.get(`${BACKEND_URL}/api/events?${params}`);
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const formatEventDate = (dateStr) => {
    try {
      return format(parseISO(dateStr), "EEEE d MMMM yyyy", { locale: fr });
    } catch {
      return dateStr;
    }
  };

  // Group events by month
  const groupedEvents = events.reduce((acc, event) => {
    const monthKey = format(parseISO(event.date), 'MMMM yyyy', { locale: fr });
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(event);
    return acc;
  }, {});

  return (
    <div data-testid="agenda-page">
      <SEO
        title="Agenda"
        description="Agenda de la paroisse Notre Dame d'Autan. Retrouvez tous les événements, messes spéciales, temps forts et activités de la communauté."
      />

      {/* Hero */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src="https://customer-assets.emergentagent.com/job_parish-site-2/artifacts/t9ksvh2k_Agenda.png"
            alt="Agenda paroissial Notre Dame d'Autan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Calendar className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-white mb-4" data-testid="agenda-title">
            Agenda paroissial
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-xl mx-auto">
            Les prochains événements de notre communauté
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <FadeIn>
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2" data-testid="agenda-filters">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
                data-testid={`filter-${cat.value || 'all'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Events List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : events.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20" data-testid="no-events">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Aucun événement à venir pour le moment.</p>
              <p className="text-slate-400 text-sm mt-2">Revenez bientôt pour découvrir nos prochains temps forts !</p>
            </div>
          </FadeIn>
        ) : (
          Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <FadeIn key={month}>
              <div className="mb-10">
                <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 capitalize mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-gold rounded-full"></span>
                  {month}
                </h2>
                <div className="space-y-4">
                  {monthEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className="w-full bg-white rounded-xl border border-slate-100 dark:border-slate-700 p-5 hover:shadow-md hover:border-gold/30 transition-all duration-300 flex gap-5 text-left cursor-pointer group"
                      data-testid={`event-card-${event.id}`}
                    >
                      {/* Date badge */}
                      <div className="flex-shrink-0 w-14 text-center">
                        <div className="text-3xl font-bold text-gold leading-none">
                          {format(parseISO(event.date), 'd')}
                        </div>
                        <div className="text-xs text-slate-500 uppercase mt-1">
                          {format(parseISO(event.date), 'MMM', { locale: fr })}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h3 className="font-medium text-slate-900 dark:text-slate-100 text-lg leading-tight break-words">
                            {event.title}
                          </h3>
                          <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[event.category] || 'bg-slate-100 text-slate-600'}`}>
                            {event.category}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400" onClick={(e) => e.stopPropagation()} style={{ overflowWrap: 'anywhere' }}>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {event.time}{event.end_time ? ` - ${event.end_time}` : ''}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <LocationLink location={event.location} iconClassName="w-3.5 h-3.5" showIcon={true} />
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatEventDate(event.date)}
                          </span>
                        </div>
                        <div className="flex justify-end mt-2">
                          <span
                            className="inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-gold-dark transition-all duration-300 group/btn"
                          >
                            <span className="group-hover/btn:font-bold transition-all duration-300">Détails</span>
                            <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))
        )}
      </div>

      {/* Modal Détails */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center px-4 pt-20 pb-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-[#93B5B7] to-[#7da4a6] p-6 rounded-t-2xl relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mb-3 bg-white/20 text-white`}>
                {selectedEvent.category}
              </span>
              <h2 className="font-serif text-2xl text-white leading-tight">
                {selectedEvent.title}
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Infos */}
              <div className="flex flex-wrap gap-4 mb-5 pb-5 border-b border-slate-100 dark:border-slate-700 dark:border-slate-700">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 dark:text-slate-400">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="capitalize">
                    {formatEventDate(selectedEvent.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 dark:text-slate-400">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>{selectedEvent.time}{selectedEvent.end_time ? ` - ${selectedEvent.end_time}` : ''}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 dark:text-slate-400">
                  <LocationLink location={selectedEvent.location} iconClassName="w-4 h-4 text-gold" showIcon={true} />
                </div>
              </div>

              {/* Description */}
              {selectedEvent.description ? (
                <div
                  className="text-slate-600 dark:text-slate-400 leading-relaxed prose prose-sm max-w-none break-words"
                  dangerouslySetInnerHTML={{ __html: selectedEvent.description.replace(/&nbsp;/g, ' ') }}
                />
              ) : (
                <p className="text-slate-400 italic text-sm">Pas de description disponible.</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 rounded-b-2xl bg-slate-50 border-t border-slate-200 dark:border-slate-700 p-3 sm:p-4 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:text-slate-300 rounded-full font-medium transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaPage;
