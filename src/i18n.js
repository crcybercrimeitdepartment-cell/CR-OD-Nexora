import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const translations = {
  en: {
    platformSettings: { title: "Platform Settings", subtitle: "Configure your personal preferences and platform behavior." },
    languageSetting: { title: "Language Settings", subtitle: "Select your preferred language for the Nexora dashboard.", available: "Available Languages", current: "Current System Language", setAsDefault: "Set as Default", saveChanges: "Save Changes", successMessage: "Language updated successfully!", back: "Back" },
    modules: {
      "language-setting": { name: "Language Setting", description: "Select system languages, regional formats, and localized dialect preferences." },
      "customise-theme": { name: "Customise Theme", description: "Personalize UI color palettes, dark mode toggles, and accent themes." },
      "accessibility-setting": { name: "Accessibility Setting", description: "Configure high contrast modes, screen reader support, and font scaling." },
      "layout-setting": { name: "Layout Setting", description: "Adjust grid spacing, card density, sidebar placement, and dashboard layout." },
      "notification-setting": { name: "Notification Setting", description: "Manage push alerts, email notifications, sound cues, and system warnings." },
      "animation-setting": { name: "Animation Setting", description: "Control UI motion, GSAP transition speeds, and reduced motion settings." },
      "zoom-controls": { name: "Zoom Controls", description: "Set viewport scale ratios, default zoom levels, and magnification shortcuts." },
      "voice-assistant": { name: "Voice Assistant", description: "Enable hands-free voice commands, speech recognition, and audio feedback." },
      "user-activity-log": { name: "User Activity Log", description: "Audit user login sessions, timestamps, IP histories, and administrative activity." },
      "platform-security-setting": { name: "Platform Security", description: "Configure firewall rules, encryption standards, session timeouts, and IP white-listing." },
      "web-camera-setting": { name: "Web Camera Setting", description: "Manage camera devices, resolution quality, frame rates, and video capture permissions." },
      "2-factor-authentication": { name: "2 Factor Authentication", description: "Configure TOTP authenticator apps, SMS OTP backups, and biometric 2FA keys." }
    },
    layoutSetting: { title: "Layout Settings", subtitle: "Customize your dashboard arrangement, density, and structural layout.", gridColumns: "Grid Columns", gridColumnsDesc: "Choose number of columns in grid view", columns: "Columns", cardOrder: "Card Order", cardOrderDesc: "Drag and drop to rearrange your tools", resetOrder: "Reset Default Order", dragInfo: "Hover over any tool and use the grab handle to drag it to a new position. The layout updates instantly.", cardSize: "Card Size", cardSizeDesc: "Choose how much content each tool card displays.", preview: "Preview", small: "Small", medium: "Medium", large: "Large", autoFit: "Auto-fit", saveChanges: "Save Changes", back: "Back" },
    notificationSetting: { title: "Notification Settings", subtitle: "Control notification behavior, sounds, alerts, duration, and notification preferences.", saveChanges: "Save Changes", back: "Back", behavior: "Notification Behavior", behaviorDesc: "Control how notifications appear and behave.", enable: "Enable Notifications", enableDesc: "Turn all notifications on or off", desktop: "Show on Desktop", desktopDesc: "Display browser/desktop notifications", position: "Notification Position", positionDesc: "Choose where notifications appear" }
  },
  hi: {
    platformSettings: { title: "प्लेटफ़ॉर्म सेटिंग्स", subtitle: "अपनी व्यक्तिगत प्राथमिकताओं और प्लेटफ़ॉर्म व्यवहार को कॉन्फ़िगर करें।" },
    languageSetting: { title: "भाषा सेटिंग्स", subtitle: "नेक्सोरा डैशबोर्ड के लिए अपनी पसंदीदा भाषा चुनें।", available: "उपलब्ध भाषाएँ", current: "वर्तमान सिस्टम भाषा", setAsDefault: "डिफ़ॉल्ट के रूप में सेट करें", saveChanges: "परिवर्तन सहेजें", successMessage: "भाषा सफलतापूर्वक अपडेट की गई!", back: "वापस" },
    modules: {
      "language-setting": { name: "भाषा सेटिंग", description: "सिस्टम भाषाएँ, क्षेत्रीय प्रारूप और स्थानीय बोलियाँ चुनें।" },
      "customise-theme": { name: "थीम कस्टमाइज़ करें", description: "UI रंग पैलेट, डार्क मोड और थीम को वैयक्तिकृत करें।" },
      "accessibility-setting": { name: "अभिगम्यता सेटिंग", description: "उच्च कंट्रास्ट मोड, स्क्रीन रीडर और फ़ॉन्ट स्केलिंग कॉन्फ़िगर करें।" },
      "layout-setting": { name: "लेआउट सेटिंग", description: "ग्रिड स्पेसिंग, कार्ड घनत्व, साइडबार और डैशबोर्ड लेआउट समायोजित करें।" },
      "notification-setting": { name: "अधिसूचना सेटिंग", description: "पुश अलर्ट, ईमेल सूचनाएं, ध्वनि और सिस्टम चेतावनियां प्रबंधित करें।" },
      "animation-setting": { name: "एनिमेशन सेटिंग", description: "UI गति, GSAP संक्रमण गति और कम गति सेटिंग नियंत्रित करें।" },
      "zoom-controls": { name: "ज़ूम नियंत्रण", description: "व्यूपोर्ट स्केल अनुपात, डिफ़ॉल्ट ज़ूम स्तर और आवर्धन शॉर्टकट सेट करें।" },
      "voice-assistant": { name: "आवाज़ सहायक", description: "हैंड्स-फ़्री वॉयस कमांड, वाक् पहचान और ऑडियो फीडबैक सक्षम करें।" },
      "user-activity-log": { name: "उपयोगकर्ता गतिविधि लॉग", description: "लॉगिन सत्र, आईपी इतिहास और प्रशासनिक गतिविधि का ऑडिट करें।" },
      "platform-security-setting": { name: "प्लेटफ़ॉर्म सुरक्षा", description: "फ़ायरवॉल नियम, एन्क्रिप्शन और आईपी व्हाइट-लिस्टिंग कॉन्फ़िगर करें।" },
      "web-camera-setting": { name: "वेब कैमरा सेटिंग", description: "कैमरा डिवाइस, रिज़ॉल्यूशन गुणवत्ता, और वीडियो अनुमतियां प्रबंधित करें।" },
      "2-factor-authentication": { name: "2-कारक प्रमाणीकरण", description: "TOTP प्रामाणिक ऐप, एसएमएस ओटीपी और बायोमेट्रिक 2FA कुंजियां कॉन्फ़िगर करें।" }
    },
    layoutSetting: { title: "लेआउट सेटिंग", subtitle: "अपने डैशबोर्ड व्यवस्था, घनत्व, और लेआउट को अनुकूलित करें।", gridColumns: "ग्रिड कॉलम", gridColumnsDesc: "ग्रिड दृश्य में कॉलम की संख्या चुनें", columns: "कॉलम", cardOrder: "कार्ड क्रम", cardOrderDesc: "अपने टूल को पुनर्व्यवस्थित करने के लिए खींचें और छोड़ें", resetOrder: "डिफ़ॉल्ट क्रम रीसेट करें", dragInfo: "किसी भी टूल पर होवर करें और उसे नए स्थान पर खींचें।", cardSize: "कार्ड का आकार", cardSizeDesc: "चुनें कि प्रत्येक टूल कार्ड कितनी सामग्री प्रदर्शित करता है।", preview: "पूर्वावलोकन", small: "छोटा", medium: "मध्यम", large: "बड़ा", autoFit: "ऑटो-फिट", saveChanges: "परिवर्तन सहेजें", back: "वापस" },
    notificationSetting: { title: "अधिसूचना सेटिंग्स", subtitle: "अधिसूचना व्यवहार, ध्वनि, अलर्ट, अवधि और प्राथमिकताएं नियंत्रित करें।", saveChanges: "परिवर्तन सहेजें", back: "वापस", behavior: "अधिसूचना व्यवहार", behaviorDesc: "नियंत्रित करें कि सूचनाएं कैसे दिखाई देती हैं और व्यवहार करती हैं।", enable: "सूचनाएं सक्षम करें", enableDesc: "सभी सूचनाएं चालू या बंद करें", desktop: "डेस्कटॉप पर दिखाएं", desktopDesc: "ब्राउज़र/डेस्कटॉप सूचनाएं प्रदर्शित करें", position: "अधिसूचना स्थिति", positionDesc: "चुनें कि सूचनाएं कहां दिखाई दें" }
  },
  es: {
    platformSettings: { title: "Configuración de Plataforma", subtitle: "Configure sus preferencias personales y el comportamiento de la plataforma." },
    languageSetting: { title: "Configuración de Idioma", subtitle: "Seleccione su idioma preferido para el panel.", available: "Idiomas Disponibles", current: "Idioma Actual", setAsDefault: "Establecer por Defecto", saveChanges: "Guardar Cambios", successMessage: "¡Idioma actualizado!", back: "Atrás" },
    modules: {
      "language-setting": { name: "Configuración de Idioma", description: "Seleccione el idioma del sistema y los formatos regionales." },
      "customise-theme": { name: "Personalizar Tema", description: "Personalice la paleta de colores y el modo oscuro." },
      "accessibility-setting": { name: "Accesibilidad", description: "Configure los modos de alto contraste y el lector de pantalla." },
      "layout-setting": { name: "Diseño", description: "Ajuste el espaciado y el diseño del panel." },
      "notification-setting": { name: "Notificaciones", description: "Administre alertas, correos electrónicos y advertencias." },
      "animation-setting": { name: "Animaciones", description: "Controle el movimiento de la interfaz de usuario." },
      "zoom-controls": { name: "Controles de Zoom", description: "Establezca la escala de visualización." },
      "voice-assistant": { name: "Asistente de Voz", description: "Habilite los comandos de voz manos libres." },
      "user-activity-log": { name: "Registro de Actividad", description: "Audite las sesiones de inicio de sesión." },
      "platform-security-setting": { name: "Seguridad", description: "Configure las reglas del firewall y la encriptación." },
      "web-camera-setting": { name: "Cámara Web", description: "Administre los dispositivos de cámara y la resolución." },
      "2-factor-authentication": { name: "Autenticación 2FA", description: "Configure aplicaciones TOTP y copias de seguridad." }
    },
    layoutSetting: { title: "Diseño", subtitle: "Personalice la disposición de su panel.", gridColumns: "Columnas", gridColumnsDesc: "Elija el número de columnas", columns: "Columnas", cardOrder: "Orden de las Tarjetas", cardOrderDesc: "Arrastra para reordenar", resetOrder: "Restablecer", dragInfo: "Pase el cursor sobre cualquier herramienta y arrástrela.", cardSize: "Tamaño", cardSizeDesc: "Elija cuánto contenido muestra cada tarjeta.", preview: "Vista previa", small: "Pequeño", medium: "Medio", large: "Grande", autoFit: "Ajuste auto", saveChanges: "Guardar", back: "Atrás" },
    notificationSetting: { title: "Notificaciones", subtitle: "Controle cómo desea ser notificado.", saveChanges: "Guardar", back: "Atrás", behavior: "Comportamiento", behaviorDesc: "Controla cómo aparecen las notificaciones.", enable: "Habilitar Notificaciones", enableDesc: "Activa o desactiva todas las notificaciones", desktop: "Mostrar en Escritorio", desktopDesc: "Muestra notificaciones en el navegador", position: "Posición", positionDesc: "Elija dónde aparecen las notificaciones" }
  },
  bn: {
    languageSetting: { title: "ভাষা সেটিংস", subtitle: "আপনার পছন্দের ভাষা নির্বাচন করুন।", available: "উপলব্ধ ভাষা", current: "বর্তমান ভাষা", setAsDefault: "ডিফল্ট হিসেবে সেট করুন", saveChanges: "সংরক্ষণ করুন", successMessage: "ভাষা সফলভাবে আপডেট করা হয়েছে!", back: "ফিরে যান" },
    modules: {
      "language-setting": { name: "ভাষা সেটিংস", description: "সিস্টেম ভাষা এবং আঞ্চলিক বিন্যাস নির্বাচন করুন।" },
      "customise-theme": { name: "থিম কাস্টমাইজ", description: "রঙ এবং ডার্ক মোড কাস্টমাইজ করুন।" },
      "accessibility-setting": { name: "অ্যাক্সেসযোগ্যতা", description: "উচ্চ বৈসাদৃশ্য এবং ফন্ট স্কেলিং কনফিগার করুন।" },
      "layout-setting": { name: "লেআউট সেটিংস", description: "গ্রিড এবং ড্যাশবোর্ড লেআউট সামঞ্জস্য করুন।" },
      "notification-setting": { name: "বিজ্ঞপ্তি", description: "সতর্কতা এবং ইমেল বিজ্ঞপ্তি পরিচালনা করুন।" },
      "animation-setting": { name: "অ্যানিমেশন", description: "ইউআই মোশন নিয়ন্ত্রণ করুন।" },
      "zoom-controls": { name: "জুম নিয়ন্ত্রণ", description: "জুম স্তর সেট করুন।" },
      "voice-assistant": { name: "ভয়েস সহকারী", description: "ভয়েস কমান্ড সক্ষম করুন।" },
      "user-activity-log": { name: "ব্যবহারকারী কার্যকলাপ", description: "লগইন সেশন অডিট করুন।" },
      "platform-security-setting": { name: "নিরাপত্তা", description: "ফায়ারওয়াল এবং এনক্রিপশন কনফিগার করুন।" },
      "web-camera-setting": { name: "ওয়েব ক্যামেরা", description: "ক্যামেরা ডিভাইস পরিচালনা করুন।" },
      "2-factor-authentication": { name: "২এফএ প্রমাণীকরণ", description: "টিওটিপি অ্যাপ কনফিগার করুন।" }
    },
    layoutSetting: { title: "লেআউট সেটিংস", subtitle: "আপনার ড্যাশবোর্ড কাস্টমাইজ করুন।", gridColumns: "কলাম", gridColumnsDesc: "কলাম সংখ্যা চয়ন করুন", columns: "কলাম", cardOrder: "কার্ড অর্ডার", cardOrderDesc: "টেনে আনুন এবং ছেড়ে দিন", resetOrder: "রিসেট করুন", dragInfo: "টুল টেনে নতুন স্থানে নিয়ে যান।", cardSize: "কার্ডের আকার", cardSizeDesc: "কার্ড কতটা বড় হবে তা চয়ন করুন।", preview: "প্রিভিউ", small: "ছোট", medium: "মাঝারি", large: "বড়", autoFit: "স্বয়ংক্রিয়", saveChanges: "সংরক্ষণ করুন", back: "ফিরে যান" },
    notificationSetting: { title: "বিজ্ঞপ্তি সেটিংস", subtitle: "কিভাবে বিজ্ঞপ্তি পাবেন তা নিয়ন্ত্রণ করুন।", saveChanges: "সংরক্ষণ করুন", back: "ফিরে যান", behavior: "বিজ্ঞপ্তি আচরণ", behaviorDesc: "বিজ্ঞপ্তিগুলি কীভাবে উপস্থিত হয় তা নিয়ন্ত্রণ করুন।", enable: "বিজ্ঞপ্তি সক্ষম করুন", enableDesc: "বিজ্ঞপ্তি চালু বা বন্ধ করুন", desktop: "ডেস্কটপে দেখান", desktopDesc: "ব্রাউজার বিজ্ঞপ্তি প্রদর্শন করুন", position: "অবস্থান", positionDesc: "বিজ্ঞপ্তি কোথায় দেখাবে তা চয়ন করুন" }
  },
  te: {
    languageSetting: { title: "భాషా సెట్టింగ్‌లు", subtitle: "మీకు ఇష్టమైన భాషను ఎంచుకోండి.", available: "అందుబాటులో ఉన్న భాషలు", current: "ప్రస్తుత భాష", setAsDefault: "డిఫాల్ట్‌గా సెట్ చేయండి", saveChanges: "సేవ్ చేయండి", successMessage: "భాష నవీకరించబడింది!", back: "వెనుకకు" },
    modules: {
      "language-setting": { name: "భాషా సెట్టింగ్‌లు", description: "సిస్టమ్ భాషలు మరియు ప్రాంతీయ ఆకృతులను ఎంచుకోండి." },
      "customise-theme": { name: "థీమ్ అనుకూలీకరణ", description: "రంగులు మరియు డార్క్ మోడ్‌ను అనుకూలీకరించండి." },
      "accessibility-setting": { name: "ప్రాప్యత సెట్టింగ్‌లు", description: "హై కాంట్రాస్ట్ మరియు ఫాంట్ స్కేలింగ్‌ను కాన్ఫిగర్ చేయండి." },
      "layout-setting": { name: "లేఅవుట్ సెట్టింగ్‌లు", description: "గ్రిడ్ మరియు డాష్‌బోర్డ్ లేఅవుట్‌ను సర్దుబాటు చేయండి." },
      "notification-setting": { name: "నోటిఫికేషన్‌లు", description: "హెచ్చరికలు మరియు ఇమెయిల్ నోటిఫికేషన్‌లను నిర్వహించండి." },
      "animation-setting": { name: "యానిమేషన్‌లు", description: "UI కదలికను నియంత్రించండి." },
      "zoom-controls": { name: "జూమ్ నియంత్రణలు", description: "జూమ్ స్థాయిలను సెట్ చేయండి." },
      "voice-assistant": { name: "వాయిస్ అసిస్టెంట్", description: "వాయిస్ ఆదేశాలను ప్రారంభించండి." },
      "user-activity-log": { name: "వినియోగదారు కార్యాచరణ", description: "లాగిన్ సెషన్‌లను తనిఖీ చేయండి." },
      "platform-security-setting": { name: "భద్రత", description: "ఫైర్‌వాల్ మరియు గుప్తీకరణను కాన్ఫిగర్ చేయండి." },
      "web-camera-setting": { name: "వెబ్ కెమెరా సెట్టింగ్", description: "కెమెరా పరికరాలను నిర్వహించండి." },
      "2-factor-authentication": { name: "2FA ప్రామాణీకరణ", description: "TOTP యాప్‌లను కాన్ఫిগার చేయండి." }
    },
    layoutSetting: { title: "లేఅవుట్ సెట్టింగ్‌లు", subtitle: "మీ డాష్‌బోర్డ్‌ను అనుకూలీకరించండి.", gridColumns: "నిలువు వరుసలు", gridColumnsDesc: "నిలువు వరుసల సంఖ్యను ఎంచుకోండి", columns: "నిలువు వరుసలు", cardOrder: "కార్డ్ క్రమం", cardOrderDesc: "లాగండి మరియు వదలండి", resetOrder: "రీసెట్ చేయండి", dragInfo: "కొత్త స్థానానికి లాగండి.", cardSize: "కార్డ్ పరిమాణం", cardSizeDesc: "కార్డ్ పరిమాణాన్ని ఎంచుకోండి.", preview: "ప్రివ్యూ", small: "చిన్నది", medium: "మధ్యస్థం", large: "పెద్దది", autoFit: "ఆటో-ఫిట్", saveChanges: "సేవ్ చేయండి", back: "వెనుకకు" },
    notificationSetting: { title: "నోటిఫికేషన్ సెట్టింగ్‌లు", subtitle: "మీకు ఎలా తెలియజేయాలో నియంత్రించండి.", saveChanges: "సేవ్ చేయండి", back: "వెనుకకు", behavior: "ప్రవర్తన", behaviorDesc: "నోటిఫికేషన్‌లు ఎలా కనిపిస్తాయో నియంత్రించండి.", enable: "ప్రారంభించు", enableDesc: "నోటిఫికేషన్‌లను ఆన్ లేదా ఆఫ్ చేయండి", desktop: "డెస్క్‌టాప్‌పై చూపించు", desktopDesc: "బ్రౌజర్ నోటిఫికేషన్‌లను ప్రదర్శించు", position: "స్థానం", positionDesc: "స్థానాన్ని ఎంచుకోండి" }
  },
  ta: {
    languageSetting: { title: "மொழி அமைப்புகள்", subtitle: "உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்.", available: "கிடைக்கும் மொழிகள்", current: "தற்போதைய மொழி", setAsDefault: "இயல்புநிலையாக அமை", saveChanges: "மாற்றங்களைச் சேமி", successMessage: "மொழி புதுப்பிக்கப்பட்டது!", back: "பின்னால்" },
    modules: {
      "language-setting": { name: "மொழி அமைப்புகள்", description: "கணினி மொழிகள் மற்றும் பிராந்திய வடிவங்களைத் தேர்ந்தெடுக்கவும்." },
      "customise-theme": { name: "தீம் தனிப்பயனாக்கம்", description: "வண்ணங்கள் மற்றும் இருண்ட பயன்முறையைத் தனிப்பயனாக்குங்கள்." },
      "accessibility-setting": { name: "அணுகல்தன்மை", description: "உயர் மாறுபாடு மற்றும் எழுத்துரு அளவை உள்ளமைக்கவும்." },
      "layout-setting": { name: "தளவமைப்பு", description: "கட்டம் மற்றும் டாஷ்போர்டு தளவமைப்பை சரிசெய்யவும்." },
      "notification-setting": { name: "அறிவிப்புகள்", description: "விழிப்பூட்டல்கள் மற்றும் மின்னஞ்சல் அறிவிப்புகளை நிர்வகிக்கவும்." },
      "animation-setting": { name: "அனிமேஷன்கள்", description: "UI இயக்கத்தைக் கட்டுப்படுத்தவும்." },
      "zoom-controls": { name: "பெரிதாக்கு கட்டுப்பாடுகள்", description: "பெரிதாக்கு அளவை அமைக்கவும்." },
      "voice-assistant": { name: "குரல் உதவியாளர்", description: "குரல் கட்டளைகளை இயக்கவும்." },
      "user-activity-log": { name: "பயனர் செயல்பாடு", description: "உள்நுழைவு அமர்வுகளை தணிக்கை செய்யவும்." },
      "platform-security-setting": { name: "பாதுகாப்பு", description: "ஃபயர்வால் மற்றும் குறியாக்கத்தை உள்ளமைக்கவும்." },
      "web-camera-setting": { name: "வலை கேமரா", description: "கேமரா சாதனங்களை நிர்வகிக்கவும்." },
      "2-factor-authentication": { name: "2FA அங்கீகாரம்", description: "TOTP பயன்பாடுகளை உள்ளமைக்கவும்." }
    },
    layoutSetting: { title: "தளவமைப்பு அமைப்புகள்", subtitle: "உங்கள் டாஷ்போர்டைத் தனிப்பயனாக்குங்கள்.", gridColumns: "நெடுவரிசைகள்", gridColumnsDesc: "நெடுவரிசைகளின் எண்ணிக்கையைத் தேர்ந்தெடுக்கவும்", columns: "நெடுவரிசைகள்", cardOrder: "அட்டை வரிசை", cardOrderDesc: "இழுத்து விடவும்", resetOrder: "மீட்டமை", dragInfo: "புதிய இடத்திற்கு இழுக்கவும்.", cardSize: "அட்டை அளவு", cardSizeDesc: "அட்டை அளவைத் தேர்ந்தெடுக்கவும்.", preview: "முன்னோட்டம்", small: "சிறிய", medium: "நடுத்தர", large: "பெரிய", autoFit: "தானியங்கி பொருத்தம்", saveChanges: "சேமி", back: "பின்னால்" },
    notificationSetting: { title: "அறிவிப்பு அமைப்புகள்", subtitle: "உங்களுக்கு எப்படி அறிவிக்க வேண்டும் என்பதைக் கட்டுப்படுத்தவும்.", saveChanges: "சேமி", back: "பின்னால்", behavior: "நடத்தை", behaviorDesc: "அறிவிப்புகள் எவ்வாறு தோன்றும் என்பதைக் கட்டுப்படுத்தவும்.", enable: "இயக்கு", enableDesc: "அறிவிப்புகளை ஆன் அல்லது ஆஃப் செய்யவும்", desktop: "டெஸ்க்டாப்பில் காட்டு", desktopDesc: "உலாவி அறிவிப்புகளைக் காண்பி", position: "நிலை", positionDesc: "நிலையைத் தேர்ந்தெடுக்கவும்" }
  },
  mr: {
    languageSetting: { title: "भाषा सेटिंग्ज", subtitle: "तुमची आवडती भाषा निवडा.", available: "उपलब्ध भाषा", current: "सध्याची भाषा", setAsDefault: "डीफॉल्ट म्हणून सेट करा", saveChanges: "बदल जतन करा", successMessage: "भाषा यशस्वीरित्या अद्यतनित केली!", back: "मागे" },
    modules: {
      "language-setting": { name: "भाषा सेटिंग", description: "सिस्टम भाषा आणि प्रादेशिक स्वरूप निवडा." },
      "customise-theme": { name: "थीम सानुकूलित करा", description: "रंग आणि गडद मोड सानुकूलित करा." },
      "accessibility-setting": { name: "प्रवेशयोग्यता सेटिंग्ज", description: "उच्च कॉन्ट्रास्ट आणि फॉन्ट स्केलिंग कॉन्फिगर करा." },
      "layout-setting": { name: "लेआउट सेटिंग्ज", description: "ग्रिड आणि डॅशबोर्ड लेआउट समायोजित करा." },
      "notification-setting": { name: "सूचना सेटिंग्ज", description: "अॅलर्ट आणि ईमेल सूचना व्यवस्थापित करा." },
      "animation-setting": { name: "अॅनिमेशन सेटिंग्ज", description: "UI गती नियंत्रित करा." },
      "zoom-controls": { name: "झूम नियंत्रणे", description: "झूम पातळी सेट करा." },
      "voice-assistant": { name: "आवाज सहाय्यक", description: "व्हॉइस कमांड सक्षम करा." },
      "user-activity-log": { name: "वापरकर्ता क्रियाकलाप", description: "लॉगिन सत्रांचे ऑडिट करा." },
      "platform-security-setting": { name: "सुरक्षा", description: "फायरवॉल आणि एन्क्रिप्शन कॉन्फिगर करा." },
      "web-camera-setting": { name: "वेब कॅमेरा", description: "कॅमेरा डिव्हाइस व्यवस्थापित करा." },
      "2-factor-authentication": { name: "2FA प्रमाणीकरण", description: "TOTP अॅप्स कॉन्फिगर करा." }
    },
    layoutSetting: { title: "लेआउट सेटिंग्ज", subtitle: "तुमचे डॅशबोर्ड सानुकूलित करा.", gridColumns: "स्तंभ", gridColumnsDesc: "स्तंभांची संख्या निवडा", columns: "स्तंभ", cardOrder: "कार्ड क्रम", cardOrderDesc: "ड्रॅग आणि ड्रॉप करा", resetOrder: "रीसेट करा", dragInfo: "नवीन स्थानावर ड्रॅग करा.", cardSize: "कार्ड आकार", cardSizeDesc: "कार्ड आकार निवडा.", preview: "पूर्वावलोकन", small: "लहान", medium: "मध्यम", large: "मोठे", autoFit: "ऑटो-फिट", saveChanges: "जतन करा", back: "मागे" },
    notificationSetting: { title: "सूचना सेटिंग्ज", subtitle: "तुम्हाला कसे सूचित केले जावे ते नियंत्रित करा.", saveChanges: "जतन करा", back: "मागे", behavior: "वर्तन", behaviorDesc: "सूचना कशा दिसतात ते नियंत्रित करा.", enable: "सक्षम करा", enableDesc: "सूचना चालू किंवा बंद करा", desktop: "डेस्कटॉपवर दर्शवा", desktopDesc: "ब्राउझर सूचना प्रदर्शित करा", position: "स्थान", positionDesc: "स्थान निवडा" }
  },
  gu: {
    languageSetting: { title: "ભાષા સેટિંગ્સ", subtitle: "તમારી મનપસંદ ભાષા પસંદ કરો.", available: "ઉપલબ્ધ ભાષાઓ", current: "વર્તમાન ભાષા", setAsDefault: "ડિફોલ્ટ તરીકે સેટ કરો", saveChanges: "ફેરફારો સાચવો", successMessage: "ભાષા સફળતાપૂર્વક અપડેટ થઈ!", back: "પાછા" },
    modules: {
      "language-setting": { name: "ભાષા સેટિંગ્સ", description: "સિસ્ટમ ભાષાઓ અને પ્રાદેશિક ફોર્મેટ્સ પસંદ કરો." },
      "customise-theme": { name: "થીમ કસ્ટમાઇઝ કરો", description: "રંગો અને ડાર્ક મોડને કસ્ટમાઇઝ કરો." },
      "accessibility-setting": { name: "ઍક્સેસિબિલિટી", description: "ઉચ્ચ કોન્ટ્રાસ્ટ અને ફોન્ટ સ્કેલિંગને ગોઠવો." },
      "layout-setting": { name: "લેઆઉટ સેટિંગ્સ", description: "ગ્રીડ અને ડેશબોર્ડ લેઆઉટને સમાયોજિત કરો." },
      "notification-setting": { name: "સૂચનાઓ", description: "ચેતવણીઓ અને ઇમેઇલ સૂચનાઓ મેનેજ કરો." },
      "animation-setting": { name: "એનિમેશન", description: "UI ગતિને નિયંત્રિત કરો." },
      "zoom-controls": { name: "ઝૂમ નિયંત્રણો", description: "ઝૂમ સ્તર સેટ કરો." },
      "voice-assistant": { name: "વૉઇસ આસિસ્ટન્ટ", description: "વૉઇસ કમાન્ડ્સ સક્ષમ કરો." },
      "user-activity-log": { name: "વપરાશકર્તા પ્રવૃત્તિ", description: "લૉગિન સત્રોનું ઑડિટ કરો." },
      "platform-security-setting": { name: "સુરક્ષા", description: "ફાયરવોલ અને એન્ક્રિપ્શનને ગોઠવો." },
      "web-camera-setting": { name: "વેબ કેમેરા", description: "કેમેરા ઉપકરણો મેનેજ કરો." },
      "2-factor-authentication": { name: "2FA પ્રમાણીકરણ", description: "TOTP એપ્લિકેશનોને ગોઠવો." }
    },
    layoutSetting: { title: "લેઆઉટ સેટિંગ્સ", subtitle: "તમારું ડેશબોર્ડ કસ્ટમાઇઝ કરો.", gridColumns: "કૉલમ્સ", gridColumnsDesc: "કૉલમ્સની સંખ્યા પસંદ કરો", columns: "કૉલમ્સ", cardOrder: "કાર્ડ ક્રમ", cardOrderDesc: "ખેંચો અને છોડો", resetOrder: "રીસેટ કરો", dragInfo: "નવા સ્થાન પર ખેંચો.", cardSize: "કાર્ડ કદ", cardSizeDesc: "કાર્ડ કદ પસંદ કરો.", preview: "પૂર્વાવલોકન", small: "નાનું", medium: "મધ્યમ", large: "મોટું", autoFit: "ઑટો-ફિટ", saveChanges: "સાચવો", back: "પાછા" },
    notificationSetting: { title: "સૂચના સેટિંગ્સ", subtitle: "તમને કેવી રીતે સૂચિત કરવામાં આવે તે નિયંત્રિત કરો.", saveChanges: "સાચવો", back: "પાછા", behavior: "વર્તન", behaviorDesc: "સૂચનાઓ કેવી રીતે દેખાય છે તે નિયંત્રિત કરો.", enable: "સક્ષમ કરો", enableDesc: "સૂચનાઓ ચાલુ અથવા બંધ કરો", desktop: "ડેસ્કટોપ પર બતાવો", desktopDesc: "બ્રાઉઝર સૂચનાઓ પ્રદર્શિત કરો", position: "સ્થાન", positionDesc: "સ્થાન પસંદ કરો" }
  },
  kn: {
    languageSetting: { title: "ಭಾಷಾ ಸೆಟ್ಟಿಂಗ್‌ಗಳು", subtitle: "ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.", available: "ಲಭ್ಯವಿರುವ ಭಾಷೆಗಳು", current: "ಪ್ರಸ್ತುತ ಭಾಷೆ", setAsDefault: "ಡೀಫಾಲ್ಟ್ ಆಗಿ ಹೊಂದಿಸಿ", saveChanges: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ", successMessage: "ಭಾಷೆಯನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ!", back: "ಹಿಂದೆ" },
    modules: {
      "language-setting": { name: "ಭಾಷಾ ಸೆಟ್ಟಿಂಗ್‌ಗಳು", description: "ಸಿಸ್ಟಮ್ ಭಾಷೆಗಳು ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಸ್ವರೂಪಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ." },
      "customise-theme": { name: "ಥೀಮ್ ಕಸ್ಟಮೈಸ್", description: "ಬಣ್ಣಗಳು ಮತ್ತು ಡಾರ್ಕ್ ಮೋಡ್ ಅನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ." },
      "accessibility-setting": { name: "ಪ್ರವೇಶಿಸುವಿಕೆ", description: "ಹೆಚ್ಚಿನ ಕಾಂಟ್ರಾಸ್ಟ್ ಮತ್ತು ಫಾಂಟ್ ಸ್ಕೇಲಿಂಗ್ ಅನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ." },
      "layout-setting": { name: "ಲೇಔಟ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು", description: "ಗ್ರಿಡ್ ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಲೇಔಟ್ ಅನ್ನು ಹೊಂದಿಸಿ." },
      "notification-setting": { name: "ಅಧಿಸೂಚನೆಗಳು", description: "ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಇಮೇಲ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ." },
      "animation-setting": { name: "ಅನಿಮೇಷನ್", description: "UI ಚಲನೆಯನ್ನು ನಿಯಂತ್ರಿಸಿ." },
      "zoom-controls": { name: "ಜೂಮ್ ನಿಯಂತ್ರಣಗಳು", description: "ಜೂಮ್ ಮಟ್ಟವನ್ನು ಹೊಂದಿಸಿ." },
      "voice-assistant": { name: "ಧ್ವನಿ ಸಹಾಯಕ", description: "ಧ್ವನಿ ಆಜ್ಞೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ." },
      "user-activity-log": { name: "ಬಳಕೆದಾರರ ಚಟುವಟಿಕೆ", description: "ಲಾಗಿನ್ ಸೆಷನ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ." },
      "platform-security-setting": { name: "ಭದ್ರತೆ", description: "ಫೈರ್‌ವಾಲ್ ಮತ್ತು ಗೂಢಲಿಪೀಕರಣವನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ." },
      "web-camera-setting": { name: "ವೆಬ್ ಕ್ಯಾಮೆರಾ", description: "ಕ್ಯಾಮೆರಾ ಸಾಧನಗಳನ್ನು ನಿರ್ವಹಿಸಿ." },
      "2-factor-authentication": { name: "2FA ದೃಢೀಕರಣ", description: "TOTP ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ." }
    },
    layoutSetting: { title: "ಲೇಔಟ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು", subtitle: "ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ.", gridColumns: "ಕಾಲಮ್‌ಗಳು", gridColumnsDesc: "ಕಾಲಮ್‌ಗಳ ಸಂಖ್ಯೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", columns: "ಕಾಲಮ್‌ಗಳು", cardOrder: "ಕಾರ್ಡ್ ಆದೇಶ", cardOrderDesc: "ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ", resetOrder: "ಮರುಹೊಂದಿಸಿ", dragInfo: "ಹೊಸ ಸ್ಥಳಕ್ಕೆ ಎಳೆಯಿರಿ.", cardSize: "ಕಾರ್ಡ್ ಗಾತ್ರ", cardSizeDesc: "ಕಾರ್ಡ್ ಗಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.", preview: "ಮುನ್ನೋಟ", small: "ಸಣ್ಣ", medium: "ಮಧ್ಯಮ", large: "ದೊಡ್ಡ", autoFit: "ಸ್ವಯಂ-ಹೊಂದಿಕೊಳ್ಳುವ", saveChanges: "ಉಳಿಸಿ", back: "ಹಿಂದೆ" },
    notificationSetting: { title: "ಅಧಿಸೂಚನೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು", subtitle: "ನಿಮಗೆ ಹೇಗೆ ಸೂಚನೆ ನೀಡಬೇಕು ಎಂಬುದನ್ನು ನಿಯಂತ್ರಿಸಿ.", saveChanges: "ಉಳಿಸಿ", back: "ಹಿಂದೆ", behavior: "ವರ್ತನೆ", behaviorDesc: "ಅಧಿಸೂಚನೆಗಳು ಹೇಗೆ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ ಎಂಬುದನ್ನು ನಿಯಂತ್ರಿಸಿ.", enable: "ಸಕ್ರಿಯಗೊಳಿಸಿ", enableDesc: "ಅಧಿಸೂಚನೆಗಳನ್ನು ಆನ್ ಅಥವಾ ಆಫ್ ಮಾಡಿ", desktop: "ಡೆಸ್ಕ್‌ಟಾಪ್‌ನಲ್ಲಿ ತೋರಿಸಿ", desktopDesc: "ಬ್ರೌಸರ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ಪ್ರದರ್ಶಿಸಿ", position: "ಸ್ಥಾನ", positionDesc: "ಸ್ಥಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ" }
  },
  ml: {
    languageSetting: { title: "ഭാഷാ ക്രമീകരണങ്ങൾ", subtitle: "നിങ്ങളുടെ ഇഷ്ട ഭാഷ തിരഞ്ഞെടുക്കുക.", available: "ലഭ്യമായ ഭാഷകൾ", current: "നിലവിലെ ഭാഷ", setAsDefault: "സ്ഥിരമായി സജ്ജീകരിക്കുക", saveChanges: "മാറ്റങ്ങൾ സംരക്ഷിക്കുക", successMessage: "ഭാഷ പുതുക്കി!", back: "തിരികെ" },
    modules: {
      "language-setting": { name: "ഭാഷാ ക്രമീകരണങ്ങൾ", description: "സിസ്റ്റം ഭാഷകൾ തിരഞ്ഞെടുക്കുക." },
      "customise-theme": { name: "തീം ഇഷ്‌ടാനുസൃതമാക്കുക", description: "നിറങ്ങളും ഡാർക്ക് മോഡും ഇഷ്‌ടാനുസൃതമാക്കുക." },
      "accessibility-setting": { name: "ആക്സസിബിലിറ്റി", description: "ഉയർന്ന കോൺട്രാസ്റ്റും ഫോണ്ട് സ്കെയിലിംഗും ക്രമീകരിക്കുക." },
      "layout-setting": { name: "ലേഔട്ട് ക്രമീകരണങ്ങൾ", description: "ഗ്രിഡും ഡാഷ്‌ബോർഡ് ലേഔട്ടും ക്രമീകരിക്കുക." },
      "notification-setting": { name: "അറിയിപ്പുകൾ", description: "അലേർട്ടുകളും ഇമെയിൽ അറിയിപ്പുകളും നിയന്ത്രിക്കുക." },
      "animation-setting": { name: "ആനിമേഷനുകൾ", description: "UI ചലനം നിയന്ത്രിക്കുക." },
      "zoom-controls": { name: "സൂം നിയന്ത്രണങ്ങൾ", description: "സൂം ലെവലുകൾ സജ്ജമാക്കുക." },
      "voice-assistant": { name: "വോയ്‌സ് അസിസ്റ്റന്റ്", description: "വോയ്‌സ് കമാൻഡുകൾ പ്രവർത്തനക്ഷമമാക്കുക." },
      "user-activity-log": { name: "ഉപയോക്തൃ പ്രവർത്തനം", description: "ലോഗിൻ സെഷനുകൾ പരിശോധിക്കുക." },
      "platform-security-setting": { name: "സുരക്ഷ", description: "ഫയർവാളും എൻക്രിപ്ഷനും ക്രമീകരിക്കുക." },
      "web-camera-setting": { name: "വെബ് ക്യാമറ", description: "ക്യാമറ ഉപകരണങ്ങൾ നിയന്ത്രിക്കുക." },
      "2-factor-authentication": { name: "2FA പ്രാമാണീകരണം", description: "TOTP ആപ്പുകൾ ക്രമീകരിക്കുക." }
    },
    layoutSetting: { title: "ലേഔട്ട് ക്രമീകരണങ്ങൾ", subtitle: "നിങ്ങളുടെ ഡാഷ്‌ബോർഡ് ഇഷ്‌ടാനുസൃതമാക്കുക.", gridColumns: "കോളങ്ങൾ", gridColumnsDesc: "കോളങ്ങളുടെ എണ്ണം തിരഞ്ഞെടുക്കുക", columns: "കോളങ്ങൾ", cardOrder: "കാർഡ് ക്രമം", cardOrderDesc: "വലിച്ചിടുക", resetOrder: "പുനഃസജ്ജമാക്കുക", dragInfo: "പുതിയ സ്ഥാനത്തേക്ക് വലിച്ചിടുക.", cardSize: "കാർഡ് വലുപ്പം", cardSizeDesc: "കാർഡ് വലുപ്പം തിരഞ്ഞെടുക്കുക.", preview: "പ്രിവ്യൂ", small: "ചെറുത്", medium: "ഇടത്തരം", large: "വലുത്", autoFit: "ഓട്ടോ-ഫിറ്റ്", saveChanges: "സംരക്ഷിക്കുക", back: "തിരികെ" },
    notificationSetting: { title: "അറിയിപ്പ് ക്രമീകരണങ്ങൾ", subtitle: "നിങ്ങളെ എങ്ങനെ അറിയിക്കണമെന്ന് നിയന്ത്രിക്കുക.", saveChanges: "സംരക്ഷിക്കുക", back: "തിരികെ", behavior: "പെരുമാറ്റം", behaviorDesc: "അറിയിപ്പുകൾ എങ്ങനെ ദൃശ്യമാകുന്നുവെന്ന് നിയന്ത്രിക്കുക.", enable: "പ്രവർത്തനക്ഷമമാക്കുക", enableDesc: "അറിയിപ്പുകൾ ഓൺ അല്ലെങ്കിൽ ഓഫ് ചെയ്യുക", desktop: "ഡെസ്ക്ടോപ്പിൽ കാണിക്കുക", desktopDesc: "ബ്രൗസർ അറിയിപ്പുകൾ പ്രദർശിപ്പിക്കുക", position: "സ്ഥാനം", positionDesc: "സ്ഥാനം തിരഞ്ഞെടുക്കുക" }
  },
  pa: {
    languageSetting: { title: "ਭਾਸ਼ਾ ਸੈਟਿੰਗਾਂ", subtitle: "ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ।", available: "ਉਪਲਬਧ ਭਾਸ਼ਾਵਾਂ", current: "ਮੌਜੂਦਾ ਭਾਸ਼ਾ", setAsDefault: "ਡਿਫੌਲਟ ਵਜੋਂ ਸੈੱਟ ਕਰੋ", saveChanges: "ਤਬਦੀਲੀਆਂ ਸੁਰੱਖਿਅਤ ਕਰੋ", successMessage: "ਭਾਸ਼ਾ ਸਫਲਤਾਪੂਰਵਕ ਅੱਪਡੇਟ ਕੀਤੀ ਗਈ!", back: "ਪਿੱਛੇ" },
    modules: {
      "language-setting": { name: "ਭਾਸ਼ਾ ਸੈਟਿੰਗਾਂ", description: "ਸਿਸਟਮ ਭਾਸ਼ਾਵਾਂ ਅਤੇ ਖੇਤਰੀ ਫਾਰਮੈਟ ਚੁਣੋ।" },
      "customise-theme": { name: "ਥੀਮ ਕਸਟਮਾਈਜ਼ ਕਰੋ", description: "ਰੰਗ ਅਤੇ ਡਾਰਕ ਮੋਡ ਨੂੰ ਕਸਟਮਾਈਜ਼ ਕਰੋ।" },
      "accessibility-setting": { name: "ਪਹੁੰਚਯੋਗਤਾ", description: "ਉੱਚ ਕੰਟ੍ਰਾਸਟ ਅਤੇ ਫੋਂਟ ਸਕੇਲਿੰਗ ਕੌਂਫਿਗਰ ਕਰੋ।" },
      "layout-setting": { name: "ਲੇਆਉਟ ਸੈਟਿੰਗਾਂ", description: "ਗ੍ਰਿਡ ਅਤੇ ਡੈਸ਼ਬੋਰਡ ਲੇਆਉਟ ਨੂੰ ਐਡਜਸਟ ਕਰੋ।" },
      "notification-setting": { name: "ਸੂਚਨਾਵਾਂ", description: "ਚੇਤਾਵਨੀਆਂ ਅਤੇ ਈਮੇਲ ਸੂਚਨਾਵਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ।" },
      "animation-setting": { name: "ਐਨੀਮੇਸ਼ਨ", description: "UI ਗਤੀ ਨੂੰ ਕੰਟਰੋਲ ਕਰੋ।" },
      "zoom-controls": { name: "ਜ਼ੂਮ ਕੰਟਰੋਲ", description: "ਜ਼ੂਮ ਪੱਧਰ ਸੈੱਟ ਕਰੋ।" },
      "voice-assistant": { name: "ਵੌਇਸ ਅਸਿਸਟੈਂਟ", description: "ਵੌਇਸ ਕਮਾਂਡਾਂ ਨੂੰ ਸਮਰੱਥ ਕਰੋ।" },
      "user-activity-log": { name: "ਉਪਭੋਗਤਾ ਗਤੀਵਿਧੀ", description: "ਲੌਗਇਨ ਸੈਸ਼ਨਾਂ ਦਾ ਆਡਿਟ ਕਰੋ।" },
      "platform-security-setting": { name: "ਸੁਰੱਖਿਆ", description: "ਫਾਇਰਵਾਲ ਅਤੇ ਐਨਕ੍ਰਿਪਸ਼ਨ ਕੌਂਫਿਗਰ ਕਰੋ।" },
      "web-camera-setting": { name: "ਵੈੱਬ ਕੈਮਰਾ", description: "ਕੈਮਰਾ ਡਿਵਾਈਸਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ।" },
      "2-factor-authentication": { name: "2FA ਪ੍ਰਮਾਣਿਕਤਾ", description: "TOTP ਐਪਾਂ ਨੂੰ ਕੌਂਫਿਗਰ ਕਰੋ।" }
    },
    layoutSetting: { title: "ਲੇਆਉਟ ਸੈਟਿੰਗਾਂ", subtitle: "ਆਪਣੇ ਡੈਸ਼ਬੋਰਡ ਨੂੰ ਕਸਟਮਾਈਜ਼ ਕਰੋ।", gridColumns: "ਕਾਲਮ", gridColumnsDesc: "ਕਾਲਮਾਂ ਦੀ ਗਿਣਤੀ ਚੁਣੋ", columns: "ਕਾਲਮ", cardOrder: "ਕਾਰਡ ਕ੍ਰਮ", cardOrderDesc: "ਖਿੱਚੋ ਅਤੇ ਛੱਡੋ", resetOrder: "ਰੀਸੈੱਟ ਕਰੋ", dragInfo: "ਨਵੇਂ ਸਥਾਨ 'ਤੇ ਖਿੱਚੋ।", cardSize: "ਕਾਰਡ ਦਾ ਆਕਾਰ", cardSizeDesc: "ਕਾਰਡ ਦਾ ਆਕਾਰ ਚੁਣੋ।", preview: "ਪੂਰਵਦਰਸ਼ਨ", small: "ਛੋਟਾ", medium: "ਦਰਮਿਆਨਾ", large: "ਵੱਡਾ", autoFit: "ਆਟੋ-ਫਿੱਟ", saveChanges: "ਸੁਰੱਖਿਅਤ ਕਰੋ", back: "ਪਿੱਛੇ" },
    notificationSetting: { title: "ਸੂਚਨਾ ਸੈਟਿੰਗਾਂ", subtitle: "ਕੰਟਰੋਲ ਕਰੋ ਕਿ ਤੁਹਾਨੂੰ ਕਿਵੇਂ ਸੂਚਿਤ ਕੀਤਾ ਜਾਵੇ।", saveChanges: "ਸੁਰੱਖਿਅਤ ਕਰੋ", back: "ਪਿੱਛੇ", behavior: "ਵਿਹਾਰ", behaviorDesc: "ਸੂਚਨਾਵਾਂ ਕਿਵੇਂ ਦਿਖਾਈ ਦਿੰਦੀਆਂ ਹਨ ਕੰਟਰੋਲ ਕਰੋ।", enable: "ਸਮਰੱਥ ਕਰੋ", enableDesc: "ਸੂਚਨਾਵਾਂ ਨੂੰ ਚਾਲੂ ਜਾਂ ਬੰਦ ਕਰੋ", desktop: "ਡੈਸਕਟਾਪ 'ਤੇ ਦਿਖਾਓ", desktopDesc: "ਬ੍ਰਾਊਜ਼ਰ ਸੂਚਨਾਵਾਂ ਦਿਖਾਓ", position: "ਸਥਾਨ", positionDesc: "ਸਥਾਨ ਚੁਣੋ" }
  },
  or: {
    languageSetting: { title: "ଭାଷା ସେଟିଂସମୂହ", subtitle: "ଆପଣଙ୍କର ପସନ୍ଦର ଭାଷା ଚୟନ କରନ୍ତୁ |", available: "ଉପଲବ୍ଧ ଭାଷା", current: "ବର୍ତ୍ତମାନର ଭାଷା", setAsDefault: "ଡିଫଲ୍ଟ ଭାବରେ ସେଟ୍ କରନ୍ତୁ", saveChanges: "ପରିବର୍ତ୍ତନ ସଞ୍ଚୟ କରନ୍ତୁ", successMessage: "ଭାଷା ସଫଳତାର ସହ ଅଦ୍ୟତନ ହେଲା!", back: "ପଛକୁ" },
    modules: {
      "language-setting": { name: "ଭାଷା ସେଟିଂ", description: "ସିଷ୍ଟମ୍ ଭାଷା ଚୟନ କରନ୍ତୁ |" },
      "customise-theme": { name: "ଥିମ୍ କଷ୍ଟମାଇଜ୍ କରନ୍ତୁ", description: "ରଙ୍ଗ ଏବଂ ଡାର୍କ ମୋଡ୍ କଷ୍ଟମାଇଜ୍ କରନ୍ତୁ |" },
      "accessibility-setting": { name: "ଆକ୍ସେସିବିଲିଟି", description: "ଉଚ୍ଚ କଣ୍ଟ୍ରାଷ୍ଟ ସଂରଚନା କରନ୍ତୁ |" },
      "layout-setting": { name: "ଲେଆଉଟ୍ ସେଟିଂ", description: "ଡ୍ୟାସବୋର୍ଡ ଲେଆଉଟ୍ ଆଡଜଷ୍ଟ କରନ୍ତୁ |" },
      "notification-setting": { name: "ବିଜ୍ଞପ୍ତି", description: "ଆଲର୍ଟ ପରିଚାଳନା କରନ୍ତୁ |" },
      "animation-setting": { name: "ଆନିମେସନ୍", description: "UI ଗତି ନିୟନ୍ତ୍ରଣ କରନ୍ତୁ |" },
      "zoom-controls": { name: "ଜୁମ୍ ନିୟନ୍ତ୍ରଣ", description: "ଜୁମ୍ ସ୍ତର ସେଟ୍ କରନ୍ତୁ |" },
      "voice-assistant": { name: "ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ", description: "ଭଏସ୍ କମାଣ୍ଡ୍ ସକ୍ଷମ କରନ୍ତୁ |" },
      "user-activity-log": { name: "ବ୍ୟବହାରକାରୀ କାର୍ଯ୍ୟକଳାପ", description: "ଲଗଇନ୍ ସେସନ୍ ଅଡିଟ୍ କରନ୍ତୁ |" },
      "platform-security-setting": { name: "ସୁରକ୍ଷା", description: "ଫାୟାରୱାଲ୍ ସଂରଚନା କରନ୍ତୁ |" },
      "web-camera-setting": { name: "ୱେବ୍ କ୍ୟାମେରା", description: "କ୍ୟାମେରା ପରିଚାଳନା କରନ୍ତୁ |" },
      "2-factor-authentication": { name: "2FA ପ୍ରମାଣୀକରଣ", description: "TOTP ଆପ୍ ସଂରଚନା କରନ୍ତୁ |" }
    },
    layoutSetting: { title: "ଲେଆଉଟ୍ ସେଟିଂସମୂହ", subtitle: "ଆପଣଙ୍କର ଡ୍ୟାସବୋର୍ଡ କଷ୍ଟମାଇଜ୍ କରନ୍ତୁ |", gridColumns: "କଲମ୍", gridColumnsDesc: "କଲମ୍ ସଂଖ୍ୟା ଚୟନ କରନ୍ତୁ", columns: "କଲମ୍", cardOrder: "କାର୍ଡ କ୍ରମ", cardOrderDesc: "ଟାଣନ୍ତୁ ଏବଂ ଛାଡନ୍ତୁ", resetOrder: "ରିସେଟ୍ କରନ୍ତୁ", dragInfo: "ନୂତନ ସ୍ଥାନକୁ ଟାଣନ୍ତୁ |", cardSize: "କାର୍ଡ ଆକାର", cardSizeDesc: "କାର୍ଡ ଆକାର ଚୟନ କରନ୍ତୁ |", preview: "ପୂର୍ବାବଲୋକନ", small: "ଛୋଟ", medium: "ମଧ୍ୟମ", large: "ବଡ", autoFit: "ଅଟୋ-ଫିଟ୍", saveChanges: "ସଞ୍ଚୟ କରନ୍ତୁ", back: "ପଛକୁ" },
    notificationSetting: { title: "ବିଜ୍ଞପ୍ତି ସେଟିଂସମୂହ", subtitle: "ଆପଣ କିପରି ସୂଚିତ ହେବାକୁ ଚାହୁଁଛନ୍ତି ତାହା ନିୟନ୍ତ୍ରଣ କରନ୍ତୁ |", saveChanges: "ସଞ୍ଚୟ କରନ୍ତୁ", back: "ପଛକୁ", behavior: "ଆଚରଣ", behaviorDesc: "ବିଜ୍ଞପ୍ତି କିପରି ଦେଖାଯିବ ନିୟନ୍ତ୍ରଣ କରନ୍ତୁ |", enable: "ସକ୍ଷମ କରନ୍ତୁ", enableDesc: "ବିଜ୍ଞପ୍ତି ଚାଲୁ ବା ବନ୍ଦ କରନ୍ତୁ", desktop: "ଡେସ୍କଟପରେ ଦେଖାନ୍ତୁ", desktopDesc: "ବ୍ରାଉଜର୍ ବିଜ୍ଞପ୍ତି ପ୍ରଦର୍ଶନ କରନ୍ତୁ", position: "ସ୍ଥାନ", positionDesc: "ସ୍ଥାନ ଚୟନ କରନ୍ତୁ" }
  }
};

const resources = Object.fromEntries(
  Object.entries(translations).map(([lng, data]) => [lng, { translation: data }])
);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'nexora_saved_language_v1'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
