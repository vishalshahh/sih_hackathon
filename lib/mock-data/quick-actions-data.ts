// Mock data for quick actions and questions
export interface QuickAction {
  id: string
  category: string
  icon: string
  color: string
  bgColor: string
  questions: {
    en: string[]
    hi: string[]
  }
}

export const quickActionsData: QuickAction[] = [
  {
    id: "drug_info",
    category: "Drug Information",
    icon: "Pill",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    questions: {
      en: [
        "Tell me about aspirin",
        "What is ibuprofen?",
        "Drug information for paracetamol",
        "Check drug interactions for aspirin",
        "Drug safety alerts",
        "Side effects of ibuprofen",
        "Dosage for metformin",
        "Can I take paracetamol with ibuprofen?",
        "What are the side effects of amoxicillin?",
        "Drug interactions checker",
        "Prescription drug information",
        "Over-the-counter medicine safety"
      ],
      hi: [
        "एस्पिरिन के बारे में बताएं",
        "आइबुप्रोफेन क्या है?",
        "पैरासिटामोल की दवा की जानकारी",
        "एस्पिरिन के लिए दवा की बातचीत जांचें",
        "दवा सुरक्षा अलर्ट",
        "आइबुप्रोफेन के दुष्प्रभाव",
        "मेटफॉर्मिन की खुराक",
        "क्या मैं पैरासिटामोल के साथ आइबुप्रोफेन ले सकता हूं?",
        "एमोक्सिसिलिन के दुष्प्रभाव क्या हैं?",
        "दवा बातचीत चेकर",
        "प्रिस्क्रिप्शन दवा जानकारी",
        "ओवर-द-काउंटर दवा सुरक्षा"
      ]
    }
  },
  {
    id: "symptoms",
    category: "Symptoms",
    icon: "Stethoscope",
    color: "text-green-600",
    bgColor: "bg-green-50",
    questions: {
      en: [
        "I have a fever",
        "Chest pain symptoms",
        "Headache and nausea",
        "Shortness of breath",
        "Stomach pain",
        "Feeling dizzy",
        "I have a cough",
        "Back pain symptoms",
        "Joint pain and swelling",
        "Skin rash and itching",
        "Fatigue and weakness",
        "Sleep problems"
      ],
      hi: [
        "मुझे बुखार है",
        "छाती में दर्द के लक्षण",
        "सिरदर्द और मतली",
        "सांस लेने में तकलीफ",
        "पेट में दर्द",
        "चक्कर आना",
        "मुझे खांसी है",
        "पीठ दर्द के लक्षण",
        "जोड़ों में दर्द और सूजन",
        "त्वचा पर चकत्ते और खुजली",
        "थकान और कमजोरी",
        "नींद की समस्या"
      ]
    }
  },
  {
    id: "emergency",
    category: "Emergency",
    icon: "AlertTriangle",
    color: "text-red-600",
    bgColor: "bg-red-50",
    questions: {
      en: [
        "Emergency help",
        "Chest pain emergency",
        "Difficulty breathing",
        "Severe bleeding",
        "Unconscious person",
        "Severe allergic reaction",
        "Stroke symptoms",
        "Heart attack signs",
        "Poisoning emergency",
        "Severe burns",
        "Broken bones",
        "Head injury"
      ],
      hi: [
        "आपातकालीन सहायता",
        "छाती में दर्द आपातकाल",
        "सांस लेने में कठिनाई",
        "गंभीर रक्तस्राव",
        "बेहोश व्यक्ति",
        "गंभीर एलर्जी प्रतिक्रिया",
        "स्ट्रोक के लक्षण",
        "दिल का दौरा पड़ने के संकेत",
        "जहर आपातकाल",
        "गंभीर जलन",
        "हड्डी टूटना",
        "सिर में चोट"
      ]
    }
  },
  {
    id: "health_services",
    category: "Health Services",
    icon: "Calendar",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    questions: {
      en: [
        "Find doctors near me",
        "Book appointment",
        "Vaccination schedule",
        "Health checkup",
        "Mental health support",
        "Find pharmacy nearby",
        "Lab test appointments",
        "Specialist doctor search",
        "Hospital emergency services",
        "Telemedicine consultation",
        "Health insurance help",
        "Medical records access"
      ],
      hi: [
        "मेरे पास डॉक्टर खोजें",
        "अपॉइंटमेंट बुक करें",
        "टीकाकरण कार्यक्रम",
        "स्वास्थ्य जांच",
        "मानसिक स्वास्थ्य सहायता",
        "पास में फार्मेसी खोजें",
        "लैब टेस्ट अपॉइंटमेंट",
        "विशेषज्ञ डॉक्टर खोज",
        "अस्पताल आपातकालीन सेवाएं",
        "टेलीमेडिसिन परामर्श",
        "स्वास्थ्य बीमा सहायता",
        "चिकित्सा रिकॉर्ड एक्सेस"
      ]
    }
  }
]

