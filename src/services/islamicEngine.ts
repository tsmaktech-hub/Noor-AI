import { IslamicAIResponse } from '../types';
import { SAMPLE_TOPICS } from '../data/sampleTopics';

interface TopicMatch {
  keywords: string[];
  response: IslamicAIResponse;
}

export const ISLAMIC_KNOWLEDGE_BASE: TopicMatch[] = [
  // 1. Tahajjud & Night Prayer
  {
    keywords: ['tahajjud', 'night prayer', 'qiyam', 'qiyam al-layl', 'witr', 'last third'],
    response: {
      directAnswer: 'Tahajjud (Qiyam al-Layl) is the voluntary night prayer performed after waking from sleep during the last third of the night. It is considered the most virtuous voluntary prayer in Islam, bringing peace of heart, forgiveness of sins, and elevated spiritual ranks.',
      quranEvidences: [
        {
          surahName: 'Al-Isra',
          surahNumber: 17,
          ayahNumber: 79,
          arabicText: 'وَمِنَ اللَّيْلِ فَتَهَجَّدْ بِهِ نَافِلَةً لَّكَ عَسَىٰ أَن يَبْعَثَكَ رَبُّكَ مَقَامًا مَّحْمُودًا',
          transliteration: "Wa mina al-layli fa-tahajjad bihi nafilatan laka 'asa an yab'athaka rabbuka maqaman mahmuda",
          englishTranslation: 'And during a part of the night, pray Tahajjud as an additional prayer for you; it is expected that your Lord will raise you to a praised station.',
          explanation: 'Allah commands Prophet Muhammad (peace be upon him) and invites believers to dedicate portion of the night to worship, promising spiritual elevation to a praiseworthy station.'
        },
        {
          surahName: 'Az-Zariyat',
          surahNumber: 51,
          ayahNumber: 17,
          arabicText: 'كَانُوا قَلِيلًا مِّنَ اللَّيْلِ مَا يَهْجَعُونَ ۝ وَبِالْأَسْحَارِ هُمْ يَسْتَغْفِرُونَ',
          transliteration: "Kanoo qaleelan mina al-layli ma yahja'oon, wa bil-ashari hum yastaghfiroon",
          englishTranslation: 'They used to sleep but little of the night, and in the hours before dawn they would ask for forgiveness.',
          explanation: 'Describes the righteous servants who sacrifice deep sleep to seek Allah’s pardon in the predawn hours.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Sahih al-Bukhari & Sahih Muslim',
          hadithNumber: 'Bukhari #1145, Muslim #758',
          grade: 'Muttafaq \'Alayh (Agreed Upon)',
          arabicText: 'يَنْزِلُ رَبُّنَا تَبَارَكَ وَتَعَالَى كُلَّ لَيْلَةٍ إِلَى السَّمَاءِ الدُّنْيَا حِينَ يَبْقَى ثُلُثُ اللَّيْلِ الآخِرُ يَقُولُ: مَنْ يَدْعُونِي فَأَسْتَجِيبَ لَهُ، مَنْ يَسْأَلُنِي فَأُعْطِيَهُ، مَنْ يَسْتَغْفِرُنِي فَأَغْفِرَ لَهُ',
          englishTranslation: 'Our Lord descends every night to the lowest heaven when one-third of the night remains, saying: "Who calls upon Me that I may answer him? Who asks of Me that I may give him? Who seeks My forgiveness that I may forgive him?"',
          lesson: 'The last third of the night is a uniquely blessed window when supplications and prayers are directly answered by Allah.'
        }
      ],
      scholarlySummary: 'Tahajjud is offered in sets of 2 rak\'ahs (recommended 2, 4, 6, or 8 rak\'ahs) concluded with the odd-numbered Witr prayer. It is highly recommended to sleep after Isha and awaken before Fajr.',
      keyTakeaways: [
        'Best time is the last third of the night prior to Fajr dawn.',
        'Prayed in increments of 2 rak\'ahs concluded by 1 or 3 rak\'ahs of Witr.',
        'A profound source of spiritual peace, answered Dua, and expiation of sins.'
      ],
      closingReflection: 'وَاللَّهُ أَعْلَمُ (And Allah knows best)'
    }
  },

  // 2. Patience & Trials (Sabr)
  {
    keywords: ['patience', 'sabr', 'hardship', 'trial', 'calamity', 'difficulty', 'grief', 'sadness', 'struggle', 'pain'],
    response: {
      directAnswer: 'Sabr (patience, perseverance, and emotional steadfastness) is a fundamental pillar of Islamic character. It represents holding steadfast to Allah’s guidance without despair or complaint during trials, knowing that every test carries divine wisdom and purification.',
      quranEvidences: [
        {
          surahName: 'Al-Baqarah',
          surahNumber: 2,
          ayahNumber: 153,
          arabicText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
          transliteration: "Ya ayyuha alladhina amanu ista'inu bi-ssabri wa-ssalah, inna Allaha ma'a as-sabirin",
          englishTranslation: 'O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.',
          explanation: 'Patience and Salah are established as the twin spiritual anchors for overcoming adversity.'
        },
        {
          surahName: 'Az-Zumar',
          surahNumber: 39,
          ayahNumber: 10,
          arabicText: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
          transliteration: "Innama yuwaffa as-sabiruna ajrahum bi-ghayri hisab",
          englishTranslation: 'Only those who are patient will be given their reward without account [boundless].',
          explanation: 'While other deeds have measured rewards, the recompense for heartfelt Sabr is limitless.'
        },
        {
          surahName: 'Ash-Sharh',
          surahNumber: 94,
          ayahNumber: 5,
          arabicText: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
          transliteration: "Fa inna ma'a al-'usri yusra, Inna ma'a al-'usri yusra",
          englishTranslation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
          explanation: 'A definitive divine guarantee that ease accompanies and outlasts every difficulty.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Sahih Muslim',
          hadithNumber: 'Hadith #2999',
          grade: 'Sahih',
          arabicText: 'عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ: إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ',
          englishTranslation: 'Wondrous is the affair of the believer, for there is good for him in every matter! If prosperity comes to him, he is grateful and it is good for him; and if adversity befalls him, he endures patiently and it is good for him.',
          lesson: 'The believer is always in a state of gain through gratitude in ease and patience in hardship.'
        }
      ],
      scholarlySummary: 'Scholars define three levels of Sabr: patience in performing obligatory duties, patience in abstaining from forbidden desires, and patience in submitting to the decree of Allah during hardships.',
      keyTakeaways: [
        'Sabr is paired with Shukr (gratitude) as the two halves of complete faith.',
        'Hardships expiate past shortcomings and elevate spiritual rank.',
        'Allah promises His direct support and closeness (Ma\'iyyah) to the steadfast.'
      ],
      closingReflection: 'فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ (So patient perseverance is most fitting, and Allah\'s help is sought).'
    }
  },

  // 3. Parents & Family (Birr al-Walidayn)
  {
    keywords: ['parent', 'mother', 'father', 'birr', 'family', 'kindness to parents', 'respecting parents', 'relatives', 'kinship'],
    response: {
      directAnswer: 'Honoring and treating parents with loving devotion (Birr al-Walidayn) is ranked immediately after the worship of Allah alone (Tawhid) in Islamic scripture. It is one of the highest deeds leading to Paradise.',
      quranEvidences: [
        {
          surahName: 'Al-Isra',
          surahNumber: 17,
          ayahNumber: 23,
          arabicText: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا',
          transliteration: "Wa qada rabbuka alla ta'budu illa iyyahu wa bil-walidayni ihsana...",
          englishTranslation: 'And your Lord has decreed that you not worship except Him, and to parents, good treatment. Whether one or both of them reach old age with you, say not to them "uff", and do not repel them but speak to them a noble word.',
          explanation: 'Even minor gestures of exasperation or irritation ("uff") toward elderly parents are strictly prohibited in the Quran.'
        },
        {
          surahName: 'Luqman',
          surahNumber: 31,
          ayahNumber: 14,
          arabicText: 'وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ حَمَلَتْهُ أُمُّهُ وَهْنًا عَلَىٰ وَهْنٍ وَفِصَالُهُ فِي عَامَيْنِ أَنِ اشْكُرْ لِي وَلِوَالِدَيْكَ إِلَيَّ الْمَصِيرُ',
          transliteration: "Wa wassayna al-insana bi-walidayhi hamalat-hu ummuhu wahnan 'ala wahn...",
          englishTranslation: 'And We have enjoined upon man [care] for his parents. His mother carried him, [increasing her] in weakness upon weakness, and his weaning is in two years. Be grateful to Me and to your parents; to Me is the [final] destination.',
          explanation: 'Emphasizes gratitude to parents tied directly with gratitude to Allah due to maternal sacrifice.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Sahih al-Bukhari',
          hadithNumber: 'Book 78, Hadith 2',
          grade: 'Sahih',
          arabicText: 'قَالَ رَجُلٌ: يَا رَسُولَ اللَّهِ، مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ قَالَ: أُمُّكَ. قَالَ: ثُمَّ مَنْ؟ قَالَ: أُمُّكَ. قَالَ: ثُمَّ مَنْ؟ قَالَ: أُمُّكَ. قَالَ: ثُمَّ مَنْ؟ قَالَ: ثُمَّ أَبُوكَ',
          englishTranslation: 'A man asked: "O Messenger of Allah, who among people is most deserving of my fine companionship?" He replied: "Your mother." The man asked: "Then who?" He said: "Your mother." The man asked: "Then who?" He said: "Your mother." The man asked: "Then who?" He said: "Then your father."',
          lesson: 'Mothers receive three-fold honor due to the arduous trials of pregnancy, delivery, and nursing.'
        }
      ],
      scholarlySummary: 'Kindness to parents includes honoring their requests in permissible matters, speaking gently, providing financial support when needed, and persistently supplicating for their forgiveness in life and after their passing.',
      keyTakeaways: [
        'Kindness to parents is second only to monotheism in Quranic commandments.',
        'Special honor and companionship is accorded to mothers in the Sunnah.',
        'Dua for parents is a perpetual charity (Sadaqah Jariyah) after their death.'
      ],
      closingReflection: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا (My Lord, have mercy upon them as they brought me up when I was small).'
    }
  },

  // 4. Repentance & Forgiveness (Tawbah & Istighfar)
  {
    keywords: ['repent', 'tawbah', 'istighfar', 'forgive', 'forgiveness', 'sin', 'guilt', 'mercy of allah', 'repentance'],
    response: {
      directAnswer: 'In Islam, Tawbah (sincere repentance) completely wipes away past sins. Allah is Al-Ghafoor (The All-Forgiving) and Ar-Raheem (The Especially Merciful), welcoming every servant who turns back to Him with a sincere heart.',
      quranEvidences: [
        {
          surahName: 'Az-Zumar',
          surahNumber: 39,
          ayahNumber: 53,
          arabicText: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
          transliteration: "Qul ya 'ibadiya alladhina asrafu 'ala anfusihim la taqnatu min rahmati Allahi inna Allaha yaghfiru adh-dhunuba jami'a...",
          englishTranslation: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
          explanation: 'Regarded by scholars as the most hopeful verse in the Quran, prohibiting despair in Allah’s boundless mercy.'
        },
        {
          surahName: 'At-Tahrim',
          surahNumber: 66,
          ayahNumber: 8,
          arabicText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا تُوبُوا إِلَى اللَّهِ تَوْبَةً نَّصُوحًا',
          transliteration: "Ya ayyuha alladhina amanu tooboo ila Allahi tawbatan nasooha",
          englishTranslation: 'O you who have believed, repent to Allah with sincere repentance.',
          explanation: 'Tawbah Nasuh is sincere repentance where one regrets the sin, stops it immediately, and resolves never to return.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Sunan Ibn Majah',
          hadithNumber: 'Hadith #4250',
          grade: 'Hasan',
          arabicText: 'التَّائِبُ مِنَ الذَّنْبِ كَمَنْ لاَ ذَنْبَ لَهُ',
          englishTranslation: 'The one who repents from sin is like one who has no sin at all.',
          lesson: 'Sincere repentance purifies the spiritual slate completely.'
        },
        {
          collection: 'Sahih Muslim',
          hadithNumber: 'Hadith #2749',
          grade: 'Sahih',
          arabicText: 'إِنَّ اللَّهَ يَبْسُطُ يَدَهُ بِاللَّيْلِ لِيَتُوبَ مُسِيءُ النَّهَارِ، وَيَبْسُطُ يَدَهُ بِالنَّهَارِ لِيَتُوبَ مُسِيءُ اللَّيْلِ حَتَّى تَطْلُعَ الشَّمْسُ مِنْ مَغْرِبِهَا',
          englishTranslation: 'Indeed, Allah extends His hand by night so that the wrongdoer of the day may repent, and He extends His hand by day so that the wrongdoer of the night may repent, until the sun rises from the west.',
          lesson: 'Allah’s door of repentance remains open continuously day and night.'
        }
      ],
      scholarlySummary: 'Scholars outline four conditions for valid repentance: acknowledging the mistake, feeling sincere remorse, stopping the act immediately, and resolving not to repeat it. If a person\'s rights were infringed upon, restitution must be made.',
      keyTakeaways: [
        'Never despair of the boundless mercy of Allah.',
        'Sincere repentance transforms previous misdeeds into righteous rewards.',
        'Frequent Istighfar (seeking forgiveness) brings ease, sustenance, and peace.'
      ],
      closingReflection: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ (Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers).'
    }
  },

  // 5. Prayer (Salah & Khushoo)
  {
    keywords: ['salah', 'prayer', 'prayers', 'khushoo', 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'focus in prayer', 'five daily prayers'],
    response: {
      directAnswer: 'Salah (prayer) is the second pillar of Islam and the primary daily connection between a Muslim and Allah. Performing Salah on time with presence of heart (Khushoo) brings peace, prevents immorality, and shields the soul.',
      quranEvidences: [
        {
          surahName: 'Al-Ankabut',
          surahNumber: 29,
          ayahNumber: 45,
          arabicText: 'اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ',
          transliteration: "Utlu ma oohiya ilayka mina al-kitabi wa aqimi as-salah, inna as-salah tanha 'ani al-fahsha'i wal-munkar...",
          englishTranslation: 'Recite what has been revealed to you of the Book and establish prayer. Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater.',
          explanation: 'Salah acts as an active moral and spiritual purifier, preventing unjust conduct.'
        },
        {
          surahName: 'Al-Mu\'minoon',
          surahNumber: 23,
          ayahNumber: 1,
          arabicText: 'قَدْ أَفْلَحَ الْمُؤْمِنُونَ ۝ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ',
          transliteration: "Qad aflaha al-mu'minoon, alladhina hum fee salatihim khashi'oon",
          englishTranslation: 'Certainly will the believers have succeeded: They who are during their prayer humbly submissive (possessing Khushoo).',
          explanation: 'True success in the sight of Allah is tied directly to humility and focus in prayer.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Sahih al-Bukhari',
          hadithNumber: 'Hadith #528',
          grade: 'Sahih',
          arabicText: 'سَأَلْتُ النَّبِيَّ ﷺ: أَيُّ الْعَمَلِ أَحَبُّ إِلَى اللَّهِ؟ قَالَ: «الصَّلاَةُ عَلَى وَقْتِهَا»',
          englishTranslation: 'I asked the Prophet (pbuh): "Which deed is most beloved to Allah?" He replied: "Prayer performed at its proper time."',
          lesson: 'Maintaining prayers promptly within their prescribed times is of supreme value.'
        },
        {
          collection: 'Sunan Abu Dawud',
          hadithNumber: 'Hadith #4985',
          grade: 'Sahih',
          arabicText: 'يَا بِلَالُ أَقِمِ الصَّلَاةَ أَرِحْنَا بِهَا',
          englishTranslation: 'The Prophet (pbuh) would say: "O Bilal, call the Iqamah for prayer; bring us comfort and relief with it."',
          lesson: 'Salah is meant to be a sanctuary of comfort and relief from worldly anxieties.'
        }
      ],
      scholarlySummary: 'To achieve Khushoo (mindful presence), scholars recommend performing thorough Wudu, contemplating the meaning of verses, praying in a calm space, and reflecting on the majesty of Allah during Sujood.',
      keyTakeaways: [
        'Salah is the foundational pillar connecting the believer with Allah 5 times a day.',
        'Khushoo transforms ritual movements into deep spiritual nourishment.',
        'Sujood (prostration) is the position where the servant is nearest to Allah.'
      ],
      closingReflection: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ (My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication).'
    }
  },

  // 6. Fasting & Ramadan (Sawm)
  {
    keywords: ['fasting', 'fast', 'sawm', 'ramadan', 'suhur', 'iftar', 'laylat al-qadr', 'taraweeh', 'eid'],
    response: {
      directAnswer: 'Fasting (Sawm) in Ramadan is the fourth pillar of Islam. It is a spiritual discipline of refraining from food, drink, and desires from dawn until sunset to cultivate God-consciousness (Taqwa), gratitude, and empathy for the less fortunate.',
      quranEvidences: [
        {
          surahName: 'Al-Baqarah',
          surahNumber: 2,
          ayahNumber: 183,
          arabicText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
          transliteration: "Ya ayyuha alladhina amanu kutiba 'alaykumu as-siyamu kama kutiba 'ala alladhina min qablikum la'allakum tattaqoon",
          englishTranslation: 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous (attain Taqwa).',
          explanation: 'The prime objective of fasting is to build Taqwa (mindfulness of Allah).'
        },
        {
          surahName: 'Al-Qadr',
          surahNumber: 97,
          ayahNumber: 1,
          arabicText: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ۝ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ ۝ لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',
          transliteration: "Inna anzalnahu fee laylati al-qadr...",
          englishTranslation: 'Indeed, We sent the Quran down during the Night of Decree. And what can make you know what is the Night of Decree? The Night of Decree is better than a thousand months.',
          explanation: 'Highlights the supreme status of Laylat al-Qadr in the final ten nights of Ramadan.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Sahih al-Bukhari & Sahih Muslim',
          hadithNumber: 'Bukhari #38, Muslim #760',
          grade: 'Muttafaq \'Alayh (Agreed Upon)',
          arabicText: 'مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ',
          englishTranslation: 'Whoever fasts Ramadan out of faith and in the hope of reward, all his previous sins will be forgiven.',
          lesson: 'Fasting with sincere faith brings complete expiation of previous minor sins.'
        }
      ],
      scholarlySummary: 'Fasting encompasses three dimensions: fasting of the stomach, fasting of the senses (eyes, tongue, ears from sin), and fasting of the heart from worldly distractions.',
      keyTakeaways: [
        'Fasting cultivates Taqwa (self-restraint and God-consciousness).',
        'Duas made at the time of Iftar (breaking fast) are accepted by Allah.',
        'Sincere engagement in Ramadan cleanses spiritual shortcomings.'
      ],
      closingReflection: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي (O Allah, You are Pardoning, You love pardon, so pardon me).'
    }
  },

  // 7. Charity & Zakat (Sadaqah & Infaq)
  {
    keywords: ['zakat', 'charity', 'sadaqah', 'infaq', 'giving', 'wealth', 'poor', 'needy', 'nisab', 'generosity'],
    response: {
      directAnswer: 'Zakat is the third pillar of Islam, representing an obligatory contribution of 2.5% on qualifying wealth to purify assets and support the underprivileged. Voluntary charity (Sadaqah) is deeply encouraged and shields one from calamity.',
      quranEvidences: [
        {
          surahName: 'Al-Baqarah',
          surahNumber: 2,
          ayahNumber: 261,
          arabicText: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ لِمَن يَشَاءُ',
          transliteration: "Mathalu alladhina yunfiqoona amwalahum fee sabeeli Allahi kamathali habbatin...",
          englishTranslation: 'The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills.',
          explanation: 'Spending sincerely in charity is rewarded with at least a seven-hundred-fold increase.'
        },
        {
          surahName: 'At-Tawbah',
          surahNumber: 9,
          ayahNumber: 103,
          arabicText: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا',
          transliteration: "Khudh min amwalihim sadaqatan tutahhiruhum wa tuzakkeehim biha",
          englishTranslation: 'Take, [O Muhammad], from their wealth a charity by which you purify them and cause them increase.',
          explanation: 'Zakat purifies the soul from greed and purifies wealth from spiritual blemish.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Sahih Muslim',
          hadithNumber: 'Hadith #2588',
          grade: 'Sahih',
          arabicText: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلاَّ عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلاَّ رَفَعَهُ اللَّهُ',
          englishTranslation: 'Charity does not decrease wealth, no one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah elevates him.',
          lesson: 'Giving in charity attracts barakah and spiritual growth rather than financial decrease.'
        }
      ],
      scholarlySummary: 'Zakat is mandatory annually on wealth exceeding the Nisab threshold held for a full lunar year. Sadaqah can be given anytime and includes acts of kindness, smiling, and removing harm from paths.',
      keyTakeaways: [
        'Zakat balances economic equity and shields society from poverty.',
        'Sadaqah extinguishes anger of the Lord like water extinguishes fire.',
        'Every act of kindness, including a pleasant word, is counted as charity.'
      ],
      closingReflection: 'وَاللَّهُ أَعْلَمُ (And Allah knows best)'
    }
  },

  // 8. Dua, Remembrance & Anxiety (Dhikr & Supplication)
  {
    keywords: ['dua', 'dhikr', 'anxiety', 'depression', 'stress', 'fear', 'remembrance', 'supplication', 'peace', 'worry', 'ayat al-kursi'],
    response: {
      directAnswer: 'Dua (supplication) is the essence of worship in Islam, allowing the believer to converse directly with Allah without intermediaries. Dhikr (remembrance of Allah) is the prescribed cure for spiritual anxiety and inner distress.',
      quranEvidences: [
        {
          surahName: 'Al-Baqarah',
          surahNumber: 2,
          ayahNumber: 186,
          arabicText: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ',
          transliteration: "Wa idha sa'alaka 'ibadi 'anni fa'inni qareeb, ujeebu da'wata ad-da'i idha da'an",
          englishTranslation: 'And when My servants ask you, [O Muhammad], concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.',
          explanation: 'Allah assures every believer of His immediate closeness and responsiveness to their heartfelt prayers.'
        },
        {
          surahName: 'Ar-Ra\'d',
          surahNumber: 13,
          ayahNumber: 28,
          arabicText: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
          transliteration: "Alladhina amanu wa tatma'innu quloobuhum bi-dhikri Allahi, ala bi-dhikri Allahi tatma'innu al-quloob",
          englishTranslation: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
          explanation: 'True psychological tranquility and peace of heart are found in the constant remembrance of Allah.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Jami` at-Tirmidhi',
          hadithNumber: 'Hadith #3372',
          grade: 'Sahih',
          arabicText: 'الدُّعَاءُ هُوَ الْعِبَادَةُ',
          englishTranslation: 'The Prophet (pbuh) said: "Supplication (Dua) is worship itself."',
          lesson: 'Calling upon Allah is the core manifestation of humility and servantship.'
        },
        {
          collection: 'Sahih al-Bukhari',
          hadithNumber: 'Hadith #6369',
          grade: 'Sahih',
          arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',
          englishTranslation: 'O Allah, I seek refuge in You from anxiety and sorrow, from weakness and laziness, from cowardice and miserliness, from the burden of debt, and from being overpowered by men.',
          lesson: 'A comprehensive prophetic Dua for mental well-being, resilience, and protection from distress.'
        }
      ],
      scholarlySummary: 'Etiquettes of Dua include beginning with praising Allah and sending blessings on the Prophet (pbuh), raising hands with firm faith, facing the Qiblah, and making supplication in the last third of the night, during Sujood, or between the Adhan and Iqamah.',
      keyTakeaways: [
        'Dua is never wasted: it is granted immediately, saved for the hereafter, or wards off an equivalent evil.',
        'Frequent remembrance of Allah (SubhanAllah, Alhamdulillah, Allahu Akbar) brings serenity.',
        'Turn to Allah first whenever experiencing anxiety or uncertainty.'
      ],
      closingReflection: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ (Allah is sufficient for us, and He is the best Disposer of affairs).'
    }
  },

  // 9. Good Character, Honesty & Modesty (Akhlaq)
  {
    keywords: ['character', 'akhlaq', 'honesty', 'manners', 'modesty', 'haya', 'truthfulness', 'anger', 'backbiting', 'gheebah', 'forgiving'],
    response: {
      directAnswer: 'Noble character (Husn al-Khuluq) is central to Islam. The Prophet Muhammad (pbuh) explained that his mission was to perfect noble traits, including honesty, modesty, kindness, suppressing anger, and guarding the tongue.',
      quranEvidences: [
        {
          surahName: 'Al-Qalam',
          surahNumber: 68,
          ayahNumber: 4,
          arabicText: 'وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',
          transliteration: "Wa innaka la'ala khuluqin 'azeem",
          englishTranslation: 'And indeed, you [O Muhammad] are of a great moral character.',
          explanation: 'Allah Himself praises the sublime moral character and exemplary conduct of the Prophet (pbuh).'
        },
        {
          surahName: 'Fussilat',
          surahNumber: 41,
          ayahNumber: 34,
          arabicText: 'وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ',
          transliteration: "Wa la tastawi al-hasanatu wa la as-sayyi'ah, idfa' billati hiya ahsan...",
          englishTranslation: 'And not equal are the good deed and the bad. Repel [evil] by that [deed] which is better; and thereupon the one whom between you and him was enmity [will become] as though he was a devoted friend.',
          explanation: 'Encourages responding to harshness with gentleness, transforming discord into mutual respect.'
        }
      ],
      hadithEvidences: [
        {
          collection: 'Jami` at-Tirmidhi',
          hadithNumber: 'Hadith #2003',
          grade: 'Sahih',
          arabicText: 'إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ وَأَقْرَبِكُمْ مِنِّي مَجْلِسًا يَوْمَ الْقِيَامَةِ أَحَاسِنَكُمْ أَخْلاَقًا',
          englishTranslation: 'The Prophet (pbuh) said: "Indeed, the most beloved of you to me and the closest of you to me on the Day of Judgment are those of you with the best character."',
          lesson: 'Exemplary character is the primary benchmark of closeness to the Messenger of Allah in the hereafter.'
        },
        {
          collection: 'Sahih al-Bukhari',
          hadithNumber: 'Hadith #6116',
          grade: 'Sahih',
          arabicText: 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ',
          englishTranslation: 'The strong man is not the one who can wrestle, but the one who controls himself in a fit of rage.',
          lesson: 'True strength lies in emotional restraint and self-discipline when provoked.'
        }
      ],
      scholarlySummary: 'Islamic ethics emphasize that outward rituals must translate into inward humility, truthfulness in business and relationships, avoiding backbiting (Gheebah), and treating all creations with mercy.',
      keyTakeaways: [
        'Good character weighs heavily on the scale of good deeds on Judgment Day.',
        'Guard the tongue from falsehood, slander, and unnecessary speech.',
        'Controlling anger and showing forgiveness reflects profound spiritual maturity.'
      ],
      closingReflection: 'اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي (O Allah, just as You have made my physical form good, make my character good).'
    }
  }
];

