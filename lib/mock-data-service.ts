// Centralized mock data service
import { 
  DrugInfo, 
  SymptomInfo, 
  VaccinationInfo, 
  ProviderInfo, 
  OutbreakInfo, 
  ConversationData, 
  AnalyticsData, 
  EmergencyAlert, 
  IntentData, 
  APIMonitorData, 
  ContentData, 
  MessagingData 
} from './mock-data/types'

import { mockDrugs, mockDrugRecalls, mockDrugInteractions } from './mock-data/drug-data'
import { mockSymptoms, mockSymptomAssessments } from './mock-data/symptom-data'
import { mockVaccinations, mockVaccinationSchedules } from './mock-data/vaccination-data'
import { mockProviders, mockSpecialties } from './mock-data/provider-data'
import { mockOutbreaks, mockPreventionMeasures } from './mock-data/outbreak-data'
import { mockConversations, mockMessages } from './mock-data/conversation-data'
import { mockAnalytics } from './mock-data/analytics-data'
import { mockEmergencyAlerts } from './mock-data/emergency-alerts-data'
import { mockIntents } from './mock-data/intent-data'
import { mockAPIMonitors } from './mock-data/api-monitor-data'
import { mockContent } from './mock-data/content-data'
import { mockMessagingData } from './mock-data/messaging-data'

export class MockDataService {
  // Drug Information
  static getDrugData(): DrugInfo[] {
    return mockDrugs
  }

  static getDrugByName(name: string): DrugInfo | undefined {
    return mockDrugs.find(drug => 
      drug.name.toLowerCase().includes(name.toLowerCase()) ||
      drug.genericName.toLowerCase().includes(name.toLowerCase())
    )
  }

  static getDrugRecalls(): any[] {
    return mockDrugRecalls
  }

  static getDrugInteractions(): any[] {
    return mockDrugInteractions
  }

  static getDrugInteractionsForDrug(drugName: string): any[] {
    return mockDrugInteractions.filter(interaction => 
      interaction.drug1.toLowerCase().includes(drugName.toLowerCase()) ||
      interaction.drug2.toLowerCase().includes(drugName.toLowerCase())
    )
  }

  // Symptom Information
  static getSymptomData(): SymptomInfo[] {
    return mockSymptoms
  }

  static getSymptomByName(name: string): SymptomInfo | undefined {
    return mockSymptoms.find(symptom => 
      symptom.name.toLowerCase().includes(name.toLowerCase())
    )
  }

  static getSymptomAssessments(): any[] {
    return mockSymptomAssessments
  }

  static getSymptomAssessmentBySymptoms(symptoms: string[]): any | undefined {
    return mockSymptomAssessments.find(assessment => 
      symptoms.some(symptom => 
        assessment.symptoms.some(assessSymptom => 
          assessSymptom.toLowerCase().includes(symptom.toLowerCase())
        )
      )
    )
  }

  // Vaccination Information
  static getVaccinationData(): VaccinationInfo[] {
    return mockVaccinations
  }

  static getVaccinationByName(name: string): VaccinationInfo | undefined {
    return mockVaccinations.find(vaccination => 
      vaccination.name.toLowerCase().includes(name.toLowerCase())
    )
  }

  static getVaccinationSchedules(): any[] {
    return mockVaccinationSchedules
  }

  static getVaccinationScheduleByAge(age: string): any | undefined {
    return mockVaccinationSchedules.find(schedule => 
      schedule.age.toLowerCase().includes(age.toLowerCase())
    )
  }

  // Healthcare Providers
  static getProviderData(): ProviderInfo[] {
    return mockProviders
  }

  static getProvidersByLocation(location: string): ProviderInfo[] {
    return mockProviders.filter(provider => 
      provider.address.toLowerCase().includes(location.toLowerCase())
    )
  }

  static getProvidersByType(type: string): ProviderInfo[] {
    return mockProviders.filter(provider => 
      provider.type.toLowerCase().includes(type.toLowerCase())
    )
  }

  static getProvidersBySpecialty(specialty: string): ProviderInfo[] {
    return mockProviders.filter(provider => 
      provider.specialty.toLowerCase().includes(specialty.toLowerCase())
    )
  }

