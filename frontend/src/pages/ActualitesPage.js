import { useEffect, useState } from 'react';
import { Calendar, X, Newspaper } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/FadeIn';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  return text.replace(/\u00A0/g, ' ');
};

const DEFAULT_CATEGORY_IMAGES = {
  'Actualité': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/xcdoobf2_Actualit%C3%A9-d%C3%A9faut.png',
  'Annonce': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/0ey6uzxa_Annonce-d%C3%A9faut.png',
  'Communauté': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/q6ijalbn_Communaut%C3%A9-d%C3%A9faut.png',
  'Événement': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/1vio65rk_Ev%C3%A8nement-d%C3%A9faut.png',
  'Liturgie': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/ah90qnjg_Liturgie-d%C3%A9faut.png',
  'Formation': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/3qrxsfae_Formation-d%C3%A9faut.png',
  'Solidarité': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/vj7uvn3t_Solidarit%C3%A9-d%C3%A9faut.png',
  'Vie paroissiale': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/qiitewn6_Vie-paroissiale-d%C3%A9faut.png',
  'Autre': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/rise721e_Autre-d%C3%A9faut.png',
};

const ActualitesPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/news?published_only=true`);
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  return (
    <div data-testid="actualites-page">
      <SEO
        title="Actualités"
        description="Toutes les actualités et archives de la paroisse Notre Dame d'Autan. Retrouvez les dernières nouvelles de notre communauté."
      />

      {/* Hero */}
      <section className="relative h-[40vh] md:h-[45vh] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-[#d0ada6]/30 via-slate-900 to-slate-900"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Newspaper className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4" data-testid="actualites-title">
            Actualités & Archives
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Toutes les nouvelles de notre communauté paroissiale
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : news.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20" data-testid="no-news-archive">
              <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Aucune actualité pour le moment.</p>
            </div>
          </FadeIn>
        ) : (
          <div className="space-y-6">
            {news.map((item) => (
              <FadeIn key={item.id}>
                <article
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col sm:flex-row"
                  onClick={() => setSelectedArticle(item)}
                  data-testid={`archive-card-${item.id}`}
                >
                  {/* Image */}
                  <div className="sm:w-48 md:w-56 flex-shrink-0">
                    {(item.image_url || DEFAULT_CATEGORY_IMAGES[item.category]) ? (
                      <img
                loading="lazy"
                src={item.image_url || DEFAULT_CATEGORY_IMAGES[item.category]}
                        alt={item.title}
                        className="w-full h-40 sm:h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 sm:h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                        <span className="font-serif text-4xl text-gold/30">N</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {item.category && (
                        <span className="text-xs font-medium bg-gold/10 text-gold px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-slate-deep dark:text-slate-100 mb-2 hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                      {stripHtml(item.content)}
                    </p>
                    <span className="text-gold text-sm font-medium mt-3 inline-block">
                      Lire la suite
                    </span>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
          data-testid="archive-modal-backdrop"
        >
          <div
            className="bg-white dark:bg-slate-800 sm:rounded-2xl rounded-t-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            data-testid="archive-modal"
          >
            <div className="flex-shrink-0 sm:rounded-t-2xl rounded-t-2xl overflow-hidden relative">
              {(selectedArticle.image_url || DEFAULT_CATEGORY_IMAGES[selectedArticle.category]) ? (
                <div className="relative h-48 sm:h-56">
                  <img loading="lazy" src={selectedArticle.image_url || DEFAULT_CATEGORY_IMAGES[selectedArticle.category]} alt={selectedArticle.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    {selectedArticle.category && (
                      <span className="inline-block bg-gold/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        {selectedArticle.category}
                      </span>
                    )}
                    <h2 className="font-serif text-xl sm:text-2xl text-white leading-tight">{selectedArticle.title}</h2>
                    <div className="flex items-center space-x-2 text-xs text-white/80 mt-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(selectedArticle.created_at)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 sm:p-6 bg-gradient-to-r from-gold/20 to-gold/10">
                  {selectedArticle.category && (
                    <span className="inline-block bg-gold/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {selectedArticle.category}
                    </span>
                  )}
                  <h2 className="font-serif text-xl sm:text-2xl text-slate-deep dark:text-slate-100 leading-tight">{selectedArticle.title}</h2>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mt-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(selectedArticle.created_at)}</span>
                  </div>
                </div>
              )}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-colors"
                aria-label="Fermer"
                data-testid="archive-modal-close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
              <div className="text-slate-600 dark:text-slate-400 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content.replace(/&nbsp;/g, ' ') }}
              />
            </div>

            <div className="flex-shrink-0 sm:rounded-b-2xl bg-slate-50 border-t border-slate-200 dark:border-slate-700 p-3 sm:p-4 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:text-slate-300 rounded-full font-medium transition-colors"
                data-testid="archive-modal-close-footer"
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

export default ActualitesPage;