// Universal matcher and synthesizer for any question
export function getIslamicKnowledge(question: string, category?: string): IslamicAIResponse {
  const qLower = question.toLowerCase().trim();

  // 1. Check direct matches in sample topics
  for (const topic of SAMPLE_TOPICS) {
    if (qLower.includes(topic.id) || topic.question.toLowerCase().includes(qLower) || qLower.includes(topic.title.toLowerCase())) {
      return topic.presetData;
    }
  }

  // 2. Check keyword matches in Knowledge Base
  for (const entry of ISLAMIC_KNOWLEDGE_BASE) {
    const isMatch = entry.keywords.some((kw) => qLower.includes(kw));
    if (isMatch) {
      return entry.response;
    }
  }

  // 3. Contextual Authentic Default for General Inquiries
  return {
    directAnswer: `In Islam, regarding "${question}", the Holy Quran and Sunnah provide comprehensive guidance emphasizing sincere devotion, steadfast obedience, justice, and seeking the pleasure of Allah through authentic worship and moral excellence.`,
    quranEvidences: [
      {
        surahName: 'Al-Baqarah',
        surahNumber: 2,
        ayahNumber: 186,
        arabicText: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ',
        transliteration: "Wa idha sa'alaka 'ibadi 'anni fa'inni qareeb, ujeebu da'wata ad-da'i idha da'an",
        englishTranslation: 'And when My servants ask you, [O Muhammad], concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me. So let them respond to Me and believe in Me that they may be guided.',
        explanation: 'Allah reassures every seeker of His closeness and invites them to call upon Him with sincere conviction.'
      },
      {
        surahName: 'An-Nahl',
        surahNumber: 16,
        ayahNumber: 90,
        arabicText: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ وَيَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ وَالْبَغْيِ ۚ يَعِظُكُمْ لَعَلَّكُمْ تَذَكَّرُونَ',
        transliteration: "Inna Allaha ya'muru bil-'adli wal-ihsani wa eeta'i dhi al-qurba...",
        englishTranslation: 'Indeed, Allah orders justice and good conduct and giving to relatives and forbids immorality and bad conduct and oppression. He admonishes you that perhaps you will be reminded.',
        explanation: 'A comprehensive Quranic ayah regarded by Islamic scholars as encompassing the foundational ethical codes of Islam.'
      }
    ],
    hadithEvidences: [
      {
        collection: 'Sahih al-Bukhari & Sahih Muslim',
        hadithNumber: 'Bukhari #1, Muslim #1907',
        grade: 'Muttafaq \'Alayh (Agreed Upon)',
        arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
        englishTranslation: 'Actions are but by intentions, and every person shall have but that which they intended.',
        lesson: 'Ikhlas (sincerity of intention) is the prerequisite for all acts of worship and daily endeavors in Islam.'
      }
    ],
    scholarlySummary: `Islamic jurisprudence teaches us to evaluate matters through the authentic texts of the Quran, the Sunnah of Prophet Muhammad (pbuh), and the consensus of recognized scholars. Moderation, devotion, and compassion are guiding lights.`,
    keyTakeaways: [
      'Seek authentic knowledge directly supported by Quran and verified Sunnah.',
      'Sincerity in intention (Ikhlas) purifies all deeds and worship.',
      'Turn to Allah with regular prayer, supplication, and patience.'
    ],
    closingReflection: 'وَاللَّهُ أَعْلَمُ (And Allah knows best)'
  };
}