  static getSpecialties(): string[] {
    return mockSpecialties
  }

  // Outbreak Information
  static getOutbreakData(): OutbreakInfo[] {
    return mockOutbreaks
  }

  static getOutbreaksByLocation(location: string): OutbreakInfo[] {
    return mockOutbreaks.filter(outbreak => 
      outbreak.location.toLowerCase().includes(location.toLowerCase())
    )
  }

  static getOutbreaksByDisease(disease: string): OutbreakInfo[] {
    return mockOutbreaks.filter(outbreak => 
      outbreak.disease.toLowerCase().includes(disease.toLowerCase())
    )
  }

  static getPreventionMeasures(): string[] {
    return mockPreventionMeasures
  }

  // Conversation Data
  static getConversationData(): ConversationData[] {
    return mockConversations
  }

  static getConversationById(id: string): ConversationData | undefined {
    return mockConversations.find(conversation => conversation.id === id)
  }

  static getConversationsByUser(userId: string): ConversationData[] {
    return mockConversations.filter(conversation => conversation.userId === userId)
  }

  static getConversationsByChannel(channel: string): ConversationData[] {
    return mockConversations.filter(conversation => conversation.channel === channel)
  }

  static getConversationsByLanguage(language: string): ConversationData[] {
    return mockConversations.filter(conversation => conversation.language === language)
  }

  static getConversationsByIntent(intent: string): ConversationData[] {
    return mockConversations.filter(conversation => conversation.intent === intent)
  }

  static getConversationsByStatus(status: string): ConversationData[] {
    return mockConversations.filter(conversation => conversation.status === status)
  }

  static getMessageData(): any[] {
    return mockMessages
  }

  // Analytics Data
  static getAnalyticsData(): AnalyticsData {
    return mockAnalytics
  }

  static getTopIntents(): Array<{ intent: string; count: number }> {
    return mockAnalytics.topIntents
  }

  static getChannelDistribution(): Array<{ channel: string; count: number }> {
    return mockAnalytics.channelDistribution
  }

  static getLanguageDistribution(): Array<{ language: string; count: number }> {
    return mockAnalytics.languageDistribution
  }

  static getDailyStats(): Array<{ date: string; conversations: number; messages: number }> {
    return mockAnalytics.dailyStats
  }

  // Emergency Alerts
  static getEmergencyAlertData(): EmergencyAlert[] {
    return mockEmergencyAlerts
  }

  static getEmergencyAlertsByLocation(location: string): EmergencyAlert[] {
    return mockEmergencyAlerts.filter(alert => 
      alert.location.toLowerCase().includes(location.toLowerCase())
    )
  }

  static getEmergencyAlertsBySeverity(severity: string): EmergencyAlert[] {
    return mockEmergencyAlerts.filter(alert => alert.severity === severity)
  }

  static getActiveEmergencyAlerts(): EmergencyAlert[] {
    return mockEmergencyAlerts.filter(alert => alert.status === 'active')
  }

  // Intent Management
  static getIntentData(): IntentData[] {
    return mockIntents
  }

  static getIntentById(id: string): IntentData | undefined {
    return mockIntents.find(intent => intent.id === id)
  }

  static getIntentsByCategory(category: string): IntentData[] {
    return mockIntents.filter(intent => intent.category === category)
  }

  static getIntentsByLanguage(language: string): IntentData[] {
    return mockIntents.filter(intent => intent.language === language)
  }

  static getActiveIntents(): IntentData[] {
    return mockIntents.filter(intent => intent.active)
  }

  // API Monitoring
  static getAPIMonitorData(): APIMonitorData[] {
    return mockAPIMonitors
  }

  static getAPIMonitorByEndpoint(endpoint: string): APIMonitorData | undefined {
    return mockAPIMonitors.find(monitor => monitor.endpoint === endpoint)
  }

  static getHealthyAPIs(): APIMonitorData[] {
    return mockAPIMonitors.filter(monitor => monitor.status === 'healthy')
  }

  static getDegradedAPIs(): APIMonitorData[] {
    return mockAPIMonitors.filter(monitor => monitor.status === 'degraded')
  }

