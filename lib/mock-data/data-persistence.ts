// Data persistence simulation
import { 
  DrugInfo, 
  SymptomInfo, 
  VaccinationInfo, 
  ProviderInfo, 
  ConversationData, 
  EmergencyAlert, 
  IntentData 
} from './types'

export class DataPersistence {
  private static storage = new Map<string, any>()
  private static idCounters = new Map<string, number>()
  
  // Initialize counters
  private static initializeCounters(): void {
    if (!this.idCounters.has('drug')) this.idCounters.set('drug', 1)
    if (!this.idCounters.has('symptom')) this.idCounters.set('symptom', 1)
    if (!this.idCounters.has('vaccination')) this.idCounters.set('vaccination', 1)
    if (!this.idCounters.has('provider')) this.idCounters.set('provider', 1)
    if (!this.idCounters.has('conversation')) this.idCounters.set('conversation', 1)
    if (!this.idCounters.has('alert')) this.idCounters.set('alert', 1)
    if (!this.idCounters.has('intent')) this.idCounters.set('intent', 1)
  }
  
  // Generate unique ID
  private static generateId(type: string): string {
    this.initializeCounters()
    const counter = this.idCounters.get(type) || 1
    this.idCounters.set(type, counter + 1)
    return `${type}_${counter.toString().padStart(6, '0')}`
  }
  
  // Save drug
  static saveDrug(drug: Omit<DrugInfo, 'name'> & { name?: string }): DrugInfo {
    this.initializeCounters()
    const id = this.generateId('drug')
    const drugWithId: DrugInfo = {
      ...drug,
      name: drug.name || `Drug ${id}`
    }
    
    this.storage.set(`drug_${id}`, drugWithId)
    console.log(`Saved drug: ${id}`)
    return drugWithId
  }
  
  // Get drug by ID
  static getDrug(id: string): DrugInfo | null {
    return this.storage.get(`drug_${id}`) || null
  }
  
  // Get all drugs
  static getAllDrugs(): DrugInfo[] {
    const drugs: DrugInfo[] = []
    for (const [key, value] of this.storage.entries()) {
      if (key.startsWith('drug_')) {
        drugs.push(value)
      }
    }
    return drugs
  }
  
  // Update drug
  static updateDrug(id: string, updates: Partial<DrugInfo>): DrugInfo | null {
    const existing = this.getDrug(id)
    if (!existing) return null
    
    const updated = { ...existing, ...updates }
    this.storage.set(`drug_${id}`, updated)
    console.log(`Updated drug: ${id}`)
    return updated
  }
  
  // Delete drug
  static deleteDrug(id: string): boolean {
    const exists = this.storage.has(`drug_${id}`)
    if (exists) {
      this.storage.delete(`drug_${id}`)
      console.log(`Deleted drug: ${id}`)
    }
    return exists
  }
  
  // Save symptom
  static saveSymptom(symptom: Omit<SymptomInfo, 'name'> & { name?: string }): SymptomInfo {
    this.initializeCounters()
    const id = this.generateId('symptom')
    const symptomWithId: SymptomInfo = {
      ...symptom,
      name: symptom.name || `Symptom ${id}`
    }
    
    this.storage.set(`symptom_${id}`, symptomWithId)
    console.log(`Saved symptom: ${id}`)
    return symptomWithId
  }
  
  // Get symptom by ID
  static getSymptom(id: string): SymptomInfo | null {
    return this.storage.get(`symptom_${id}`) || null
  }
  
  // Get all symptoms
  static getAllSymptoms(): SymptomInfo[] {
    const symptoms: SymptomInfo[] = []
    for (const [key, value] of this.storage.entries()) {
      if (key.startsWith('symptom_')) {
        symptoms.push(value)
      }
    }
    return symptoms
  }
  
  // Update symptom
  static updateSymptom(id: string, updates: Partial<SymptomInfo>): SymptomInfo | null {
    const existing = this.getSymptom(id)
    if (!existing) return null
    
    const updated = { ...existing, ...updates }
    this.storage.set(`symptom_${id}`, updated)
    console.log(`Updated symptom: ${id}`)
    return updated
  }
  
  // Delete symptom
  static deleteSymptom(id: string): boolean {
    const exists = this.storage.has(`symptom_${id}`)
    if (exists) {
      this.storage.delete(`symptom_${id}`)
      console.log(`Deleted symptom: ${id}`)
    }
    return exists
  }
  
