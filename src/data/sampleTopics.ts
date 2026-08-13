import { IslamicAIResponse } from '../types';

export interface SampleTopic {
  id: string;
  category: 'Pillars' | 'Worship' | 'Ethics' | 'Dua' | 'History';
  title: string;
  question: string;
  description: string;
  previewArabic: string;
  presetData: IslamicAIResponse;
}

export const SAMPLE_TOPICS: SampleTopic[] = [
  {
    id: 'tahajjud-prayer',
    category: 'Worship',
    title: 'Virtues & Rules of Tahajjud Prayer',
    question: 'What is the significance, virtue, and recommended method of praying Tahajjud (Night Prayer)?',
    description: 'Learn the Quranic commands and Hadiths regarding the blessed voluntary night prayer.',
    previewArabic: 'وَمِنَ اللَّيْلِ فَتَهَجَّدْ بِهِ نَافِلَةً لَّكَ عَسَىٰ أَن يَبْعَثَكَ رَبُّكَ مَقَامًا مَّحْمُودًا',
    presetData: {
      directAnswer: 'Tahajjud (the voluntary night prayer) is one of the most virtuous acts of worship in Islam, performed in the last third of the night after sleeping. It brings spiritual closeness to Allah, forgiveness of sins, and peace of heart.',
      quranEvidences: [
        {
          surahName: 'Al-Isra',
          surahNumber: 17,
          ayahNumber: 79,
          arabicText: 'وَمِنَ اللَّيْلِ فَتَهَجَّدْ بِهِ نَافِلَةً لَّكَ عَسَىٰ أَن يَبْعَثَكَ رَبُّكَ مَقَامًا مَّحْمُودًا',
          transliteration: "Wa mina al-layli fa-tahajjad bihi nafilatan laka 'asa an yab'athaka rabbuka maqaman mahmuda",
          englishTranslation: 'And during a part of the night, pray Tahajjud as an additional prayer for you; it is expected that your Lord will raise you to a praised station.',
          explanation: 'Allah commands Prophet Muhammad (pbuh) and encourages believers to dedicate part of the night to prayer, promising high spiritual ranks.'
        },
        {
          surahName: 'As-Sajdah',
          surahNumber: 32,
          ayahNumber: 16,
          arabicText: 'تَتَجَافَىٰ جُنُوبُهُمْ عَنِ الْمَضَاجِعِ يَدْعُونَ رَبَّهُمْ خَوْفًا وَطَمَعًا وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
          transliteration: "Tatajafa junubuhum 'ani al-madaji'i yad'una rabbahum khawfan wa tama'an",
          englishTranslation: 'Their sides forsake their beds, to invoke their Lord in fear and hope, and they spend out of what We have provided them.',
          explanation: 'Praising those who sacrifice sleep out of sincere love and awe of Allah.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Sahih al-Bukhari & Sahih Muslim',
          hadithNumber: 'Bukhari #1145, Muslim #758',
          grade: 'Muttafaq \'Alayh (Agreed Upon)',
          arabicText: 'يَنْزِلُ رَبُّنَا تَبَارَكَ وَتَعَالَى كُلَّ لَيْلَةٍ إِلَى السَّمَاءِ الدُّنْيَا حِينَ يَبْقَى ثُلُثُ اللَّيْلِ الآخِرُ يَقُولُ: مَنْ يَدْعُونِي فَأَسْتَجِيبَ لَهُ، مَنْ يَسْأَلُنِي فَأُعْطِيَهُ، مَنْ يَسْتَغْفِرُنِي فَأَغْفِرَ لَهُ',
          englishTranslation: 'Our Lord descends every night to the lowest heaven when one-third of the night remains, saying: "Who calls upon Me that I may answer him? Who asks of Me that I may give him? Who seeks My forgiveness that I may forgive him?"',
          explanation: 'The last third of the night is a golden time when prayers and supplications are answered directly.'
        }
      ],
      scholarlySummary: 'Tahajjud is prayed in units of 2 rak\'ahs up to 8 or 12 rak\'ahs, concluded with Witr prayer. Intention, sleeping after Isha, and waking up in the last third of the night are recommended.',
      keyTakeaways: [
        'Best time is the last third of the night before Fajr.',
        'Prayed in 2-rak\'ah intervals with sincere Dua.',
        'Erases bad deeds and brings deep tranquility.'
      ],
      closingReflection: 'وَاللَّهُ أَعْلَمُ (And Allah knows best)'
    }
  },
  {
    id: 'patience-sabr',
    category: 'Ethics',
    title: 'Patience (Sabr) in Times of Trial',
    question: 'What does the Quran and Hadith teach us about Sabr (patience and perseverance) during hardships?',
    description: 'Explore Quranic verses and sayings of the Prophet (pbuh) regarding Sabr and divine reward.',
    previewArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    presetData: {
      directAnswer: 'In Islam, Sabr is not passive endurance, but active spiritual resilience, self-restraint, and remaining steadfast upon obedience while trusting Allah\'s divine wisdom during life\'s trials.',
      quranEvidences: [
        {
          surahName: 'Al-Baqarah',
          surahNumber: 2,
          ayahNumber: 153,
          arabicText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
          transliteration: "Ya ayyuha alladhina amanu ista'inu bi-ssabri wa-ssalah, inna Allaha ma'a as-sabirin",
          englishTranslation: 'O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.',
          explanation: 'Patience and prayer are paired together as the believer\'s twin pillars of strength when facing difficulty.'
        },
        {
          surahName: 'Az-Zumar',
          surahNumber: 39,
          ayahNumber: 10,
          arabicText: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
          transliteration: "Innama yuwaffa as-sabiruna ajrahum bi-ghayri hisab",
          englishTranslation: 'Only those who are patient will be given their reward without account [limit].',
          explanation: 'Unlike other deeds which have specific multipliers, the reward for Sabr is unlimited.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Sahih Muslim',
          hadithNumber: 'Hadith #2999',
          grade: 'Sahih',
          arabicText: 'عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ: إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ',
          englishTranslation: 'Wondrous is the affair of the believer, for there is good for him in every matter! If good comes to him, he expresses gratitude and it is good for him; and if hardship befalls him, he endures patiently and it is good for him.',
          explanation: 'A believer is always in a state of gain through Shukr (gratitude) in ease and Sabr in trial.'
        }
      ],
      scholarlySummary: 'Scholars divide Sabr into three categories: Sabr in obeying Allah, Sabr in refraining from sin, and Sabr when accepting decree during affliction.',
      keyTakeaways: [
        'Sabr is paired with Shukr (gratitude) as half of faith.',
        'Hardships expiate sins and elevate spiritual degrees.',
        'Allah\'s accompaniment (Ma\'iyyah) is promised to the patient.'
      ],
      closingReflection: 'فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ (So patient perseverance is most fitting, and Allah\'s help is sought).'
    }
  },
  {
    id: 'rights-of-parents',
    category: 'Ethics',
    title: 'Rights and Kindness to Parents (Birr al-Walidayn)',
    question: 'What are the Quranic commands and Hadiths regarding honoring and caring for parents?',
    description: 'Understanding the sacred status of parents in Islam with text evidence in Arabic and English.',
    previewArabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',
    presetData: {
      directAnswer: 'Honoring and showing kindness to parents (Birr al-Walidayn) is placed directly after Tawhid (worshipping Allah alone) in the Quran. It is one of the highest deeds loved by Allah.',
      quranEvidences: [
        {
          surahName: 'Al-Isra',
          surahNumber: 17,
          ayahNumber: 23,
          arabicText: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا',
          transliteration: "Wa qada rabbuka alla ta'budu illa iyyahu wa bil-walidayni ihsana...",
          englishTranslation: 'And your Lord has decreed that you worship not except Him, and to parents, good treatment. Whether one or both of them reach old age with you, say not to them "uff", and do not repel them, but speak to them a noble word.',
          explanation: 'Even the smallest expression of annoyance ("Uff") to elderly parents is strictly forbidden.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Sahih al-Bukhari',
          hadithNumber: 'Book 78, Hadith 2',
          grade: 'Sahih',
          arabicText: 'قَالَ رَجُلٌ: يَا رَسُولَ اللَّهِ، مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ قَالَ: أُمُّكَ. قَالَ: ثُمَّ مَنْ؟ قَالَ: أُمُّكَ. قَالَ: ثُمَّ مَنْ؟ قَالَ: أُمُّكَ. قَالَ: ثُمَّ مَنْ؟ قَالَ: ثُمَّ أَبُوكَ',
          englishTranslation: 'A man asked: "O Messenger of Allah, who among people is most deserving of my fine companionship?" He replied: "Your mother." The man asked: "Then who?" He said: "Your mother." The man asked: "Then who?" He said: "Your mother." The man asked: "Then who?" He said: "Then your father."',
          explanation: 'Highlights the mother\'s elevated status due to the hardships of pregnancy, childbirth, and nursing.'
        }
      ],
      scholarlySummary: 'Goodness to parents includes obedience in permissible matters, gentle speech, financial support when needed, and making Dua for them both in life and after their passing.',
      keyTakeaways: [
        'Kindness to parents is second only to worshipping Allah.',
        'Special honor is accorded to mothers.',
        'Dua for parents is a perpetual charity (Sadaqah Jariyah).'
      ],
      closingReflection: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا (My Lord, have mercy upon them as they brought me up when I was small).'
    }
  }
];