  static getDownAPIs(): APIMonitorData[] {
    return mockAPIMonitors.filter(monitor => monitor.status === 'down')
  }

  // Content Management
  static getContentData(): ContentData[] {
    return mockContent
  }

  static getContentById(id: string): ContentData | undefined {
    return mockContent.find(content => content.id === id)
  }

  static getContentByType(type: string): ContentData[] {
    return mockContent.filter(content => content.type === type)
  }

  static getContentByLanguage(language: string): ContentData[] {
    return mockContent.filter(content => content.language === language)
  }

  static getContentByCategory(category: string): ContentData[] {
    return mockContent.filter(content => content.category === category)
  }

  static getPublishedContent(): ContentData[] {
    return mockContent.filter(content => content.status === 'published')
  }

  // Messaging Integration
  static getMessagingData(): MessagingData[] {
    return mockMessagingData
  }

  static getMessagingByChannel(channel: string): MessagingData | undefined {
    return mockMessagingData.find(messaging => messaging.channel === channel)
  }

  static getActiveMessagingChannels(): MessagingData[] {
    return mockMessagingData.filter(messaging => messaging.status === 'active')
  }

  static getInactiveMessagingChannels(): MessagingData[] {
    return mockMessagingData.filter(messaging => messaging.status === 'inactive')
  }

  // Data Generators for Dynamic Content
  static generateRandomConversation(): ConversationData {
    const channels = ['whatsapp', 'sms', 'web'] as const
    const languages = ['en', 'hi', 'es', 'ar']
    const intents = ['symptoms_fever', 'drug_info', 'vaccination', 'emergency', 'appointment']
    const statuses = ['active', 'resolved', 'cancelled', 'escalated'] as const

    const randomChannel = channels[Math.floor(Math.random() * channels.length)]
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)]
    const randomIntent = intents[Math.floor(Math.random() * intents.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: `user_${Math.random().toString(36).substr(2, 9)}`,
      channel: randomChannel,
      language: randomLanguage,
      messages: [],
      intent: randomIntent,
      status: randomStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      duration: Math.floor(Math.random() * 1800), // 0-30 minutes
      satisfaction: Math.random() * 2 + 3 // 3-5 rating
    }
  }

  static generateRandomEmergencyAlert(): EmergencyAlert {
    const severities = ['low', 'medium', 'high', 'critical'] as const
    const statuses = ['active', 'resolved', 'cancelled'] as const
    const locations = ['New York, NY', 'Los Angeles, CA', 'Houston, TX', 'Chicago, IL', 'Phoenix, AZ']

    const randomSeverity = severities[Math.floor(Math.random() * severities.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    const randomLocation = locations[Math.floor(Math.random() * locations.length)]

    return {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: `Emergency Alert - ${randomSeverity.toUpperCase()}`,
      message: `This is a ${randomSeverity} priority alert for ${randomLocation}. Please take appropriate action.`,
      severity: randomSeverity,
      location: randomLocation,
      timestamp: new Date().toISOString(),
      status: randomStatus,
      affectedAreas: [randomLocation.split(',')[0]], // Just the city
      recommendations: [
        'Stay informed',
        'Follow local authorities',
        'Have emergency supplies ready'
      ]
    }
  }

  // Data Validation
  static validateDrugData(drug: Partial<DrugInfo>): boolean {
    return !!(drug.name && drug.genericName && drug.description)
  }

  static validateSymptomData(symptom: Partial<SymptomInfo>): boolean {
    return !!(symptom.name && symptom.description && symptom.severity)
  }

  static validateProviderData(provider: Partial<ProviderInfo>): boolean {
    return !!(provider.name && provider.type && provider.address && provider.phone)
  }

  // Data Persistence Simulation
  static saveConversation(conversation: ConversationData): boolean {
    // In a real app, this would save to a database
    // For now, we'll just simulate success
    console.log('Saving conversation:', conversation.id)
    return true
  }

  static updateConversation(id: string, updates: Partial<ConversationData>): boolean {
    // In a real app, this would update the database
    console.log('Updating conversation:', id, updates)
    return true
  }

  static deleteConversation(id: string): boolean {
    // In a real app, this would delete from the database
    console.log('Deleting conversation:', id)
    return true
  }
} 