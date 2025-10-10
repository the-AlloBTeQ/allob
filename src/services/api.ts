import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiService = {
  health: () => api.get('/health'),
  
  tools: {
    calculatePaye: (data: {
      grossSalary: number
      bonuses?: number
      allowances?: number
      otherIncome?: number
      age?: number
      medicalAidContributions?: number
      retirementFundContributions?: number
    }) => api.post('/tools/paye-calculator', data),
  },
}

export default api