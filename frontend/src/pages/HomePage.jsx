import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { MonthlyBundleCard } from '../components/MonthlyBundleCard';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingDown, Users, Package, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function HomePage({
  products,
  categories,
  onExploreCatalogue,
  onOpenApartmentModal,
  onSelectCategory
}) {
  const { language, t, getCategoryTitle } = useLanguage();
  const featuredProducts = products.filter(p => p.is_featured).slice(0, 8);

  // Pre-configured Monthly Andhra Family Baskets (with English & Telugu translations)
  const bundles = [
    {
      id: 'small-family',
      titleEn: 'Couple & Small Family Basket',
      titleTe: 'చిన్న కుటుంబం ప్యాక్ (2-3 సభ్యులు)',
      subtitleEn: 'Essentials for 2-3 members for full month',
      subtitleTe: 'నెల మొత్తానికి సరిపడా ముఖ్య నిత్యావసరాలు',
      targetFamilyEn: '2 - 3 Members',
      targetFamilyTe: '2 - 3 సభ్యులు',
      bundlePrice: 2840,
      retailPrice: 3580,
      isPopular: false,
      itemIds: [
        { id: 2, qty: 1 },
        { id: 6, qty: 2 },
        { id: 10, qty: 1 },
        { id: 13, qty: 1 },
        { id: 17, qty: 1 },
      ],
      itemsListEn: [
        '10 kg Kurnool Sona Masoori Rice',
        '2 kg Unpolished Guntur Toor Dal',
        '5 Litre Freedom Sunflower Cooking Oil',
        '1 kg Guntur Yard Grade-A Red Chilli Powder',
        '10 kg Aashirvaad Sharbati Whole Wheat Atta',
      ],
      itemsListTe: [
        '10 కేజీల కర్నూలు సోనా మసూరి బియ్యం',
        '2 కేజీల గుంటూరు నాణ్యమైన కంది పప్పు',
        '5 లీటర్ల ఫ్రీడమ్ సన్‌ఫ్లవర్ నూనె',
        '1 కేజీ గుంటూరు ఘాటైన మిర్చి కారం పొడి',
        '10 కేజీల ఆశీర్వాద్ శర్బతి గోధుమ పిండి',
      ]
    },
    {
      id: 'standard-family',
      titleEn: 'Standard Andhra Family Mega Basket',
      titleTe: 'స్టాండర్డ్ ఆంధ్ర ఫ్యామిలీ మెగా ప్యాక్',
      subtitleEn: 'Complete monthly staples for 4-5 members',
      subtitleTe: '4-5 సభ్యుల పూర్తి నెలవారీ కిరాణా సరుకులు',
      targetFamilyEn: '4 - 5 Members (Most Popular)',
      targetFamilyTe: '4 - 5 సభ్యులు (అత్యంత జనాదరణ)',
      bundlePrice: 4890,
      retailPrice: 6200,
      isPopular: true,
      itemIds: [
        { id: 1, qty: 1 },
        { id: 5, qty: 1 },
        { id: 7, qty: 1 },
        { id: 10, qty: 1 },
        { id: 12, qty: 1 },
        { id: 17, qty: 1 },
        { id: 13, qty: 1 },
      ],
      itemsListEn: [
        '25 kg Kurnool Sona Masoori Rice (18-Mo Aged)',
        '5 kg Ksheera Unpolished Guntur Toor Dal',
        '2 kg Andhra Gundu Urad Dal (For Fluffy Idlis)',
        '5 Litre Freedom Refined Sunflower Oil',
        '1 Litre Heritage Danedar Pure Cow Ghee',
        '10 kg Aashirvaad Sharbati Wheat Atta',
      ],
      itemsListTe: [
        '25 కేజీల కర్నూలు సోనా మసూరి పాత బియ్యం (18 నెలలు)',
        '5 కేజీల క్షీర గుంటూరు కంది పప్పు',
        '2 కేజీల ఆంధ్ర గుండు మినప పప్పు (ఇడ్లీ, దోశ)',
        '5 లీటర్ల ఫ్రీడమ్ రిఫైన్డ్ సన్‌ఫ్లవర్ ఆయిల్',
        '1 లీటర్ హెరిటేజ్ దాణేదార్ ఆవు నెయ్యి',
        '10 కేజీల ఆశీర్వాద్ శర్బతి గోధుమ పిండి',
      ]
    },
    {
      id: 'healthy-joint',
      titleEn: 'Healthy Living & Joint Family Basket',
      titleTe: 'ఆరోగ్య & ఉమ్మడి కుటుంబ ప్యాక్',
      subtitleEn: 'Native millets, cold-pressed oils & dry fruits',
      subtitleTe: 'దేశీ చిరుధాన్యాలు, గానుగ నూనెలు & డ్రై ఫ్రూట్స్',
      targetFamilyEn: '5+ Members & Health Conscious',
      targetFamilyTe: '5+ సభ్యులు & ఆరోగ్య ప్రియులు',
      bundlePrice: 6750,
      retailPrice: 8490,
      isPopular: false,
      itemIds: [
        { id: 1, qty: 1 },
        { id: 4, qty: 1 },
        { id: 11, qty: 1 },
        { id: 12, qty: 1 },
        { id: 20, qty: 1 },
        { id: 21, qty: 1 },
      ],
      itemsListEn: [
        '25 kg Kurnool BPT Sona Masoori Old Stock',
        '2 kg Native Foxtail Millet (కొర్రలు)',
        '5 Litre Traditional Cold-Pressed Groundnut Oil',
        '1 Litre Heritage Pure Cow Ghee',
        '1 kg California Jumbo Whole Almonds (Badam)',
        '1 kg Mangalore W-240 Premium Whole Cashews',
      ],
      itemsListTe: [
        '25 కేజీల కర్నూలు సోనా మసూరి పాత బియ్యం',
        '2 కేజీల దేశీ కొర్రలు (Foxtail Millet)',
        '5 లీటర్ల చెక్క గానుగ వేరుశెనగ నూనె',
        '1 లీటర్ హెరిటేజ్ స్వచ్ఛమైన ఆవు నెయ్యి',
        '1 కేజీ కాలిఫోర్నియా బాదం పప్పు',
        '1 కేజీ మంగళూరు W-240 జీడిపప్పు',
      ]
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <HeroBanner
        onExploreCatalogue={onExploreCatalogue}
        onOpenApartmentModal={onOpenApartmentModal}
      />

      {/* Category Pills Slider / Jump Menu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              {t('exploreCategories')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('exploreCategoriesSub')}
            </p>
          </div>
          <button
            onClick={onExploreCatalogue}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group"
          >
            {t('viewAllProducts', { count: products.length })} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-center flex flex-col items-center group shadow-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-700 flex items-center justify-center transition-colors mb-2 text-xl">
                {cat.slug.includes('rice') ? '🌾' :
                 cat.slug.includes('dal') ? '🥣' :
                 cat.slug.includes('oil') ? '🫒' :
                 cat.slug.includes('spice') ? '🌶️' :
                 cat.slug.includes('flour') ? '🍞' :
                 cat.slug.includes('dry') ? '🥜' : '🧼'}
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 line-clamp-1">
                {getCategoryTitle(cat)}
              </span>
              {language === 'en' && cat.telugu_name && (
                <span className="text-[10px] text-slate-400 line-clamp-1">
                  {cat.telugu_name}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Monthly Andhra Pantry Baskets (One-Click Bulk Packs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mb-8">
            <span className="bg-amber-400 text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 mb-3">
              <Sparkles className="w-3.5 h-3.5 fill-slate-900" /> {t('oneClickPacksBadge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
              {t('curatedBasketsTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-2">
              {t('curatedBasketsSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {bundles.map((bundle) => (
              <MonthlyBundleCard
                key={bundle.id}
                bundle={bundle}
                allProducts={products}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mandi Staples Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              {t('featuredTitle')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('featuredSub')}
            </p>
          </div>
          <button
            onClick={onExploreCatalogue}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group"
          >
            {t('seeFullCatalogue')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Supermarket vs Mandi Hub Price Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {t('compareTag')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
              {t('compareTitle')}
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              {t('compareSub')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[11px]">
                  <th className="py-3 px-4">{t('colStaple')}</th>
                  <th className="py-3 px-4">{t('colMrp')}</th>
                  <th className="py-3 px-4 text-emerald-700">{t('colHubPrice')}</th>
                  <th className="py-3 px-4 text-emerald-800">{t('colSaves')}</th>
                  <th className="py-3 px-4">{t('colSourcing')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium text-slate-700">
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {language === 'te' 
                      ? 'కర్నూలు సోనా మసూరి బియ్యం (25 కేజీల బస్తా, 18 నెలల పాతవి)' 
                      : 'Kurnool Sona Masoori Rice (25 kg Bag, 18-Mo Aged)'}
                  </td>
                  <td className="py-3.5 px-4 line-through text-slate-400">₹1,850</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700">₹1,490</td>
                  <td className="py-3.5 px-4 font-bold text-amber-600">
                    {language === 'te' ? '₹360 ఆదా (20%)' : 'Save ₹360 (20%)'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {language === 'te' ? 'కర్నూలు బియ్యం మిల్లుల నుండి నేరుగా' : 'Direct Kurnool Rice Mills'}
                  </td>
                </tr>
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {language === 'te' ? 'ఫ్రీడమ్ సన్‌ఫ్లవర్ ఆయిల్ (5 లీటర్లు)' : 'Freedom Refined Sunflower Oil (5 Litre Jar)'}
                  </td>
                  <td className="py-3.5 px-4 line-through text-slate-400">₹790</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700">₹640</td>
                  <td className="py-3.5 px-4 font-bold text-amber-600">
                    {language === 'te' ? '₹150 ఆదా (19%)' : 'Save ₹150 (19%)'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {language === 'te' ? 'హోల్‌సేల్ డిపో నుండి నేరుగా' : 'Authorized Wholesale Depot'}
                  </td>
                </tr>
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {language === 'te' ? 'క్షీర గుంటూరు కంది పప్పు (5 కేజీలు, నాణ్యమైనవి)' : 'Ksheera Guntur Toor Dal (5 kg Pouch, Unpolished)'}
                  </td>
                  <td className="py-3.5 px-4 line-through text-slate-400">₹860</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700">₹695</td>
                  <td className="py-3.5 px-4 font-bold text-amber-600">
                    {language === 'te' ? '₹165 ఆదా (20%)' : 'Save ₹165 (20%)'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {language === 'te' ? 'గుంటూరు పప్పుల మండి' : 'Guntur Mandi Pulses Yard'}
                  </td>
                </tr>
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {language === 'te' ? 'గుంటూరు తేజ కారం పొడి (1 కేజీ)' : 'Guntur Teja Grade-A Red Chilli Powder (1 kg)'}
                  </td>
                  <td className="py-3.5 px-4 line-through text-slate-400">₹380</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700">₹305</td>
                  <td className="py-3.5 px-4 font-bold text-amber-600">
                    {language === 'te' ? '₹75 ఆదా (20%)' : 'Save ₹75 (20%)'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {language === 'te' ? 'గుంటూరు మిర్చి యార్డ్ డైరెక్ట్' : 'Guntur Mirchi Yard Direct'}
                  </td>
                </tr>
                <tr className="hover:bg-white/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {language === 'te' ? 'హెరిటేజ్ స్వచ్ఛమైన ఆవు నెయ్యి (1 లీటర్)' : 'Heritage Danedar Pure Cow Ghee (1 Litre)'}
                  </td>
                  <td className="py-3.5 px-4 line-through text-slate-400">₹710</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700">₹595</td>
                  <td className="py-3.5 px-4 font-bold text-amber-600">
                    {language === 'te' ? '₹115 ఆదా (16%)' : 'Save ₹115 (16%)'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {language === 'te' ? 'హెరిటేజ్ డైరీ ప్లాంట్ నుండి' : 'Heritage Foods Plant Sourcing'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            {t('testimonialsTag')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
            {t('testimonialsTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              {language === 'te'
                ? '"ట్రెండ్‌సెట్ వింజ్‌లో మా టవర్‌లోని 22 కుటుంబాలు కలిసి 25కేజీల సోనా మసూరి బియ్యం ఆర్డర్ చేశాము. బియ్యం నాణ్యత అసలైన పాత నిల్వ, అద్భుతంగా ఉంది. ఒక్క బియ్యం బస్తా మీదే ₹370 ఆదా అయింది!"'
                : '"In Trendset Winz, our tower ordered 22 bags of 25kg Sona Masoori together. The rice quality is genuine old aged stock—not like supermarket adulterated rice. Saved ₹370 just on one rice bag!"'}
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">Srinivasa Rao V.</div>
                <div className="text-[11px] text-slate-400">Flat 402, Trendset Winz, Benz Circle</div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {language === 'te' ? '₹1,820 ఆదా' : 'Saved ₹1,820'}
              </span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              {language === 'te'
                ? '"అమరావతి హైట్స్ అపార్ట్‌మెంట్ కోఆర్డినేటర్‌గా, ఈ బల్క్ బయ్యింగ్ పద్ధతి మా భవనం మొత్తానికి నెలవారీ కిరాణా సమస్యను సులభతరం చేసింది. క్లబ్‌హౌస్‌లో డెలివరీ జరిగిన వెంటనే ఎవరి బాక్స్‌ను వారు తీసుకుంటారు."'
                : '"As apartment coordinator at Amaravati Heights, this bulk buying hub simplified our whole building\'s monthly grocery. We just place orders once a month, they drop the cartons in the clubhouse, and everyone picks up their labeled box."'}
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">Lakshmi Narayana C.</div>
                <div className="text-[11px] text-slate-400">Coordinator, Amaravati Heights, Tadigadapa</div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {language === 'te' ? '58 కుటుంబాలు' : '58 Families Joined'}
              </span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              {language === 'te'
                ? '"గానుగ వేరుశెనగ నూనె మరియు గుంటూరు కారం చాలా స్వచ్ఛంగా, మంచి ఘాటైన వాసనతో ఉన్నాయి. సాధారణ ఈ-కామర్స్ కిరాణా యాప్‌లలో ఇంత తాజా మిల్లు నాణ్యత దొరకదు."'
                : '"The cold-pressed groundnut oil and Guntur chilli powder are so pure and aromatic. You simply can\'t find this fresh mandi quality in standard supermarket quick commerce apps."'}
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">Vikramaditya V.</div>
                <div className="text-[11px] text-slate-400">My Home Bhooja, HITEC City, Hyderabad</div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {language === 'te' ? '₹2,420 ఆదా' : 'Saved ₹2,420'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