export const popularSearches = {
  en: [
    "Aspirin information",
    "Ibuprofen side effects",
    "Paracetamol dosage",
    "Drug interactions check",
    "Medicine safety alerts",
    "Prescription drug info",
    "COVID-19 symptoms",
    "Vaccination schedule",
    "Blood pressure medication",
    "Diabetes management",
    "Heart disease prevention",
    "Mental health resources"
  ],
  hi: [
    "एस्पिरिन जानकारी",
    "आइबुप्रोफेन दुष्प्रभाव",
    "पैरासिटामोल खुराक",
    "दवा बातचीत जांच",
    "दवा सुरक्षा अलर्ट",
    "प्रिस्क्रिप्शन दवा जानकारी",
    "कोविड-19 लक्षण",
    "टीकाकरण कार्यक्रम",
    "ब्लड प्रेशर दवा",
    "मधुमेह प्रबंधन",
    "हृदय रोग निवारण",
    "मानसिक स्वास्थ्य संसाधन"
  ]
}

export const emergencyContacts = {
  en: {
    title: "Emergency Contacts",
    contacts: [
      { name: "Medical Emergency", number: "108", description: "Ambulance & Emergency Services" },
      { name: "Police", number: "100", description: "Police Emergency" },
      { name: "Fire", number: "101", description: "Fire Emergency" },
      { name: "Women Helpline", number: "1091", description: "Women Safety" },
      { name: "Child Helpline", number: "1098", description: "Child Protection" }
    ]
  },
  hi: {
    title: "आपातकालीन संपर्क",
    contacts: [
      { name: "चिकित्सा आपातकाल", number: "108", description: "एम्बुलेंस और आपातकालीन सेवाएं" },
      { name: "पुलिस", number: "100", description: "पुलिस आपातकाल" },
      { name: "अग्निशामक", number: "101", description: "आग आपातकाल" },
      { name: "महिला हेल्पलाइन", number: "1091", description: "महिला सुरक्षा" },
      { name: "बाल हेल्पलाइन", number: "1098", description: "बाल संरक्षण" }
    ]
  }
}

export const healthTips = {
  en: [
    "Drink 8 glasses of water daily",
    "Get 7-8 hours of sleep",
    "Exercise for 30 minutes daily",
    "Eat 5 servings of fruits and vegetables",
    "Wash hands frequently",
    "Avoid smoking and excessive alcohol",
    "Manage stress through meditation",
    "Get regular health checkups",
    "Maintain a healthy weight",
    "Practice good hygiene"
  ],
  hi: [
    "रोजाना 8 गिलास पानी पिएं",
    "7-8 घंटे की नींद लें",
    "रोजाना 30 मिनट व्यायाम करें",
    "5 सर्विंग फल और सब्जियां खाएं",
    "बार-बार हाथ धोएं",
    "धूम्रपान और अत्यधिक शराब से बचें",
    "ध्यान के माध्यम से तनाव प्रबंधन करें",
    "नियमित स्वास्थ्य जांच कराएं",
    "स्वस्थ वजन बनाए रखें",
    "अच्छी स्वच्छता का अभ्यास करें"
  ]
} 