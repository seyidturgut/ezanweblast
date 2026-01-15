
import { Injectable, signal, computed } from '@angular/core';

export type Language = 'tr' | 'en' | 'ar' | 'de' | 'fr';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang = signal<Language>('tr');

  toggleLang() {
    this.currentLang.update(l => {
      if (l === 'tr') return 'en';
      if (l === 'en') return 'de';
      if (l === 'de') return 'fr';
      if (l === 'fr') return 'ar';
      return 'tr';
    });
  }

  setLang(lang: Language) {
    this.currentLang.set(lang);
  }

  // Dictionary
  t = computed(() => {
    switch (this.currentLang()) {
      case 'en': return this.EN;
      case 'ar': return this.AR;
      case 'de': return this.DE;
      case 'fr': return this.FR;
      default: return this.TR;
    }
  });

  // Prayer Name Mapper
  translatePrayerName(turkishName: string): string {
    const lang = this.currentLang();
    if (lang === 'tr') return turkishName;

    const mapEn: Record<string, string> = {
      'İmsak': 'Fajr',
      'Güneş': 'Sunrise',
      'Öğle': 'Dhuhr',
      'İkindi': 'Asr',
      'Akşam': 'Maghrib',
      'Yatsı': 'Isha'
    };

    const mapAr: Record<string, string> = {
      'İmsak': 'الفجر',
      'Güneş': 'الشروق',
      'Öğle': 'الظهر',
      'İkindi': 'العصر',
      'Akşam': 'المغرب',
      'Yatsı': 'العشاء'
    };

    const mapDe: Record<string, string> = {
      'İmsak': 'Fadschr',
      'Güneş': 'Sonnenaufgang',
      'Öğle': 'Dhuhr',
      'İkindi': 'Asr',
      'Akşam': 'Maghrib',
      'Yatsı': 'Ischa'
    };

    const mapFr: Record<string, string> = {
      'İmsak': 'Fajr',
      'Güneş': 'Lever du Soleil',
      'Öğle': 'Dhuhr',
      'İkindi': 'Asr',
      'Akşam': 'Maghrib',
      'Yatsı': 'Isha'
    };

    if (lang === 'ar') return mapAr[turkishName] || turkishName;
    if (lang === 'de') return mapDe[turkishName] || turkishName;
    if (lang === 'fr') return mapFr[turkishName] || turkishName;
    return mapEn[turkishName] || turkishName;
  }

  private TR = {
    seo: {
      title: 'Ezan Vakti Pro | Doğru Namaz Vakitleri ve Kıble Yönü',
      desc: 'Ezan Vakti Pro ile doğru namaz vakitleri, kıble bulucu, ezan bildirimi ve canlı Kur’an radyo. Hızlı, modern ve konuma göre otomatik hesaplama.',
      keywords: 'namaz vakitleri, ezan saatleri, kıble bulma, canlı kuran radyo, islam uygulaması, diyanet namaz vakti, ezan bildirimi, konuma göre namaz'
    },
    nav: {
      features: 'Özellikler',
      library: 'Kütüphane',
      reviews: 'Yorumlar',
      faq: 'SSS',
      download: 'İndir',
      menu: 'Menü',
      mobile_download: 'Hemen İndir'
    },
    hero: {
      badge: '#1 İslami Yaşam Asistanı',
      title_start: 'Hayat Yolculuğunuzu',
      title_end: 'kolaylaştırır.',
      desc: 'En doğru namaz vakitleri, Kuran-ı Kerim, Kıble pusulası ve Ramazan imsakiyesi. İbadetlerinize odaklanmanız için tasarlanmış modern bir uygulama.',
      btn_download: 'Ücretsiz İndir',
      btn_watch: 'Tanıtımı İzle',
      social_proof: 'Milyonlarca Müslümanın tercihi',
      next_prayer: 'SONRAKİ VAKİT',
      calculating: 'Hesaplanıyor',
      remaining: 'Kalan',
      location_request_msg: 'En doğru namaz vakitleri için konum izni vermeniz gerekmektedir. İzin vermek istiyor musunuz?',
      location_denied: 'Konum izni engellenmiş. Lütfen tarayıcı ayarlarından konuma izin verin ve tekrar deneyin.',
      location_updated: 'Konum başarıyla güncellendi.'
    },
    radio: {
      title: 'Kuran Radyo',
      subtitle: 'Canlı Yayın',
      playing: 'Çalıyor',
      paused: 'Duraklatıldı'
    },
    hikmet: {
      title: 'Hikmetname',
      subtitle: 'Her gün yenilenen maneviyat dolu içerikler.',
      verse_title: 'Günün Ayeti',
      hadith_title: 'Günün Hadisi',
      share: 'Paylaş',
      share_success: 'Bağlantı kopyalandı!'
    },
    features: {
      title: 'Düzenli bir İslami yaşam için her şey',
      subtitle: 'Tek bir uygulamada ihtiyacınız olan tüm özellikler, modern ve sade tasarım.',
      bento: {
        stats_features: '29+',
        stats_features_desc: 'Fazla Gelişmiş Özellik',
        ui_title: 'Kullanıcı Dostu Arayüz',
        ui_desc: 'Göz yormayan, sade ve akıcı tasarım dili ile ibadetlerinize odaklanın.',
        quran_title: 'Kur\'an ve Tecvid',
        quran_desc: 'Renkli tecvid, kelime kelime meal ve gelişmiş okuma modları.',
        stats_hafiz: '19+',
        stats_hafiz_desc: 'Farklı Hafız Seçeneği',
        themes_title: 'Özel Temalar',
        themes_desc: 'Uygulamayı zevkinize göre kişiselleştirin.'
      }
    },
    timeline: {
      title: 'Günlük manevi yolculuğunuz',
      steps: [
        { title: 'İmsak / Sabah', sub: 'GÜNÜN BAŞLANGICI', desc: 'Sahur veya sabah namazı için sizi ürkütmeden uyandıran nazik ön alarm.' },
        { title: 'Öğle', sub: 'GÜN ORTASI', desc: 'İş yoğunluğuna manevi bir mola verin. Otomatik sessiz mod ile odaklanın.' },
        { title: 'İkindi', sub: 'İKİNDİ VAKTİ', desc: 'Görsel geri sayım ile günün işlerini toparlayıp namaza hazırlanın.' },
        { title: 'Akşam', sub: 'GÜN BATIMI', desc: 'İftar için tam vakit. Ezan okunduktan hemen sonra günlük duanızı okuyun.' },
        { title: 'Yatsı', sub: 'GECE', desc: 'Günü karanlık modda Kuran tilaveti ile huzurla tamamlayın.' }
      ]
    },
    screenshots: {
      title: 'Sade ve Huzurlu Arayüz',
      desc: 'Göz yormayan, modern ve akıcı tasarım ile ibadetlerinize odaklanın.',
      images: [
        'https://ezanvaktipro.com/img/1.webp',
        'https://ezanvaktipro.com/img/2.webp',
        'https://ezanvaktipro.com/img/3.webp',
        'https://ezanvaktipro.com/img/4.webp',
        'https://ezanvaktipro.com/img/5.webp',
        'https://ezanvaktipro.com/img/6.webp',
        'https://ezanvaktipro.com/img/7.webp'
      ]
    },
    testimonials: {
      badge: '600.000+ Değerlendirme',
      title: 'Kullanıcılarımız ne diyor?',
      reviews: [
        { name: "Rukiye DÜZGÜN", date: "2025-11-12", text: "Gerçekten çok faydalı bir uygulama, emeği geçenlerden Allah razı olsun. Titreşimli uyarı olsa harika olurdu." },
        { name: "Muhammet Raşit Aydın", date: "2025-11-20", text: "Kategorideki diğer uygulamalara göre gayet güzel kullanışlı. Kararlılığı ve stabilizasyonu çok iyi." },
        { name: "Neco Dayı", date: "2025-10-30", text: "Vakit saatinde uyarıyı vaktinde yapıyor. Otomatik sessize alma özelliği harika. Israrla tavsiye ediyorum." },
        { name: "Oytun Can", date: "2025-09-25", text: "10 yıldız olsa 10 yıldız veririm. Günü kolaylaştırıyor. Gerçekten kazandıkları parayı hak ediyorlar." },
        { name: "Nurbeyza", date: "2025-09-22", text: "Bir hafız olarak uygulamayı çok beğendim. Kur'an okurken tecvid renklendirme olması çok güzel." },
        { name: "Fatma Öztürk", date: "2025-11-02", text: "Çok güzel uygulama, teşekkür ediyorum. Saatinde hatırlatma çok iyi." },
        { name: "HASRET AYIK", date: "2025-09-12", text: "Namaz vakitlerini takip etmek için kullanıyoruz. Yeni telefon aldığımda da ilk bunu kuracağım." }
      ]
    },
    faq: {
      title: 'Sıkça Sorulan Sorular',
      items: [
        { q: "Ezan Vakti Pro ücretsiz mi?", a: "Evet; namaz vakitleri, ezan bildirimleri ve kıble pusulası gibi temel özellikler tamamen ücretsizdir." },
        { q: "Uygulama internetsiz çalışır mı?", a: "Kesinlikle. Aylık vakitleri bir kez indirdikten sonra internet bağlantısı gerekmez." },
        { q: "Ezan sesini değiştirebilir miyim?", a: "Evet, farklı müezzinler seçebilir, standart uyarı sesleri kullanabilir veya sadece titreşim yapabilirsiniz." },
        { q: "Hangi hesaplama yöntemlerini destekliyorsunuz?", a: "Diyanet İşleri Başkanlığı, Fazilet, IGMG ve diğer yerel hesaplama yöntemlerini destekliyoruz." },
        { q: "iOS versiyonu var mı?", a: "Şu anda en iyi Android deneyimine odaklanmış durumdayız, ancak iOS versiyonu planlarımız arasında." }
      ]
    },
    partners: {
      badge: 'İş Ortakları',
      title: 'Güvenilir Ortaklarımız'
    },
    download_cta: {
      title: 'İbadetlerinize odaklanmaya hazır mısınız?',
      subtitle: 'Doğru vakitler, sade arayüz ve gönül rahatlığı. Ezan Vakti Pro\'ya güvenen milyonlara katılın.',
      play_small: 'Google Play\'den',
      play_large: 'İndir',
      app_small: 'App Store\'dan',
      app_large: 'İndir',
      compatibility: 'Android ve iOS cihazlar için uyumludur'
    },
    delete_account: {
      title: 'Hesap silme formu',
      placeholder: 'E-posta Adresiniz',
      btn: 'Gönder',
      desc: 'Hesap silme talebiniz işleme alındığında verileriniz kalıcı olarak silinecektir.',
      alert_success: 'Talebiniz başarıyla gönderildi. İşleminiz en kısa sürede tamamlanacaktır.',
      alert_error: 'Otomatik gönderimde bir sorun oluştu. E-posta istemciniz açılıyor...'
    },
    footer: {
      privacy: 'Gizlilik Politikası',
      terms: 'Kullanım Şartları',
      rights: 'Tüm hakları saklıdır.',
      address_title: 'Adres',
      address_text: '<a href="https://www.deen-studios.com/" target="_blank" class="hover:text-primary-600 dark:hover:text-primary-500 transition-colors font-bold text-lg mb-2 inline-block">Deen studios.</a><br><p class="mb-4 text-xs opacity-80 leading-relaxed text-slate-600 dark:text-slate-400">Deneyimli ve tutkulu Müslüman yazılımcı, tasarımcı ve büyüme uzmanlarından oluşan bir ekibiz. Startuplar ve kurumsal firmalarda uygulamalar geliştirip ölçekleme konusunda 10+ yıllık tecrübeye sahibiz. Finansmanımız, dünyadaki büyük oyun ve tüketici şirketlerini yöneten Müslüman yatırımcılardan geliyor.</p><a href="mailto:hello@deen-studios.com" class="text-primary-600 dark:text-primary-500 hover:underline flex items-center gap-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>hello@deen-studios.com</a>',
      contact_title: 'İletişim Bilgileri',
      contact_text: 'Sizden haber almaktan mutluluk duyarız.'
    },
    library: {
      kuran: 'Online Kuran-ı Kerim',
      hikmet: 'Hikmetname',
      ruya: 'Rüya Tabirleri',
      ilmihal: 'İlmihal',
      terimler: 'Dini Terimler',
      delail: 'Delail-i Hayrat',
      tasbeeh_ar: 'Arabic Salat Tasbeeh',
      tasbeeh_tr: 'Arapça Namaz Tesbihatı TR',
      subtitle: 'Kitap & Kaynak'
    },
    app_prompt: {
      title: 'Ezan Vakti Pro',
      desc_android: 'Google Play\'den ÜCRETSİZ İndir',
      desc_ios: 'App Store\'dan ÜCRETSİZ İndir',
      btn: 'YÜKLE'
    }
  };

  private EN = {
    seo: {
      title: 'Ezan Vakti Pro | Accurate Prayer Times & Qibla Finder',
      desc: 'Get accurate global prayer times, Qibla direction, live Qur’an radio and smart Adhan alerts. Fast, modern and location-based Islamic app.',
      keywords: 'prayer times, adhan alerts, qibla finder, islamic app, qur\'an radio, muslim prayer schedule, accurate prayer timetable, location-based prayer times'
    },
    nav: {
      features: 'Features',
      library: 'Library',
      reviews: 'Reviews',
      faq: 'FAQ',
      download: 'Download',
      menu: 'Menu',
      mobile_download: 'Download Now'
    },
    hero: {
      badge: '#1 Islamic Life Assistant',
      title_start: 'Simplifying your',
      title_end: 'Life Journey.',
      desc: 'Accurate prayer times, Quran, Qibla compass, and Ramadan calendar. A modern app designed for you to focus on your worship.',
      btn_download: 'Download Free',
      btn_watch: 'Watch Video',
      social_proof: 'Chosen by millions of Muslims',
      next_prayer: 'NEXT PRAYER',
      calculating: 'Calculating',
      remaining: 'Remaining',
      location_request_msg: 'We need your permission to determine your location for accurate times. Do you want to allow it?',
      location_denied: 'Location permission denied. Please enable location in your browser settings and try again.',
      location_updated: 'Location updated successfully.'
    },
    radio: {
      title: 'Quran Radio',
      subtitle: 'Live Stream',
      playing: 'Playing',
      paused: 'Paused'
    },
    hikmet: {
      title: 'Hikmetname',
      subtitle: 'Spiritual content renewed every day.',
      verse_title: 'Verse of the Day',
      hadith_title: 'Hadith of the Day',
      share: 'Share',
      share_success: 'Link copied!'
    },
    features: {
      title: 'Everything for an organized Islamic life',
      subtitle: 'All the features you need in one app, with a modern and simple design.',
      bento: {
        stats_features: '29+',
        stats_features_desc: 'Advanced Features',
        ui_title: 'User Friendly Interface',
        ui_desc: 'Focus on your worship with a design language that is simple, fluid and easy on the eyes.',
        quran_title: 'Quran & Tajweed',
        quran_desc: 'Colored Tajweed, word-by-word translation and advanced reading modes.',
        stats_hafiz: '19+',
        stats_hafiz_desc: 'Different Reciters',
        themes_title: 'Custom Themes',
        themes_desc: 'Personalize the app according to your taste.'
      },
    },
    timeline: {
      title: 'Your daily spiritual journey',
      steps: [
        { title: 'Fajr / Morning', sub: 'START OF DAY', desc: 'A gentle pre-alarm to wake you up for Sahur or Morning prayer without startling.' },
        { title: 'Dhuhr', sub: 'MIDDAY', desc: 'Take a spiritual break from work stress. Focus with automatic silent mode.' },
        { title: 'Asr', sub: 'AFTERNOON', desc: 'Get ready for prayer by wrapping up daily tasks with visual countdown.' },
        { title: 'Maghrib', sub: 'SUNSET', desc: 'Time for Iftar. Read your daily prayer right after the Adhan.' },
        { title: 'Isha', sub: 'NIGHT', desc: 'End the day peacefully with Quran recitation in dark mode.' }
      ]
    },
    screenshots: {
      title: 'Simple and Peaceful Interface',
      desc: 'Focus on your worship with a modern, fluid design that doesn\'t tire your eyes.',
      images: [
        'https://ezanvaktipro.com/img/en/en01.webp',
        'https://ezanvaktipro.com/img/en/en02.webp',
        'https://ezanvaktipro.com/img/en/en03.webp',
        'https://ezanvaktipro.com/img/en/en04.webp',
        'https://ezanvaktipro.com/img/en/en05.webp',
        'https://ezanvaktipro.com/img/en/en06.webp',
        'https://ezanvaktipro.com/img/en/en07.webp',
        'https://ezanvaktipro.com/img/en/en08.webp',
        'https://ezanvaktipro.com/img/en/en09.webp'
      ]
    },
    testimonials: {
      badge: '600,000+ Reviews',
      title: 'What do our users say?',
      reviews: [
        { name: "Rukiye DÜZGÜN", date: "2025-11-12", text: "Truly a very useful application, may Allah bless those who made it. It would be great if there was a vibration alert." },
        { name: "Muhammet Raşit Aydın", date: "2025-11-20", text: "Very convenient and useful compared to other apps in the category. Stability is excellent." },
        { name: "Neco Dayı", date: "2025-10-30", text: "It alerts exactly on time. The automatic silent mode feature is wonderful. I highly recommend it." },
        { name: "Oytun Can", date: "2025-09-25", text: "I would give 10 stars if I could. It makes the day easier. They really deserve what they earn." },
        { name: "Nurbeyza", date: "2025-09-22", text: "As a Hafiz, I really liked the application. Colored Tajweed in Quran reading is very nice." },
        { name: "Fatma Öztürk", date: "2025-11-02", text: "Very nice application, thank you. The timely reminders are very good." },
        { name: "HASRET AYIK", date: "2025-09-12", text: "We use it to track prayer times. It's the first thing I install on a new phone." }
      ]
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: "Is Ezan Vakti Pro free?", a: "Yes; basic features like prayer times, adhan notifications, and qibla compass are completely free." },
        { q: "Does the app work offline?", a: "Absolutely. Once you download the monthly times, no internet connection is required." },
        { q: "Can I change the Adhan sound?", a: "Yes, you can choose different muezzins, use standard alert sounds, or just use vibration." },
        { q: "Which calculation methods do you support?", a: "We support Presidency of Religious Affairs, Fazilet, IGMG, and other local calculation methods." },
        { q: "Is there an iOS version?", a: "We are currently focused on the best Android experience, but an iOS version is in our plans." }
      ]
    },
    partners: {
      badge: 'Partners',
      title: 'Trusted Partners'
    },
    download_cta: {
      title: 'Are you ready to focus on your worship?',
      subtitle: 'Accurate times, simple interface and peace of mind. Join millions who trust Ezan Vakti Pro.',
      play_small: 'GET IT ON',
      play_large: 'Google Play',
      app_small: 'Download on the',
      app_large: 'App Store',
      compatibility: 'Compatible with Android and iOS devices'
    },
    delete_account: {
      title: 'Delete account form',
      placeholder: 'Your Email Address',
      btn: 'Submit',
      desc: 'When your account deletion request is processed, your data will be permanently deleted.',
      alert_success: 'Your request has been sent successfully. Your transaction will be completed as soon as possible.',
      alert_error: 'There was a problem with automatic sending. Opening your email client...'
    },
    footer: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      rights: 'All rights reserved.',
      address_title: 'Address',
      address_text: '<a href="https://www.deen-studios.com/" target="_blank" class="hover:text-primary-600 dark:hover:text-primary-500 transition-colors font-bold text-lg mb-2 inline-block">Deen studios.</a><br><p class="mb-4 text-xs opacity-80 leading-relaxed text-slate-600 dark:text-slate-400">We are a team of experienced and passionate Muslim developers, designers, and growth experts. We have 10+ years of experience in developing and scaling applications for startups and corporate firms. Our funding comes from Muslim investors who manage major gaming and consumer companies worldwide.</p><a href="mailto:hello@deen-studios.com" class="text-primary-600 dark:text-primary-500 hover:underline flex items-center gap-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>hello@deen-studios.com</a>',
      contact_title: 'Contact Information',
      contact_text: 'We would love to hear from you.'
    },
    library: {
      kuran: 'Online Quran',
      hikmet: 'Hikmetname',
      ruya: 'Dream Interpretations',
      ilmihal: 'Catechism (Ilmihal)',
      terimler: 'Religious Terms',
      delail: 'Dalail al-Khayrat',
      tasbeeh_ar: 'Arabic Salat Tasbeeh',
      tasbeeh_tr: 'Arabic Prayer Tasbihat TR',
      subtitle: 'Book & Resource'
    },
    app_prompt: {
      title: 'Ezan Vakti Pro',
      desc_android: 'Download FREE from Google Play',
      desc_ios: 'Download FREE from App Store',
      btn: 'INSTALL'
    }
  };

  private AR = {
    seo: {
      title: 'أذان وقتي برو | مواقيت صلاة دقيقة واتجاه القبلة',
      desc: 'مواقيت صلاة دقيقة، اتجاه القبلة، راديو القرآن المباشر وتنبيهات الأذان الذكية. تطبيق إسلامي موثوق وسهل يعمل على الويب وأندرويد و iOS.',
      keywords: 'مواقيت الصلاة، اتجاه القبلة، تنبيه الأذان، راديو القرآن، تطبيق اسلامي، اوقات الامساك، الصلاة حسب الموقع'
    },
    nav: {
      features: 'المميزات',
      library: 'المكتبة',
      reviews: 'التقييمات',
      faq: 'الأسئلة الشائعة',
      download: 'تحميل',
      menu: 'القائمة',
      mobile_download: 'حمل الآن'
    },
    hero: {
      badge: '#1 مساعد الحياة الإسلامية',
      title_start: 'تبسيط',
      title_end: 'رحلة حياتك.',
      desc: 'مواقيت الصلاة الدقيقة، القرآن الكريم، بوصلة القبلة، وإمساكية رمضان. تطبيق حديث مصمم خصيصًا لتركز على عبادتك.',
      btn_download: 'تحميل مجاني',
      btn_watch: 'شاهد الفيديو',
      social_proof: 'اختيار ملايين المسلمين',
      next_prayer: 'الصلاة القادمة',
      calculating: 'جاري الحساب',
      remaining: 'المتبقي',
      location_request_msg: 'نحتاج إلى إذنك لتحديد موقعك للحصول على أوقات دقيقة. هل تريد السماح بذلك؟',
      location_denied: 'تم رفض إذن الموقع. يرجى تمكين الموقع في إعدادات المتصفح والمحاولة مرة أخرى.',
      location_updated: 'تم تحديث الموقع بنجاح.'
    },
    radio: {
      title: 'إذاعة القرآن',
      subtitle: 'بث مباشر',
      playing: 'جاري التشغيل',
      paused: 'موقوف'
    },
    hikmet: {
      title: 'الحكمة',
      subtitle: 'محتوى روحاني يتجدد كل يوم.',
      verse_title: 'آية اليوم',
      hadith_title: 'حديث اليوم',
      share: 'مشاركة',
      share_success: 'تم نسخ الرابط!'
    },
    features: {
      title: 'كل ما تحتاجه لحياة إسلامية منظمة',
      subtitle: 'جميع المميزات التي تحتاجها في تطبيق واحد، بتصميم عصري وبسيط.',
      bento: {
        stats_features: '29+',
        stats_features_desc: 'ميزة متقدمة',
        ui_title: 'واجهة سهلة الاستخدام',
        ui_desc: 'ركز على عبادتك مع لغة تصميم بسيطة، سلسة ومريحة للعين.',
        quran_title: 'القرآن والتجويد',
        quran_desc: 'تجويد ملون، ترجمة كلمة بكلمة وأوضاع قراءة متقدمة.',
        stats_hafiz: '19+',
        stats_hafiz_desc: 'قارئ مختلف',
        themes_title: 'سمات مخصصة',
        themes_desc: 'خصص التطبيق حسب ذوقك.'
      }
    },
    timeline: {
      title: 'رحلتك الروحانية اليومية',
      steps: [
        { title: 'الفجر / الصباح', sub: 'بداية اليوم', desc: 'منبه مسبق لطيف لإيقاظك للسحور أو صلاة الفجر دون فزع.' },
        { title: 'الظهر', sub: 'منتصف اليوم', desc: 'خذ استراحة روحانية من ضغوط العمل. ركز مع الوضع الصامت التلقائي.' },
        { title: 'العصر', sub: 'بعد الظهر', desc: 'استعد للصلاة بإنهاء المهام اليومية مع عد تنازلي مرئي.' },
        { title: 'المغرب', sub: 'الغروب', desc: 'وقت الإفطار. اقرأ أذكارك اليومية مباشرة بعد الأذان.' },
        { title: 'العشاء', sub: 'الليل', desc: 'اختتم يومك بسلام مع تلاوة القرآن في الوضع الليلي.' }
      ]
    },
    screenshots: {
      title: 'واجهة بسيطة ومريحة',
      desc: 'ركز على عبادتك مع تصميم عصري وسلس لا يرهق عينيك.',
      images: [
        'https://ezanvaktipro.com/img/en/en01.webp',
        'https://ezanvaktipro.com/img/en/en02.webp',
        'https://ezanvaktipro.com/img/en/en03.webp',
        'https://ezanvaktipro.com/img/en/en04.webp',
        'https://ezanvaktipro.com/img/en/en05.webp',
        'https://ezanvaktipro.com/img/en/en06.webp',
        'https://ezanvaktipro.com/img/en/en07.webp',
        'https://ezanvaktipro.com/img/en/en08.webp',
        'https://ezanvaktipro.com/img/en/en09.webp'
      ]
    },
    testimonials: {
      badge: '600,000+ تقييم',
      title: 'ماذا يقول مستخدمونا؟',
      reviews: [
        { name: "رقية دوزجون", date: "2025-11-12", text: "تطبيق مفيد جداً، بارك الله في القائمين عليه. سيكون رائعاً لو كان هناك تنبيه بالاهتزاز." },
        { name: "محمد راشد أيدين", date: "2025-11-20", text: "مريح ومفيد جداً مقارنة بالتطبيقات الأخرى في الفئة. الاستقرار ممتاز." },
        { name: "الخال نيجو", date: "2025-10-30", text: "ينبه في الوقت المحدد بالضبط. ميزة الوضع الصامت التلقائي رائعة. أوصي به بشدة." },
        { name: "أويتون جان", date: "2025-09-25", text: "سأعطيه 10 نجوم لو استطعت. يجعل اليوم أسهل. إنهم حقاً يستحقون ما يكسبونه." },
        { name: "نوربيزا", date: "2025-09-22", text: "كحافظة للقرآن، أعجبني التطبيق جداً. التجويد الملون في القراءة رائع للغاية." },
        { name: "فاطمة أوزتورك", date: "2025-11-02", text: "تطبيق جميل جداً، شكراً لكم. التذكيرات في الوقت المحدد جيدة جداً." },
        { name: "حسرت آيك", date: "2025-09-12", text: "نستخدمه لمتابعة مواقيت الصلاة. هو أول شيء أقوم بتثبيته على أي هاتف جديد." }
      ]
    },
    faq: {
      title: 'الأسئلة الشائعة',
      items: [
        { q: "هل تطبيق أذان برو مجاني؟", a: "نعم؛ الميزات الأساسية مثل مواقيت الصلاة، إشعارات الأذان وبوصلة القبلة مجانية تمامًا." },
        { q: "هل يعمل التطبيق بدون إنترنت؟", a: "بالتأكيد. بمجرد تحميل أوقات الشهر، لا حاجة للاتصال بالإنترنت." },
        { q: "هل يمكنني تغيير صوت الأذان؟", a: "نعم، يمكنك اختيار مؤذنين مختلفين، استخدام أصوات تنبيه قياسية، أو الاكتفاء بالاهتزاز." },
        { q: "ما هي طرق الحساب التي تدعمونها؟", a: "ندعم رئاسة الشؤون الدينية التركية، رابطة العالم الإسلامي، أم القرى، وغيرها من الطرق المحلية." },
        { q: "هل توجد نسخة لنظام iOS؟", a: "نحن نركز حاليًا على تقديم أفضل تجربة لنظام Android، ولكن نسخة iOS ضمن خططنا المستقبلية." }
      ]
    },
    partners: {
      badge: 'الشركاء',
      title: 'شركاء موثوقون'
    },
    download_cta: {
      title: 'هل أنت مستعد للتركيز على عبادتك؟',
      subtitle: 'أوقات دقيقة، واجهة بسيطة وراحة بال. انضم للملايين الذين يثقون في أذان برو.',
      play_small: 'احصل عليه من',
      play_large: 'Google Play',
      app_small: 'التحميل من',
      app_large: 'App Store',
      compatibility: 'متوافق مع أجهزة Android و iOS'
    },
    delete_account: {
      title: 'نموذج حذف الحساب',
      placeholder: 'بريدك الإلكتروني',
      btn: 'إرسال',
      desc: 'عند معالجة طلب حذف حسابك، سيتم حذف بياناتك نهائيًا.',
      alert_success: 'تم إرسال طلبك بنجاح. سيتم إكمال معاملتك في أقرب وقت ممكن.',
      alert_error: 'حدثت مشكلة في الإرسال التلقائي. جاري فتح عميل البريد الإلكتروني...'
    },
    footer: {
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      rights: 'جميع الحقوق محفوظة.',
      address_title: 'العنوان',
      address_text: '<a href="https://www.deen-studios.com/" target="_blank" class="hover:text-primary-600 dark:hover:text-primary-500 transition-colors font-bold text-lg mb-2 inline-block">Deen studios.</a><br><p class="mb-4 text-xs opacity-80 leading-relaxed text-slate-600 dark:text-slate-400">نحن فريق من المطورين والمصممين وخبراء النمو المسلمين ذوي الخبرة والشغف. لدينا أكثر من 10 سنوات من الخبرة في تطوير وتوسيع التطبيقات للشركات الناشئة والشركات الكبرى. يأti تمويلنا من مستثمرين مسلمين يديرون شركات ألعاب واستهلاك كبرى حول العالم.</p><a href="mailto:hello@deen-studios.com" class="text-primary-600 dark:text-primary-500 hover:underline flex items-center gap-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>hello@deen-studios.com</a>',
      contact_title: 'معلومات الاتصال',
      contact_text: 'نسعد بسماع آرائكم.'
    },
    library: {
      kuran: 'القرآن الكريم أونلاين',
      hikmet: 'الحكمة',
      ruya: 'تفسير الأحلام',
      ilmihal: 'التعليم المسيحي (إلميهال)',
      terimler: 'المصطلحات الدينية',
      delail: 'دلائل الخيرات',
      tasbeeh_ar: 'صلاة التسبيح',
      tasbeeh_tr: 'تسبيحات الصلاة',
      subtitle: 'كتاب ومورد'
    },
    app_prompt: {
      title: 'أذان برو',
      desc_android: 'تحميل مجاني من Google Play',
      desc_ios: 'تحميل مجاني من App Store',
      btn: 'تثبيت'
    }
  };

  private DE = {
    seo: {
      title: 'Ezan Vakti Pro | Präzise Gebetszeiten & Qibla Kompass',
      desc: 'Präzise Gebetszeiten weltweit, Qibla-Ausrichtung, Live-Koran-Radio und Adhan-Benachrichtigungen. Moderne und zuverlässige islamische App.',
      keywords: 'Gebetszeiten, islamische App, Qibla Kompass, Adhan Alarm, Koran Radio, muslimische Gebetszeiten, standortbasierte Zeiten'
    },
    nav: {
      features: 'Funktionen',
      library: 'Bibliothek',
      reviews: 'Bewertungen',
      faq: 'FAQ',
      download: 'Herunterladen',
      menu: 'Menü',
      mobile_download: 'Jetzt Laden'
    },
    hero: {
      badge: '#1 Islamischer Lebensassistent',
      title_start: 'Vereinfachen Sie Ihre',
      title_end: 'Lebensreise.',
      desc: 'Genaue Gebetszeiten, Koran, Qibla-Kompass und Ramadan-Kalender. Eine moderne App, die entwickelt wurde, damit Sie sich auf Ihren Gottesdienst konzentrieren können.',
      btn_download: 'Kostenlos Laden',
      btn_watch: 'Video Ansehen',
      social_proof: 'Die Wahl von Millionen Muslimen',
      next_prayer: 'NÄCHSTES GEBET',
      calculating: 'Berechnung',
      remaining: 'Verbleibend',
      location_request_msg: 'Wir benötigen Ihre Erlaubnis, Ihren Standort zu bestimmen, um genaue Zeiten bereitzustellen. Möchten Sie dies zulassen?',
      location_denied: 'Standortberechtigung verweigert. Bitte aktivieren Sie den Standort in Ihren Browsereinstellungen und versuchen Sie es erneut.',
      location_updated: 'Standort erfolgreich aktualisiert.'
    },
    radio: {
      title: 'Koran Radio',
      subtitle: 'Live Stream',
      playing: 'Spielt',
      paused: 'Pausiert'
    },
    hikmet: {
      title: 'Hikmetname',
      subtitle: 'Spirituelle Inhalte, die jeden Tag erneuert werden.',
      verse_title: 'Vers des Tages',
      hadith_title: 'Hadith des Tages',
      share: 'Teilen',
      share_success: 'Link kopiert!'
    },
    features: {
      title: 'Alles für ein organisiertes islamisches Leben',
      subtitle: 'Alle Funktionen, die Sie benötigen, in einer App, mit modernem und einfachem Design.',
      bento: {
        stats_features: '29+',
        stats_features_desc: 'Erweiterte Funktionen',
        ui_title: 'Benutzerfreundliche Oberfläche',
        ui_desc: 'Konzentrieren Sie sich auf Ihren Gottesdienst mit einer Designsprache, die einfach, flüssig und augenschonend ist.',
        quran_title: 'Koran & Tadschwīd',
        quran_desc: 'Farbiger Tadschwīd, Wort-für-Wort-Übersetzung und erweiterte Lesemodi.',
        stats_hafiz: '19+',
        stats_hafiz_desc: 'Verschiedene Rezitatoren',
        themes_title: 'Benutzerdefinierte Themen',
        themes_desc: 'Personalisieren Sie die App nach Ihrem Geschmack.'
      }
    },
    timeline: {
      title: 'Ihre tägliche spirituelle Reise',
      steps: [
        { title: 'Fadschr / Morgen', sub: 'TAGESBEGINN', desc: 'Ein sanfter Voralarm, der Sie für Sahur oder das Morgengebet weckt, ohne Sie zu erschrecken.' },
        { title: 'Dhuhr', sub: 'MITTAG', desc: 'Machen Sie eine spirituelle Pause vom Arbeitsstress. Konzentrieren Sie sich mit dem automatischen Stumm-Modus.' },
        { title: 'Asr', sub: 'NACHMITTAG', desc: 'Bereiten Sie sich auf das Gebet vor, indem Sie die täglichen Aufgaben mit einem visuellen Countdown abschließen.' },
        { title: 'Maghrib', sub: 'SONNENUNTERGANG', desc: 'Zeit für Iftar. Lesen Sie Ihr tägliches Gebet direkt nach dem Adhan.' },
        { title: 'Ischa', sub: 'NACHT', desc: 'Beenden Sie den Tag friedlich mit Koranrezitation im Dunkelmodus.' }
      ]
    },
    screenshots: {
      title: 'Einfache und friedliche Oberfläche',
      desc: 'Konzentrieren Sie sich auf Ihren Gottesdienst mit einem modernen, flüssigen Design, das Ihre Augen nicht ermüdet.',
      images: [
        'https://ezanvaktipro.com/img/en/en01.webp',
        'https://ezanvaktipro.com/img/en/en02.webp',
        'https://ezanvaktipro.com/img/en/en03.webp',
        'https://ezanvaktipro.com/img/en/en04.webp',
        'https://ezanvaktipro.com/img/en/en05.webp',
        'https://ezanvaktipro.com/img/en/en06.webp',
        'https://ezanvaktipro.com/img/en/en07.webp',
        'https://ezanvaktipro.com/img/en/en08.webp',
        'https://ezanvaktipro.com/img/en/en09.webp'
      ]
    },
    testimonials: {
      badge: '600.000+ Bewertungen',
      title: 'Was sagen unsere Nutzer?',
      reviews: [
        { name: "Rukiye DÜZGÜN", date: "2025-11-12", text: "Wirklich eine sehr nützliche Anwendung, möge Allah die Macher segnen. Ein Vibrationsalarm wäre toll." },
        { name: "Muhammet Raşit Aydın", date: "2025-11-20", text: "Im Vergleich zu anderen Apps in der Kategorie sehr praktisch und nützlich. Die Stabilität ist ausgezeichnet." },
        { name: "Neco Dayı", date: "2025-10-30", text: "Es warnt genau zur richtigen Zeit. Die automatische Stummschaltung ist wunderbar. Ich empfehle es sehr." },
        { name: "Oytun Can", date: "2025-09-25", text: "Ich würde 10 Sterne geben, wenn ich könnte. Es erleichtert den Tag. Sie verdienen wirklich, was sie bekommen." },
        { name: "Nurbeyza", date: "2025-09-22", text: "Als Hafiz hat mir die Anwendung sehr gut gefallen. Farbiges Tadschwīd beim Koranlesen ist sehr schön." },
        { name: "Fatma Öztürk", date: "2025-11-02", text: "Sehr schöne Anwendung, danke. Die pünktlichen Erinnerungen sind sehr gut." },
        { name: "HASRET AYIK", date: "2025-09-12", text: "Wir nutzen es, um Gebetszeiten zu verfolgen. Es ist das Erste, was ich auf einem neuen Telefon installiere." }
      ]
    },
    faq: {
      title: 'Häufig gestellte Fragen',
      items: [
        { q: "Ist Ezan Vakti Pro kostenlos?", a: "Ja; Grundfunktionen wie Gebetszeiten, Adhan-Benachrichtigungen und Qibla-Kompass sind völlig kostenlos." },
        { q: "Funktioniert die App offline?", a: "Absolut. Sobald Sie die monatlichen Zeiten heruntergeladen haben, ist keine Internetverbindung erforderlich." },
        { q: "Kann ich den Adhan-Ton ändern?", a: "Ja, Sie können verschiedene Muezzine wählen, Standard-Warntöne verwenden oder einfach Vibration nutzen." },
        { q: "Welche Berechnungsmethoden unterstützen Sie?", a: "Wir unterstützen das Präsidium für Religionsangelegenheiten, Fazilet, IGMG und andere lokale Berechnungsmethoden." },
        { q: "Gibt es eine iOS-Version?", a: "Wir konzentrieren uns derzeit auf das beste Android-Erlebnis, aber eine iOS-Version ist in unseren Plänen." }
      ]
    },
    partners: {
      badge: 'Partner',
      title: 'Vertrauenswürdige Partner'
    },
    download_cta: {
      title: 'Sind Sie bereit, sich auf Ihren Gottesdienst zu konzentrieren?',
      subtitle: 'Genaue Zeiten, einfache Oberfläche und Seelenfrieden. Schließen Sie sich Millionen an, die Ezan Vakti Pro vertrauen.',
      play_small: 'JETZT BEI',
      play_large: 'Google Play',
      app_small: 'Laden im',
      app_large: 'App Store',
      compatibility: 'Kompatibel mit Android- und iOS-Geräten'
    },
    delete_account: {
      title: 'Konto löschen Formular',
      placeholder: 'Ihre E-Mail-Adresse',
      btn: 'Absenden',
      desc: 'Wenn Ihr Antrag auf Kontolöschung bearbeitet wird, werden Ihre Daten dauerhaft gelöscht.',
      alert_success: 'Ihre Anfrage wurde erfolgreich gesendet. Ihre Transaktion wird so schnell wie möglich abgeschlossen.',
      alert_error: 'Es gab ein Problem beim automatischen Senden. Öffne Ihren E-Mail-Client...'
    },
    footer: {
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
      rights: 'Alle Rechte vorbehalten.',
      address_title: 'Adresse',
      address_text: '<a href="https://www.deen-studios.com/" target="_blank" class="hover:text-primary-600 dark:hover:text-primary-500 transition-colors font-bold text-lg mb-2 inline-block">Deen studios.</a><br><p class="mb-4 text-xs opacity-80 leading-relaxed text-slate-600 dark:text-slate-400">Wir sind ein Team von erfahrenen und leidenschaftlichen muslimischen Entwicklern, Designern und Wachstumsexperten. Wir verfügen über mehr als 10 Jahre Erfahrung in der Entwicklung und Skalierung von Anwendungen für Start-ups und Unternehmen. Unsere Finanzierung stammt von muslimischen Investoren, die weltweit große Gaming- und Konsumgüterunternehmen leiten.</p><a href="mailto:hello@deen-studios.com" class="text-primary-600 dark:text-primary-500 hover:underline flex items-center gap-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>hello@deen-studios.com</a>',
      contact_title: 'Kontaktinformationen',
      contact_text: 'Wir würden uns freuen, von Ihnen zu hören.'
    },
    library: {
      kuran: 'Online Koran',
      hikmet: 'Hikmetname',
      ruya: 'Traumdeutungen',
      ilmihal: 'Katechismus (Ilmihal)',
      terimler: 'Religiöse Begriffe',
      delail: 'Dalail al-Khayrat',
      tasbeeh_ar: 'Arabisches Salat Tasbeeh',
      tasbeeh_tr: 'Arabisches Gebet Tasbihat TR',
      subtitle: 'Buch & Ressource'
    },
    app_prompt: {
      title: 'Ezan Vakti Pro',
      desc_android: 'KOSTENLOS bei Google Play laden',
      desc_ios: 'KOSTENLOS im App Store laden',
      btn: 'INSTALLIEREN'
    }
  };

  private FR = {
    seo: {
      title: 'Ezan Vakti Pro | Heures de Prière Précises & Qibla',
      desc: 'Horaires de prière précis, direction Qibla, radio Coran en direct et alertes d’adhan. Application islamique moderne et fiable.',
      keywords: 'heures de prière, direction qibla, application islamique, alerte adhan, radio coran, calendrier de prière, horaires selon localisation'
    },
    nav: {
      features: 'Fonctionnalités',
      library: 'Bibliothèque',
      reviews: 'Avis',
      faq: 'FAQ',
      download: 'Télécharger',
      menu: 'Menu',
      mobile_download: 'Télécharger Maintenant'
    },
    hero: {
      badge: '#1 Assistant de Vie Islamique',
      title_start: 'Simplifiez votre',
      title_end: 'Voyage de Vie.',
      desc: 'Horaires de prière précis, Coran, boussole Qibla et calendrier du Ramadan. Une application moderne conçue pour vous concentrer sur votre culte.',
      btn_download: 'Téléchargement Gratuit',
      btn_watch: 'Voir la Vidéo',
      social_proof: 'Choisi par des millions de musulmans',
      next_prayer: 'PROCHAINE PRIÈRE',
      calculating: 'Calcul...',
      remaining: 'Restant',
      location_request_msg: 'Nous avons besoin de votre permission pour déterminer votre position afin de fournir des horaires précis. Voulez-vous autoriser ?',
      location_denied: 'Autorisation de localisation refusée. Veuillez activer la localisation dans les paramètres de votre navigateur et réessayer.',
      location_updated: 'Localisation mise à jour avec succès.'
    },
    radio: {
      title: 'Radio Coran',
      subtitle: 'En direct',
      playing: 'Lecture',
      paused: 'Pause'
    },
    hikmet: {
      title: 'Sagesse',
      subtitle: 'Contenu spirituel renouvelé chaque jour.',
      verse_title: 'Verset du Jour',
      hadith_title: 'Hadith du Jour',
      share: 'Partager',
      share_success: 'Lien copié !'
    },
    features: {
      title: 'Tout pour une vie islamique organisée',
      subtitle: 'Toutes les fonctionnalités dont vous avez besoin dans une seule application, avec un design moderne et simple.',
      bento: {
        stats_features: '29+',
        stats_features_desc: 'Fonctionnalités Avancées',
        ui_title: 'Interface Conviviale',
        ui_desc: 'Concentrez-vous sur votre culte avec un langage de conception simple, fluide et agréable à l\'œil.',
        quran_title: 'Coran & Tajwid',
        quran_desc: 'Tajwid coloré, traduction mot à mot et modes de lecture avancés.',
        stats_hafiz: '19+',
        stats_hafiz_desc: 'Récitateurs Différents',
        themes_title: 'Thèmes Personnalisés',
        themes_desc: 'Personnalisez l\'application selon vos goûts.'
      }
    },
    timeline: {
      title: 'Votre voyage spirituel quotidien',
      steps: [
        { title: 'Fajr / Matin', sub: 'DÉBUT DE JOURNÉE', desc: 'Une pré-alarme douce pour vous réveiller pour le Sahur ou la prière du matin sans sursaut.' },
        { title: 'Dhuhr', sub: 'MIDI', desc: 'Faites une pause spirituelle loin du stress du travail. Concentrez-vous avec le mode silencieux automatique.' },
        { title: 'Asr', sub: 'APRÈS-MIDI', desc: 'Préparez-vous à la prière en terminant les tâches quotidiennes avec un compte à rebours visuel.' },
        { title: 'Maghrib', sub: 'COUCHER DU SOLEIL', desc: 'L\'heure de l\'Iftar. Lisez votre prière quotidienne juste après l\'Adhan.' },
        { title: 'Isha', sub: 'NUIT', desc: 'Terminez la journée paisiblement avec la récitation du Coran en mode sombre.' }
      ]
    },
    screenshots: {
      title: 'Interface Simple et Paisible',
      desc: 'Concentrez-vous sur votre culte avec un design moderne et fluide qui ne fatigue pas vos yeux.',
      images: [
        'https://ezanvaktipro.com/img/en/en01.webp',
        'https://ezanvaktipro.com/img/en/en02.webp',
        'https://ezanvaktipro.com/img/en/en03.webp',
        'https://ezanvaktipro.com/img/en/en04.webp',
        'https://ezanvaktipro.com/img/en/en05.webp',
        'https://ezanvaktipro.com/img/en/en06.webp',
        'https://ezanvaktipro.com/img/en/en07.webp',
        'https://ezanvaktipro.com/img/en/en08.webp',
        'https://ezanvaktipro.com/img/en/en09.webp'
      ]
    },
    testimonials: {
      badge: '600 000+ Avis',
      title: 'Que disent nos utilisateurs ?',
      reviews: [
        { name: "Rukiye DÜZGÜN", date: "2025-11-12", text: "Vraiment une application très utile, qu'Allah bénisse ceux qui l'ont faite. Ce serait génial s'il y avait une alerte par vibration." },
        { name: "Muhammet Raşit Aydın", date: "2025-11-20", text: "Très pratique et utile par rapport aux autres applications de la catégorie. La stabilité est excellente." },
        { name: "Neco Dayı", date: "2025-10-30", text: "Elle alerte exactement à l'heure. La fonction de mode silencieux automatique est merveilleuse. Je la recommande vivement." },
        { name: "Oytun Can", date: "2025-09-25", text: "Je donnerais 10 étoiles si je pouvais. Elle facilite la journée. Ils méritent vraiment ce qu'ils gagnent." },
        { name: "Nurbeyza", date: "2025-09-22", text: "En tant que Hafiz, j'ai beaucoup aimé l'application. Le Tajwid coloré dans la lecture du Coran est très agréable." },
        { name: "Fatma Öztürk", date: "2025-11-02", text: "Très belle application, merci. Les rappels ponctuels sont très bons." },
        { name: "HASRET AYIK", date: "2025-09-12", text: "Nous l'utilisons pour suivre les horaires de prière. C'est la première chose que j'installe sur un nouveau téléphone." }
      ]
    },
    faq: {
      title: 'Questions Fréquemment Posées',
      items: [
        { q: "Ezan Vakti Pro est-il gratuit ?", a: "Oui ; les fonctionnalités de base comme les horaires de prière, les notifications adhan et la boussole qibla sont entièrement gratuites." },
        { q: "L'application fonctionne-t-elle hors ligne ?", a: "Absolument. Une fois que vous avez téléchargé les horaires mensuels, aucune connexion internet n'est requise." },
        { q: "Puis-je changer le son de l'Adhan ?", a: "Oui, vous pouvez choisir différents muezzins, utiliser des sons d'alerte standard ou simplement utiliser la vibration." },
        { q: "Quelles méthodes de calcul soutenez-vous ?", a: "Nous soutenons la Présidence des Affaires Religieuses, Fazilet, IGMG et d'autres méthodes de calcul locales." },
        { q: "Y a-t-il une version iOS ?", a: "Nous nous concentrons actuellement sur la meilleure expérience Android, mais une version iOS est dans nos plans." }
      ]
    },
    partners: {
      badge: 'Partenaires',
      title: 'Partenaires de Confiance'
    },
    download_cta: {
      title: 'Prêt à vous concentrer sur votre culte ?',
      subtitle: 'Horaires précis, interface simple et tranquillité d\'esprit. Rejoignez des millions de personnes qui font confiance à Ezan Vakti Pro.',
      play_small: 'DISPONIBLE SUR',
      play_large: 'Google Play',
      app_small: 'Télécharger dans',
      app_large: 'l\'App Store',
      compatibility: 'Compatible avec les appareils Android et iOS'
    },
    delete_account: {
      title: 'Formulaire de suppression de compte',
      placeholder: 'Votre adresse e-mail',
      btn: 'Envoyer',
      desc: 'Lorsque votre demande de suppression de compte est traitée, vos données seront définitivement supprimées.',
      alert_success: 'Votre demande a été envoyée avec succès. Votre transaction sera complétée dès que possible.',
      alert_error: 'Il y a eu un problème avec l\'envoi automatique. Ouverture de votre client de messagerie...'
    },
    footer: {
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions d\'Utilisation',
      rights: 'Tous droits réservés.',
      address_title: 'Adresse',
      address_text: '<a href="https://www.deen-studios.com/" target="_blank" class="hover:text-primary-600 dark:hover:text-primary-500 transition-colors font-bold text-lg mb-2 inline-block">Deen studios.</a><br><p class="mb-4 text-xs opacity-80 leading-relaxed text-slate-600 dark:text-slate-400">Nous sommes une équipe de développeurs, de designers et d\'experts en croissance musulmans, expérimentés et passionnés. Nous avons plus de 10 ans d\'expérience dans le développement et la mise à l\'échelle d\'applications pour les startups et les entreprises. Notre financement provient d\'investisseurs musulmans qui dirigent de grandes entreprises de jeux et de consommation dans le monde entier.</p><a href="mailto:hello@deen-studios.com" class="text-primary-600 dark:text-primary-500 hover:underline flex items-center gap-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>hello@deen-studios.com</a>',
      contact_title: 'Informations de Contact',
      contact_text: 'Nous serions ravis d\'avoir de vos nouvelles.'
    },
    library: {
      kuran: 'Coran en ligne',
      hikmet: 'Hikmetname',
      ruya: 'Interprétation des Rêves',
      ilmihal: 'Catéchisme (Ilmihal)',
      terimler: 'Termes Religieux',
      delail: 'Dalail al-Khayrat',
      tasbeeh_ar: 'Salat Tasbih Arabe',
      tasbeeh_tr: 'Tasbihat de Prière Arabe TR',
      subtitle: 'Livre & Ressource'
    },
    app_prompt: {
      title: 'Ezan Vakti Pro',
      desc_android: 'Télécharger GRATUITEMENT sur Google Play',
      desc_ios: 'Télécharger GRATUITEMENT sur l\'App Store',
      btn: 'INSTALLER'
    }
  };
}