  // Save conversation
  static saveConversation(conversation: Omit<ConversationData, 'id'>): ConversationData {
    this.initializeCounters()
    const id = this.generateId('conversation')
    const conversationWithId: ConversationData = {
      ...conversation,
      id
    }
    
    this.storage.set(`conversation_${id}`, conversationWithId)
    console.log(`Saved conversation: ${id}`)
    return conversationWithId
  }
  
  // Get conversation by ID
  static getConversation(id: string): ConversationData | null {
    return this.storage.get(`conversation_${id}`) || null
  }
  
  // Get all conversations
  static getAllConversations(): ConversationData[] {
    const conversations: ConversationData[] = []
    for (const [key, value] of this.storage.entries()) {
      if (key.startsWith('conversation_')) {
        conversations.push(value)
      }
    }
    return conversations
  }
  
  // Get conversations by user
  static getConversationsByUser(userId: string): ConversationData[] {
    return this.getAllConversations().filter(conv => conv.userId === userId)
  }
  
  // Get conversations by channel
  static getConversationsByChannel(channel: string): ConversationData[] {
    return this.getAllConversations().filter(conv => conv.channel === channel)
  }
  
  // Get conversations by language
  static getConversationsByLanguage(language: string): ConversationData[] {
    return this.getAllConversations().filter(conv => conv.language === language)
  }
  
  // Get conversations by intent
  static getConversationsByIntent(intent: string): ConversationData[] {
    return this.getAllConversations().filter(conv => conv.intent === intent)
  }
  
  // Get conversations by status
  static getConversationsByStatus(status: string): ConversationData[] {
    return this.getAllConversations().filter(conv => conv.status === status)
  }
  
