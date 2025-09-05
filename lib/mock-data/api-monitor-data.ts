// Mock data for API monitoring
import { APIMonitorData } from './types'

export const mockAPIMonitors: APIMonitorData[] = [
  {
    endpoint: "/api/health/drugs",
    status: "healthy",
    responseTime: 120,
    uptime: 99.9,
    lastCheck: "2024-01-15T10:00:00Z",
    errorRate: 0.1,
    requestCount: 15420,
    successRate: 99.9
  },
  {
    endpoint: "/api/health/symptoms",
    status: "healthy",
    responseTime: 95,
    uptime: 99.8,
    lastCheck: "2024-01-15T10:00:00Z",
    errorRate: 0.2,
    requestCount: 12800,
    successRate: 99.8
  },
  {
    endpoint: "/api/health/vaccination",
    status: "degraded",
    responseTime: 450,
    uptime: 98.5,
    lastCheck: "2024-01-15T10:00:00Z",
    errorRate: 1.5,
    requestCount: 8900,
    successRate: 98.5
  },
  {
    endpoint: "/api/health/providers",
    status: "healthy",
    responseTime: 180,
    uptime: 99.7,
    lastCheck: "2024-01-15T10:00:00Z",
    errorRate: 0.3,
    requestCount: 11200,
    successRate: 99.7
  },
  {
    endpoint: "/api/health/drug-interactions",
    status: "healthy",
    responseTime: 200,
    uptime: 99.6,
    lastCheck: "2024-01-15T10:00:00Z",
    errorRate: 0.4,
    requestCount: 6800,
    successRate: 99.6
  },
  {
    endpoint: "/api/health/drug-recalls",
    status: "healthy",
    responseTime: 150,
    uptime: 99.8,
    lastCheck: "2024-01-15T10:00:00Z",
    errorRate: 0.2,
    requestCount: 4200,
    successRate: 99.8
  },
  {
    endpoint: "/api/health/outbreaks",
    status: "healthy",
    responseTime: 110,
    uptime: 99.9,
    lastCheck: "2024-01-15T10:00:00Z",
    errorRate: 0.1,
    requestCount: 5600,
    successRate: 99.9
  },
  {
    endpoint: "/api/messaging/sms",
    status: "degraded",
    responseTime: 800,
    uptime: 97.2,
    lastCheck: "2024-01-15T10:00:00Z",
    errorRate: 2.8,
    requestCount: 45000,
    successRate: 97.2
  },
  {
    endpoint: "/api/messaging/whatsapp",
    status: "healthy",
    responseTime: 300,
    uptime: 99.5,
    lastCheck: "2024-01-15T10:00:00Z",
    errorRate: 0.5,
    requestCount: 78000,
    successRate: 99.5
  },
  {
    endpoint: "/api/analytics/dashboard",
    status: "healthy",
    responseTime: 250,
    uptime: 99.3,
    lastCheck: "2024-01-15T10:00:00Z",
    errorRate: 0.7,
    requestCount: 1200,
    successRate: 99.3
  }
] 