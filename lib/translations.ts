export interface Translation {
  [key: string]: string | Translation
}

export const translations: Record<string, Translation> = {
  en: {
    // UI Elements
    ui: {
      title: "Healthcare Assistant Chatbot",
      subtitle: "Get instant medical guidance, vaccination schedules, and health information in multiple languages",
      placeholder: "Ask about symptoms, medications, appointments...",
      quickActions: "Quick Actions",
      emergencyContacts: "Emergency Contacts",
      adminDashboard: "Admin Dashboard",
      multiLanguageSupport: "Multi-language Support",
      whatsappSmsReady: "WhatsApp & SMS Ready",
    },
    // Quick Actions
    quickActions: {
      checkSymptoms: "Check Symptoms",
      checkSymptomsDesc: "Describe your symptoms",
      medicationInfo: "Medication Info",
      medicationInfoDesc: "Ask about medicines",
      vaccinationSchedule: "Vaccination Schedule",
      vaccinationScheduleDesc: "Check vaccine dates",
      emergencyHelp: "Emergency Help",
      emergencyHelpDesc: "Get emergency contacts",
      findHealthcare: "Find Healthcare",
      findHealthcareDesc: "Locate nearby clinics",
      healthTips: "Health Tips",
      healthTipsDesc: "General wellness advice",
    },
    // Healthcare Responses
    responses: {
      greeting:
        "Hello! I'm your healthcare assistant. I can help you with symptoms, vaccination schedules, health information, and connect you with emergency services. How can I assist you today?",
      emergency:
        "🚨 MEDICAL EMERGENCY DETECTED 🚨\n\nIf this is a life-threatening emergency, call emergency services immediately:\n• India: 108\n• USA: 911\n• UK: 999\n• International: 112\n\nFor immediate assistance, go to the nearest emergency room.",
      fever:
        "I understand you're experiencing fever. Fever is often a sign that your body is fighting an infection. Here's what you should know:\n\n• Normal body temperature: 98.6°F (37°C)\n• Low-grade fever: 100.4°F (38°C)\n• High fever: Above 103°F (39.4°C)\n\nFor fever management:\n• Stay hydrated\n• Rest\n• Use fever reducers like acetaminophen or ibuprofen as directed",
      pain: "I understand you're experiencing pain. Pain can have many causes, and proper evaluation is important for effective treatment.",
      vaccination:
        "I can help you with vaccination information. Vaccines are crucial for preventing serious diseases and protecting public health.",
      medication:
        "I can provide general information about medications. However, always consult your healthcare provider or pharmacist for specific medical advice about medications.",
      mentalHealth:
        "Mental health is just as important as physical health. I'm here to provide support and information, but please remember that professional help is available when you need it.",
      general:
        "I'm here to help with your healthcare questions. I can assist with symptoms, medications, vaccinations, finding healthcare providers, and general health information. What would you like to know about?",
    },
  },
  hi: {
    // UI Elements
    ui: {
      title: "स्वास्थ्य सहायक चैटबॉट",
      subtitle: "तुरंत चिकित्सा मार्गदर्शन, टीकाकरण कार्यक्रम, और कई भाषाओं में स्वास्थ्य जानकारी प्राप्त करें",
      placeholder: "लक्षण, दवाइयां, अपॉइंटमेंट के बारे में पूछें...",
      quickActions: "त्वरित कार्य",
      emergencyContacts: "आपातकालीन संपर्क",
      adminDashboard: "एडमिन डैशबोर्ड",
      multiLanguageSupport: "बहु-भाषा समर्थन",
      whatsappSmsReady: "व्हाट्सऐप और एसएमएस तैयार",
    },
    quickActions: {
      checkSymptoms: "लक्षण जांचें",
      checkSymptomsDesc: "अपने लक्षणों का वर्णन करें",
      medicationInfo: "दवा की जानकारी",
      medicationInfoDesc: "दवाओं के बारे में पूछें",
      vaccinationSchedule: "टीकाकरण कार्यक्रम",
      vaccinationScheduleDesc: "वैक्सीन की तारीखें जांचें",
      emergencyHelp: "आपातकालीन सहायता",
      emergencyHelpDesc: "आपातकालीन संपर्क प्राप्त करें",
      findHealthcare: "स्वास्थ्य सेवा खोजें",
      findHealthcareDesc: "नजदीकी क्लिनिक खोजें",
      healthTips: "स्वास्थ्य सुझाव",
      healthTipsDesc: "सामान्य कल्याण सलाह",
    },
    responses: {
      greeting:
        "नमस्ते! मैं आपका स्वास्थ्य सहायक हूं। मैं लक्षणों, टीकाकरण कार्यक्रम, स्वास्थ्य जानकारी और आपातकालीन सेवाओं से जुड़ने में आपकी सहायता कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
      emergency:
        "🚨 चिकित्सा आपातकाल का पता चला 🚨\n\nयदि यह जीवन-घातक आपातकाल है, तो तुरंत आपातकालीन सेवाओं को कॉल करें:\n• भारत: 108\n• यूएसए: 911\n• यूके: 999\n• अंतर्राष्ट्रीय: 112\n\nतत्काल सहायता के लिए, निकटतम आपातकालीन कक्ष में जाएं।",
      fever: "मैं समझता हूं कि आपको बुखार है। बुखार अक्सर इस बात का संकेत है कि आपका शरीर संक्रमण से लड़ रहा है।",
      pain: "मैं समझता हूं कि आपको दर्द हो रहा है। दर्द के कई कारण हो सकते हैं, और प्रभावी उपचार के लिए उचित मूल्यांकन महत्वपूर्ण है।",
      vaccination:
        "मैं टीकाकरण की जानकारी में आपकी सहायता कर सकता हूं। गंभीर बीमारियों को रोकने और सार्वजनिक स्वास्थ्य की रक्षा के लिए टीके महत्वपूर्ण हैं।",
      medication:
        "मैं दवाओं के बारे में सामान्य जानकारी प्रदान कर सकता हूं। हालांकि, दवाओं के बारे में विशिष्ट चिकित्सा सलाह के लिए हमेशा अपने स्वास्थ्य सेवा प्रदाता या फार्मासिस्ट से सलाह लें।",
      mentalHealth: "मानसिक स्वास्थ्य शारीरिक स्वास्थ्य जितना ही महत्वपूर्ण है। मैं समर्थन और जानकारी प्रदान करने के लिए यहां हूं।",
      general:
        "मैं आपके स्वास्थ्य प्रश्नों में सहायता के लिए यहां हूं। मैं लक्षण, दवाएं, टीकाकरण, स्वास्थ्य सेवा प्रदाताओं को खोजने और सामान्य स्वास्थ्य जानकारी में सहायता कर सकता हूं।",
    },
  },
  es: {
    ui: {
      title: "Chatbot Asistente de Salud",
      subtitle:
        "Obtenga orientación médica instantánea, horarios de vacunación e información de salud en múltiples idiomas",
      placeholder: "Pregunte sobre síntomas, medicamentos, citas...",
      quickActions: "Acciones Rápidas",
      emergencyContacts: "Contactos de Emergencia",
      adminDashboard: "Panel de Administración",
      multiLanguageSupport: "Soporte Multi-idioma",
      whatsappSmsReady: "WhatsApp y SMS Listos",
    },
    quickActions: {
      checkSymptoms: "Verificar Síntomas",
      checkSymptomsDesc: "Describe tus síntomas",
      medicationInfo: "Info de Medicamentos",
      medicationInfoDesc: "Pregunta sobre medicinas",
      vaccinationSchedule: "Horario de Vacunación",
      vaccinationScheduleDesc: "Verifica fechas de vacunas",
      emergencyHelp: "Ayuda de Emergencia",
      emergencyHelpDesc: "Obtén contactos de emergencia",
      findHealthcare: "Encontrar Atención Médica",
      findHealthcareDesc: "Localiza clínicas cercanas",
      healthTips: "Consejos de Salud",
      healthTipsDesc: "Consejos generales de bienestar",
    },
    responses: {
      greeting:
        "¡Hola! Soy tu asistente de salud. Puedo ayudarte con síntomas, horarios de vacunación, información de salud y conectarte con servicios de emergencia. ¿Cómo puedo asistirte hoy?",
      emergency:
        "🚨 EMERGENCIA MÉDICA DETECTADA 🚨\n\nSi esta es una emergencia que amenaza la vida, llama a los servicios de emergencia inmediatamente:\n• España: 112\n• México: 911\n• Argentina: 107\n• Internacional: 112\n\nPara asistencia inmediata, ve a la sala de emergencias más cercana.",
      fever:
        "Entiendo que tienes fiebre. La fiebre es a menudo una señal de que tu cuerpo está luchando contra una infección.",
      pain: "Entiendo que estás experimentando dolor. El dolor puede tener muchas causas, y una evaluación adecuada es importante para un tratamiento efectivo.",
      vaccination:
        "Puedo ayudarte con información sobre vacunación. Las vacunas son cruciales para prevenir enfermedades graves y proteger la salud pública.",
      medication:
        "Puedo proporcionar información general sobre medicamentos. Sin embargo, siempre consulta a tu proveedor de atención médica o farmacéutico para consejos médicos específicos sobre medicamentos.",
      mentalHealth:
        "La salud mental es tan importante como la salud física. Estoy aquí para brindar apoyo e información.",
      general:
        "Estoy aquí para ayudar con tus preguntas de salud. Puedo asistir con síntomas, medicamentos, vacunaciones, encontrar proveedores de atención médica e información general de salud.",
    },
  },
  ar: {
    ui: {
      title: "روبوت المساعد الصحي",
      subtitle: "احصل على إرشادات طبية فورية وجداول التطعيم ومعلومات صحية بلغات متعددة",
      placeholder: "اسأل عن الأعراض والأدوية والمواعيد...",
      quickActions: "الإجراءات السريعة",
      emergencyContacts: "جهات الاتصال الطارئة",
      adminDashboard: "لوحة الإدارة",
      multiLanguageSupport: "دعم متعدد اللغات",
      whatsappSmsReady: "واتساب ورسائل نصية جاهزة",
    },
    quickActions: {
      checkSymptoms: "فحص الأعراض",
      checkSymptomsDesc: "صف أعراضك",
      medicationInfo: "معلومات الدواء",
      medicationInfoDesc: "اسأل عن الأدوية",
      vaccinationSchedule: "جدول التطعيم",
      vaccinationScheduleDesc: "تحقق من مواعيد اللقاحات",
      emergencyHelp: "مساعدة طارئة",
      emergencyHelpDesc: "احصل على جهات اتصال الطوارئ",
      findHealthcare: "العثور على الرعاية الصحية",
      findHealthcareDesc: "حدد موقع العيادات القريبة",
      healthTips: "نصائح صحية",
      healthTipsDesc: "نصائح عامة للعافية",
    },
    responses: {
      greeting:
        "مرحباً! أنا مساعدك الصحي. يمكنني مساعدتك في الأعراض وجداول التطعيم والمعلومات الصحية وربطك بخدمات الطوارئ. كيف يمكنني مساعدتك اليوم؟",
      emergency:
        "🚨 تم اكتشاف حالة طوارئ طبية 🚨\n\nإذا كانت هذه حالة طوارئ تهدد الحياة، اتصل بخدمات الطوارئ فوراً:\n• السعودية: 997\n• الإمارات: 999\n• مصر: 123\n• دولي: 112\n\nللمساعدة الفورية، اذهب إلى أقرب غرفة طوارئ.",
      fever: "أفهم أنك تعاني من الحمى. الحمى غالباً ما تكون علامة على أن جسمك يحارب العدوى.",
      pain: "أفهم أنك تعاني من الألم. يمكن أن يكون للألم أسباب عديدة، والتقييم المناسب مهم للعلاج الفعال.",
      vaccination: "يمكنني مساعدتك في معلومات التطعيم. اللقاحات ضرورية لمنع الأمراض الخطيرة وحماية الصحة العامة.",
      medication:
        "يمكنني تقديم معلومات عامة عن الأدوية. ومع ذلك، استشر دائماً مقدم الرعاية الصحية أو الصيدلي للحصول على نصائح طبية محددة حول الأدوية.",
      mentalHealth: "الصحة النفسية مهمة بقدر أهمية الصحة الجسدية. أنا هنا لتقديم الدعم والمعلومات.",
      general:
        "أنا هنا لمساعدتك في أسئلتك الصحية. يمكنني المساعدة في الأعراض والأدوية والتطعيمات والعثور على مقدمي الرعاية الصحية والمعلومات الصحية العامة.",
    },
  },
}

export function getTranslation(language: string, key: string): string {
  const keys = key.split(".")
  let current: any = translations[language] || translations.en

  for (const k of keys) {
    current = current[k]
    if (!current) {
      // Fallback to English if translation not found
      current = translations.en
      for (const fallbackKey of keys) {
        current = current[fallbackKey]
        if (!current) return key // Return key if even English translation is missing
      }
      break
    }
  }

  return typeof current === "string" ? current : key
}

export function isRTL(language: string): boolean {
  return ["ar", "he", "fa", "ur"].includes(language)
}
