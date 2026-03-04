import { useParams, Link } from 'react-router-dom';
import { Church, MapPin, Clock, ArrowLeft, Calendar, Navigation } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';
import { clochersData } from '@/data/clochersData';

const ClocherDetailPage = () => {
  const { clocherId } = useParams();
  const clocher = clochersData[clocherId];

  if (!clocher) {
    return (
      <div className="min-h-screen bg-paper dark:bg-slate-900 py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-slate-deep dark:text-slate-100 mb-4">Église non trouvée</h1>
          <Link to="/nos-clochers" className="text-gold hover:text-gold-dark">
            Retour à la liste des clochers
          </Link>
        </div>
      </div>
    );
  }

  // Parse description for bold sections (marked with **)
  const parseDescription = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const title = part.slice(2, -2);
        return (
          <h3 key={index} className="font-serif text-xl text-slate-deep dark:text-slate-100 mt-8 mb-3 first:mt-0">
            {title}
          </h3>
        );
      }
      // Split by double newlines for paragraphs
      return part.split('\n\n').map((paragraph, pIndex) => (
        paragraph.trim() && (
          <p key={`${index}-${pIndex}`} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {paragraph}
          </p>
        )
      ));
    });
  };

  // Generate Google Maps embed URL with place search for marker
  const getMapEmbedUrl = () => {
    // Use place_id for accurate Google Place embedding
    if (clocher.placeId) {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d${clocher.coordinates.lng}!3d${clocher.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${clocher.placeId}!2s${encodeURIComponent(clocher.churchName)}!5e0!3m2!1sfr!2sfr!4v1`;
    }
    const { lat, lng } = clocher.coordinates;
    return `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
  };

  // Alternative embed URL without API key (fallback)
  const getMapEmbedUrlFallback = () => {
    const { lat, lng } = clocher.coordinates;
    const query = encodeURIComponent(`${clocher.churchName}, ${clocher.name}`);
    return `https://maps.google.com/maps?q=${query}&z=16&output=embed`;
  };

  // Get Google Maps URL for the place (fiche Google)
  const getGoogleMapsPlaceUrl = () => {
    // Use direct place search which always opens the Google Place listing
    const searchQuery = encodeURIComponent(`${clocher.churchName} ${clocher.name} France`);
    return `https://www.google.com/maps/search/${searchQuery}`;
  };

  // Generate Google Maps directions URL using place
  const getDirectionsUrl = () => {
    if (clocher.placeId) {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clocher.churchName + ' ' + clocher.name)}&destination_place_id=${clocher.placeId}`;
    }
    const query = encodeURIComponent(`${clocher.churchName} ${clocher.name}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-slate-900" data-testid={`clocher-detail-${clocherId}`}>
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[55vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
                loading="lazy"
                src={clocher.image}
            alt={clocher.churchName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
        </div>

        <SocialIcons />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 pt-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Church className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-3">
            {clocher.churchName}
          </h1>
          <div className="flex items-center justify-center text-gold-light text-lg mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{clocher.name}</span>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/nos-clochers"
          className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-gold transition-colors group"
          data-testid="back-to-clochers"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour aux clochers
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mass Schedule Section - Placeholder for CMS */}
        <section className="mb-12" data-testid="mass-schedule-section">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-gold/10 to-gold/5 px-6 py-4 border-b border-gold/20">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-gold mr-3" />
                <h2 className="font-serif text-xl text-slate-deep dark:text-slate-100 dark:text-slate-100">Prochaines messes</h2>
              </div>
            </div>
            <div className="p-6">
              {clocher.massSchedule && clocher.massSchedule.length > 0 ? (
                <div className="space-y-3">
                  {clocher.massSchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-gold mr-3" />
                        <div>
                          <p className="font-medium text-slate-deep dark:text-slate-100 dark:text-slate-100">{schedule.day}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{schedule.time}</p>
                        </div>
                      </div>
                      {schedule.type && (
                        <span className="text-sm bg-gold/10 text-gold px-3 py-1 rounded-full">
                          {schedule.type}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 mb-2">Les horaires des messes seront bientôt disponibles.</p>
                  <Link
                    to="/horaires-messes"
                    className="inline-flex items-center text-gold hover:text-gold-dark font-medium"
                  >
                    Consulter les horaires généraux
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Opening Hours - if available */}
        {clocher.openingHours && (
          <section className="mb-12">
            <div className="bg-gold/5 rounded-2xl p-6 border border-gold/20">
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-lg text-slate-deep dark:text-slate-100 mb-2">Horaires d'ouverture</h3>
                  <p className="text-slate-600 dark:text-slate-400 dark:text-slate-400">{clocher.openingHours}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Description Section */}
        <section className="mb-12" data-testid="description-section">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
            <h2 className="font-serif text-2xl text-slate-deep dark:text-slate-100 mb-6">Histoire et patrimoine</h2>
            <div className="prose prose-slate max-w-none">
              {parseDescription(clocher.description)}
            </div>
          </div>
        </section>

        {/* Location & Map Section */}
        <section className="mb-12" data-testid="map-section">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 dark:border-slate-700">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-1">Localisation</h2>
                    <a 
                      href={getGoogleMapsPlaceUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 dark:text-slate-400 hover:text-gold transition-colors"
                    >
                      {clocher.address}
                    </a>
                  </div>
                </div>
                <a
                  href={getGoogleMapsPlaceUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-lg hover:shadow-xl"
                  data-testid="directions-button"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Itinéraire
                </a>
              </div>
            </div>
            {/* Google Maps Embed with marker */}
            <div className="h-[400px] w-full">
              <iframe
                title={`Carte de ${clocher.churchName}`}
                src={getMapEmbedUrlFallback()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-xl text-slate-deep dark:text-slate-100 mb-3">
              Une question sur cette église ?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Contactez le secrétariat paroissial pour toute information complémentaire.
            </p>
            <Link
              to="/secretariat"
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Contacter le secrétariat
            </Link>
          </div>
        </section>
      </div>

      {/* Biblical Quote */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl p-8 border border-gold/20 text-center">
          <blockquote className="font-serif text-xl md:text-2xl text-slate-deep dark:text-slate-100 italic mb-4">
            "Comme il est bon, comme il est doux pour des frères de vivre ensemble !"
          </blockquote>
          <p className="text-gold font-medium">Psaume 132, 1</p>
        </div>
      </div>
    </div>
  );
};

export default ClocherDetailPage;