  // Update conversation
  static updateConversation(id: string, updates: Partial<ConversationData>): ConversationData | null {
    const existing = this.getConversation(id)
    if (!existing) return null
    
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() }
    this.storage.set(`conversation_${id}`, updated)
    console.log(`Updated conversation: ${id}`)
    return updated
  }
  
  // Delete conversation
  static deleteConversation(id: string): boolean {
    const exists = this.storage.has(`conversation_${id}`)
    if (exists) {
      this.storage.delete(`conversation_${id}`)
      console.log(`Deleted conversation: ${id}`)
    }
    return exists
  }
  
  // Save emergency alert
  static saveEmergencyAlert(alert: Omit<EmergencyAlert, 'id'>): EmergencyAlert {
    this.initializeCounters()
    const id = this.generateId('alert')
    const alertWithId: EmergencyAlert = {
      ...alert,
      id
    }
    
    this.storage.set(`alert_${id}`, alertWithId)
    console.log(`Saved emergency alert: ${id}`)
    return alertWithId
  }
  
  // Get emergency alert by ID
  static getEmergencyAlert(id: string): EmergencyAlert | null {
    return this.storage.get(`alert_${id}`) || null
  }
  
  // Get all emergency alerts
  static getAllEmergencyAlerts(): EmergencyAlert[] {
    const alerts: EmergencyAlert[] = []
    for (const [key, value] of this.storage.entries()) {
      if (key.startsWith('alert_')) {
        alerts.push(value)
      }
    }
    return alerts
  }
  
  // Get emergency alerts by location
  static getEmergencyAlertsByLocation(location: string): EmergencyAlert[] {
    return this.getAllEmergencyAlerts().filter(alert => 
      alert.location.toLowerCase().includes(location.toLowerCase())
    )
  }
  
  // Get emergency alerts by severity
  static getEmergencyAlertsBySeverity(severity: string): EmergencyAlert[] {
    return this.getAllEmergencyAlerts().filter(alert => alert.severity === severity)
  }
  
  // Get active emergency alerts
  static getActiveEmergencyAlerts(): EmergencyAlert[] {
    return this.getAllEmergencyAlerts().filter(alert => alert.status === 'active')
  }
  
  // Update emergency alert
  static updateEmergencyAlert(id: string, updates: Partial<EmergencyAlert>): EmergencyAlert | null {
    const existing = this.getEmergencyAlert(id)
    if (!existing) return null
    
    const updated = { ...existing, ...updates }
    this.storage.set(`alert_${id}`, updated)
    console.log(`Updated emergency alert: ${id}`)
    return updated
  }
  
  // Delete emergency alert
  static deleteEmergencyAlert(id: string): boolean {
    const exists = this.storage.has(`alert_${id}`)
    if (exists) {
      this.storage.delete(`alert_${id}`)
      console.log(`Deleted emergency alert: ${id}`)
    }
    return exists
  }
  
  // Save intent
  static saveIntent(intent: Omit<IntentData, 'id'>): IntentData {
    this.initializeCounters()
    const id = this.generateId('intent')
    const intentWithId: IntentData = {
      ...intent,
      id
    }
    
    this.storage.set(`intent_${id}`, intentWithId)
    console.log(`Saved intent: ${id}`)
    return intentWithId
  }
  
  // Get intent by ID
  static getIntent(id: string): IntentData | null {
    return this.storage.get(`intent_${id}`) || null
  }
  
  // Get all intents
  static getAllIntents(): IntentData[] {
    const intents: IntentData[] = []
    for (const [key, value] of this.storage.entries()) {
      if (key.startsWith('intent_')) {
        intents.push(value)
      }
    }
    return intents
  }
  
  // Get intents by category
  static getIntentsByCategory(category: string): IntentData[] {
    return this.getAllIntents().filter(intent => intent.category === category)
  }
  
  // Get intents by language
  static getIntentsByLanguage(language: string): IntentData[] {
    return this.getAllIntents().filter(intent => intent.language === language)
  }
  
  // Get active intents
  static getActiveIntents(): IntentData[] {
    return this.getAllIntents().filter(intent => intent.active)
  }
  
  // Update intent
  static updateIntent(id: string, updates: Partial<IntentData>): IntentData | null {
    const existing = this.getIntent(id)
    if (!existing) return null
    
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() }
    this.storage.set(`intent_${id}`, updated)
    console.log(`Updated intent: ${id}`)
    return updated
  }
  
  // Delete intent
  static deleteIntent(id: string): boolean {
    const exists = this.storage.has(`intent_${id}`)
    if (exists) {
      this.storage.delete(`intent_${id}`)
      console.log(`Deleted intent: ${id}`)
    }
    return exists
  }
  
  // Save provider
  static saveProvider(provider: Omit<ProviderInfo, 'id'>): ProviderInfo {
    this.initializeCounters()
    const id = this.generateId('provider')
    const providerWithId: ProviderInfo = {
      ...provider,
      id
    }
    
    this.storage.set(`provider_${id}`, providerWithId)
    console.log(`Saved provider: ${id}`)
    return providerWithId
  }
  
  // Get provider by ID
  static getProvider(id: string): ProviderInfo | null {
    return this.storage.get(`provider_${id}`) || null
  }
  
  // Get all providers
  static getAllProviders(): ProviderInfo[] {
    const providers: ProviderInfo[] = []
    for (const [key, value] of this.storage.entries()) {
      if (key.startsWith('provider_')) {
        providers.push(value)
      }
    }
    return providers
  }
  
  // Get providers by location
  static getProvidersByLocation(location: string): ProviderInfo[] {
    return this.getAllProviders().filter(provider => 
      provider.address.toLowerCase().includes(location.toLowerCase())
    )
  }
  
  // Get providers by type
  static getProvidersByType(type: string): ProviderInfo[] {
    return this.getAllProviders().filter(provider => provider.type === type)
  }
  
  // Get providers by specialty
  static getProvidersBySpecialty(specialty: string): ProviderInfo[] {
    return this.getAllProviders().filter(provider => 
      provider.specialty.toLowerCase().includes(specialty.toLowerCase())
    )
  }
  
  // Update provider
  static updateProvider(id: string, updates: Partial<ProviderInfo>): ProviderInfo | null {
    const existing = this.getProvider(id)
    if (!existing) return null
    
    const updated = { ...existing, ...updates }
    this.storage.set(`provider_${id}`, updated)
    console.log(`Updated provider: ${id}`)
    return updated
  }
  
  // Delete provider
  static deleteProvider(id: string): boolean {
    const exists = this.storage.has(`provider_${id}`)
    if (exists) {
      this.storage.delete(`provider_${id}`)
      console.log(`Deleted provider: ${id}`)
    }
    return exists
  }
  
  // Save vaccination
  static saveVaccination(vaccination: Omit<VaccinationInfo, 'name'> & { name?: string }): VaccinationInfo {
    this.initializeCounters()
    const id = this.generateId('vaccination')
    const vaccinationWithId: VaccinationInfo = {
      ...vaccination,
      name: vaccination.name || `Vaccination ${id}`
    }
    
    this.storage.set(`vaccination_${id}`, vaccinationWithId)
    console.log(`Saved vaccination: ${id}`)
    return vaccinationWithId
  }
  
  // Get vaccination by ID
  static getVaccination(id: string): VaccinationInfo | null {
    return this.storage.get(`vaccination_${id}`) || null
  }
  
  // Get all vaccinations
  static getAllVaccinations(): VaccinationInfo[] {
    const vaccinations: VaccinationInfo[] = []
    for (const [key, value] of this.storage.entries()) {
      if (key.startsWith('vaccination_')) {
        vaccinations.push(value)
      }
    }
    return vaccinations
  }
  
  // Update vaccination
  static updateVaccination(id: string, updates: Partial<VaccinationInfo>): VaccinationInfo | null {
    const existing = this.getVaccination(id)
    if (!existing) return null
    
    const updated = { ...existing, ...updates }
    this.storage.set(`vaccination_${id}`, updated)
    console.log(`Updated vaccination: ${id}`)
    return updated
  }
  
  // Delete vaccination
  static deleteVaccination(id: string): boolean {
    const exists = this.storage.has(`vaccination_${id}`)
    if (exists) {
      this.storage.delete(`vaccination_${id}`)
      console.log(`Deleted vaccination: ${id}`)
    }
    return exists
  }
  
  // Search functionality
  static searchDrugs(query: string): DrugInfo[] {
    const searchTerm = query.toLowerCase()
    return this.getAllDrugs().filter(drug => 
      drug.name.toLowerCase().includes(searchTerm) ||
      drug.genericName.toLowerCase().includes(searchTerm) ||
      drug.description.toLowerCase().includes(searchTerm)
    )
  }
  
  static searchSymptoms(query: string): SymptomInfo[] {
    const searchTerm = query.toLowerCase()
    return this.getAllSymptoms().filter(symptom => 
      symptom.name.toLowerCase().includes(searchTerm) ||
      symptom.description.toLowerCase().includes(searchTerm) ||
      symptom.category.toLowerCase().includes(searchTerm)
    )
  }
  
  static searchProviders(query: string): ProviderInfo[] {
    const searchTerm = query.toLowerCase()
    return this.getAllProviders().filter(provider => 
      provider.name.toLowerCase().includes(searchTerm) ||
      provider.specialty.toLowerCase().includes(searchTerm) ||
      provider.address.toLowerCase().includes(searchTerm)
    )
  }
  
  static searchIntents(query: string): IntentData[] {
    const searchTerm = query.toLowerCase()
    return this.getAllIntents().filter(intent => 
      intent.name.toLowerCase().includes(searchTerm) ||
      intent.description.toLowerCase().includes(searchTerm) ||
      intent.category.toLowerCase().includes(searchTerm)
    )
  }
  
  // Statistics
  static getStorageStats(): { totalItems: number; byType: Record<string, number> } {
    const stats = { totalItems: 0, byType: {} as Record<string, number> }
    
    for (const [key, value] of this.storage.entries()) {
      stats.totalItems++
      const type = key.split('_')[0]
      stats.byType[type] = (stats.byType[type] || 0) + 1
    }
    
    return stats
  }
  
  // Clear all data
  static clearAllData(): void {
    this.storage.clear()
    this.idCounters.clear()
    console.log('Cleared all data from storage')
  }
  
  // Export data
  static exportData(): Record<string, any[]> {
    const data: Record<string, any[]> = {
      drugs: this.getAllDrugs(),
      symptoms: this.getAllSymptoms(),
      vaccinations: this.getAllVaccinations(),
      providers: this.getAllProviders(),
      conversations: this.getAllConversations(),
      emergencyAlerts: this.getAllEmergencyAlerts(),
      intents: this.getAllIntents()
    }
    
    return data
  }
  
  // Import data
  static importData(data: Record<string, any[]>): void {
    if (data.drugs) {
      data.drugs.forEach(drug => this.saveDrug(drug))
    }
    if (data.symptoms) {
      data.symptoms.forEach(symptom => this.saveSymptom(symptom))
    }
    if (data.vaccinations) {
      data.vaccinations.forEach(vaccination => this.saveVaccination(vaccination))
    }
    if (data.providers) {
      data.providers.forEach(provider => this.saveProvider(provider))
    }
    if (data.conversations) {
      data.conversations.forEach(conversation => this.saveConversation(conversation))
    }
    if (data.emergencyAlerts) {
      data.emergencyAlerts.forEach(alert => this.saveEmergencyAlert(alert))
    }
    if (data.intents) {
      data.intents.forEach(intent => this.saveIntent(intent))
    }
    
    console.log('Imported data successfully')
  }
  
  // Backup data
  static backupData(): string {
    const data = this.exportData()
    return JSON.stringify(data, null, 2)
  }
  
  // Restore data from backup
  static restoreData(backupData: string): void {
    try {
      const data = JSON.parse(backupData)
      this.clearAllData()
      this.importData(data)
      console.log('Data restored successfully')
    } catch (error) {
      console.error('Failed to restore data:', error)
    }
  }
} 